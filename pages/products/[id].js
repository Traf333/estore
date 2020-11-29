// pages/product/[id].js

import { useRouter } from 'next/router';
import useSWR from 'swr';
import ProductForm from '../../components/ProductForm';
import { graphQLClient } from '../../lib/graphql';
import { findProductByID } from '../../queries/products'
import React from 'react'

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (query) => await graphQLClient.request(query, { id });



  const { data, error } = useSWR([findProductByID, id], fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <div>
      <h1>Edit Product</h1>

      {data ? (
        <ProductForm defaultValues={data.findProductByID} id={id} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Product;
