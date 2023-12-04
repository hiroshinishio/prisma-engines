#!/bin/bash

# Call this script as `./build.sh <npm_version>`

OUT_VERSION="$1"
OUT_FOLDER="pkg"
OUT_JSON="${OUT_FOLDER}/package.json"
OUT_TARGET="bundler"
OUT_NPM_NAME="@prisma/query-engine-wasm"

# The local ./Cargo.toml file uses "name = "query_engine_wasm" as library name
# to avoid conflicts with libquery's `name = "query_engine"` library name declaration.
# This little `sed -i` trick below is a hack to publish "@prisma/query-engine-wasm"
# with the same binding filenames currently expected by the Prisma Client.
sed -i '' 's/name = "query_engine_wasm"/name = "query_engine"/g' Cargo.toml

# use `wasm-pack build --release` on CI only
if [[ -z "$BUILDKITE" ]] || [[ -z "$GITHUB_ACTIONS" ]]; then
    BUILD_PROFILE="--release"
else
    BUILD_PROFILE="--dev"
fi

wasm-pack build $BUILD_PROFILE --target $OUT_TARGET

sed -i '' 's/name = "query_engine"/name = "query_engine_wasm"/g' Cargo.toml

sleep 1

# Mark the package as a ES module, set the entry point to the query_engine.js file, mark the package as public
printf '%s\n' "$(jq '. + {"type": "module"} + {"main": "./query_engine.js"} + {"private": false}' $OUT_JSON)" > $OUT_JSON

# Add the version
printf '%s\n' "$(jq --arg version "$OUT_VERSION" '. + {"version": $version}' $OUT_JSON)" > $OUT_JSON

# Add the package name
printf '%s\n' "$(jq --arg name "$OUT_NPM_NAME" '. + {"name": $name}' $OUT_JSON)" > $OUT_JSON

enable_cf_in_bindings() {
    # Enable Cloudflare Workers in the generated JS bindings.
    # The generated bindings are compatible with:
    # - Node.js
    # - Cloudflare Workers / Miniflare

    local FILE="$1" # e.g., `query_engine.js`
    local BG_FILE="${FILE%.js}_bg.js"
    local OUTPUT_FILE="${OUT_FOLDER}/${FILE}"

    cat <<EOF > "$OUTPUT_FILE"
import * as imports from "./${BG_FILE}";

// switch between both syntax for Node.js and for workers (Cloudflare Workers)
import * as wkmod from "./${BG_FILE%.js}.wasm";
import * as nodemod from "./${BG_FILE%.js}.wasm";
if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    imports.__wbg_set_wasm(nodemod);
} else {
    const instance = new WebAssembly.Instance(wkmod.default, { "./${BG_FILE}": imports });
    imports.__wbg_set_wasm(instance.exports);
}

export * from "./${BG_FILE}";
EOF
}

enable_cf_in_bindings "query_engine.js"
