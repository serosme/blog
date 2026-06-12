# Nginx UI

## 文档

[官网](https://nginxui.com/zh_CN/)

[Docker Hub](https://hub.docker.com/r/uozi/nginx-ui)

## Docker Compose

```yaml
volumes:
  nginx:
  ui:

services:
  nginx-ui:
    image: uozi/nginx-ui:latest
    environment:
      - TZ=Asia/Shanghai
      - NGINX_UI_SERVER_PORT=8080
      - NGINX_UI_IGNORE_DOCKER_SOCKET=true
      - NGINX_UI_LOGROTATE_ENABLED=true
    volumes:
      - nginx:/etc/nginx
      - ui:/etc/nginx-ui
    ports:
      - '8080:8080'
      - '90:90'
      - '9000-9090:9000-9090'
```

## 环境变量说明

| 变量                            | 说明                        |
| ------------------------------- | --------------------------- |
| `TZ`                            | 时区，示例 `Asia/Shanghai`  |
| `NGINX_UI_SERVER_PORT`          | Web 管理面板端口            |
| `NGINX_UI_IGNORE_DOCKER_SOCKET` | 是否忽略 Docker Socket 挂载 |
| `NGINX_UI_LOGROTATE_ENABLED`    | 是否启用日志轮转            |
