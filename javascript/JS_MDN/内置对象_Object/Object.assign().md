## Object.assign()

Object.assign() 方法用于将所有可枚举属性的值从一个或多个**源对象复制到目标对象**。它将**返回目标对象**。

assign 英 /əˈsaɪn/  美 /əˈsaɪn/  vt. 分配；指派；[计][数] 赋值 vi. 将财产过户（尤指过户给债权人）过去式 assigned过去分词 assigned现在分词 assigning第三人称单数 assigns

```
Object.assign(target, ...sources)
```

target -- 目标对象。
sources -- 多个源对象。

---
### 描述

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。**后面的**源对象的属性将类似地**覆盖前面**的源对象的属性。

Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。

如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。

String类型和 Symbol 类型的属性都会被拷贝。

---
### 复制一个对象

```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```


---
### 深拷贝问题

针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是**一个对象的引用**，那么它也**只指向那个引用**。

```
let obj1 = { a: 0 , b: { c: 0}}
let obj2 = Object.assign({}, obj1)
console.log(JSON.stringify(obj2))
// {"a":0,"b":{"c":0}}


// 改变obj1的值a,obj2 a值不变
obj1.a = 1
console.log(JSON.stringify(obj1))
console.log(JSON.stringify(obj2))
// {"a":1,"b":{"c":0}} 
// {"a":0,"b":{"c":0}}


// 改变obj2的值a,obj1 a值不变
obj2.a = 2
console.log(JSON.stringify(obj1))
console.log(JSON.stringify(obj2))
// {"a":1,"b":{"c":0}}
// {"a":2,"b":{"c":0}}


// obj2的b对象指向obj1的b对象。改变obj2的值b对象的值，obj1 b值也会变
obj2.b.c = 3
console.log(JSON.stringify(obj1))
console.log(JSON.stringify(obj2))
// {"a":1,"b":{"c":3}}
// {"a":1,"b":{"c":3}}
```

* 深拷贝JSON.parse(JSON.stringify(obj1))
```
// Deep Clone 
let obj1 = { a: 0 , b: { c: 0}}
let obj2 = JSON.parse(JSON.stringify(obj1))
obj1.a = 4
obj1.b.c = 4
console.log(JSON.stringify(obj2)) // {"a":0,"b":{"c":0}}
```	


---
### 合并对象

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

---
### 合并具有相同属性的对象

```
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```
属性被后续参数中具有相同属性的其他对象覆盖。

---
### 拷贝 symbol 类型的属性

symbol 英 /ˈsɪmbl/  美 /ˈsɪmbl/  n. 象征；符号；标志 过去式 symbolled或symboled过去分词 symbolled或symboled现在分词 symbolling或

```
const o1 = { a: 1 };
const o2 = { [Symbol('foo')]: 2 };

const obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
```

---
### 继承属性和不可枚举属性是不能拷贝的

```
const obj = Object.create(
	{foo: 1}, // foo 是个继承属性。
	{
        bar: {
            value: 2  // bar 是个不可枚举属性。
        },
        baz: {
            value: 3,
            enumerable: true  // baz 是个自身可枚举属性。
    }
})

const copy = Object.assign({}, obj)
console.log(copy); // { baz: 3 }
```

enumerable 英 /ɪ'njuːm(ə)rəb(ə)l/  美 /ɪ'njʊmərəbl/ adj. 可列举的；可点数的


---
### 原始类型会被包装为对象(注意，只有字符串的包装对象才可能有自身可枚举属性。)

```
const v1 = "abc"
const v2 = true
const v3 = 10
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4)
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj) // { "0": "a", "1": "b", "2": "c" }
```

---
### 异常会打断后续拷贝任务

define 英 /dɪˈfaɪn/  美 /dɪˈfaɪn/ vt. 定义；使明确；规定 过去式 defined过去分词 defined现在分词 defining第三人称单数 defines

```
const target = Object.defineProperty(
	{}, 
	// foo 属性是个只读属性。
	"foo", {
    	value: 1,
    	writable: false
	}
)
Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4})
// annot assign to read only property 'foo' of object '#<Object>'
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```

---
### 拷贝访问器

```
const obj = {
  foo: 1,
  get bar() {
    return 2;
  }
}

let copy = Object.assign({}, obj)
console.log(copy) // {foo: 1, bar: 2}
```

Object.getOwnPropertyDescriptor() 方法返回指定对象上一个**自有属性对应的属性描述符**。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。

```
// 下面这个函数会拷贝所有自有属性的属性描述符
const obj = {
  foo: 1,
  get bar() {
    return 2;
  }
}

function completeAssign(target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
	  // descriptors = {},key=数组第一个值，依次递推。
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
	  console.log('descriptors[key]:', JSON.stringify(descriptors[key]))
	  // 输出：
      // descriptors[key]: {"value":1,"writable":true,"enumerable":true,"configurable":true}
 	  // descriptors[key]: {"enumerable":true,"configurable":true}
      return descriptors
    }, {})

    // Object.assign 默认也会拷贝可枚举的Symbols
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym)
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor
      }
    })
    Object.defineProperties(target, descriptors)
  })
  return target
}

copy = completeAssign({}, obj)
console.log(copy) // {bar: 2, foo: 1}
```


---
### 兼容旧环境Polyfill

```
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict'
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object')
      }

      let to = Object(target)

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) { // Skip over if undefined or null
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}
```
