var longList = [
{
	width: 640,
	height: 400,
	content: "pics/long/1.jpg",
},
{
	width: 640,
	height: 400,
	content: "pics/long/2.jpg",
},
{
 	width: 640,
	height: 400,
 	content: "pics/long/3.jpg",
},
{
	width: 640,
	height: 400,
	content:"pics/long/4.jpg"
},
{
	width: 640,
	height: 400,
	content:"pics/long/5.jpg"
},
{
	width: 640,
	height: 400,
	content:"pics/long/6.jpg"
},
{
	width: 640,
	height: 400,
	content:"pics/long/7.jpg"
},
{
	width: 640,
	height: 400,
	content:"pics/long/8.jpg"
},
{
	width: 640,
	height: 400,
	content:"pics/long/9.jpg"
}
];

var highList = [
{
	width: 300,
	height: 414,
	content: "pics/high/1.jpg",
},
{
	width: 300,
	height: 414,
	content: "pics/high/2.jpg",
},
{
 	width: 300,
	height: 414,
 	content: "pics/high/3.jpg",
},
{
	width: 300,
	height: 414,
	content:"pics/high/4.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/high/5.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/high/6.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/high/7.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/high/8.jpg"
},
{
	width: 300,
	height: 414,
	content:"pics/high/8.jpg"
}
];

var randomList = [
{
	width: 400,
	height: 457,
	content: "pics/random/1.jpg",
},
{
	width: 400,
	height: 527,
	content: "pics/random/2.jpg",
},
{
 	width: 536,
	height: 800,
 	content: "pics/random/3.jpg",
},
{
	width: 512,
	height: 400,
	content:"pics/random/4.jpg"
},
{
	width: 458,
	height: 400,
	content:"pics/random/5.jpg"
},
{
	width: 498,
	height: 400,
	content:"pics/random/6.jpg"
},
{
	width: 600,
	height: 377,
	content:"pics/random/7.jpg"
},
{
	width: 600,
	height: 396,
	content:"pics/random/8.jpg"
},
{
	width: 600,
	height: 374,
	content:"pics/random/9.jpg"
}
];

var domList = [
{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo dom-demo1"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo dom-demo2"><h1>Mail</h1><h2>This is Mail box</h2><p>A lot of junk mail</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo dom-demo3"><h1>News</h1><h2>This is News update</h2><p>Domestic and International News are included</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo dom-demo4"><h1>TV</h1><h2>This is TV show</h2><p>Fantastic Shows</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo dom-demo5"><h1>Game</h1><h2>This is Game center</h2><p>Let\'s rock it!</p><div>'
}
];


// adjust image size based on window screen width
var outer = document.getElementById('iSlider-outer');
var content = document.getElementById('iSlider-content');
var canvas = document.getElementById('iSlider-canvas');
var show = document.getElementById('iSlider-show');
var nav = document.getElementById('iSlider-nav');
var optionSubMenuWrap = document.getElementById('iSlider-option');
var optionSubMenu = document.getElementById('iSlider-option').children[0].children;
var hiddenDiv = document.getElementById('iSlider-hidden');
var menuList = document.getElementById('option-menu');

var tabWrapper = document.getElementById('iSlider-dom-nav');
var tabs = document.getElementById('iSlider-dom-nav').children;

var winH = window.innerHeight;
var winW = window.innerWidth;

var optionMenuToggle = 0;
var navMargeinLeft = 0;

menuList.addEventListener('click', function() {
	if (optionMenuToggle === 0) {
		if (optionSubMenu[4].className === 'on') {
			canvas.style.marginTop = '-270px';
		}
		else if (winW <= 1024) {
			canvas.style.marginLeft = '310px';
			nav.style.marginLeft = '0';
		}
		else {
			canvas.style.marginLeft = '340px';
		}
		optionMenuToggle = 1;
	}
	else {
		if (optionSubMenu[4].className === 'on') {
			canvas.style.marginTop = '2px';
		}
		else if (winW <= 1024) {
			canvas.style.marginLeft = 'auto';
			nav.style.marginLeft = navMargeinLeft + 'px';
		}
		else {
			canvas.style.marginLeft = '113px';
		}
		optionMenuToggle = 0;
	}
}, false);

//initialization
var islider = new iSlider({
    data: randomList,
    dom: document.getElementById("iSlider-show"),
    duration: 2000,
   	onslidechange: function(idx){
   		var target = document.getElementById('iSlider-nav').children[1].innerText = 'Index: ' + idx;
   		target.innerText = idx;
   	}
});

function changeData() {
	if (islider._opts.animateType === 'default') {
		islider._opts.data = randomList;
	}
	else if (islider._opts.animateType === 'flow' || islider._opts.animateType === 'depth' || islider._opts.animateType === 'flip') {
		islider._opts.data = longList;
	}
	else {
		islider._opts.data = highList;
	}
}

