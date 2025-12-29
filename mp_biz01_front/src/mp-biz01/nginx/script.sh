#!/bin/sh

export ACCESS_CONTROL_ALLOW_ORIGIN_MAP=$(env | awk -v pattern="^ACCESS_CONTROL_ALLOW_ORIGIN_.+=(.+)$" '$0 ~ pattern { print gensub(pattern, "\047\\1\047 \047\\1\047;", "g") }')

cat /etc/nginx/nginx.conf.template | \
    envsubst '$$NGINX_PORT,$$ACCESS_CONTROL_ALLOW_ORIGIN_MAP,$$ALLOW_FRAME_ANCESTORS_DOMAIN' > /etc/nginx/nginx.conf \
    && nginx -g 'daemon off;'
