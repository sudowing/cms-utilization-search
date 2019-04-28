
# CMS Utilization Search

### The purpose of the project is to provide a containerized method for seeding an empty Elastic service with records from the [CMS-Utilization DB](https://github.com/sudowing/cms-utilization-db).

While there are many benefits of seeding documents into Elastic, I'm doing so to leverage to specific features of Elastic:
- [Geo Queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html)
- [Suggesters (Search as you type)](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html)
- [Autocomplete](https://www.elastic.co/guide/en/elasticsearch/guide/current/_index_time_search_as_you_type.html)

For __Geo Queries__, the goal is to provide the ability for clients to search for providers __or__ services by proximity or bounding-box. The plan is to either populate a map UI with records or allow the end users to search for records within a proximity of an address.

For __Suggesters__, the goal is to expose a method for clients to quickly identify individual provider records based on an incomplete search string. There are 1 million+ provider records in the [CMS-Utilization DB](https://github.com/sudowing/cms-utilization-db), so providing an easy way for users to identify individual providers will be useful.

For __Autocomplete__, the goal is to provide a feature that will attempt to autocomplete the search string being typed by the user -- when they are searching for HCPCS Services. There are 6022 HCPCS services in the database, so this feature will help them find the one they want to search for quickly.

### Elastic provides native support for each of these features, as long as the documents are mapped correctly __prior__ to indexing.


---

##  <a id="quick-start"></a>Quick Start

Elasticsearch requires the ability to create many memory-mapped areas. [(Details Here)](https://www.elastic.co/guide/en/elasticsearch/reference/current/_maximum_map_count_check.html). Before you run Elastic and attempt to seed it with 2M+ records, run the following to set the `max_map_count` to the min amount required by Elastic.

```sh
# increase max_map_count
sysctl -w vm.max_map_count=262144
```

Once that's done, you can start and seed the Elastic instance:


```sh
# starts your local elastic service
make start

# seeds index with (compressed) documents in container
make seed

    # OR
    # seeds index & leave uncompressed seed files
    # make seed-keep-exports

# confirm ES indices are complete
npm i
npm run report-index-status

```

This seeding process will take 45 mins (sample `time` report provided below) to complete on the first run. Subsequent starts rely on persistent data.

    :: real 43m48.713s
    :: user 0m0.854s
    :: sys 0m1.235s

The index configuration and seeding process are all detailed (in great detail) below, but the purpose of this repo (and the published [docker image](https://hub.docker.com/r/sudowing/cms-utilization-search))
is to make it simple for users to standup & seed an index with the documents they need -- without understanding the details of how it all works.

There is a chance your seeding will be incomplete after running `make seed`. This happens if your ES instance reaches resource limits and the index moves to `read-only`. If that happens, I'd recommend continueing your index process using the development steps below.


---

##  <a id="development"></a>Development

The published docker image relies on a compressed file that is generated by:
- seeding ES from the source
- exporting complete indexes using [elasticsearch-dump](https://github.com/taskrabbit/elasticsearch-dump)

To build in indexes manually, generated the index exports and generate the compressed archive needed for the Docker build (`elastic_exports.tar.bz2`) -- follow the steps below.

```sh
# starts your local cms-utilization-db && elastic service
make run

# seeds index from db via node scripts
make load

# check ES indices are complete
npm run report-index-status

    output
    ----------
    false
    index 'services' short N documents
    index 'providers' short N documents
    index 'providerPerformance' short N documents

```
NOTE: It's very likely that running `make load` one time will not result in a completely built index. You'll need to QA each index individually  using the tools below.

### Seeding Details

Two of these indexes need to hold 1 million+ documents. The process of building out a complete index is pretty painful, but I've provided the tools below to help.

The general seeding process works like this:
- Seed the index making a basic read-all pass over the DB.
- If not complete, populate a temp table in the DB with all the document ids (which are also the table primary keys) that exist in the index.
- seed the index again -- this time only reading the records which **are not** present in the temp table (because they already exist in the index).
- Repeat until index is completely built.

Here are the NPM commands you can run to accomplish what's outlined above:

```sh
# install dependencies
npm i

# Config all ES Indexes (includes document mapping)
npm run config-services
npm run config-providers
npm run config-provider-performances
# * NOTE: config scripts DELETE exsiting indexes. USE CAUTION.

# Seed Service Records
npm run seed-services
npm run report-index-status
    # while incomplete
    npm run seed-services

# Seed Provider Performance Records
npm run seed-provider-performances
npm run report-index-status
    # while incomplete
    npm run list-provider-performances-ids
    npm run seed-provider-performances-rerun

# Seed Provider (Organization) Records
npm run seed-providers-organizations
npm run report-index-status
    # while incomplete
    npm run list-providers-ids
    npm run seed-providers-organizations-rerun

# Seed Provider (Individual) Records
npm run seed-providers-individuals
npm run report-index-status
    # while incomplete
    npm run list-providers-ids
    npm run seed-providers-individuals-rerun

# drop temp table from DB used to store indexed ids
npm run drop-temp-index-status-table
```