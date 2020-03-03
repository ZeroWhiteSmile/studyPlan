## Array.prototype.flat()(深度遍历提取数组)

flat 英 /flæt/  美 /flæt/ adj. 平的；单调的；不景气的；干脆的；平坦的；扁平的；浅的 adv. （尤指贴着另一表面）平直地；断然地；水平地；直接地，完全地 n. 平地；公寓；平面 vt. 使变平；[音乐]使（音调）下降，尤指降半音 vi. 逐渐变平；[音乐]以降调唱（或奏）

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```
var newArray = arr.flat([depth])
```

depth 可选 -- 指定要提取嵌套数组的结构深度，默认值为 1。

返回值 -- 一个包含将数组与子数组中所有元素的新数组。

## 扁平化嵌套数组

```
var arr1 = [1, 2, [3, 4]] 
arr1.flat() // [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]] 
arr2.flat() // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2) // [1, 2, 3, 4, 5, 6]

var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 扁平化与数组空项

flat() 方法会移除数组中的空项:

```
var arr4 = [1, 2, , 4, 5] 
arr4.flat() // [1, 2, 4, 5]
```

## 替代方案 - 使用 reduce 与 concat

```
var a = [1, 2, [3, 4]]

// 展开一层数组
a.flat()
// 等效于
a.reduce((acc, val) => acc.concat(val), [])   // [1, 2, 3, 4]

// 使用扩展运算符 ...
const flattened = arr => [].concat(...a) // [1, 2, 3, 4]
```

## 替代方案 - (reduce + concat + isArray + recursivily)

recursively 递归  /ri'kəsivli/ adv. 递归地；递回地

```
// 使用 reduce、concat 和递归展开无限多层嵌套的数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]]

function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice()
}

flattenDeep(arr1, Infinity)  // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

## 替代方案 - forEach+isArray+push+recursivily

* forEach 遍历数组会自动跳过空元素

```
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]]

const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果 // 使用立即执行函数时，注意此处"；"必须加，不然解析时候，会和后面return连接在一起导致报错
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr, depth); // 使用立即执行函数时，注意此处"；"必须加，不然解析时候，会和后面return连接在一起导致报错
  // 返回递归结果
  return result
}
console.log(eachFlat(arr1, Infinity)) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```
* for of 循环不能去除数组空位，需要手动去除

```
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]]
const forFlat = (arr = [], depth = 1) => {
  const result = []; // 使用立即执行函数时，注意此处"；"必须加，不然解析时候，会和后面连接在一起导致报错
  (function flat(arr, depth) {
    for (let item of arr) {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1)
      } else {
        // 去除空元素，添加非undefined元素
        item !== void 0 && result.push(item)
      }
    }
  })(arr, depth); // 使用立即执行函数时，注意此处"；"必须加，不然解析时候，会和后面return连接在一起导致报错
  return result
}
console.log(eachFlat(arr1, Infinity)) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

## 替代方案 - 使用堆栈stack

stack 英 /stæk/  美 /stæk/ n. （整齐的）一堆；（尤指工厂的）大烟囱；堆栈；（干草或谷物的）堆；竖着置放的高保真音响设备；定高分层盘旋（等待降落）的机群；（数支步枪支起的锥形）枪架；（车辆的）排气管；（浪蚀）岩柱；垛，堆（木材计量单位）v. （使）放成整齐的一叠；（使）成叠地放在……；（令飞机）分层盘旋等待着陆；（洗牌）作弊；跌倒

flatten 英 /ˈflætn/  美 /ˈflætn/ vt. 击败，摧毁；使……平坦 vi. 变平；变单调

```
// 无递归数组扁平化，使用堆栈
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
// 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快

var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]]

function flatten(input) {
  const stack = [...input] // [1,2,3,[1,2,3,4, [2,3,4]]]
  const res = []
  while (stack.length) { // stack.length -> 4
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop() // 删除并返回数组的最后一个元素
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next)
    } else {
      res.push(next)
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse()
}
flatten(arr1) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

* 递归版本的反嵌套

```
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]]
// 递归版本的反嵌套
function flatten(array) {
  var flattend = []; // 使用立即执行函数时，注意此处"；"必须加，不然解析时候，会和后面连接在一起导致报错
  (function flat(array) {
    array.forEach(function(el) {
      if (Array.isArray(el)) flat(el)
      else flattend.push(el)
    }); 
  })(array); // 使用立即执行函数时，注意此处"；"必须加，不然解析时候，会和后面return连接在一起导致报错
  return flattend
}
console.log(flatten(arr1)) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

## 替代方案 - 使用生成器函数

通过列表生成式，我们可以直接创建一个列表，但是，受到内存限制，列表容量肯定是有限的，而且创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

所以，如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，从而节省大量的空间，这种一边循环一边计算的机制，称为生成器：generator

generator 英 /ˈdʒenəreɪtə(r)/  美 /ˈdʒenəreɪtər/ n. 发电机；发生器；生产者 复数 generators

在调用生成器运行的过程中，每次遇到 yield 时函数会暂停并保存当前所有的运行信息，返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行。**也就是每次调用yield会放回yield计算后的值， 随时可以调用从上一次计算值后开始重新计算**

```
function* flatten(array) {
    for (const item of array) {
        if (Array.isArray(item)) {
            console.log('yield func', yield* flatten(item))
            yield* flatten(item);
        } else {
            yield item;
            console.log('yield item', yield item)
        }
    }
}

var arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...flatten(arr)]
flattened // [1, 2, 3, 4, 5, 6]
```