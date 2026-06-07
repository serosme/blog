# Ubuntu

## 安装

安装指定的 Linux 发行版

```bash
wsl --install --name Ubuntu -d Ubuntu-26.04
```

手动安装指定的 Linux 发行版

```bash
wsl --install --name Ubuntu --from-file .\Downloads\ubuntu-26.04-wsl-amd64.gz
```

## 软件源

```bash
bash <(curl -fsSL https://blog.seros.me/ubuntu-resolute-deb822)
```
