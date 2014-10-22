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
	
mslider = new MSlider({
    data: list,
    dom: document.getElementById("canvas"),
    isVerticle: true,
    isLooping: true,
    isDebug: true,
    isAutoplay: true
});

},{"./mslider":2}],2:[function(require,module,exports){
/**
 * MSlider 
 * A simple, efficency mobile slider
 * @Author qbatyqi
 *
 * @param {Object} opts 参数集
 * @param {Element} opts.dom 外层元素 
 * @param {Object} opts.data 数据列表
 * @param {Boolean} opts.isVertical 是否竖直滚动
 * @param {Boolean} opts.isLooping 是否循环
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

    this._opts = opts;
    this._setting();
    this._renderHTML();
    this._bindHandler();
};

//setting parameters for slider
MSlider.prototype._setting = function () {
    var opts = this._opts;

    this.wrap = opts.dom;
    this.data = opts.data;
    
    //default type
    this.type = opts.type || 'pic';
    //default slide direction
    this.isVertical = opts.isVertical || false;
    //slide events
    this.onslide = opts.onslide;
    this.onslidestart = opts.onslidestart;
    this.onslideend = opts.onslideend;
    this.onslidechange = opts.onslidechange;

    this.duration = opts.duration || 2000;

    this.log = opts.isDebug ? function (str) { console.log(str) } : function (){};

    this.axis = this.isVertical ? 'Y' : 'X';
    this.width = this.wrap.clientWidth;
    this.height = this.wrap.clientHeight;
    this.ratio = this.height / this.width;
    this.scale = opts.isVertical ? this.height : this.width;

    //start from 0
    this.sliderIndex = this.sliderIndex || 0;

    if (this.data.length < 2) {
        this.isLooping = false;
        this.isAutoPlay = false;
    } else {
        this.isLooping = opts.isLooping || false;
        this.isAutoplay = opts.isAutoplay || false;
    }

    if (this.isAutoplay) {
        this.play();
    }

    //set Damping function
    this._setUpDamping();

    //animate
    this.animateType = 'default';
    var animateList = ['default'];
    for (i=0; i<animateList.length; i++){
        if (opts.animateType == animateList[i]){
            this.animateType = opts.animateType;
            break;
        }
    };
    this._animate = {
        'default': function (dom, axis, scale, i, offset){
            if (offset){
                dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
            }
            else{
                dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + scale * (i - 1) + 'px)';
            }
        }
    };

};


//enable damping when slider meet the edge
MSlider.prototype._setUpDamping = function () {
    var oneIn2 = this.scale >> 1;
    var oneIn4 = oneIn2 >> 1;
    var oneIn16 = oneIn4 >> 2;

    this._damping = function (distance) {
        var dis = Math.abs(distance);
        var result;

        if (dis < oneIn2) {
            result = dis >> 1;
        } else if (dis < oneIn2 + oneIn4) {
            result = oneIn4 + ((dis - oneIn2) >> 2);
        } else {
            result = oneIn4 + oneIn16 + ((dis - oneIn2 - oneIn4) >> 3);
        }

        return distance > 0 ? result : -result;
    };
};

//render single item html by idx
MSlider.prototype._renderItem = function (i) {
    var item, html;
    var len = this.data.length;

    if (!this.isLooping) {
        item = this.data[i] || { empty : true };
    } else {
        if (i < 0) {
            item = this.data[len + i];
        } else if (i > len - 1) {
            item = this.data[i - len];
        } else {
            item = this.data[i];
        }
    }

    if (item.empty) {
        return '';
    }

    if (this.type === 'pic') {
        html = item.height / item.width > this.ratio 
        ? '<img height="' + this.height + '" src="' + item.content + '">'
        : '<img width="' + this.width + '" src="' + item.content + '">';
    } else if (this.type === 'dom') {
        html = '<div style="height:' + item.height + ';width:' + item.width + ';">' + item.content + '</div>';
    }

    return html;
};

//render list html
MSlider.prototype._renderHTML = function () {
    var outer;

    if (this.outer) {
        this.outer.innerHTML = '';
        outer = this.outer;
    } else {
        outer = document.createElement('ul');
    }

    outer.style.width = this.width + 'px';
    outer.style.height = this.height + 'px';

    //storage li elements
    this.els = [];
    for (var i = 0; i < 3; i++) {
        var li = document.createElement('li');
        li.style.width = this.width + 'px';
        li.style.height = this.height + 'px';
        this._animate[this.animateType](li, this.axis, this.scale, i);

        this.els.push(li);
        outer.appendChild(li);

        li.innerHTML = this._renderItem(i - 1 + this.sliderIndex);
    }

    if (!this.outer) {
        this.outer = outer;
        this.wrap.appendChild(outer);
    }
};

//logical slider
MSlider.prototype._slide = function (n) {
    var data = this.data;
    var els = this.els;
    var idx = this.sliderIndex + n;
    

    if (data[idx]){
        this.sliderIndex = idx;
    } else {
        if (this.isLooping) {
            this.sliderIndex = n > 0 ? 0 : data.length - 1;    
        } else {
            n = 0;
        }
    }

    this.log('pic idx:' + this.sliderIndex);

    var sEle;
    if (n > 0) {
        sEle = els.shift();
        els.push(sEle);
    } else if (n < 0) {
        sEle = els.pop();
        els.unshift(sEle);
    } 

    if(n !== 0){
        sEle.innerHTML = this._renderItem(idx + n);
        this.onslidechange && this.onslidechange(this.sliderIndex);
    }

    for (var i = 0; i < 3; i++) {
        if (els[i] !== sEle) {
            els[i].style.webkitTransition = 'all .3s ease';
        } else {
            els[i].style.webkitTransition = 'all 0s';
        }
        this._animate[this.animateType](els[i], this.axis, this.scale, i);
    }

    if (this.isAutoplay) {
        if (this.sliderIndex === data.length - 1 && !this.isLooping) {
            this.pause();
        } else {
            this.play();
        }
    }
};

//bind all event handler
MSlider.prototype._bindHandler = function () {
    var self = this;
    var scaleW = self.scaleW;
    var outer = self.outer;
    var len = self.data.length;

    var startHandler = function (evt) {
        self.pause();
        self.onslidestart && self.onslidestart();
        self.log('Event: beforeslide');

        self.startTime = new Date().getTime();
        self.startX = evt.targetTouches[0].pageX;
        self.startY = evt.targetTouches[0].pageY;

        var target = evt.target;
        while (target.nodeName != 'LI' && target.nodeName != 'BODY') {
            target = target.parentNode;
        }
        self.target = target;
    };

    var moveHandler = function (evt) {
        evt.preventDefault();
        self.onslide && self.onslide();
        self.log('Event: onslide');

        
        var axis = self.axis;
        var offset = evt.targetTouches[0]['page' + axis] - self['start' + axis];

        if (!self.isLooping) {
            if (offset > 0 && self.sliderIndex === 0 || offset < 0 && self.sliderIndex === self.data.length - 1) {
                offset = self._damping(offset);
            }
        }

        for (var i = 0; i < 3; i++) {
            var item = self.els[i];
            item.style.webkitTransition = 'all 0s';
            self._animate[self.animateType](item, axis, self.scale, i, offset);
            //item.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + self.scale * (i - 1)) + 'px)';
        }

        self.offset = offset;
    };

    var endHandler = function (evt) {
        evt.preventDefault();

        var boundary = self.scale / 2;
        var metric = self.offset;
        var endTime = new Date().getTime();

        //a quick slide time must under 300ms
        //a quick slide should also slide at least 14 px
        boundary = endTime - self.startTime > 300 ? boundary : 14;

        if (metric >= boundary) {
            self._slide(-1);
        } else if (metric < -boundary) {
            self._slide(1);
        } else {
            self._slide(0);
        }

        self.offset = 0;
        self.onslideend && self.onslideend();
        self.log('Event: afterslide');
    };

    var orientationchangeHandler = function (evt) {
        setTimeout(function(){
            self._setting();
            self._renderHTML();
            self.log('Event: orientationchange');
        },100);
    };

    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
    window.addEventListener('orientationchange', orientationchangeHandler);
};

MSlider.prototype.reset = function () {
    this.pause();
    this._setting();
    this._renderHTML();
    this.isAutoplay && this.play();
};

//enable autoplay
MSlider.prototype.play = function () {
    var self = this;
    var duration = this.duration;
    clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = setInterval(function () {
        self._slide(1);
    }, duration);
};

//pause autoplay
MSlider.prototype.pause = function () {
    clearInterval(this.autoPlayTimer);
};

module.exports = MSlider;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHAuanMiLCJqcy9tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNU2xpZGVyID0gcmVxdWlyZSgnLi9tc2xpZGVyJyk7XG52YXIgbGlzdCA9IFt7XG5cdGhlaWdodDogNDc1LFxuXHR3aWR0aDogNDAwLFxuXHRjb250ZW50OiBcImltZ3MvMS5qcGdcIixcbn0se1xuXHRoZWlnaHQ6IDUyNyxcblx0d2lkdGg6IDQwMCxcblx0Y29udGVudDogXCJpbWdzLzIuanBnXCIsXG59LHtcbiBcdGhlaWdodDogNDAwLFxuIFx0d2lkdGg6IDUxMixcbiBcdGNvbnRlbnQ6IFwiaW1ncy8zLmpwZ1wiLFxufSx7XG5cdGhlaWdodDogNDAwLFxuXHR3aWR0aDogNDU4LFxuXHRjb250ZW50OlwiaW1ncy81LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiA0MDAsXG5cdHdpZHRoOiA0OTgsXG5cdGNvbnRlbnQ6XCJpbWdzLzYuanBnXCJcbn0se1xuXHRoZWlnaHQ6IDM3Nyxcblx0d2lkdGg6IDYwMCxcblx0Y29udGVudDpcImltZ3MvNy5qcGdcIlxufSx7XG5cdGhlaWdodDogMzk2LFxuXHR3aWR0aDogNjAwLFxuXHRjb250ZW50OlwiaW1ncy84LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiAzNzQsXG5cdHdpZHRoOiA2MDAsXG5cdGNvbnRlbnQ6XCJpbWdzLzkuanBnXCJcbn1dO1xuXHRcbm1zbGlkZXIgPSBuZXcgTVNsaWRlcih7XG4gICAgZGF0YTogbGlzdCxcbiAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpLFxuICAgIGlzVmVydGljbGU6IHRydWUsXG4gICAgaXNMb29waW5nOiB0cnVlLFxuICAgIGlzRGVidWc6IHRydWUsXG4gICAgaXNBdXRvcGxheTogdHJ1ZVxufSk7XG4iLCIvKipcbiAqIE1TbGlkZXIgXG4gKiBBIHNpbXBsZSwgZWZmaWNlbmN5IG1vYmlsZSBzbGlkZXJcbiAqIEBBdXRob3IgcWJhdHlxaVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIOWPguaVsOmbhlxuICogQHBhcmFtIHtFbGVtZW50fSBvcHRzLmRvbSDlpJblsYLlhYPntKAgXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cy5kYXRhIOaVsOaNruWIl+ihqFxuICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmlzVmVydGljYWwg5piv5ZCm56uW55u05rua5YqoXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuaXNMb29waW5nIOaYr+WQpuW+queOr1xuICpcbiAqIEBjbGFzcyBcbiAqL1xudmFyIE1TbGlkZXIgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmICghb3B0cy5kb20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZG9tIGVsZW1lbnQgY2FuIG5vdCBiZSBlbXB0eSFcIik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLmRhdGEgfHwgIW9wdHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBtdXN0IGJlIGFuIGFycmF5IGFuZCBtdXN0IGhhdmUgbW9yZSB0aGFuIG9uZSBlbGVtZW50IVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vcHRzID0gb3B0cztcbiAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgdGhpcy5fcmVuZGVySFRNTCgpO1xuICAgIHRoaXMuX2JpbmRIYW5kbGVyKCk7XG59O1xuXG4vL3NldHRpbmcgcGFyYW1ldGVycyBmb3Igc2xpZGVyXG5NU2xpZGVyLnByb3RvdHlwZS5fc2V0dGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHM7XG5cbiAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcbiAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG4gICAgXG4gICAgLy9kZWZhdWx0IHR5cGVcbiAgICB0aGlzLnR5cGUgPSBvcHRzLnR5cGUgfHwgJ3BpYyc7XG4gICAgLy9kZWZhdWx0IHNsaWRlIGRpcmVjdGlvblxuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IG9wdHMuaXNWZXJ0aWNhbCB8fCBmYWxzZTtcbiAgICAvL3NsaWRlIGV2ZW50c1xuICAgIHRoaXMub25zbGlkZSA9IG9wdHMub25zbGlkZTtcbiAgICB0aGlzLm9uc2xpZGVzdGFydCA9IG9wdHMub25zbGlkZXN0YXJ0O1xuICAgIHRoaXMub25zbGlkZWVuZCA9IG9wdHMub25zbGlkZWVuZDtcbiAgICB0aGlzLm9uc2xpZGVjaGFuZ2UgPSBvcHRzLm9uc2xpZGVjaGFuZ2U7XG5cbiAgICB0aGlzLmR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCAyMDAwO1xuXG4gICAgdGhpcy5sb2cgPSBvcHRzLmlzRGVidWcgPyBmdW5jdGlvbiAoc3RyKSB7IGNvbnNvbGUubG9nKHN0cikgfSA6IGZ1bmN0aW9uICgpe307XG5cbiAgICB0aGlzLmF4aXMgPSB0aGlzLmlzVmVydGljYWwgPyAnWScgOiAnWCc7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMud3JhcC5jbGllbnRXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud3JhcC5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5yYXRpbyA9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcbiAgICB0aGlzLnNjYWxlID0gb3B0cy5pc1ZlcnRpY2FsID8gdGhpcy5oZWlnaHQgOiB0aGlzLndpZHRoO1xuXG4gICAgLy9zdGFydCBmcm9tIDBcbiAgICB0aGlzLnNsaWRlckluZGV4ID0gdGhpcy5zbGlkZXJJbmRleCB8fCAwO1xuXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMuaXNMb29waW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNBdXRvUGxheSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNMb29waW5nID0gb3B0cy5pc0xvb3BpbmcgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSA9IG9wdHMuaXNBdXRvcGxheSB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0F1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8vc2V0IERhbXBpbmcgZnVuY3Rpb25cbiAgICB0aGlzLl9zZXRVcERhbXBpbmcoKTtcblxuICAgIC8vYW5pbWF0ZVxuICAgIHRoaXMuYW5pbWF0ZVR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdmFyIGFuaW1hdGVMaXN0ID0gWydkZWZhdWx0J107XG4gICAgZm9yIChpPTA7IGk8YW5pbWF0ZUxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAob3B0cy5hbmltYXRlVHlwZSA9PSBhbmltYXRlTGlzdFtpXSl7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVUeXBlID0gb3B0cy5hbmltYXRlVHlwZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLl9hbmltYXRlID0ge1xuICAgICAgICAnZGVmYXVsdCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpe1xuICAgICAgICAgICAgaWYgKG9mZnNldCl7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgc2NhbGUgKiAoaSAtIDEpICsgJ3B4KSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59O1xuXG5cbi8vZW5hYmxlIGRhbXBpbmcgd2hlbiBzbGlkZXIgbWVldCB0aGUgZWRnZVxuTVNsaWRlci5wcm90b3R5cGUuX3NldFVwRGFtcGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb25lSW4yID0gdGhpcy5zY2FsZSA+PiAxO1xuICAgIHZhciBvbmVJbjQgPSBvbmVJbjIgPj4gMTtcbiAgICB2YXIgb25lSW4xNiA9IG9uZUluNCA+PiAyO1xuXG4gICAgdGhpcy5fZGFtcGluZyA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnMoZGlzdGFuY2UpO1xuICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGRpcyA+PiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcyA8IG9uZUluMiArIG9uZUluNCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgb25lSW4xNiArICgoZGlzIC0gb25lSW4yIC0gb25lSW40KSA+PiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA+IDAgPyByZXN1bHQgOiAtcmVzdWx0O1xuICAgIH07XG59O1xuXG4vL3JlbmRlciBzaW5nbGUgaXRlbSBodG1sIGJ5IGlkeFxuTVNsaWRlci5wcm90b3R5cGUuX3JlbmRlckl0ZW0gPSBmdW5jdGlvbiAoaSkge1xuICAgIHZhciBpdGVtLCBodG1sO1xuICAgIHZhciBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuXG4gICAgaWYgKCF0aGlzLmlzTG9vcGluZykge1xuICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2ldIHx8IHsgZW1wdHkgOiB0cnVlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2xlbiArIGldO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPiBsZW4gLSAxKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2kgLSBsZW5dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpdGVtLmVtcHR5KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAncGljJykge1xuICAgICAgICBodG1sID0gaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbyBcbiAgICAgICAgPyAnPGltZyBoZWlnaHQ9XCInICsgdGhpcy5oZWlnaHQgKyAnXCIgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIj4nXG4gICAgICAgIDogJzxpbWcgd2lkdGg9XCInICsgdGhpcy53aWR0aCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdkb20nKSB7XG4gICAgICAgIGh0bWwgPSAnPGRpdiBzdHlsZT1cImhlaWdodDonICsgaXRlbS5oZWlnaHQgKyAnO3dpZHRoOicgKyBpdGVtLndpZHRoICsgJztcIj4nICsgaXRlbS5jb250ZW50ICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWw7XG59O1xuXG4vL3JlbmRlciBsaXN0IGh0bWxcbk1TbGlkZXIucHJvdG90eXBlLl9yZW5kZXJIVE1MID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvdXRlcjtcblxuICAgIGlmICh0aGlzLm91dGVyKSB7XG4gICAgICAgIHRoaXMub3V0ZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgfVxuXG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcbiAgICBvdXRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG5cbiAgICAvL3N0b3JhZ2UgbGkgZWxlbWVudHNcbiAgICB0aGlzLmVscyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICAgIGxpLnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5fYW5pbWF0ZVt0aGlzLmFuaW1hdGVUeXBlXShsaSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpKTtcblxuICAgICAgICB0aGlzLmVscy5wdXNoKGxpKTtcbiAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQobGkpO1xuXG4gICAgICAgIGxpLmlubmVySFRNTCA9IHRoaXMuX3JlbmRlckl0ZW0oaSAtIDEgKyB0aGlzLnNsaWRlckluZGV4KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3V0ZXIpIHtcbiAgICAgICAgdGhpcy5vdXRlciA9IG91dGVyO1xuICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIH1cbn07XG5cbi8vbG9naWNhbCBzbGlkZXJcbk1TbGlkZXIucHJvdG90eXBlLl9zbGlkZSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdmFyIGVscyA9IHRoaXMuZWxzO1xuICAgIHZhciBpZHggPSB0aGlzLnNsaWRlckluZGV4ICsgbjtcbiAgICBcblxuICAgIGlmIChkYXRhW2lkeF0pe1xuICAgICAgICB0aGlzLnNsaWRlckluZGV4ID0gaWR4O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJJbmRleCA9IG4gPiAwID8gMCA6IGRhdGEubGVuZ3RoIC0gMTsgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG9nKCdwaWMgaWR4OicgKyB0aGlzLnNsaWRlckluZGV4KTtcblxuICAgIHZhciBzRWxlO1xuICAgIGlmIChuID4gMCkge1xuICAgICAgICBzRWxlID0gZWxzLnNoaWZ0KCk7XG4gICAgICAgIGVscy5wdXNoKHNFbGUpO1xuICAgIH0gZWxzZSBpZiAobiA8IDApIHtcbiAgICAgICAgc0VsZSA9IGVscy5wb3AoKTtcbiAgICAgICAgZWxzLnVuc2hpZnQoc0VsZSk7XG4gICAgfSBcblxuICAgIGlmKG4gIT09IDApe1xuICAgICAgICBzRWxlLmlubmVySFRNTCA9IHRoaXMuX3JlbmRlckl0ZW0oaWR4ICsgbik7XG4gICAgICAgIHRoaXMub25zbGlkZWNoYW5nZSAmJiB0aGlzLm9uc2xpZGVjaGFuZ2UodGhpcy5zbGlkZXJJbmRleCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaWYgKGVsc1tpXSAhPT0gc0VsZSkge1xuICAgICAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIC4zcyBlYXNlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsc1tpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAwcyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5pbWF0ZVt0aGlzLmFuaW1hdGVUeXBlXShlbHNbaV0sIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBdXRvcGxheSkge1xuICAgICAgICBpZiAodGhpcy5zbGlkZXJJbmRleCA9PT0gZGF0YS5sZW5ndGggLSAxICYmICF0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vL2JpbmQgYWxsIGV2ZW50IGhhbmRsZXJcbk1TbGlkZXIucHJvdG90eXBlLl9iaW5kSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHNjYWxlVyA9IHNlbGYuc2NhbGVXO1xuICAgIHZhciBvdXRlciA9IHNlbGYub3V0ZXI7XG4gICAgdmFyIGxlbiA9IHNlbGYuZGF0YS5sZW5ndGg7XG5cbiAgICB2YXIgc3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBzZWxmLnBhdXNlKCk7XG4gICAgICAgIHNlbGYub25zbGlkZXN0YXJ0ICYmIHNlbGYub25zbGlkZXN0YXJ0KCk7XG4gICAgICAgIHNlbGYubG9nKCdFdmVudDogYmVmb3Jlc2xpZGUnKTtcblxuICAgICAgICBzZWxmLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBzZWxmLnN0YXJ0WCA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICBzZWxmLnN0YXJ0WSA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9ICdCT0RZJykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfTtcblxuICAgIHZhciBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGYub25zbGlkZSAmJiBzZWxmLm9uc2xpZGUoKTtcbiAgICAgICAgc2VsZi5sb2coJ0V2ZW50OiBvbnNsaWRlJyk7XG5cbiAgICAgICAgXG4gICAgICAgIHZhciBheGlzID0gc2VsZi5heGlzO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZXZ0LnRhcmdldFRvdWNoZXNbMF1bJ3BhZ2UnICsgYXhpc10gLSBzZWxmWydzdGFydCcgKyBheGlzXTtcblxuICAgICAgICBpZiAoIXNlbGYuaXNMb29waW5nKSB7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gMCAmJiBzZWxmLnNsaWRlckluZGV4ID09PSAwIHx8IG9mZnNldCA8IDAgJiYgc2VsZi5zbGlkZXJJbmRleCA9PT0gc2VsZi5kYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBzZWxmLl9kYW1waW5nKG9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBzZWxmLmVsc1tpXTtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMHMnO1xuICAgICAgICAgICAgc2VsZi5fYW5pbWF0ZVtzZWxmLmFuaW1hdGVUeXBlXShpdGVtLCBheGlzLCBzZWxmLnNjYWxlLCBpLCBvZmZzZXQpO1xuICAgICAgICAgICAgLy9pdGVtLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNlbGYuc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgfTtcblxuICAgIHZhciBlbmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgYm91bmRhcnkgPSBzZWxmLnNjYWxlIC8gMjtcbiAgICAgICAgdmFyIG1ldHJpYyA9IHNlbGYub2Zmc2V0O1xuICAgICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vYSBxdWljayBzbGlkZSB0aW1lIG11c3QgdW5kZXIgMzAwbXNcbiAgICAgICAgLy9hIHF1aWNrIHNsaWRlIHNob3VsZCBhbHNvIHNsaWRlIGF0IGxlYXN0IDE0IHB4XG4gICAgICAgIGJvdW5kYXJ5ID0gZW5kVGltZSAtIHNlbGYuc3RhcnRUaW1lID4gMzAwID8gYm91bmRhcnkgOiAxNDtcblxuICAgICAgICBpZiAobWV0cmljID49IGJvdW5kYXJ5KSB7XG4gICAgICAgICAgICBzZWxmLl9zbGlkZSgtMSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0cmljIDwgLWJvdW5kYXJ5KSB7XG4gICAgICAgICAgICBzZWxmLl9zbGlkZSgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuX3NsaWRlKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5vZmZzZXQgPSAwO1xuICAgICAgICBzZWxmLm9uc2xpZGVlbmQgJiYgc2VsZi5vbnNsaWRlZW5kKCk7XG4gICAgICAgIHNlbGYubG9nKCdFdmVudDogYWZ0ZXJzbGlkZScpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLl9zZXR0aW5nKCk7XG4gICAgICAgICAgICBzZWxmLl9yZW5kZXJIVE1MKCk7XG4gICAgICAgICAgICBzZWxmLmxvZygnRXZlbnQ6IG9yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgICAgIH0sMTAwKTtcbiAgICB9O1xuXG4gICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHN0YXJ0SGFuZGxlcik7XG4gICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgbW92ZUhhbmRsZXIpO1xuICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZW5kSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyKTtcbn07XG5cbk1TbGlkZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgdGhpcy5fcmVuZGVySFRNTCgpO1xuICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbn07XG5cbi8vZW5hYmxlIGF1dG9wbGF5XG5NU2xpZGVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUGxheVRpbWVyKTtcbiAgICB0aGlzLmF1dG9QbGF5VGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX3NsaWRlKDEpO1xuICAgIH0sIGR1cmF0aW9uKTtcbn07XG5cbi8vcGF1c2UgYXV0b3BsYXlcbk1TbGlkZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUGxheVRpbWVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTVNsaWRlcjtcbiJdfQ==
