function generateOpenAPISpec(pocketbaseSchema) {
  const openAPISpec = {
    openapi: "3.0.0",
    info: {
      title: "Pocketbase API",
      version: "1.0.0",
      description: "API specification generated from Pocketbase schema"
    },
    components: {
      schemas: {}
    },
    paths: {}
  };

  pocketbaseSchema.forEach(schema => {
    const schemaId = schema.id;
    const schemaProperties = {};

    schema.schema.forEach(field => {
      const fieldId = field.id;
      const fieldType = field.type;
      const fieldOptions = field.options;

      switch (fieldType) {
        case "text":
        case "email":
        case "phone":
        case "url":
        case "password":
          schemaProperties[fieldId] = { type: "string" };
          if (fieldOptions?.min) {
            schemaProperties[fieldId].minLength = fieldOptions.min;
          }
          if (fieldOptions?.max) {
            schemaProperties[fieldId].maxLength = fieldOptions.max;
          }
          if (fieldOptions?.pattern) {
            schemaProperties[fieldId].pattern = fieldOptions.pattern;
          }
          break;
        case "number":
          schemaProperties[fieldId] = { type: "number" };
          if (fieldOptions?.min) {
            schemaProperties[fieldId].minimum = fieldOptions.min;
          }
          if (fieldOptions?.max) {
            schemaProperties[fieldId].maximum = fieldOptions.max;
          }
          break;
        case "boolean":
          schemaProperties[fieldId] = { type: "boolean" };
          break;
        case "date":
        case "datetime":
          schemaProperties[fieldId] = { type: "string", format: fieldType };
          break;
        case "file":
          schemaProperties[fieldId] = { type: "string", format: "binary" };
          break;
        case "relation":
          schemaProperties[fieldId] = { type: "string" };
          break;
        default:
          schemaProperties[fieldId] = { type: "string" };
      }

      if (field.required) {
        schemaProperties[fieldId].required = true;
      }
      if (field.unique) {
        schemaProperties[fieldId].uniqueItems = true;
      }
    });

    openAPISpec.components.schemas[schemaId] = {
      type: "object",
      properties: schemaProperties
    };

    // Generate GET and GET by ID paths
    const path = `/${schemaId}`;
    const pathById = `/${schemaId}/{id}`;

    openAPISpec.paths[path] = {
      get: {
        summary: `Get all ${schemaId}`,
        operationId: `get${schemaId}s`,
        responses: {
          200: {
            description: `List of ${schemaId} objects`,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    page: { type: "number" },
                    perPage: { type: "number" },
                    totalPages: { type: "number" },
                    totalItems: { type: "number" },
                    items: {
                      type: "array",
                      items: { $ref: `#/components/schemas/${schemaId}` }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }}