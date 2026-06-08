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
sudo tee /etc/apt/sources.list.d/ubuntu.sources > /dev/null << 'EOF'
Types: deb
URIs: https://mirrors.ustc.edu.cn/ubuntu
Suites: resolute resolute-updates resolute-backports resolute-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
EOF
```
