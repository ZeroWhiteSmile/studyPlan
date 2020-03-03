### 内置对象_Function.prototype.bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

---
#### 语法
```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```
* thisArg: 
> 调用绑定函数时作为 this 参数传递给目标函数的值。 
> 如果使用new运算符构造绑定函数，则忽略该值。
> 当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。
> 如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。

* arg1, arg2, ...
> 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

---
#### 返回值
返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。

---
#### 描述
bind() 函数会创建一个新的绑定函数（bound function，BF）。绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。

exotic 英 /ɪɡˈzɒtɪk/  美 /ɪɡˈzɑːtɪk/ adj. 异国的；外来的；异国情调的
Bound 英 /baʊnd/  美 /baʊnd/ adj. 一定会；很可能会；必定的；受约束的，有义务的；因……受阻；被……所限制的；限制在某个场所的；正旅行去，准备去；准备就绪的；装有封面的，装订好的；黏附的；依附性的 v. 跳跃着跑；弹回，弹开；形成……的边界；关，围入；限制，束缚 n. 跳跃；界限，边界；限制，限制范围；界；极限

绑定函数具有以下内部属性：
> 
[[BoundTargetFunction]] - 包装的函数对象
[[BoundThis]] - 在调用包装函数时始终作为 this 值传递的值。
[[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
[[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。

当调用绑定函数时，它调用 [[BoundTargetFunction]] 上的内部方法 [[Call]]，就像这样 Call(boundThis, args)。其中，boundThis 是 [[BoundThis]]，args 是 [[BoundArguments]] 加上通过函数调用传入的参数列表。

绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。

---
#### 示例

##### 创建绑定函数

bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：

```
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }  // this.X = 81
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   // 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

retrieve 英 /rɪˈtriːv/  美 /rɪˈtriːv/ vt. [计] 检索；恢复；重新得到 vi. 找回猎物 n. [计] 检索；恢复，取回 过去式 retrieved过去分词 retrieved现在分词 retrieving第三人称单数 retrieves

##### 偏函数
* bind() 的另一个最简单的用法是使一个函数拥有预设的初始参数。
* 只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```
function list() {
  return Array.prototype.slice.call(arguments)
}
var list1 = list(1, 2, 3)  // [1, 2, 3]
// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37)  // 37为预设参数
var list2 = leadingThirtysevenList()  // 37
var list3 = leadingThirtysevenList(1, 2, 3) // [37, 1, 2, 3]  // 1,2,3为传递给函数的参数，会跟在预设参数后面。


function addArguments(arg1, arg2) {
    return arg1 + arg2
}
var result1 = addArguments(1, 2); // 3
// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37)  // 37为预设参数
var result2 = addThirtySeven(5) // 37 + 5 = 42
var result3 = addThirtySeven(5, 10)  // 37 + 5 = 42 ，第二个参数被忽略
```

##### 配合 setTimeout

在默认情况下，使用 window.setTimeout() 时，`this 关键字会指向 window （或 global）对象`。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。

```
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000) // 不绑定bind(this)的话，declare的thsi不指向setTimeout,会立即执行
}

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!')
}

var flower = new LateBloomer()
flower.bloom()  // 一秒钟后, 调用 'declare' 方法

```

Late 英 /leɪt/  美 /leɪt/ adj. 晚的；迟的；已故的；最近的 adv. 晚；迟；最近；在晚期 比较级 later或latter最高级 latest 或last
Bloomer 英 /ˈbluːmə(r)/  美 /ˈbluːmər/ n. [机] 初轧机；从前女用灯笼裤；纰漏；开花植物
bloom 英 /bluːm/  美 /bluːm/ n. 花；青春；旺盛 vt. 使开花；使茂盛 vi. 开花；茂盛
petal 英 /ˈpetl/  美 /ˈpetl/ n. 花瓣
LateBloomer 开花晚的植物；智力发展晚的人
declare 英 /dɪˈkleə(r)/  美 /dɪˈkler/ vt. 宣布，声明；断言，宣称 vi. 声明，宣布

##### 快捷调用

在你想要为一个需要特定的 this 值的函数创建一个捷径（shortcut）的时候，bind() 也很好用。

你可以用 Array.prototype.slice 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以简单地这样写：
```
var slice = Array.prototype.slice
slice.apply(arguments)
```

用 bind()可以使这个过程变得简单。在下面这段代码里面，slice 是 Function.prototype 的 apply() 方法的绑定函数，并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply()调用了。

```

// 与前一段代码的 "slice" 效果相同
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice) // unboundSlice作为this值 // 相当于apply的this的方法是slice()

// ...

slice(arguments)
```

---
#### Polyfill
你可以将这段代码插入到你的脚本开头，从而使你的 bind() 在没有内置实现支持的环境中也可以部分地使用bind。

```
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1)
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable')
    }****
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs)
    }
  }
})()
```