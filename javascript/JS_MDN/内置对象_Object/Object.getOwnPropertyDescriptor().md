## Object.getOwnPropertyDescriptor()

Object.getOwnPropertyDescriptor() 方法返回指定对象上一个**自有属性对应的属性描述符**。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```
Object.getOwnPropertyDescriptor(obj, prop)
```

obj --- 需要查找的目标对象
prop --- 目标对象内属性名称
返回值 --- 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

## 描述

该方法允许对一个属性的描述进行检索。在 Javascript 中， 属性 由一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成。

一个属性描述符是一个记录，由下面属性当中的某些组成的：

* value
该属性的值(仅针对数据属性描述符有效)

* writable
当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)

* get
获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)

* set
获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)

* configurable
当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。

* enumerable
当且仅当指定对象的属性可以被枚举出时，为 true。

configurable 英 /kən'fɪgərəbl/  美 /kən'fɪgjərəbl/ adj. 可配置的；结构的
enumerable 英 /ɪ'njuːm(ə)rəb(ə)l/  美 /ɪ'njʊmərəbl/ 

```
var o = { get foo() { return 17 } }
var d = Object.getOwnPropertyDescriptor(o, "foo")
console.log(JSON.stringify(d)) // {"enumerable":true,"configurable":true}


var o = { bar: 42 }
var d = Object.getOwnPropertyDescriptor(o, "bar")
console.log(JSON.stringify(d)) // {"value":42,"writable":true,"enumerable":true,"configurable":true}


var o = {}
Object.defineProperty(o, "baz", {
  value: 8675309,
  writable: false,
  enumerable: false
})
d = Object.getOwnPropertyDescriptor(o, "baz")
console.log(JSON.stringify(d)) // {"value":8675309,"writable":false,"enumerable":false,"configurable":false}
```

