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
   	onslidechange: function(idx){
   		document.getElementById('MSlider-nav').children[0].innerText = info[idx];
   	}
});


(function(){
	var menu = document.getElementById('MSlider-menu');
	var spans = document.getElementById('MSlider-menu').children;

	spans[0].onclick = function(){
		var target = spans[0];
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isLooping: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isLooping: true';
		}

		mslider._opts.isLooping = !mslider._opts.isLooping 
		mslider.reset();
	}

	spans[1].onclick = function(){
		var target = spans[1];
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isVertical: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isVertical: true';
		}

		mslider._opts.isVertical = !mslider._opts.isVertical;
		mslider.reset();
	}

	spans[2].onclick = function(){
		var target = spans[2];
		if (target.className == 'on') {
			target.className = '';
			target.innerText = 'isAutoplay: false';
		} else {
			target.className = 'on';	
			target.innerText = 'isAutoplay: true';
		}

		mslider._opts.isAutoplay = !mslider._opts.isAutoplay;
		mslider.reset();
	}

	spans[3].onclick = function(){
		var target = spans[3];
		var outer = document.getElementById('MSlider-outer');
		var menu = document.getElementById('MSlider-menu');
		var canvas = document.getElementById('MSlider-canvas');
		var content = document.getElementById('MSlider-content');

		if (target.className == 'on') {
			target.className = '';
			outer.className = '';
			menu.className = '';
			target.innerText = 'changeOrientation: 0';
			canvas.className = '';
			outer.appendChild(canvas);
			setTimeout(function(){
				mslider.reset();
			}, 200);
		} else {
			target.className = 'on';
			outer.className = 'MSlider-rotated-outer';
			menu.className = 'MSlider-rotated-menu';
			target.innerText = 'changeOrientation: 90';
			setTimeout(function(){
				content.appendChild(canvas);
				canvas.className = 'MSlider-rotated-canvas';
				mslider.reset();
			}, 200);
		}
	}

	if (navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)|(Android)\s+([\d.]+)/)) {
		var menu = document.getElementById('MSlider-menu');
		var tip = document.getElementById('MSlider-tip');
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
				menu.className = menu.className == 'MSlider-show' ? '' : 'MSlider-show';
				tip.className = tip.className == 'MSlider-show' ? '' : 'MSlider-show';
			}
			flag = false;

			window.scrollTo(0, 1);
		}, true)
		
		menu.className = 'MSlider-show';
		tip.className = 'MSlider-show';
		setTimeout(function(){
			menu.className = '';
			tip.className = '';
		}, 3000);
	}

})();