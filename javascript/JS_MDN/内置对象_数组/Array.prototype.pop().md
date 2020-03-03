## Array.prototype.pop()

pop()方法从数组中删除**最后一个元素**，并返回该元素的值。此方法更改数组的长度。

```
arr.pop()
```

返回值 -- 从数组中删除的元素(当数组为空时返回undefined)。

```
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish); // ["angel", "clown", "mandarin"]

console.log(popped); // surgeon
```