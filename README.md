#iSlider，Smooth slider for webapps

####[iSlider Official Page](http://be-fe.github.io/iSlider/index_en.html)
####[iSlider 官网](http://be-fe.github.io/iSlider/index.html)
####[iSlider README](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
####[iSlider Example](http://be-fe.github.io/iSlider/demo/)

iSlider is a high performance，dependency free, mobile-platform javascript slider.
It can handle any elements that need to be slide, like picture list or different dom elements. 
It features:

* Performance is extremely great with hardware acceleration and little memory consumption.
* Animation can be customized with user defined functions (default, rotate, depth, flow, flip, card).
* You can easily hook to a plethora of custom events (onslidestart, onslide, onslideend, onslidechange).
* Damping effect, Infinite Looping, Autometic sliding and Vertical/Horizontal Sliding can be configured.
* Support desktop gesture which is convenient for testing.
* Support image preloader to improve user experience.

##iSlider Mobile Demo

<img width="150px" height="150px" src="qrcode.png"/>

* <a href="http://be-fe.github.io/iSlider/demo/">Demo</a>

##Getting Started
The best way to learn the iSlider is by looking at the demos. In the archive you'll find a demo folder. Most of the script features are outlined there.
*iSlider* is a class that needs to be initiated for each dom area. 

Before you start, you need to prepare some data for iSlider:

````
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
````

HTML structure you only need to prepare is :
	
	<div id="iSlider-wrapper"></div>

To make it runnable, all you need to do is to initiate:

 	<script type="text/javascript">
    	var islider = new iSlider({
    		dom : document.getElementById('iSlider-wrapper'),
    		data : data
    	});
    </script>

If you want to add more effects or options, you can follow the demo in demo/picture

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

##Configure the iSlider
Besides the basic ways you can do with iSlider, you can customized the features we provide. For example, if you prefers to put dom elements on the list, you can change the data array like this:

````
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
````
If you hope to implement the effects mentioned in introduction part, you can:

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

##Understand The iSlider
Here provides a clear description of what options you are able to manipulate:
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
		<td>Time gap when an image slides. Applied only to isAutoplay is true</td>
	</tr>
	<tr>
        <td>animateType</td>
        <td>String</td>
        <td>Currently, default, rotate, flow, depth, flip and card are supported animations</td>
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
	</tr>
		<tr>
		<td>isOverspread</td>
		<td>Boolean (true | fasle)</td>
		<td>Decide whether to cover the whole browser screen or not</td>
	</tr>
</tbody>
</table>
##Contact us
if you have any questions or find any bugs, please post issues to tell us.
[Feedback](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

##License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
