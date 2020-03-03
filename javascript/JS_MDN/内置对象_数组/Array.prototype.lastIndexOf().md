## Array.prototype.lastIndexOf()

lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的**最后一个的索引**，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

```
arr.lastIndexOf(searchElement[, fromIndex])
```

**searchElement** -- 被查找的元素。

**fromIndex 可选** -- 从此位置开始**逆向查找**。默认为数组的长度减 1(arr.length - 1)，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从**后向前查找**。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

返回值 -- 数组中该元素最后一次出现的索引，如未找到返回-1。

## 例子：使用 lastIndexOf

```
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2); // fromIndex:-2 - > arr.length - 2
// index is 0
index = array.lastIndexOf(2, -1); // fromIndex:-1 - > arr.length - 1
// index is 3
```

