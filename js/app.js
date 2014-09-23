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
}];
	
mslider = new MSlider({
    data: list,
    dom: document.getElementById("canvas"),
    isVerticle: true,
    isLooping: true,
    isDebug: true,
    isAutoplay: true
});
