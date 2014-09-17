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
    data: list,
    dom: document.getElementById("canvas"),
    isVerticle: true
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
var MSlider = function (opts) {
    if (!opts.dom) {
        throw new Error("dom element can not be empty!");
    }

    if (!opts.data || !opts.data.length) {
        throw new Error("data must be an array and must have more than one element!");
    }

    this._setting(opts);
    this._renderHTML();
    this._bindDOM();
};

MSlider.prototype._setting = function (opts) {
    this.wrap = opts.dom;
    this.data = opts.data;
    this.type = opts.type || 'pic';
    this.isVerticle = opts.isVerticle || false;

    this.height = this.wrap.clientHeight;
    this.width = this.wrap.clientWidth;

    this.ratio = this.height / this.width;
    this.scale = opts.isVerticle ? this.height : this.width;

    this.picIdx = this.picIdx || 0;

    if (this.data.length < 2) {
        this.isLooping = false;
        this.isAutoPlay = false;
    } else {
        this.isLooping = opts.isLooping || false;
        this.isAutoPlay = opts.isAutoPlay || false;
    }

    if (this.isAutoPlay) {
        this.play(500);
    }

    this._setUpDamping();
};

//缓动函数
MSlider.prototype._setUpDamping = function () {
    var oneIn2 = this.scale >> 1;
    var oneIn4 = oneIn2 >> 1;
    var ontIn16 = oneIn4 >> 2;

    this._damping = function (distance) {
        var dis = oneIn2 - Math.abs(distance) ;

        if (dis > 0 ) {
            return distance >> 1;
        } else if (dis > oneIn4) {
            return distance < 0 ? -(oneIn4 + (dis >> 2)) : oneIn4 + (dis >> 2);
        } else {
            return distance < 0 ? -(ontIn16 + (dis >> 2)) : ontIn16 + (dis >> 2);
        }
    };
};

//自动播放
MSlider.prototype.play = function (duration) {
    var self = this;
    this.autoPlayTimer = setTimeout(function () {
        self.goIndex('+1');
    }, duration);
};

//暂停自动播放
MSlider.prototype.pause = function () {
    clearTimeout(this.autoPlayTimer);
};

MSlider.prototype._getItem = function (n) {
    var item;
    var len = this.data.length; 

    if (!this.isLooping) {
        return this.data[n] || { empty : true };
    } else {
        if (n < 0) {
            return this.data[len - 1];
        } else if (n > len - 1) {
            return this.data[0];
        }
    }
};

MSlider.prototype._renderHTML = function () {
    var outer = document.createElement('ul');
    outer.style.width = this.width + 'px';
    outer.style.height = this.height + 'px';

    var idx = this.picIdx;
    var axis = this.isVerticle ? 'translateY' : 'translateX';

    for (var i = -1; i < 2; i++) {
        var li = document.createElement('li');
        li.style.width = this.width + 'px';
        li.style.height = this.height + 'px';
        li.style.webkitTransform = 'translateZ(0) ' + axis + '(' + this.scale * i + 'px)';

        var item = this._getItem(i + this.picIdx);
        if (item.empty) {
            li.style.display = 'none';
            continue;
        }

        if (this.type === 'pic') {
            li.innerHTML = item.height / item.width > this.ratio 
            ? '<img height="' + window.innerHeight + '" src="' + item.content + '">'
            : '<img width="' + window.innerWidth + '" src="' + item.content + '">';
        } else if (this.type === 'dom') {
            li.innerHTML = '<div style="height:' + item.height + ';width:' + item.width + ';">' + item.content + '</div>';
        }
    }

    wrap.appendChild(outer);
    this.outer = outer;
};

MSlider.prototype._replaceItem = function () {
    var data = this.data;
    var item = negOrPosOne === -1 ? data[domIndexArr[0]] : data[domIndexArr[2]];

    //to-do li display
    if (this.type === 'dom') {
        li.innerHTML = '<div style="height:' + item.height + '%;width:' + item.width + '%;">' + item.content + '</div>';
    } else {
        if (item.height / item.width > this.ratio) {
            li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item.content + '">';
        } else {
            li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item.content + '">';
        }
    }
};

