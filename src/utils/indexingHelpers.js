const net = require('../network-resources')
const db = net.db



const go = async () => {
    try{
        await db.schema.withSchema('cms').dropTableIfExists('index_contents')

        await db.schema.withSchema('cms').createTable('index_contents', function(t) {
            t.integer('npi').primary()
        })

        await db.schema.withSchema('cms').table('index_contents', function (table) {
            table.foreign('npi').references('npi').inTable('cms.providers')
        })

        
        

    
    }
    catch (e) {
        console.log('errpr:', e)
        process.exit(1)
    }
    process.exit(0)

}

go()