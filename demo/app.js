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
	content:"pics/high/9.jpg"
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
var content = document.getElementById('iSlider-content');
var showWrappper = document.getElementById('iSlider-wrapper');
var show = document.getElementById('iSlider-show');

var nav = document.getElementById('iSlider-nav');

//option list
var optionSubMenuWrap = document.getElementById('iSlider-option');
var optionSubMenu = document.getElementById('iSlider-option').children[0].children;

// hidden div for slide options
var hiddenDiv = document.getElementById('iSlider-hidden');

// left top menu
var menuList = document.getElementById('option-menu');

// dom tabs
var tabWrapper = document.getElementById('iSlider-dom-nav');
var tabs = document.getElementById('iSlider-dom-nav').children;

var winH = window.innerHeight;
var winW = window.innerWidth;

var optionMenuToggle = 0;

// slide option
menuList.addEventListener('click', function() {
	if (optionMenuToggle === 0) {
		showWrappper.style.left = '310px';
		nav.style.left = '310px';
		optionMenuToggle = 1;
		showWrappper.style.backgroundColor = '';
	}
	else {
		showWrappper.style.left = '0';
		nav.style.left = '0';
		optionMenuToggle = 0;
	}
}, false);

// initialization
var islider = new iSlider({
    data: randomList,
    dom: document.getElementById("iSlider-show"),
    duration: 2000,
    animateType: 'default',
   	onslidechange: function(idx){
   		
   	}
});

//change data based on animation type
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

	//  isLooping
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

	// isVertical
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

	// isAutoPlay
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

	// isOverspread
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

	// change animation type
	optionSubMenu[4].childNodes[1].onchange = function() {
		islider._opts.animateType = this.value;

		if (islider.type === 'pic') {
			changeData();
		}

		islider.reset();
	};

	// change type dom | pic
	optionSubMenu[5].childNodes[1].onchange = function() {

		if (this.value === 'dom') {
			
			islider.sliderIndex = 0;
			islider._opts.type = 'dom';
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
					islider.slideTo(idx);
				}, false);
			}
		}
		else if(this.value === 'pic') {
			changeData();
			
			islider._opts.type = 'pic';
			islider._opts.onslidechange = function(idx){
		   		
		   	}

			tabWrapper.style.display = 'none';
		}
		
		islider._opts.type = this.value;

		islider.reset();
	};
})()