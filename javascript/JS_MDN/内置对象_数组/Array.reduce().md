## Array.reduce()

reduce() 方法对数组中的**每个元素执行**一个由您提供的**reducer函数(升序执行)**，将其结果**汇总为单个返回值**。

您的 reducer 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

```
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

reducer 函数接收4个参数:
> 
Accumulator (acc) (累计器)
Current Value (cur) (当前值)
Current Index (idx) (当前索引)
Source Array (src) (源数组)

Accumulator 英 /əˈkjuːmjəleɪtə(r)/  美 /əˈkjuːmjəleɪtər/ n. 蓄电池；[计] 累加器；积聚者


回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
1. 如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；
2. 如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

```
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
// reduce() 没有初始值，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
var maxCallback2 = ( max, cur ) => Math.max( max, cur );
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );
```

---
### reduce() 如何运行

```
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

| callback | accumulator |  currentValue |  currentIndex |  array |  return value | 
| -::- | -::- |  -::- |  -::- |  -::- |  -::- | 
| first call(undefined) | 0 | 1 | 1 | [0, 1, 2, 3, 4] | 1 |
| second call(undefined) | 1 | 2 | 2 | [0, 1, 2, 3, 4] | 3 |
| third call(undefined) | 3 | 3 | 3 | [0, 1, 2, 3, 4] | 6 |
| fourth call(undefined) | 6 | 4 | 4 | [0, 1, 2, 3, 4] | 10 |


使用箭头函数的形式

```
[0, 1, 2, 3, 4].reduce((acc, curr) => acc + curr )
```

```
[0, 1, 2, 3, 4].reduce((acc, curr) => console.log(acc, curr) )

输出：
0 1
undefined 2
undefined 3
undefined 4

```

### 例子

