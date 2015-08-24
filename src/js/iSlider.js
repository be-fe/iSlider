/**
 * A simple, efficent mobile slider solution
 * @file iSlider.js
 * @author BE-FE Team
 *    qbaty qbaty.qi@gmail.com
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 *
 * @LICENSE https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */

(function (global) {
    'use strict';

    /**
     * Check in array
     * @param oElement
     * @param aSource
     * @returns {boolean}
     */
    function inArray(oElement, aSource) {
        return aSource.indexOf(oElement) > -1;
    };

    /**
     * Check is array
     * @param o
     * @returns {boolean}
     */
    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    };

    /**
     * @param obj
     * @param cls
     * @returns {Array|{index: number, input: string}}
     */
    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    /**
     * @param obj
     * @param cls
     */
    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) {
            obj.className += ' ' + cls;
        }
    }

    /**
     * @param obj
     * @param cls
     */
    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            obj.className = obj.className.replace(RegExp('(\\s|^)' + cls + '(\\s|$)'), '');
        }
    }

    /**
     * Checck is url
     * @param {string} url
     * @returns {boolean}
     */
    function isUrl(url) {
        if (/<\/?[^>]*>/g.test(url))
            return false;

        var regex = '^' +
            '(((https|http|ftp|rtsp|mms):)?//)?' +
            '(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' +
            '(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*\'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})?' +
            '(:[0-9]{1,4})?' +
            '([^\?#]+)?' +
            '(\\\?[^#]+)?' +
            '(#.+)?' +
            '$';
        return new RegExp(regex).test(url);
    }

    /**
     * @constructor
     *
     * @param {Object} opts 参数集
     * @param {Element} opts.dom 外层元素 Outer wrapper
     * @param {Array} opts.data 数据列表 Content data
     */
    var iSlider = function (opts) {
        // TODO. Will support simple param
        // var iSlider = function (node, data, opts) {
        //    switch (arguments.length) {
        //        case 1:
        //            if (Object.prototype.toString.call(arguments[1]) !== '[object Object]')
        //                throw new Error('The argument must be an object');
        //        case 2:
        //            if (isArray(arguments[1])) {
        //                var opts = {};
        //                opts.dom = node;
        //                opts.data = data;
        //            } else {
        //                var opts = data;
        //                opts.dom = opts.dom || node;
        //            }
        //            break;
        //        case 3:
        //            opts.dom = opts.dom || node;
        //            opts.data = opts.data || data;
        //            break;
        //    }

        if (!opts.dom) {
            throw new Error('Container can not be empty!');
        }

        if (!opts.data || !opts.data.length) {
            throw new Error('Data must be an array and must have more than one element!');
        }

        /**
         * Options
         * @private
         */
        this._opts = opts;

        this._setting();
        this._renderHTML();
        this._initPlugins();
        this._bindHandler();
    };

    /**
     * Event white list
     * @type {Array}
     * @protected
     */
    iSlider.EVENTS = 'slide slideStart slideEnd slideChange slideChanged slideRestore slideRestored'.split(' ');

    /**
     * Easing white list
     * @type [Array, RegExp[]]
     * @protected
     */
    iSlider.EASING = [
        'linear ease ease-in ease-out ease-in-out'.split(' '),
        /cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/
    ];

    /**
     * The empty function
     * @private
     */
    iSlider.EMPTY_FUNCTION = function () {
    };

    /**
     * Extend
     * @public
     */
    iSlider.extend = function () {
        if (!arguments.length) {
            return;
        }

        var main, extend;
        switch (arguments.length) {
            case 1:
                main = iSlider.prototype;
                extend = arguments[0];
                break;
            case 2:
                main = arguments[0];
                extend = arguments[1];
                break;
        }

        for (var property in extend) {
            if (extend.hasOwnProperty(property)) {
                main[property] = extend[property];
            }
        }
    };

    /**
     * Plugins
     * @type {{}}
     * @protected
     */
    iSlider.plugins = {};

    /**
     * @param name
     * @param plugin
     * @public
     */
    iSlider.regPlugin = function (name, plugin) {
        iSlider.plugins[name] = iSlider.plugins[name] || plugin;
    };

    /**
     * animation parmas:
     *
     * @param {Element}      dom             图片的外层<li>容器       Img wrapper
     * @param {String}       axis            动画方向                animate direction
     * @param {Number}       scale           容器宽度                Outer wrapper
     * @param {Number}       i               <li>容器index          Img wrapper's index
     * @param {Number}       offset          滑动距离                move distance
     * @protected
     */
    iSlider._animateFuncs = {
        'default': function (dom, axis, scale, i, offset) {
            dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
        }
    };

    /**
     * @returns {string}
     * @private
     */
    iSlider._transitionEndEvent = (function () {
        var evtName;
        return function () {
            if (evtName) {
                return evtName;
            }
            var el = document.createElement('fakeElement');
            var transitions = {
                transition: 'transitionend',
                OTransition: 'oTransitionEnd',
                MozTransition: 'transitionend',
                WebkitTransition: 'webkitTransitionEnd'
            };
            for (var t in transitions) {
                if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) {
                    return (evtName = transitions[t]);
                }
            }
        };
    })();

    /**
     * This is a alias，conducive to compression
     * @type {Object}
     */
    var iSliderPrototype = iSlider.prototype;

    /**
     * & iSlider.extend
     * @public
     */
    iSliderPrototype.extend = iSlider.extend;

    /**
     * setting parameters for slider
     * @private
     */
    iSliderPrototype._setting = function () {

        /**
         * The plugins
         * @type {Array|{}|*}
         * @private
         */
        this._plugins = iSlider.plugins;

        /**
         *
         * @type {{default: Function}|*}
         * @private
         */
        this._animateFuncs = iSlider._animateFuncs;

        /**
         * @type {boolean}
         * @private
         */
        this.holding = false;

        /**
         * @type {boolean}
         * @private
         */
        this.locking = false;

        // --------------------------------
        // - Set options
        // --------------------------------

        var opts = this._opts;

        // dom element wrapping content
        this.wrap = opts.dom;

        // your data
        this.data = opts.data;

        // default type
        this.type = opts.type || null;

        // default slide direction
        this.isVertical = opts.isVertical || false;

        // Overspread mode
        this.isOverspread = opts.isOverspread || false;

        // Play time gap
        this.duration = opts.duration || 2000;

        // start from initIndex or 0
        this.initIndex = opts.initIndex || 0;

        // touchstart prevent default to fixPage
        if (opts.fixPage === undefined) {
            this.fixPage = true;
        }
        else {
            this.fixPage = opts.fixPage;
        }

        // TODO
        // in looping mode, will support index overflow
        if (this.initIndex > this.data.length - 1 || this.initIndex < 0) {
            this.initIndex = 0;
        }

        this.slideIndex = this.slideIndex || this.initIndex || 0;

        this.axis = this.isVertical ? 'Y' : 'X';
        this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

        this.width = this.wrap.clientWidth;
        this.height = this.wrap.clientHeight;
        this.ratio = this.height / this.width;
        this.scale = this.isVertical ? this.height : this.width;

        this.isLoading = opts.isLoading;

        this.offset = this.offset || {X: 0, Y: 0};

        // looping logic adjust
        if (this.data.length < 2) {
            this.isLooping = false;
            this.isAutoPlay = false;
        }
        else {
            this.isLooping = opts.isLooping || false;
            this.isAutoplay = opts.isAutoplay || false;
        }

        // little trick set, when you chooce tear & vertical same time
        // iSlider overspread mode will be set true autometicly
        if (opts.animateType === 'card' && this.isVertical) {
            this.isOverspread = true;
        }

        // debug mode
        this.log = opts.isDebug ? function () {
            global.console.log.apply(global.console, arguments);
        } : iSlider.EMPTY_FUNCTION;

        // set Damping function
        this._setUpDamping();

        // stop autoplay when window blur
        // this._setPlayWhenFocus();

        /**
         * @protected
         */
        this._animateFunc = this._animateFuncs[opts.animateType in this._animateFuncs ? opts.animateType : 'default'];

        // set animate process time (ms), default: 300ms
        this.animateTime = opts.animateTime != null && opts.animateTime > -1 ? opts.animateTime : 300;

        // set animate effects, default: ease
        this.animateEasing =
            inArray(opts.animateEasing, iSlider.EASING[0])
            || iSlider.EASING[1].test(opts.animateEasing)
                ? opts.animateEasing
                : 'ease';

        this.inAnimate = 0;

        /**
         * Fix touch/mouse events
         * @type {{hasTouch, startEvt, moveEvt, endEvt}}
         */
        this.deviceEvents = (function () {
            var hasTouch = !!(('ontouchstart' in global) || global.DocumentTouch && document instanceof global.DocumentTouch);
            return {
                hasTouch: hasTouch,
                startEvt: hasTouch ? 'touchstart' : 'mousedown',
                moveEvt: hasTouch ? 'touchmove' : 'mousemove',
                endEvt: hasTouch ? 'touchend' : 'mouseup'
            };
        })();

        /**
         * Init events
         * @type {{}}
         * @private
         */
        this.events = {};

        // --------------------------------
        // - Register events
        // --------------------------------

        // Callback function when your finger is moving
        this.on('slide', opts.onslide);

        // Callback function when your finger touch the screen
        this.on('slideStart', opts.onslidestart);

        // Callback function when the finger move out of the screen
        this.on('slideEnd', opts.onslideend);

        // Callback function when slide to next/prev scene
        this.on('slideChange', opts.onslidechange);

        // Callback function when next/prev scene, while animation has completed
        this.on('slideChanged', opts.onslidechanged);

        // Callback function when restore to the current scene
        this.on('slideRestore', opts.onsliderestore);

        // Callback function when restore to the current scene, while animation has completed
        this.on('slideRestored', opts.onsliderestored);

        // --------------------------------
        // - Plugins
        // --------------------------------

        /**
         * @type {object}
         * @private
         */
        this.pluginConfig = (function () {
            if (isArray(opts.plugins)) {
                var config = {};
                opts.plugins.forEach(function pluginConfigEach(plugin) {
                    if (isArray(plugin)) {
                        config[plugin[0]] = plugin[1] || {};
                    } else if (typeof plugin === 'string') {
                        config[plugin] = {};
                    }
                });
                return config;
            } else {
                return {}
            }
        })();

        // Autoplay mode
        if (this.isAutoplay) {
            this.play();
        }
    };

    /**
     * Init plugins
     * @private
     */
    iSliderPrototype._initPlugins = function () {
        var config = this.pluginConfig;
        var plugins = this._plugins;
        for (var i in config) {
            if (config.hasOwnProperty(i) && plugins.hasOwnProperty(i)) {
                this.log('[INIT PLUGIN]:', i, plugins[i]);
                plugins[i]
                && typeof plugins[i] === 'function'
                && typeof plugins[i].call
                && plugins[i].call(this, config[i]);
            }
        }
    };

    /**
     * enable damping when slider meet the edge
     * @private
     */
    iSliderPrototype._setUpDamping = function () {
        var oneIn2 = this.scale >> 1;
        var oneIn4 = oneIn2 >> 1;
        var oneIn16 = oneIn4 >> 2;

        /**
         * init damping function
         * @param distance
         * @returns {*}
         * @private
         */
        this._damping = function (distance) {
            var dis = Math.abs(distance);
            var result;

            if (dis < oneIn2) {
                result = dis >> 1;
            }
            else if (dis < oneIn2 + oneIn4) {
                result = oneIn4 + ((dis - oneIn2) >> 2);
            }
            else {
                result = oneIn4 + oneIn16 + ((dis - oneIn2 - oneIn4) >> 3);
            }

            return distance > 0 ? result : -result;
        };
    };

    /**
     *
     * @param {number} index
     * @returns {string}
     * @private
     */
    iSliderPrototype._itemType = function (dataIndex) {
        var content = this.data[dataIndex].content;
        if (content == null) {
            return 'empty';
        }
        if (Boolean(content.nodeName) && Boolean(content.nodeType)) {
            return 'node';
        } else if (typeof content === 'string') {
            if (isUrl(content)) {
                return 'pic';
            }
            return 'html';
        } else {
            return 'unknown';
        }
    };

    /**
     * render single item html by idx
     * @param {HTMLElement} el ..
     * @param {number} dataIndex  ..
     * @private
     */
    iSliderPrototype._renderItem = function (el, dataIndex) {

        var item;
        var html;
        var len = this.data.length;
        // var self = this;

        var insertImg = function () {
            html = item.height / item.width > this.ratio
                ? '<img height="' + this.height + '" src="' + item.content + '">'
                : '<img width="' + this.width + '" src="' + item.content + '">';
            el.innerHTML = html;
        }.bind(this);

        // clean scene
        el.innerHTML = '';
        el.style.background = '';

        // get the right item of data
        if (!this.isLooping && this.data[dataIndex] == null) {
            // Stop slide when item is empty
            return;
        }
        else {
            dataIndex = (len /* * Math.ceil(Math.abs(dataIndex / len))*/ + dataIndex) % len;
            item = this.data[dataIndex];
        }

        var type = this.type != null ? this.type : item.type || (item.type = this._itemType(dataIndex));

        this.log('[Render ITEM]:', type, dataIndex, item);

        el.className = 'islider-' + type;

        switch (type) {
            case 'pic':
                if (!this.isOverspread) {
                    if (item.height && item.width) {
                        insertImg();
                    }
                    else {
                        var currentImg = new Image();
                        currentImg.src = item.content;
                        currentImg.onload = function () {
                            item.height = currentImg.height;
                            item.width = currentImg.width;
                            insertImg();
                        };
                    }
                }
                else {
                    el.style.background = 'url(' + item.content + ') no-repeat 50% 50%/cover';
                }
                break;
            case 'dom':
            case 'html':
                el.innerHTML = item.content;
                break;
            case 'node':
            case 'element':
                if (item.content.nodeType === 11) {
                    var entity = document.createElement('div');
                    entity.appendChild(item.content);
                    item.content = entity;
                }
                el.appendChild(item.content);
                break;
            default:
                // do nothing
                break;
        }
    };

    /**
     * Apply styles on changed
     * @private
     */
    iSliderPrototype._changedStyles = function () {
        var slideStyles = ['islider-prev', 'islider-active', 'islider-next'];
        this.els.forEach(function changeStypeEach(el, index) {
            removeClass(el, '(' + slideStyles.join('|') + ')');
            addClass(el, slideStyles[index])
        });
    };

    /**
     * render list html
     * @private
     */
    iSliderPrototype._renderHTML = function () {
        this.outer && (this.outer.innerHTML = '');
        // initail ul element
        var outer = this.outer || document.createElement('ul');
        outer.className = 'islider-outer';
        outer.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;margin:0;padding:0;list-style:none;';

        //loading
        if (this.type === 'pic' && !this.loader && this.isLoading) {
            var loader = document.createElement('div');
            loader.className = 'islider-loader';
            this.loader = loader;
            this.wrap.appendChild(loader);
        }

        // storage li elements, only store 3 elements to reduce memory usage
        this.els = [];
        for (var i = 0; i < 3; i++) {
            var li = document.createElement('li');
            // li.className = this.type === 'dom' ? 'islider-dom' : 'islider-pic';
            li.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;';
            this.els.push(li);

            // prepare style animation
            this._animateFunc(li, this.axis, this.scale, i, 0);
            if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
                this._renderItem(li, 1 - i + this.slideIndex);
            }
            else {
                this._renderItem(li, i - 1 + this.slideIndex);
            }
            outer.appendChild(li);
        }

        this._changedStyles();

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
     *  @private
     */
    iSliderPrototype._preloadImg = function (dataIndex) {
        if (this.type === 'pic' && this.data.length > 3) {
            var data = this.data;
            var len = data.length;
            var loadImg = function (index) {
                if (index > -1 && data[index].type === 'pic' && !data[index].loaded) {
                    var preloadImg = new Image();
                    preloadImg.src = data[index].content;
                    preloadImg.onload = function () {
                        data[index].width = preloadImg.width;
                        data[index].height = preloadImg.height;
                    };
                    data[index].loaded = 1;
                }
            };

            loadImg(dataIndex + 2 > len - 1 ? ((dataIndex + 2) % len) : (dataIndex + 2));
            loadImg(dataIndex - 2 < 0 ? (len - 2 + dataIndex) : (dataIndex - 2));
        }
    };

    /**
     *  load extra imgs when renderHTML
     *  @private
     */
    iSliderPrototype._initLoadImg = function () {
        var data = this.data;
        var len = data.length;
        var idx = this.slideIndex;
        var self = this;

        if (this.type === 'pic' && len > 3) {
            var nextIndex = (idx + 2 > len) ? ((idx + 1) % len) : (idx + 1);
            var prevIndex = (idx - 1 < 0) ? (len - 1 + idx) : (idx - 1);
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
     * Watch event transitionEnd
     * @private
     */
    iSliderPrototype._watchTransitionEnd = function (time, eventType) {

        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        var lsn;
        this.log('Event:', 'watchTransitionEnd::stuck::pile', this.inAnimate);

        function handle(evt) {
            if (lsn) {
                global.clearTimeout(lsn);
            }
            self.inAnimate--;
            self.log('Event:', 'watchTransitionEnd::stuck::release', self.inAnimate);
            if (self.inAnimate === 0) {
                self.inAnimate = 0;
                if (eventType === 'slideChanged') {
                    self._changedStyles();
                }
                self.fire.apply(self, args);
            }
            unWatch();
        };

        function unWatch() {
            self.els.forEach(function translationEndUnwatchEach(el) {
                el.removeEventListener(iSlider._transitionEndEvent(), handle);
            });
            self.isAnimating = false;
        }

        if (time > 0) {
            self.els.forEach(function translationEndElsEach(el) {
                el.addEventListener(iSlider._transitionEndEvent(), handle);
            });
        }
        lsn = global.setTimeout(handle, time);
        self.inAnimate++;
    };

    /**
     * bind all event handler, when on PC, disable drag event
     * @private
     */
    iSliderPrototype._bindHandler = function () {
        var outer = this.outer;
        var device = this.deviceEvents;

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

        global.addEventListener('orientationchange', this);

        // Fix android device
        global.addEventListener('focus', this, false);
        global.addEventListener('blur', this, false);
    };

    /**
     *  Uniformity admin event
     *  Event router
     *  @param {object} evt event object
     *  @protected
     */
    iSliderPrototype.handleEvent = function (evt) {
        var device = this.deviceEvents;
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
     *  @param {object} evt event object
     *  @protected
     */
    iSliderPrototype.startHandler = function (evt) {
        if (this.fixPage) {
            var target = evt.target;
            if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                evt.preventDefault();
            }
        }
        if (this.holding || this.locking) {
            return;
        }
        var device = this.deviceEvents;
        this.isMoving = true;
        this.pause();

        this.log('Event: start');
        this.fire('slideStart', evt, this);

        this.startTime = new Date().getTime();
        this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
        this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
    };

    /**
     *  touchmove callback
     *  @param {object} evt event object
     *  @protected
     */
    iSliderPrototype.moveHandler = function (evt) {
        if (!this.isMoving) {
            return;
        }
        this.log('Event: moving');
        var device = this.deviceEvents;
        var len = this.data.length;
        var axis = this.axis;
        var reverseAxis = this.reverseAxis;
        var offset = {
            X: device.hasTouch ? (evt.targetTouches[0].pageX - this.startX) : (evt.pageX - this.startX),
            Y: device.hasTouch ? (evt.targetTouches[0].pageY - this.startY) : (evt.pageY - this.startY)
        };

        this.offset = offset;

        if (Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
            evt.preventDefault();

            this.fire('slide', evt, this);

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
    };

    /**
     *  touchend callback
     *  @param {Object} evt event object
     *  @protected
     */
    iSliderPrototype.endHandler = function (evt) {
        if (!this.isMoving) {
            return;
        }
        this.log('Event: end');
        this.isMoving = false;
        var offset = this.offset;
        var axis = this.axis;
        var boundary = this.scale / 2;
        var endTime = new Date().getTime();

        // a quick slide time must under 300ms
        // a quick slide should also slide at least 14 px
        boundary = endTime - this.startTime > 300 ? boundary : 14;

        var absOffset = Math.abs(offset[axis]);
        var absReverseOffset = Math.abs(offset[this.reverseAxis]);

        var getLink = function (el) {
            if (el.tagName === 'A') {
                if (el.href) {
                    global.location.href = el.href
                    return false;
                }
            }
            else if (el.className !== 'islider-pic') {
                return false;
            }
            else {
                getLink(el.parentNode);
            }
        }

        this.log(boundary, offset[axis], absOffset, absReverseOffset, this);

        if (offset[axis] >= boundary && absReverseOffset < absOffset) {
            this.slideTo(this.slideIndex - 1);
        }
        else if (offset[axis] < -boundary && absReverseOffset < absOffset) {
            this.slideTo(this.slideIndex + 1);
        }
        else {
            this.slideTo(this.slideIndex);
        }

        // create tap event if offset < 10
        if (Math.abs(this.offset.X) < 10 && Math.abs(this.offset.Y) < 10) {
            this.tapEvt = document.createEvent('Event');
            this.tapEvt.initEvent('tap', true, true);
            if (this.fixPage) {
                evt.target && getLink(evt.target);
            }
            if (!evt.target.dispatchEvent(this.tapEvt)) {
                evt.preventDefault();
            }
        }

        this.offset.X = this.offset.Y = 0;

        this.isAutoplay && this.play();

        this.fire('slideEnd', evt, this);
    };

    /**
     *  orientationchange callback
     *  @protected
     */
    iSliderPrototype.orientationchangeHandler = function () {
        setTimeout(function () {
            this.reset();
            this.log('Event: orientationchange');
        }.bind(this), 100);
    };

    /**
     *  slide logical, goto data index
     *  @param {number} dataIndex the goto index
     *  @public
     */
    iSliderPrototype.slideTo = function (dataIndex, opts) {
        if (this.locking) {
            return;
        }
        this.unhold();
        var animateTime = this.animateTime;
        var animateType = this._opts.animateType;
        var animateFunc = this._animateFunc;
        var data = this.data;
        var els = this.els;
        var idx = dataIndex;
        var n = dataIndex - this.slideIndex;
        var offset = this.offset;
        var eventType;

        if (typeof opts === 'object') {
            if (opts.animateTime > -1) {
                animateTime = opts.animateTime;
            }
            if (typeof opts.animateType === 'string' && opts.animateType in this._animateFuncs) {
                animateType = opts.animateType;
                animateFunc = this._animateFuncs[animateType];
            }
        }

        if (Math.abs(n) > 1) {
            this._renderItem(n > 0 ? this.els[2] : this.els[0], idx);
        }

        // preload when slide
        this._preloadImg(idx);

        // get right item of data
        if (data[idx]) {
            this.slideIndex = idx;
        }
        else {
            if (this.isLooping) {
                this.slideIndex = n > 0 ? 0 : data.length - 1;
            }
            else {
                this.slideIndex = this.slideIndex;
                n = 0;
            }
        }

        this.log('Index:' + this.slideIndex);

        // keep the right order of items
        var sEle;
        // TODO
        // Fix no animate ext
        if (this.isVertical && (animateType === 'rotate' || animateType === 'flip')) {
            if (n > 0) {
                sEle = els.pop();
                els.unshift(sEle);
            }
            else if (n < 0) {
                sEle = els.shift();
                els.push(sEle);
            }
        }
        else {
            if (n > 0) {
                sEle = els.shift();
                els.push(sEle);
            }
            else if (n < 0) {
                sEle = els.pop();
                els.unshift(sEle);
            }
        }

        //In the slide process, animate time is squeezed
        var squeezeTime = Math.abs(offset[this.axis]) / this.scale * animateTime;

        // slidechange should render new item
        // and change new item style to fit animation
        if (n !== 0) {
            // slide to next/prev scenes
            if (Math.abs(n) > 1) {
                this._renderItem(els[0], idx - 1);
                this._renderItem(els[2], idx + 1);
            }
            else if (Math.abs(n) === 1) {
                this._renderItem(sEle, idx + n);
            }
            sEle.style.webkitTransition = 'none';
            sEle.style.visibility = 'hidden';

            // TODO
            // ???
            setTimeout(function () {
                sEle.style.visibility = 'visible';
            }, 200);

            // Minus squeeze time
            squeezeTime = animateTime - squeezeTime;

            eventType = 'slideChange';
        }
        else {
            // Restore to current scene
            eventType = 'slideRestore';
        }

        this.fire(eventType, this.slideIndex, els[1], this);
        this._watchTransitionEnd(squeezeTime, eventType + 'd', this.slideIndex, els[1], this);

        // do the trick animation
        for (var i = 0; i < 3; i++) {
            if (els[i] !== sEle) {
                els[i].style.webkitTransition = 'all ' + (squeezeTime / 1000) + 's ' + this.animateEasing;
            }
            animateFunc.call(this, els[i], this.axis, this.scale, i, 0);
        }

        // If not looping, stop playing when meet the end of data
        if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
            this.pause();
        }
    };

    /**
     * Slide to next scene
     * @public
     */
    iSliderPrototype.slideNext = function () {
        this.slideTo.apply(this, [this.slideIndex + 1].concat(Array.prototype.slice.call(arguments)));
    };

    /**
     * Slide to previous scene
     * @public
     */
    iSliderPrototype.slidePrev = function () {
        this.slideTo.apply(this, [this.slideIndex - 1].concat(Array.prototype.slice.call(arguments)));
    };

    /**
     * Register plugin (run time mode)
     * @param name
     * @param plugin
     * @public
     */
    iSliderPrototype.regPlugin = function (name, plugin) {
        this._plugins[name] = this._plugins[name] || plugin;
        // Auto enable and init plugin when at run time
        !inArray(name, this._opts.plugins) && this._opts.plugins.push(name);
        typeof this._plugins[name] === 'function' && this._plugins[name]();
    };

    /**
     *  simple event delegate method
     *  @param {string} evtType event name
     *  @param {string} selector the simple css selector like jQuery
     *  @param {function} callback event callback
     *  @public
     */
    iSliderPrototype.bind = iSliderPrototype.delegate = function (evtType, selector, callback) {
        function handle(e) {
            var evt = global.event ? global.event : e;
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
     * removeEventListener to release the memory
     * @public
     */
    iSliderPrototype.destroy = function () {
        var outer = this.outer;
        var device = this.deviceEvents;

        outer.removeEventListener(device.startEvt, this);
        outer.removeEventListener(device.moveEvt, this);
        outer.removeEventListener(device.endEvt, this);
        global.removeEventListener('orientationchange', this);
        global.removeEventListener('focus', this);
        global.removeEventListener('blur', this);
        this.wrap.innerHTML = '';
    };

    /**
     * Register event callback
     * @param {string} eventName
     * @param {function} func
     * @public
     */
    iSliderPrototype.on = function (eventName, func) {
        if (inArray(eventName, iSlider.EVENTS) && typeof func === 'function') {
            (eventName in this.events ? this.events[eventName] : this.events[eventName] = []).push(func);
        }
    };

    /**
     * Remove event callback
     * @param {string} eventName
     * @param {function} func
     * @public
     */
    iSliderPrototype.off = function (eventName, func) {
        if (eventName in this.events) {
            var funcs = this.events[eventName];
            var index = funcs.indexOf(func);
            if (index > -1) {
                delete funcs[index];
            }
        }
    };

    /**
     * Trigger event callbacks
     * @param {string} eventName
     * @param {*} args
     * @public
     */
    iSliderPrototype.fire = function (eventName) {
        this.log('[EVENT FIRE]:', eventName, arguments);
        if (eventName in this.events) {
            var funcs = this.events[eventName];
            for (var i = 0; i < funcs.length; i++) {
                // TODO
                // will support custom context, now context is instance of iSlider
                typeof funcs[i] === 'function'
                && funcs[i].apply
                && funcs[i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };

    /**
     * reset & rerender
     * @public
     */
    iSliderPrototype.reset = function () {
        this.pause();
        this._setting();
        this._renderHTML();
        this.isAutoplay && this.play();
    };

    /**
     * reload Data & render
     * @public
     */
    iSliderPrototype.loadData = function (data, initIndex) {
        this.pause();
        this.slideIndex = initIndex || 0;
        this.data = data;
        this._renderHTML();
        this.isAutoplay && this.play();
    };

    /**
     * enable autoplay
     * @public
     */
    iSliderPrototype.play = function () {
        var self = this;
        var duration = this.duration;
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = setInterval(function () {
            self.slideTo(self.slideIndex + 1);
        }, duration);
    };

    /**
     * pause autoplay
     * @public
     */
    iSliderPrototype.pause = function () {
        clearInterval(this.autoPlayTimer);
    };

    /**
     * Maintaining the current scene
     * Disable touch events, except for the native method.
     * @public
     */
    iSliderPrototype.hold = function () {
        this.holding = true;
    };

    /**
     * Release current scene
     * unlock at same time
     * @public
     */
    iSliderPrototype.unhold = function () {
        this.holding = false;
        this.unlock();
    };

    /**
     * You can't do anything on this scene
     * lock native method calls
     * hold at same time
     * @public
     */
    iSliderPrototype.lock = function () {
        this.hold();
        this.locking = true;
    };

    /**
     * unlock native method calls
     * @public
     */
    iSliderPrototype.unlock = function () {
        this.locking = false;
    };

    /* CommonJS */
    if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        module.exports = iSlider;
    /* AMD */
    else if (typeof define === 'function' && define['amd'])
        define(function () {
            return iSlider;
        });
    /* Global */
    else
        global['iSlider'] = global['iSlider'] || iSlider;

})(this || window);
