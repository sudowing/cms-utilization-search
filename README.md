
# CMS-Utilization-Search

## Getting Started

This project exists to manage the indexing of data used inte the cms-utilization project.



## compress
$ time tar -cjvf volumes/elastic_exports.tar.bz2 volumes/elastic_exports/
volumes/elastic_exports/
volumes/elastic_exports/provider-performance.mapping.json
volumes/elastic_exports/providers.analyzer.json
volumes/elastic_exports/provider-performance.analyzer.json
volumes/elastic_exports/providers.mapping.json
volumes/elastic_exports/provider-performance.data.json
volumes/elastic_exports/.keep
volumes/elastic_exports/services.mapping.json
volumes/elastic_exports/services.data.json
volumes/elastic_exports/providers.data.json
volumes/elastic_exports/services.analyzer.json
--------------------
real    10m23.546s
user    10m13.049s
sys     0m11.348s
--------------------

## uncompress
$ time tar -xvf volumes/elastic_exports.tar.bz2 -C volumes/elastic_exports_new_bz2
volumes/elastic_exports/
volumes/elastic_exports/provider-performance.mapping.json
volumes/elastic_exports/providers.analyzer.json
volumes/elastic_exports/provider-performance.analyzer.json
volumes/elastic_exports/providers.mapping.json
volumes/elastic_exports/provider-performance.data.json
volumes/elastic_exports/.keep
volumes/elastic_exports/services.mapping.json
volumes/elastic_exports/services.data.json
volumes/elastic_exports/providers.data.json
volumes/elastic_exports/services.analyzer.json
---------------------
real    5m59.783s
user    5m39.693s
sys     0m30.419s
---------------------

