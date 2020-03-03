## js全局局部变量变成全局变量的方法

```
// 传入window的作用是不用跳出作用域之外查找window
let globalVar = (window) => {
 window.t = 0
}
globalVar(window)
console.log(window.t)
```