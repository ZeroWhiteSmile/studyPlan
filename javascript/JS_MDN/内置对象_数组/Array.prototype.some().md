## Array.prototype.some()

some() 方法测试数组中是不是**至少有1个元素通过了被提供的函数测试**。它返回的是一个Boolean类型的值。

**注意：如果用一个空数组进行测试，在任何情况下它返回的都是false。**

some  英 /səm; sʌm/ det. 一些；某些；好些；少量；某个；算不上；大约；至少有一点 adj. 某个的；某些的；显著的；大量的；至少有一个的 pron. （数量不确切时用）有些人，有些事物；部分 adv. 大约；稍微；（非正式）在某种程度上

```
arr.some(callback(element[, index[, array]])[, thisArg])
```

callback:用来测试每个元素的函数，接受三个参数：

* element -- 数组中正在处理的元素。

* index 可选 -- 数组中正在处理的元素的索引值。

* array可选 -- some()被调用的数组。

thisArg可选 -- 执行 callback 时使用的 this 值。

返回值 -- 数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。

## 描述

some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

如果一个thisArg参数提供给some()，它将被用作调用的 callback的 this 值。否则， 它的 this value将是 undefined(也就是全局对象)。

some() 遍历的元素的范围在第一次调用 callback. 前就已经确定了。在调用 some() 后被添加到数组中的值不会被 callback 访问到。

## 测试数组元素的值

```
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

## 使用箭头函数测试数组元素的值

```
[2, 5, 8, 1, 4].some(x => x > 10);  // false
[12, 5, 8, 1, 4].some(x => x > 10); // true
```

## 判断数组元素中是否存在某个值

```
var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

checkAvailability(fruits, 'kela');   // false
checkAvailability(fruits, 'banana'); // true
```

## 使用箭头函数判断数组元素中是否存在某个值

```
var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return arr.some(arrVal => val === arrVal);
}

checkAvailability(fruits, 'kela');   // false
checkAvailability(fruits, 'banana'); // true
```

## 将任意值转换为布尔类型

```
var TRUTHY_VALUES = [true, 'true', 1];

function getBoolean(value) {
  'use strict';
   
  if (typeof value === 'string') { 
    value = value.toLowerCase().trim();
  }

  return TRUTHY_VALUES.some(function(t) {
    return t === value;
  });
}

getBoolean(false);   // false
getBoolean('false'); // false
getBoolean(1);       // true
getBoolean('true');  // true
```
## 兼容旧环境（Polyfill）

```
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function(fun/*, thisArg*/) {
    'use strict';

    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}
```