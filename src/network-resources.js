require('dotenv').config()

const elasticsearch = require('elasticsearch')
const knex = require('knex')

console.log(' process.env.DB_URL',  process.env.DB_URL)


module.exports.db = knex({ client: 'pg', connection: process.env.DB_URL })

module.exports.elasticsearch = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})