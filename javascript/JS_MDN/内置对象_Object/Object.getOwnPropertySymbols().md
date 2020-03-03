## Object.getOwnPropertySymbols()

Object.getOwnPropertySymbols() 方法返回一个给定对象自身的**所有 Symbol 属性的数组**。

```
Object.getOwnPropertySymbols(obj)
```

obj -- 要返回 Symbol 属性的对象。
返回值 -- 在给定对象自身上找到的所有 Symbol 属性的数组。

## 描述

与Object.getOwnPropertyNames()类似，您可以将给定对象的**所有符号属性作为 Symbol 数组获取**。 
请注意，Object.getOwnPropertyNames()本身不包含对象的 Symbol 属性，只包含字符串属性。

```
var obj = {}
var a = Symbol("a")
var b = Symbol.for("b")

obj[a] = "localSymbol"
obj[b] = "globalSymbol"

var objectSymbols = Object.getOwnPropertySymbols(obj)

console.log(objectSymbols.length) // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)
```