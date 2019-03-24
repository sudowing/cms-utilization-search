docker pull docker.elastic.co/elasticsearch/elasticsearch:6.6.2

docker run \
-p 9200:9200 \
-p 9300:9300 \
-v /home/user/Documents/dev/repos/cms-utilization-search/volumes/elastic:/usr/share/elasticsearch/data \
-e "discovery.type=single-node" \
--name cms-elasticsearch \
docker.elastic.co/elasticsearch/elasticsearch:6.6.2


https://www.elastic.co/guide/en/elasticsearch/reference/6.7/docker.html
