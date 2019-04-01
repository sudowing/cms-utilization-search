.PHONY: build run start stop clean test connect promote export

PROJ_NAME = "cms-utilization-search"
CONTAINER_DEV_IMAGE = "sudowing/cms-utilization-search:develop"
PWD = $(shell pwd)
ES_SERVICE = "http://localhost:9200"

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
	@docker-compose -f docker-compose.yml down --remove-orphan

start:
	@docker-compose -f docker-compose.yml up -d

seed:
	docker run \
		--rm \
		--net=host \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		-e ES_SERVICE="http://localhost:9200" \
		--entrypoint bash \
		--name cms-elasticsearch-exporter \
		sudowing/cms-utilization-search:master \
		-c 'bash /scripts/seed.index.sh'

export-services:
	# remove previous backups
	rm volumes/elastic_exports/services*.json
	# EXPORT Index: services
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/services \
		--output=/tmp/services.analyzer.json \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/services \
		--output=/tmp/services.mapping.json \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/services \
		--output=/tmp/services.data.json \
		--type=data

export-providers:
	# remove previous backups
	rm volumes/elastic_exports/providers*.json
	# EXPORT Index: providers
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/providers \
		--output=/tmp/providers.analyzer.json \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/providers \
		--output=/tmp/providers.mapping.json \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/providers \
		--output=/tmp/providers.data.json \
		--type=data

export-provider-performance:
	# remove previous backups
	rm volumes/elastic_exports/provider-performance*.json
	# EXPORT Index: provider-performance
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/provider-performance \
		--output=/tmp/provider-performance.analyzer.json \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/provider-performance \
		--output=/tmp/provider-performance.mapping.json \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=${ES_SERVICE}/provider-performance \
		--output=/tmp/provider-performance.data.json \
		--type=data

export:
	make export-services
	make export-providers
	make export-provider-performance

compress:
	cd ${PWD}/volumes && tar -cjvf elastic_exports.tar.bz2 elastic_exports/ && cd ${PWD}

uncompress-to-disk:
	docker run \
	--rm \
	-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
	--entrypoint bash \
	--name cms-elasticsearch-exporter \
	sudowing/cms-utilization-search:develop \
	-c 'tar -xvf /elastic_exports.tar.bz2 -C /tmp'

import-services:
	# IMPORT Index: services
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/services.analyzer.json \
		--output=${ES_SERVICE}/services \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/services.mapping.json \
		--output=${ES_SERVICE}/services \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/services.data.json \
		--output=${ES_SERVICE}/services \
		--type=data

import-providers:
	# IMPORT Index: providers
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/providers.analyzer.json \
		--output=${ES_SERVICE}/providers \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/providers.mapping.json \
		--output=${ES_SERVICE}/providers \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/providers.data.json \
		--output=${ES_SERVICE}/providers \
		--type=data

import-provider-performance:
	# IMPORT Index: provider-performance
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/provider-performance.analyzer.json \
		--output=${ES_SERVICE}/provider-performance \
		--type=analyzer
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/provider-performance.mapping.json \
		--output=${ES_SERVICE}/provider-performance \
		--type=mapping
	docker run --net=host --rm -ti \
		-v ${PWD}/volumes/elastic_exports:/tmp/elastic_exports \
		sudowing/cms-utilization-search:latest \
		--input=/tmp/elastic_exports/provider-performance.data.json \
		--output=${ES_SERVICE}/provider-performance \
		--type=data

import:
	make import-services
	make import-providers
	make import-provider-performance

load:
	make uncompress-to-disk
	make import

