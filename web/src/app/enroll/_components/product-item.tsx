"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

interface ProductItemProps {
  product: {
    id: string;
    title: string;
  };
}

const mutation = gql`
  mutation CreatePurchase($productId: String!) {
    createPurchase(data: { productId: $productId }) {
      id
    }
  }
`;

export function ProductItem({ product }: ProductItemProps) {
  const [createPurchase] = useMutation(mutation);

  async function handlePurchaseProduct(productId: string) {
    await createPurchase({
      variables: { productId },
    });

    alert("Compra realizada com sucesso!");
  }
  return (
    <li key={product.id}>
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="truncate">
            <div className="flex text-sm">
              <p className="font-medium text-indigo-600 truncate">
                {product.title}
              </p>
              <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                em Programação
              </p>
            </div>
          </div>
        </div>
        <div className="ml-5 flex-shrink-0">
          <button
            onClick={() => handlePurchaseProduct(product.id)}
            className="px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
          >
            Realizar inscrição
          </button>
        </div>
      </div>
    </li>
  );
}
