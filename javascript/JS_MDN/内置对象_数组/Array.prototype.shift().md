## Array.prototype.shift()

shift() 方法从数组中**删除第一个元素**，并返回该元素的值。此方法更改数组的长度。

```
arr.shift()
```

返回值  -- 从数组中删除的元素; 如果数组为空则返回undefined 。 


## 移除数组中的一个元素

```
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

var shifted = myFish.shift(); 

console.log('调用 shift 之后: ' + myFish); 
// "调用 shift 之后: clown,mandarin,surgeon" 

console.log('被删除的元素: ' + shifted); 
// "被删除的元素: angel"
```

## 在while循环中使用shift()

```
var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

while( (i = names.shift()) !== undefined ) {
    console.log(i);
}
```