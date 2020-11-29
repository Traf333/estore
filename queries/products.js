import { gql } from 'graphql-request'

export const allProducts = gql`
    {
        allProducts {
            data {
                _id
                name
                published
            }
        }
    }
`

export const findProductByID = gql`
    query FindAProductByID($id: ID!) {
        findProductByID(id: $id) {
            name
            published
        }
    }
`;
