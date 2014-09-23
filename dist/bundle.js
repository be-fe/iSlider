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
 * @param {Boolean} opts.isVerticle 是否竖直滚动
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
    this._setting(opts);
    this._renderHTML();
    this._bindHandler();
};

//setting parameters for slider
MSlider.prototype._setting = function (opts) {
    this.wrap = opts.dom;
    this.data = opts.data;
    
    //default type
    this.type = opts.type || 'pic';
    //default slide direction
    this.isVerticle = opts.isVerticle || false;
    this.onslide = opts.onslide;
    this.beforeslide = opts.beforeslide;
    this.afterslide = opts.afterslide;

    this.duration = 500;

    this.log = opts.isDebug 
    ? function (str) { console.log(str) }
    : function (){};

    this.axis = this.isVerticle ? 'Y' : 'X';
    this.width = this.wrap.clientWidth;
    this.height = this.wrap.clientHeight;
    this.ratio = this.height / this.width;
    this.scale = opts.isVerticle ? this.height : this.width;

    //start from 0
    this.picIdx = this.picIdx || 0;

    if (this.data.length < 2) {
        this.isLooping = false;
        this.isAutoPlay = false;
    } else {
        this.isLooping = opts.isLooping || false;
        this.isAutoplay = opts.isAutoplay || false;
    }

    if (this.isAutoplay) {
        this.play(this.duration);
    }

    //set Damping function
    this._setUpDamping();

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
        ? '<img height="' + window.innerHeight + '" src="' + item.content + '">'
        : '<img width="' + window.innerWidth + '" src="' + item.content + '">';
    } else if (this.type === 'dom') {
        html.innerHTML = '<div style="height:' + item.height + ';width:' + item.width + ';">' + item.content + '</div>';
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
        li.style.webkitTransform = 'translateZ(0) translate' + this.axis + '(' + this.scale * (i - 1) + 'px)';

        this.els.push(li);
        outer.appendChild(li);

        li.innerHTML = this._renderItem(i - 1 + this.picIdx);
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
    var idx = this.picIdx + n;
    
    if (!data[idx] && this.isLooping) {
        this.picIdx = n > 0 ? 0 : data.length - 1;
    } else if (data[idx]) {
        this.picIdx = idx;
    } else {
        n = 0;
    }

    this.log(this.picIdx);

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
    }

    for (var i = 0; i < 3; i++) {
        if (els[i] !== sEle) {
            els[i].style.webkitTransition = 'all .2s';
        } else {
            els[i].style.webkitTransition = 'all 0s';
        }
        els[i].style.webkitTransform = 'translateZ(0) translate' + this.axis + '(' + this.scale * (i - 1) + 'px)';
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
        self.beforeslide && self.beforeslide();
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

        if (offset > 0 && self.picIdx === 0 || offset < 0 && self.picIdx === self.data.length - 1) {
            offset = self._damping(offset);
        }

        for (var i = 0; i < 3; i++) {
            var item = self.els[i];
            item.style.webkitTransition = 'all 0s';
            item.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + self.scale * (i - 1)) + 'px)';
        }

        self.offset = offset;
    };

    var endHandler = function (evt) {
        evt.preventDefault();

        var boundary = self.scale / 6;
        var metric = self.offset;
        var endTime = new Date().getTime();

        if (endTime - self.startTime > 300) {
            if (metric >= boundary) {
                self._slide(-1);
            } else if (metric < -boundary) {
                self._slide(1);
            } else {
                self._slide(0);
            }
        } else {
            self.log(metric);
            if (metric > 50) {
                self._slide(-1);
            } else if (metric < -50) {
                self._slide(1);
            } else {
                self._slide(0);
            }
        }

        self.offset = 0;
        self.isAutoplay && self.play(self.duration);
        self.afterslide && self.afterslide();
        self.log('Event: afterslide');
    };

    var orientationchangeHandler = function (evt) {
        setTimeout(function(){
            self._setting(self._opts);
            self._renderHTML();
            self.log('Event: orientationchange');
        },100);
    };

    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
    window.addEventListener('orientationchange', orientationchangeHandler);
};

