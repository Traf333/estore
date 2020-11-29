import React, { useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { graphQLClient } from '../lib/graphql'
import { createProduct } from '../mutations/products'

const New = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const { handleSubmit, register, errors } = useForm()

  const onSubmit = handleSubmit(async ({ name }) => {
    if (errorMessage) setErrorMessage('')


    try {
      await graphQLClient.request(createProduct, { name })
      Router.push('/')
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  })

  return (
    <div>
      <h1>Create New Product</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Task</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. do something"
            ref={register({ required: 'Task is required' })}
          />
          {errors.name && (
            <span role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default New
