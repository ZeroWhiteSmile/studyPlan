### 使用javascript协议链接中转

作用：有的网站会判断网站来源referer，防止非法链接，导致跳转打不开


#### 新开一个窗口,相当于target=”_blank”:
```
function open_new_window (full_link) {
	window.open('javascript:window.name;', '<script>location.replace("' + full_link + '")</script>')
}
```

#### 新开一个窗口,相当于target=”_self”:
```
function open_new_window (link) {
	document.body.appendChild(
		document.createElement('iframe').src='
			javascript:
				"<script>top.location.replace（\" + link + \"）</script>"
		'
	)
}
```