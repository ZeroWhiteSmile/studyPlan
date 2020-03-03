## Array.reduce()

reduce(callback, initialValue) 方法对数组中的**每个元素执行**一个由您提供的**reducer函数(升序执行)**，将其结果**汇总为单个返回值**。

您的 reducer 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

```
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

reducer callback函数接收4个参数:
> 
Accumulator (acc) (累计器)
Current Value (cur) (当前值)
Current Index (idx) (当前索引)
Source Array (src) (源数组)

Accumulator 英 /əˈkjuːmjəleɪtə(r)/  美 /əˈkjuːmjəleɪtər/ n. 蓄电池；[计] 累加器；积聚者


回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
1. 如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；
2. 如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

```
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
// reduce() 没有初始值，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
var maxCallback2 = ( max, cur ) => Math.max( max, cur );
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );
```

---
### reduce() 如何运行

* ccumulator return累计
```
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue
})
```

| callback | accumulator |  currentValue |  currentIndex |  array |  return value | 
| -::- | -::- |  -::- |  -::- |  -::- |  -::- | 
| first call | 0 | 1 | 1 | [0, 1, 2, 3, 4] | 1 |
| second call | 1 | 2 | 2 | [0, 1, 2, 3, 4] | 3 |
| third call | 3 | 3 | 3 | [0, 1, 2, 3, 4] | 6 |
| fourth call | 6 | 4 | 4 | [0, 1, 2, 3, 4] | 10 |

* ccumulator return不累计
```
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator
})
```

| callback | accumulator |  currentValue |  currentIndex |  array |  return value | 
| -::- | -::- |  -::- |  -::- |  -::- |  -::- | 
| first call | 0 | 1 | 1 | [0, 1, 2, 3, 4] | 0 |
| second call | 0 | 2 | 2 | [0, 1, 2, 3, 4] | 0 |
| third call | 0 | 3 | 3 | [0, 1, 2, 3, 4] | 0 |
| fourth call | 0 | 4 | 4 | [0, 1, 2, 3, 4] | 0 |


* 使用箭头函数的形式,ccumulator无return
如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

```
[0, 1, 2, 3, 4].reduce((acc, curr) => acc + curr )
```

```
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => console.log(accumulator, currentValue, currentIndex, array) )
```
输出：

| callback | accumulator |  currentValue |  currentIndex |  array |
| -::- | -::- |  -::- |  -::- |  -::- |
| first call | 0 | 1 | 1 | [0, 1, 2, 3, 4] |
| second call | undefined | 2 | 2 | [0, 1, 2, 3, 4] |
| third call | undefined | 3 | 3 | [0, 1, 2, 3, 4] |
| fourth call | undefined | 4 | 4 | [0, 1, 2, 3, 4] |

---
### 数组里所有值的和

如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

```

var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  // accumulator是数组第一个值   currentValue是数组第二个值
  return accumulator + currentValue;
}, 0);
// 和为 6


// 箭头形式
var sum = [0, 1, 2, 3].reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
// 和为 6
```

---
### 累加对象数组里的值

如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；

下面提供了initialValue = 0
```
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    // accumulator = initialValue   currentValue是数组第一个值,依次递推
    return accumulator + currentValue.x;
},initialValue)
sum // logs 6

// 箭头形式
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    ,initialValue
);
sum // logs 6
```

### 将二维数组转化为一维

如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

下面没有提供initialValue
```
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  // a 是数组第一个值，b是数组第二个值
  function(a, b) {
    return a.concat(b);
  },
  []
);
flattened  // [0, 1, 2, 3, 4, 5]

