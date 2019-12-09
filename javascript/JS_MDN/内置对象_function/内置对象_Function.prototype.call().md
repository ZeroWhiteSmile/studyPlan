### Function.prototype.call()继承对象/方法

注意：该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

---
#### 语法
```
function.call(thisArg, arg1, arg2, ...)
```
* thisArg : 可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
* arg1, arg2, ... : 指定的参数列表。

---
#### 返回值

使用调用者提供的 this 值和参数，调用该函数的返回值。若该方法没有返回值，则返回 undefined。

---
#### 描述

call() 允许为不同的对象分配和调用属于一个对象的函数/方法。

call() 提供新的 this 值给当前调用的函数/方法。你可以使用 call 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

---
#### 示例

##### 使用 call 方法调用父构造函数
```
function Product(name, price) {
  this.name = name
  this.price = price
}

function Food(name, price) {
  Product.call(this, name, price)
  this.category = 'food'
}

function Toy(name, price) {
  Product.call(this, name, price)
  this.category = 'toy'
}

var cheese = new Food('feta', 5) // Food的name = feta,price=5
var fun = new Toy('robot', 40) // Food的name = robot,price=40
```

category 英 /ˈkætəɡəri/  美 /ˈkætəɡɔːri/ n. 种类，分类；[数] 范畴

##### 使用 call 方法调用匿名函数

在下例中的 for 循环体内，我们创建了一个匿名函数，然后通过调用该函数的 call 方法，将每个数组元素作为指定的 this 值执行了那个匿名函数。

这个匿名函数的主要目的是给每个数组元素对象添加一个 print 方法，这个 print 方法可以打印出各元素在数组中的正确索引号。

当然，这里不是必须得让数组元素作为 this 值传入那个匿名函数（普通参数就可以），目的是为了演示 call 的用法。

```
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
]

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name)
    }
    this.print()
  }).call(animals[i], i)
}

// 输出
#0 Lion: King
#1 Whale: Fail
```


##### 使用 call 方法调用函数并且指定上下文的 'this'

在下面的例子中，当调用 greet 方法的时候，该方法的this值会绑定到 obj 对象。
```
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ')
  console.log(reply)
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
}

greet.call(obj) // cats typically sleep between 12 and 16 hours
```

##### 使用 call 方法调用函数并且不指定第一个参数（argument）

在下面的例子中，我们调用了 display 方法，但并没有传递它的第一个参数。如果没有传递第一个参数，this 的值将会被绑定为`全局对象`。

```
var sData = 'Wisen'

function display() {
  console.log('sData value is %s ', this.sData)
}

display.call()  // sData value is Wisen
```

注意：在严格模式下，this 的值将会是 undefined。见下文。

```
'use strict'

var sData = 'Wisen'

function display() {
  console.log('sData value is %s ', this.sData)
}

display.call() // Cannot read the property of 'sData' of undefined
```