
# CMS-Utilization-Search

## Getting Started

This project exists to manage the indexing of data used inte the cms-utilization project.



## compress
$ time tar -cjvf volumes/elastic_dumps.tar.bz2 volumes/elastic_dumps/
volumes/elastic_dumps/
volumes/elastic_dumps/provider-performance.mapping.json
volumes/elastic_dumps/providers.analyzer.json
volumes/elastic_dumps/provider-performance.analyzer.json
volumes/elastic_dumps/providers.mapping.json
volumes/elastic_dumps/provider-performance.data.json
volumes/elastic_dumps/.keep
volumes/elastic_dumps/services.mapping.json
volumes/elastic_dumps/services.data.json
volumes/elastic_dumps/providers.data.json
volumes/elastic_dumps/services.analyzer.json
--------------------
real    10m23.546s
user    10m13.049s
sys     0m11.348s
--------------------

## uncompress
$ time tar -xvf volumes/elastic_dumps.tar.bz2 -C volumes/elastic_dumps_new_bz2
volumes/elastic_dumps/
volumes/elastic_dumps/provider-performance.mapping.json
volumes/elastic_dumps/providers.analyzer.json
volumes/elastic_dumps/provider-performance.analyzer.json
volumes/elastic_dumps/providers.mapping.json
volumes/elastic_dumps/provider-performance.data.json
volumes/elastic_dumps/.keep
volumes/elastic_dumps/services.mapping.json
volumes/elastic_dumps/services.data.json
volumes/elastic_dumps/providers.data.json
volumes/elastic_dumps/services.analyzer.json
---------------------
real    5m59.783s
user    5m39.693s
sys     0m30.419s
---------------------

