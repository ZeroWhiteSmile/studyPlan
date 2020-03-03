## Symbol(symbol类型的值)

primitive 英 /ˈprɪmətɪv/  美 /ˈprɪmətɪv/  adj. 原始的，远古的；简单的，粗糙的 n. 原始人 比较级 more primitive最高级 most primitive复数 primitives

**symbol 是一种基本数据类型 （primitive data type）**。Symbol()函数会**返回symbol类型的值**，该类型**具有静态属性和静态方法**。

它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。

每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。更进一步的解析见—— glossary entry for Symbol。

```
Symbol([description])
```

description 可选 -- 可选的，字符串类型。对symbol的描述，可用于调试但不是访问symbol本身。

## 直接使用Symbol()创建新的symbol类型，并用一个可选的字符串作为其描述。

```
var sym1 = Symbol() // log: Symbol()
var sym2 = Symbol('foo') // log: Symbol(foo)
var sym3 = Symbol('foo') // log: Symbol(foo)
```

* 上面的代码创建了三个新的symbol类型。 注意，Symbol("foo") 不会强制将字符串 “foo” 转换成symbol类型。它每次都会创建一个新的 symbol类型：

```
Symbol("foo") === Symbol("foo"); // false
```

* 下面带有{jsxref（“Operators/new”，“new”）}运算符的语法将抛出{jsxref（“TypeError”）}错误：

```
var sym = new Symbol(); // Uncaught TypeError: Symbol is not a constructor
```

Operators 英 /ˈɒpəreɪtə(r)s/  美 /'ɑpə,retɚs/  n. 经营者；操作者；[计] 运算符（operator的复数）


* 如果你真的想创建一个 Symbol 包装器对象 (Symbol wrapper object)，你可以使用 Object() 函数：

```
var sym = Symbol("foo");
typeof sym;     // "symbol"

var symObj = Object(sym);
typeof symObj;  // "object"
```

## 全局共享的 Symbol

要创建跨文件可用的symbol，甚至跨域（每个都有它自己的全局作用域） , 使用 Symbol.for() 方法和  Symbol.keyFor() 方法从全局的symbol注册表设置和取得symbol。

## 在对象中查找 Symbol 属性

Object.getOwnPropertySymbols() 方法让你在查找一个给定对象的符号属性时返回一个symbol类型的数组。注意，每个初始化的对象都是没有自己的symbol属性的，因此这个数组可能为空，除非你已经在对象上设置了symbol属性。

## 属性

Symbol.length -- 长度属性，值为0。
Symbol.prototype --symbol构造函数的原型。


## 对 symbol 使用 typeof 运算符

```
typeof Symbol() === 'symbol' // log: true
typeof Symbol('foo') === 'symbol' // log: true
typeof Symbol.iterator === 'symbol' // log: true
```

iterator 迭代器 英 /ɪtə'reɪtə/  美 /ɪtə'retɚ/ n. 迭代器；迭代程序

## Symbol 类型转换

当使用 symbol 值进行类型转换时需要注意一些事情：

* 尝试将一个 symbol 值转换为一个 number 值时，会抛出一个 TypeError 错误  (e.g. +sym or sym | 0).

* 使用宽松相等时， Object(sym) == sym returns true.

* 这会阻止你从一个 symbol 值隐式地创建一个新的 string 类型的属性名。例如，Symbol("foo") + "bar" 将抛出一个 TypeError (can't convert symbol to string).

* "safer" String(sym) conversion 的作用会像symbol类型调用 Symbol.prototype.toString() 一样，但是注意 new String(sym) 将抛出异常。

## Symbols 与 for...in 迭代

```
var obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (var i in obj) {
   console.log(i); // logs: "c" and "d"
}
```

## Symbols 与 JSON.stringify()

使用 JSON.strIngify() 时，以 symbol 值作为键的属性会被完全忽略：

```
JSON.stringify({[Symbol("foo")]: "foo"}); // "{}"
```

## Symbol 包装器对象作为属性的键

当一个 Symbol 包装器对象作为一个**属性的键时**，这个对象将被强制转换为**它包装过的 symbol 值**：

```
var sym = Symbol("foo");
var obj = {[sym]: 1};
obj[sym];            // 1
obj; // {Symbol(foo): 1}
obj[Object(sym)];    // still 1
```


