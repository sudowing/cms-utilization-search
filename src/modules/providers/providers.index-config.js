const net = require('../../network-resources.js')
const es = net.elasticsearch

const settings = {
    index : {
        refresh_interval : "1m"
    }
}
const mappings = {
    record: {
        properties: {
            address_city: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            address_state: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            entity_type: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            gender: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            name_first: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            name_last: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            npi: {
                type: "long"
            },
            suggest: {
                "type" : "completion"
            }
        }
    }
}

es.indices.delete({
    index: "providers"
}).then(data => {
    console.log(data)
}).catch(e => {
    console.log(e)
})


es.indices.create({
    index: "providers", body: { settings, mappings }
}).then(data => {
    console.log(data)
}).catch(e => {
    console.log(e)
})


