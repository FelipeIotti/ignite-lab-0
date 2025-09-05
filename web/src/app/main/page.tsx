import Profile from "@/components/teste";
import { getClient } from "@/graphql/lib/apollo-client";
import { auth0 } from "@/lib/auth0";
import { gql } from "@apollo/client";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;

export default async function Page() {
  const session = await auth0.getAccessToken();
  const { data } = await getClient().query({ query: PRODUCTS_QUERY });
  console.log("server data", data);
  return (
    <div>
      <h1>Home Page</h1>
      <Profile />
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
