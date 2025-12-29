#!/bin/sh

cat /etc/nginx/nginx.conf.template | \
    envsubst '$$NGINX_PORT,$$ALLOW_FRAME_ANCESTORS_DOMAIN' > /etc/nginx/nginx.conf \
    && nginx -g 'daemon off;'
