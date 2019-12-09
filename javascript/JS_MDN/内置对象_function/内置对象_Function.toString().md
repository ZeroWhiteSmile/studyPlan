### Function.toString()

---
#### 语法
```
function.toString()
```

---
#### 返回值

表示函数源代码的一个字符串

---
#### 描述

Function对象覆盖了从Object继承来的toString 方法。对于用户定义的 Function 对象，toString方法返回一个字符串，其中包含用于定义函数的源文本段。

在Function需要转换为字符串时，通常会自动调用函数的 toString 方法。

若 this 不是 Function 对象，则 toString() 方法将抛出 TypeError  ("Function.prototype.toString called on incompatible object") 异常，比如 Proxy 对象就会抛出异常。

如果是在内置函数或由 Function.prototype.bind 返回的函数上调用 toString()，则toString() 返回原生代码字符串，如下
```
"function () {\n    [native code]\n}"
```

若是在由 Function 构造器生成的函数上调用 toString() ，则 toString() 返回创建后的函数源码，包括形参和函数体，函数名为 "anonymous"。

anonymous 英 /əˈnɒnɪməs/  美 /əˈnɑːnɪməs/ adj. 匿名的，无名的；无个性特征的

---
#### 示例

```
Function           				|  Function.prototype.toString result
function f(){}     				|  "function f(){}"
class A { a(){} }  				|  "class A { a(){} }"
function* g(){}    				|  "function* g(){}"
a => a             				|  "a => a"
({ a(){} }.a)      				|  "a(){}"
({ *a(){} }.a)     				|  "*a(){}"
({ [0](){} }[0])   				|  "[0](){}"
Object.getOwnPropertyDescriptor({
    get a(){}
}, "a").get        				|  "set a(x){}"
Function.prototype.toString   	|  "function toString() { [native code] }"
(function f(){}.bind(0))	  	|  "function () { [native code] }"
Function("a", "b")			  	|  "function anonymous(a\n) {\nb\n}"
```