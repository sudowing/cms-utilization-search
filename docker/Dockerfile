FROM node:8.12-alpine
LABEL maintainer="open-source@joewingard.com"

COPY ./volumes/elastic_exports.tar.bz2 /elastic_exports.tar.bz2

RUN apk add --no-cache bash tar
RUN npm install elasticdump -g

COPY ./scripts /scripts

ENTRYPOINT ["elasticdump"]

# run at runtime -- 8gbs uncompressed
# ENTRYPOINT ["bash"]
# RUN ["bash", "/scripts/seed.index.sh"]