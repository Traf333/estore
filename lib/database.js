import FaunaDB from 'faunadb'

const q = FaunaDB.query
const client = new FaunaDB.Client({ secret: process.env.DB_SECRET_KEY })


export { q, client }
