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
     * iSlicer([[{Element} container,] {Array} datalist,] {object} options)
     *
     * @param {Element} container
     * @param {Array} datalist
     * @param {Object} options
     *
     * @description
     *  options.dom > container
     *  options.data > datalist
     */
    var iSlider = function () {

        var args = Array.prototype.slice.call(arguments, 0, 3);
        if (!args.length) {
            throw new Error('Parameters required!');
        }
        var opts = args.pop();
        switch (args.length) {
            case 2:
                opts.data = opts.data || args[1];
            case 1:
                opts.dom = opts.dom || args[0];
        }

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

        /**
         * listener
         * @type {{}}
         * @private
         */
        this._LSN = {};

        opts = args = null;

        this._setting();

        this.fire('initialize');
        this._renderWrapper();
        this._initPlugins();
        this._bindHandler();
    };

    /**
     * Event white list
     * @type {Array}
     * @protected
     */
    iSlider.EVENTS = 'initialize slide slideStart slideEnd slideChange slideChanged slideRestore slideRestored reloadData destroy'.split(' ');

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
     * TAGS whitelist on fixpage mode
     * @type {Array}
     * @protected
     */
    iSlider.FIX_PAGE_TAGS = 'SELECT INPUT TEXTAREA BUTTON LABEL'.split(' ');

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
        var main, extend, args = arguments;

        switch (args.length) {
            case 0:
                return;
            case 1:
                main = iSlider.prototype;
                extend = args[0];
                break;
            case 2:
                main = args[0];
                extend = args[1];
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

        /**
         * dom element wrapping content
         * @type {Element}
         * @public
         */
        this.wrap = opts.dom;

        /**
         * Data list
         * @type {Array}
         * @public
         */
        this.data = opts.data;

        /**
         * default slide direction
         * @type {boolean}
         * @public
         */
        this.isVertical = opts.isVertical || false;

        /**
         * Overspread mode
         * @type {boolean}
         * @public
         */
        this.isOverspread = opts.isOverspread || false;

        /**
         * Play time gap
         * @type {number}
         * @public
         */
        this.duration = opts.duration || 2000;

        /**
         * start from initIndex or 0
         * @type {number}
         * @public
         */
        this.initIndex = opts.initIndex > 0 && opts.initIndex < opts.data.length - 1 ? opts.initIndex : 0;

        /**
         * touchstart prevent default to fixPage
         * @type {boolean}
         * @public
         */
        this.fixPage = opts.fixPage === undefined ? true : opts.fixPage;

        /**
         * slideIndex
         * @type {number}
         * @private
         */
        this.slideIndex = this.slideIndex || this.initIndex || 0;

        /**
         * Axis
         * @type {string}
         * @public
         */
        this.axis = this.isVertical ? 'Y' : 'X';

        /**
         * reverseAxis
         * @type {string}
         * @private
         */
        this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

        /**
         * Wrapper width
         * @type {number}
         * @private
         */
        this.width = this.wrap.clientWidth;

        /**
         * Wrapper height
         * @type {number}
         * @private
         */
        this.height = this.wrap.clientHeight;

        /**
         * Ratio height:width
         * @type {number}
         * @private
         */
        this.ratio = this.height / this.width;

        /**
         * Scale, size rule
         * @type {number}
         * @private
         */
        this.scale = this.isVertical ? this.height : this.width;

        /**
         * On slide offset position
         * @type {{X: number, Y: number}}
         * @private
         */
        this.offset = this.offset || {X: 0, Y: 0};

        /**
         * looping logic adjust
         * @type {boolean}
         * @private
         */
        this.isLooping = this.data.length > 1 && opts.isLooping ? true : false;

        /**
         * autoplay logic adjust
         * @type {boolean}
         * @private
         */
        this.isAutoplay = this.data.length > 1 && opts.isAutoplay ? true : false;

        // little trick set, when you chooce tear & vertical same time
        // iSlider overspread mode will be set true autometicly
        if (opts.animateType === 'card' && this.isVertical) {
            this.isOverspread = true;
        }

        /**
         * Debug mode
         * @type {function}
         * @private
         */
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

        /**
         * animate process time (ms), default: 300ms
         * @type {number}
         * @public
         */
        this.animateTime = opts.animateTime != null && opts.animateTime > -1 ? opts.animateTime : 300;

        /**
         * animate effects, default: ease
         * @type {string}
         * @public
         */
        this.animateEasing =
            inArray(opts.animateEasing, iSlider.EASING[0])
            || iSlider.EASING[1].test(opts.animateEasing)
                ? opts.animateEasing
                : 'ease';

        /**
         * In slide animation
         * @type {number}
         * @private
         */
        this.inAnimate = 0;

        /**
         * Fix touch/mouse events
         * @type {{hasTouch, startEvt, moveEvt, endEvt}}
         * @private
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
                        config[plugin[0]] = plugin.slice(1);
                    } else if (typeof plugin === 'string') {
                        config[plugin] = [];
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
                && typeof plugins[i].apply
                && plugins[i].apply(this, config[i]);
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
     * Get item type
     * @param {number} index
     * @returns {string}
     * @private
     */
    iSliderPrototype._itemType = function (item) {
        if (!isNaN(item)) {
            item = this.data[item];
        }
        if (item.hasOwnProperty('type')) {
            return item.type;
        }
        var content = item.content;
        var type;
        if (content == null) {
            type = 'empty';
        } else {
            if (Boolean(content.nodeName) && Boolean(content.nodeType)) {
                type = 'node';
            } else if (typeof content === 'string') {
                if (isUrl(content)) {
                    type = 'pic';
                } else {
                    type = 'html';
                }
            } else {
                type = 'unknown';
            }
        }

        item.type = type;

        return type;
    };

    /**
     * render single item html by idx
     * @param {HTMLElement} el ..
     * @param {number} dataIndex  ..
     * @private
     */
    iSliderPrototype._renderItem = function (el, dataIndex) {

        var item, len = this.data.length;

        var insertImg = function () {

            var simg = ' src="' + item.content + '"';

            if (item.height / item.width > this.ratio) {
                simg += ' height="' + el.clientHeight + '"';
            } else {
                simg += ' width="' + el.clientWidth + '"';
            }

            if (this.isOverspread) {
                el.style.background = 'url(' + item.content + ') no-repeat 50% 50%/cover';
                simg += ' style="display:block;opacity:0;height:100%;width:100%;"'
            }

            el.innerHTML = '<img' + simg + ' />';
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

        var type = this._itemType(item);

        this.log('[Render ITEM]:', type, dataIndex, item);

        el.className = 'islider-' + type;

        switch (type) {
            case 'pic':
                if (item.height && item.width) {
                    insertImg();
                }
                else {
                    var currentImg = new Image();
                    currentImg.src = item.content;
                    currentImg.onload = function () {
                        item.height = currentImg.height;
                        item.width = currentImg.width;
                        item.loaded = 1;
                        insertImg();
                    };
                }
                break;
            case 'dom':
            case 'html':
                el.innerHTML = item.content;
                break;
            case 'node':
            case 'element':
                // fragment, create container
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
     * Postponing the intermediate scene rendering
     * until the target scene is completely rendered (render in event slideChanged)
     * to avoid a jumpy feel when switching between scenes
     * given that the distance of sliding is more than 1.
     * e.g. ```this.slideTo(>+-1)```
     *
     * @private
     */
    iSliderPrototype._renderIntermediateScene = function () {
        if (this._intermediateScene != null) {
            this._renderItem.apply(this, this._intermediateScene);
            this._intermediateScene = null;
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
    iSliderPrototype._renderWrapper = function () {
        this.outer && (this.outer.innerHTML = '');
        // initail ul element
        var outer = this.outer || document.createElement('ul');
        outer.className = 'islider-outer';

        // storage li elements, only store 3 elements to reduce memory usage
        this.els = [];
        for (var i = 0; i < 3; i++) {
            var li = document.createElement('li');
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

        // Preload picture [ may be pic :) ]
        global.setTimeout(function () {
            this._preloadImg(this.slideIndex);
        }.bind(this), 200);

        // append ul to div#canvas
        if (!this.outer) {
            this.outer = outer;
            this.wrap.appendChild(outer);
        }
    };

    /**
     * Preload img when slideChange
     * From current index +2, -2 scene
     * @param {number} dataIndex means which image will be load
     * @private
     */
    iSliderPrototype._preloadImg = function (dataIndex) {
        if (this.data.length > 3) {
            var data = this.data;
            var len = data.length;
            var self = this;
            var loadImg = function preloadImgLoadingProcess(index) {
                var item = data[index];
                if (self._itemType(item) === 'pic' && !item.loaded) {
                    var preloadImg = new Image();
                    preloadImg.src = item.content;
                    preloadImg.onload = function () {
                        item.width = preloadImg.width;
                        item.height = preloadImg.height;
                    };
                    item.loaded = 1;
                }
            };

            loadImg((dataIndex + 2) % len);
            loadImg((dataIndex - 2 + len) % len);
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
                //self.inAnimate = 0;
                if (eventType === 'slideChanged') {
                    self._changedStyles();
                }
                self.fire.apply(self, args);
                self._renderIntermediateScene();
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
        global.addEventListener('resize', this);

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
            case 'mousedown':
                if (!(evt.button === 0 && evt.buttons === 1)) break;
            case 'touchstart':
                this.startHandler(evt);
                break;
            case device.moveEvt:
                this.moveHandler(evt);
                break;
            case device.endEvt:
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
            case 'resize':
                this.resizeHandler();
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
            if (iSlider.FIX_PAGE_TAGS.indexOf(evt.target.tagName) < 0) {
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
        global.setTimeout(function () {
            this.reset();
            this.log('Event: orientationchange');
        }.bind(this), 100);
    };

    /**
     * resize callback
     * @protected
     */
    iSliderPrototype.resizeHandler = function () {
        if (this.height !== this.wrap.clientHeight || this.width !== this.wrap.clientWidth) {
            this._LSN.resize && global.clearTimeout(this._LSN.resize);
            this._LSN.resize = global.setTimeout(function () {
                this.reset();
                this.log('Event: resize');
                this._LSN.resize && global.clearTimeout(this._LSN.resize);
            }.bind(this), 500);
        }
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

        // In the slide process, animate time is squeezed
        var squeezeTime = Math.abs(offset[this.axis]) / this.scale * animateTime;

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
        var headEl, tailEl, step;

        // slidechange should render new item
        // and change new item style to fit animation
        if (n === 0) {
            // Restore to current scene
            eventType = 'slideRestore';
        } else {

            if ((this.isVertical && (animateType === 'rotate' || animateType === 'flip')) ^ (n > 0)) {
                els.push(els.shift());
                headEl = els[2];
                tailEl = els[0];
                step = 1;
            }
            else {
                els.unshift(els.pop());
                headEl = els[0];
                tailEl = els[2];
                step = -1;
            }

            if (Math.abs(n) === 1) {
                this._renderIntermediateScene();
                this._renderItem(headEl, idx + n);
            } else if (Math.abs(n) > 1) {
                this._renderItem(headEl, idx + step);
                this._intermediateScene = [tailEl, idx - step];
            }

            headEl.style.webkitTransition = 'none';
            headEl.style.visibility = 'hidden';

            global.setTimeout(function () {
                headEl.style.visibility = 'visible';
            }, 200);

            // Minus squeeze time
            squeezeTime = animateTime - squeezeTime;

            eventType = 'slideChange';
        }

        this.fire(eventType, this.slideIndex, els[1], this);
        this._watchTransitionEnd(squeezeTime, eventType + 'd', this.slideIndex, els[1], this);

        // do the trick animation
        for (var i = 0; i < 3; i++) {
            if (els[i] !== headEl) {
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
     * @param {string} name
     * @param {function} plugin
     * @param {...}
     * @public
     */
    iSliderPrototype.regPlugin = function () {
        var args = Array.prototype.slice.call(arguments);
        var name = args.shift(),
            plugin = args[0];

        if (!this._plugins.hasOwnProperty(name) && typeof plugin !== 'function') {
            return;
        }
        if (typeof plugin === 'function') {
            this._plugins[name] = plugin;
            args.shift();
        }

        // Auto enable and init plugin when at run time
        if (!inArray(name, this._opts.plugins)) {
            this._opts.plugins.push(args.length ? [].concat([name], args) : name);
            typeof this._plugins[name] === 'function' && this._plugins[name].apply(this, args);
        }
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
     * TODO unbind, unDelegate
     * remove event delegate from wrap
     * @public
     */
    iSliderPrototype.unbind = iSliderPrototype.unDelegate = function (eventType, selector, callback) {

    };

    /**
     * removeEventListener to release the memory
     * @public
     */
    iSliderPrototype.destroy = function () {
        var outer = this.outer;
        var device = this.deviceEvents;

        this.fire('destroy');

        // Clear events
        outer.removeEventListener(device.startEvt, this);
        outer.removeEventListener(device.moveEvt, this);
        outer.removeEventListener(device.endEvt, this);
        global.removeEventListener('orientationchange', this);
        global.removeEventListener('focus', this);
        global.removeEventListener('blur', this);

        // Clear timer
        this._LSN.forEach(function clearTimerOnDestroy(timer) {
            timer && global.clearTimeout(timer);
        });

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
                // TODO will support custom context, now context is instance of iSlider
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
        this._renderWrapper();
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
        this._renderWrapper();
        this.fire('reloadData');
        this.isAutoplay && this.play();
    };

    /**
     * Start autoplay
     * @public
     */
    iSliderPrototype.play = function () {
        var self = this;
        this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);

        function play() {
            self._LSN.autoPlay = setTimeout(function () {
                self.slideNext();
                play();
            }, self.duration);
        };

        play();
    };

    /**
     * pause autoplay
     * @public
     */
    iSliderPrototype.pause = function () {
        this._LSN.autoPlay && clearTimeout(this._LSN.autoPlay);
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
