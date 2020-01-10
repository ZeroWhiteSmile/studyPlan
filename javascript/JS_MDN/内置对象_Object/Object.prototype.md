## Object.prototype

Object.prototype 属性表示 Object 的原型对象。

Object.prototype 属性的属性特性：

* writable -- false
* enumerable -- false
* configurable -- false

## 描述

几乎所有的 JavaScript 对象都是 Object 的实例；一个典型的对象继承了Object.prototype的属性（包括方法），尽管这些属性可能被遮蔽（亦称为覆盖）。

但是有时候可能故意创建不具有**典型原型链继承**的对象，比如通过**Object.create(null)**创建的对象，或者通过**Object.setPrototypeOf**方法改变原型链。

改变Object原型，会通过原型链改变所有对象；除非在原型链中进一步覆盖受这些变化影响的属性和方法。这提供了一个非常强大的、但有潜在危险的机制来覆盖或扩展对象行为。


## 示例

由于 JavaScript 并不完全具有子类对象, 所以原型是一种有用的变通方法, 可以使用某些函数的 "基类" 对象来充当对象。例如:

```
var Person = function(name) {
  this.name = name;
  this.canTalk = true;
}

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
}

var a = new Person('小白')  // 实例化对象
a.greet() // Hi, I am 小白

```

```
var Person = function(name) {
  this.name = name;
  this.canTalk = true;
}
Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
}


var Employee = function(name, title) {
  Person.call(this, name);
  this.title = title;
}
Employee.prototype = Object.create(Person.prototype); // 相当于 new Person()实例化Person, 可调用Person方法属性
Employee.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name + ', the ' + this.title);
  }
}


var Customer = function(name) {
  Person.call(this, name);
}
Customer.prototype = Object.create(Person.prototype);  // 相当于 new Person()实例化Person, 可调用Person方法属性


var Mime = function(name) {
  Person.call(this, name);
  this.canTalk = false;
}
Mime.prototype = Object.create(Person.prototype)  // 相当于 new Person()实例化Person, 可调用Person方法属性


var bob = new Employee('Bob', 'Builder');
bob.greet() // Hi, I am Bob, the Builder

var joe = new Customer('Joe');
joe.greet(); // Hi, I am Joe

var rg = new Employee('Red Green', 'Handyman');
rg.greet(); // Hi, I am Red Green, the Handyman

var mike = new Customer('Mike');
mike.greet(); // Hi, I am Mike

var mime = new Mime('Mime');
mime.greet(); // undefined
```
