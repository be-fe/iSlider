# iSlider

#### [iSlider English Official Page](http://be-fe.github.io/iSlider/index_en.html)
#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider 中文官网](http://be-fe.github.io/iSlider/index.html)
#### [iSlider Example](http://be-fe.github.io/iSlider/demo/)

iSlider是一个表现出众，无任何插件依赖的手机平台JavaScript的滑动组件。

它能够处理大多数的滑动场景，例如图片或者DOM元素。

目前支持以下特性：

- 优秀的性能，更少的内存占用;
- 丰富的动画效果，并可自行扩展;
- 自动播放，循环播放，水平/垂直滑动等众多参数功能皆可配置;
- 可以按需加载需要的功能;
- 多种可设置的回调方法;

## 移动端展示

![](qrcode.png)

Demo [http://be-fe.github.io/iSlider/index.html](http://be-fe.github.io/iSlider/index.html)

## 获取 iSlider
- 直接在Github网站进行下载
- 如果使用bower进行包管理，可以使用 `bower install iSlider`进行安装.
- 可以使用 `npm install islider.js`

## 开始使用 iSlider

使用iSlider最简单的办法是查阅我们提供的简易例子，大代码存放在demo文件夹的文件里面。

- 创建一個容器
	
``` html
<div id="iSlider-wrapper"></div>
```

- 准备一些数据

``` javascript
var data = [
    {content: "imgs/1.jpg"},
    {content: "imgs/2.jpg"},
    {content: "imgs/3.jpg"}
];
```

- 初始化一个iSlider

``` javascript
var islider = new iSlider({
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

如果你想加入更多效果，可以在初始化时配置参数

``` javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    isVertical: true,
    isLooping: false,
    isDebug: true,
    isAutoplay: false,
    animateType: 'rotate'
});
```

That's it!

## 定制您的 iSlider

从2.X版本开始，iSlider将不再需要指定数据的类型“type”，而变化为更加智能的识别方式，您可以在列表中设置多种类型的数据，如图片、HTML、node或fragment

``` javascript
var data = [{
    'content' : '<div><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},{
    'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
},{
    'content' : '<div><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
}];
```

一些进阶功能可以参考[WIKI](https://github.com/BE-FE/iSlider/wiki/Notices)

### 下面是iSlider详细的选项配置列表

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
	</tr>
		<tr>
		<td>initIndex</td>
		<td>Number</td>
		<td>初始化内容在data中的索引值</td>
	</tr>
	</tr>
		<tr>
		<td>useZoom</td>
		<td>Boolean (true | fasle)</td>
		<td>是否开启图片缩放</td>
	</tr>
</tbody>
</table>

## 联系我们
对iSlider的使用有任何问题,或者发现bug,欢迎给我们反馈：
[提交反馈](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
