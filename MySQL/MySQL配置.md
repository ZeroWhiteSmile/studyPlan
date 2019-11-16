### mysql配置环境变量

在”系统变量“内，新建一个 MYSQL_HOME 变量，输入你的 MySQL 解压缩后文件夹的目录；

在“系统变量内”找到其中的 “Path” 变量，双击打开，再最后加上： %MYSQL_HOME%\bin


### 新建 my.ini 文件

```
[mysql]  
# 设置 mysql 客户端默认字符集  
default-character-set=utf8 
 
[mysqld]  
#设置 3306 端口  
port = 3306  

# 设置 mysql 的安装目录  
basedir=C:\Program Files\MySQL\MySQL Server 8.0

# 设置 mysql 数据库的数据的存放目录  
datadir=D:\study\mysql\MySQL_DATA

# 允许最大连接数  
max_connections=200  

# 服务端使用的字符集默认为 8 比特编码的 latin1 字符集  
character-set-server=utf8  

# 创建新表时将使用的默认存储引擎  
default-storage-engine=INNODB
```