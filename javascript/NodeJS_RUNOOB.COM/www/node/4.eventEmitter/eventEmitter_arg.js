// 引入 events 模块
var events=require("events");
//创建 eventEmitter 对象(实例化)
var EventEmitter=new events.EventEmitter();
// 使用匿名函数绑定someEvent事件
EventEmitter.on("someEvent",function(arg1,arg2){
	console.log("listener1",arg1,arg2);
});
EventEmitter.on("someEvent",function(arg1,arg2){
	console.log("listener2",arg1,arg2)
});
EventEmitter.emit("someEvent","arg1参数","arg2参数");
