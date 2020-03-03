## Array.prototype.push()

push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```
arr.push(element1, ..., elementN)
```

elementN -- 被添加到数组末尾的元素。

返回值 -- 当调用该方法时，新的 length 属性值将被返回。


## 描述

push 方法**具有通用性**。该方法和 call() 或 apply() 一起使用时，可应用在**类似数组的对象上**。

push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。


## 合并两个数组

```
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables); // ["parsnip", "potato", "celery", "beetroot"]
```

## 像数组一样使用对象

```
var obj = {
    length: 0,

    addElem: function addElem (elem) {
        // obj.length is automatically incremented 
        // every time an element is added.
        [].push.call(this, elem);
    }
};

obj.addElem(3);
obj.addElem(4)
obj.addElem({})
console.log(obj.length)
// 3
console.log(obj)
/* 
0: 3
1: 4
2: {}
length: 3
addElem: ƒ addElem(elem)
*/
```