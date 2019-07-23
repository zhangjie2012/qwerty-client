# qwerty-client

[qwerty](http://getqwerty.org/) 的 Web 前端，基于 [Ant Design Pro](https://pro.ant.design/index-cn) 开发。

## 部署

1. `npm run build` 生成 `dist`
2. 同步 dist 到主机上
3. 配置 nginx:
    + [x] 确保 server 端已经运行，得到 `ip:port`
    + [x] index 指向 dist 所在目录
    + [x] `api/__adm` proxy_pass 到服务端
    + [x] django-admin 静态文件 `css/js` 指向正确的位置，_TODO：后端 Dockerfile 使用 nginx 之后，前端就不用管这个事了_
4. `nginx -s reload` _如果仅仅更新了静态文件，没有更新 nginx 配置文件，不需要重新加载 nginx_

nginx 样例：

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
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;

    client_max_body_size    64m;
  }

  location /__adm/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_set_header   Host              $http_host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
  }

  location /static {
    alias /data/static;
  }
}
```

更多的构建和部署说明，请查看 [Pro Build & Deploy](https://pro.ant.design/docs/deploy) 文档。
