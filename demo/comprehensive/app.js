var list = [
{
	height: 475,
	width: 400,
	content: "pics/1.jpg",
},
{
	height: 527,
	width: 400,
	content: "pics/2.jpg",
},
{
 	height: 400,
 	width: 512,
 	content: "pics/3.jpg",
},
{
	height: 400,
	width: 458,
	content:"pics/5.jpg"
},
{
	height: 400,
	width: 498,
	content:"pics/6.jpg"
},
{
	height: 377,
	width: 600,
	content:"pics/7.jpg"
},
{
	height: 396,
	width: 600,
	content:"pics/8.jpg"
},
{
	height: 374,
	width: 600,
	content:"pics/9.jpg"
}
];
	
var mslider = new MSlider({
    data: list,
    dom: document.getElementById("canvas"),
    duration: 1500,
   	onslidechange: function(idx){
   		var target = document.getElementById('info').getElementsByTagName('strong')[0];
   		target.innerText = idx;
   	}
});

(function(){
	var menu = document.getElementById('menu');
	var spans = document.getElementsByTagName('span');

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
		var outer = document.getElementById('outer');
		var menu = document.getElementById('menu');
		var canvas = document.getElementById('canvas');
		var content = document.getElementById('content');

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
			outer.className = 'rotated_outer';
			menu.className = 'rotated_menu';
			target.innerText = 'changeOrientation: 90';
			setTimeout(function(){
				content.appendChild(canvas);
				canvas.className = 'rotated_canvas';
				mslider.reset();
			}, 200);
		}
	}

	if (navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)|(Android)\s+([\d.]+)/)) {
		var menu = document.getElementById('menu');
		var tip = document.getElementById('tip');
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
				menu.className = menu.className == 'show' ? '' : 'show';
				tip.className = tip.className == 'show' ? '' : 'show';
			}
			flag = false;

			window.scrollTo(0, 1);
		}, true)
		
		menu.className = 'show';
		tip.className = 'show';
		setTimeout(function(){
			menu.className = '';
			tip.className = '';
		}, 3000);
	}
})()