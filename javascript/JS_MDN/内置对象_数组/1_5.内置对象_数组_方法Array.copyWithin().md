### 内置对象_数组_方法Array.copyWithin()

Array.copyWithin()方法浅复制**数组的一部分**到**同一数组中的另一个位置**，并返回它，不会改变原数组的长度。

```
arr.copyWithin(target[, start[, end]])
```

* target -- 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
>
如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。

* start -- 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
> 
如果 start 被忽略，copyWithin 将会从0开始复制。

* end -- 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。

* 返回值 -- 改变后的数组。

```
let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2) // 复制到-2位置，start = 0  输出：[1, 2, 3, 1, 2]

numbers.copyWithin(0, 3) // 复制到0位置， start = 3 输出：[4, 5, 3, 4, 5]

numbers.copyWithin(0, 3, 4) // 复制到0位置， start = 3 end = 4(不包括 end) 输出：[4, 2, 3, 4, 5]

numbers.copyWithin(-2, -3, -1) // 复制到-2位置， start = -3 end = -1(不包括 end) 输出：[1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3)
```