## Array.prototype.flatMap()(比map更高效的遍历)

flat 英 /flæt/  美 /flæt/ adj. 平的；单调的；不景气的；干脆的；平坦的；扁平的；浅的 adv. （尤指贴着另一表面）平直地；断然地；水平地；直接地，完全地 n. 平地；公寓；平面 vt. 使变平；[音乐]使（音调）下降，尤指降半音 vi. 逐渐变平；[音乐]以降调唱（或奏）

flatMap() 方法首先使用**映射函数映射每个元素**，然后将结果压缩成一个新数组。
它与 **map** 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

```
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])
```

callback：可以生成一个新数组中的元素的函数，可以传入三个参数：
* currentValue -- 当前正在数组中处理的元素
* index可选 -- 可选的。数组中正在处理的当前元素的索引。
* array可选 -- 可选的。被调用的 map 数组

thisArg可选 -- 可选的。执行 callback 函数时 使用的this 值。

返回值 -- 一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。


## map() 与 flatMap()

```
var arr1 = [1, 2, 3, 4]

arr1.map(x => [x * 2]) // [[2], [4], [6], [8]

arr1.flatMap(x => [x * 2]) // [2, 4, 6, 8]

arr1.flatMap(x => [[x * 2]]) // [[2], [4], [6], [8]]
```

* 为了更好的展示 flatMap 的作用，下面我们将包含几句话的数组拆分成单个汉字组成的新数组。

```
let arr1 = ["it's Sunny in", "", "California"]

arr1.map(x => x.split(" "))  // [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" ")) // ["it's","Sunny","in", "", "California"]
```

注意，输出列表长度可以不同于输入列表长度。


## 在一个 map() 期间增加或去除一些项

flatMap 能用于在map期间增删项目（也就是修改items的数量）。换句话说，它允许你遍历很多项使之成为另一些项（靠分别把它们放进去来处理），而不是总是一对一。 从这个意义上讲，它的作用类似于 filter的对立面。只需返回一个1项元素数组以保留该项，返回一个多元素数组以添加项，或返回一个0项元素数组以删除该项。

```
let a = [5, 4, -3, 20, 17, -33, -4, 18]

a.flatMap( (n) =>
  (n < 0) ?      [] :
  (n % 2 == 0) ? [n] :
                 [n-1, 1]
)
// [4, 1, 4, 20, 16, 1, 18]
```

## 替代方案 -- reduce() 与 concat()

```
var arr = [1, 2, [3, [4]]]
arr.flatMap(x => [x]) // [1, 2, [3, [4]]]

arr.reduce((acc, x) => acc.concat([x]), []) // [1, 2, [3, 4]]
```

请注意，这是低效的，并且应该避免大型阵列：在每次迭代中，它创建一个必须被垃圾收集的新临时数组，并且它将元素从当前的累加器数组复制到一个新的数组中，而不是将新的元素添加到现有的数组中。

