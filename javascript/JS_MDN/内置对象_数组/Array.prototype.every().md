## Array.prototype.every()(和filter类似)

通过某个指定函数的测试结果，它返回一个**布尔值**。(和filter类似)

every 每个 英 /ˈevri/  美 /ˈevri/ adj. 每一的，每个的；每隔……的；（用于强调）所有可能的，完全可能的

```
arr.every(callback[, thisArg])
```

callback:用来测试每个元素的函数，它可以接收三个参数：
* element -- 用于测试的当前值。
* index可选 -- 用于测试的当前值的索引。
* array可选 -- 调用 every 的当前数组。

thisArg -- 执行 callback 时使用的 this 值。

返回值 -- 如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。

## 描述

如果为 every 提供一个 thisArg 参数，则该参数为调用 callback 时的 this 值。如果省略该参数，则 callback 被调用时的 this 值，在**非严格模式下为全局对象**，在**严格模式下传入 undefined**。

every 不会改变原数组。


every 和数学中的"所有"类似，当所有的元素都符合条件才会返回true。正因如此，若传入一个空数组，无论如何都会返回 true。（**这种情况属于无条件正确**：正因为一个空集合没有元素，所以它其中的所有元素都符合给定的条件。)

## 检测所有数组元素的大小

enough 英 /ɪˈnʌf/  美 /ɪˈnʌf/  adv. 足够地，充足地 n. 很多；充足 adj. 充足的 int. 够了！

```
function isBigEnough(element, index, array) {
  return element >= 10
}
[12, 5, 8, 130, 44].every(isBigEnough)   // false
[12, 54, 18, 130, 44].every(isBigEnough)  // true
```

使用箭头函数 

```
[12, 5, 8, 130, 44].every(x => x >= 10) // false
[12, 54, 18, 130, 44].every(x => x >= 10) // true
```

## 兼容旧环境（Polyfill）

```
if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the this 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callbackfn with T as the this value and argument list 
        //     containing kValue, k, and O.
        var testResult = callbackfn.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
```