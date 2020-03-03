### echarts中挂载百度地图库的时候的promise解决方法, 还是有问题 待解决

创建一个标签 设置外部库的属性
```
promise_map(ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve()
    }
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init"
    script.onerror = reject
    document.head.appendChild(script)
  })
}
```

### vue中挂载别的外部库的时候的也是同样解决方法，封装一下

```
export let promiseUrl = (url) => {
  return new Promise((resolve, reject) => {
    // 判断地址是否存在
    let haveChild = () => {
      new Promise((resolve, reject) => {
        let labelObj = window.document.head.childNodes
        for (let i = 0; i < labelObj.length; i++) {
          if (labelObj[i].tagName) {
            if (labelObj[i].tagName.toString().toLowerCase() === 'script') {
              if (labelObj[i].src === url) {
                console.log(labelObj[i])
                window.document.head.removeChild(labelObj[i])
              }
            }
          }
        }
        resolve()
      })
    }
    let createScript = () => {
      var script = document.createElement("script")
      script.type = "text/javascript"
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    createScript()
    // 路由跳转时候script已经在家完成啦才渲染页面
    // 但是刷新页面时候 百度地图script还未加载完成 需要延迟resolve() 还没找到更好方法
    setTimeout(() => {
      resolve('地图挂载完成')
    }, 300)
  })
}
```