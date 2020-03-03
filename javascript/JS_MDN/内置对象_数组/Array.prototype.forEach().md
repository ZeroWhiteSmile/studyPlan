## Array.prototype.forEach()（遍历）

forEach() 方法对数组的每个元素执行一次提供的函数。

```
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
```

callback：为数组中每个元素执行的函数，该函数接收三个参数：
* currentValue -- 数组中正在处理的当前元素。
* index 可选 -- 数组中正在处理的当前元素的索引。
* array 可选 -- forEach() 方法正在操作的数组。

thisArg 可选 -- 可选参数。当执行回调函数 callback 时，用作 this 的值。
返回值 -- undefined。

## 描述

forEach() 方法按升序为数组中含有效值的每一项执行一次 callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。

如果 thisArg 参数有值，则每次 callback 函数被调用时，this 都会指向 thisArg 参数。如果省略了 thisArg 参数，或者其值为 null 或 undefined，this 则指向全局对象。按照函数观察到 this 的常用规则，callback 函数最终可观察到 this 值。

**注意： 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具。**

## 不对未初始化的值进行任何操作（稀疏数组）

```
const arraySparse = [1,3,,7]
let numCallbackRuns = 0

arraySparse.forEach(function(element){
  console.log(element);
  numCallbackRuns++;
})

console.log("numCallbackRuns: ", numCallbackRuns)

// 1
// 3
// 7
// numCallbackRuns: 3
```

## 将 for 循环转换为 forEach

```
const items = ['item1', 'item2', 'item3'];
const copy = []

for (let i=0; i<items.length; i++) {
  copy.push(items[i])
}

items.forEach(function(item){
  copy.push(item)
})
```

## 打印出数组的内容

注意：为了在控制台中显示数组的内容，你可以使用 console.table() 来展示经过格式化的数组。下面的例子则是另一种使用 forEach() 的格式化的方法。

```
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

// 注意索引 2 被跳过了，因为在数组的这个位置没有项
[2, 5, , 9].forEach(logArrayElements)

// a[0] = 2
// a[1] = 5
// a[3] = 9
```

## 使用 thisArg

* 对象以及对象的原型方法中的this

```
function Counter() {
  this.sum = 0
  this.count = 0
}

Counter.prototype.add = function(array) {
  array.forEach(function(entry) {
    console.log(this)
  }, this)
}

const obj = new Counter()

console.log(obj) // Counter {sum: 0, count: 0} // 指向函数自身
```

* 给定具体thisArg参数

```
[''].forEach(function(entry) {
    console.log(this) // String {"thisArg"}
  }, 'thisArg')
```

* 给定具体thisArg参数的箭头函数callback

```
[''].forEach( (entry) => {
    console.log(this) // Window {parent: Window, opener: null, top: Window, length: 1, frames: Window, …}
  }, 'thisArg')
```

**注意：如果使用箭头函数表达式来传入函数参数， thisArg 参数会被忽略，因为箭头函数在词法上绑定了 this 值。所以this指向了全局对象**


## 对象复制器函数

下面的代码会创建一个给定对象的副本。 创建对象的副本有不同的方法，以下是只是一种方法，并解释了 Array.prototype.forEach() 是如何使用 ECMAScript 5 Object.* 元属性（meta property）函数工作的。

```
function copy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj)); // Object.getPrototypeOf(obj)返回指定对象的原型（内部[[Prototype]]属性的值，一般来说是{}）
  console.log(copy) // {}

  const propNames = Object.getOwnPropertyNames(obj); // Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
  console.log(propNames) // ["a", "b"]

  propNames.forEach(function(name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name); // Object.getOwnPropertyDescriptor() 方法返回指定对象上一个**自有属性对应的属性描述符**。
    console.log(desc) // {value: 1, writable: true, enumerable: true, configurable: true}
					  // {value: 2, writable: true, enumerable: true, configurable: true}

    Object.defineProperty(copy, name, desc); // Object.defineProperty() 方法会直接在一个**对象上定义一个新属性**，或者**修改一个对象的现有属性**， 并**返回这个对象**。
  });

  return copy;
}

const obj1 = { a: 1, b: 2 };
const obj2 = copy(obj1); // 现在 obj2 看起来和 obj1 一模一样了
```

## 如果数组在迭代时被修改了，则其他元素会被跳过。

下面的例子会输出 "one", "two", "four"。当到达包含值 "two" 的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four" 正位于在数组更前的位置，所以 "three" 会被跳过。 forEach() 不会在迭代之前创建数组的副本。

```
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift(); // shift() 方法用于把数组的第一个元素从其中删除,并返回第一个元素的值。
  }
});

// one
// two
// four
```

## 扁平化数组(递归)

如果你想使用内置方法来扁平化数组，你可以考虑使用 Array.prototype.flat()

```
/**
 * Flattens passed array in one dimensional array
 *
 * @params {array} arr
 * @returns {array}
 */
function flatten(arr) {
  const result = [];

  arr.forEach((i) => {
    if (Array.isArray(i))
      result.push(...flatten(i));
    else
      result.push(i);
  })
  
  return result;
}

const problem = [1, 2, 3, [4, 5, [6, 7], 8, 9]];

flatten(problem); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 针对 promise 或 async 函数的使用备注

如果使用 promise 或 async 函数作为 forEach() 等类似方法的 callback 参数，最好对造成的执行顺序影响多加考虑，否则容易出现错误。

```
let ratings = [5, 4, 5];
let sum = 0;

let sumFunction = function (a, b) {
    return a + b;
} 

ratings.forEach(function(rating) {
    sum = sumFunction(sum, rating);
})
console.log(sum);
console.log(sum);
```


## 兼容旧环境Polyfill

```
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
```