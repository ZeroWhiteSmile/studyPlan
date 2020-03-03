## Arguments 对象

arguments 是一个对应于传递给函数的参数的**类数组对象**。

```
arguments
```

## 描述

arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

```
arguments[0]
arguments[1]
arguments[2]
```

参数也可以被设置：

```
arguments[1] = 'new value';
```

```
a = () => {console.log(arguments)}
a() // Uncaught ReferenceError: arguments is not defined

a = function () {console.log(arguments)}
a()
/* 
Arguments [
	length: 0, 
	callee: ƒ(), 
	Symbol(Symbol.iterator): ƒ values(),
	__proto__: Object
]*/
```
arguments对象不是一个 Array 。它类似于Array，但除了**length属性和索引元素**之外没有任何Array属性。例如，它没有 pop 方法。**但是它可以被转换为一个真正的Array**：
```
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments); //func.call(thisArg, arg1, args2, ...)

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 - 更多信息)。如果你关心性能，尝试通过遍历arguments对象来构造一个新的数组。另一种方法是使用null的Array构造函数作为一个函数：
```
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
```

如果调用的参数多于正式声明接受的参数，则可以使用arguments对象。这种技术对于可以传递可变数量的参数的函数很有用。使用 arguments.length来确定传递给函数参数的个数，然后使用arguments对象来处理每个参数。要确定函数签名中（输入）参数的数量，请使用Function.length属性。
```
var a = function () {console.log(arguments)}
a(1).fucntion.length // Arguments [1, callee: ƒ(), Symbol(Symbol.iterator): ƒ values()]
```


### 对参数使用 typeof

typeof arguments返回 'object'。

```
var a = function () {
	console.log(typeof arguments);    // 'object'
}
```

```
// arguments 对象只能在函数内使用，不能再箭头函数内使用
function test(a){
    console.log(a, Object.prototype.toString.call(arguments)) // 1 "[object Arguments]"
    console.log(arguments[0], arguments[1]) // 1 undefined
    console.log(typeof arguments[0]) // number
}
test(1)
```

可以使用索引确定单个参数的类型。

```
console.log(typeof arguments[0])
```

### 对参数使用扩展语法

您还可以使用**Array.from()**方法或**扩展运算符**将参数转换为**真实数组**：

```
var args = Array.from(arguments)
var args = [...arguments]
```

### 例子 - 遍历参数求和

```
function add() {
    var sum =0,
        len = arguments.length
    for(var i=0; i<len; i++){
        sum += arguments[i]
    }
    return sum
}
add()                           // 0
add(1)                          // 1
add(1,2,3,4)                   // 10
```


### 例子 - 定义连接字符串的函数

func.call(thisArg, arg1, args2, ...)

这个例子定义了一个函数来连接字符串。这个函数唯一正式声明了的参数是一个字符串，该参数指定一个字符作为衔接点来连接字符串。该函数定义如下：

```
function myConcat(separator) {
  // func.call(thisArg, arg1, arg2, ...)
  // 在使用slice()时候，只有第一个参数有用
  var args = Array.prototype.slice.call(arguments)
  console.log(args)
  return args.join(separator)  // arrayObject.join()分割数组放入一个字符串。
}

myConcat(", ", "red", "orange", "blue")
// ["red", "orange", "blue"]
// ,
// "red, orange, blue"
```

### 剩余参数、默认参数和解构赋值参数

arguments对象可以与剩余参数、默认参数和解构赋值参数结合使用。

```
function foo(...args) {
  return args;
}
foo(1, 2, 3);  // [1,2,3]
```

在严格模式下，剩余参数、默认参数和解构赋值参数的存在不会改变 arguments对象的行为，但是在非严格模式下就有所不同了。

1.当**非严格模式**中的函数**没有包含**剩余参数、默认参数和解构赋值，那么arguments对象中的值会**跟踪参数的值**（反之亦然）。

```
function func(a) { 
  arguments[0] = 99;   // 更新了arguments[0] 同样更新了a
  console.log(a);
}
func(10); // 99
```
并且
```
function func(a) { 
  a = 99;              // 更新了a 同样更新了arguments[0] 
  console.log(arguments[0]);
}
func(10); // 99
```

2.当**非严格模式**中的函数**有包含**剩余参数、默认参数和解构赋值，那么arguments对象中的值**不会跟踪参数的值**（反之亦然）。相反, arguments反映了调用时提供的参数：

```
function func(a = 55) { 
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
func(10); // 10
```
并且
```
function func(a = 55) { 
  a = 99; // updating a does not also update arguments[0]
  console.log(arguments[0]);
}
func(10); // 10
```
并且
```
function func(a = 55) { 
  console.log(arguments[0]);
}
func(); // undefined
```