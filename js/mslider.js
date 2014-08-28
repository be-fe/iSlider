var getType = function (obj) {
    return Object.prototype.toString.call(obj);
};
/*
    构造函数将opts中指定的参数传入this
*/
var MSlider = function (opts) {
    if (!opts.dom) {
        throw new Error("dom element can not be empty!");
    }
    //节点
    this.wrap = opts.dom;

    if ((!opts.data) || getType(opts.data) !== "[object Array]" || opts.data.length < 1) {
        throw new Error("data must be an array and must have more than one element!");
    }

    //列表数据
    this.data = opts.data;

    if (this.data.length > 1) {
        if (opts.loop) {
            this.loop = opts.loop;
            if (opts.autoPlay) {
                this.autoPlay = opts.autoPlay;
            }
        }
    }

    if (opts.verticle) {
        this.verticle = opts.verticle;
    }

    if (opts.layerContent) {
        this.layerContent = opts.layerContent;
    }

    if (this.layerContent === false) {
        this.imgPrefix = opts.imgPrefix ? opts.imgPrefix : this.imgPrefix;
        this.imgSubfix = opts.imgSubfix ? opts.imgSubfix : this.imgSubfix;
    }

    if (getType(opts.onBeforeSlide) === "[object Function]") {
        this.onBeforeSlide = opts.onBeforeSlide;
    }

    if (getType(opts.oneAfterSlide) === "[object Function]") {
        this.onAfterSlide = opts.oneAfterSlide;
    }

    this.init();
    this.renderDOM();
    this.bindDOM();
};

/*默认配置放在原型链中多个实例共享内存*/
var _MP = MSlider.prototype;
_MP.layerContent = false;
 //默认不自动滚动
_MP.autoPlay = false;
//垂直还是水平滚动
_MP.verticle = false;
_MP.loop = false;
_MP.imgSubfix = "";
_MP.imgPrefix = "";
var emptyFunction = function () {};
_MP.onBeforeSlide = emptyFunction;
_MP.onAfterSlide = emptyFunction;
/*
    利用屏幕的全部滑动距离来进行初始化，
    返回一个计算阻尼的函数。
    由于dampling效应在滑动时触发，为了尽量优化性能利用闭包进行性能优化。
*/
_MP.initDampingFunction = function (fullDistance) {
    var halfOfFull = fullDistance >> 1;
    var oneFourOfFull = halfOfFull >> 1;
    var oneEightOfFull = oneFourOfFull >> 1;
    var threeFourOfFull = halfOfFull + oneFourOfFull;
    var fiveSixteenOfFull = oneFourOfFull + (oneEightOfFull >> 1);
    return function (distance) {
        var negative;
        if (distance<0) {
            distance = -distance;
            negative = true;
        }
        var result;
        if (distance < halfOfFull) {
            result = distance >> 1;
        } else if (distance < threeFourOfFull) {
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

_MP.init = function () {
    this.ratio = window.innerHeight / window.innerWidth;
    this.scaleW = window.innerWidth;
    this.initDomIndex();
    this.damplingFunction = this.initDampingFunction(this.scaleW);
    this.initAutoPlay();
};

/*
    初始化 domIndexArr 其中存放的是 dom 中元素在 data 中的索引值。
    其最大长度为3。loop时长度一定为3。
    不loop时,如果data长度小于3 则长度为 data 长度, 否则长度为3。
    idx 值表示视口对准的项目
*/
_MP.initDomIndex = function () {
    var domIndexArr = [];
    var dataLength = this.data.length;
    if (this.loop === false) {
        var loopLength = dataLength > 3 ? 3 : dataLength;
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

_MP.initAutoPlay = function () {
    if (!this.autoPlay) return;
    var self = this;
    this.autoPlayTimeout = setTimeout(function () {
        self.goIndex('+1');
    }, this.autoPlay);
};
_MP.clearAutoPlay = function () {
    clearTimeout(this.autoPlayTimeout);
};

/*
    初始化ul列表中的li的时候使用i是li的index。
*/
_MP.createLi = function (i) {
    var li = document.createElement('li');
    var item = this.data[this.domIndexArr[i]];
    li.style.width = this.scaleW + 'px';
    var offsetI = i - this.idx;
    if (this.verticle) {
        li.style.webkitTransform = 'translate3d(0, ' + offsetI * this.scaleW + 'px, 0)';
    } else {
        li.style.webkitTransform = 'translate3d(' + offsetI * this.scaleW + 'px, 0, 0)';
    }
    if (this.layerContent) {
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
_MP.reUseLi = function (li,negOrPosOne) {
    var data = this.data;
    var domIndexArr = this.domIndexArr;
    var item = negOrPosOne === -1 ? data[domIndexArr[0]] : data[domIndexArr[2]];
    if (this.layerContent) {
        li.innerHTML = '<div style="height:' + item.height + '%;width:' + item.width + '%;">' + item.content + '</div>';
    } else {
        if (item.height / item.width > this.ratio) {
            li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item.content + '">';
        } else {
            li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item.content + '">';
        }
    }
};

/*
    渲染dom
*/
_MP.renderDOM = function () {
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

_MP.goIndex = function (n) {
    var domIndexArr = this.domIndexArr;
    var domIndexArrHash = this.domIndexArrHash;
    var outer = this.outer;
    var listLength = this.data.length;
    var newChild;
    var tmp;
    var loop = this.loop;
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
            } else {
                this.idx = 0;
            }
        } else {
           if (this.idx === 2) {
                this.idx = 1;
           }
        }
        
    }
    console.log(domIndexArr);
    console.log(this.idx);
    //console.log(domIndexArrLength);
    for (var i = 0; i < domIndexArrHash.length; i++) {
        if (i===noTransitionTimeId) {
            domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0s ease-out';
        } else {
            domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        }
        domIndexArrHash[i].style.webkitTransform = 'translate3d(' + (i-this.idx) * this.scaleW + 'px, 0, 0)';
    }
    this.initAutoPlay();
};

_MP.bindDOM = function () {
    var self = this;
    var scaleW = self.scaleW;
    var outer = self.outer;
    var len = self.data.length;

    var startHandler = function (evt) {
        self.startTime = new Date() * 1;
        self.startX = evt.touches[0].pageX;
        self.offsetX = 0;
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
        var arrLength = self.domIndexArrHash.length;
        var domIndexArrHash = self.domIndexArrHash;
        for (i=0; i < arrLength; i++) {
            if (domIndexArrHash[i]) {
                domIndexArrHash[i].style.webkitTransition = '-webkit-transform 0s ease-out';
            }
            if (domIndexArrHash[i]) {
                if ((self.idx === 0 && self.offsetX>0) || (self.idx === 2&&self.offsetX<0)) {
                    domIndexArrHash[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * self.scaleW + self.damplingFunction(self.offsetX)) + 'px, 0, 0)';
                } else {
                    domIndexArrHash[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * self.scaleW + self.offsetX) + 'px, 0, 0)';
                }
            }
        }
    };
    var endHandler = function (evt) {
        evt.preventDefault();
        var boundary = scaleW / 6;
        var endTime = new Date() * 1;
        var lis = outer.getElementsByTagName('li');
        if (endTime - self.startTime > 300) {
            if (self.offsetX >= boundary) {
                self.goIndex('-1');
            } else if (self.offsetX < -boundary) {
                self.goIndex('+1');
            } else {
                self.goIndex('0');
            }
        } else {
            if (self.offsetX > 50) {
                self.goIndex('-1');
            } else if (self.offsetX < -50) {
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
