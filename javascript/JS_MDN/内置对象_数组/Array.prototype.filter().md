## Array.prototype.filter()

filter() 方法创建一个**包含函数的测试结果后元素**的数组。 

```
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```

callback -- 用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
1. element -- 数组中当前正在处理的元素。
2. index可选 -- 正在处理的元素在数组中的索引。
3. array可选 -- 调用了 filter 的数组本身。
4. thisArg可选 -- 执行 callback 时，用于 this 的值。

返回值 -- 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

## 描述

callback 被调用时传入三个参数：
1. 元素的值
2. 元素的索引
3. 被遍历的数组本身

filter 不会改变原数组，它返回过滤后的新数组。

## 筛选排除所有较小的值

```
var filtered = [12, 5, 8, 130, 44].filter((element) => {
  return element >= 10
})
// [12, 130, 44]
```

## 过滤 JSON 中的无效条目

```
var arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  { },
  { id: null },
  { id: NaN },
  { id: 'undefined' }
]

var invalidEntries = 0

function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj)
}

function filterByID(item) {
  if (isNumber(item.id) && item.id !== 0) {
    return true
  } 
  invalidEntries++
  return false
}

var arrByID = arr.filter(filterByID)
arrByID
//  [{id: 15}, {id: -1}, {id: 3}, {id: 12.2}]
```

invalid 英 /ɪnˈvælɪd/  美 /ɪnˈvælɪd/ adj. 无效的；有病的；残疾的 n. 病人；残疾者 vt. 使伤残；使退役 vi. 变得病弱；因病而奉命退役
entries 条目 英 /'entrɪs/  美 /'ɛntrɪs/ n. 进入；（词典所列的）词目（entry的复数形式）

## 在数组中搜索

```
var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
function filterItems(query) {
  return fruits.filter((el) => {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1
  })
}

console.log(filterItems('ap')) // ['apple', 'grapes']
console.log(filterItems('an')) // ['banana', 'mango', 'orange']
```

## Polyfill

```
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
  };
}
```