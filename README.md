# qwerty-client

a [qwerty](https://github.com/zhangjie2012/qwerty) web client, based on ant design pro. this is [demo (my blog)](http://www.zhangjiee.com).

qwerty is a full website solution for programmer, [more information](https://github.com/zhangjie2012/qwerty).

## deploy

1. `npm run build` generate `dist`
2. async dist to your vps
3. configure nginx:
    + [x] qwerty-server has run, get running `ip:port`
    + [x] index leading to the right dist path
    + [x] api/__adm proxy_pass to server
    + [x] django-admin static css/js file leading to the right path

maybe nginx config file like this:

``` nginx
server {
    server_name www.xxx.com;

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
        client_max_body_size    64m;
    }

    location /__adm/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location /static {
        alias /data/static; # put django admin css/js file in here
    }
}
```

对于国内用户（`dist/index.html`），`https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js` 访问速度比较慢，建议换成七牛的地址：`https://cdn.staticfile.org/less.js/2.7.3/less.min.js`。
