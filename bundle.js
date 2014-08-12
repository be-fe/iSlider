(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var list = [{
	height: 950,
	width: 800,
	img: "imgs/1.jpg",
},{
	height: 1187,
	width: 900,
	img: "imgs/2.jpg",
},{
	height: 766,
	width: 980,
	img: "imgs/3.jpg",
},{
	height: 766,
	width: 980,
	img: "imgs/4.jpg"
}];
var mSlider = require('./mSlider');
var slider = new mSlider({
	dom: document.getElementById('canvas'),
	list: list,
	autoPlay: 3000,
});
},{"./mSlider":2}],2:[function(require,module,exports){
var Slider = function (opts) {
	this.wrap = opts.dom;
	this.list = opts.list;
	this.autoPlay = opts.autoPlay;	
	this.init();
	this.renderDOM();
	this.bindDOM();
};
Slider.prototype.init = function() {
	this.radio = window.innerHeight/window.innerWidth;
	this.scaleW = window.innerWidth;
	this.idx = 1;
	this.initListInDom();
	this.initAutoPlay();
};
Slider.prototype.initListInDom = function() {
	//this array save index of the li in dom 
	var domIndexArr = [];	
	var listLength = this.list.length;
	for(var i=0; i<3; i++)	{
		if (i-1<0)
			domIndexArr[i] = (i-1+listLength);
		else
			domIndexArr[i] = (i-1)%listLength; 
	}
	this.domIndexArr = domIndexArr;
};
Slider.prototype.initAutoPlay = function() {
	if (!this.autoPlay)
		return;
	var self = this;
	this.autoPlayTimeout = setTimeout(function() {
		self.goIndex('+1');
	},this.autoPlay);
};
Slider.prototype.clearAutoPlay = function() {
	clearTimeout(this.autoPlayTimeout);
};
Slider.prototype.createLi = function(i) {
	var li = document.createElement('li');
	var item = this.list[this.domIndexArr[i]];
	li.style.width = this.scaleW + 'px';
	li.style.webkitTransform = 'translate3d(' + (i-1)*this.scaleW + 'px, 0, 0)';
	if (item.height/item.width > this.radio) {
		li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item.img + '">';
	} else {
		li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item.img + '">';
	}
	return li;
};
Slider.prototype.renderDOM = function() {
	var wrap = this.wrap;
	var data = this.list;
	var domIndexArr = this.domIndexArr;
	this.outer = document.createElement('ul');
	for(var i=0; i < 3; i++) {
		var li = this.createLi(i);
		this.outer.appendChild(li);
	}
	this.outer.style.width = this.scaleW + 'px';
	wrap.style.height = window.innerHeight + 'px';
	wrap.appendChild(this.outer);
};
Slider.prototype.goIndex = function(n) {
	var lis = this.outer.getElementsByTagName('li');
	var domIndexArr = this.domIndexArr;
	var outer = this.outer;
	var listLength = this.list.length;
	var newChild;
	if (typeof n !== "string")
		return;
	if ( n==="+1" ) {
		domIndexArr.shift();
		domIndexArr.push((domIndexArr[1]+1)%listLength);
		outer.removeChild(outer.childNodes[0]);
		newChild = this.createLi(2);
		outer.appendChild(newChild);
	} else if ( n==="-1" ) {
		var tmp = domIndexArr[0] - 1;
		tmp = tmp<0 ? listLength-1:tmp;
		domIndexArr.unshift(tmp);
		outer.removeChild(outer.childNodes[2]);
		newChild = this.createLi(0);
		outer.insertBefore(newChild, outer.childNodes[0]);
	}
	for (var i=0; i<3; i++) {
		lis[i].style.webkitTransition = '-webkit-transform 0.2s ease-out';
		lis[i].style.webkitTransform = 'translate3d(' + (i-1)*this.scaleW + 'px, 0, 0)';
	}
	this.clearAutoPlay();
	this.initAutoPlay();
};
Slider.prototype.bindDOM = function() {
	var self = this;
	var scaleW = self.scaleW;
	var outer = self.outer;
	var len = self.list.length;

	var startHandler = function(evt) {
		self.startTime = new Date() * 1;
		self.startX = evt.touches[0].pageX;
		self.offsetX = 0;
		var target = evt.target;
		while(target.nodeName != 'LI' && target.nodeName != 'BODY') {
			target = target.parentNode;
		}
		self.target = target;
	};

	var moveHandler = function(evt) {
		evt.preventDefault();
		self.offsetX = evt.targetTouches[0].pageX - self.startX;
		var lis = outer.getElementsByTagName('li');
		var i = self.idx - 1;
		var m = i + 3;
		for(; i<m; i++) {
			if (lis[i]) {
				lis[i].style.webkitTransition = '-webkit-transform 0s ease-out';
			}
			if (lis[i]) {
				lis[i].style.webkitTransform = 'translate3d(' + ((i-self.idx)*self.scaleW + self.offsetX) + 'px, 0, 0)';
			}
		}
	};
	var endHandler = function(evt) {
		evt.preventDefault();
		var boundary = scaleW / 6;
		var endTime = new Date() * 1;
		var lis = outer.getElementsByTagName('li');
		if (endTime - self.startTime > 300) {
			if (self.offsetX >= boundary) {
				self.goIndex('-1');
			} else if (self.offsetX < -boundary) {
				self.goIndex('+1');
			} else {
				self.goIndex('0');
			}
		} else {
			if (self.offsetX > 50) {
				self.goIndex('-1');
			} else if (self.offsetX < - 50) {
				self.goIndex('+1');
			} else {
				self.goIndex('0');
			}
		}
	};
	outer.addEventListener('touchstart', startHandler);
	outer.addEventListener('touchmove', moveHandler);
	outer.addEventListener('touchend', endHandler);
};
module.exports = Slider;


},{}]},{},[1]);
