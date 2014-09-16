(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MSlider = require('./mslider');
var list = [{
		height: 475,
		width: 400,
		content: "imgs/1.jpg",
	},{
		height: 527,
		width: 400,
		content: "imgs/2.jpg",
	},{
	 	height: 400,
	 	width: 512,
	 	content: "imgs/3.jpg",
	},{
		height: 400,
		width: 458,
		content:"imgs/5.jpg"
	},{
		height: 400,
		width: 498,
		content:"imgs/6.jpg"
	},{
		height: 377,
		width: 600,
		content:"imgs/7.jpg"
	},{
		height: 396,
		width: 600,
		content:"imgs/8.jpg"
	},{
		height: 374,
		width: 600,
		content:"imgs/9.jpg"
	}];
new MSlider({
    isLayerContent: false,
    isVerticle: true,
    dom: document.getElementById("canvas"),
    data: list
});

},{"./mslider":2}],2:[function(require,module,exports){
/**
 * MSlider main method
 * 
 * @param {Object} opts 参数集
 * @param {Element} opts.dom 外层元素 
 * @param {Object} opts.data 数据列表
 *
 * @class 
 */
var MSlider = function(opts) {
    if (!opts.dom) {
        throw new Error("dom element can not be empty!");
    }

    if (!opts.data || !opts.data.length) {
        throw new Error("data must be an array and must have more than one element!");
    }

    this.init(opts);
    this.renderHTML();
    this.bindDOM();
};

MSlider.prototype.init = function (opts) {

    this.wrap = opts.dom;
    this.data = opts.data;
    this.scaleW = window.innerWidth;
    this.scaleH = window.innerHeight;
    this.ratio = window.innerHeight / window.innerWidth;
    this.isVerticle = opts.isVerticle || false;

    if (this.data.length < 2) {
        this.isLooping = false;
        this.isAutoPlay = false;
    } else {
        this.isLooping = opts.isLooping || false;
        this.isAutoPlay = opts.isAutoPlay || false;
    }

    this.isVerticle = opts.isVerticle;
    this.type = opts.type || 'pic';

    this.initDomIndex();
    this.initAutoPlay();
    this.damplingFunction = this.initDampingFunction(this.scaleW);
};

/**
 *  利用屏幕的全部滑动距离来进行初始化，
 *  返回一个计算阻尼的函数。
 *  由于dampling效应在滑动时触发，为了尽量优化性能利用闭包进行性能优化。  
 */
MSlider.prototype.initDampingFunction = function (fullDistance) {
    var halfOfFull = fullDistance >> 1;
    var oneFourOfFull = halfOfFull >> 1;
    var oneEightOfFull = oneFourOfFull >> 1;
    var threeFourOfFull = halfOfFull + oneFourOfFull;
    var fiveSixteenOfFull = oneFourOfFull + (oneEightOfFull >> 1);

    return function (distance) {
        var negative;
        if (distance < 0) {
            distance = -distance;
            negative = true;
        }
        var result;
        if (distance < halfOfFull) {
            result = distance >> 1;
        } 
        else if (distance < threeFourOfFull) {
            result = oneFourOfFull + (distance - halfOfFull >> 2);
        } else {
            result = fiveSixteenOfFull + (distance - threeFourOfFull >> 3);
        }
        if (negative === true) {
            return -result;
        } else {
            return result;
        }
    };
};

/**
 *   初始化 domIndexArr 其中存放的是 dom 中元素在 data 中的索引值。
 *   其最大长度为3。loop时长度一定为3。
 *   不loop时,如果data长度小于3 则长度为 data 长度, 否则长度为3。
 *   idx 值表示视口对准的项目
 */
MSlider.prototype.initDomIndex = function () {
    var domIndexArr = [];
    if (!this.isLooping) {
        var loopLength = Math.min(3, this.data.length);
        for (var i = 0; i < loopLength; i++) {
            domIndexArr[i] = i;
        }
        this.idx = 0;
    } else {
        domIndexArr[0] = dataLength - 1;
        domIndexArr[1] = 0;
        domIndexArr[2] = 1;
        this.idx = 1;
    }
    this.domIndexArr = domIndexArr;
};

MSlider.prototype.initAutoPlay = function () {
    if (!this.isAutoPlay){ return; }
    var self = this;
    this.autoPlayTimeout = setTimeout(function () {
        self.goIndex('+1');
    }, this.isAutoPlay);
};

MSlider.prototype.clearAutoPlay = function () {
    clearTimeout(this.autoPlayTimeout);
};

/*
    初始化ul列表中的li的时候使用i是li的index。
*/
MSlider.prototype.createLi = function (i) {
    var li = document.createElement('li');
    var item = this.data[this.domIndexArr[i]];
    var offsetX = !this.isVerticle ? 0 : this.scaleW * (i - this.idx);
    var offsetY = this.isVerticle ? 0 : this.scaleH * (i - this.idx);

    li.style.width = this.scaleW + 'px';
    li.style.height = this.scaleH + 'px';
    li.style.webkitTransform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';

    if (this.isLayerContent) {
        li.innerHTML = '<div style="height:' + item.height + '%;width:' + item.width + '%;">' + item.content + '</div>';
    } else {
        if (item.height / item.width > this.ratio) {
            li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item.content + '">';
        } else {
            li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item.content + '">';
        }
    }
    return li;
};

/*
    重用ul中li的内容更换内容。
*/
MSlider.prototype.reUseLi = function (li,negOrPosOne) {
    var data = this.data;
    var domIndexArr = this.domIndexArr;
    var item = negOrPosOne === -1 ? data[domIndexArr[0]] : data[domIndexArr[2]];
    if (this.isLayerContent) {
        li.innerHTML = '<div style="height:' + item.height + '%;width:' + item.width + '%;">' + item.content + '</div>';
    } 
    else {
        if (item.height / item.width > this.ratio) {
            li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item.content + '">';
        } 
        else {
            li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item.content + '">';
        }
    }
};

/*
    渲染dom
*/
MSlider.prototype.renderHTML = function () {
    var wrap = this.wrap;
    var data = this.data;
    var domIndexArr = this.domIndexArr;
    var domIndexArrLength = domIndexArr.length;
    this.domIndexArrHash = [];
    this.outer = document.createElement('ul');
    for (var i = 0; i < domIndexArrLength; i++) {
        var li = this.createLi(i);
        this.outer.appendChild(li);
        this.domIndexArrHash[i] = li;
    }
    this.outer.style.width = this.scaleW + 'px';
    wrap.style.height = window.innerHeight + 'px';
    wrap.appendChild(this.outer);
};

MSlider.prototype.goIndex = function (n) {
    var domIndexArr = this.domIndexArr;
    var domIndexArrHash = this.domIndexArrHash;
    var outer = this.outer;
    var listLength = this.data.length;
    var newChild;
    var tmp;
    var loop = this.isLooping;
    var noTransitionTimeId = 3;


    if (typeof n !== "string") return;
    if (n === "+1") {
        if ( this.idx!==0 && this.idx!==2 ) {
            if (loop||listLength > 2) {
                if (loop ||domIndexArr[1] !== listLength -2 ) {
                    domIndexArr.shift();
                    domIndexArr.push((domIndexArr[1] + 1) % listLength);
                    tmp = this.domIndexArrHash.shift();
                    this.reUseLi(tmp,1);
                    this.domIndexArrHash.push(tmp);
                    noTransitionTimeId = 2;
                    console.log(this.domIndexArrHash);
                } else {
                    this.idx = 2;
                }
            } 
        } else {
            if (this.idx === 0) {
                if (listLength==1) {
                    this.idx = 0;
                } else {
                    this.idx = 1;
                }
            } 
        }
    } else if (n === "-1") {
        if ( this.idx!==0 && this.idx !==2) {
            if (loop || domIndexArr[0] !== 0) {
                tmp = domIndexArr[0] - 1;
                tmp = tmp < 0 ? listLength - 1 : tmp;
                domIndexArr.unshift(tmp);
                domIndexArr.length = 3;
                this.domIndexArrHash.unshift(null);
                tmp = this.domIndexArrHash[3];
                this.domIndexArrHash.length = 3;
                this.reUseLi(tmp,-1);
                this.domIndexArrHash[0] = tmp;
                noTransitionTimeId = 0;
                console.log(this.domIndexArrHash);
            } 
            else {
                this.idx = 0;
            }
        } 
        else {
           if (this.idx === 2) {
                this.idx = 1;
           }
        }
        
    }



    for (var i = 0; i < domIndexArrHash.length; i++) {
        var offsetX = this.isVerticle ? 0 : this.scaleW * (i - this.idx);
        var offsetY = this.isVerticle ? this.scaleH * (i - this.idx) : 0;

        if (i === noTransitionTimeId) {
            domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0s ease-out';
        } else {
            domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        }
        domIndexArrHash[i].style.webkitTransform = 'translate3d(' + offsetX + 'px, '+ offsetY +'px, 0)';
    }
    this.initAutoPlay();
};

MSlider.prototype.bindDOM = function () {
    var self = this;
    var scaleW = self.scaleW;
    var outer = self.outer;
    var len = self.data.length;

    var startHandler = function (evt) {
        self.startTime = new Date().getTime();
        self.startX = evt.touches[0].pageX;
        self.startY = evt.touches[0].pageY;
        self.offsetX = self.offsetY = 0;
        var target = evt.target;
        while (target.nodeName != 'LI' && target.nodeName != 'BODY') {
            target = target.parentNode;
        }
        self.target = target;
        self.clearAutoPlay();
    };

    var moveHandler = function (evt) {
        evt.preventDefault();
        
        self.offsetX = evt.targetTouches[0].pageX - self.startX;
        self.offsetY = evt.targetTouches[0].pageY - self.startY;

        var arrLength = self.domIndexArrHash.length;
        var domIndexArrHash = self.domIndexArrHash;
        for (i = 0; i < arrLength; i++) {
            if (domIndexArrHash[i]) {
                domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0s ease-out';
            }
            if (domIndexArrHash[i]) {
                if(!self.isVerticle){
                    if ((self.idx === 0 && self.offsetX > 0) || (self.idx === 2 && self.offsetX < 0)) {
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * self.scaleW + self.damplingFunction(self.offsetX)) + 'px, 0, 0)';
                    } else {
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * self.scaleW + self.offsetX) + 'px, 0, 0)';
                    }
                } else {
                    if ((self.idx === 0 && self.offsetY > 0) || (self.idx === 2 && self.offsetY < 0)) {
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(0,' + ((i - self.idx) * self.scaleH + self.damplingFunction(self.offsetY)) + 'px, 0)';
                    } else {
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(0,' + ((i - self.idx) * self.scaleH + self.offsetY) + 'px, 0)';
                    }
                }
            }
        }
    };
    var endHandler = function (evt) {
        evt.preventDefault();

        var boundary = self.isVerticle ? self.scaleH / 6 : self.scaleW / 6 ;
        var metric = self.isVerticle ? self.offsetY : self.offsetX;
        var endTime = new Date().getTime();
        var lis = outer.getElementsByTagName('li');
        if (endTime - self.startTime > 300) {
            if (metric >= boundary) {
                self.goIndex('-1');
            } else if (metric < -boundary) {
                self.goIndex('+1');
            } else {
                self.goIndex('0');
            }
        } else {
            if (metric > 50) {
                self.goIndex('-1');
            } else if (metric < -50) {
                self.goIndex('+1');
            } else {
                self.goIndex('0');
            }
        }
    };

    var resizeHandler = function () {
       self.ratio = window.innerHeight / window.innerWidth;
       self.scaleW = window.innerWidth;
       self.wrap.style.height = window.innerHeight + 'px';
       self.outer.style.width = self.scaleW + 'px';
       var domIndexArrHash = self.domIndexArrHash;
       var domIndexArr = self.domIndexArr;
       for (var i = domIndexArrHash.length - 1; i >= 0; i--) {
           domIndexArrHash[i].style.width = self.scaleW + 'px';
           domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0s ease-out';
           domIndexArrHash[i].style.webkitTransform = 'translate3d(' + (i-self.idx) * self.scaleW + 'px, 0, 0)';
           if (self.layerContent === true) continue;
           var img = domIndexArrHash[i].childNodes[0];
           var imgData = self.data[domIndexArr[i]];
           console.log((imgData.height /imgData.width) + " "+ self.ratio);
           if ((imgData.height /imgData.width) > self.ratio) {
                img.height = window.innerHeight;
                img.removeAttribute("width");
           } else {
                img.width = self.scaleW;
                img.removeAttribute("height");
           }

       }
    };
    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
    window.addEventListener('resize', resizeHandler);
};
module.exports = MSlider;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYmF0eXFpL0RvY3VtZW50cy9Db2RlL01TbGlkZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4vanMvYXBwLmpzIiwiL1VzZXJzL3FiYXR5cWkvRG9jdW1lbnRzL0NvZGUvTVNsaWRlci9qcy9tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTVNsaWRlciA9IHJlcXVpcmUoJy4vbXNsaWRlcicpO1xudmFyIGxpc3QgPSBbe1xuXHRcdGhlaWdodDogNDc1LFxuXHRcdHdpZHRoOiA0MDAsXG5cdFx0Y29udGVudDogXCJpbWdzLzEuanBnXCIsXG5cdH0se1xuXHRcdGhlaWdodDogNTI3LFxuXHRcdHdpZHRoOiA0MDAsXG5cdFx0Y29udGVudDogXCJpbWdzLzIuanBnXCIsXG5cdH0se1xuXHQgXHRoZWlnaHQ6IDQwMCxcblx0IFx0d2lkdGg6IDUxMixcblx0IFx0Y29udGVudDogXCJpbWdzLzMuanBnXCIsXG5cdH0se1xuXHRcdGhlaWdodDogNDAwLFxuXHRcdHdpZHRoOiA0NTgsXG5cdFx0Y29udGVudDpcImltZ3MvNS5qcGdcIlxuXHR9LHtcblx0XHRoZWlnaHQ6IDQwMCxcblx0XHR3aWR0aDogNDk4LFxuXHRcdGNvbnRlbnQ6XCJpbWdzLzYuanBnXCJcblx0fSx7XG5cdFx0aGVpZ2h0OiAzNzcsXG5cdFx0d2lkdGg6IDYwMCxcblx0XHRjb250ZW50OlwiaW1ncy83LmpwZ1wiXG5cdH0se1xuXHRcdGhlaWdodDogMzk2LFxuXHRcdHdpZHRoOiA2MDAsXG5cdFx0Y29udGVudDpcImltZ3MvOC5qcGdcIlxuXHR9LHtcblx0XHRoZWlnaHQ6IDM3NCxcblx0XHR3aWR0aDogNjAwLFxuXHRcdGNvbnRlbnQ6XCJpbWdzLzkuanBnXCJcblx0fV07XG5uZXcgTVNsaWRlcih7XG4gICAgaXNMYXllckNvbnRlbnQ6IGZhbHNlLFxuICAgIGlzVmVydGljbGU6IHRydWUsXG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSxcbiAgICBkYXRhOiBsaXN0XG59KTtcbiIsIi8qKlxuICogTVNsaWRlciBtYWluIG1ldGhvZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyDlj4LmlbDpm4ZcbiAqIEBwYXJhbSB7RWxlbWVudH0gb3B0cy5kb20g5aSW5bGC5YWD57SgIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMuZGF0YSDmlbDmja7liJfooahcbiAqXG4gKiBAY2xhc3MgXG4gKi9cbnZhciBNU2xpZGVyID0gZnVuY3Rpb24ob3B0cykge1xuICAgIGlmICghb3B0cy5kb20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZG9tIGVsZW1lbnQgY2FuIG5vdCBiZSBlbXB0eSFcIik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLmRhdGEgfHwgIW9wdHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBtdXN0IGJlIGFuIGFycmF5IGFuZCBtdXN0IGhhdmUgbW9yZSB0aGFuIG9uZSBlbGVtZW50IVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXQob3B0cyk7XG4gICAgdGhpcy5yZW5kZXJIVE1MKCk7XG4gICAgdGhpcy5iaW5kRE9NKCk7XG59O1xuXG5NU2xpZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdHMpIHtcblxuICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuICAgIHRoaXMuZGF0YSA9IG9wdHMuZGF0YTtcbiAgICB0aGlzLnNjYWxlVyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuc2NhbGVIID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHRoaXMucmF0aW8gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLmlzVmVydGljbGUgPSBvcHRzLmlzVmVydGljbGUgfHwgZmFsc2U7XG5cbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0F1dG9QbGF5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSBvcHRzLmlzTG9vcGluZyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0F1dG9QbGF5ID0gb3B0cy5pc0F1dG9QbGF5IHx8IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuaXNWZXJ0aWNsZSA9IG9wdHMuaXNWZXJ0aWNsZTtcbiAgICB0aGlzLnR5cGUgPSBvcHRzLnR5cGUgfHwgJ3BpYyc7XG5cbiAgICB0aGlzLmluaXREb21JbmRleCgpO1xuICAgIHRoaXMuaW5pdEF1dG9QbGF5KCk7XG4gICAgdGhpcy5kYW1wbGluZ0Z1bmN0aW9uID0gdGhpcy5pbml0RGFtcGluZ0Z1bmN0aW9uKHRoaXMuc2NhbGVXKTtcbn07XG5cbi8qKlxuICogIOWIqeeUqOWxj+W5leeahOWFqOmDqOa7keWKqOi3neemu+adpei/m+ihjOWIneWni+WMlu+8jFxuICogIOi/lOWbnuS4gOS4quiuoeeul+mYu+WwvOeahOWHveaVsOOAglxuICogIOeUseS6jmRhbXBsaW5n5pWI5bqU5Zyo5ruR5Yqo5pe26Kem5Y+R77yM5Li65LqG5bC96YeP5LyY5YyW5oCn6IO95Yip55So6Zet5YyF6L+b6KGM5oCn6IO95LyY5YyW44CCICBcbiAqL1xuTVNsaWRlci5wcm90b3R5cGUuaW5pdERhbXBpbmdGdW5jdGlvbiA9IGZ1bmN0aW9uIChmdWxsRGlzdGFuY2UpIHtcbiAgICB2YXIgaGFsZk9mRnVsbCA9IGZ1bGxEaXN0YW5jZSA+PiAxO1xuICAgIHZhciBvbmVGb3VyT2ZGdWxsID0gaGFsZk9mRnVsbCA+PiAxO1xuICAgIHZhciBvbmVFaWdodE9mRnVsbCA9IG9uZUZvdXJPZkZ1bGwgPj4gMTtcbiAgICB2YXIgdGhyZWVGb3VyT2ZGdWxsID0gaGFsZk9mRnVsbCArIG9uZUZvdXJPZkZ1bGw7XG4gICAgdmFyIGZpdmVTaXh0ZWVuT2ZGdWxsID0gb25lRm91ck9mRnVsbCArIChvbmVFaWdodE9mRnVsbCA+PiAxKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIG5lZ2F0aXZlO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICAgICAgICBkaXN0YW5jZSA9IC1kaXN0YW5jZTtcbiAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCBoYWxmT2ZGdWxsKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBkaXN0YW5jZSA+PiAxO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChkaXN0YW5jZSA8IHRocmVlRm91ck9mRnVsbCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lRm91ck9mRnVsbCArIChkaXN0YW5jZSAtIGhhbGZPZkZ1bGwgPj4gMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmaXZlU2l4dGVlbk9mRnVsbCArIChkaXN0YW5jZSAtIHRocmVlRm91ck9mRnVsbCA+PiAzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmVnYXRpdmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAtcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqICAg5Yid5aeL5YyWIGRvbUluZGV4QXJyIOWFtuS4reWtmOaUvueahOaYryBkb20g5Lit5YWD57Sg5ZyoIGRhdGEg5Lit55qE57Si5byV5YC844CCXG4gKiAgIOWFtuacgOWkp+mVv+W6puS4ujPjgIJsb29w5pe26ZW/5bqm5LiA5a6a5Li6M+OAglxuICogICDkuI1sb29w5pe2LOWmguaenGRhdGHplb/luqblsI/kuo4zIOWImemVv+W6puS4uiBkYXRhIOmVv+W6piwg5ZCm5YiZ6ZW/5bqm5Li6M+OAglxuICogICBpZHgg5YC86KGo56S66KeG5Y+j5a+55YeG55qE6aG555uuXG4gKi9cbk1TbGlkZXIucHJvdG90eXBlLmluaXREb21JbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZG9tSW5kZXhBcnIgPSBbXTtcbiAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgIHZhciBsb29wTGVuZ3RoID0gTWF0aC5taW4oMywgdGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9vcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkb21JbmRleEFycltpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZHggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbUluZGV4QXJyWzBdID0gZGF0YUxlbmd0aCAtIDE7XG4gICAgICAgIGRvbUluZGV4QXJyWzFdID0gMDtcbiAgICAgICAgZG9tSW5kZXhBcnJbMl0gPSAxO1xuICAgICAgICB0aGlzLmlkeCA9IDE7XG4gICAgfVxuICAgIHRoaXMuZG9tSW5kZXhBcnIgPSBkb21JbmRleEFycjtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLmluaXRBdXRvUGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuaXNBdXRvUGxheSl7IHJldHVybjsgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmF1dG9QbGF5VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmdvSW5kZXgoJysxJyk7XG4gICAgfSwgdGhpcy5pc0F1dG9QbGF5KTtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLmNsZWFyQXV0b1BsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYXV0b1BsYXlUaW1lb3V0KTtcbn07XG5cbi8qXG4gICAg5Yid5aeL5YyWdWzliJfooajkuK3nmoRsaeeahOaXtuWAmeS9v+eUqGnmmK9saeeahGluZGV444CCXG4qL1xuTVNsaWRlci5wcm90b3R5cGUuY3JlYXRlTGkgPSBmdW5jdGlvbiAoaSkge1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdmFyIGl0ZW0gPSB0aGlzLmRhdGFbdGhpcy5kb21JbmRleEFycltpXV07XG4gICAgdmFyIG9mZnNldFggPSAhdGhpcy5pc1ZlcnRpY2xlID8gMCA6IHRoaXMuc2NhbGVXICogKGkgLSB0aGlzLmlkeCk7XG4gICAgdmFyIG9mZnNldFkgPSB0aGlzLmlzVmVydGljbGUgPyAwIDogdGhpcy5zY2FsZUggKiAoaSAtIHRoaXMuaWR4KTtcblxuICAgIGxpLnN0eWxlLndpZHRoID0gdGhpcy5zY2FsZVcgKyAncHgnO1xuICAgIGxpLnN0eWxlLmhlaWdodCA9IHRoaXMuc2NhbGVIICsgJ3B4JztcbiAgICBsaS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIG9mZnNldFggKyAncHgsICcgKyBvZmZzZXRZICsgJ3B4LCAwKSc7XG5cbiAgICBpZiAodGhpcy5pc0xheWVyQ29udGVudCkge1xuICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGRpdiBzdHlsZT1cImhlaWdodDonICsgaXRlbS5oZWlnaHQgKyAnJTt3aWR0aDonICsgaXRlbS53aWR0aCArICclO1wiPicgKyBpdGVtLmNvbnRlbnQgKyAnPC9kaXY+JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbykge1xuICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gJzxpbWcgaGVpZ2h0PVwiJyArIHdpbmRvdy5pbm5lckhlaWdodCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGltZyB3aWR0aD1cIicgKyB3aW5kb3cuaW5uZXJXaWR0aCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpO1xufTtcblxuLypcbiAgICDph43nlKh1bOS4rWxp55qE5YaF5a655pu05o2i5YaF5a6544CCXG4qL1xuTVNsaWRlci5wcm90b3R5cGUucmVVc2VMaSA9IGZ1bmN0aW9uIChsaSxuZWdPclBvc09uZSkge1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICAgIHZhciBkb21JbmRleEFyciA9IHRoaXMuZG9tSW5kZXhBcnI7XG4gICAgdmFyIGl0ZW0gPSBuZWdPclBvc09uZSA9PT0gLTEgPyBkYXRhW2RvbUluZGV4QXJyWzBdXSA6IGRhdGFbZG9tSW5kZXhBcnJbMl1dO1xuICAgIGlmICh0aGlzLmlzTGF5ZXJDb250ZW50KSB7XG4gICAgICAgIGxpLmlubmVySFRNTCA9ICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OicgKyBpdGVtLmhlaWdodCArICclO3dpZHRoOicgKyBpdGVtLndpZHRoICsgJyU7XCI+JyArIGl0ZW0uY29udGVudCArICc8L2Rpdj4nO1xuICAgIH0gXG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggPiB0aGlzLnJhdGlvKSB7XG4gICAgICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGltZyBoZWlnaHQ9XCInICsgd2luZG93LmlubmVySGVpZ2h0ICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+JztcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGltZyB3aWR0aD1cIicgKyB3aW5kb3cuaW5uZXJXaWR0aCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKlxuICAgIOa4suafk2RvbVxuKi9cbk1TbGlkZXIucHJvdG90eXBlLnJlbmRlckhUTUwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHdyYXAgPSB0aGlzLndyYXA7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdmFyIGRvbUluZGV4QXJyID0gdGhpcy5kb21JbmRleEFycjtcbiAgICB2YXIgZG9tSW5kZXhBcnJMZW5ndGggPSBkb21JbmRleEFyci5sZW5ndGg7XG4gICAgdGhpcy5kb21JbmRleEFyckhhc2ggPSBbXTtcbiAgICB0aGlzLm91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbUluZGV4QXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxpID0gdGhpcy5jcmVhdGVMaShpKTtcbiAgICAgICAgdGhpcy5vdXRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIHRoaXMuZG9tSW5kZXhBcnJIYXNoW2ldID0gbGk7XG4gICAgfVxuICAgIHRoaXMub3V0ZXIuc3R5bGUud2lkdGggPSB0aGlzLnNjYWxlVyArICdweCc7XG4gICAgd3JhcC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuICAgIHdyYXAuYXBwZW5kQ2hpbGQodGhpcy5vdXRlcik7XG59O1xuXG5NU2xpZGVyLnByb3RvdHlwZS5nb0luZGV4ID0gZnVuY3Rpb24gKG4pIHtcbiAgICB2YXIgZG9tSW5kZXhBcnIgPSB0aGlzLmRvbUluZGV4QXJyO1xuICAgIHZhciBkb21JbmRleEFyckhhc2ggPSB0aGlzLmRvbUluZGV4QXJySGFzaDtcbiAgICB2YXIgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgIHZhciBsaXN0TGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICB2YXIgbmV3Q2hpbGQ7XG4gICAgdmFyIHRtcDtcbiAgICB2YXIgbG9vcCA9IHRoaXMuaXNMb29waW5nO1xuICAgIHZhciBub1RyYW5zaXRpb25UaW1lSWQgPSAzO1xuXG5cbiAgICBpZiAodHlwZW9mIG4gIT09IFwic3RyaW5nXCIpIHJldHVybjtcbiAgICBpZiAobiA9PT0gXCIrMVwiKSB7XG4gICAgICAgIGlmICggdGhpcy5pZHghPT0wICYmIHRoaXMuaWR4IT09MiApIHtcbiAgICAgICAgICAgIGlmIChsb29wfHxsaXN0TGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIGlmIChsb29wIHx8ZG9tSW5kZXhBcnJbMV0gIT09IGxpc3RMZW5ndGggLTIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbUluZGV4QXJyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUluZGV4QXJyLnB1c2goKGRvbUluZGV4QXJyWzFdICsgMSkgJSBsaXN0TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhpcy5kb21JbmRleEFyckhhc2guc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZVVzZUxpKHRtcCwxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21JbmRleEFyckhhc2gucHVzaCh0bXApO1xuICAgICAgICAgICAgICAgICAgICBub1RyYW5zaXRpb25UaW1lSWQgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRvbUluZGV4QXJySGFzaCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZHggPSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdExlbmd0aD09MSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkeCA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZHggPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG4gPT09IFwiLTFcIikge1xuICAgICAgICBpZiAoIHRoaXMuaWR4IT09MCAmJiB0aGlzLmlkeCAhPT0yKSB7XG4gICAgICAgICAgICBpZiAobG9vcCB8fCBkb21JbmRleEFyclswXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGRvbUluZGV4QXJyWzBdIC0gMTtcbiAgICAgICAgICAgICAgICB0bXAgPSB0bXAgPCAwID8gbGlzdExlbmd0aCAtIDEgOiB0bXA7XG4gICAgICAgICAgICAgICAgZG9tSW5kZXhBcnIudW5zaGlmdCh0bXApO1xuICAgICAgICAgICAgICAgIGRvbUluZGV4QXJyLmxlbmd0aCA9IDM7XG4gICAgICAgICAgICAgICAgdGhpcy5kb21JbmRleEFyckhhc2gudW5zaGlmdChudWxsKTtcbiAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRvbUluZGV4QXJySGFzaFszXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUluZGV4QXJySGFzaC5sZW5ndGggPSAzO1xuICAgICAgICAgICAgICAgIHRoaXMucmVVc2VMaSh0bXAsLTEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSW5kZXhBcnJIYXNoWzBdID0gdG1wO1xuICAgICAgICAgICAgICAgIG5vVHJhbnNpdGlvblRpbWVJZCA9IDA7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kb21JbmRleEFyckhhc2gpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaWR4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgIGlmICh0aGlzLmlkeCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuaWR4ID0gMTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbUluZGV4QXJySGFzaC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IHRoaXMuaXNWZXJ0aWNsZSA/IDAgOiB0aGlzLnNjYWxlVyAqIChpIC0gdGhpcy5pZHgpO1xuICAgICAgICB2YXIgb2Zmc2V0WSA9IHRoaXMuaXNWZXJ0aWNsZSA/IHRoaXMuc2NhbGVIICogKGkgLSB0aGlzLmlkeCkgOiAwO1xuXG4gICAgICAgIGlmIChpID09PSBub1RyYW5zaXRpb25UaW1lSWQpIHtcbiAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDBzIGVhc2Utb3V0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQnO1xuICAgICAgICB9XG4gICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIG9mZnNldFggKyAncHgsICcrIG9mZnNldFkgKydweCwgMCknO1xuICAgIH1cbiAgICB0aGlzLmluaXRBdXRvUGxheSgpO1xufTtcblxuTVNsaWRlci5wcm90b3R5cGUuYmluZERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHNjYWxlVyA9IHNlbGYuc2NhbGVXO1xuICAgIHZhciBvdXRlciA9IHNlbGYub3V0ZXI7XG4gICAgdmFyIGxlbiA9IHNlbGYuZGF0YS5sZW5ndGg7XG5cbiAgICB2YXIgc3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBzZWxmLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBzZWxmLnN0YXJ0WCA9IGV2dC50b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICBzZWxmLnN0YXJ0WSA9IGV2dC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICBzZWxmLm9mZnNldFggPSBzZWxmLm9mZnNldFkgPSAwO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5ub2RlTmFtZSAhPSAnTEknICYmIHRhcmdldC5ub2RlTmFtZSAhPSAnQk9EWScpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBzZWxmLmNsZWFyQXV0b1BsYXkoKTtcbiAgICB9O1xuXG4gICAgdmFyIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIHNlbGYub2Zmc2V0WCA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gc2VsZi5zdGFydFg7XG4gICAgICAgIHNlbGYub2Zmc2V0WSA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gc2VsZi5zdGFydFk7XG5cbiAgICAgICAgdmFyIGFyckxlbmd0aCA9IHNlbGYuZG9tSW5kZXhBcnJIYXNoLmxlbmd0aDtcbiAgICAgICAgdmFyIGRvbUluZGV4QXJySGFzaCA9IHNlbGYuZG9tSW5kZXhBcnJIYXNoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkb21JbmRleEFyckhhc2hbaV0pIHtcbiAgICAgICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICctd2Via2l0LXRyYW5zZm9ybSAwcyBlYXNlLW91dCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9tSW5kZXhBcnJIYXNoW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYoIXNlbGYuaXNWZXJ0aWNsZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZi5pZHggPT09IDAgJiYgc2VsZi5vZmZzZXRYID4gMCkgfHwgKHNlbGYuaWR4ID09PSAyICYmIHNlbGYub2Zmc2V0WCA8IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyAoKGkgLSBzZWxmLmlkeCkgKiBzZWxmLnNjYWxlVyArIHNlbGYuZGFtcGxpbmdGdW5jdGlvbihzZWxmLm9mZnNldFgpKSArICdweCwgMCwgMCknO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgKChpIC0gc2VsZi5pZHgpICogc2VsZi5zY2FsZVcgKyBzZWxmLm9mZnNldFgpICsgJ3B4LCAwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGYuaWR4ID09PSAwICYmIHNlbGYub2Zmc2V0WSA+IDApIHx8IChzZWxmLmlkeCA9PT0gMiAmJiBzZWxmLm9mZnNldFkgPCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCcgKyAoKGkgLSBzZWxmLmlkeCkgKiBzZWxmLnNjYWxlSCArIHNlbGYuZGFtcGxpbmdGdW5jdGlvbihzZWxmLm9mZnNldFkpKSArICdweCwgMCknO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCcgKyAoKGkgLSBzZWxmLmlkeCkgKiBzZWxmLnNjYWxlSCArIHNlbGYub2Zmc2V0WSkgKyAncHgsIDApJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGVuZEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBib3VuZGFyeSA9IHNlbGYuaXNWZXJ0aWNsZSA/IHNlbGYuc2NhbGVIIC8gNiA6IHNlbGYuc2NhbGVXIC8gNiA7XG4gICAgICAgIHZhciBtZXRyaWMgPSBzZWxmLmlzVmVydGljbGUgPyBzZWxmLm9mZnNldFkgOiBzZWxmLm9mZnNldFg7XG4gICAgICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBsaXMgPSBvdXRlci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKTtcbiAgICAgICAgaWYgKGVuZFRpbWUgLSBzZWxmLnN0YXJ0VGltZSA+IDMwMCkge1xuICAgICAgICAgICAgaWYgKG1ldHJpYyA+PSBib3VuZGFyeSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ29JbmRleCgnLTEnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0cmljIDwgLWJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0luZGV4KCcrMScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvSW5kZXgoJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtZXRyaWMgPiA1MCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ29JbmRleCgnLTEnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0cmljIDwgLTUwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0luZGV4KCcrMScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvSW5kZXgoJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICBzZWxmLnJhdGlvID0gd2luZG93LmlubmVySGVpZ2h0IC8gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgc2VsZi5zY2FsZVcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICBzZWxmLndyYXAuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcbiAgICAgICBzZWxmLm91dGVyLnN0eWxlLndpZHRoID0gc2VsZi5zY2FsZVcgKyAncHgnO1xuICAgICAgIHZhciBkb21JbmRleEFyckhhc2ggPSBzZWxmLmRvbUluZGV4QXJySGFzaDtcbiAgICAgICB2YXIgZG9tSW5kZXhBcnIgPSBzZWxmLmRvbUluZGV4QXJyO1xuICAgICAgIGZvciAodmFyIGkgPSBkb21JbmRleEFyckhhc2gubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndpZHRoID0gc2VsZi5zY2FsZVcgKyAncHgnO1xuICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICctd2Via2l0LXRyYW5zZm9ybSAwcyBlYXNlLW91dCc7XG4gICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIChpLXNlbGYuaWR4KSAqIHNlbGYuc2NhbGVXICsgJ3B4LCAwLCAwKSc7XG4gICAgICAgICAgIGlmIChzZWxmLmxheWVyQ29udGVudCA9PT0gdHJ1ZSkgY29udGludWU7XG4gICAgICAgICAgIHZhciBpbWcgPSBkb21JbmRleEFyckhhc2hbaV0uY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgdmFyIGltZ0RhdGEgPSBzZWxmLmRhdGFbZG9tSW5kZXhBcnJbaV1dO1xuICAgICAgICAgICBjb25zb2xlLmxvZygoaW1nRGF0YS5oZWlnaHQgL2ltZ0RhdGEud2lkdGgpICsgXCIgXCIrIHNlbGYucmF0aW8pO1xuICAgICAgICAgICBpZiAoKGltZ0RhdGEuaGVpZ2h0IC9pbWdEYXRhLndpZHRoKSA+IHNlbGYucmF0aW8pIHtcbiAgICAgICAgICAgICAgICBpbWcuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoXCJ3aWR0aFwiKTtcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbWcud2lkdGggPSBzZWxmLnNjYWxlVztcbiAgICAgICAgICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKFwiaGVpZ2h0XCIpO1xuICAgICAgICAgICB9XG5cbiAgICAgICB9XG4gICAgfTtcbiAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc3RhcnRIYW5kbGVyKTtcbiAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3ZlSGFuZGxlcik7XG4gICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlbmRIYW5kbGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBNU2xpZGVyO1xuIl19
