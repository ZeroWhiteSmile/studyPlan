## Array.prototype.splice()(添加删除替换)

splice 拼接 英 /splaɪs/  美 /splaɪs/  v. 捻接（绳子）；拼接，接合（胶片等）；移接（基因）；使结婚 n. 接合处；（连接的）绳；（板球击板的）柄脚；结婚（非正式）

splice() 方法通过**删除或替换现有元素**或者**原地添加新的元素**来修改数组,并以数组形式返回被修改的内容。此方法会**改变原数组**。

```
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

start​ -- 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

deleteCount 可选 -- 整数，表示要移除的数组元素的个数。
>* 如果 deleteCount **被省略了，或者大于start，或者等于start**之后的元素的总数，则从 start 后面的元素都将被删除（**含第 start 位**）。
>* 如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

item1, item2, ... 可选 -- 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

返回值 -- 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。


## 描述

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

## 从第 2 位开始删除 0 个元素，插入“drum”

```
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```

## 从第 3 位开始删除 1 个元素

```
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素: ["mandarin"]
```

## 从第 2 位开始删除 1 个元素，插入“trumpet”

```
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");

// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]
// 被删除的元素: ["drum"]
```

## 从第 2 位开始删除所有元素

```
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]
```

