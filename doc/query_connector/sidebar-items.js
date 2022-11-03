window.SIDEBAR_ITEMS = {"enum":[["AggregationResult","Result of an aggregation operation on a model or field. A `Field` return type is only interesting for aggregations involving group bys, as they return field values alongside group aggregates."],["AggregationSelection","Selections for aggregation queries."],["CompositeWriteOperation",""],["RelAggregationResult",""],["RelAggregationSelection",""],["ScalarWriteOperation",""],["UpdateType","When we write a single record using this update_records function, we always want the id of the changed record back. Even if the row wasn’t updated. This can happen in situations where we could increment a null value and the update count would be zero for mysql. However when we updating any records we want to return an empty array if zero items were updated"],["WriteOperation","A WriteExpression allows to express more complex operations on how the data is written, like field or inter-field arithmetic."]],"fn":[["apply_expression",""],["coerce_null_to_zero_value",""],["merge_write_args","Merges the incoming write argument values into the given, already loaded, ids. Overwrites existing values."],["pick_args","Picks all arguments out of `args` that are updating a value for a field contained in `projection`, as those need to be merged into the records later on."]],"mod":[["error",""],["filter","Filtering types to select records from the database"]],"struct":[["DatasourceFieldName","Wrapper struct to force a bit of a reflection whether or not the string passed to the write arguments is the data source field name, not the model field name. Also helps to avoid errors with convenient from-field conversions."],["FieldPath",""],["NativeUpsert",""],["NestedWrite",""],["QueryArguments","`QueryArguments` define various constraints queried data should fulfill:"],["RecordFilter","A wrapper struct allowing to either filter for records or for the core to communicate already known record selectors to connectors."],["SkipAndLimit",""],["WriteArgs","WriteArgs represent data to be written to an underlying data source."]],"trait":[["CompositeCompare","Comparison methods for composite fields."],["Connection",""],["ConnectionLike","Marker trait required by the query core executor to abstract connections and transactions into something that can is capable of writing to or reading from the database."],["Connector",""],["JsonCompare","Comparison methods for json fields"],["ReadOperations",""],["RelationCompare","Comparison methods for relational fields."],["ScalarCompare","Comparing methods for scalar fields."],["ScalarListCompare","Comparison methods for scalar list fields."],["Transaction",""],["WriteOperations",""]],"type":[["AggregationRow",""],["RelAggregationRow",""],["Result",""]]};