## Array.prototype.reverse()

reverse() 方法将数组中**元素的位置颠倒**，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

```
arr.reverse()
```

返回值 -- 颠倒后的数组。


## 颠倒数组中的元素

```
const a = [1, 2, 3];

console.log(a); // [1, 2, 3]

a.reverse(); 

console.log(a); // [3, 2, 1]
```

## 颠倒类数组中的元素

下例创造了一个类数组对象 a, 包含3个元素和一个 length 属性, 然后颠倒这个类数组对象。

```
const a = {0: 1, 1: 2, 2: 3, length: 3};

console.log(a); // {0: 1, 1: 2, 2: 3, length: 3}

Array.prototype.reverse.call(a); //same syntax for using apply()

console.log(a); // {0: 3, 1: 2, 2: 1, length: 3}

```

