;(function() {
/**
 * @file   iSlider, a simple, efficent mobile slider solution
 *
 * @author BEFE
 * Contact qbaty.qi@gmail.com
 *
 * LICENSE
 * https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */
/**
 * @constructor
 * @param {Object}      opts                参数集
 * @param {Element}     opts.dom            外层元素        Outer wrapper
 * @param {Object}      opts.data           数据列表        Content data
 */
var iSlider, islider_core, plugins_islider_animate, plugins_islider_zoom, plugins_islider_button, plugins_islider_dot;
iSlider = function () {
  
  var iSlider = function (opts) {
    if (!opts.dom) {
      throw new Error('dom element can not be empty!');
    }
    if (!opts.data || !opts.data.length) {
      throw new Error('data must be an array and must have more than one element!');
    }
    this._opts = opts;
    this._setting();
    this._renderHTML();
    this._bindHandler();
  };
  // setting parameters for slider
  iSlider.prototype._setting = function () {
    var opts = this._opts;
    // dom element wrapping content
    this.wrap = opts.dom;
    // your data
    this.data = opts.data;
    // default type
    this.type = opts.type || 'pic';
    // default slide direction
    this.isVertical = opts.isVertical || false;
    // Overspread mode
    this.isOverspread = opts.isOverspread || false;
    // Play time gap
    this.duration = opts.duration || 2000;
    // start from initIndex or 0
    this.initIndex = opts.initIndex || 0;
    // touchstart prevent default to fixPage
    this.fixPage = opts.fixPage || true;
    if (this.initIndex > this.data.length - 1 || this.initIndex < 0) {
      this.initIndex = 0;
    }
    this.slideIndex = this.slideIndex || this.initIndex || 0;
    this.axis = this.isVertical ? 'Y' : 'X';
    this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';
    this.width = this.wrap.clientWidth;
    this.height = this.wrap.clientHeight;
    this.ratio = this.height / this.width;
    this.scale = opts.isVertical ? this.height : this.width;
    // Callback function when your finger is moving
    this.onslide = opts.onslide;
    // Callback function when your finger touch the screen
    this.onslidestart = opts.onslidestart;
    // Callback function when the finger move out of the screen
    this.onslideend = opts.onslideend;
    // Callback function when the finger move out of the screen
    this.onslidechange = opts.onslidechange;
    this.offset = this.offset || {
      X: 0,
      Y: 0
    };
    this.useZoom = opts.useZoom || false;
    // looping logic adjust
    if (this.data.length < 2) {
      this.isLooping = false;
      this.isAutoPlay = false;
    } else {
      this.isLooping = opts.isLooping || false;
      this.isAutoplay = opts.isAutoplay || false;
    }
    // little trick set, when you chooce tear & vertical same time
    // iSlider overspread mode will be set true autometicly
    if (opts.animateType === 'card' && this.isVertical) {
      this.isOverspread = true;
    }
    // Autoplay mode
    if (this.isAutoplay) {
      this.play();
    }
    if (this.useZoom) {
      this._initZoom(opts);
    }
    // debug mode
    this.log = opts.isDebug ? function (str) {
      window.console.log(str);
    } : function () {
    };
    // set Damping function
    this._setUpDamping();
    // stop autoplay when window blur
    this._setPlayWhenFocus();
    // set animate Function
    this._animateFunc = opts.animateType in this._animateFuncs ? this._animateFuncs[opts.animateType] : this._animateFuncs['default'];
  };
  // fixed bug for android device
  iSlider.prototype._setPlayWhenFocus = function () {
    window.addEventListener('focus', this, false);
    window.addEventListener('blur', this, false);
  };
  /**
   * animation parmas:
   *
   * @param {Element}      dom             图片的外层<li>容器       Img wrapper
   * @param {String}       axis            动画方向                animate direction
   * @param {Number}       scale           容器宽度                Outer wrapper
   * @param {Number}       i               <li>容器index          Img wrapper's index
   * @param {Number}       offset          滑动距离                move distance
   */
  iSlider.prototype._animateFuncs = {
    'default': function (dom, axis, scale, i, offset) {
      dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
    }
  };
  /**
   *  enable damping when slider meet the edge
   */
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
        result = oneIn4 + (dis - oneIn2 >> 2);
      } else {
        result = oneIn4 + oneIn16 + (dis - oneIn2 - oneIn4 >> 3);
      }
      return distance > 0 ? result : -result;
    };
  };
  /**
   * render single item html by idx
   * @param {element} el ..
   * @param {number}  i  ..
   */
  iSlider.prototype._renderItem = function (el, i) {
    var item;
    var html;
    var len = this.data.length;
    var self = this;
    var insertImg = function () {
      html = item.height / item.width > self.ratio ? '<img height="' + self.height + '" src="' + item.content + '">' : '<img width="' + self.width + '" src="' + item.content + '">';
      el.innerHTML = html;
    };
    // get the right item of data
    if (!this.isLooping) {
      item = this.data[i] || { empty: true };
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
      el.innerHTML = '';
      el.style.background = '';
      return;
    }
    if (this.type === 'pic') {
      if (!this.isOverspread) {
        if (item.height & item.width) {
          insertImg();
        } else {
          var currentImg = new Image();
          currentImg.src = item.content;
          currentImg.onload = function () {
            item.height = currentImg.height;
            item.width = currentImg.width;
            insertImg();
          };
        }
      } else {
        el.style.background = 'url(' + item.content + ') 50% 50% no-repeat';
        el.style.backgroundSize = 'cover';
      }
    } else if (this.type === 'dom') {
      el.innerHTML = item.content;
    }
  };
  /**
   * render list html
   */
  iSlider.prototype._renderHTML = function () {
    this.outer && (this.outer.innerHTML = '');
    // initail ul element
    var outer = this.outer || document.createElement('ul');
    outer.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;margin:0;padding:0;list-style:none;';
    // storage li elements, only store 3 elements to reduce memory usage
    this.els = [];
    for (var i = 0; i < 3; i++) {
      var li = document.createElement('li');
      li.className = this.type === 'dom' ? 'islider-dom' : 'islider-pic';
      li.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;';
      this.els.push(li);
      // prepare style animation
      this._animateFunc(li, this.axis, this.scale, i, 0);
      if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
        this._renderItem(li, 1 - i + this.slideIndex);
      } else {
        this._renderItem(li, i - 1 + this.slideIndex);
      }
      outer.appendChild(li);
    }
    this._initLoadImg();
    // append ul to div#canvas
    if (!this.outer) {
      this.outer = outer;
      this.wrap.appendChild(outer);
    }
  };
  /**
   *  preload img when slideChange
   *  @param {number} dataIndex means which image will be load
   */
  iSlider.prototype._preloadImg = function (dataIndex) {
    var len = this.data.length;
    var idx = dataIndex;
    var self = this;
    var loadImg = function (index) {
      if (!self.data[index].loaded) {
        var preloadImg = new Image();
        preloadImg.src = self.data[index].content;
        preloadImg.onload = function () {
          self.data[index].width = preloadImg.width;
          self.data[index].height = preloadImg.height;
        };
        self.data[index].loaded = 1;
      }
    };
    if (self.type !== 'dom') {
      var nextIndex = idx + 2 > len - 1 ? (idx + 2) % len : idx + 2;
      var prevIndex = idx - 2 < 0 ? len - 2 + idx : idx - 2;
      loadImg(nextIndex);
      loadImg(prevIndex);
    }
  };
  /**
   *  load extra imgs when renderHTML
   */
  iSlider.prototype._initLoadImg = function () {
    var data = this.data;
    var len = data.length;
    var idx = this.initIndex;
    var self = this;
    if (this.type !== 'dom' && len > 3) {
      var nextIndex = idx + 1 > len ? (idx + 1) % len : idx + 1;
      var prevIndex = idx - 1 < 0 ? len - 1 + idx : idx - 1;
      data[idx].loaded = 1;
      data[nextIndex].loaded = 1;
      if (self.isLooping) {
        data[prevIndex].loaded = 1;
      }
      setTimeout(function () {
        self._preloadImg(idx);
      }, 200);
    }
  };
  /**
   *  slide logical, goto data index
   *  @param {number} dataIndex the goto index
   */
  iSlider.prototype.slideTo = function (dataIndex) {
    var data = this.data;
    var els = this.els;
    var idx = dataIndex;
    var n = dataIndex - this.slideIndex;
    if (Math.abs(n) > 1) {
      var nextEls = n > 0 ? this.els[2] : this.els[0];
      this._renderItem(nextEls, idx);
    }
    // preload when slide
    this._preloadImg(idx);
    // get right item of data
    if (data[idx]) {
      this.slideIndex = idx;
    } else {
      if (this.isLooping) {
        this.slideIndex = n > 0 ? 0 : data.length - 1;
      } else {
        this.slideIndex = this.slideIndex;
        n = 0;
      }
    }
    this.log('pic idx:' + this.slideIndex);
    // keep the right order of items
    var sEle;
    if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
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
    // slidechange should render new item
    // and change new item style to fit animation
    if (n !== 0) {
      if (Math.abs(n) > 1) {
        this._renderItem(els[0], idx - 1);
        this._renderItem(els[2], idx + 1);
      } else if (Math.abs(n) === 1) {
        this._renderItem(sEle, idx + n);
      }
      sEle.style.webkitTransition = 'none';
      sEle.style.visibility = 'hidden';
      setTimeout(function () {
        sEle.style.visibility = 'visible';
      }, 200);
      this.onslidechange && this.onslidechange(this.slideIndex);
      this.dotchange && this.dotchange();
    }
    // do the trick animation
    for (var i = 0; i < 3; i++) {
      if (els[i] !== sEle) {
        els[i].style.webkitTransition = 'all .3s ease';
      }
      this._animateFunc(els[i], this.axis, this.scale, i, 0);
    }
    // stop playing when meet the end of data
    if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
      this.pause();
    }
  };
  /**
   *  judge the device
   *  @return {Object} {}
   */
  iSlider.prototype._device = function () {
    var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    var startEvt = hasTouch ? 'touchstart' : 'mousedown';
    var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
    var endEvt = hasTouch ? 'touchend' : 'mouseup';
    return {
      hasTouch: hasTouch,
      startEvt: startEvt,
      moveEvt: moveEvt,
      endEvt: endEvt
    };
  };
  /**
  * bind all event handler, when on PC, disable drag event。
  */
  iSlider.prototype._bindHandler = function () {
    var outer = this.outer;
    var device = this._device();
    if (!device.hasTouch) {
      outer.style.cursor = 'pointer';
      outer.ondragstart = function (evt) {
        if (evt) {
          return false;
        }
        return true;
      };
    }
    outer.addEventListener(device.startEvt, this);
    outer.addEventListener(device.moveEvt, this);
    outer.addEventListener(device.endEvt, this);
    window.addEventListener('orientationchange', this);
  };
  /**
  *  simple event delegate method
  *  @param {string}   evtType   event name
  *  @param {string}   selector  the simple css selector like jQuery
  *  @param {Function} callback  event callback
  */
  iSlider.prototype.bind = iSlider.prototype.delegate = function (evtType, selector, callback) {
    function handle(e) {
      var evt = window.event ? window.event : e;
      var target = evt.target;
      var eleArr = document.querySelectorAll(selector);
      for (var i = 0; i < eleArr.length; i++) {
        if (target === eleArr[i]) {
          callback.call(target);
          break;
        }
      }
    }
    this.wrap.addEventListener(evtType, handle, false);
  };
  /**
   *  removeEventListener to release the memory
   */
  iSlider.prototype.destroy = function () {
    var outer = this.outer;
    var device = this._device();
    outer.removeEventListener(device.startEvt, this);
    outer.removeEventListener(device.moveEvt, this);
    outer.removeEventListener(device.endEvt, this);
    window.removeEventListener('orientationchange', this);
    window.removeEventListener('focus', this);
    window.removeEventListener('blur', this);
    this.wrap.innerHTML = '';
  };
  /**
   *  uniformity admin event
   *  @param {Object}   evt   event obj
   */
  iSlider.prototype.handleEvent = function (evt) {
    var device = this._device();
    switch (evt.type) {
    case device.startEvt:
      this.startHandler(evt);
      break;
    case device.moveEvt:
      this.moveHandler(evt);
      break;
    case device.endEvt:
      this.endHandler(evt);
      break;
    case 'touchcancel':
      this.endHandler(evt);
      break;
    case 'orientationchange':
      this.orientationchangeHandler();
      break;
    case 'focus':
      this.isAutoplay && this.play();
      break;
    case 'blur':
      this.pause();
      break;
    }
  };
  /**
  *  touchstart callback
  *  @param {Object}   evt   event obj
  */
  iSlider.prototype.startHandler = function (evt) {
    if (this.fixPage) {
      var target = evt.target;
      if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        evt.preventDefault();
      }
    }
    var device = this._device();
    this.isMoving = true;
    this.pause();
    this.onslidestart && this.onslidestart();
    this.log('Event: beforeslide');
    this.startTime = new Date().getTime();
    this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
    this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
    this._startHandler && this._startHandler(evt);
  };
  /**
  *  touchmove callback
  *  @param {Object}   evt   event obj
  */
  iSlider.prototype.moveHandler = function (evt) {
    if (this.isMoving) {
      var device = this._device();
      var len = this.data.length;
      var axis = this.axis;
      var reverseAxis = this.reverseAxis;
      var offset = {
        X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
        Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
      };
      var res = this._moveHandler ? this._moveHandler(evt) : false;
      if (!res && Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
        evt.preventDefault();
        this.onslide && this.onslide(offset[axis]);
        this.log('Event: onslide');
        if (!this.isLooping) {
          if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
            offset[axis] = this._damping(offset[axis]);
          }
        }
        for (var i = 0; i < 3; i++) {
          var item = this.els[i];
          item.style.webkitTransition = 'all 0s';
          this._animateFunc(item, axis, this.scale, i, offset[axis]);
        }
      }
      this.offset = offset;
    }
  };
  /**
  *  touchend callback
  *  @param {Object}   evt   event obj
  */
  iSlider.prototype.endHandler = function (evt) {
    this.isMoving = false;
    var offset = this.offset;
    var axis = this.axis;
    var boundary = this.scale / 2;
    var endTime = new Date().getTime();
    // a quick slide time must under 300ms
    // a quick slide should also slide at least 14 px
    boundary = endTime - this.startTime > 300 ? boundary : 14;
    var res = this._endHandler ? this._endHandler(evt) : false;
    var absOffset = Math.abs(offset[axis]);
    var absReverseOffset = Math.abs(offset[this.reverseAxis]);
    var getLink = function (el) {
      if (el.tagName === 'A') {
        if (el.href) {
          window.location.href = el.href;
          return false;
        }
      } else if (el.className === 'islider-dom') {
        return false;
      } else {
        getLink(el.parentNode);
      }
    };
    if (!res && offset[axis] >= boundary && absReverseOffset < absOffset) {
      this.slideTo(this.slideIndex - 1);
    } else if (!res && offset[axis] < -boundary && absReverseOffset < absOffset) {
      this.slideTo(this.slideIndex + 1);
    } else if (!res) {
      this.slideTo(this.slideIndex);
    }
    // create tap event if offset < 10
    if (Math.abs(this.offset.X) < 10 && Math.abs(this.offset.Y) < 10) {
      this.tapEvt = document.createEvent('Event');
      this.tapEvt.initEvent('tap', true, true);
      if (this.fixPage) {
        getLink(evt.target);
      }
      if (!evt.target.dispatchEvent(this.tapEvt)) {
        evt.preventDefault();
      }
    }
    this.offset.X = this.offset.Y = 0;
    this.isAutoplay && this.play();
    this.onslideend && this.onslideend(this.slideIndex);
    this.log('Event: afterslide');
  };
  /**
  *  orientationchange callback
  */
  iSlider.prototype.orientationchangeHandler = function () {
    setTimeout(function () {
      this.reset();
      this.log('Event: orientationchange');
    }, 100);
  };
  /**
  * reset & rerender
  */
  iSlider.prototype.reset = function () {
    this.pause();
    this._setting();
    this._renderHTML();
    this.isAutoplay && this.play();
  };
  /**
  * enable autoplay
  */
  iSlider.prototype.play = function () {
    var self = this;
    var duration = this.duration;
    clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = setInterval(function () {
      self.slideTo(self.slideIndex + 1);
    }, duration);
  };
  /**
  * pause autoplay
  */
  iSlider.prototype.pause = function () {
    clearInterval(this.autoPlayTimer);
  };
  /**
  * plugin extend
  * @param {Object} plugin need to be set up
  * @param {Object} main iSlider prototype
  */
  iSlider.prototype.extend = function (plugin, main) {
    if (!main) {
      main = iSlider.prototype;
    }
    Object.keys(plugin).forEach(function (property) {
      Object.defineProperty(main, property, Object.getOwnPropertyDescriptor(plugin, property));
    });
  };
  return iSlider;
}();
islider_core = undefined;
plugins_islider_animate = function (iSlider) {
  var extendAnimation = {
    'rotate': function (dom, axis, scale, i, offset) {
      var rotateDirect = axis === 'X' ? 'Y' : 'X';
      var absoluteOffset = Math.abs(offset);
      var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
      if (this.isVertical) {
        offset = -offset;
      }
      this.wrap.style.webkitPerspective = scale * 4;
      if (i === 1) {
        dom.style.zIndex = scale - absoluteOffset;
      } else {
        dom.style.zIndex = offset > 0 ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
      }
      dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; ' + 'background-color:' + bdColor + '; position:absolute;';
      dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + 90 * (offset / scale + i - 1) + 'deg) translateZ(' + 0.888 * scale / 2 + 'px) scale(0.888)';
    },
    'flip': function (dom, axis, scale, i, offset) {
      var rotateDirect = axis === 'X' ? 'Y' : 'X';
      var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
      if (this.isVertical) {
        offset = -offset;
      }
      this.wrap.style.webkitPerspective = scale * 4;
      if (offset > 0) {
        dom.style.visibility = i > 1 ? 'hidden' : 'visible';
      } else {
        dom.style.visibility = i < 1 ? 'hidden' : 'visible';
      }
      dom.style.cssText += 'position:absolute; -webkit-backface-visibility:hidden; background-color:' + bdColor + ';';
      dom.style.webkitTransform = 'translateZ(' + scale / 2 + 'px) rotate' + rotateDirect + '(' + 180 * (offset / scale + i - 1) + 'deg) scale(0.875)';
    },
    'depth': function (dom, axis, scale, i, offset) {
      var zoomScale = (4 - Math.abs(i - 1)) * 0.18;
      this.wrap.style.webkitPerspective = scale * 4;
      dom.style.zIndex = i === 1 ? 100 : offset > 0 ? 1 - i : i - 1;
      dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
    },
    'flow': function (dom, axis, scale, i, offset) {
      var absoluteOffset = Math.abs(offset);
      var rotateDirect = axis === 'X' ? 'Y' : 'X';
      var directAmend = axis === 'X' ? 1 : -1;
      var offsetRatio = Math.abs(offset / scale);
      this.wrap.style.webkitPerspective = scale * 4;
      if (i === 1) {
        dom.style.zIndex = scale - absoluteOffset;
      } else {
        dom.style.zIndex = offset > 0 ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
      }
      dom.style.webkitTransform = 'scale(0.7, 0.7) translateZ(' + (offsetRatio * 150 - 150) * Math.abs(i - 1) + 'px)' + 'translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)' + 'rotate' + rotateDirect + '(' + directAmend * (30 - offsetRatio * 30) * (1 - i) + 'deg)';
    },
    'card': function (dom, axis, scale, i, offset) {
      var absoluteOffset = Math.abs(offset);
      if (i === 1) {
        dom.style.zIndex = scale - absoluteOffset;
        dom.cur = 1;
      } else {
        dom.style.zIndex = offset > 0 ? (1 - i) * absoluteOffset * 1000 : (i - 1) * absoluteOffset * 1000;
      }
      if (dom.cur && dom.cur !== i) {
        setTimeout(function () {
          dom.cur = null;
        }, 300);
      }
      var zoomScale = dom.cur ? 1 - 0.2 * Math.abs(i - 1) - Math.abs(0.2 * offset / scale).toFixed(6) : 1;
      dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
    }
  };
  iSlider.prototype.extend(extendAnimation, iSlider.prototype._animateFuncs);
}(iSlider);
plugins_islider_zoom = function (iSlider) {
  var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
  var minScale = 1 / 2;
  var viewScope = {};
  function generateTranslate(x, y, z, scale) {
    return 'translate' + (has3d ? '3d(' : '(') + x + 'px,' + y + (has3d ? 'px,' + z + 'px)' : 'px)') + 'scale(' + scale + ')';
  }
  function getDistance(a, b) {
    var x, y;
    x = a.left - b.left;
    y = a.top - b.top;
    return Math.sqrt(x * x + y * y);
  }
  function generateTransformOrigin(x, y) {
    return x + 'px ' + y + 'px';
  }
  function getTouches(touches) {
    return Array.prototype.slice.call(touches).map(function (touch) {
      return {
        left: touch.pageX,
        top: touch.pageY
      };
    });
  }
  function calculateScale(start, end) {
    var startDistance = getDistance(start[0], start[1]);
    var endDistance = getDistance(end[0], end[1]);
    return endDistance / startDistance;
  }
  function getComputedTranslate(obj) {
    var result = {
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0
    };
    var offsetX = 0, offsetY = 0;
    if (!window.getComputedStyle || !obj)
      return result;
    var style = window.getComputedStyle(obj), transform, origin;
    transform = style.webkitTransform || style.mozTransform;
    origin = style.webkitTransformOrigin || style.mozTransformOrigin;
    var par = origin.match(/(.*)px\s+(.*)px/);
    if (par.length > 1) {
      offsetX = par[1] - 0;
      offsetY = par[2] - 0;
    }
    if (transform == 'none')
      return result;
    var mat3d = transform.match(/^matrix3d\((.+)\)$/);
    var mat2d = transform.match(/^matrix\((.+)\)$/);
    if (mat3d) {
      var str = mat3d[1].split(', ');
      result = {
        translateX: str[12] - 0,
        translateY: str[13] - 0,
        translateZ: str[14] - 0,
        offsetX: offsetX - 0,
        offsetY: offsetY - 0,
        scaleX: str[0] - 0,
        scaleY: str[5] - 0,
        scaleZ: str[10] - 0
      };
    } else if (mat2d) {
      var str = mat2d[1].split(', ');
      result = {
        translateX: str[4] - 0,
        translateY: str[5] - 0,
        offsetX: offsetX - 0,
        offsetY: offsetY - 0,
        scaleX: str[0] - 0,
        scaleY: str[3] - 0
      };
    }
    return result;
  }
  function getCenter(a, b) {
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2
    };
  }
  //初始化缩放参数等
  function initZoom(opts) {
    this.currentScale = 1;
    this.zoomFactor = opts.zoomFactor || 2;
  }
  function startHandler(evt) {
    if (this.useZoom) {
      var node = this.els[1].querySelector('img');
      var transform = getComputedTranslate(node);
      this.startTouches = getTouches(evt.targetTouches);
      this._startX = transform.translateX - 0;
      this._startY = transform.translateY - 0;
      this.currentScale = transform.scaleX;
      this.zoomNode = node;
      var pos = getPosition(node);
      if (evt.targetTouches.length == 2) {
        console.log('gesture');
        this.lastTouchStart = null;
        var touches = evt.touches;
        var touchCenter = getCenter({
          x: touches[0].pageX,
          y: touches[0].pageY
        }, {
          x: touches[1].pageX,
          y: touches[1].pageY
        });
        node.style.webkitTransformOrigin = generateTransformOrigin(touchCenter.x - pos.left, touchCenter.y - pos.top);
      } else if (evt.targetTouches.length === 1) {
        var time = new Date().getTime();
        this.gesture = 0;
        if (time - this.lastTouchStart < 300) {
          evt.preventDefault();
          this.gesture = 3;
        }
        this.lastTouchStart = time;
      }
    }
  }
  function moveHandler(evt) {
    var result = 0, node = this.zoomNode;
    var device = this._device();
    if (device.hasTouch) {
      if (evt.targetTouches.length === 2 && this.useZoom) {
        node.style.webkitTransitionDuration = '0';
        evt.preventDefault();
        this._scaleImage(evt);
        result = 2;
      } else if (evt.targetTouches.length == 1 && this.useZoom && this.currentScale > 1) {
        node.style.webkitTransitionDuration = '0';
        evt.preventDefault();
        this._moveImage(evt);
        result = 1;
      }
      this.gesture = result;
      return result;
    }
  }
  function handleDoubleTap(evt) {
    var zoomFactor = this.zoomFactor || 2;
    var node = this.zoomNode;
    var pos = getPosition(node);
    this.currentScale = this.currentScale == 1 ? zoomFactor : 1;
    node.style.webkitTransform = generateTranslate(0, 0, 0, this.currentScale);
    if (this.currentScale != 1)
      node.style.webkitTransformOrigin = generateTransformOrigin(evt.touches[0].pageX - pos.left, evt.touches[0].pageY - pos.top);
  }
  //缩放图片
  function scaleImage(evt) {
    var moveTouces = getTouches(evt.targetTouches);
    var scale = calculateScale(this.startTouches, moveTouces);
    evt.scale = evt.scale || scale;
    var node = this.zoomNode;
    scale = this.currentScale * evt.scale < minScale ? minScale : this.currentScale * evt.scale;
    node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
  }
  function endHandler(evt) {
    var result = 0;
    if (this.gesture === 2) {
      //双手指 todo
      this._resetImage(evt);
      result = 2;
    } else if (this.gesture == 1) {
      //放大拖拽 todo
      this._resetImage(evt);
      result = 1;
    } else if (this.gesture === 3) {
      //双击
      this._handleDoubleTap(evt);
      this._resetImage(evt);
    }
    return result;
  }
  //拖拽图片
  function moveImage(evt) {
    var node = this.zoomNode;
    var device = this._device();
    var offset = {
      X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
      Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
    };
    this.moveOffset = {
      x: this._startX + offset.X - 0,
      y: this._startY + offset.Y - 0
    };
    node.style.webkitTransform = generateTranslate(this.moveOffset.x, this.moveOffset.y, 0, this.currentScale);
  }
  function getPosition(element) {
    var pos = {
      'left': 0,
      'top': 0
    };
    do {
      pos.top += element.offsetTop || 0;
      pos.left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return pos;
  }
  function valueInViewScope(node, value, tag) {
    var min, max;
    var pos = getPosition(node);
    viewScope = {
      start: {
        left: pos.left,
        top: pos.top
      },
      end: {
        left: pos.left + node.clientWidth,
        top: pos.top + node.clientHeight
      }
    };
    var str = tag == 1 ? 'left' : 'top';
    min = viewScope.start[str];
    max = viewScope.end[str];
    return value >= min && value <= max;
  }
  function overFlow(node, obj1) {
    var result = 0;
    var isX1In = valueInViewScope(node, obj1.start.left, 1);
    var isX2In = valueInViewScope(node, obj1.end.left, 1);
    var isY1In = valueInViewScope(node, obj1.start.top, 0);
    var isY2In = valueInViewScope(node, obj1.end.top, 0);
    if (isX1In != isX2In && isY1In != isY2In) {
      if (isX1In && isY2In) {
        result = 1;
      } else if (isX1In && isY1In) {
        result = 2;
      } else if (isX2In && isY2In) {
        result = 3;
      } else {
        result = 4;
      }
    } else if (isX1In == isX2In) {
      if (!isY1In && isY2In) {
        result = 5;
      } else if (!isY2In && isY1In) {
        result = 6;
      }
    } else if (isY1In == isY2In) {
      if (!isX1In && isX2In) {
        result = 7;
      } else if (isX1In && !isX2In) {
        result = 8;
      }
    } else if (isY1In == isY2In == isX1In == isX2In) {
      result = 9;
    }
    return result;
  }
  function resetImage(evt) {
    if (this.currentScale == 1)
      return;
    var node = this.zoomNode, left, top, trans, w, h, pos, start, end, parent, flowTag;
    trans = getComputedTranslate(node);
    parent = node.parentNode;
    w = node.clientWidth * trans.scaleX;
    h = node.clientHeight * trans.scaleX;
    pos = getPosition(node);
    start = {
      left: (1 - trans.scaleX) * trans.offsetX + pos.left + trans.translateX,
      top: (1 - trans.scaleX) * trans.offsetY + pos.top + trans.translateY
    };
    end = {
      left: start.left + w,
      top: start.top + h
    };
    left = start.left;
    top = start.top;
    flowTag = overFlow(parent, {
      start: start,
      end: end
    });
    switch (flowTag) {
    case 1:
      left = viewScope.start.left;
      top = viewScope.end.top - h;
      break;
    case 2:
      left = viewScope.start.left;
      top = viewScope.start.top;
      break;
    case 3:
      left = viewScope.end.left - w;
      top = viewScope.end.top - h;
      break;
    case 4:
      left = viewScope.end.left - w;
      top = viewScope.start.top;
      break;
    case 5:
      top = viewScope.end.top - h;
      break;
    case 6:
      top = viewScope.start.top;
      break;
    case 7:
      left = viewScope.end.left - w;
      break;
    case 8:
      left = viewScope.start.left;
      break;
    }
    if (w < parent.clientWidth) {
      left = pos.left - (trans.scaleX - 1) * node.clientWidth / 2;
    }
    if (h < parent.clientHeight) {
      top = pos.top - (trans.scaleX - 1) * node.clientHeight / 2;
    }
    node.style.webkitTransitionDuration = '100ms';
    node.style.webkitTransform = generateTranslate(trans.translateX + left - start.left, trans.translateY + top - start.top, 0, trans.scaleX);
  }
  iSlider.prototype.extend({
    _initZoom: initZoom,
    _scaleImage: scaleImage,
    _moveImage: moveImage,
    _resetImage: resetImage,
    _handleDoubleTap: handleDoubleTap,
    _moveHandler: moveHandler,
    _endHandler: endHandler,
    _startHandler: startHandler
  });
}(iSlider);
plugins_islider_button = function (iSlider) {
  iSlider.prototype.extend({
    addBtn: function () {
      if (!this.isVertical) {
        var btnOuter = [];
        var btnInner = [];
        var self = this;
        for (var i = 0; i < 2; i++) {
          btnOuter[i] = document.createElement('div');
          btnOuter[i].className = 'islider-btn-outer';
          btnInner[i] = document.createElement('div');
          btnInner[i].className = 'islider-btn-inner';
          if (i === 0) {
            btnOuter[i].className += ' left';
            btnOuter[i].dir = -1;
          } else {
            btnOuter[i].className += ' right';
            btnOuter[i].dir = 1;
          }
          btnOuter[i].addEventListener('click', function () {
            var dir = parseInt(this.getAttribute('dir'), 10);
            self.slideTo(self.slideIndex + dir);
          });
          btnOuter[i].appendChild(btnInner[i]);
          this.wrap.appendChild(btnOuter[i], this.wrap.nextSibling);
        }
      }
    }
  });
}(iSlider);
plugins_islider_dot = function (iSlider) {
  iSlider.prototype.extend({
    addDot: function () {
      if (!this.isVertical) {
        var self = this;
        var data = this.data;
        var dots = [];
        var dotWrap = document.createElement('ul');
        dotWrap.className = 'islider-dot-wrap';
        var fregment = document.createDocumentFragment();
        for (var i = 0; i < data.length; i++) {
          dots[i] = document.createElement('li');
          dots[i].className = 'islider-dot';
          dots[i].setAttribute('index', i);
          if (i === this.slideIndex) {
            dots[i].className += ' active';
          }
          dots[i].addEventListener('click', function () {
            var index = parseInt(this.getAttribute('index'), 10);
            self.slideTo(index);
          });
          fregment.appendChild(dots[i]);
        }
        dotWrap.appendChild(fregment);
        this.wrap.parentNode.appendChild(dotWrap);
        this.dotchange = function () {
          for (var i = 0; i < data.length; i++) {
            dots[i].className = 'islider-dot';
            if (i === this.slideIndex) {
              dots[i].className += ' active';
            }
          }
        };
      }
    }
  });
}(iSlider);
window.iSlider = iSlider;
}());