import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: "http://localhost:3332/graphql",
      fetchOptions: {
        // headers: {
        //   Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRNQ3FaSkVFcy1QaXVDek5IVG9mSiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wcTdtMGVweGU0ODhsd3QzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDgwMzkxMjQ2NjM4NDU2MjI5NiIsImF1ZCI6WyJpZ25pdGUtbGFiLTAwLWF1dGgiLCJodHRwczovL2Rldi0wcTdtMGVweGU0ODhsd3QzLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NTcwMTM0ODksImV4cCI6MTc1NzA5OTg4OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IkEzNUU1dTZka0NHMUNBR3hxbGtPam5Ca2JpRjFMRlh3In0.WiQ7tr3jq1O2SAYQfwoZROHHn9YV3aWJHYYsexD51v6GlZy5P4wX4UFZfQRxJ5CA0_DdILvjo1HBWG7f7yjB3r0z4sUeYkJkNQYR9kF9JoWhve89w3vzt24_CLH755CroxMXFGuy2pA2nxz_Vs_UiQpE9PT7_aYtvPPsLGPoxrFYvEhkyWHvZIveNcwjCeChcjYtsoX_Z8I_zD27f_RSrcU_LynFRoOZe656acMPn1SB7d6xEzM5LLhwCDI78PJ5bw--5O7nRvQ7BHsWM3uOYXeLw0wHnX_huqd9q2H5O9T8b-vmmShPN1r6kI3BLFQAbcLVIjIUcFzFHd6TV-R94w`,
        // },
        // you can pass additional options that should be passed to `fetch` here,
        // e.g. Next.js-related `fetch` options regarding caching and revalidation
        // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
      },
    }),
  });
});
