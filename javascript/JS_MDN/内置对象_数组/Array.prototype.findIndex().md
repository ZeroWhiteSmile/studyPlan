## Array.prototype.findIndex()

findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

```
arr.findIndex(callback[, thisArg])
```

callback：针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
* element -- 当前元素。
* index -- 当前元素的索引。
* array -- 调用findIndex的数组。

thisArg -- 可选。执行callback时作为this对象的值.

返回值 -- 数组中通过提供测试函数的第一个元素的索引。否则，返回-1

## 查找数组中首个质数元素的索引

质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。

Math.sqrt() 函数返回一个数的平方根

```
var primeNumber = [4, 6, 8, 12].findIndex((x) => {
	return (x % 2 != 0) & (x > 1)
})
primeNumber // -1

var primeNumber = [4, 5, 6, 8, 12].findIndex((x) => {
	return (x % 2 != 0) & (x > 1)
})
primeNumber // 1
```

## 兼容旧环境（Polyfill）

```
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
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
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}
```