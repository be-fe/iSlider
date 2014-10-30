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

var iSlider = new iSlider({
    data: list,
    type: 'dom',
    dom: document.getElementById("iSlider-show"),
    duration: 2000,
   	onslidechange: function(idx){
   		document.getElementById('iSlider-nav').children[0].innerText = info[idx];
   	}
});


(function(){
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

		iSlider._opts.isLooping = !iSlider._opts.isLooping 
		iSlider.reset();
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

		iSlider._opts.isVertical = !iSlider._opts.isVertical;
		iSlider.reset();
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

		iSlider._opts.isAutoplay = !iSlider._opts.isAutoplay;
		iSlider.reset();
	}

	spans[3].onclick = function(){
		var target = spans[3];
		var outer = document.getElementById('iSlider-outer');
		var menu = document.getElementById('iSlider-menu');
		var canvas = document.getElementById('iSlider-canvas');
		var content = document.getElementById('iSlider-content');

		if (target.className == 'on') {
			target.className = '';
			outer.className = '';
			menu.className = '';
			target.innerText = 'changeOrientation: 0';
			canvas.className = '';
			outer.appendChild(canvas);
			setTimeout(function(){
				iSlider.reset();
			}, 200);
		} else {
			target.className = 'on';
			outer.className = 'iSlider-rotated-outer';
			menu.className = 'iSlider-rotated-menu';
			target.innerText = 'changeOrientation: 90';
			setTimeout(function(){
				content.appendChild(canvas);
				canvas.className = 'iSlider-rotated-canvas';
				iSlider.reset();
			}, 200);
		}
	}

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
				menu.className = menu.className == 'iSlider-show' ? '' : 'iSlider-show';
				tip.className = tip.className == 'iSlider-show' ? '' : 'iSlider-show';
			}
			flag = false;

			window.scrollTo(0, 1);
		}, true)
		
		menu.className = 'iSlider-show';
		tip.className = 'iSlider-show';
		setTimeout(function(){
			menu.className = '';
			tip.className = '';
		}, 3000);
	}

})();