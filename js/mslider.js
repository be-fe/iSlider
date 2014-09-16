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
