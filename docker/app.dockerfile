FROM node:20-alpine

WORKDIR /var/www/excdev/

RUN set -ex \
  && apk add --no-cache \
  build-base \
  npm \
  bash \
  && rm -rf /var/cache/apk/*

COPY docker/entrypoint /

ENTRYPOINT [ "/entrypoint" ]
