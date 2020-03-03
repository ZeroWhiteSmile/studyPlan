## Object.getPrototypeOf()(Function.prototype)

Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值，一般来说是{}）

例如：
```
function employee(){}
var bill=new employee()

employee.prototype.salary=20000

bill.salary //20000
```

语法:
```
Object.getPrototypeOf(object)
```

obj -- 要返回其原型的对象。

返回值 -- 给定对象的原型。如果没有继承属性，则返回 null 。


---
JavaScript中的 Object 是**构造函数（创建对象的包装器**）。
一般用法是：
```
var obj = new Object();
// 所以：
Object.getPrototypeOf( Object );               // ƒ () { [native code] }
Object.getPrototypeOf( Function );             // ƒ () { [native code] }
Object.getPrototypeOf( Object ) === Function.prototype;        // true
```


---
Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
返回的当然是函数对象的原型，也就是 **Function.prototype**。
```
var obj = new Object();
Object.prototype === Object.getPrototypeOf( obj );              // true
Object.prototype === Object.getPrototypeOf( {} );               // true
```

