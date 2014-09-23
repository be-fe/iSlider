var MSlider = require('./mslider');
var list = [{
	height: 475,
	width: 400,
	content: "pics/1.jpg",
},{
	height: 527,
	width: 400,
	content: "pics/2.jpg",
},{
 	height: 400,
 	width: 512,
 	content: "pics/3.jpg",
},{
	height: 400,
	width: 458,
	content:"pics/5.jpg"
},{
	height: 400,
	width: 498,
	content:"pics/6.jpg"
},{
	height: 377,
	width: 600,
	content:"pics/7.jpg"
},{
	height: 396,
	width: 600,
	content:"pics/8.jpg"
},{
	height: 374,
	width: 600,
	content:"pics/9.jpg"
}];
	
new MSlider({
    data: list,
    dom: document.getElementById("canvas"),
    isVerticle: true
});
