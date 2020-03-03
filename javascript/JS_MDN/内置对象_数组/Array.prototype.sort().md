## Array.prototype.sort()

sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

```
arr.sort([compareFunction])
```

compare 英 /kəmˈpeə(r)/  美 /kəmˈper/  v. 比较，对比；与……类似，将……比作；相比，匹敌；构成（形容词或副词）的比较级和最高级 n. 比较 过去式 compared过去分词 compared现在分词 comparing第三人称单数 compares

compareFunction 可选
>* 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
>* firstEl -- 第一个用于比较的元素。
>* secondEl -- 第二个用于比较的元素。

返回值 -- 排序后的数组。请注意，数组已原地排序，并且不进行复制。

## 描述

* 如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。

例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。


* 如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：
>* 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
>* 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
>* 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
>* compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

* 比较函数格式

```
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b // a一定等于b
  return 0;
}
```

equal 英 /ˈiːkwəl/  美 /ˈiːkwəl/ adj. 平等的；相等的；胜任的 vt. 等于；比得上 n. 对手；匹敌；同辈；相等的事物


* 要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

```
function compareNumbers(a, b) {
  return a - b;
}
```

*  函数表达式 

```
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);
```

* 对象可以按照某个属性排序：

```
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});

// sort by name
items.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase // 忽略大小写
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase // 忽略大小写
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});
```

## 对非 ASCII 字符排序

当排序非 ASCII 字符的字符串（如包含类似 e, é, è, a, ä 等字符的字符串）。一些**非英语语言的字符串**需要使用 **String.localeCompare**。这个函数可以将函数排序到正确的顺序。

```
var items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];
items.sort(function (a, b) {
  return a.localeCompare(b);
});
```

* localeCompare() 方法返回一个数字(正数、负数、0)来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。

## 使用映射改善排序

compareFunction 可能需要对元素做多次映射以实现排序，尤其当 compareFunction 较为复杂，且元素较多的时候，某些 compareFunction 可能会导致很高的负载。

使用 map 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

```
// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo']

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() }
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return (a.value > b.value) || (a.value === b.value) - 1
})

// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index]
})
```
