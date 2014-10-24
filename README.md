MSlider
==============

Feature
==============
<ul>
<li>Mobile First</li>
<li>Best Perfomance (Low Memory Usage and No Lagging By Keeping Only 3 li Elements)</li>
<li>Multi-contents (Picture | Dom Element)</li>
<li>Fancy Effect (Damping effect, Infinite Looping, Vertical/Horizontal Sliding)</li>
</ul>

Getting Started (Picture Basic Version)
==============
<h3>Demo</h3>
* [Picture Basic](http://be-fe.github.io/MSlider/demo/basic-picture/)

<h3>Procedure</h3>
<p>The following introduce how to set up a basic version of MSlider</p>
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

<p>Actually the code in app.js is the bootstrap code for the project. You can directly put the code at HTML file. Example codes are as follow. Only data and dom option parameters are necessary. Other parameters are optional. You can refer to the option table at the bottom of README</p>

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

Picture Comprehensive Version
==============
<h3>Description</h3>
<p>This version shows how fancy we can be. Please enjoy it.</p>
<h3>Demo</h3>
* [Picture Comprehensive](http://be-fe.github.io/MSlider/demo/comprehensive-picture/)

DOM Basic Version
==============
<h3>Procedure</h3>
<p>Step 1 is similar to basic version above</p>
<p><b>Step 2.</b> HTML markup</p>
<p>For DOM version, we may need to add some menus at the top, so there are some differences</p>
```
<div id="MSlider-outer">
	<div id="MSlider-canvas">
		<div id="MSlider-nav">
			<a>Home</a>
		</div>
		<div id="MSlider-show"> 

		</div>
	</div>
</div>
```

<p><b>Step 3.</b> Javascript</p>
<p>Add mslider.js and app.js. Strongly recommend you to put your script at the bottom of the body tag.</p>
```javascript
<script src="../src/mslider.js"></script>
<script src="app.js"></script>
```
<p>The code in app.js is a bit different from picture basic version.</p>

```javascript
var list = [{
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
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div><h1>Page3</h1><h2>This is page3</h2><p>page3 is pretty awsome</p><div>'
}];

var info = ['Home', 'Page 1', 'Page 2', 'Page3'];

var mslider = new MSlider({
    data: list,
    type: 'dom',
    dom: document.getElementById("MSlider-show"),
    duration: 2000,
    isVertical: true,
    isLooping: true,
    isDebug: true,
    isAutoplay: true,
   	onslidechange: function(idx){
   		document.getElementById('MSlider-nav').children[0].innerText = info[idx];
   	}
});
```


<h3>Demo</h3>
* [Dom Basic](http://be-fe.github.io/MSlider/demo/basic-dom/)


Dom Comprehensive Version
==============
<h3>Description</h3>
<p>This version shows how fancy we can be. Please enjoy it.</p>
<h3>Demo</h3>
* [Dom Comprehensive](http://be-fe.github.io/MSlider/demo/comprehensive-dom/)


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