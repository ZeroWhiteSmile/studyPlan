## Array.prototype.values()迭代对象、迭代器(和python迭代器一样)

values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

Iterator 迭代器 英 /ɪtə'reɪtə/  美 /ɪtə'retɚ/  n. 迭代器；迭代程序 

```
arr.values()
```

返回值 -- 一个新的 Array 迭代对象。


## 使用 for...of 循环进行迭代

```
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();

// 您的浏览器必须支持 for..of 循环，用不了for in 循环。
// 以及 let —— 将变量作用域限定在 for 循环中
for (let letter of eArr) {
  console.log(letter);
}
```

## 使用.next()迭代

```
var arr = ['a', 'b', 'c', 'd', 'e'];
var iterator = arr.values(); 
iterator.next();               // Object { value: "a", done: false }
iterator.next().value;         // "b"
iterator.next()["value"];      // "c"
iterator.next();               // Object { value: "d", done: false }
iterator.next();               // Object { value: "e", done: false }
iterator.next();               // Object { value: undefined, done: true } 
iterator.next().value;         // undefined
```