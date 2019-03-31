const net = require('../network-resources')
const { db}  = net

const prepIndexContentsTable = async (onlyDrop=false) => {
    await db.schema.withSchema('cms').dropTableIfExists('index_contents')
    if (onlyDrop) return
  
    await db.schema.withSchema('cms').createTable('index_contents', function(t) {
        t.integer('npi').primary()
    })
  
    await db.schema.withSchema('cms').table('index_contents', function (table) {
        table.foreign('npi').references('npi').inTable('cms.providers')
    })
  }

  module.exports = {
    prepIndexContentsTable
  }