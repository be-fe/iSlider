/**
 * iSlider 
 * A simple, efficent mobile slider
 * @Author qbatyqi
 *
 * @param {Object}      opts                参数集
 * @param {Element}     opts.dom            外层元素        Outer wrapper
 * @param {Object}      opts.data           数据列表        Content data
 * Please refer to README                   请参考README
 * @class 
 */
var iSlider = function (opts) {
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
iSlider.prototype._setting = function () {
    var opts = this._opts;

    //dom element wrapping pics
    this.wrap = opts.dom;

    //pics data
    this.data = opts.data;
    
    //default type
    this.type = opts.type || 'pic';
    //default slide direction
    this.isVertical = opts.isVertical || false;

    //Callback function when your finger is moving
    this.onslide = opts.onslide;
    //Callback function when your finger touch the screen
    this.onslidestart = opts.onslidestart;
    //Callback function when the finger move out of the screen
    this.onslideend = opts.onslideend;
    //Callback function when the finger move out of the screen
    this.onslidechange = opts.onslidechange;
    //Slide time gap
    this.duration = opts.duration || 2000;

    //debug mode
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

    //Autoplay mode
    if (this.isAutoplay) {
        this.play();
    }

    //set Damping function
    this._setUpDamping();

    //set animate Function
    this._animateFunc = (opts.animateType in this._animateFuncs) 
    ? this._animateFuncs[opts.animateType] 
    : this._animateFuncs['default'];

    //stop autoplay when window blur
    this._setPlayWhenFocus();
};

//fixed bug for android device
iSlider.prototype._setPlayWhenFocus = function() {
    var self = this;
    window.addEventListener('focus', function() {
        self.isAutoplay && self.play();
    }, false);
    window.addEventListener('blur', function() {
        self.pause();
    }, false);
}

//animate function options
/**
 * animation parmas: 
 *
 * @param {Element}      dom             图片的外层<li>容器       Img wrapper
 * @param {String}       axis            动画方向                animate direction
 * @param {Number}       scale           容器宽度                Outer wrapper
 * @param {Number}       i               <li>容器index           Img wrapper's index
 * @param {Number}       offset          滑动距离                move distance
 */
iSlider.prototype._animateFuncs = {

    'default': function (dom, axis, scale, i, offset) {
        dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
    },

    'rotate': function (dom, axis, scale, i, offset) {
        var rotateDirect = (axis == "X") ? "Y" : "X";
        var absoluteOffset = Math.abs(offset);
        var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
        if (this.isVertical){ offset = -offset; }

        this.wrap.style.webkitPerspective = scale * 4;

        if (i == 1) {
            dom.style.zIndex = scale - absoluteOffset;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
        }
        
        dom.style.backgroundColor = bdColor || '#333';
        dom.style.position = 'absolute';
        dom.style.webkitBackfaceVisibility = 'hidden';
        dom.style.webkitTransformStyle = 'preserve-3d'; 
        dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + 90 * (offset/scale + i - 1)+ 'deg) translateZ(' + (0.888 * scale/2) + 'px) scale(0.888)';
    },

    'flip': function (dom, axis, scale, i, offset) {
        var rotateDirect = (axis == "X") ? "Y" : "X";
        var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
        if (this.isVertical){ offset = -offset; }

        this.wrap.style.webkitPerspective = scale * 4;

        if (offset > 0) {
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
        } else {
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
        }

        dom.style.backgroundColor = bdColor || '#333';
        dom.style.position = 'absolute';
        dom.style.webkitBackfaceVisibility = 'hidden';
        dom.style.webkitTransform = 'translateZ('+ (scale/2) +'px) rotate' + rotateDirect + '(' + 180 * (offset/scale + i - 1)+ 'deg) scale(0.875)';
    },

    'depth': function (dom, axis, scale, i, offset) {
        var rotateDirect = (axis == "X") ? "Y" : "X";
        var zoomScale = (4 - Math.abs(i - 1)) * 0.15;

        this.wrap.style.webkitPerspective = scale * 4;

        if (i == 1) {
            dom.style.zIndex = 100;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) : (i - 1);
        }

        dom.style.webkitTransform = 'scale('+ zoomScale + ', '+ zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
    },

    'tear': function (dom, axis, scale, i, offset) {
        var rotateDirect = (axis == "X") ? "Y" : "X";
        var zoomScale = 1 - (Math.abs(i - 1) * 0.2);

        this.wrap.style.webkitPerspective = scale * 4;

        if (i == 1) {
            dom.style.zIndex = 100;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) : (i - 1);
        }

        dom.style.webkitTransform = 'scale('+ zoomScale + ', '+ zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
    }
}

