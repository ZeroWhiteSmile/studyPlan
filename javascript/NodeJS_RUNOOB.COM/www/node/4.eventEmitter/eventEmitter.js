// 引入 events 模块
var EventEmitter=require("events").EventEmitter;
//创建 eventEmitter 对象(实例化)
var event=new EventEmitter();
// 使用匿名函数绑定some_event事件
event.on("some_event",function(){
	console.log("some_event事件触发")
});
setTimeout(function(){
	event.emit("some_event");
},1000);