## django + vue 搭建

### pycharm搭建django

### 项目名称

<img src='img/create_django.png' />

<img src='img/project_menu.png' />

---
### DATABASES配置

修改项目根目录'object_websites'下'setting.py'中数据库'DATABASES={}'配置
```
# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
改为
```
DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    # }

    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mywebsite', # '数据库名'不是连接名字
        'USER': 'root',     # 用户名
        'PASSWORD': 'root', # 密码
        'HOST': 'localhost', # 数据库连接设置里的主机，localhost 或者ip地址，必须一致
		'PORT': 3306 # 端口号
    }
}
```
**注意：'HOST': 'localhost'，本地数据库只能只用localhost**
<img src='img/database.png' />


---
### DOS命令连接数据库(用于测试)

cd到mysql安装目录，在DOS命令窗口输入 mysql -hlocalhost -uroot -p回车，输入密码, 进入mysql数据库.
-h为主机，localhost表示本地；-u为数据库用户名，root是mysql默认用户名；-p为密码，如果设置了密码，可直接在-p后链接输入
```
cd C:\Program Files\MySQL\MySQL Server 5.7\bin

mysql -hlocalhost -uroot -p
```

---
### 安装pymysql mysqlclient
```
pip install pymysql
pip install mysqlclient
```

---
### 并把app加入到installed_apps列表里：

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myWebsite'
]
```

---
### 添加项目根目录'object_websites'下'__init__.py'中配置

```
import pymysql
pymysql.install_as_MySQLdb()
```

---
### 报错：
> 
django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.

解决：
>  
这个是Django对MySQLdb版本的限制，我们使用的是PyMySQL，所以不用管它


---
### 报错：
> 
File "F:\Study_objectMenu\Python\object_websites\venv\lib\site-packages\django\db\backends\mysql\base.py", line 37, in <module>
    raise ImproperlyConfigured('mysqlclient 1.3.13 or newer is required; you have %s.' % Database.__version__)
django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.

解决：
> 
按图找到你Django F:\Study_objectMenu\Python\object_websites\venv\lib\site-packages\django\db\backends\mysql\base.py目录下的base.py文件注释掉：
if version < (1, 3, 13):
    raise ImproperlyConfigured('mysqlclient 1.3.13 or newer is required; you have %s.' % Database.__version__)