//enable damping when slider meet the edge
iSlider.prototype._setUpDamping = function () {
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
iSlider.prototype._renderItem = function (i) {
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
    } else if (this.type === 'overspread') {
        html = this.ratio < 1 
        ? '<div style="height: 100%; width:100%; background:url(' + item.content + ') center no-repeat; background-size:' + this.width + 'px auto;"></div>'
        : '<div style="height: 100%; width:100%; background:url(' + item.content + ') center no-repeat; background-size: auto ' + this.height + 'px;"></div>';
    }

    return html;
};

//render list html
iSlider.prototype._renderHTML = function () {
    var outer;

    if (this.outer) {
        //used for reset
        this.outer.innerHTML = '';
        outer = this.outer;
    } else {
        //used for initialization
        outer = document.createElement('ul');
    }

    //ul width equels to div#canvas width
    outer.style.width = this.width + 'px';
    outer.style.height = this.height + 'px';

    //storage li elements, only store 3 elements to reduce memory usage
    this.els = [];
    for (var i = 0; i < 3; i++) {
        var li = document.createElement('li');
        li.style.width = this.width + 'px';
        li.style.height = this.height + 'px';

        //prepare style animation
        this._animateFunc(li, this.axis, this.scale, i, 0);

        this.els.push(li);
        outer.appendChild(li);

        if (this.isVertical && (this._opts.animateType == 'rotate' || this._opts.animateType == 'flip')) {
            li.innerHTML = this._renderItem(1 - i + this.sliderIndex);
        } else {
            li.innerHTML = this._renderItem(i - 1 + this.sliderIndex);
        }
    }

    //append ul to div#canvas
    if (!this.outer) {
        this.outer = outer;
        this.wrap.appendChild(outer);
    }
};

//logical slider, control left or right
iSlider.prototype._slide = function (n) {
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
    if ( this.isVertical && (this._opts.animateType == 'rotate' || this._opts.animateType == 'flip')) {
        if (n > 0) {
            sEle = els.pop();
            els.unshift(sEle);
        } else if (n < 0) {
            sEle = els.shift();
            els.push(sEle);
        }
    } else {
        if (n > 0) {
            sEle = els.shift();
            els.push(sEle);
        } else if (n < 0) {
            sEle = els.pop();
            els.unshift(sEle);
        }
    }

    if (n !== 0) {
        sEle.innerHTML = this._renderItem(idx + n);
        sEle.style.webkitTransition = 'none';
        sEle.style.visibility = 'hidden';

        setTimeout(function() {
            sEle.style.visibility = 'visible';
        }, 200);

        this.onslidechange && this.onslidechange(this.sliderIndex);
    }

    for (var i = 0; i < 3; i++) {
        if (els[i] !== sEle) {
            els[i].style.webkitTransition = 'all .3s ease';
        }
        this._animateFunc(els[i], this.axis, this.scale, i, 0);
    }

    if (this.isAutoplay) {
        if (this.sliderIndex === data.length - 1 && !this.isLooping) {
            this.pause();
        }
    }
};

//bind all event handler
iSlider.prototype._bindHandler = function () {
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
            self._animateFunc(item, axis, self.scale, i, offset);
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

        self.isAutoplay && self.play();
        self.offset = 0;
        self.onslideend && self.onslideend();
        self.log('Event: afterslide');
    };

    var orientationchangeHandler = function (evt) {
        setTimeout(function() {
            self.reset();
            self.log('Event: orientationchange');
        },100);
    };

    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
    window.addEventListener('orientationchange', orientationchangeHandler);
};

iSlider.prototype.reset = function () {
    this.pause();
    this._setting();
    this._renderHTML();
    this.isAutoplay && this.play();
};

//enable autoplay
iSlider.prototype.play = function () {
    var self = this;
    var duration = this.duration;
    clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = setInterval(function () {
        self._slide(1);
    }, duration);
};

//pause autoplay
iSlider.prototype.pause = function () {
    clearInterval(this.autoPlayTimer);
};

//plugin extend
iSlider.prototype.extend = function(plugin){
    var fn = iSlider.prototype;
    Object.keys(plugin).forEach(function(property) {
        Object.defineProperty(fn, property, Object.getOwnPropertyDescriptor( plugin, property ) );
    })
}