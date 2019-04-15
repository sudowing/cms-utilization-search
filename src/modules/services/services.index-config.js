const net = require('../../network-resources.js')
const es = net.elasticsearch

const settings = {
    index : {
        refresh_interval : "1m"
    },
    analysis: {
        filter: {
            autocomplete_filter: { 
                type:     "edge_ngram",
                min_gram: 1,
                max_gram: 20
            }
        },
        analyzer: {
            autocomplete: {
                type:      "custom",
                tokenizer: "standard",
                filter: [
                    "lowercase",
                    "autocomplete_filter" 
                ]
            }
        }
    }
}
const mappings = {
    record: {
        properties: {
            hcpcs_code: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            hcpcs_description: {
                type: "text",
                analyzer: "autocomplete"
            },
            hcpcs_drug_indicator: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            performances: {
                properties: {
                    avg_avg_mcare_pay_amt: {
                         type: "float",
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
                    n_of_svcs: {
                         type: "float",
                    },
                    providers: {
                         type: "long",
                    }
                }
            },
            suggest: {
                type : "completion"
            }
        }
    }
}

es.indices.delete({
    index: "services"
}).then(data => {
    console.log(data)
}).catch(e => {
    console.log(e)
})


es.indices.create({
    index: "services", body: { settings, mappings }
}).then(data => {
    console.log(data)
}).catch(e => {
    console.log(e)
})


