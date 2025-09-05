import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getClient } from "@/graphql/lib/apollo-client";
import { gql } from "@apollo/client";
import Head from "next/head";
import { ProductItem } from "./_components/product-item";

const query = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;

export default async function Page() {
  const client = await getClient();
  const { data } = await client.query({ query });

  return (
    <>
      <Head>
        <title>Realizar matrícula</title>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>

      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
                Comece a estudar
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Realizar matrícula
              </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {data &&
                  data.products.length > 0 &&
                  data.products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                  ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
