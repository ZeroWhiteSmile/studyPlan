## Array.prototype.join()(返回这个字符串)

join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并**返回这个字符串**。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```
arr.join([separator])
```

separator 可选 -- 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果缺省该值，数组元素用逗号**（,）**分隔。如果separator是空字符串**("")**，则所有元素之间都没有任何字符。

返回值 -- 一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串。

## 使用四种不同的分隔符连接数组元素

```
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
```

## 连接类数组对象

下面的示例将连接类数组对象（arguments），通过在Array.prototype.join上调用Function.prototype.call。

```
function f(a, b, c) {
  var s = Array.prototype.join.call(arguments);
  console.log(s); // '1,a,true'
}
f(1, 'a', true);
```