## Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身**可枚举属性组成的数组**，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

```
Object.keys(obj)
```
obj -- 要返回其枚举自身属性的对象。

返回值 -- 一个表示给定对象的所有可枚举属性的字符串数组。

```
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(myObj) // console: {foo: 1, getFoo: ƒ}
console.log(Object.keys(myObj)); // console: ['foo']
```