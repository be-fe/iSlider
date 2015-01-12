#iSlider
####[iSlider English Official Page](http://be-fe.github.io/iSlider/index_en.html)
####[iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
####[iSlider 中文官网](http://be-fe.github.io/iSlider/index.html)
####[iSlider Example](http://be-fe.github.io/iSlider/demo/)

iSlider是一个表现出众，无任何插件依赖的手机平台javascript滑动组件。它能够处理任何元素，例如图片或者DOM元素。它有如下特性：

* 性能极好，硬件加速，极小占用内存
* 能够自定义动画，自带的动画包括 default, rotate, depth, flow, flip and card
* 你能够简易地添加回调函数(onslidestart, onslide, onslideend, onslidechange)
* 我们还支持滑动衰减效果，循环效果，自动滑动效果，水平/垂直滑动
* 支持桌面鼠标动作，方便测试
* 支持图片预加载，改善用户体验

##iSlider移动端展示

<img width="150px" height="150px" src="qrcode.png"/>

##开始部署iSlider
部署iSlider最容易的办法是查阅我们提供的简易例子。大部份代码存放在demo文件夹的文件里面。*iSlider* 是必要新建的一个类。

在你开始之前，你需要为iSlider先新建好数据:

``` javascript
var data = [{
	height: 414,
	width: 300,
	content: "imgs/1.jpg",
},{
	height: 414,
	width: 300,
	content: "imgs/2.jpg",
},{
 	height: 414,
	width: 300,
 	content: "imgs/3.jpg",
}];
```

HTML代码如下:
	
	<div id="iSlider-wrapper"></div>

要使其运行，按下面例子新建ISlider类: 

 	<script type="text/javascript">
    	var islider = new iSlider({
    		dom : document.getElementById('iSlider-wrapper'),
    		data : data
    	});
    </script>

如果你想加其它效果，可以按照我们demo/picture示例添加:
	
	<script type="text/javascript">
    	var islider = new iSlider({
			    data: list,
			    dom: document.getElementById("iSlider-wrapper"),
			    isVertical: true,
			    isLooping: false,
			    isDebug: true,
			    isAutoplay: false,
			    animateType: 'rotate'
		});
    </script>
	

That's it. 

<h2 id="configuration">配置iSlider</h2>
除了上文提到的基本部署模式，你还可以自定义我们提供的特性。例如，如果你想滑动DOM元素而非图片，你可以按以下的格式新建DOM数据: 

``` javascript
var data = [{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
}];
```
如果想实现介绍部份提到的效果，可以按以下格式设置: 

	<script type="text/javascript">
    	var islider = new iSlider({
    		dom : document.getElementById('iSlider-wrapper'),
    		data : data,
    		duration: 2000,
		    isVertical: true,
		    isLooping: true,
		    isDebug: true,
		    isAutoplay: true
    	});
    </script>

##深入了解iSlider
这里提供对iSlider类选项最清楚的描述: 
<table>
<thead>
	<tr>
		<td>选项</td>
		<td>数值</td>
		<td>解释</td>
	</tr>
</thead>
<tbody>
	<tr>
		<td>dom</td>
		<td>HTML Object</td>
		<td>包含图片或者DOM元素的包裹DOM元素</td>
	</tr>
	<tr>
		<td>data</td>
		<td>Array of Content(picture | html)</td>
		<td>若是图片数据，格式如下:
		<pre>
[{
	height: 377,
	width: 600,
	content:"pics/1.jpg"
}]
		</pre>
		</td>
	</tr>
	<tr>
		<td>type</td>
		<td>String (pic | dom)</td>
		<td>默认值是'pic', 也支持'dom'</td>
	</tr>
	<tr>
		<td>duration</td>
		<td>Integer (1000 == 1s)</td>
		<td>每个图片滑动的间隔时间，仅限于自动滑动模式</td>
	</tr>
	<tr>
        <td>animateType</td>
        <td>String</td>
        <td>目前支持默认default, rotate, depth, flow, flip and card</td>
    </tr>
	<tr>
		<td>onslide</td>
		<td>Function</td>
		<td>手指滑动时的回调函数</td>
	</tr>
	<tr>
		<td>onslidestart</td>
		<td>Function</td>
		<td>手指触屏时的回调函数</td>
	</tr>
	<tr>
		<td>onslideend</td>
		<td>Function</td>
		<td>手指离开屏幕时的回调函数</td>
	</tr>
	<tr>
		<td>onslidechange</td>
		<td>Function</td>
		<td>自动滑动模式下当图片滑动时的回调函数</td>
	</tr>
	<tr>
		<td>isDebug</td>
		<td>Boolean (true | false)</td>
		<td>开启/关闭调度模式</td>
	</tr>
	<tr>
		<td>isLooping</td>
		<td>Boolean (true | false)</td>
		<td>开启/关闭循环模式</td>
	</tr>
	<tr>
		<td>isAutoplay</td>
		<td>Boolean (true | false)</td>
		<td>开启/关闭自动滑动模式</td>
	</tr>
		<tr>
		<td>isVertical</td>
		<td>Boolean (true | fasle)</td>
		<td>开启水平/垂直滑动模式</td>
	</tr>
	</tr>
		<tr>
		<td>isOverspread</td>
		<td>Boolean (true | fasle)</td>
		<td>是否平铺整个浏览器屏幕</td>
	</tr>
</tbody>
</table>
##联系我们
对iSlider的使用有任何问题,或者发现bug,欢迎给我们反馈：
[提交反馈](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)
##License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
