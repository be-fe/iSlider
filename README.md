<h1 id="intro">iSlider，一个流畅的webapp图文滑动工具</h1>

<h3><a href="https://github.com/BE-FE/iSlider/blob/master/README_English.md">iSlider English README</a></h3>
<h3><a href="http://be-fe.github.io/iSlider/">iSlider 官网</a></h3>

iSlider是一个表现出众，无任何插件依赖的手机平台javascript滑动插件。它能够处理任何元素，例如图片或者DOM元素。它有如下特性：

* 能够自定义动画，自带的动画包括 旋转(rotate), 三维(3d), 轻弹(flip), 默认(default)
* 你能够简易地添加回调函数(onslidestart, onslide, onslideend, onslidechange)
* 我们还支持滑动衰减效果，循环效果，自动滑动效果，水平/垂直滑动

<h2 id="getting-started">开始部署iSlider</h2>
部署iScroll最容易的办法是查阅我们提供的简易例子。大部份代码存放在demo文件夹的文件里面。*iSlider* 是必要新建的一个类。

在你开始之前，你需要为iSlider先新建好数据:

``` javascript
var data = [{
	height: 475,
	width: 400,
	content: "imgs/1.jpg",
},{
	height: 527,
	width: 400,
	content: "imgs/2.jpg",
},{
 	height: 400,
 	width: 512,
 	content: "imgs/3.jpg",
}];
```

HTML代码如下:
	
	<div id="iSlider-wrapper"></div>

要使其运行，按下面例子新建ISlider类: 

 	<script type="text/javascript">
    	var mySlider = new ISlider({
    		dom : document.getElementById('iSlider-wrapper'),
    		data : data
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
如果你想实现介绍部份提到的效果，你可以按以下格式设置: 

	<script type="text/javascript">
    	var mySlider = new ISlider({
    		dom : document.getElementById('iSlider-wrapper'),
    		data : data,
    		duration: 2000,
		    isVertical: true,
		    isLooping: true,
		    isDebug: true,
		    isAutoplay: true
    	});
    </script>

<h2 id="demo">iSlider展示</h2>

* <a href="http://be-fe.github.io/iSlider/demo/">Demo</a>

<img src="qrcode.png"/>

<h2 id="understanding">深入了解iSlider</h2>
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
        <td>animationType</td>
        <td>String</td>
        <td>目前支持默认(default), 旋转(rotate）, 三维(3d) and 轻弹(flip)</td>
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
</tbody>
</table>

<h2 id="license">License (MIT)</h2>

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)