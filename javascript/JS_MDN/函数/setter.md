## setter

当尝试设置属性时，set语法将对象属性绑定到要调用的函数。

```
{set prop(val) { . . . }}
{set [expression](val) { . . . }}
```

prop -- 要绑定到给定函数的**属性名**。
expression -- 从 ECMAScript 2015 开始，还可以使用一个**计算属性名**的表达式绑定到给定的函数。
val -- 用于保存尝试分配给prop的值的变量的一个别名。


## 描述

在 javascript 中，如果试着改变一个属性的值，那么对应的 setter 将被执行。setter 经常和 getter 连用以创建一个伪属性。不可能在具有真实值的属性上同时拥有一个 setter 器。

使用 set 语法时请注意：

* 它的标识符可以是数字或字符串；
* 它必须有一个明确的参数 
* 在对象字面量中，不能为一个已有真实值的变量使用 set ，也不能为一个属性设置多个 set。 ( { set x(v) { }, set x(v) { } } 和 { x: ..., set x(v) { } } 是不允许的 )


## 示例 -- 在对象初始化时定义 setter

这将定义一个对象 language 的伪属性current，当分配一个值时，将使用该值更新log：

```
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']
```


## 示例 -- 用 delete 操作符移除一个 setter

```
delete o.current;
```

```
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}
language.current = 'FA';
delete language.current;
console.log(language.current); // undefined
```

## 使用 defineProperty 为当前对象定义 setter

```
var o = { a:0 };

Object.defineProperty(o, "b", { set: function (x) { this.a = x / 2; } });

o.b = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(o.a) // 5
```

## 使用计算属性名

```
var expr = "foo";

var obj = {
  baz: "bar",
  set [expr](v) { this.baz = v; }
};

console.log(obj.baz); // "bar"
obj.foo = "baz";      // run the setter
console.log(obj.foo); // "baz"
```