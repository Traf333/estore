import { gql } from 'graphql-request'

export const createProduct = gql`
    mutation CreateProduct($name: String!) {
        createProduct(data: { name: $name, published: false }) {
            name
            published
        }
    }
`

export const updateProduct = gql`
    mutation UpdateProduct($id: ID!, $name: String!, $published: Boolean!) {
        updateProduct(id: $id, data: { name: $name, published: $published }) {
            name
            published
        }
    }
`

export const partialUpdateProduct = gql`
    mutation PartialUpateProduct($id: ID!, $published: Boolean!) {
        partialUpdateProduct(id: $id, data: { published: $published }) {
            _id
            published
        }
    }
`

export const deleteProduct = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            _id
        }
    }
`;
