### 安卓微信和Ios微信的UA（User agent：用户代理）和判断

安卓微信UA： mozilla/5.0 (linux; u; android 4.1.2; zh-cn; mi-one plus build/jzo54k) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30 micromessenger/5.0.1.352 

Ios微信UA： mozilla/5.0 (iphone; cpu iphone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/5.0 

```
//判断是否微信浏览器
let ua = navigator.userAgent.toLowerCase(); // 用户代理  
let result = (/micromessenger/.test(ua)) ? true : false; // micromessenger字符是否匹配用户代理
if (result) {
 console.log('你正在访问微信浏览器');
}
else {
 console.log('你访问的不是微信浏览器');
}
```

### chrome模拟微信浏览器

首先进入开发者模式(F12或者右键审查元素) ——>右边 点击 更多 选 More tools 打开Network conditions  ——> 编辑user agent输入代理

这里模拟的是 三星Galaxy S5（安卓5.0）

Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 MicroMessenger/6.0.0.54_r849063.501 NetType/WIFI