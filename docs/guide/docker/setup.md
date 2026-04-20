# Docker Setup

## 文档

[Docker Docs](https://docs.docker.com/)

## 安装

下载安装脚本

```bash
curl -x 127.0.0.1:7890 -fsSL https://get.docker.com -o get-docker.sh
```

执行安装脚本

```bash
sudo DOWNLOAD_URL=https://mirrors.ustc.edu.cn/docker-ce sh get-docker.sh
```

添加用户组

```bash
sudo usermod -aG docker $USER
```
