## Array.prototype.entries()迭代器(和python迭代器一样)

entries 条目 英 /'entrɪs/  美 /'ɛntrɪs/ n. 进入；（词典所列的）词目（entry的复数形式）
Iterator 英 /ɪtə'reɪtə/  美 /ɪtə'retɚ/ n. 迭代器；迭代程序

```
arr.entries()
```

返回值 -- 一个新的 **Array 迭代器对象**。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个**next方法**，可用用于遍历迭代器取得原数组的[key,value]。


通过列表生成式，我们可以直接创建一个列表，但是，受到内存限制，列表容量肯定是有限的，而且创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

所以，如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，从而节省大量的空间，在Python中，这种一边循环一边计算的机制，称为生成器：generator



## Array Iterator(数组迭代器)

```
var arr = ["a", "b", "c"] 
var iterator = arr.entries()
console.log(iterator)

/*Array Iterator {}
	 __proto__:Array Iterator
	 next:ƒ next()
	 Symbol(Symbol.toStringTag):"Array Iterator"
	 __proto__:Object
*/
```

## iterator.next()(数组迭代器的next()方法)

next()会记录上一次迭代的位置，并从上一次位置开始。

```
var arr = ["a", "b", "c"]
var iterator = arr.entries()
console.log(iterator.next())
// {done: false, value: [0, "a"]}

console.log(iterator.next())
// {done: false, value: [1, "b"]}

console.log(iterator.next())
// {done: false, value: [2, "c"]}

console.log(iterator.next())
// {done: true, value: undefined}
```

## iterator.next()方法遍历数组

```
var arr = ["a", "b", "c"]
var iter = arr.entries()
var a = []

for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next()             // 每次迭代时更新next
    console.log(tem.done)             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value)
        a[i]=tem.value
    }
}

console.log(a) // 遍历完毕，输出next.value的数组 // [[0, "a"], [1, "b"], [2, "c"]]
```

## 二维数组按行排序

```
function sortArr(arr) {
    var goNext = true
    var entries = arr.entries()
    while (goNext) {
        var result = entries.next()
		console.log(result)
        // 输出:
   	    // {value: [0 , [1, 34]], done: false}
		// {value: [1 , [456,2,3,44,234]], done: false}
		// {value: [2 , [4567,1,4,5,6]], done: false}
		// {value: [3 , [34,78,23,1]], done: false}
		// {value: undefined, done: true}
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b)
            goNext = true
        } else {
            goNext = false
        }
    }
    return arr
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]]
sortArr(arr)

/*(4) [Array(2), Array(5), Array(5), Array(4)]
    0:(2) [1, 34]
    1:(5) [2, 3, 44, 234, 456]
    2:(5) [1, 4, 5, 6, 4567]
    3:(4) [1, 23, 34, 78]
    length:4
    __proto__:Array(0)
*/

```

## 使用for…of 循环

```
var arr = ["a", "b", "c"]
var iterator = arr.entries()
for (let e of iterator) {
    console.log(e)
}
// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```


