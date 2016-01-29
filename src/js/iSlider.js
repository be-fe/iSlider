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
     * @param {*} oElement
     * @param {Array} aSource
     * @returns {Boolean}
     */
    function inArray(oElement, aSource) {
        return aSource.indexOf(oElement) > -1;
    }

    /**
     * Check is array
     * @param {*} o
     * @returns {Boolean}
     */
    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    /**
     * Check is object
     * @param {*} o
     * @returns {Boolean}
     */
    function isObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }

    /**
     * @param {HTML Element} obj
     * @param {String} cls
     * @returns {Array|{index: number, input: string}}
     */
    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)(' + cls + ')(\\s|$)'));
    }

    /**
     * @param {HTML Element} obj
     * @param {String} cls
     */
    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) {
            obj.className += ' ' + cls;
        }
    }

    /**
     * @param {HTML Element} obj
     * @param {String} cls
     */
    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            obj.className = obj.className.replace(RegExp('(\\s|^)(' + cls + ')(\\s|$)'), '$3');
        }
    }

    /**
     * Check is url
     * @param {String} url
     * @returns {Boolean}
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
     * Parse arguments to array
     *
     * @param {Arguments} a
     * @param {Number|null} start
     * @param {Number|null} end
     * @returns {Array}
     */
    function _A(a) {
        return Array.prototype.slice.apply(a, Array.prototype.slice.call(arguments, 1));
    }

    /**
     * @constructor
     *
     * iSlicer([[{HTML Element} container,] {Array} datalist,] {Object} options)
     *
     * @param {HTML Element} container
     * @param {Array} datalist
     * @param {Object} options
     *
     * @description
     *  options.dom > container
     *  options.data > datalist
     */
    var iSlider = function () {

        var args = _A(arguments, 0, 3);
        if (!args.length) {
            throw new Error('Parameters required!');
        }

        var opts = isObject(args.slice(-1)[0]) ? args.pop() : {};

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
         * @type {Object}
         * @private
         */
        this._LSN = {};

        /**
         * Event handle
         * @type {{}}
         * @private
         */
        this._EventHandle = {};

        opts = null, args = null;

        this._setting();

        this.fire('initialize');

        this._renderWrapper();
        this._initPlugins();
        this._bindHandler();

        this.fire('initialized');

        // Autoplay mode
        this._autoPlay();
    };

    /**
     * Event white list
     * @type {Array}
     * @protected
     */
    iSlider.EVENTS = [
        'initialize',
        'initialized',
        'pluginInitialize',
        'pluginInitialized',
        'slide',
        'slideStart',
        'slideEnd',
        'slideChange',
        'slideChanged',
        'slideRestore',
        'slideRestored',
        'loadData',
        'reset',
        'destroy'
    ]
    /**
     * Easing white list
     * @type [Array, RegExp[]]
     * @protected
     */
    iSlider.EASING = [
        ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        /cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/
    ];

    /**
     * TAGS whitelist on fixpage mode
     * @type {Array}
     * @protected
     */
    iSlider.FIX_PAGE_TAGS = ['SELECT', 'INPUT', 'TEXTAREA', 'BUTTON', 'LABEL'];

    /**
     * @returns {String}
     * @private
     */
    iSlider.TRANSITION_END_EVENT = (function () {
        var el = document.createElement('fakeElement');
        var transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        for (var t in transitions) {
            if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    })();

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
     * @param {HTML Element} dom 图片的外层<li>容器 Img wrapper
     * @param {String} axis 动画方向 animate direction
     * @param {Number} scale 容器宽度 Outer wrapper
     * @param {Number} i <li>容器index Img wrapper's index
     * @param {Number} offset 滑动距离 move distance
     * @protected
     */
    iSlider._animateFuncs = {
        'normal': (function () {
            function normal(dom, axis, scale, i, offset) {
                dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
            }

            normal.effect = 'transform';
            return normal;
        })()
    };

    /**
     * This is a alias, conducive to compression
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
         * @type {Boolean}
         * @private
         */
        this.holding = false;

        /**
         * @type {Boolean}
         * @private
         */
        this.locking = false;

        // --------------------------------
        // - Set options
        // --------------------------------

        var opts = this._opts;

        /**
         * dom element wrapping content
         * @type {HTML Element}
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
         * @type {Boolean}
         * @public
         */
        this.isVertical = !!opts.isVertical;

        /**
         * Overspread mode
         * @type {Boolean}
         * @public
         */
        this.isOverspread = !!opts.isOverspread;

        /**
         * Play time gap
         * @type {Number}
         * @public
         */
        this.duration = opts.duration || 2000;

        /**
         * start from initIndex or 0
         * @type {Number}
         * @public
         */
        this.initIndex = opts.initIndex > 0 && opts.initIndex <= opts.data.length - 1 ? opts.initIndex : 0;

        /**
         * touchstart prevent default to fixPage
         * @type {Boolean}
         * @public
         */
        this.fixPage = opts.fixPage == null ? true : !!opts.fixPage;

        /**
         * Fill seam when render
         * Default is false
         * @type {Boolean}
         * @public
         */
        this.fillSeam = !!opts.fillSeam;

        /**
         * slideIndex
         * @type {Number}
         * @private
         */
        this.slideIndex = this.slideIndex || this.initIndex || 0;

        /**
         * Axis
         * @type {String}
         * @public
         */
        this.axis = this.isVertical ? 'Y' : 'X';

        /**
         * reverseAxis
         * @type {String}
         * @private
         */
        this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

        /**
         * Wrapper width
         * @type {Number}
         * @private
         */
        this.width = typeof opts.width === 'number' ? opts.width : this.wrap.clientWidth;

        /**
         * Wrapper height
         * @type {Number}
         * @private
         */
        this.height = typeof opts.height === 'number' ? opts.height : this.wrap.clientHeight;

        /**
         * Ratio height:width
         * @type {Number}
         * @private
         */
        this.ratio = this.height / this.width;

        /**
         * Scale, size rule
         * @type {Number}
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
         * Enable/disable touch events
         * @type {Boolean}
         * @private
         */
        this.isTouchable = opts.isTouchable == null ? true : !!opts.isTouchable;

        /**
         * looping logic adjust
         * @type {Boolean}
         * @private
         */
        this.isLooping = opts.isLooping && this.data.length > 1 ? true : false;

        /**
         * AutoPlay waitting milsecond to start
         * @type {Number}
         * @private
         */
        this.delay = opts.delay || 0;

        /**
         * autoplay logic adjust
         * @type {Boolean}
         * @private
         */
        this.isAutoplay = opts.isAutoplay && this.data.length > 1 ? true : false;

        /**
         * Animate type
         * @type {String}
         * @private
         */
        this.animateType = opts.animateType in this._animateFuncs ? opts.animateType : 'normal';

        /**
         * @protected
         */
        this._animateFunc = this._animateFuncs[this.animateType];

        /**
         * @private
         */
        this._animateReverse = (function () {
            var _ = [];
            for (var type in this._animateFuncs) {
                if (this._animateFuncs.hasOwnProperty(type) && this._animateFuncs[type].reverse) {
                    _.push(type);
                }
            }
            return _;
        }.bind(this))();

        // little trick set, when you chooce tear & vertical same time
        // iSlider overspread mode will be set true autometicly
        if (this.isVertical && this.animateType === 'card') {
            this.isOverspread = true;
        }

        /**
         * Debug mode
         * @type {Function}
         * @private
         */
        this.log = opts.isDebug ? function () {
            global.console.log.apply(global.console, arguments);
        } : function () {
        };

        // set Damping function
        this._setUpDamping();

        /**
         * animate process time (ms), default: 300ms
         * @type {Number}
         * @public
         */
        this.animateTime = opts.animateTime != null && opts.animateTime > -1 ? opts.animateTime : 300;

        /**
         * animate effects, default: ease
         * @type {String}
         * @public
         */
        this.animateEasing =
            inArray(opts.animateEasing, iSlider.EASING[0])
            || iSlider.EASING[1].test(opts.animateEasing)
                ? opts.animateEasing
                : 'ease';

        /**
         * In slide animation
         * @type {Number}
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
                endEvt: hasTouch ? 'touchend' : 'mouseup',
                resizeEvt: 'onorientationchange' in global ? 'orientationchange' : 'resize'
            };
        })();

        /**
         * Finger recognition range, prevent inadvertently touch
         * @type {Number}
         */
        this.fingerRecognitionRange = opts.fingerRecognitionRange > -1 ? parseInt(opts.fingerRecognitionRange) : 10;

        /**
         * is on Moving
         * @type {Boolean}
         * @private
         */
        this.isMoving = false;

        /**
         * Init events
         * @type {{}}
         * @private
         */
        this.events = {};

        // --------------------------------
        // - Register events
        // --------------------------------

        iSlider.EVENTS.forEach(function (eventName) {
            var fn = opts['on' + eventName.toLowerCase()];
            if (typeof fn === 'function') {
                this.on(eventName, fn, 1);
            }
        }.bind(this));

        // Callback function when iSlider start initialization (after setting, before render)
        // this.on('initialize', opts.oninitialize, 1);

        // Callback function when iSlider initialized
        // this.on('initialized', opts.oninitialized, 1);

        // Callback function when iSlider plugins initialized
        // this.on('pluginInitialized', opts.onplugininitialized, 1);

        // Callback function when your finger is moving
        // this.on('slide', opts.onslide, 1);

        // Callback function when your finger touch the screen
        // this.on('slideStart', opts.onslidestart, 1);

        // Callback function when the finger move out of the screen
        // this.on('slideEnd', opts.onslideend, 1);

        // Callback function when slide to next/prev scene
        // this.on('slideChange', opts.onslidechange, 1);

        // Callback function when next/prev scene, while animation has completed
        // this.on('slideChanged', opts.onslidechanged, 1);

        // Callback function when restore to the current scene
        // this.on('slideRestore', opts.onsliderestore, 1);

        // Callback function when restore to the current scene, while animation has completed
        // this.on('slideRestored', opts.onsliderestored, 1);

        // --------------------------------
        // - Plugins
        // --------------------------------

        /**
         * @type {Object}
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
                return {};
            }
        })();
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
        this.fire('pluginInitialized');
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
     * @param {Number} index
     * @returns {String}
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
     * @param {HTML Element} el ..
     * @param {Number} dataIndex  ..
     * @private
     */
    iSliderPrototype._renderItem = function (el, dataIndex) {

        var item,
            self = this,
            len = this.data.length;

        var insertImg = function renderItemInsertImg() {
            var simg = ' src="' + item.content + '"';
            // auto scale to full screen
            if (item.height / item.width > self.ratio) {
                simg += ' height="100%"';
            } else {
                simg += ' width="100%"';
            }
            if (self.isOverspread) {
                el.style.cssText += 'background-image:url(' + item.content + ');background-repeat:no-repeat;background-position:50% 50%;background-size:cover';
                simg += ' style="display:block;opacity:0;height:100%;width:100%;"';
            }
            // for right button, save picture
            el.innerHTML = '<img' + simg + ' />';
        };

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
                if (item.load === 2) {
                    insertImg();
                }
                else {
                    var currentImg = new Image();
                    currentImg.src = item.content;
                    currentImg.onload = function () {
                        item.height = currentImg.height;
                        item.width = currentImg.width;
                        insertImg();
                        item.load = 2;
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
            removeClass(el, slideStyles.join('|'));
            addClass(el, slideStyles[index]);

            // TODO For seams
            this.fillSeam && this.originScale(el);
        }.bind(this));
    };

    /**
     * render list html
     * @private
     */
    iSliderPrototype._renderWrapper = function () {
        this.wrap.style.overflow = 'hidden';
        // initail outer element
        var outer;
        if (this.outer) {
            outer = this.outer;
            outer.innerHTML = '';
        } else {
            outer = document.createElement('ul');
        }
        outer.className = 'islider-outer';
        outer.style.overflow = 'hidden';
        // no need...
        // outer.style.cssText += 'width:' + this.wrap.offsetWidth + 'px;height:' + this.wrap.offsetHeight + 'px';

        // storage li elements, only store 3 elements to reduce memory usage
        /**
         * Slider elements x3
         * @type {Array}
         * @public
         */
        this.els = [];

        for (var i = 0; i < 3; i++) {
            var li = document.createElement('li');
            this.els.push(li);

            // prepare style animation
            this._animateFunc(li, this.axis, this.scale, i, 0);

            // auto overflow in none fixPage mode
            if (!this.fixPage) {
                li.style.overflow = 'auto';
            }

            this.isVertical && (this.animateType === 'rotate' || this.animateType === 'flip')
                ? this._renderItem(li, 1 - i + this.slideIndex)
                : this._renderItem(li, i - 1 + this.slideIndex);

            outer.appendChild(li);
        }

        this._changedStyles();

        if (this.fillSeam) {
            this.els.forEach(function (el, i) {
                addClass(el, 'islider-sliding' + (i === 1 ? '-focus' : ''));
            });
        }

        // Preload picture [ may be pic :) ]
        global.setTimeout(function () {
            this._preloadImg(this.slideIndex);
        }.bind(this), 200);

        // append ul to div#canvas
        if (!this.outer) {
            /**
             * @type {HTML Element}
             * @public
             */
            this.outer = outer;
            this.wrap.appendChild(outer);
        }

        this.currentEl = this.els[1];

        this.fire('renderComplete', this.slideIndex, this.currentEl, this);
    };

    /**
     * Preload img when slideChange
     * From current index +2, -2 scene
     * @param {Number} dataIndex means which image will be load
     * @private
     */
    iSliderPrototype._preloadImg = function (dataIndex) {
        if (this.data.length > 3) {
            var data = this.data;
            var len = data.length;
            var self = this;
            var loadImg = function preloadImgLoadingProcess(index) {
                var item = data[index];
                if (self._itemType(item) === 'pic' && !item.load) {
                    var preloadImg = new Image();
                    preloadImg.src = item.content;
                    preloadImg.onload = function () {
                        item.width = preloadImg.width;
                        item.height = preloadImg.height;
                        item.load = 2;
                    };
                    item.load = 1;
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
        var lsn;
        this.log('Event:', 'watchTransitionEnd::stuck::pile', this.inAnimate);

        function handle(/*evt*/) {
            if (lsn) {
                global.clearTimeout(lsn);
            }
            self.inAnimate--;
            self.log('Event:', 'watchTransitionEnd::stuck::release', self.inAnimate);
            if (self.inAnimate === 0) {
                if (eventType === 'slideChanged') {
                    self._changedStyles();
                }
                self.fire.call(self, eventType, self.slideIndex, self.currentEl, self);
                self._renderIntermediateScene();
                self.play();
            }
            unWatch();
        }

        function unWatch() {
            self.els.forEach(function translationEndUnwatchEach(el) {
                el.removeEventListener(iSlider.TRANSITION_END_EVENT, handle);
            });
        }

        if (time > 0) {
            self.els.forEach(function translationEndElsEach(el) {
                el.addEventListener(iSlider.TRANSITION_END_EVENT, handle);
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

        if (this.isTouchable) {
            if (!device.hasTouch) {
                outer.style.cursor = 'pointer';
                // disable drag
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

            // Viscous drag adaptation
            !device.hasTouch && outer.addEventListener('mouseout', this);
        }

        global.addEventListener(device.resizeEvt, this);

        // Fix android device
        global.addEventListener('focus', this, false);
        global.addEventListener('blur', this, false);
    };

    /**
     *  Uniformity admin event
     *  Event router
     *  @param {Object} evt event object
     *  @protected
     */
    iSliderPrototype.handleEvent = function (evt) {
        var device = this.deviceEvents;
        switch (evt.type) {
            case 'mousedown':
                // block mouse buttons except left
                if (evt.button !== 0) break;
            case 'touchstart':
                this.startHandler(evt);
                break;
            case device.moveEvt:
                this.moveHandler(evt);
                break;
            case device.endEvt:
            case 'mouseout': // mouseout event, trigger endEvent
            case 'touchcancel':
                this.endHandler(evt);
                break;
            case device.resizeEvt:
                this[device.resizeEvt + 'Handler']();
                break;
            case 'focus':
                this.play();
                break;
            case 'blur':
                this.pause();
                break;
        }
    };

    /**
     *  touchstart callback
     *  @param {Object} evt event object
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

        /**
         * @type {Number}
         * @private
         */
        this.startTime = new Date().getTime();

        /**
         * @type {Number}
         * @private
         */
        this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;

        /**
         * @type {Number}
         * @private
         */
        this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
    };

    /**
     *  touchmove callback
     *  @param {Object} evt event object
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

            if (!this.isLooping) {
                if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
                    offset[axis] = this._damping(offset[axis]);
                }
            }

            for (var i = 0; i < 3; i++) {
                var item = this.els[i];
                item.style.visibility = 'visible';
                item.style.webkitTransition = 'none';
                this._animateFunc(item, axis, this.scale, i, offset[axis], offset[axis]);

                // TODO For seams
                this.fillSeam && this.seamScale(item);
            }

            this.fire('slide', evt, this);
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
        var FRR = this.fingerRecognitionRange;

        // a quick slide time must under 300ms
        // a quick slide should also slide at least 14 px
        boundary = endTime - this.startTime > 300 ? boundary : 14;

        var absOffset = Math.abs(offset[axis]);
        var absReverseOffset = Math.abs(offset[this.reverseAxis]);

        function dispatchLink(el) {
            if (el != null) {
                if (el.tagName === 'A') {
                    if (el.href) {
                        if (el.getAttribute('target') === '_blank') {
                            global.open(el.href);
                        } else {
                            global.location.href = el.href;
                        }
                        evt.preventDefault();
                        return false;
                    }
                }
                else if (el.tagName === 'LI' && el.className.search(/^islider\-/) > -1) {
                    return false;
                }
                else {
                    dispatchLink(el.parentNode);
                }
            }
        }

        this.fire('slideEnd', evt, this);

        if (offset[axis] >= boundary && absReverseOffset < absOffset) {
            this.slideTo(this.slideIndex - 1);
        }
        else if (offset[axis] < -boundary && absReverseOffset < absOffset) {
            this.slideTo(this.slideIndex + 1);
        }
        else {
            if (Math.abs(this.offset[this.axis]) >= FRR) {
                this.slideTo(this.slideIndex);
            }
        }

        // create sim tap event if offset < this.fingerRecognitionRange
        if (Math.abs(this.offset[this.axis]) < FRR && this.fixPage && evt.target) {
            dispatchLink(evt.target);
        }

        this.offset.X = this.offset.Y = 0;
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
                this._LSN.resize && global.clearTimeout(this._LSN.resize);
                this.log('Event: resize');
            }.bind(this), 500);
        }
    };

    /**
     *  slide logical, goto data index
     *  @param {Number} dataIndex the goto index
     *  @public
     */
    iSliderPrototype.slideTo = function (dataIndex, opts) {
        if (this.isAutoplay) {
            this.pause();
        }
        if (this.locking) {
            return;
        }
        this.unhold();
        var animateTime = this.animateTime;
        var animateType = this.animateType;
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
                // this.slideIndex = this.slideIndex;
                n = 0;
            }
        }

        this.log('Index:' + this.slideIndex);

        // keep the right order of items
        var headEl, tailEl, direction;

        // slidechange should render new item
        // and change new item style to fit animation
        if (n === 0) {
            // Restore to current scene
            eventType = 'slideRestore';
        } else {

            if ((this.isVertical && (inArray(animateType, this._animateReverse))) ^ (n > 0)) {
                els.push(els.shift());
                headEl = els[2];
                tailEl = els[0];
                direction = 1;
            }
            else {
                els.unshift(els.pop());
                headEl = els[0];
                tailEl = els[2];
                direction = -1;
            }

            this.currentEl = els[1];

            if (Math.abs(n) === 1) {
                this._renderIntermediateScene();
                this._renderItem(headEl, idx + n);
            } else if (Math.abs(n) > 1) {
                this._renderItem(headEl, idx + direction);
                this._intermediateScene = [tailEl, idx - direction];
            }

            headEl.style.webkitTransition = 'none';

            // Disperse ghost in the back
            //if (-1 < ['rotate', 'flip'].indexOf(animateType)) {
            //    headEl.style.visibility = 'hidden';
            //    this.currentEl.style.visibility = 'visible';
            //}

            // Minus squeeze time
            squeezeTime = animateTime - squeezeTime;

            eventType = 'slideChange';

            // TODO For seams
            if (this.fillSeam) {
                els.forEach(function (el) {
                    removeClass(el, 'islider-sliding|islider-sliding-focus');
                });
                addClass(this.currentEl, 'islider-sliding-focus');
                addClass(headEl, 'islider-sliding');
            }
        }

        this.fire(eventType, this.slideIndex, this.currentEl, this);
        this._watchTransitionEnd(squeezeTime, eventType + 'd');

        // do the trick animation
        for (var i = 0; i < 3; i++) {
            if (els[i] !== headEl) {
                // TODO: Only applies their effects
                els[i].style.webkitTransition = (animateFunc.effect || 'all') + ' ' + (squeezeTime / 1000) + 's ' + this.animateEasing;
            }
            animateFunc.call(this, els[i], this.axis, this.scale, i, 0, direction);

            this.fillSeam && this.seamScale(els[i]);
        }
    };

    /**
     * Slide to next scene
     * @public
     */
    iSliderPrototype.slideNext = function () {
        this.slideTo.apply(this, [this.slideIndex + 1].concat(_A(arguments)));
    };

    /**
     * Slide to previous scene
     * @public
     */
    iSliderPrototype.slidePrev = function () {
        this.slideTo.apply(this, [this.slideIndex - 1].concat(_A(arguments)));
    };

    /**
     * Register plugin (run time mode)
     * @param {String} name
     * @param {Function} plugin
     * @param {...}
     * @public
     */
    iSliderPrototype.regPlugin = function () {
        var args = _A(arguments);
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
     *  @param {String} evtType event name
     *  @param {String} selector the simple css selector like jQuery
     *  @param {Function} callback event callback
     *  @public
     */
    iSliderPrototype.bind = iSliderPrototype.delegate = function (evtType, selector, callback) {

        function delegatedEventCallbackHandle(e) {
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

        this.wrap.addEventListener(evtType, delegatedEventCallbackHandle, false);

        var key = evtType + ';' + selector;
        if (!this._EventHandle.hasOwnProperty(key)) {
            this._EventHandle[key] = [
                [callback],
                [delegatedEventCallbackHandle]
            ];
        } else {
            this._EventHandle[key][0].push(callback);
            this._EventHandle[key][1].push(delegatedEventCallbackHandle);
        }
    };

    /**
     * remove event delegate from wrap
     *
     * @param {String} evtType event name
     * @param {String} selector the simple css selector like jQuery
     * @param {Function} callback event callback
     * @public
     */
    iSliderPrototype.unbind = iSliderPrototype.unDelegate = function (evtType, selector, callback) {
        var key = evtType + ';' + selector;
        if (this._EventHandle.hasOwnProperty(key)) {
            var i = this._EventHandle[key][0].indexOf(callback);
            if (i > -1) {
                this.wrap.removeEventListener(evtType, this._EventHandle[key][1][i]);
                this._EventHandle[key][0][i] = this._EventHandle[key][1][i] = null;
                // delete this._EventHandle[key][0][i];
                // delete this._EventHandle[key][1][i];
                return true;
            }
        }

        return false;
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
        if (this.isTouchable) {
            outer.removeEventListener(device.startEvt, this);
            outer.removeEventListener(device.moveEvt, this);
            outer.removeEventListener(device.endEvt, this);

            // Viscous drag unbind
            !device.hasTouch && outer.removeEventListener('mouseout', this);
        }
        global.removeEventListener(device.resizeEvt, this);
        global.removeEventListener('focus', this);
        global.removeEventListener('blur', this);

        var n;

        // Clear delegate events
        for (n in this._EventHandle) {
            var handList = this._EventHandle[n][1];
            for (var i = 0; i < handList.length; i++) {
                if (typeof handList[i] === 'function') {
                    this.wrap.removeEventListener(n.substr(0, n.indexOf(';')), handList[i]);
                }
            }
        }
        this._EventHandle = null;

        // Clear timer
        for (n in this._LSN) {
            this._LSN.hasOwnProperty(n) && this._LSN[n] && global.clearTimeout(this._LSN[n]);
        }

        this._LSN = null;

        this.wrap.innerHTML = '';
    };

    /**
     * Register event callback
     * @param {String} eventName
     * @param {Function} func
     * @public
     */
    iSliderPrototype.on = function (eventName, func, force) {
        if (inArray(eventName, iSlider.EVENTS) && typeof func === 'function') {
            !(eventName in this.events) && (this.events[eventName] = []);
            if (!force) {
                this.events[eventName].push(func);
            } else {
                this.events[eventName].unshift(func);
            }
        }
    };

    /**
     * Find callback function position
     * @param {String} eventName
     * @param {Function} func
     * @returns {Boolean}
     * @public
     */
    iSliderPrototype.has = function (eventName, func) {
        if (eventName in this.events) {
            return -1 < this.events[eventName].indexOf(func);
        }
        return false;
    };

    /**
     * Remove event callback
     * @param {String} eventName
     * @param {Function} func
     * @public
     */
    iSliderPrototype.off = function (eventName, func) {
        if (eventName in this.events) {
            var index = this.events[eventName].indexOf(func);
            if (index > -1) {
                delete this.events[eventName][index];
            }
        }
    };

    /**
     * Trigger event callbacks
     * @param {String} eventName
     * @param {*} args
     * @public
     */
    iSliderPrototype.fire = function (eventNames) {
        var args = _A(arguments, 1);
        eventNames.split(/\x20+/).forEach(function (eventName) {
            this.log('[EVENT FIRE]:', eventName, args);
            if (eventName in this.events) {
                var funcs = this.events[eventName];
                for (var i = 0; i < funcs.length; i++) {
                    typeof funcs[i] === 'function'
                    && funcs[i].apply
                    && funcs[i].apply(this, args);
                }
            }
        }.bind(this));
    };

    /**
     * reset & rerender
     * @public
     */
    iSliderPrototype.reset = function () {
        this.pause();
        //this._setting();
        this.width = typeof this._opts.width === 'number' ? this._opts.width : this.wrap.clientWidth;
        this.height = typeof this._opts.height === 'number' ? this._opts.height : this.wrap.clientHeight;
        this.ratio = this.height / this.width;
        this.scale = this.isVertical ? this.height : this.width;
        this._renderWrapper();
        this._autoPlay();
        this.fire('reset slideRestored', this.slideIndex, this.currentEl, this);
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
        this._autoPlay();
        this.fire('loadData slideChanged', this.slideIndex, this.currentEl, this);
    };

    /**
     * auto check to play and bind events
     * @private
     */
    iSliderPrototype._autoPlay = function () {
        this.delay > 0 ? global.setTimeout(this.play.bind(this), this.delay) : this.play();
    };

    /**
     * Start autoplay
     * @public
     */
    iSliderPrototype.play = function () {
        this.pause();
        // If not looping, stop playing when meet the end of data
        if (this.isAutoplay && (this.isLooping || this.slideIndex < this.data.length - 1)) {
            this._LSN.autoPlay = global.setTimeout(this.slideNext.bind(this), this.duration);
        }
    };

    /**
     * pause autoplay
     * @public
     */
    iSliderPrototype.pause = function () {
        this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);
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

    /**
     * Fill the seam
     * @param {HTML Element} el
     */
    iSliderPrototype.seamScale = function (el) {
        var regex = /scale([XY]?)\(([^\)]+)\)/;
        if (regex.test(el.style.webkitTransform)) {
            el.style.webkitTransform = el.style.webkitTransform.replace(regex, function (res, axis, scale) {
                var sc = {};
                if (axis) {
                    sc[axis] = parseFloat(scale);
                    return 'scale' + this.axis + '(' + (axis === this.axis ? 1.001 * sc[this.axis] : 1.001) + ')';
                } else {
                    if (scale.indexOf(',') > -1) {
                        scale = scale.split(',');
                        sc.X = parseFloat(scale[0]);
                        sc.Y = parseFloat(scale[1]);
                    } else {
                        sc.Y = sc.X = parseFloat(scale);
                    }
                    sc[this.axis] *= 1.001;
                    return 'scale(' + sc.X + ', ' + sc.Y + ')';
                }
            }.bind(this));
        } else {
            el.style.webkitTransform += 'scale' + this.axis + '(1.001)';
        }
    };

    /**
     *
     * @param {HTML Element} el
     */
    iSliderPrototype.originScale = function (el) {
        var regex = /([\x20]?scale)([XY]?)\(([^\)]+)\)/;
        el.style.webkitTransform = el.style.webkitTransform.replace(regex, function (sc, res, axis, scale) {
            sc = {};
            if (axis) {
                if (scale === '1.001') {
                    return '';
                } else {
                    sc[axis] = parseFloat(scale);
                    return 'scale' + this.axis + '(' + (axis === this.axis ? sc[this.axis] / 1.001 : 1) + ')';
                }
            } else {
                if (scale.indexOf(',') > -1) {
                    scale = scale.split(',');
                    sc.X = parseFloat(scale[0]);
                    sc.Y = parseFloat(scale[1]);
                } else {
                    sc.Y = sc.X = parseFloat(scale);
                }
                sc[this.axis] /= 1.001;
                return 'scale(' + sc.X + ', ' + sc.Y + ')';
            }
        }.bind(this));
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
