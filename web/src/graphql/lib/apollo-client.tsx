import { auth0 } from "@/lib/auth0";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { setContext } from "@apollo/client/link/context";
import { redirect } from "next/navigation";

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const session = await auth0.getAccessToken();

    if (!session) redirect("/api/auth/login");

    const { token } = session;

    const httpLink = new HttpLink({
      uri: "http://localhost:3332/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }
);
