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