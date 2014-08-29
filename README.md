MSlider
=======
A slider module for mobile web app, it's very simple and efficency.
It supports most mobile web browser like mobile safari, webkit chrome, and others.

API
========
```javascript
var MSlider = require('./mslider');
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
var mSlider = new MSlider({
    imgPrefix: "imgs/",
    imgSubfix: ".jpg",
    layerContent: false,
    autoPlay: false,
    verticle: false,
    loop: false,
    dom: document.getElementById("canvas"),
    data: list,
    onBeforeSlide: function (nowIndex, dataArr) {

    },
    onAfterSlide: function (nowIndex, dataArr) {

    }
});

 
```

[demo address](http://zxylvlp.github.io/MSlider/demo)

TO-DO LIST
==========
* ~~Keep li elements in 3~~
* Enable verticle slider
* ~~Add damping effect when meeting the edge of the list~~
* ~~handle onorientationchange Event~~
* Add image loader
* ~~Add layer slider not just pic slider~~
* Add callback functional like onBeforeSlide onAfterSlide onSlide 


License
========
[MIT](https://github.com/BE-FE/MSlider/blob/master/LICENSE)
