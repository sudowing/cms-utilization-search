require('dotenv').config()

const es = require('elasticsearch')
const knex = require('knex')

const db = knex({ client: 'pg', connection: process.env.DB_URL })

const elasticsearch = new es.Client({
  host: 'localhost:9200'
})

module.exports = {
  db, elasticsearch
}