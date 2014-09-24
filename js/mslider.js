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

    this.log = opts.isDebug 
    ? function (str) { console.log(str) }
    : function (){};

    this.axis = this.isVertical ? 'Y' : 'X';
    this.width = this.wrap.clientWidth;
    this.height = this.wrap.clientHeight;
    this.ratio = this.height / this.width;
    this.scale = opts.isVertical ? this.height : this.width;

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
        this.play();
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
        ? '<img height="' + this.height + '" src="' + item.content + '">'
        : '<img width="' + this.width + '" src="' + item.content + '">';
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

    this.log('pic idx:' + this.picIdx);

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
        this.onslidechange && this.onslidechange();
    }

    for (var i = 0; i < 3; i++) {
        if (els[i] !== sEle) {
            els[i].style.webkitTransition = 'all .3s ease';
        } else {
            els[i].style.webkitTransition = 'all 0s';
        }
        els[i].style.webkitTransform = 'translateZ(0) translate' + this.axis + '(' + this.scale * (i - 1) + 'px)';
    }

    this.isAutoplay && this.play();
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

        var boundary = self.scale / 3;
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
