# MySQL

- [MySQL](#mysql)
  - [Simple Usage](#simple-usage)
  - [Command](#command)
  - [Database dumps](#database-dumps)
    - [Creating database dump](#creating-database-dump)
    - [Creating all database dump](#creating-all-database-dump)
    - [Restoring data from dump files](#restoring-data-from-dump-files)
  - [Environment](#environment)

## Simple Usage

```bash
docker run -d \
  --name mysql \
  -p 33061:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=Password@123 \
  -v mysql_data:/var/lib/mysql \
  mysql:latest \
  mysqld \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

## Command

Create database

```bash
CREATE DATABASE `example` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
```

Create user

```bash
CREATE USER 'example'@'%' IDENTIFIED BY 'Password@123';

```

Grant privileges

```bash
GRANT ALL PRIVILEGES ON `example`.* TO 'example'@'%';
```

Flush privileges

```bash
FLUSH PRIVILEGES;
```

## Database dumps

### Creating database dump

Running natively

```bash
mysqldump -uroot -pPassword@123 --databases example > example.sql
```

```bash
mysqldump -h 127.0.0.1 -u root -p Password@123 --databases example > example_$(date +%Y%m%d).sql
```

Running via Docker

```bash
docker exec mysql sh -c "exec mysqldump -uroot -pPassword@123 --databases example" > example.sql
```

```bash
docker exec kyuan/mariadb-tools:latest sh -c "mariadb-dump --ssl=0 -h172.30.0.81 -uszzf -pjRzZHvnjRm1kJ9fRj5SL --databases data_property_rights_registration" > data_property_rights_registration_$(date +%Y%m%d%H%M%S).sql
```

```bash
docker run --rm kyuan/mariadb-tools:latest sh -c "mariadb-dump -uroot -pPassword@123 --databases example" > example.sql
```

```bash
docker run --rm kyuan/mariadb-tools:latest sh -c "mariadb-dump --ssl=0 -h172.30.0.81 -uszzf -pjRzZHvnjRm1kJ9fRj5SL --databases data_property_rights_registration" > example.sql
```

### Creating all database dump

Running natively

```bash
mysqldump -uroot -pPassword@123 --all-databases > all_databases.sql
```

Running via Docker

```bash
docker exec mysql sh -c "exec mysqldump -uroot -pPassword@123 --all-databases" > all_databases.sql
```

### Restoring data from dump files

Running natively

```bash
mysql -uroot -pPassword@123 < example.sql
```

Running via Docker

```bash
docker exec -i mysql sh -c 'exec mysql -uroot -pPassword@123' < example.sql
```

## Environment

Environment Variables

```yaml
environment:
  MYSQL_DATABASE: schema_name
  MYSQL_USER: username
  MYSQL_PASSWORD: Password@123
```
