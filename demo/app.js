var picList = [
{
	width: 300,
	height: 414,
	content: "pics/1.jpg",
},
{
	width: 300,
	height: 414,
	content: "pics/2.jpg",
},
{
 	width: 300,
	height: 414,
 	content: "pics/3.jpg",
},
{
	width: 300,
	height: 414,
	content:"pics/5.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/6.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/7.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/8.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/9.jpg"
}
];

var domList = [
{
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
}
];

// adjust image size based on window screen width
var outer = document.getElementById('iSlider-outer');
var show = document.getElementById('iSlider-show');
var imgRatio = 414 / 300;
var screenRatio = false;

if (window.innerWidth <= 1024) {
	var screenRatio = window.innerHeight / window.innerWidth;

	if (screenRatio < imgRatio) {
		outer.style.height = window.innerHeight + 'px';
		show.style.height = window.innerHeight + 'px';
	}
	else {
		outer.style.width = window.innerWidth + 'px';
		show.style.width = window.innerWidth + 'px';
	}
	
}

window.addEventListener('resize', function() {

	if (screenRatio < imgRatio) {
		outer.style.height = window.innerHeight + 'px';
		show.style.height = window.innerHeight + 'px';
	}
	else {
		outer.style.width = window.innerWidth + 'px';
		show.style.width = window.innerWidth + 'px';
	}

}, false);

//initialization
var islider = new iSlider({
    data: picList,
    dom: document.getElementById("iSlider-show"),
    duration: 2000,
   	onslidechange: function(idx){
   		var target = document.getElementById('iSlider-nav').children[0].innerText = 'Index: ' + idx;
   		target.innerText = idx;
   	}
});

(function(){

	//menu setting
	var menu = document.getElementById('iSlider-menu');
	var spans = document.getElementById('iSlider-menu').children;

	spans[0].onclick = function(){
		var target = spans[0];
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isLooping: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isLooping: true';
		}

		islider._opts.isLooping = !islider._opts.isLooping 
		islider.reset();
	};

	spans[1].onclick = function(){
		var target = spans[1];
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isVertical: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isVertical: true';
		}

		islider._opts.isVertical = !islider._opts.isVertical;
		islider.reset();
	};

	spans[2].onclick = function(){
		var target = spans[2];
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isAutoplay: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isAutoplay: true';
		}

		islider._opts.isAutoplay = !islider._opts.isAutoplay;
		islider.reset();
	};

	spans[3].onclick = function(){
		var target = spans[3];
		var outer = document.getElementById('iSlider-outer');
		var menu = document.getElementById('iSlider-menu');
		var canvas = document.getElementById('iSlider-canvas');
		var content = document.getElementById('iSlider-content');

		if (target.className === 'on') {
			target.className = '';
			outer.className = '';
			menu.className = '';
			target.innerText = 'changeOrientation: 0';
			canvas.className = '';
			outer.appendChild(canvas);
			setTimeout(function(){
				islider.reset();
			}, 200);
		} else {
			target.className = 'on';
			outer.className = 'iSlider-rotated-outer';
			menu.className = 'iSlider-rotated-menu';
			target.innerText = 'changeOrientation: 90';
			setTimeout(function(){
				content.appendChild(canvas);
				canvas.className = 'iSlider-rotated-canvas';
				islider.reset();
			}, 200);
		}
	};

	spans[4].childNodes[1].onchange = function() {
		islider._opts.animateType = this.value;
		islider.reset();

	};

	spans[5].childNodes[1].onchange = function() {
		
		var canvas = document.getElementById('iSlider-canvas');

		if (this.value === 'dom') {
			islider.sliderIndex = 0;
			islider._opts.data = domList;
			canvas.style.backgroundColor = '#ffffff';
		}
		else if(this.value === 'pic') {
			islider._opts.data = picList;
			canvas.style.backgroundColor = '#333';
		}
		
		islider._opts.type = this.value;

		islider.reset();
	};

	//menu if it is mobile
	var toggle = 0;

	document.getElementById('iSlider-menu-tag').addEventListener('touchstart', function(event) {

		event.preventDefault();

		if (toggle === 0) {
			window.document.getElementById('iSlider-menu-tag').style.marginLeft = '30px';
			window.document.getElementById('iSlider-menu').style.marginLeft = '0';
			toggle = 1;
		}
		else {
			window.document.getElementById('iSlider-menu-tag').style.marginLeft = '-200px';
			window.document.getElementById('iSlider-menu').style.marginLeft = '-230px';
			toggle = 0;
		}
		

	}, false);

	if (navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)|(Android)\s+([\d.]+)/)) {
		var menu = document.getElementById('iSlider-menu');
		var tip = document.getElementById('iSlider-tip');
		var flag = false;
		var isChild = function (child, parent) {
			var target = child;
	        
	        while (target !== parent && target !== document.body) {
	            target = target.parentNode;
	        }
			
			return target === parent;
		}

		window.addEventListener('touchmove', function (evt) {
			flag = true;
		}, true);

		window.addEventListener('touchend', function (evt) {
			if (!flag) {
				if (isChild(evt.target, tip) || isChild(evt.target, menu)) {
					flag = false;
					return;
				}
				tip.className = (tip.className == 'show') ? '' : 'show';
			}
			flag = false;

			window.scrollTo(0, 1);
		}, true)
		
		menu.className = (menu.className == 'iSlider-rotated-menu') ?  'iSlider-rotated-menu show' : 'show';
		tip.className = 'show';
		setTimeout(function(){
			tip.className = '';
		}, 3000);
	}
})()