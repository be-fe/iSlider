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
    var axis = this.isVerticle ? 'translateY' : 'translateX';

    if (n > 0) {
        
    } else if (n === "-1") {
        
    }

    for (var i = 0; i < 3 i++) {

        if (i === noTransitionTimeId) {
            domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0s ease-out';
        } else {
            domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        }

        li.style.webkitTransform = 'translateZ(0) ' + axis + '(' + this.scale * i + 'px)';
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
