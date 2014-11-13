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
	'content' : '<div class="dom-demo"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo"><h1>Domestic</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo"><h1>International</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo"><h1>Sports</h1><h2>This is page3</h2><p>page3 is pretty awsome</p><div>'
},{
	'height' : '100%',
	'width' : '100%',
	'content' : '<div class="dom-demo"><h1>Entertainment</h1><h2>This is page4</h2><p>page4 is pretty awsome</p><div>'
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
    data: picList,
    dom: document.getElementById("iSlider-show"),
    duration: 2000,
   	onslidechange: function(idx){
   		var target = document.getElementById('iSlider-nav').children[1].innerText = 'Index: ' + idx;
   		target.innerText = idx;
   	}
});

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
			show.style.top = '';
	    	show.style.left = '';
			target.className = '';
			outer.className = 'iSlider-outer-pc';
			show.className = 'iSlider-show-pc';
			nav.className = 'iSlider-nav-pc';
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
			show.style.width = '240px';
			show.style.height = '224px';
			show.style.top = '110px';
	    	show.style.left = '22px';
	    	hiddenDiv.style.height = '522px';
	    	hiddenDiv.style.marginTop = '70px';
	    	optionSubMenuWrap.style.marginTop = '2px';
	    	canvas.style.marginTop = '2px';
	    	canvas.style.marginLeft = '';
			outer.className = 'iSlider-outer-pc iSlider-rotated-outer';
			show.className = 'iSlider-show-pc iSlider-rotated-show';
			nav.className = 'iSlider-nav-pc iSlider-rotated-nav';
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
		islider.reset();

	};

	optionSubMenu[6].childNodes[1].onchange = function() {
		
		var canvas = document.getElementById('iSlider-canvas');

		if (this.value === 'dom') {
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
		   	}

		   	for(i = 0; i < tabs.length; i++){
				tabs[i].id = i;
				tabs[i].addEventListener('click', function(e){
					var idx = parseInt(e.target.id);
					islider.goto(idx);
				}, false);
			}

			canvas.style.backgroundColor = '#ffffff';
		}
		else if(this.value === 'pic') {
			islider._opts.data = picList;
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