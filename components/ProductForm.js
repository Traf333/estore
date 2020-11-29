import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { graphQLClient } from '../lib/graphql'
import { updateProduct } from '../mutations/products'

const Product = ({ defaultValues, id }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const { handleSubmit, register, reset, errors } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  })

  const onSubmit = handleSubmit(async ({ name, published }) => {
    if (errorMessage) setErrorMessage('')

    const variables = {
      id,
      name,
      published,
    }

    try {
      await graphQLClient.request(updateProduct, variables)
      Router.push('/')
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  })

  useEffect(() => {
    reset(defaultValues) // asynchronously reset your form values
  }, [reset, defaultValues])

  return (
    <>
      <form onSubmit={onSubmit} >
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            ref={register({ required: 'Name is required' })}
          />
          {errors.name && (
            <span role="alert" >
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label>Published</label>
          <input type="checkbox" name="published" ref={register()} />
          {errors.published && (
            <span role="alert" >
              {errors.published.message}
            </span>
          )}
        </div>

        <div >
          <button type="submit">Update</button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" >
          {errorMessage}
        </p>
      )}
    </>
  )
}

export default Product
