import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/**/*.graphql",
  documents: "src/**/*.graphql",
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
    "./src/graphql/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
