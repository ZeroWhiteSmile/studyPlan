## Function（函数）

function，函数，是一个可以被其他代码或其自身调用的代码片段，或者是一个指向该函数的变量 。 当函数被调用时，参数被作为输入传递给函数，并且函数可以返回输出。在 JavaScript 中，函数也是一个对象。


函数名是作为函数声明或函数表达式的一部分声明的标识符。函数的作用域取决于函数名是一个声明还是表达式。


## 不同类型的函数

### 匿名函数是一个没有函数名的函数：

```
function () {};
/ or using the ECMAScript 2015 arrow notation 或者使用ECMAScript 2015箭头符号
() => {};
```

### 命名函数是具有函数名称的函数：

```
function foo() {}
// or using the ECMAScript 2015 arrow notation 或者使用ECMAScript 2015箭头符号
const foo = () => {};
```

### 内部函数是另一个函数内的函数（下面例子中的 square）。外部函数是包含一个函数的函数（下面例子中的 addSquares）：

square 英 /skweə(r)/  美 /skwer/ adj. 平方的；正方形的；直角的；正直的 vt. 使成方形；与…一致 vi. 一致；成方形 n. 平方；广场；正方形 adv. 成直角地

```
function addSquares(a,b) {
   function square(x) {
      return x * x;
   }
   return square(a) + square(b);
};
//Using ECMAScript 2015 arrow notation 或者使用ECMAScript 2015箭头符号
const addSquares = (a,b) => {
   const square = x => x*x;
   return square(a) + square(b);
};
```


### 递归函数是调用自身的函数。可参考递归。

```
function loop(x) {
   if (x >= 10)
      return;
   loop(x + 1);
};
//Using ECMAScript 2015 arrow notation
const loop = x => {
   if (x >= 10)
      return;
   loop(x + 1);
};
```

### 立即调用函数表达式（IIFE）是一种被加载到浏览器的编译器之后直接调用的函数。识别 IIFE 的方法是通过在函数声明的末尾定位额外的左和右括号。

```
// Error (https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
/*
​function foo() { 
    console.log('Hello Foo'); 
}();
*/

(function foo() {
    console.log("Hello Foo");
}());

(function food() {
    console.log("Hello Food");
})();

```