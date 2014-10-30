<h1 id="intro">iSlider，Smooth slider for webapps</h1>

iSlider is a high performance，dependency free, mobile-platform javascript slider.

iSlider can handle any element that need to be slide, like picture list or different dom elements. It adds :

* Animation can be customized with user defined functions (rotate, 3d, default).
* You can easily hook to a plethora of custom events (onslidestart, onslide, onslideend, onslidechange)

<h2 id="getting-started">Getting Started</h2>
The best way to learn the iScroll is by looking at the demos. In the archive you'll find a demo folderMost of the script features are outlined there.
*iSlider* is a class that needs to be initiated for each dom area. 

Before you start, you need to prepare some data for iSlider:

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

HTML structure you only need to prepare is :
	
	<div id="wrapper"></div>

To make it runnable, all you need to do is initiate:

 	<script type="text/javascript">
    	var mySlider = new ISlider({
    		dom : '#wrapper',
    		data : data
    	});
    </script>

That's it. 

<h2 id="license">License (MIT)</h2>

Copyright (c) 2014 Matteo Spinelli

[MIT](https://github.com/BE-FE/MSlider/blob/master/LICENSE)