window.SIDEBAR_ITEMS = {"enum":[["IndexFieldWalker","A field in an index definition. It can point to a scalar field in the current model, or through embedding a field in a composite type."],["RefinedFieldWalker","A field that has been identified as scalar field or relation field."],["RefinedRelationWalker","Splits the relation to different types."],["RelationName","The relation name."]],"struct":[["CompleteInlineRelationWalker","Represents a relation that has fields and references defined in one of the relation fields. Includes 1:1 and 1:n relations that are defined from both sides."],["DefaultValueWalker","An `@default()` attribute on a field."],["ImplicitManyToManyRelationTableName","A table name for an implicit relation’s join table. Useful for its Display impl."],["IndexWalker","An index, unique or fulltext attribute."],["InlineRelationWalker","An explicitly defined 1:1 or 1:n relation. The walker has the referencing side defined, but might miss the back relation in the AST."],["OperatorClassWalker","An operator class defines the operators allowed in an index. Mostly a PostgreSQL thing."],["PrimaryKeyWalker","An `@(@)id` attribute in the schema."],["RelationFieldId","An opaque identifier for a model relation field in a schema."],["RelationFieldWalker","A relation field on a model in the schema."],["ScalarFieldAttributeWalker","A scalar field as referenced in a key specification (id, index or unique)."],["ScalarFieldId","An opaque identifier for a model scalar field in a schema."],["ScalarFieldWalker","A scalar field, as part of a model."],["TwoWayEmbeddedManyToManyRelationWalker","Describes an explicit m:n relation between two models. Both sides define `fields` which must be a single array scalar field, and `references` that should point to a single scalar field on the referenced model."],["TypedFieldWalker","A model or composite type field of a scalar type."],["Walker","A generic walker. Only walkers intantiated with a concrete ID type (`I`) are useful."]],"type":[["CompositeTypeFieldWalker","A field in a composite type."],["CompositeTypeWalker","A composite type, introduced with the `type` keyword in the schema."],["EnumValueWalker","One value in an `enum` declaration in the schema."],["EnumWalker","An `enum` declaration in the schema."],["FieldWalker","A model field, scalar or relation."],["ImplicitManyToManyRelationWalker","Describes an implicit m:n relation between two models. Neither side defines fields, attributes or referential actions, which are all inferred by Prisma."],["ModelWalker","A `model` declaration in the Prisma schema."],["RelationWalker","A relation that has the minimal amount of information for us to create one. Useful for validation purposes. Holds all possible relation types."]]};