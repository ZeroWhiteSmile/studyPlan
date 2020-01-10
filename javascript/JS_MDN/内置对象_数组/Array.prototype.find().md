## Array.prototype.find()

find() 方法返回数组中满足提供的测试函数的第一个**元素的值**。否则返回 **undefined**。

如果你需要找到一个元素的位置或者一个元素是否存在于数组中，使用**Array.prototype.indexOf()** 或 **Array.prototype.includes()**。

```
arr.find(callback[, thisArg])
```

callback: 在数组每一项上执行的函数，接收 3 个参数：
* element -- 当前遍历到的元素。
* index可选 -- 当前遍历到的索引。
* array可选 -- 数组本身。

thisArg可选 -- 执行回调时用作this 的对象。

返回值 -- 数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。

## 用对象的属性查找数组里的对象

```
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
]

function findCherries(fruit) { 
    return fruit.name === 'cherries'
}

console.log(inventory.find(findCherries)) // {name: "cherries", quantity: 5}
```
箭头函数

```
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
]
console.log(inventory.find(fruit => { return fruit.name === 'cherries'})) // {name: "cherries", quantity: 5}
```

## 寻找数组中的质数

质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。

Math.sqrt() 函数返回一个数的平方根

```
var primeNumber = [4, 6, 8, 12].find((x) => {
	return (x % 2 != 0) & (x > 1)
})
primeNumber // undefined

var primeNumber = [4, 5, 6, 8, 12].find((x) => {
	return (x % 2 != 0) & (x > 1)
})
primeNumber // 5
```

## 兼容旧环境（Polyfill）

```
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
```

