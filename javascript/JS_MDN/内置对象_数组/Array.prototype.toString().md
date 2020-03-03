## Array.prototype.toString()

toString() 返回一个字符串，表示指定的数组及其元素。

```
arr.toString()
```

返回值 -- 一个表示指定的数组及其元素的字符串。


## 描述

Array对象覆盖了Object的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

```
var a = [1,2,3]
a.toString()
"1,2,3"
```

