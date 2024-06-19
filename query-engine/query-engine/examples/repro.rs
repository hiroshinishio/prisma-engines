use query_core::{protocol::EngineProtocol, *};
use request_handlers::{load_executor, ConnectorKind, JsonSingleQuery};
use std::sync::Arc;

fn init_logger() {
    use tracing_error::ErrorLayer;
    use tracing_subscriber::prelude::*;

    use tracing_subscriber::{EnvFilter, FmtSubscriber};

    let subscriber = FmtSubscriber::builder()
        .with_env_filter(EnvFilter::from_default_env())
        .with_ansi(true)
        .with_writer(std::io::stderr)
        .finish()
        .with(ErrorLayer::default());

    tracing::subscriber::set_global_default(subscriber)
        .map_err(|err| eprintln!("Error initializing the global logger: {err}"))
        .ok();
}

const SCHEMA: &str = include_str!("./perf.prisma");

const QUERY: &str = r#"
{
  "action": "queryRaw",
  "query": {
    "arguments": {
      "query": "SELECT * FROM \"imdb_bench\".\"Movie\"",
      "parameters": "[]"
    },
    "selection": {}
  }
}
"#;

#[tokio::main]
async fn main() {
    init_logger();

    let now = std::time::Instant::now();
    let validated_schema = Arc::new(psl::parse_schema(SCHEMA).unwrap());
    let datasource = validated_schema.configuration.datasources.first().unwrap();
    let query_schema = Arc::new(schema::build(validated_schema.clone(), true));

    let executor = load_executor(
        ConnectorKind::Rust {
            url: "postgres://postgres:prisma@localhost:5434/bench?schema=imdb_bench&sslmode=disable".into(),
            datasource,
        },
        validated_schema.configuration.preview_features(),
    )
    .await
    .unwrap();

    let json_request: JsonSingleQuery = serde_json::from_str(QUERY).unwrap();
    let mut adapter = request_handlers::JsonProtocolAdapter::new(&query_schema);
    let operation = adapter.convert_single(json_request).unwrap();
    println!("setup: {:.2?}", now.elapsed());

    let now = std::time::Instant::now();
    executor
        .execute(
            None,
            operation.clone(),
            query_schema.clone(),
            None,
            EngineProtocol::Json,
        )
        .await
        .unwrap();
    println!("total: {:.2?}", now.elapsed());
    // println!("res: {:#?}", res);
}
