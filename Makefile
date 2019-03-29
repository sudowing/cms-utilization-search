.PHONY: build run start stop clean test connect promote export

PROJ_NAME = "cms-utilization-search"
CONTAINER_DEV_IMAGE = "sudowing/cms-utilization-search:develop"
PWD = $(shell pwd)
build:
	docker build --pull -t $(CONTAINER_DEV_IMAGE) -f docker/Dockerfile .

release:
	make build
	docker tag $(CONTAINER_DEV_IMAGE) sudowing/cms-utilization-search:master
	# docker tag $(CONTAINER_DEV_IMAGE) sudowing/cms-utilization-search:1.1.0
	docker tag $(CONTAINER_DEV_IMAGE) sudowing/cms-utilization-search:latest
	docker tag $(CONTAINER_DEV_IMAGE) sudowing/cms-utilization-search:edge

publish:
	# docker push sudowing/cms-utilization-search:1.1.0
	docker push sudowing/cms-utilization-search:latest
	docker push sudowing/cms-utilization-search:edge

stop:
	@docker-compose stop

clean:
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml down --remove-orphan

run:
	make build
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml up

start:
	@docker-compose -f docker-compose.yml up -d

export-services:
	# remove previous backups
	rm volumes/elastic_dumps/services*.json
	# EXPORT Index: services
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/services \
		--output=/tmp/services.analyzer.json \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/services \
		--output=/tmp/services.mapping.json \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/services \
		--output=/tmp/services.data.json \
		--type=data

export-providers:
	# remove previous backups
	rm volumes/elastic_dumps/providers*.json
	# EXPORT Index: providers
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/providers \
		--output=/tmp/providers.analyzer.json \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/providers \
		--output=/tmp/providers.mapping.json \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/providers \
		--output=/tmp/providers.data.json \
		--type=data

export-provider-performance:
	# remove previous backups
	rm volumes/elastic_dumps/provider-performance*.json
	# EXPORT Index: provider-performance
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/provider-performance \
		--output=/tmp/provider-performance.analyzer.json \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/provider-performance \
		--output=/tmp/provider-performance.mapping.json \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=http://localhost:9200/provider-performance \
		--output=/tmp/provider-performance.data.json \
		--type=data

import-services:
	# IMPORT Index: services
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/services.analyzer.json \
		--output=http://localhost:9200/services \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/services.mapping.json \
		--output=http://localhost:9200/services \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/services.data.json \
		--output=http://localhost:9200/services \
		--type=data

import-providers:
	# IMPORT Index: providers
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/providers.analyzer.json \
		--output=http://localhost:9200/providers \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/providers.mapping.json \
		--output=http://localhost:9200/providers \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/providers.data.json \
		--output=http://localhost:9200/providers \
		--type=data

import-provider-performance:
	# IMPORT Index: provider-performance
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/provider-performance.analyzer.json \
		--output=http://localhost:9200/provider-performance \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/provider-performance.mapping.json \
		--output=http://localhost:9200/provider-performance \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_dumps:/tmp \
		taskrabbit/elasticsearch-dump \
		--input=/tmp/provider-performance.data.json \
		--output=http://localhost:9200/provider-performance \
		--type=data
