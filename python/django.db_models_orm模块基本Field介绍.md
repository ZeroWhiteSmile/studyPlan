## django.db_models_orm框架 基本Field介绍

ORM：object relational mapping,对象关系映射

django中使用原生sql的弊端：
　　1、SQL语句重复率很高，利用率不高
　　2、如果业务逻辑生变，原生SQL更改起来比较多
　　3、容易忽略一些web安全问题，如SQL注入

ORM的优点：
　　易用性：使用ORM做数据库的开发可以有效的减少重复SQL语句的概率，写出来的模型也更加直观、清晰。
　　性能损耗小：ORM转换成底层数据库操作指令确实会有一些开销。但从实际的情况来看，这种性能损耗很少（不足5%），只要不是对性能有严苛的要求，综合考虑开发效率、代码的阅读性，带来的好处要远远大于性能损耗，而且项目越大作用越明显。
　　设计灵活：可以轻松的写出复杂的查询。
　　可移植性：Django封装了底层的数据库实现，支持多个关系数据库引擎，包括流行的MySQL、PostgreSQL和SQLite。可以非常轻松的切换数据库。

---
### ORM常用字段类型：

1、CharField：字符串类型，映射到数据库中会转换成varchar类型，使用时必须传入max_length属性以定义该字符串的最大长度，如果超过254个字符，就不建议使用CharField了，此时建议使用TextField。

2、EmailField：在数据库底层也是一个varchar类型，默认最大长度是254个字符，当然也可以自己传递max_length参数，这个Field在数据库层面不会限制一定要传递符合email条件的字符串，只是以后在使用ModelForm表单验证时，会起作用

3、URLField：类似于CharField，在数据库底层也是一个varchar类型，只不过只能用来存储url格式的字符串。并且默认的max_length是200，同EmailField

4、FloatField：浮点数类型，映射到数据库中会变成double类型

5、IntegerField：整数类型，映射到数据库中会变成11位的int类型

6、BigIntegerField：大整形。值的区间是-9223372036854775808——9223372036854775807

7、PositiveIntegerField：正整形。值的区间是0——2147483647

8、SmallIntegerField：小整形。值的区间是-32768——32767

9、PositiveSmallIntegerField：正小整形。值的区间是0——32767

10、BooleanField：布尔类型(True/False)，映射到数据库中会变成长度只有1位的tinyint类型，这个Field不接受null参数，要想使用可以为null的布尔类型的字段，就要使用NullBooleanField

11、AutoField:自增长类型，映射到数据库中是11位的整数，使用此字段时，必须传递primary_key=True，否则在生成迁移脚本文件时，就会报错，一个模型不能有两个自增长字段。一般情况下我们用不到这个字段，如果不定义主键，django会自动的为我们生成id字段作为主键

12、BigAutoField：自增长类型，用法同AutoField。映射到数据库中会成为20位的bigint类型

13、DateTimeField：日期时间类型，在python中对应的是datetime.datetime类型，在映射到数据库中也是datetime类型。可以传递以下几个参数：
> 
auto_now=True：在每次这个数据保存的时候，都使用当前的时间。比如作为一个记录**修改日期**的字段
auto_now_add=True：在每条数据第一次被添加进去的时候，都使用当前的时间。比如作为一个**记录第一次入库**的字段
注意：如果在**setting.py中配置了USE_TZ=True**，那么上两个默认值都来自于django.utils.timezone.now所转化来的值
在模板中将一个UTC时间转换成本地时间：
首先模板HTML文件的开头导入tz:
 {% load tz %}
在传递过来的时间变量utc_time中使用localtime过滤器：
 {{utc_time | localtime}}
其实，django知道我们的想法，已经为我们做好了配置，我们并不需要配置其他的东西就可以直接使用{{utc_time}},此时只要我们在setting.py文件中设置　　USE_TZ=True,TIME_ZONE='Asia/Shanghai',UTC时间变量在渲染到模板上的时候会自动的为我们加载成TIME_ZONE中所设置的时区的时间。

14、DateField：日期类型，用法同DateTimeField，在python中对应的是datetime.date类型，在映射到数据库中是date类型

15、TimeField：时间类型，用法同DateTimeField，在python中对应的是datetime.time类型，在映射到数据库中是time类型

16、FileField：用来存储文件的

17、ImageField：用来存储图片文件的

18、TextField：大量的文本类型

19、DecimalField: 一个固定精度的十进制数类型，使用时必须要传递两个参数，max_digits数字的最大总长度(不含小数点),decimal_places小数部分的长度