const fs = require('fs');
const net = require('../network-resources')
// const data = require('./queries.js')
const es = net.elasticsearch

var args = process.argv.slice(2);
console.log(args)

const indx = args[0]
const typ = 'record'
const allIds = [];
const responseQueue = [];

const file = fs.createWriteStream(`./temp/index_ids.${indx}.txt`);


const go = async () => {
  const initSearch = await es.search({
    index: indx,
    type: typ,
    scroll: '30s',
    _source: false,
    body: {
        query: { match_all: {} }
    }
  })


  responseQueue.push(initSearch)

  let keepGoing = true

  
  while (keepGoing) {
    const response = responseQueue.shift();
    keepGoing = response.hits.hits.length > 0
  
    // collect the titles from this response
    for (let hit of response.hits.hits){
      console.log( `index: ${indx} | id: ${hit._id}`);
      file.write(`${hit._id}\n`);
    }
      
    // get the next response if there are more titles to fetch
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