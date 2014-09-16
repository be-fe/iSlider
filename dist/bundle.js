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
    imgPrefix: "imgs/",
    imgSubfix: ".jpg",
    layerContent: false,
    //or true default false
    //autoPlay: 1000,
    //or false default false
    isVerticle: true,
    //loop: true,
    //or true default false
    dom: document.getElementById("canvas"),
    data: list,
    onBeforeSlide: function (nowIndex, dataArr) {

    },
    onAfterSlide: function (nowIndex, dataArr) {

    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYmF0eXFpL0RvY3VtZW50cy9Db2RlL01TbGlkZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4vanMvYXBwLmpzIiwiL1VzZXJzL3FiYXR5cWkvRG9jdW1lbnRzL0NvZGUvTVNsaWRlci9qcy9tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNU2xpZGVyID0gcmVxdWlyZSgnLi9tc2xpZGVyJyk7XG52YXIgbGlzdCA9IFt7XG5cdFx0aGVpZ2h0OiA0NzUsXG5cdFx0d2lkdGg6IDQwMCxcblx0XHRjb250ZW50OiBcImltZ3MvMS5qcGdcIixcblx0fSx7XG5cdFx0aGVpZ2h0OiA1MjcsXG5cdFx0d2lkdGg6IDQwMCxcblx0XHRjb250ZW50OiBcImltZ3MvMi5qcGdcIixcblx0fSx7XG5cdCBcdGhlaWdodDogNDAwLFxuXHQgXHR3aWR0aDogNTEyLFxuXHQgXHRjb250ZW50OiBcImltZ3MvMy5qcGdcIixcblx0fSx7XG5cdFx0aGVpZ2h0OiA0MDAsXG5cdFx0d2lkdGg6IDQ1OCxcblx0XHRjb250ZW50OlwiaW1ncy81LmpwZ1wiXG5cdH0se1xuXHRcdGhlaWdodDogNDAwLFxuXHRcdHdpZHRoOiA0OTgsXG5cdFx0Y29udGVudDpcImltZ3MvNi5qcGdcIlxuXHR9LHtcblx0XHRoZWlnaHQ6IDM3Nyxcblx0XHR3aWR0aDogNjAwLFxuXHRcdGNvbnRlbnQ6XCJpbWdzLzcuanBnXCJcblx0fSx7XG5cdFx0aGVpZ2h0OiAzOTYsXG5cdFx0d2lkdGg6IDYwMCxcblx0XHRjb250ZW50OlwiaW1ncy84LmpwZ1wiXG5cdH0se1xuXHRcdGhlaWdodDogMzc0LFxuXHRcdHdpZHRoOiA2MDAsXG5cdFx0Y29udGVudDpcImltZ3MvOS5qcGdcIlxuXHR9XTtcbm5ldyBNU2xpZGVyKHtcbiAgICBpbWdQcmVmaXg6IFwiaW1ncy9cIixcbiAgICBpbWdTdWJmaXg6IFwiLmpwZ1wiLFxuICAgIGxheWVyQ29udGVudDogZmFsc2UsXG4gICAgLy9vciB0cnVlIGRlZmF1bHQgZmFsc2VcbiAgICAvL2F1dG9QbGF5OiAxMDAwLFxuICAgIC8vb3IgZmFsc2UgZGVmYXVsdCBmYWxzZVxuICAgIGlzVmVydGljbGU6IHRydWUsXG4gICAgLy9sb29wOiB0cnVlLFxuICAgIC8vb3IgdHJ1ZSBkZWZhdWx0IGZhbHNlXG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSxcbiAgICBkYXRhOiBsaXN0LFxuICAgIG9uQmVmb3JlU2xpZGU6IGZ1bmN0aW9uIChub3dJbmRleCwgZGF0YUFycikge1xuXG4gICAgfSxcbiAgICBvbkFmdGVyU2xpZGU6IGZ1bmN0aW9uIChub3dJbmRleCwgZGF0YUFycikge1xuXG4gICAgfSxcbn0pO1xuIiwiLyoqXG4gKiBNU2xpZGVyIG1haW4gbWV0aG9kXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIOWPguaVsOmbhlxuICogQHBhcmFtIHtFbGVtZW50fSBvcHRzLmRvbSDlpJblsYLlhYPntKAgXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cy5kYXRhIOaVsOaNruWIl+ihqFxuICpcbiAqIEBjbGFzcyBcbiAqL1xudmFyIE1TbGlkZXIgPSBmdW5jdGlvbihvcHRzKSB7XG4gICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkb20gZWxlbWVudCBjYW4gbm90IGJlIGVtcHR5IVwiKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMuZGF0YSB8fCAhb3B0cy5kYXRhLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIG11c3QgYmUgYW4gYXJyYXkgYW5kIG11c3QgaGF2ZSBtb3JlIHRoYW4gb25lIGVsZW1lbnQhXCIpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdChvcHRzKTtcbiAgICB0aGlzLnJlbmRlckhUTUwoKTtcbiAgICB0aGlzLmJpbmRET00oKTtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0cykge1xuXG4gICAgdGhpcy53cmFwID0gb3B0cy5kb207XG4gICAgdGhpcy5kYXRhID0gb3B0cy5kYXRhO1xuICAgIHRoaXMuc2NhbGVXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5zY2FsZUggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdGhpcy5yYXRpbyA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuaXNWZXJ0aWNsZSA9IG9wdHMuaXNWZXJ0aWNsZSB8fCBmYWxzZTtcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQXV0b1BsYXkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IG9wdHMuaXNMb29waW5nIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQXV0b1BsYXkgPSBvcHRzLmlzQXV0b1BsYXkgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5pc1ZlcnRpY2xlID0gb3B0cy5pc1ZlcnRpY2xlO1xuICAgIHRoaXMudHlwZSA9IG9wdHMudHlwZSB8fCAncGljJztcblxuICAgIHRoaXMuaW5pdERvbUluZGV4KCk7XG4gICAgdGhpcy5pbml0QXV0b1BsYXkoKTtcbiAgICB0aGlzLmRhbXBsaW5nRnVuY3Rpb24gPSB0aGlzLmluaXREYW1waW5nRnVuY3Rpb24odGhpcy5zY2FsZVcpO1xufTtcblxuLyoqXG4gKiAg5Yip55So5bGP5bmV55qE5YWo6YOo5ruR5Yqo6Led56a75p2l6L+b6KGM5Yid5aeL5YyW77yMXG4gKiAg6L+U5Zue5LiA5Liq6K6h566X6Zi75bC855qE5Ye95pWw44CCXG4gKiAg55Sx5LqOZGFtcGxpbmfmlYjlupTlnKjmu5Hliqjml7bop6blj5HvvIzkuLrkuoblsL3ph4/kvJjljJbmgKfog73liKnnlKjpl63ljIXov5vooYzmgKfog73kvJjljJbjgIIgIFxuICovXG5NU2xpZGVyLnByb3RvdHlwZS5pbml0RGFtcGluZ0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZ1bGxEaXN0YW5jZSkge1xuICAgIHZhciBoYWxmT2ZGdWxsID0gZnVsbERpc3RhbmNlID4+IDE7XG4gICAgdmFyIG9uZUZvdXJPZkZ1bGwgPSBoYWxmT2ZGdWxsID4+IDE7XG4gICAgdmFyIG9uZUVpZ2h0T2ZGdWxsID0gb25lRm91ck9mRnVsbCA+PiAxO1xuICAgIHZhciB0aHJlZUZvdXJPZkZ1bGwgPSBoYWxmT2ZGdWxsICsgb25lRm91ck9mRnVsbDtcbiAgICB2YXIgZml2ZVNpeHRlZW5PZkZ1bGwgPSBvbmVGb3VyT2ZGdWxsICsgKG9uZUVpZ2h0T2ZGdWxsID4+IDEpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbmVnYXRpdmU7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgICAgICAgIGRpc3RhbmNlID0gLWRpc3RhbmNlO1xuICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IGhhbGZPZkZ1bGwpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGRpc3RhbmNlID4+IDE7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGRpc3RhbmNlIDwgdGhyZWVGb3VyT2ZGdWxsKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBvbmVGb3VyT2ZGdWxsICsgKGRpc3RhbmNlIC0gaGFsZk9mRnVsbCA+PiAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZpdmVTaXh0ZWVuT2ZGdWxsICsgKGRpc3RhbmNlIC0gdGhyZWVGb3VyT2ZGdWxsID4+IDMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWdhdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIC1yZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8qKlxuICogICDliJ3lp4vljJYgZG9tSW5kZXhBcnIg5YW25Lit5a2Y5pS+55qE5pivIGRvbSDkuK3lhYPntKDlnKggZGF0YSDkuK3nmoTntKLlvJXlgLzjgIJcbiAqICAg5YW25pyA5aSn6ZW/5bqm5Li6M+OAgmxvb3Dml7bplb/luqbkuIDlrprkuLoz44CCXG4gKiAgIOS4jWxvb3Dml7Ys5aaC5p6cZGF0YemVv+W6puWwj+S6jjMg5YiZ6ZW/5bqm5Li6IGRhdGEg6ZW/5bqmLCDlkKbliJnplb/luqbkuLoz44CCXG4gKiAgIGlkeCDlgLzooajnpLrop4blj6Plr7nlh4bnmoTpobnnm65cbiAqL1xuTVNsaWRlci5wcm90b3R5cGUuaW5pdERvbUluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkb21JbmRleEFyciA9IFtdO1xuICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgdmFyIGxvb3BMZW5ndGggPSBNYXRoLm1pbigzLCB0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb29wTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRvbUluZGV4QXJyW2ldID0gaTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlkeCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9tSW5kZXhBcnJbMF0gPSBkYXRhTGVuZ3RoIC0gMTtcbiAgICAgICAgZG9tSW5kZXhBcnJbMV0gPSAwO1xuICAgICAgICBkb21JbmRleEFyclsyXSA9IDE7XG4gICAgICAgIHRoaXMuaWR4ID0gMTtcbiAgICB9XG4gICAgdGhpcy5kb21JbmRleEFyciA9IGRvbUluZGV4QXJyO1xufTtcblxuTVNsaWRlci5wcm90b3R5cGUuaW5pdEF1dG9QbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc0F1dG9QbGF5KXsgcmV0dXJuOyB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuYXV0b1BsYXlUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZ29JbmRleCgnKzEnKTtcbiAgICB9LCB0aGlzLmlzQXV0b1BsYXkpO1xufTtcblxuTVNsaWRlci5wcm90b3R5cGUuY2xlYXJBdXRvUGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hdXRvUGxheVRpbWVvdXQpO1xufTtcblxuLypcbiAgICDliJ3lp4vljJZ1bOWIl+ihqOS4reeahGxp55qE5pe25YCZ5L2/55SoaeaYr2xp55qEaW5kZXjjgIJcbiovXG5NU2xpZGVyLnByb3RvdHlwZS5jcmVhdGVMaSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB2YXIgaXRlbSA9IHRoaXMuZGF0YVt0aGlzLmRvbUluZGV4QXJyW2ldXTtcbiAgICB2YXIgb2Zmc2V0WCA9ICF0aGlzLmlzVmVydGljbGUgPyAwIDogdGhpcy5zY2FsZVcgKiAoaSAtIHRoaXMuaWR4KTtcbiAgICB2YXIgb2Zmc2V0WSA9IHRoaXMuaXNWZXJ0aWNsZSA/IDAgOiB0aGlzLnNjYWxlSCAqIChpIC0gdGhpcy5pZHgpO1xuXG4gICAgbGkuc3R5bGUud2lkdGggPSB0aGlzLnNjYWxlVyArICdweCc7XG4gICAgbGkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zY2FsZUggKyAncHgnO1xuICAgIGxpLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0WCArICdweCwgJyArIG9mZnNldFkgKyAncHgsIDApJztcblxuICAgIGlmICh0aGlzLmlzTGF5ZXJDb250ZW50KSB7XG4gICAgICAgIGxpLmlubmVySFRNTCA9ICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OicgKyBpdGVtLmhlaWdodCArICclO3dpZHRoOicgKyBpdGVtLndpZHRoICsgJyU7XCI+JyArIGl0ZW0uY29udGVudCArICc8L2Rpdj4nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggPiB0aGlzLnJhdGlvKSB7XG4gICAgICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGltZyBoZWlnaHQ9XCInICsgd2luZG93LmlubmVySGVpZ2h0ICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpLmlubmVySFRNTCA9ICc8aW1nIHdpZHRoPVwiJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+JztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGk7XG59O1xuXG4vKlxuICAgIOmHjeeUqHVs5LitbGnnmoTlhoXlrrnmm7TmjaLlhoXlrrnjgIJcbiovXG5NU2xpZGVyLnByb3RvdHlwZS5yZVVzZUxpID0gZnVuY3Rpb24gKGxpLG5lZ09yUG9zT25lKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdmFyIGRvbUluZGV4QXJyID0gdGhpcy5kb21JbmRleEFycjtcbiAgICB2YXIgaXRlbSA9IG5lZ09yUG9zT25lID09PSAtMSA/IGRhdGFbZG9tSW5kZXhBcnJbMF1dIDogZGF0YVtkb21JbmRleEFyclsyXV07XG4gICAgaWYgKHRoaXMuaXNMYXllckNvbnRlbnQpIHtcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gJzxkaXYgc3R5bGU9XCJoZWlnaHQ6JyArIGl0ZW0uaGVpZ2h0ICsgJyU7d2lkdGg6JyArIGl0ZW0ud2lkdGggKyAnJTtcIj4nICsgaXRlbS5jb250ZW50ICsgJzwvZGl2Pic7XG4gICAgfSBcbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGl0ZW0uaGVpZ2h0IC8gaXRlbS53aWR0aCA+IHRoaXMucmF0aW8pIHtcbiAgICAgICAgICAgIGxpLmlubmVySFRNTCA9ICc8aW1nIGhlaWdodD1cIicgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKyAnXCIgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIj4nO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxpLmlubmVySFRNTCA9ICc8aW1nIHdpZHRoPVwiJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+JztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qXG4gICAg5riy5p+TZG9tXG4qL1xuTVNsaWRlci5wcm90b3R5cGUucmVuZGVySFRNTCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgd3JhcCA9IHRoaXMud3JhcDtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICB2YXIgZG9tSW5kZXhBcnIgPSB0aGlzLmRvbUluZGV4QXJyO1xuICAgIHZhciBkb21JbmRleEFyckxlbmd0aCA9IGRvbUluZGV4QXJyLmxlbmd0aDtcbiAgICB0aGlzLmRvbUluZGV4QXJySGFzaCA9IFtdO1xuICAgIHRoaXMub3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tSW5kZXhBcnJMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGkgPSB0aGlzLmNyZWF0ZUxpKGkpO1xuICAgICAgICB0aGlzLm91dGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgdGhpcy5kb21JbmRleEFyckhhc2hbaV0gPSBsaTtcbiAgICB9XG4gICAgdGhpcy5vdXRlci5zdHlsZS53aWR0aCA9IHRoaXMuc2NhbGVXICsgJ3B4JztcbiAgICB3cmFwLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XG4gICAgd3JhcC5hcHBlbmRDaGlsZCh0aGlzLm91dGVyKTtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLmdvSW5kZXggPSBmdW5jdGlvbiAobikge1xuICAgIHZhciBkb21JbmRleEFyciA9IHRoaXMuZG9tSW5kZXhBcnI7XG4gICAgdmFyIGRvbUluZGV4QXJySGFzaCA9IHRoaXMuZG9tSW5kZXhBcnJIYXNoO1xuICAgIHZhciBvdXRlciA9IHRoaXMub3V0ZXI7XG4gICAgdmFyIGxpc3RMZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIHZhciBuZXdDaGlsZDtcbiAgICB2YXIgdG1wO1xuICAgIHZhciBsb29wID0gdGhpcy5pc0xvb3Bpbmc7XG4gICAgdmFyIG5vVHJhbnNpdGlvblRpbWVJZCA9IDM7XG5cblxuICAgIGlmICh0eXBlb2YgbiAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xuICAgIGlmIChuID09PSBcIisxXCIpIHtcbiAgICAgICAgaWYgKCB0aGlzLmlkeCE9PTAgJiYgdGhpcy5pZHghPT0yICkge1xuICAgICAgICAgICAgaWYgKGxvb3B8fGxpc3RMZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvb3AgfHxkb21JbmRleEFyclsxXSAhPT0gbGlzdExlbmd0aCAtMiApIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnIucHVzaCgoZG9tSW5kZXhBcnJbMV0gKyAxKSAlIGxpc3RMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSB0aGlzLmRvbUluZGV4QXJySGFzaC5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlVXNlTGkodG1wLDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUluZGV4QXJySGFzaC5wdXNoKHRtcCk7XG4gICAgICAgICAgICAgICAgICAgIG5vVHJhbnNpdGlvblRpbWVJZCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZG9tSW5kZXhBcnJIYXNoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkeCA9IDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkeCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0TGVuZ3RoPT0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkeCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAobiA9PT0gXCItMVwiKSB7XG4gICAgICAgIGlmICggdGhpcy5pZHghPT0wICYmIHRoaXMuaWR4ICE9PTIpIHtcbiAgICAgICAgICAgIGlmIChsb29wIHx8IGRvbUluZGV4QXJyWzBdICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gZG9tSW5kZXhBcnJbMF0gLSAxO1xuICAgICAgICAgICAgICAgIHRtcCA9IHRtcCA8IDAgPyBsaXN0TGVuZ3RoIC0gMSA6IHRtcDtcbiAgICAgICAgICAgICAgICBkb21JbmRleEFyci51bnNoaWZ0KHRtcCk7XG4gICAgICAgICAgICAgICAgZG9tSW5kZXhBcnIubGVuZ3RoID0gMztcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUluZGV4QXJySGFzaC51bnNoaWZ0KG51bGwpO1xuICAgICAgICAgICAgICAgIHRtcCA9IHRoaXMuZG9tSW5kZXhBcnJIYXNoWzNdO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSW5kZXhBcnJIYXNoLmxlbmd0aCA9IDM7XG4gICAgICAgICAgICAgICAgdGhpcy5yZVVzZUxpKHRtcCwtMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb21JbmRleEFyckhhc2hbMF0gPSB0bXA7XG4gICAgICAgICAgICAgICAgbm9UcmFuc2l0aW9uVGltZUlkID0gMDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRvbUluZGV4QXJySGFzaCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZHggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgaWYgKHRoaXMuaWR4ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZHggPSAxO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tSW5kZXhBcnJIYXNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvZmZzZXRYID0gdGhpcy5pc1ZlcnRpY2xlID8gMCA6IHRoaXMuc2NhbGVXICogKGkgLSB0aGlzLmlkeCk7XG4gICAgICAgIHZhciBvZmZzZXRZID0gdGhpcy5pc1ZlcnRpY2xlID8gdGhpcy5zY2FsZUggKiAoaSAtIHRoaXMuaWR4KSA6IDA7XG5cbiAgICAgICAgaWYgKGkgPT09IG5vVHJhbnNpdGlvblRpbWVJZCkge1xuICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnLXdlYmtpdC10cmFuc2Zvcm0gMHMgZWFzZS1vdXQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCc7XG4gICAgICAgIH1cbiAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgb2Zmc2V0WCArICdweCwgJysgb2Zmc2V0WSArJ3B4LCAwKSc7XG4gICAgfVxuICAgIHRoaXMuaW5pdEF1dG9QbGF5KCk7XG59O1xuXG5NU2xpZGVyLnByb3RvdHlwZS5iaW5kRE9NID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgc2NhbGVXID0gc2VsZi5zY2FsZVc7XG4gICAgdmFyIG91dGVyID0gc2VsZi5vdXRlcjtcbiAgICB2YXIgbGVuID0gc2VsZi5kYXRhLmxlbmd0aDtcblxuICAgIHZhciBzdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHNlbGYuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHNlbGYuc3RhcnRYID0gZXZ0LnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgIHNlbGYuc3RhcnRZID0gZXZ0LnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgIHNlbGYub2Zmc2V0WCA9IHNlbGYub2Zmc2V0WSA9IDA7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9ICdCT0RZJykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHNlbGYuY2xlYXJBdXRvUGxheSgpO1xuICAgIH07XG5cbiAgICB2YXIgbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgc2VsZi5vZmZzZXRYID0gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBzZWxmLnN0YXJ0WDtcbiAgICAgICAgc2VsZi5vZmZzZXRZID0gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBzZWxmLnN0YXJ0WTtcblxuICAgICAgICB2YXIgYXJyTGVuZ3RoID0gc2VsZi5kb21JbmRleEFyckhhc2gubGVuZ3RoO1xuICAgICAgICB2YXIgZG9tSW5kZXhBcnJIYXNoID0gc2VsZi5kb21JbmRleEFyckhhc2g7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRvbUluZGV4QXJySGFzaFtpXSkge1xuICAgICAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDBzIGVhc2Utb3V0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb21JbmRleEFyckhhc2hbaV0pIHtcbiAgICAgICAgICAgICAgICBpZighc2VsZi5pc1ZlcnRpY2xlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzZWxmLmlkeCA9PT0gMCAmJiBzZWxmLm9mZnNldFggPiAwKSB8fCAoc2VsZi5pZHggPT09IDIgJiYgc2VsZi5vZmZzZXRYIDwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArICgoaSAtIHNlbGYuaWR4KSAqIHNlbGYuc2NhbGVXICsgc2VsZi5kYW1wbGluZ0Z1bmN0aW9uKHNlbGYub2Zmc2V0WCkpICsgJ3B4LCAwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyAoKGkgLSBzZWxmLmlkeCkgKiBzZWxmLnNjYWxlVyArIHNlbGYub2Zmc2V0WCkgKyAncHgsIDAsIDApJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZi5pZHggPT09IDAgJiYgc2VsZi5vZmZzZXRZID4gMCkgfHwgKHNlbGYuaWR4ID09PSAyICYmIHNlbGYub2Zmc2V0WSA8IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsJyArICgoaSAtIHNlbGYuaWR4KSAqIHNlbGYuc2NhbGVIICsgc2VsZi5kYW1wbGluZ0Z1bmN0aW9uKHNlbGYub2Zmc2V0WSkpICsgJ3B4LCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsJyArICgoaSAtIHNlbGYuaWR4KSAqIHNlbGYuc2NhbGVIICsgc2VsZi5vZmZzZXRZKSArICdweCwgMCknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgZW5kSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGJvdW5kYXJ5ID0gc2VsZi5pc1ZlcnRpY2xlID8gc2VsZi5zY2FsZUggLyA2IDogc2VsZi5zY2FsZVcgLyA2IDtcbiAgICAgICAgdmFyIG1ldHJpYyA9IHNlbGYuaXNWZXJ0aWNsZSA/IHNlbGYub2Zmc2V0WSA6IHNlbGYub2Zmc2V0WDtcbiAgICAgICAgdmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGxpcyA9IG91dGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpO1xuICAgICAgICBpZiAoZW5kVGltZSAtIHNlbGYuc3RhcnRUaW1lID4gMzAwKSB7XG4gICAgICAgICAgICBpZiAobWV0cmljID49IGJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0luZGV4KCctMScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRyaWMgPCAtYm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvSW5kZXgoJysxJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZ29JbmRleCgnMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1ldHJpYyA+IDUwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0luZGV4KCctMScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRyaWMgPCAtNTApIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvSW5kZXgoJysxJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZ29JbmRleCgnMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZXNpemVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgIHNlbGYucmF0aW8gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICBzZWxmLnNjYWxlVyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgIHNlbGYud3JhcC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuICAgICAgIHNlbGYub3V0ZXIuc3R5bGUud2lkdGggPSBzZWxmLnNjYWxlVyArICdweCc7XG4gICAgICAgdmFyIGRvbUluZGV4QXJySGFzaCA9IHNlbGYuZG9tSW5kZXhBcnJIYXNoO1xuICAgICAgIHZhciBkb21JbmRleEFyciA9IHNlbGYuZG9tSW5kZXhBcnI7XG4gICAgICAgZm9yICh2YXIgaSA9IGRvbUluZGV4QXJySGFzaC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2lkdGggPSBzZWxmLnNjYWxlVyArICdweCc7XG4gICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDBzIGVhc2Utb3V0JztcbiAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgKGktc2VsZi5pZHgpICogc2VsZi5zY2FsZVcgKyAncHgsIDAsIDApJztcbiAgICAgICAgICAgaWYgKHNlbGYubGF5ZXJDb250ZW50ID09PSB0cnVlKSBjb250aW51ZTtcbiAgICAgICAgICAgdmFyIGltZyA9IGRvbUluZGV4QXJySGFzaFtpXS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICB2YXIgaW1nRGF0YSA9IHNlbGYuZGF0YVtkb21JbmRleEFycltpXV07XG4gICAgICAgICAgIGNvbnNvbGUubG9nKChpbWdEYXRhLmhlaWdodCAvaW1nRGF0YS53aWR0aCkgKyBcIiBcIisgc2VsZi5yYXRpbyk7XG4gICAgICAgICAgIGlmICgoaW1nRGF0YS5oZWlnaHQgL2ltZ0RhdGEud2lkdGgpID4gc2VsZi5yYXRpbykge1xuICAgICAgICAgICAgICAgIGltZy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZShcIndpZHRoXCIpO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGltZy53aWR0aCA9IHNlbGYuc2NhbGVXO1xuICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoXCJoZWlnaHRcIik7XG4gICAgICAgICAgIH1cblxuICAgICAgIH1cbiAgICB9O1xuICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzdGFydEhhbmRsZXIpO1xuICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdmVIYW5kbGVyKTtcbiAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGVuZEhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1TbGlkZXI7XG4iXX0=
