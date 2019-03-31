const net = require('../network-resources')
const { db, elasticsearch: es}  = net
const prepIndexContentsTable = require('./dbHelpers').prepIndexContentsTable
const ProgressBar = require('progress');
const countIndexDocuments = require('../utils/indexHelpers').countIndexDocuments



const insertNpis = async (npis) => {
  return db.insert(npis).into('cms.index_contents')
}




const args = process.argv.slice(2);
const indx = args[0]


const go = async () => {
  // create || tuncate table to store npis
  await prepIndexContentsTable()

  // store doc ids (npis) in temp table from ^^
  const docCount = await countIndexDocuments(indx)
  console.log(`Document Count in Index '${indx}': ${docCount}`)
  const bar = new ProgressBar('  reporting to DB [:bar] :rate/documents-per-second :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: docCount
  });

  const initSearch = await es.search({
    index: indx,
    type: 'record',
    scroll: '30s',
    _source: false,
    body: {
        query: { match_all: {} }
    }
  })

  const responseQueue = [ initSearch];

  let keepGoing = true
  
  while (keepGoing) {
    const response = responseQueue.shift();
    keepGoing = response.hits.hits.length > 0
  
    for (let hit of response.hits.hits){
      // bar.tick(1);
      // file.write(`${}\n`);
    }
    const npis = response.hits.hits.map(hit => ({ npi: hit._id}))
    await insertNpis(npis)

    bar.tick(response.hits.hits.length);
      
    responseQueue.push(
      await es.scroll({
        scrollId: response._scroll_id,
        scroll: '30s'
      })
    );
  }

  process.exit(0)

}

go()