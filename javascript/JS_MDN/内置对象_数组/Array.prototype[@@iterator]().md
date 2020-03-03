## Array.prototype[@@iterator]()

@@iterator 属性和 Array.prototype.values() 属性的初始值是同一个函数对象。

```
arr[Symbol.iterator]()
```

symbol 英 /ˈsɪmbl/  美 /ˈsɪmbl/ n. 象征；符号；标志 过去式 symbolled或symboled过去分词 symbolled或symboled现在分词 symbolling或symboling
iterator 英 /ɪtə'reɪtə/  美 /ɪtə'retɚ/  n. 迭代器；迭代程序

返回值 -- 数组的 iterator 方法，默认情况下，与 values() 返回值相同， arr[Symbol.iterator] 则会返回 values() 函数。

## 使用 for...of 循环进行迭代

```
var arr = ['a', 'b', 'c', 'd', 'e'];
var eArr = arr[Symbol.iterator]();
console.log(eArr); // Array Iterator {}

// 浏览器必须支持 for...of 循环
for (let letter of eArr) {
  console.log(letter);
}
```

## next()迭代方式

```
var arr = ['a', 'b', 'c', 'd', 'e'];
var eArr = arr[Symbol.iterator]();

console.log(eArr.next().value); // a
console.log(eArr.next().value); // b
console.log(eArr.next().value); // c
console.log(eArr.next().value); // d
console.log(eArr.next().value); // e
```