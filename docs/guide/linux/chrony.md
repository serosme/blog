# chrony

## 前提

- 服务器 IP：192.168.56.1
- 客户端和服务器在同一网段 `192.168.56.0/24`
- 已安装 `chrony`

## 配置 NTP 服务器

### 修改配置文件

编辑：

```bash
vi /etc/chrony.conf
```

在文件末尾添加：

```bash
allow 192.168.56.0/24
local stratum 10
```

解释：

- `allow`：允许这个网段的客户端同步时间
- `local stratum 10`：即使外网断开，也能作为时间服务器

### 重启服务

```bash
systemctl restart chronyd
```

确认运行状态：

```bash
systemctl status chronyd
```

### 查看连接的客户端（可选）

```bash
chronyc clients
```

## 配置 NTP 客户端

### 备份并注释原有 server

```bash
sed -i.bak 's/^server/# &/' /etc/chrony.conf
```

这一步很重要，避免还去同步公网时间。

### 添加你的服务器

```bash
echo 'server 192.168.56.1 iburst' >> /etc/chrony.conf
```

确认是否添加成功：

```bash
grep '^server' /etc/chrony.conf
```

你应该看到：

```txt
server 192.168.56.1 iburst
```

### 重启服务

```bash
systemctl restart chronyd
```

## 验证是否同步成功

在客户端执行：

### 查看时间源状态

```bash
chronyc sources
```

如果看到前面有 `^*`，说明同步成功。

### 查看同步详情

```bash
chronyc tracking
```

重点看：

- Reference ID
- Stratum
- System time offset

## 常用时间管理命令

### 查看当前时间状态

```bash
timedatectl
```

### 强制立即同步

```bash
chronyc makestep
```

### 设置时区

```bash
timedatectl set-timezone Asia/Shanghai
```

### 关闭 NTP 同步

```bash
timedatectl set-ntp false
```

### 手动设置时间

```bash
timedatectl set-time "2023-10-01 12:00:00"
```

## 最小化总结

服务器：

```bash
vi /etc/chrony.conf
allow 192.168.56.0/24
local stratum 10
systemctl restart chronyd
```

客户端：

```bash
sed -i.bak 's/^server/# &/' /etc/chrony.conf
echo 'server 192.168.56.1 iburst' >> /etc/chrony.conf
systemctl restart chronyd
```

验证：

```bash
chronyc sources
```

看到 `^*` 就成功。
