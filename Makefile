.PHONY: build run start stop clean test connect promote

PROJ_NAME = "cms-utilization-search"
CONTAINER_DEV_IMAGE = "sudowing/cms-utilization-search:develop"

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