(function(){

	optionSubMenu[0].onclick = function(event){
		var target = event.target;
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

	optionSubMenu[1].onclick = function(){
		var target = event.target;
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

	optionSubMenu[2].onclick = function(){
		var target = event.target;
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

	optionSubMenu[3].onclick = function(){
		var target = event.target;
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isOverspread: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isOverspread: true';
		}

		islider._opts.isOverspread = !islider._opts.isOverspread;
		islider.reset();
	};

	optionSubMenu[4].onclick = function(){
		var target = event.target;

		if (target.className === 'on') {
			show.style.width = '';
			show.style.height = '';
			show.style.top = '30px';
	    	show.style.left = '0';
			target.className = '';
			outer.className = 'iSlider-outer-pc';
			show.className = 'iSlider-show-pc';
			nav.className = 'iSlider-nav-pc';
			tabWrapper.className = '';
			optionSubMenuWrap.children[0].className = '';
			optionSubMenuWrap.children[0].style.marginTop = '';
			target.innerText = 'changeOrientation: 0';
			hiddenDiv.style.height= '100%';
			hiddenDiv.style.marginTop = '';
			optionSubMenuWrap.style.marginTop = '72px';
			canvas.style.marginTop = '72px';
			canvas.style.marginLeft = '';
			optionMenuToggle = 0;
			setTimeout(function(){
				islider.reset();
			}, 200);
		} else {
			target.className = 'on';
			if (islider._opts.type === 'dom') {
				show.style.width = '450px';
				show.style.top = '115px';
	    		show.style.left = '-80px';
			}
			else {
				show.style.width = '240px';
				show.style.top = '110px';
	    		show.style.left = '22px';
			}
			
			show.style.height = '224px';
			
	    	hiddenDiv.style.height = '522px';
	    	hiddenDiv.style.marginTop = '70px';
	    	optionSubMenuWrap.style.marginTop = '2px';
	    	canvas.style.marginTop = '2px';
	    	canvas.style.marginLeft = '';
			outer.className = 'iSlider-outer-pc iSlider-rotated-outer';
			show.className = 'iSlider-show-pc iSlider-rotated-show';
			nav.className = 'iSlider-nav-pc iSlider-rotated-nav';
			tabWrapper.className = 'iSlider-rotate-dom-nav';
			optionSubMenuWrap.children[0].className = 'iSlider-rotated-option';
			optionSubMenuWrap.children[0].style.marginTop = '210px';
			target.innerText = 'changeOrientation: 90';
			optionMenuToggle = 0;
			setTimeout(function(){
				islider.reset();
			}, 200);
		}
	};

	optionSubMenu[5].childNodes[1].onchange = function() {
		islider._opts.animateType = this.value;

		if (islider._opts.type === 'pic') {
			changeData();
		}

		if (islider._opts.type === 'dom') {

			if (this.value === 'depth' || this.value === 'flow') {
				show.style.width = '';
			}
		}

		if (optionSubMenu[4].className === 'on') {
			show.style.top = '115px';
    		show.style.left = '-80px';
		}
		else {
			show.style.top = '40px';
	    	show.style.left = '0';
		}
		
		islider.reset();

	};

	optionSubMenu[6].childNodes[1].onchange = function() {
		
		var canvas = document.getElementById('iSlider-canvas');

		if (this.value === 'dom') {
			if (winW <= 1024) {
				show.style.width = winW + 'px';
				window.addEventListener('orientationchange', function() {
					show.style.width = window.innerWidth + 'px';
				}, false);
			}
			else {
				show.style.width = '450px';
			}
			if (optionSubMenu[4].className === 'on') {
				show.style.top = '115px';
	    		show.style.left = '-80px';
			}
			
			islider.sliderIndex = 0;
			islider._opts.data = domList;
			tabWrapper.style.display = 'block';
			tabs[0].style.background = '#666666';

			islider._opts.onslidechange = function(idx){
		   		for(i = 0; i < tabs.length; i++){
		   			if (i === idx){
		   				tabs[i].style.background = '#666666';
		   				tabs[i].style.color = '#ffffff';
		   			}
		   			else{
		   				tabs[i].style.backgroundColor = '#fff';
		   				tabs[i].style.color = '#000000';
		   			}
		   		}
		   		var target = document.getElementById('iSlider-nav').children[1].innerText = 'Index: ' + idx;
		   		target.innerText = idx;
		   	}

		   	for(i = 0; i < tabs.length; i++){
				tabs[i].id = i;
				tabs[i].addEventListener('click', function(e){
					var idx = parseInt(e.target.id);
					islider.slideTo(idx);
				}, false);
			}

			canvas.style.backgroundColor = '#ffffff';
		}
		else if(this.value === 'pic') {
			changeData();
			if (winW > 1024) {
				show.style.width = '254px';
			}
			else {
				show.style.width = '';
			}
			islider._opts.onslidechange = function(idx){
		   		var target = document.getElementById('iSlider-nav').children[1].innerText = 'Index: ' + idx;
		   		target.innerText = idx;
		   	}
			tabWrapper.style.display = 'none';
			canvas.style.backgroundColor = '#333';
		}
		
		islider._opts.type = this.value;

		islider.reset();
	};

	if (navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)|(Android)\s+([\d.]+)/)) {
		var tip = document.getElementById('iSlider-tip');
		var flag = false;
		var isChild = function (child, parent) {
			var target = child;
	        
	        while (target !== parent && target !== document.body) {
	            target = target.parentNode;
	        }
			
			return target === parent;
		}
	}
})()