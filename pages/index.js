// pages/index.js

import React from 'react'
import useSWR from 'swr'
import { graphQLClient } from '../lib/graphql'
import { allProducts } from '../queries/products'
import Link from 'next/link'
import { deleteProduct, partialUpdateProduct } from '../mutations/products'

const fetcher = async (query) => await graphQLClient.request(query)

const Home = () => {
  const { data, error, mutate } = useSWR(allProducts, fetcher)

  const toggleTodo = async (id, published) => {
    const variables = {
      id,
      published: !published,
    }

    try {
      await graphQLClient.request(partialUpdateProduct, variables)
      mutate()
    } catch (error) {
      console.error(error)
    }
  }

  const removeProduct = async (id) => {

    try {
      await graphQLClient.request(deleteProduct, { id });
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>failed to load</div>

  return (
    <div>
      <h1>E-shop with GQL and FAUNA</h1>

      {data ? (
        <ul>
          {data.allProducts.data.map(({ _id, published, name }) => (
            <li key={_id}>
              <Link href={`products/${_id}`}>
                <a>{name}</a>
              </Link> |
              {published && <em>Published</em>}
              <button onClick={() => toggleTodo(_id, published)}>Toggle</button>
              <button onClick={() => removeProduct(_id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>loading...</div>
      )}
      <hr />
      <Link href='new'>
        <button>NEW PRODUCT</button>
      </Link>
    </div>
  )
}

export default Home
