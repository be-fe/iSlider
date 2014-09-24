MSlider
=======
A slider module for mobile web app, it's very simple and efficency.
It supports most mobile web browser like mobile safari, webkit chrome, and others.

Example
========
```javascript
var list = [{
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
	width: 512,
	content: "imgs/4.jpg"
},{
	height: 400,
	width: 458,
	content:"imgs/5.jpg"
}];
```
Assume you have a array like this, and you want to put those data to a slidershow. 
You can use MSlider like this:

```javascript
var MSlider = require('./mslider');
var mslider = new MSlider({
    data: list,
    dom: document.getElementById("canvas"),
    isVertical: true
});
```
Here is a example, you may change those parameter if you want and see what happen:
[Example](http://BE-FE.github.io/MSlider/demo)

TO-DO LIST
==========
* ~~Keep li elements in 3~~
* ~~Enable verticle slider~~
* ~~Add damping effect when meeting the edge of the list~~
* ~~handle onorientationchange Event~~
* ~~Add layer slider not just pic slider~~
* Add callback functional like onBeforeSlide onAfterSlide onSlide 


License
========
[MIT](https://github.com/BE-FE/MSlider/blob/master/LICENSE)
