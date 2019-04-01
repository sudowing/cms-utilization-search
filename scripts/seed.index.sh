echo "UNCOMPRESSING ELASTIC INDEX EXPORTS [start]" \
    &&
echo "" \
    &&
tar -xvf /elastic_exports.tar.bz2 -C /tmp \
#     &&
echo "UNCOMPRESSING ELASTIC INDEX EXPORTS [start]" \
    &&
echo "" \
    &&
echo "" \
    &&
echo "***********************" \
    &&
echo "SEEDING ELASTIC [start]" \
    &&
echo "***********************" \
    &&
echo "" \
    &&
echo "LOADING SERVICE INDEX [start]" \
    &&
echo "" \
    &&
echo "loading service analyzer" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/services.analyzer.json \
    --output=${ES_SERVICE}/services \
    --type=analyzer \
    && \
echo "loading service mapping" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/services.mapping.json \
    --output=${ES_SERVICE}/services \
    --type=mapping \
    && \
echo "loading service data" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/services.data.json \
    --output=${ES_SERVICE}/services \
    --type=data \
    && \
echo "" \
    &&
echo "LOADING SERVICE INDEX [complete]" \
    &&
echo "" \
echo "LOADING PROVIDERS INDEX [start]" \
    &&
echo "" \
    &&
echo "loading providers analyzer" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/providers.analyzer.json \
    --output=${ES_SERVICE}/providers \
    --type=analyzer \
    && \
echo "loading providers mapping" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/providers.mapping.json \
    --output=${ES_SERVICE}/providers \
    --type=mapping \
    && \
echo "loading providers data" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/providers.data.json \
    --output=${ES_SERVICE}/providers \
    --type=data \
    && \
echo "" \
    &&
echo "LOADING PROVIDERS INDEX [complete]" \
    &&
echo "" \
echo "LOADING PROVIDER-PERFORMANCE INDEX [start]" \
    &&
echo "" \
    &&
echo "loading provider-performance analyzer" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/provider-performance.analyzer.json \
    --output=${ES_SERVICE}/provider-performance \
    --type=analyzer \
    && \
echo "loading provider-performance mapping" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/provider-performance.mapping.json \
    --output=${ES_SERVICE}/provider-performance \
    --type=mapping \
    && \
echo "loading provider-performance data" \
    && \
elasticdump \
    --input=/tmp/elastic_exports/provider-performance.data.json \
    --output=${ES_SERVICE}/provider-performance \
    --type=data \
echo "" \
    &&
echo "LOADING PROVIDER-PERFORMANCE INDEX [complete]" \
    &&
echo "" \
    &&
echo "***********************" \
    &&
echo "SEEDING ELASTIC [complete]" \
    &&
echo "***********************"