// 箭头形式
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  (a, b) => {
    return a.concat(b);
  },
  []
);
flattened  // [0, 1, 2, 3, 4, 5]
```

flattened 英 /'flætnd/ adj. 没精打采的；垂头丧气的 v. 平整；打倒（flatten的过去分词）

### 计算数组中每个元素出现的次数

如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；

下面提供initialValue = {}

```
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  // allNames = {} name是数组第一个值,依次递推
  console.log(allNames, name)
  // console.log输出
  // {} "Alice"
  // {Alice: 1} "Bob"
  // {Alice: 1, Bob: 1} "Tiff"
  // {Alice: 1, Bob: 1, Tiff: 1} "Bruce"
  // {Alice: 1, Bob: 1, Tiff: 1, Bruce: 1} "Alice"
  if (name in allNames) {
    allNames[name]++;  // allNames对象里记录的数组元素的次数累加
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// 输出：{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```


---
### 按属性对object分类

如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；

下面提供initialValue = {}

```
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    // property属性'age'的值 20或者21,依次递推
    // acc = {} obj是数组第一个值
    var key = obj[property] // property的值20或者21
    // 如果acc[key]不存在, 先在对象里面创建一个空数组， 再在下一步添加分类的数组对象
	if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

var groupedPeople = groupBy(people, 'age')

输出：
{
	20： [
		{name: "Max", age: 20},
		{name: "Jane", age: 20}
	]
	21: [{name: "Alice", age: 21}]
}
```

---
### 使用扩展运算符和initialValue绑定包含在对象数组中的数组(就是把对象数组中的数组拿出来)

如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值,依次递推；

```
// friends - 对象数组
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}]

var allbooks = friends.reduce(function(prev, curr) {
  return [...prev, ...curr.books];
}, ['Alphabet'])
allbooks 
// 输出：["Alphabet", "Bible", "Harry Potter", "War and peace", "Romeo and Juliet", "The Lord of the Rings", "The Shining"]
```


---
### 数组去重

**注意： 如果你正在使用一个可以兼容Set 和 Array.from() 的环境， 你可以使用let orderedArray = Array.from(new Set(myArray)); 来获得一个相同元素被移除的数组。**

如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；

* 方法一：

```
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
var myOrderedArray = myArray.reduce((accumulator, currentValue) => {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator
}, [])

myOrderedArray  // 输出：["a", "b", "c", "e", "d"]
```

* 方法二：

```
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4]
let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current)
    }
    return init
}, [])
result  // 输出：[1, 2, 3, 4, 5]
```


---
### 按顺序运行Promise

如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；

sequence 英 /ˈsiːkwəns/  美 /ˈsiːkwəns/ n. [数][计] 序列；顺序；续发事件
vt. 按顺序排好 过去式 sequenced过去分词 sequenced现在分词 sequencing复数 sequences第三人称单数 sequences

chain 英 /tʃeɪn/  美 /tʃeɪn/ n. 链；束缚；枷锁 vt. 束缚；囚禁；用铁链锁住

* 下面例子解析：

```
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(() => {
		// promiseChain = 初始值Promise.resolve(input)
        // currentFunction = 第一个数组值(promise函数)，依次递推
		console.log(promiseChain, '分割', currentFunction)
	}),
    Promise.resolve(input) // 这个初始值暂时没什么意义， 可以给任一值
  );
}


function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}

const promiseArr = [p1, p2]
runPromiseInSequence(promiseArr, 10).then(console.log)

输出：
Promise {<resolved>: 10} "分割" ƒ p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5)
  })
}
Promise {<resolved>: undefined} "分割" ƒ p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}
```

* 例子

```
/**
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce(
	// promiseChain = 初始值Promise.resolve(input)
    // currentFunction = 第一个数组值(promise函数)，依次递推
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
	Promise.resolve(input) // 这个初始值暂时没什么意义， 可以给任一值
  )
}


function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}


function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}


function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}


function f3(a) {
 return a * 3;
}


function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  })
}

const promiseArr = [p1, p2, f3, p4]
runPromiseInSequence(promiseArr, 10).then(console.log)   // 1200
```


---
### 使用 reduce实现map

```
if (!Array.prototype.mapUsingReduce) {
  Array.prototype.mapUsingReduce = (callback) => {
    return this.reduce((mappedArray, currentValue, index, array) => {
      mappedArray[index] = callback.call(thisArg, currentValue, index, array)
      return mappedArray
    }, [])
  }
}

[1, 2, , 3].mapUsingReduce(
  (currentValue, index, array) => currentValue
)  // [5, 7, , 10]
```


---
### Polyfill

```
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}
```