MSlider.prototype.slide = function (n) {
    var outer = this.outer;
    var len = this.data.length;

    if (n > 0) {
        
    } else if (n === "-1") {
        
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
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * self.scaleW + self._damping(self.offsetX)) + 'px, 0, 0)';
                    } else {
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * self.scaleW + self.offsetX) + 'px, 0, 0)';
                    }
                } else {
                    if ((self.idx === 0 && self.offsetY > 0) || (self.idx === 2 && self.offsetY < 0)) {
                        domIndexArrHash[i].style.webkitTransform = 'translate3d(0,' + ((i - self.idx) * self.scaleH + self._damping(self.offsetY)) + 'px, 0)';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYmF0eXFpL0RvY3VtZW50cy9Db2RlL01TbGlkZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4vanMvYXBwLmpzIiwiL1VzZXJzL3FiYXR5cWkvRG9jdW1lbnRzL0NvZGUvTVNsaWRlci9qcy9tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNU2xpZGVyID0gcmVxdWlyZSgnLi9tc2xpZGVyJyk7XG52YXIgbGlzdCA9IFt7XG5cdGhlaWdodDogNDc1LFxuXHR3aWR0aDogNDAwLFxuXHRjb250ZW50OiBcImltZ3MvMS5qcGdcIixcbn0se1xuXHRoZWlnaHQ6IDUyNyxcblx0d2lkdGg6IDQwMCxcblx0Y29udGVudDogXCJpbWdzLzIuanBnXCIsXG59LHtcbiBcdGhlaWdodDogNDAwLFxuIFx0d2lkdGg6IDUxMixcbiBcdGNvbnRlbnQ6IFwiaW1ncy8zLmpwZ1wiLFxufSx7XG5cdGhlaWdodDogNDAwLFxuXHR3aWR0aDogNDU4LFxuXHRjb250ZW50OlwiaW1ncy81LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiA0MDAsXG5cdHdpZHRoOiA0OTgsXG5cdGNvbnRlbnQ6XCJpbWdzLzYuanBnXCJcbn0se1xuXHRoZWlnaHQ6IDM3Nyxcblx0d2lkdGg6IDYwMCxcblx0Y29udGVudDpcImltZ3MvNy5qcGdcIlxufSx7XG5cdGhlaWdodDogMzk2LFxuXHR3aWR0aDogNjAwLFxuXHRjb250ZW50OlwiaW1ncy84LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiAzNzQsXG5cdHdpZHRoOiA2MDAsXG5cdGNvbnRlbnQ6XCJpbWdzLzkuanBnXCJcbn1dO1xuXHRcbm5ldyBNU2xpZGVyKHtcbiAgICBkYXRhOiBsaXN0LFxuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIiksXG4gICAgaXNWZXJ0aWNsZTogdHJ1ZVxufSk7XG4iLCIvKipcbiAqIE1TbGlkZXIgbWFpbiBtZXRob2RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMg5Y+C5pWw6ZuGXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG9wdHMuZG9tIOWkluWxguWFg+e0oCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLmRhdGEg5pWw5o2u5YiX6KGoXG4gKlxuICogQGNsYXNzIFxuICovXG52YXIgTVNsaWRlciA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkb20gZWxlbWVudCBjYW4gbm90IGJlIGVtcHR5IVwiKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMuZGF0YSB8fCAhb3B0cy5kYXRhLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIG11c3QgYmUgYW4gYXJyYXkgYW5kIG11c3QgaGF2ZSBtb3JlIHRoYW4gb25lIGVsZW1lbnQhXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX3NldHRpbmcob3B0cyk7XG4gICAgdGhpcy5fcmVuZGVySFRNTCgpO1xuICAgIHRoaXMuX2JpbmRET00oKTtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLl9zZXR0aW5nID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcbiAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG4gICAgdGhpcy50eXBlID0gb3B0cy50eXBlIHx8ICdwaWMnO1xuICAgIHRoaXMuaXNWZXJ0aWNsZSA9IG9wdHMuaXNWZXJ0aWNsZSB8fCBmYWxzZTtcblxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53cmFwLmNsaWVudEhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuXG4gICAgdGhpcy5yYXRpbyA9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcbiAgICB0aGlzLnNjYWxlID0gb3B0cy5pc1ZlcnRpY2xlID8gdGhpcy5oZWlnaHQgOiB0aGlzLndpZHRoO1xuXG4gICAgdGhpcy5waWNJZHggPSB0aGlzLnBpY0lkeCB8fCAwO1xuXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMuaXNMb29waW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNBdXRvUGxheSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNMb29waW5nID0gb3B0cy5pc0xvb3BpbmcgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuaXNBdXRvUGxheSA9IG9wdHMuaXNBdXRvUGxheSB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0F1dG9QbGF5KSB7XG4gICAgICAgIHRoaXMucGxheSg1MDApO1xuICAgIH1cblxuICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xufTtcblxuLy/nvJPliqjlh73mlbBcbk1TbGlkZXIucHJvdG90eXBlLl9zZXRVcERhbXBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9uZUluMiA9IHRoaXMuc2NhbGUgPj4gMTtcbiAgICB2YXIgb25lSW40ID0gb25lSW4yID4+IDE7XG4gICAgdmFyIG9udEluMTYgPSBvbmVJbjQgPj4gMjtcblxuICAgIHRoaXMuX2RhbXBpbmcgPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIGRpcyA9IG9uZUluMiAtIE1hdGguYWJzKGRpc3RhbmNlKSA7XG5cbiAgICAgICAgaWYgKGRpcyA+IDAgKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2UgPj4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXMgPiBvbmVJbjQpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA8IDAgPyAtKG9uZUluNCArIChkaXMgPj4gMikpIDogb25lSW40ICsgKGRpcyA+PiAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA8IDAgPyAtKG9udEluMTYgKyAoZGlzID4+IDIpKSA6IG9udEluMTYgKyAoZGlzID4+IDIpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8v6Ieq5Yqo5pKt5pS+XG5NU2xpZGVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuYXV0b1BsYXlUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmdvSW5kZXgoJysxJyk7XG4gICAgfSwgZHVyYXRpb24pO1xufTtcblxuLy/mmoLlgZzoh6rliqjmkq3mlL5cbk1TbGlkZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmF1dG9QbGF5VGltZXIpO1xufTtcblxuTVNsaWRlci5wcm90b3R5cGUuX2dldEl0ZW0gPSBmdW5jdGlvbiAobikge1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoOyBcblxuICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtuXSB8fCB7IGVtcHR5IDogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtsZW4gLSAxXTtcbiAgICAgICAgfSBlbHNlIGlmIChuID4gbGVuIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVswXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLl9yZW5kZXJIVE1MID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcbiAgICBvdXRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG5cbiAgICB2YXIgaWR4ID0gdGhpcy5waWNJZHg7XG4gICAgdmFyIGF4aXMgPSB0aGlzLmlzVmVydGljbGUgPyAndHJhbnNsYXRlWScgOiAndHJhbnNsYXRlWCc7XG5cbiAgICBmb3IgKHZhciBpID0gLTE7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcbiAgICAgICAgbGkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuICAgICAgICBsaS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSAnICsgYXhpcyArICcoJyArIHRoaXMuc2NhbGUgKiBpICsgJ3B4KSc7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9nZXRJdGVtKGkgKyB0aGlzLnBpY0lkeCk7XG4gICAgICAgIGlmIChpdGVtLmVtcHR5KSB7XG4gICAgICAgICAgICBsaS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncGljJykge1xuICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbyBcbiAgICAgICAgICAgID8gJzxpbWcgaGVpZ2h0PVwiJyArIHdpbmRvdy5pbm5lckhlaWdodCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPidcbiAgICAgICAgICAgIDogJzxpbWcgd2lkdGg9XCInICsgd2luZG93LmlubmVyV2lkdGggKyAnXCIgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIj4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2RvbScpIHtcbiAgICAgICAgICAgIGxpLmlubmVySFRNTCA9ICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OicgKyBpdGVtLmhlaWdodCArICc7d2lkdGg6JyArIGl0ZW0ud2lkdGggKyAnO1wiPicgKyBpdGVtLmNvbnRlbnQgKyAnPC9kaXY+JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIHRoaXMub3V0ZXIgPSBvdXRlcjtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLl9yZXBsYWNlSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICB2YXIgaXRlbSA9IG5lZ09yUG9zT25lID09PSAtMSA/IGRhdGFbZG9tSW5kZXhBcnJbMF1dIDogZGF0YVtkb21JbmRleEFyclsyXV07XG5cbiAgICAvL3RvLWRvIGxpIGRpc3BsYXlcbiAgICBpZiAodGhpcy50eXBlID09PSAnZG9tJykge1xuICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGRpdiBzdHlsZT1cImhlaWdodDonICsgaXRlbS5oZWlnaHQgKyAnJTt3aWR0aDonICsgaXRlbS53aWR0aCArICclO1wiPicgKyBpdGVtLmNvbnRlbnQgKyAnPC9kaXY+JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbykge1xuICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gJzxpbWcgaGVpZ2h0PVwiJyArIHdpbmRvdy5pbm5lckhlaWdodCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaS5pbm5lckhUTUwgPSAnPGltZyB3aWR0aD1cIicgKyB3aW5kb3cuaW5uZXJXaWR0aCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5NU2xpZGVyLnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICB2YXIgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcblxuICAgIGlmIChuID4gMCkge1xuICAgICAgICBcbiAgICB9IGVsc2UgaWYgKG4gPT09IFwiLTFcIikge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbUluZGV4QXJySGFzaC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IHRoaXMuaXNWZXJ0aWNsZSA/IDAgOiB0aGlzLnNjYWxlVyAqIChpIC0gdGhpcy5pZHgpO1xuICAgICAgICB2YXIgb2Zmc2V0WSA9IHRoaXMuaXNWZXJ0aWNsZSA/IHRoaXMuc2NhbGVIICogKGkgLSB0aGlzLmlkeCkgOiAwO1xuXG4gICAgICAgIGlmIChpID09PSBub1RyYW5zaXRpb25UaW1lSWQpIHtcbiAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDBzIGVhc2Utb3V0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQnO1xuICAgICAgICB9XG4gICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIG9mZnNldFggKyAncHgsICcrIG9mZnNldFkgKydweCwgMCknO1xuICAgIH1cbiAgICB0aGlzLmluaXRBdXRvUGxheSgpO1xufTtcblxuTVNsaWRlci5wcm90b3R5cGUuYmluZERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHNjYWxlVyA9IHNlbGYuc2NhbGVXO1xuICAgIHZhciBvdXRlciA9IHNlbGYub3V0ZXI7XG4gICAgdmFyIGxlbiA9IHNlbGYuZGF0YS5sZW5ndGg7XG5cbiAgICB2YXIgc3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBzZWxmLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBzZWxmLnN0YXJ0WCA9IGV2dC50b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICBzZWxmLnN0YXJ0WSA9IGV2dC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICBzZWxmLm9mZnNldFggPSBzZWxmLm9mZnNldFkgPSAwO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9ICdCT0RZJykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHNlbGYuY2xlYXJBdXRvUGxheSgpO1xuICAgIH07XG5cbiAgICB2YXIgbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgc2VsZi5vZmZzZXRYID0gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBzZWxmLnN0YXJ0WDtcbiAgICAgICAgc2VsZi5vZmZzZXRZID0gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBzZWxmLnN0YXJ0WTtcblxuICAgICAgICB2YXIgYXJyTGVuZ3RoID0gc2VsZi5kb21JbmRleEFyckhhc2gubGVuZ3RoO1xuICAgICAgICB2YXIgZG9tSW5kZXhBcnJIYXNoID0gc2VsZi5kb21JbmRleEFyckhhc2g7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRvbUluZGV4QXJySGFzaFtpXSkge1xuICAgICAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDBzIGVhc2Utb3V0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb21JbmRleEFyckhhc2hbaV0pIHtcbiAgICAgICAgICAgICAgICBpZighc2VsZi5pc1ZlcnRpY2xlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzZWxmLmlkeCA9PT0gMCAmJiBzZWxmLm9mZnNldFggPiAwKSB8fCAoc2VsZi5pZHggPT09IDIgJiYgc2VsZi5vZmZzZXRYIDwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArICgoaSAtIHNlbGYuaWR4KSAqIHNlbGYuc2NhbGVXICsgc2VsZi5fZGFtcGluZyhzZWxmLm9mZnNldFgpKSArICdweCwgMCwgMCknO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgKChpIC0gc2VsZi5pZHgpICogc2VsZi5zY2FsZVcgKyBzZWxmLm9mZnNldFgpICsgJ3B4LCAwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGYuaWR4ID09PSAwICYmIHNlbGYub2Zmc2V0WSA+IDApIHx8IChzZWxmLmlkeCA9PT0gMiAmJiBzZWxmLm9mZnNldFkgPCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCcgKyAoKGkgLSBzZWxmLmlkeCkgKiBzZWxmLnNjYWxlSCArIHNlbGYuX2RhbXBpbmcoc2VsZi5vZmZzZXRZKSkgKyAncHgsIDApJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwnICsgKChpIC0gc2VsZi5pZHgpICogc2VsZi5zY2FsZUggKyBzZWxmLm9mZnNldFkpICsgJ3B4LCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBlbmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgYm91bmRhcnkgPSBzZWxmLmlzVmVydGljbGUgPyBzZWxmLnNjYWxlSCAvIDYgOiBzZWxmLnNjYWxlVyAvIDYgO1xuICAgICAgICB2YXIgbWV0cmljID0gc2VsZi5pc1ZlcnRpY2xlID8gc2VsZi5vZmZzZXRZIDogc2VsZi5vZmZzZXRYO1xuICAgICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgbGlzID0gb3V0ZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyk7XG4gICAgICAgIGlmIChlbmRUaW1lIC0gc2VsZi5zdGFydFRpbWUgPiAzMDApIHtcbiAgICAgICAgICAgIGlmIChtZXRyaWMgPj0gYm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvSW5kZXgoJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldHJpYyA8IC1ib3VuZGFyeSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ29JbmRleCgnKzEnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0luZGV4KCcwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWV0cmljID4gNTApIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvSW5kZXgoJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldHJpYyA8IC01MCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ29JbmRleCgnKzEnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb0luZGV4KCcwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlc2l6ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgc2VsZi5yYXRpbyA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgIHNlbGYuc2NhbGVXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgc2VsZi53cmFwLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XG4gICAgICAgc2VsZi5vdXRlci5zdHlsZS53aWR0aCA9IHNlbGYuc2NhbGVXICsgJ3B4JztcbiAgICAgICB2YXIgZG9tSW5kZXhBcnJIYXNoID0gc2VsZi5kb21JbmRleEFyckhhc2g7XG4gICAgICAgdmFyIGRvbUluZGV4QXJyID0gc2VsZi5kb21JbmRleEFycjtcbiAgICAgICBmb3IgKHZhciBpID0gZG9tSW5kZXhBcnJIYXNoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgIGRvbUluZGV4QXJySGFzaFtpXS5zdHlsZS53aWR0aCA9IHNlbGYuc2NhbGVXICsgJ3B4JztcbiAgICAgICAgICAgZG9tSW5kZXhBcnJIYXNoW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnLXdlYmtpdC10cmFuc2Zvcm0gMHMgZWFzZS1vdXQnO1xuICAgICAgICAgICBkb21JbmRleEFyckhhc2hbaV0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyAoaS1zZWxmLmlkeCkgKiBzZWxmLnNjYWxlVyArICdweCwgMCwgMCknO1xuICAgICAgICAgICBpZiAoc2VsZi5sYXllckNvbnRlbnQgPT09IHRydWUpIGNvbnRpbnVlO1xuICAgICAgICAgICB2YXIgaW1nID0gZG9tSW5kZXhBcnJIYXNoW2ldLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgIHZhciBpbWdEYXRhID0gc2VsZi5kYXRhW2RvbUluZGV4QXJyW2ldXTtcbiAgICAgICAgICAgY29uc29sZS5sb2coKGltZ0RhdGEuaGVpZ2h0IC9pbWdEYXRhLndpZHRoKSArIFwiIFwiKyBzZWxmLnJhdGlvKTtcbiAgICAgICAgICAgaWYgKChpbWdEYXRhLmhlaWdodCAvaW1nRGF0YS53aWR0aCkgPiBzZWxmLnJhdGlvKSB7XG4gICAgICAgICAgICAgICAgaW1nLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKFwid2lkdGhcIik7XG4gICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW1nLndpZHRoID0gc2VsZi5zY2FsZVc7XG4gICAgICAgICAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZShcImhlaWdodFwiKTtcbiAgICAgICAgICAgfVxuXG4gICAgICAgfVxuICAgIH07XG4gICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHN0YXJ0SGFuZGxlcik7XG4gICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgbW92ZUhhbmRsZXIpO1xuICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZW5kSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTVNsaWRlcjtcbiJdfQ==
