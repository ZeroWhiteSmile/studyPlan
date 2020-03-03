## Object.getOwnPropertyNames()

Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

```
Object.getOwnPropertyNames(obj)
```

## 使用 Object.getOwnPropertyNames()

```
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort());  // ["0", "1", "2"]


// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 0 -> a
// 1 -> b
// 2 -> c


//不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1; 
console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

如果你只要获取到可枚举属性，查看Object.keys或用for...in循环（还会获取到原型链上的可枚举属性，不过可以使用**hasOwnProperty()方法过滤掉）**。

* 下面的例子演示了该方法不会获取到原型链上的属性：

```
function ParentClass() {}
ParentClass.prototype.inheritedMethod = function() {};  // 定义原型方法

function ChildClass() {
  this.prop = 5;
  this.method = function() {};
}

ChildClass.prototype = new ParentClass;  // 继承实例化对象
ChildClass.prototype.prototypeMethod = function() {}; // 定义原型方法

console.log(
  Object.getOwnPropertyNames(
    new ChildClass()  // ["prop", "method"]
  )
);
```

## 只获取不可枚举的属性

下面的例子使用了 Array.prototype.filter() 方法，从所有的属性名数组（使用**Object.getOwnPropertyNames()**方法获得）中去除可枚举的属性（使用**Object.keys()**方法获得），剩余的属性便是不可枚举的属性了：

```
var target = myObject;
var enum_and_nonenum = Object.getOwnPropertyNames(target);
var enum_only = Object.keys(target); // Object.keys() 方法会返回一个由一个给定对象的自身**可枚举属性组成的数组**
var nonenum_only = enum_and_nonenum.filter(function(key) {
    var indexInEnum = enum_only.indexOf(key);
    if (indexInEnum == -1) {
        // 没有发现在enum_only健集中意味着这个健是不可枚举的,
        // 因此返回true 以便让它保持在过滤结果中
        return true;
    } else {
        return false;
    }
});

console.log(nonenum_only);
```