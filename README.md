MSlider
=======
A slider module for mobile web app, it's very simple and efficency.
It supports most mobile web browser like mobile safari, webkit chrome, and others.

API
========
```javascript
var list = [{
	height: 950,
	width: 800,
	img: "imgs/1.jpg",
},{
	height: 1187,
	width: 900,
	img: "imgs/2.jpg",
},{
	height: 766,
	width: 980,
	img: "imgs/3.jpg",
},{
	height: 766,
	width: 980,
	img: "imgs/4.jpg"
}];
var mSlider = require('./mSlider');
var slider = new mSlider({
	dom: document.getElementById('canvas'),
	list: list,
	autoPlay: 3000,
});


TO-DO LIST
==========
* Keep li elements in 3
