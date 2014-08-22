var list = [{
	height: 475,
	width: 400,
	img: "imgs/1.jpg",
},{
	height: 527,
	width: 400,
	img: "imgs/2.jpg",
},{
	height: 400,
	width: 512,
	img: "imgs/3.jpg",
},{
	height: 400,
	width: 512,
	img: "imgs/4.jpg"
},{
	height: 400,
	width: 458,
	img:"imgs/5.jpg"
},{
	height: 400,
	width: 498,
	img:"imgs/6.jpg"
},{
	height: 377,
	width: 600,
	img:"imgs/7.jpg"
},{
	height: 396,
	width: 600,
	img:"imgs/8.jpg"
},{
	height: 374,
	width: 600,
	img:"imgs/9.jpg"
}];
var MSlider = require('./mslider');
new MSlider({
	dom: document.getElementById('canvas'),
	list: list,
	autoPlay: 3000
});