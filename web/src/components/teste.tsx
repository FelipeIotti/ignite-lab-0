"use client";
import { useGetProductsQuery } from "@/graphql/http/generated/graphql";
import { gql } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;
export default function Profile() {
  const { user, isLoading } = useUser();

  //const { data } = useSuspenseQuery(PRODUCTS_QUERY);
  const { data } = useGetProductsQuery();
  console.log("client data", data);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div style={{ textAlign: "center" }}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
      <div>
        <p>{JSON.stringify(data)}</p>
      </div>
    </>
  );
}
