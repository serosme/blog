# Nginx Proxy Manager

- **官网**: <https://nginxproxymanager.com/>
- **Docker Hub**: <https://hub.docker.com/r/jc21/nginx-proxy-manager>

## 运行

### Docker CLI

```bash
docker run -d \
  -p 80:80 \
  -p 443:443 \
  -p 81:81 \
  -v ./nginx_data:/data \
  -v ./nginx_letsencrypt:/etc/letsencrypt \
  --name nginx-proxy-manager \
  jc21/nginx-proxy-manager:latest
```

### Docker Compose

```yaml
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
      - 81:81
    volumes:
      - ./nginx_data:/data
      - ./nginx_letsencrypt:/etc/letsencrypt
```

## 默认管理员账号

| 字段 | 值                  |
| ---- | ------------------- |
| 邮箱 | `admin@example.com` |
| 密码 | `changeme`          |

## 最佳实践：使用 Docker 网络

创建共享网络，使 Nginx Proxy Manager 与其它容器（如 Portainer）互通：

```bash
docker network create nginx-network
```

**docker-compose.yml 示例：**

```yaml
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
      - 81:81
    volumes:
      - ./nginx_data:/data
      - ./nginx_letsencrypt:/etc/letsencrypt

  portainer:
    image: portainer/portainer
    restart: unless-stopped
    privileged: true
    volumes:
      - ./portainer_data:/data
      - /var/run/docker.sock:/var/run/docker.sock

networks:
  default:
    external: true
    name: nginx-network
```
