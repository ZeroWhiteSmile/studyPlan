## Array.prototype.map()

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

allback：生成新数组元素的函数，使用三个参数：
* currentValue
* callback 数组中正在处理的当前元素。
* index可选

thisArg可选 -- 执行 callback 函数时值被用作this。

返回值 -- 回调函数的结果组成了新数组的每一个元素。

## 描述

因为map生成一个新数组，当你不打算使用返回的新数组却使用map是违背设计初衷的，请用forEach或者for-of替代。

如果 thisArg 参数提供给map，则会被用作回调函数的**this值**。否则**undefined**会被用作回调函数的this值。

this的值最终相对于callback函数的可观察性是依据the usual rules for determining the this seen by a function决定的

## 使用 thisArg

* 对象以及对象的原型方法中的this

```
function Counter() {
  this.sum = 0
  this.count = 0
}

Counter.prototype.add = function(array) {
  array.map(function(entry) {
    console.log(this)
  }, this)
}

const obj = new Counter()

console.log(obj) // Counter {sum: 0, count: 0} // 指向函数自身
```

* 给定具体thisArg参数

```
[''].map(function(entry) {
    console.log(this) // String {"thisArg"}
  }, 'thisArg')
```

* 给定具体thisArg参数的箭头函数callback

```
[''].map((entry) => {
    console.log(this) // Window {parent: Window, opener: null, top: Window, length: 1, frames: Window, …}
  }, 'thisArg')
```

## 求数组中每个元素的平方根

```
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt); // [1, 2, 3]
```

## 使用 map 重新格式化数组中的对象

```
var kvArray = [{key: 1, value: 10}, 
               {key: 2, value: 20}, 
               {key: 3, value: 30}];

var reformattedArray = kvArray.map(function(obj) { 
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});
//reformattedArray:  [{1: 10}, {2: 20}, {3: 30}]
```

## 使用一个包含一个参数的函数来mapping(构建)一个数字数组

```
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
// doubles数组的值为： [2, 8, 18]
```

## 一般的map 方法

```
var map = Array.prototype.map
var a = map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

## querySelectorAll 应用

我们获得了文档里所有选中的选项，并将其打印：

```
var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});
```

## 使用技巧案例

通常情况下，map 方法中的 callback 函数只需要接受一个参数，就是正在被遍历的数组元素本身。但这并不意味着 map 只给 callback 传了一个参数。这个思维惯性可能会让我们犯一个很容易犯的错误。

```
["1", "2", "3"].map(parseInt); //  [1, NaN, NaN]
```

解决方案：

```
function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]

['1', '2', '3'].map( str => parseInt(str) ) //  [1, 2, 3]

['1', '2', '3'].map(Number); // [1, 2, 3]  //注意是Number对象

['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]

['1.1', '2.2e2', '3e300'].map( str => parseInt(str) ); // [1, 2, 3]
```

## Mapping 含 undefined的数组

```
var numbers = [1, 2, 3, 4];
var filteredNumbers = numbers.map(function(num, index) {
  if(index < 3) {
     return num;
  }
});
// 索引从0开始，所以筛选号是1、2、3和未定义的。
```

## 兼容旧环境Polyfill

```
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback/*, thisArg*/) {

    var T, A, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
```