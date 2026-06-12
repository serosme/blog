# Official Docker

- **Docker Hub**: <https://hub.docker.com/_/nginx>

## 基础命令

### logrotate

轮转 Nginx 日志文件：

```bash
logrotate /etc/logrotate.d/nginx
```

## 快速启动

```bash
docker run -d -p 8080:80 --name nginx nginx
```

## 自定义配置

### 导出默认配置

将容器内的默认 Nginx 配置导出到宿主机：

```bash
docker run --rm -v /data/nginx/nginx_config:/tmp/copy nginx:latest sh -c "cp -r /etc/nginx/. /tmp/copy/"
```

### 挂载自定义配置

将宿主机配置目录挂载到容器内：

```bash
docker run -d \
  -p 80:80 \
  -v /data/nginx/nginx_config:/etc/nginx \
  -v /data/nginx/nginx_data:/data \
  --name nginx \
  nginx:latest
```
