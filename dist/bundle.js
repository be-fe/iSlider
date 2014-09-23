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
    isVerticle: false,
    isLooping: true
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
        this.isAutoPlay = opts.isAutoPlay || false;
    }

    if (this.isAutoPlay) {
        this.play(500);
    }

    //storage li elements
    this.els = [];
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
MSlider.prototype._renderItem = function (n) {
    var item, html;
    var len = this.data.length;

    if (!this.isLooping) {
        item = this.data[n] || { empty : true };
    } else {
        if (n < 0) {
            item = this.data[len + n];
        } else if (n > len - 1) {
            item = this.data[n - len];
        } else {
            item = this.data[n];
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
    var outer = document.createElement('ul');
    outer.style.width = this.width + 'px';
    outer.style.height = this.height + 'px';

    for (var i = 0; i < 3; i++) {
        var li = document.createElement('li');
        li.style.width = this.width + 'px';
        li.style.height = this.height + 'px';
        li.style.webkitTransform = 'translateZ(0) translate' + this.axis + '(' + this.scale * (i - 1) + 'px)';

        this.els.push(li);
        outer.appendChild(li);

        li.innerHTML = this._renderItem(i - 1 + this.picIdx);
    }
    this.outer = outer;
    this.wrap.appendChild(outer);
};

//logical slider
MSlider.prototype._slide = function (n) {
    var data = this.data;
    var els = this.els;
    var idx = this.picIdx + n;
    
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

    if (!data[idx] && this.isLooping) {
        this.picIdx = n > 0 ? 0 : data.length - 1;
    } else {
        this.picIdx = idx;
    }

    for (var i = 0; i < 3; i++) {
        if (els[i] !== sEle) {
            els[i].style.webkitTransition = 'all .2s';
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
            if (metric > 50) {
                self._slide(-1);
            } else if (metric < -50) {
                self._slide(1);
            } else {
                self._slide(0);
            }
        }

        self.isAutoPlay && self.play();
        self.afterslide && self.afterslide();
    };

    var orientationchangeHandler = function (evt) {
        //reset

    };

    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
    window.addEventListener('orientationchange', orientationchangeHandler);
};

//enable autoplay
MSlider.prototype.play = function (duration) {
    var self = this;
    this.autoPlayTimer = setTimeout(function () {
        self.goIndex('+1');
    }, duration);
};

//pause autoplay
MSlider.prototype.pause = function () {
    clearTimeout(this.autoPlayTimer);
};

module.exports = MSlider;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYmF0eXFpL0RvY3VtZW50cy9Db2RlL01TbGlkZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4vanMvYXBwLmpzIiwiL1VzZXJzL3FiYXR5cWkvRG9jdW1lbnRzL0NvZGUvTVNsaWRlci9qcy9tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTVNsaWRlciA9IHJlcXVpcmUoJy4vbXNsaWRlcicpO1xudmFyIGxpc3QgPSBbe1xuXHRoZWlnaHQ6IDQ3NSxcblx0d2lkdGg6IDQwMCxcblx0Y29udGVudDogXCJpbWdzLzEuanBnXCIsXG59LHtcblx0aGVpZ2h0OiA1MjcsXG5cdHdpZHRoOiA0MDAsXG5cdGNvbnRlbnQ6IFwiaW1ncy8yLmpwZ1wiLFxufSx7XG4gXHRoZWlnaHQ6IDQwMCxcbiBcdHdpZHRoOiA1MTIsXG4gXHRjb250ZW50OiBcImltZ3MvMy5qcGdcIixcbn0se1xuXHRoZWlnaHQ6IDQwMCxcblx0d2lkdGg6IDQ1OCxcblx0Y29udGVudDpcImltZ3MvNS5qcGdcIlxufSx7XG5cdGhlaWdodDogNDAwLFxuXHR3aWR0aDogNDk4LFxuXHRjb250ZW50OlwiaW1ncy82LmpwZ1wiXG59LHtcblx0aGVpZ2h0OiAzNzcsXG5cdHdpZHRoOiA2MDAsXG5cdGNvbnRlbnQ6XCJpbWdzLzcuanBnXCJcbn0se1xuXHRoZWlnaHQ6IDM5Nixcblx0d2lkdGg6IDYwMCxcblx0Y29udGVudDpcImltZ3MvOC5qcGdcIlxufSx7XG5cdGhlaWdodDogMzc0LFxuXHR3aWR0aDogNjAwLFxuXHRjb250ZW50OlwiaW1ncy85LmpwZ1wiXG59XTtcblx0XG5tc2xpZGVyID0gbmV3IE1TbGlkZXIoe1xuICAgIGRhdGE6IGxpc3QsXG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSxcbiAgICBpc1ZlcnRpY2xlOiBmYWxzZSxcbiAgICBpc0xvb3Bpbmc6IHRydWVcbn0pO1xuIiwiLyoqXG4gKiBNU2xpZGVyIFxuICogQSBzaW1wbGUsIGVmZmljZW5jeSBtb2JpbGUgc2xpZGVyXG4gKiBAQXV0aG9yIHFiYXR5cWlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyDlj4LmlbDpm4ZcbiAqIEBwYXJhbSB7RWxlbWVudH0gb3B0cy5kb20g5aSW5bGC5YWD57SgIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMuZGF0YSDmlbDmja7liJfooahcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5pc1ZlcnRpY2xlIOaYr+WQpuerluebtOa7muWKqFxuICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmlzTG9vcGluZyDmmK/lkKblvqrnjq9cbiAqXG4gKiBAY2xhc3MgXG4gKi9cbnZhciBNU2xpZGVyID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMuZG9tKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImRvbSBlbGVtZW50IGNhbiBub3QgYmUgZW1wdHkhXCIpO1xuICAgIH1cblxuICAgIGlmICghb3B0cy5kYXRhIHx8ICFvcHRzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgbXVzdCBiZSBhbiBhcnJheSBhbmQgbXVzdCBoYXZlIG1vcmUgdGhhbiBvbmUgZWxlbWVudCFcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0dGluZyhvcHRzKTtcbiAgICB0aGlzLl9yZW5kZXJIVE1MKCk7XG4gICAgdGhpcy5fYmluZEhhbmRsZXIoKTtcbn07XG5cbi8vc2V0dGluZyBwYXJhbWV0ZXJzIGZvciBzbGlkZXJcbk1TbGlkZXIucHJvdG90eXBlLl9zZXR0aW5nID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcbiAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG4gICAgLy9kZWZhdWx0IHR5cGVcbiAgICB0aGlzLnR5cGUgPSBvcHRzLnR5cGUgfHwgJ3BpYyc7XG4gICAgLy9kZWZhdWx0IHNsaWRlIGRpcmVjdGlvblxuICAgIHRoaXMuaXNWZXJ0aWNsZSA9IG9wdHMuaXNWZXJ0aWNsZSB8fCBmYWxzZTtcblxuICAgIHRoaXMuYXhpcyA9IHRoaXMuaXNWZXJ0aWNsZSA/ICdZJyA6ICdYJztcbiAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53cmFwLmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnJhdGlvID0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xuICAgIHRoaXMuc2NhbGUgPSBvcHRzLmlzVmVydGljbGUgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAvL3N0YXJ0IGZyb20gMFxuICAgIHRoaXMucGljSWR4ID0gdGhpcy5waWNJZHggfHwgMDtcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQXV0b1BsYXkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IG9wdHMuaXNMb29waW5nIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQXV0b1BsYXkgPSBvcHRzLmlzQXV0b1BsYXkgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBdXRvUGxheSkge1xuICAgICAgICB0aGlzLnBsYXkoNTAwKTtcbiAgICB9XG5cbiAgICAvL3N0b3JhZ2UgbGkgZWxlbWVudHNcbiAgICB0aGlzLmVscyA9IFtdO1xuICAgIC8vc2V0IERhbXBpbmcgZnVuY3Rpb25cbiAgICB0aGlzLl9zZXRVcERhbXBpbmcoKTtcbn07XG5cbi8vZW5hYmxlIGRhbXBpbmcgd2hlbiBzbGlkZXIgbWVldCB0aGUgZWRnZVxuTVNsaWRlci5wcm90b3R5cGUuX3NldFVwRGFtcGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb25lSW4yID0gdGhpcy5zY2FsZSA+PiAxO1xuICAgIHZhciBvbmVJbjQgPSBvbmVJbjIgPj4gMTtcbiAgICB2YXIgb25lSW4xNiA9IG9uZUluNCA+PiAyO1xuXG4gICAgdGhpcy5fZGFtcGluZyA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnMoZGlzdGFuY2UpO1xuICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGRpcyA+PiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcyA8IG9uZUluMiArIG9uZUluNCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgb25lSW4xNiArICgoZGlzIC0gb25lSW4yIC0gb25lSW40KSA+PiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA+IDAgPyByZXN1bHQgOiAtcmVzdWx0O1xuICAgIH07XG59O1xuXG4vL3JlbmRlciBzaW5nbGUgaXRlbSBodG1sIGJ5IGlkeFxuTVNsaWRlci5wcm90b3R5cGUuX3JlbmRlckl0ZW0gPSBmdW5jdGlvbiAobikge1xuICAgIHZhciBpdGVtLCBodG1sO1xuICAgIHZhciBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuXG4gICAgaWYgKCF0aGlzLmlzTG9vcGluZykge1xuICAgICAgICBpdGVtID0gdGhpcy5kYXRhW25dIHx8IHsgZW1wdHkgOiB0cnVlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPCAwKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2xlbiArIG5dO1xuICAgICAgICB9IGVsc2UgaWYgKG4gPiBsZW4gLSAxKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW24gLSBsZW5dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtuXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpdGVtLmVtcHR5KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAncGljJykge1xuICAgICAgICBodG1sID0gaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbyBcbiAgICAgICAgPyAnPGltZyBoZWlnaHQ9XCInICsgd2luZG93LmlubmVySGVpZ2h0ICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+J1xuICAgICAgICA6ICc8aW1nIHdpZHRoPVwiJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+JztcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2RvbScpIHtcbiAgICAgICAgaHRtbC5pbm5lckhUTUwgPSAnPGRpdiBzdHlsZT1cImhlaWdodDonICsgaXRlbS5oZWlnaHQgKyAnO3dpZHRoOicgKyBpdGVtLndpZHRoICsgJztcIj4nICsgaXRlbS5jb250ZW50ICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWw7XG59O1xuXG4vL3JlbmRlciBsaXN0IGh0bWxcbk1TbGlkZXIucHJvdG90eXBlLl9yZW5kZXJIVE1MID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcbiAgICBvdXRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xuICAgICAgICBsaS5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG4gICAgICAgIGxpLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyB0aGlzLmF4aXMgKyAnKCcgKyB0aGlzLnNjYWxlICogKGkgLSAxKSArICdweCknO1xuXG4gICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuICAgICAgICBvdXRlci5hcHBlbmRDaGlsZChsaSk7XG5cbiAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5fcmVuZGVySXRlbShpIC0gMSArIHRoaXMucGljSWR4KTtcbiAgICB9XG4gICAgdGhpcy5vdXRlciA9IG91dGVyO1xuICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChvdXRlcik7XG59O1xuXG4vL2xvZ2ljYWwgc2xpZGVyXG5NU2xpZGVyLnByb3RvdHlwZS5fc2xpZGUgPSBmdW5jdGlvbiAobikge1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICAgIHZhciBlbHMgPSB0aGlzLmVscztcbiAgICB2YXIgaWR4ID0gdGhpcy5waWNJZHggKyBuO1xuICAgIFxuICAgIHZhciBzRWxlO1xuICAgIGlmIChuID4gMCkge1xuICAgICAgICBzRWxlID0gZWxzLnNoaWZ0KCk7XG4gICAgICAgIGVscy5wdXNoKHNFbGUpO1xuICAgIH0gZWxzZSBpZiAobiA8IDApIHtcbiAgICAgICAgc0VsZSA9IGVscy5wb3AoKTtcbiAgICAgICAgZWxzLnVuc2hpZnQoc0VsZSk7XG4gICAgfSBcblxuICAgIGlmKG4gIT09IDApe1xuICAgICAgICBzRWxlLmlubmVySFRNTCA9IHRoaXMuX3JlbmRlckl0ZW0oaWR4ICsgbik7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhW2lkeF0gJiYgdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgdGhpcy5waWNJZHggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5waWNJZHggPSBpZHg7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaWYgKGVsc1tpXSAhPT0gc0VsZSkge1xuICAgICAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIC4ycyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyB0aGlzLmF4aXMgKyAnKCcgKyB0aGlzLnNjYWxlICogKGkgLSAxKSArICdweCknO1xuICAgIH1cbn07XG5cbi8vYmluZCBhbGwgZXZlbnQgaGFuZGxlclxuTVNsaWRlci5wcm90b3R5cGUuX2JpbmRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgc2NhbGVXID0gc2VsZi5zY2FsZVc7XG4gICAgdmFyIG91dGVyID0gc2VsZi5vdXRlcjtcbiAgICB2YXIgbGVuID0gc2VsZi5kYXRhLmxlbmd0aDtcblxuICAgIHZhciBzdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHNlbGYucGF1c2UoKTtcbiAgICAgICAgc2VsZi5iZWZvcmVzbGlkZSAmJiBzZWxmLmJlZm9yZXNsaWRlKCk7XG5cbiAgICAgICAgc2VsZi5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgc2VsZi5zdGFydFggPSBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgc2VsZi5zdGFydFkgPSBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5ub2RlTmFtZSAhPSAnTEknICYmIHRhcmdldC5ub2RlTmFtZSAhPSAnQk9EWScpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYudGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgfTtcblxuICAgIHZhciBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGYub25zbGlkZSAmJiBzZWxmLm9uc2xpZGUoKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBheGlzID0gc2VsZi5heGlzO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZXZ0LnRhcmdldFRvdWNoZXNbMF1bJ3BhZ2UnICsgYXhpc10gLSBzZWxmWydzdGFydCcgKyBheGlzXTtcblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCAmJiBzZWxmLnBpY0lkeCA9PT0gMCB8fCBvZmZzZXQgPCAwICYmIHNlbGYucGljSWR4ID09PSBzZWxmLmRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZi5fZGFtcGluZyhvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZi5lbHNbaV07XG4gICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2VsZi5zY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLm9mZnNldCA9IG9mZnNldDtcbiAgICB9O1xuICAgIHZhciBlbmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgYm91bmRhcnkgPSBzZWxmLnNjYWxlIC8gNjtcbiAgICAgICAgdmFyIG1ldHJpYyA9IHNlbGYub2Zmc2V0O1xuICAgICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmIChlbmRUaW1lIC0gc2VsZi5zdGFydFRpbWUgPiAzMDApIHtcbiAgICAgICAgICAgIGlmIChtZXRyaWMgPj0gYm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zbGlkZSgtMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldHJpYyA8IC1ib3VuZGFyeSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zbGlkZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtZXRyaWMgPiA1MCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKC0xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0cmljIDwgLTUwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fc2xpZGUoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NsaWRlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5pc0F1dG9QbGF5ICYmIHNlbGYucGxheSgpO1xuICAgICAgICBzZWxmLmFmdGVyc2xpZGUgJiYgc2VsZi5hZnRlcnNsaWRlKCk7XG4gICAgfTtcblxuICAgIHZhciBvcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIC8vcmVzZXRcblxuICAgIH07XG5cbiAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc3RhcnRIYW5kbGVyKTtcbiAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3ZlSGFuZGxlcik7XG4gICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlbmRIYW5kbGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIpO1xufTtcblxuLy9lbmFibGUgYXV0b3BsYXlcbk1TbGlkZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5hdXRvUGxheVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZ29JbmRleCgnKzEnKTtcbiAgICB9LCBkdXJhdGlvbik7XG59O1xuXG4vL3BhdXNlIGF1dG9wbGF5XG5NU2xpZGVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hdXRvUGxheVRpbWVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTVNsaWRlcjtcbiJdfQ==
