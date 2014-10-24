MSlider
==============

Feature
==============
<ul>
<li>Mobile First</li>
<li>Best Perfomance (Low Memory Usage and No Lagging By Keeping Only 3 li Elements.)</li>
<li>Multi-contents (Picture | Dom Element)</li>
<li>Fancy Effect (Damping effect, Infinite Looping, Vertical/Horizontal Sliding)</li>
</ul>

Getting Started
==============
<p><b>Step 1. </b>Set meta and css and other resources</p>
<p>Firstly, at the top of file, please put meta and link tag like the following.</p>
```
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"/>
<link type="text/css" rel="stylesheet" media="all" href="css/common.css">
```
<p>Secondly, please prepare images/pictures and put them under a specific folder</p>
<p><b>Step 2.</b> HTML markup</p>
```
<div id="MSlider-canvas"></div>
```
<p><b>Step 3.</b> Javascript</p>
<p>Add mslider.js and app.js. Strongly recommend you to put your script at the bottom of the body tag.</p>
```javascript
<script src="../src/mslider.js"></script>
<script src="app.js"></script>
```

<p>Actually the code in app.js is the bootstrap code for the project. You can directly put the code at HTML file. Example codes are as follow</p>

```javascript
var list = [
{
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
},{
	height: 400,
	width: 458,
	content:"imgs/5.jpg"
},{
	height: 400,
	width: 498,
	content:"imgs/6.jpg"
},{
	height: 377,
	width: 600,
	content:"imgs/7.jpg"
},{
	height: 396,
	width: 600,
	content:"imgs/8.jpg"
},{
	height: 374,
	width: 600,
	content:"imgs/9.jpg"
}
];
	
mslider = new MSlider({
    data: list,
    dom: document.getElementById("MSlider-canvas"),
    isVertical: true,
    isLooping: true,
    isDebug: true,
    isAutoplay: true
});

```

Demo
=======

* [Comprehensive](http://be-fe.github.io/MSlider/demo/comprehensive/)
* [Basic](http://be-fe.github.io/MSlider/demo/basic/)
* [Dom](http://be-fe.github.io/MSlider/demo/dom/)


Options
==============
<p>
<table>
<thead>
	<tr>
		<td>Option</td>
		<td>Value</td>
		<td>Description</td>
	</tr>
</thead>
<tbody>
	<tr>
		<td>dom</td>
		<td>HTML Object</td>
		<td>The DOM element that wraps image list</td>
	</tr>
	<tr>
		<td>data</td>
		<td>Array of Content(picture | html)</td>
		<td>Picture data, for example:
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
		<td>Default value is 'pic', 'dom' is also supported</td>
	</tr>
	<tr>
		<td>duration</td>
		<td>Integer (1000 == 1s)</td>
		<td>Time gap when an image slides</td>
	</tr>
	<tr>
		<td>ulClass</td>
		<td>String</td>
		<td>CSS class name of ul</td>
	</tr>
	<tr>
		<td>liClass</td>
		<td>String</td>
		<td>CSS class name of li</td>
	</tr>
	<tr>
		<td>onslide</td>
		<td>Function</td>
		<td>Callback function when your finger is moving</td>
	</tr>
	<tr>
		<td>onslidestart</td>
		<td>Function</td>
		<td>Callback function when your finger touch the screen</td>
	</tr>
	<tr>
		<td>onslideend</td>
		<td>Function</td>
		<td>Callback function when your finger move out of the screen</td>
	</tr>
	<tr>
		<td>onslidechange</td>
		<td>Function</td>
		<td>Callback function when the autoplay mode is on and one image slides</td>
	</tr>
	<tr>
		<td>isDebug</td>
		<td>Boolean (true | false)</td>
		<td>Turn on/off the debug mode. Some debug message will output</td>
	</tr>
	<tr>
		<td>sliderIndex</td>
		<td>Integer ( 0 &lt;= sliderIndex &lt; number of images)</td>
		<td>Starting image index</td>
	</tr>
	<tr>
		<td>isLooping</td>
		<td>Boolean (true | false)</td>
		<td>Turn on/off infinite looping mode</td>
	</tr>
	<tr>
		<td>isAutoplay</td>
		<td>Boolean (true | false)</td>
		<td>Turn of/off autoplay mode</td>
	</tr>
		<tr>
		<td>isVertical</td>
		<td>Boolean (true | fasle)</td>
		<td>Slide verically or horizontally</td>
	</tr>
</tbody>
</table>
</p>

License
========
[MIT](https://github.com/BE-FE/MSlider/blob/master/LICENSE)