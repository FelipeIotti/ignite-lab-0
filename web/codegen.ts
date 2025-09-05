import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3332/graphql",
  documents: ["src/graphql/http/**/*.{ts,tsx,graphql}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/http/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
};

export default config;
