# Docker Reference

## 文档

[Docker Docs](https://docs.docker.com/)

## 配置

配置文件默认位置为 `/etc/docker/daemon.json`

```json
{
  // 镜像
  "registry-mirrors": ["..."],

  // 代理
  "proxies": {
    "http-proxy": "http://127.0.0.1:7890",
    "https-proxy": "http://127.0.0.1:7890",
    "no-proxy": "localhost,127.0.0.1"
  }
}
```

## 实践

使用 `registry` 搭建 `Docker Hub` 私服

```shell
docker run -d --rm \
  -p 5000:5000 \
  -e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io \
  --name registry \
  registry
```

使用 `runlike` 生成已知镜像的运行命令

```shell
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  assaflavie/runlike my-container
```

构建镜像时使用主机代理

```shell
docker build -t my-image:latest \
    --network host \
    --build-arg "HTTP_PROXY=http://127.0.0.1:7890" \
    --build-arg "HTTPS_PROXY=http://127.0.0.1:7890" \
    --build-arg "NO_PROXY=localhost,127.0.0.1" \
    .
```
