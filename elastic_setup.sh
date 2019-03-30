docker pull docker.elastic.co/elasticsearch/elasticsearch:6.6.2

docker run \
-p 9200:9200 \
-p 9300:9300 \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic:/usr/share/elasticsearch/data \
-e "discovery.type=single-node" \
--name cms-elasticsearch \
docker.elastic.co/elasticsearch/elasticsearch:6.6.2


docker run \
-p 9200:9200 \
-p 9300:9300 \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_test:/usr/share/elasticsearch/data \
-e "discovery.type=single-node" \
--name cms-elasticsearch \
docker.elastic.co/elasticsearch/elasticsearch:6.6.2

https://www.elastic.co/guide/en/elasticsearch/reference/6.7/docker.html


elasticdump \
  --input=http://localhost:9200/provider-performance \
  --output=$ \
  | gzip > provider-performance.json.gz

  # Copy an index from production to staging with mappings:
docker run --rm -ti taskrabbit/elasticsearch-dump \
  --input=http://production.es.com:9200/my_index \
  --output=http://staging.es.com:9200/my_index \
  --type=mapping
docker run --rm -ti taskrabbit/elasticsearch-dump \
  --input=http://production.es.com:9200/my_index \
  --output=http://staging.es.com:9200/my_index \
  --type=data









# Backup index data to a file:
docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/provider-performance \
  --output=/tmp/provider-performance.analyzer.json \
  --type=analyzer

docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/provider-performance \
  --output=/tmp/provider-performance.mapping.json \
  --type=mapping

docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/provider-performance \
  --output=/tmp/provider-performance.data.json \
  --type=data

===========================

# Backup index data to a file:
docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=/tmp/provider-performance.analyzer.json \
  --output=http://localhost:9200/provider-performance \
  --type=analyzer

docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=/tmp/provider-performance.mapping.json \
  --output=http://localhost:9200/provider-performance \
  --type=mapping

docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=/tmp/provider-performance.data.json \
  --output=http://localhost:9200/provider-performance \
  --type=data























# Backup index data to a file:
docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/providers \
  --output=/tmp/providers.analyzer.json \
  --type=analyzer

docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/providers \
  --output=/tmp/providers.mapping.json \
  --type=mapping

docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/providers \
  --output=/tmp/providers.data.json \
  --type=data

























rm volumes/elastic_exports/services.analyzer.json
# Backup index data to a file:
docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/services \
  --output=/tmp/services.analyzer.json \
  --type=analyzer

rm volumes/elastic_exports/services.mapping.json
docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/services \
  --output=/tmp/services.mapping.json \
  --type=mapping

rm volumes/elastic_exports/services.data.json
docker run --net=host --rm -ti \
-v /Users/joe/Documents/dev/repos/cms-utilization-search/volumes/elastic_exports:/tmp \
taskrabbit/elasticsearch-dump \
  --input=http://localhost:9200/services \
  --output=/tmp/services.data.json \
  --type=data


















===================================
===================================
# Backup index data to a file:
docker run --net=host --rm -ti taskrabbit/elasticsearch-dump \
  --type=analyzer \
  --input=http://localhost:9200/services \
  --output=$ | gzip -d volumes/elastic_exports/services.analyzer.json.gz
---------------------------------
docker run --net=host --rm -ti taskrabbit/elasticsearch-dump \
  --type=mapping \
  --input=http://localhost:9200/services \
  --output=$ | gzip > volumes/elastic_exports/services.mapping.json.gz
---------------------------------
docker run --net=host --rm -ti taskrabbit/elasticsearch-dump \
  --type=data \
  --input=http://localhost:9200/services \
  --output=$ | gzip > volumes/elastic_exports/services.data.json.gz
===================================
===================================
# Backup index data to a file:
docker run --net=host --rm -ti taskrabbit/elasticsearch-dump \
  --type=analyzer \
  --output=http://localhost:9200/services \
  --input=$ cat volumes/elastic_exports/services.analyzer.json.gz | gzip -d


