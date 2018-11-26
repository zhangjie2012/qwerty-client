# qwerty-client

a [qwerty](https://github.com/zhangjie2012/qwerty) web client, based on ant design pro. this is [demo (my blog)](http://www.zhangjiee.com).

qwerty is a full website solution for programmer, [more information](https://github.com/zhangjie2012/qwerty).

## deploy

1. `npm run build` generate `dist`
2. async dist to your vps
3. configure nginx:
    + [x] qwerty-server has run, get running `ip:port`
    + [x] index leading to the right dist path
    + [x] `api/__adm` proxy_pass to server
    + [x] django-admin static css/js file leading to the right path
4. `nginx -s reload`

maybe nginx config file like this:

``` nginx
server {
  server_name www.xxx.com;

  gzip on;
  gzip_min_length 1k;
  gzip_comp_level 9;
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary on;
  gzip_disable "MSIE [1-6]\.";

  root /data/qwerty/dist;

  location / {
    gzip_static on;
    try_files $uri @index;
  }

  location @index {
    add_header Cache-Control no-cache;
    expires 0;
    try_files /index.html =404;
  }

  location /server/ {
    proxy_pass http://127.0.0.1:8080/;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_set_header   Host              $http_host;
    proxy_set_header   X-Real-IP         $remote_addr;
    client_max_body_size    64m;
  }

  location /__adm/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_set_header   Host              $http_host;
    proxy_set_header   X-Real-IP         $remote_addr;
  }

  location /static {
    alias /data/static;
  }
}
```

more build and deploy look [Pro Build & Deploy](https://pro.ant.design/docs/deploy) document.