//enable autoplay
MSlider.prototype.play = function (duration) {
    var self = this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYmF0eXFpL0RvY3VtZW50cy9Db2RlL01TbGlkZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4vanMvYXBwLmpzIiwiL1VzZXJzL3FiYXR5cWkvRG9jdW1lbnRzL0NvZGUvTVNsaWRlci9qcy9tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNU2xpZGVyID0gcmVxdWlyZSgnLi9tc2xpZGVyJyk7XG52YXIgbGlzdCA9IFt7XG5cdGhlaWdodDogNDc1LFxuXHR3aWR0aDogNDAwLFxuXHRjb250ZW50OiBcImltZ3MvMS5qcGdcIixcbn0se1xuXHRoZWlnaHQ6IDUyNyxcblx0d2lkdGg6IDQwMCxcblx0Y29udGVudDogXCJpbWdzLzIuanBnXCIsXG59LHtcbiBcdGhlaWdodDogNDAwLFxuIFx0d2lkdGg6IDUxMixcbiBcdGNvbnRlbnQ6IFwiaW1ncy8zLmpwZ1wiLFxufSx7XG5cdGhlaWdodDogNDAwLFxuXHR3aWR0aDogNDU4LFxuXHRjb250ZW50OlwiaW1ncy81LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiA0MDAsXG5cdHdpZHRoOiA0OTgsXG5cdGNvbnRlbnQ6XCJpbWdzLzYuanBnXCJcbn0se1xuXHRoZWlnaHQ6IDM3Nyxcblx0d2lkdGg6IDYwMCxcblx0Y29udGVudDpcImltZ3MvNy5qcGdcIlxufSx7XG5cdGhlaWdodDogMzk2LFxuXHR3aWR0aDogNjAwLFxuXHRjb250ZW50OlwiaW1ncy84LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiAzNzQsXG5cdHdpZHRoOiA2MDAsXG5cdGNvbnRlbnQ6XCJpbWdzLzkuanBnXCJcbn1dO1xuXHRcbm1zbGlkZXIgPSBuZXcgTVNsaWRlcih7XG4gICAgZGF0YTogbGlzdCxcbiAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpLFxuICAgIGlzVmVydGljbGU6IHRydWUsXG4gICAgaXNMb29waW5nOiB0cnVlLFxuICAgIGlzRGVidWc6IHRydWUsXG4gICAgaXNBdXRvcGxheTogdHJ1ZVxufSk7XG4iLCIvKipcbiAqIE1TbGlkZXIgXG4gKiBBIHNpbXBsZSwgZWZmaWNlbmN5IG1vYmlsZSBzbGlkZXJcbiAqIEBBdXRob3IgcWJhdHlxaVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIOWPguaVsOmbhlxuICogQHBhcmFtIHtFbGVtZW50fSBvcHRzLmRvbSDlpJblsYLlhYPntKAgXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cy5kYXRhIOaVsOaNruWIl+ihqFxuICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmlzVmVydGljbGUg5piv5ZCm56uW55u05rua5YqoXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuaXNMb29waW5nIOaYr+WQpuW+queOr1xuICpcbiAqIEBjbGFzcyBcbiAqL1xudmFyIE1TbGlkZXIgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIGlmICghb3B0cy5kb20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZG9tIGVsZW1lbnQgY2FuIG5vdCBiZSBlbXB0eSFcIik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLmRhdGEgfHwgIW9wdHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBtdXN0IGJlIGFuIGFycmF5IGFuZCBtdXN0IGhhdmUgbW9yZSB0aGFuIG9uZSBlbGVtZW50IVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vcHRzID0gb3B0cztcbiAgICB0aGlzLl9zZXR0aW5nKG9wdHMpO1xuICAgIHRoaXMuX3JlbmRlckhUTUwoKTtcbiAgICB0aGlzLl9iaW5kSGFuZGxlcigpO1xufTtcblxuLy9zZXR0aW5nIHBhcmFtZXRlcnMgZm9yIHNsaWRlclxuTVNsaWRlci5wcm90b3R5cGUuX3NldHRpbmcgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuICAgIHRoaXMuZGF0YSA9IG9wdHMuZGF0YTtcbiAgICBcbiAgICAvL2RlZmF1bHQgdHlwZVxuICAgIHRoaXMudHlwZSA9IG9wdHMudHlwZSB8fCAncGljJztcbiAgICAvL2RlZmF1bHQgc2xpZGUgZGlyZWN0aW9uXG4gICAgdGhpcy5pc1ZlcnRpY2xlID0gb3B0cy5pc1ZlcnRpY2xlIHx8IGZhbHNlO1xuICAgIHRoaXMub25zbGlkZSA9IG9wdHMub25zbGlkZTtcbiAgICB0aGlzLmJlZm9yZXNsaWRlID0gb3B0cy5iZWZvcmVzbGlkZTtcbiAgICB0aGlzLmFmdGVyc2xpZGUgPSBvcHRzLmFmdGVyc2xpZGU7XG5cbiAgICB0aGlzLmR1cmF0aW9uID0gNTAwO1xuXG4gICAgdGhpcy5sb2cgPSBvcHRzLmlzRGVidWcgXG4gICAgPyBmdW5jdGlvbiAoc3RyKSB7IGNvbnNvbGUubG9nKHN0cikgfVxuICAgIDogZnVuY3Rpb24gKCl7fTtcblxuICAgIHRoaXMuYXhpcyA9IHRoaXMuaXNWZXJ0aWNsZSA/ICdZJyA6ICdYJztcbiAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53cmFwLmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnJhdGlvID0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xuICAgIHRoaXMuc2NhbGUgPSBvcHRzLmlzVmVydGljbGUgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAvL3N0YXJ0IGZyb20gMFxuICAgIHRoaXMucGljSWR4ID0gdGhpcy5waWNJZHggfHwgMDtcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQXV0b1BsYXkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IG9wdHMuaXNMb29waW5nIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgPSBvcHRzLmlzQXV0b3BsYXkgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBdXRvcGxheSkge1xuICAgICAgICB0aGlzLnBsYXkodGhpcy5kdXJhdGlvbik7XG4gICAgfVxuXG4gICAgLy9zZXQgRGFtcGluZyBmdW5jdGlvblxuICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xuXG59O1xuXG4vL2VuYWJsZSBkYW1waW5nIHdoZW4gc2xpZGVyIG1lZXQgdGhlIGVkZ2Vcbk1TbGlkZXIucHJvdG90eXBlLl9zZXRVcERhbXBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9uZUluMiA9IHRoaXMuc2NhbGUgPj4gMTtcbiAgICB2YXIgb25lSW40ID0gb25lSW4yID4+IDE7XG4gICAgdmFyIG9uZUluMTYgPSBvbmVJbjQgPj4gMjtcblxuICAgIHRoaXMuX2RhbXBpbmcgPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIGRpcyA9IE1hdGguYWJzKGRpc3RhbmNlKTtcbiAgICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgICBpZiAoZGlzIDwgb25lSW4yKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBkaXMgPj4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXMgPCBvbmVJbjIgKyBvbmVJbjQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArICgoZGlzIC0gb25lSW4yKSA+PiAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArIG9uZUluMTYgKyAoKGRpcyAtIG9uZUluMiAtIG9uZUluNCkgPj4gMyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiAwID8gcmVzdWx0IDogLXJlc3VsdDtcbiAgICB9O1xufTtcblxuLy9yZW5kZXIgc2luZ2xlIGl0ZW0gaHRtbCBieSBpZHhcbk1TbGlkZXIucHJvdG90eXBlLl9yZW5kZXJJdGVtID0gZnVuY3Rpb24gKGkpIHtcbiAgICB2YXIgaXRlbSwgaHRtbDtcbiAgICB2YXIgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcblxuICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpXSB8fCB7IGVtcHR5IDogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtsZW4gKyBpXTtcbiAgICAgICAgfSBlbHNlIGlmIChpID4gbGVuIC0gMSkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpIC0gbGVuXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXRlbS5lbXB0eSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BpYycpIHtcbiAgICAgICAgaHRtbCA9IGl0ZW0uaGVpZ2h0IC8gaXRlbS53aWR0aCA+IHRoaXMucmF0aW8gXG4gICAgICAgID8gJzxpbWcgaGVpZ2h0PVwiJyArIHdpbmRvdy5pbm5lckhlaWdodCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPidcbiAgICAgICAgOiAnPGltZyB3aWR0aD1cIicgKyB3aW5kb3cuaW5uZXJXaWR0aCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdkb20nKSB7XG4gICAgICAgIGh0bWwuaW5uZXJIVE1MID0gJzxkaXYgc3R5bGU9XCJoZWlnaHQ6JyArIGl0ZW0uaGVpZ2h0ICsgJzt3aWR0aDonICsgaXRlbS53aWR0aCArICc7XCI+JyArIGl0ZW0uY29udGVudCArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHJldHVybiBodG1sO1xufTtcblxuLy9yZW5kZXIgbGlzdCBodG1sXG5NU2xpZGVyLnByb3RvdHlwZS5fcmVuZGVySFRNTCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3V0ZXI7XG5cbiAgICBpZiAodGhpcy5vdXRlcikge1xuICAgICAgICB0aGlzLm91dGVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBvdXRlciA9IHRoaXMub3V0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIH1cblxuICAgIG91dGVyLnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgb3V0ZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuXG4gICAgLy9zdG9yYWdlIGxpIGVsZW1lbnRzXG4gICAgdGhpcy5lbHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xuICAgICAgICBsaS5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG4gICAgICAgIGxpLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyB0aGlzLmF4aXMgKyAnKCcgKyB0aGlzLnNjYWxlICogKGkgLSAxKSArICdweCknO1xuXG4gICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuICAgICAgICBvdXRlci5hcHBlbmRDaGlsZChsaSk7XG5cbiAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5fcmVuZGVySXRlbShpIC0gMSArIHRoaXMucGljSWR4KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3V0ZXIpIHtcbiAgICAgICAgdGhpcy5vdXRlciA9IG91dGVyO1xuICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIH1cbn07XG5cbi8vbG9naWNhbCBzbGlkZXJcbk1TbGlkZXIucHJvdG90eXBlLl9zbGlkZSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdmFyIGVscyA9IHRoaXMuZWxzO1xuICAgIHZhciBpZHggPSB0aGlzLnBpY0lkeCArIG47XG4gICAgXG4gICAgaWYgKCFkYXRhW2lkeF0gJiYgdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgdGhpcy5waWNJZHggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIGlmIChkYXRhW2lkeF0pIHtcbiAgICAgICAgdGhpcy5waWNJZHggPSBpZHg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbiA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5sb2codGhpcy5waWNJZHgpO1xuXG4gICAgdmFyIHNFbGU7XG4gICAgaWYgKG4gPiAwKSB7XG4gICAgICAgIHNFbGUgPSBlbHMuc2hpZnQoKTtcbiAgICAgICAgZWxzLnB1c2goc0VsZSk7XG4gICAgfSBlbHNlIGlmIChuIDwgMCkge1xuICAgICAgICBzRWxlID0gZWxzLnBvcCgpO1xuICAgICAgICBlbHMudW5zaGlmdChzRWxlKTtcbiAgICB9IFxuXG4gICAgaWYobiAhPT0gMCl7XG4gICAgICAgIHNFbGUuaW5uZXJIVE1MID0gdGhpcy5fcmVuZGVySXRlbShpZHggKyBuKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBpZiAoZWxzW2ldICE9PSBzRWxlKSB7XG4gICAgICAgICAgICBlbHNbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgLjJzJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsc1tpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAwcyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyB0aGlzLmF4aXMgKyAnKCcgKyB0aGlzLnNjYWxlICogKGkgLSAxKSArICdweCknO1xuICAgIH1cbn07XG5cbi8vYmluZCBhbGwgZXZlbnQgaGFuZGxlclxuTVNsaWRlci5wcm90b3R5cGUuX2JpbmRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgc2NhbGVXID0gc2VsZi5zY2FsZVc7XG4gICAgdmFyIG91dGVyID0gc2VsZi5vdXRlcjtcbiAgICB2YXIgbGVuID0gc2VsZi5kYXRhLmxlbmd0aDtcblxuICAgIHZhciBzdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHNlbGYucGF1c2UoKTtcbiAgICAgICAgc2VsZi5iZWZvcmVzbGlkZSAmJiBzZWxmLmJlZm9yZXNsaWRlKCk7XG4gICAgICAgIHNlbGYubG9nKCdFdmVudDogYmVmb3Jlc2xpZGUnKTtcblxuICAgICAgICBzZWxmLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBzZWxmLnN0YXJ0WCA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICBzZWxmLnN0YXJ0WSA9IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9ICdCT0RZJykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfTtcblxuICAgIHZhciBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGYub25zbGlkZSAmJiBzZWxmLm9uc2xpZGUoKTtcbiAgICAgICAgc2VsZi5sb2coJ0V2ZW50OiBvbnNsaWRlJyk7XG5cbiAgICAgICAgXG4gICAgICAgIHZhciBheGlzID0gc2VsZi5heGlzO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZXZ0LnRhcmdldFRvdWNoZXNbMF1bJ3BhZ2UnICsgYXhpc10gLSBzZWxmWydzdGFydCcgKyBheGlzXTtcblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCAmJiBzZWxmLnBpY0lkeCA9PT0gMCB8fCBvZmZzZXQgPCAwICYmIHNlbGYucGljSWR4ID09PSBzZWxmLmRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZi5fZGFtcGluZyhvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZi5lbHNbaV07XG4gICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2VsZi5zY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLm9mZnNldCA9IG9mZnNldDtcbiAgICB9O1xuXG4gICAgdmFyIGVuZEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBib3VuZGFyeSA9IHNlbGYuc2NhbGUgLyA2O1xuICAgICAgICB2YXIgbWV0cmljID0gc2VsZi5vZmZzZXQ7XG4gICAgICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgaWYgKGVuZFRpbWUgLSBzZWxmLnN0YXJ0VGltZSA+IDMwMCkge1xuICAgICAgICAgICAgaWYgKG1ldHJpYyA+PSBib3VuZGFyeSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKC0xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0cmljIDwgLWJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fc2xpZGUoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5sb2cobWV0cmljKTtcbiAgICAgICAgICAgIGlmIChtZXRyaWMgPiA1MCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKC0xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0cmljIDwgLTUwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fc2xpZGUoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5vZmZzZXQgPSAwO1xuICAgICAgICBzZWxmLmlzQXV0b3BsYXkgJiYgc2VsZi5wbGF5KHNlbGYuZHVyYXRpb24pO1xuICAgICAgICBzZWxmLmFmdGVyc2xpZGUgJiYgc2VsZi5hZnRlcnNsaWRlKCk7XG4gICAgICAgIHNlbGYubG9nKCdFdmVudDogYWZ0ZXJzbGlkZScpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLl9zZXR0aW5nKHNlbGYuX29wdHMpO1xuICAgICAgICAgICAgc2VsZi5fcmVuZGVySFRNTCgpO1xuICAgICAgICAgICAgc2VsZi5sb2coJ0V2ZW50OiBvcmllbnRhdGlvbmNoYW5nZScpO1xuICAgICAgICB9LDEwMCk7XG4gICAgfTtcblxuICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzdGFydEhhbmRsZXIpO1xuICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdmVIYW5kbGVyKTtcbiAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGVuZEhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uY2hhbmdlSGFuZGxlcik7XG59O1xuXG4vL2VuYWJsZSBhdXRvcGxheVxuTVNsaWRlci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmF1dG9QbGF5VGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX3NsaWRlKDEpO1xuICAgIH0sIGR1cmF0aW9uKTtcbn07XG5cbi8vcGF1c2UgYXV0b3BsYXlcbk1TbGlkZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUGxheVRpbWVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTVNsaWRlcjtcbiJdfQ==
