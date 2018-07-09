(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["iSlider"] = factory();
	else
		root["iSlider"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	// require("exports?iSlider!./export-iSlider");
	var iSlider = __webpack_require__(5);
	__webpack_require__(8);
	// require('../build/iSlider.plugin.dot');
	// require('../build/iSlider.plugin.button');
	// require('../build/iSlider.plugin.BIZone');
	// require('../build/iSlider.plugin.zoompic');

	module.exports = iSlider;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./iSlider.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./iSlider.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/**\n * @file iSlider.css\n */\n\n/**\n * ===========================\n * iSlider\n * ===========================\n */\n.islider-outer {\n    display: block;\n    position: relative;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    width: 100%;\n    overflow: hidden;\n}\n\n.islider-outer > li {\n    position: absolute;\n    top: 0;\n    left: 0;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%;\n    list-style: none;\n    overflow: hidden;\n    display: -moz-box;\n    display: -webkit-box;\n    display: box;\n    -moz-box-pack: center;\n    -webkit-box-pack: center;\n    box-pack: center;\n    -moz-box-align: center;\n    -webkit-box-align: center;\n    box-align: center;\n}\n\n.islider-img > img {\n    max-width: 100%;\n    max-height: 100%;\n}\n\n.islider-sliding {\n    z-index: 0;\n}\n\n.islider-sliding-focus {\n    z-index: 1;\n}\n\n/**\n * ===========================\n * iSlider.plugin.button\n * ===========================\n */\n.islider-btn-outer {\n    position: absolute;\n    width: 3em;\n    height: 3em;\n    cursor: pointer;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    display: block;\n    background-color: #777777;\n}\n\n.islider-btn-outer.left {\n    left: 5%;\n}\n\n.islider-btn-outer.right {\n    right: 5%;\n}\n\n.islider-btn-inner {\n    position: absolute;\n    width: 50%;\n    height: 50%;\n    border-top: 2px solid #ffffff;\n    border-left: 2px solid #ffffff;\n    margin: auto;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n\n.islider-btn-outer.left > .islider-btn-inner {\n    -webkit-transform: rotate(-45deg);\n    -moz-transform: rotate(-45deg);\n    -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n\n.islider-btn-outer.right > .islider-btn-inner {\n    -webkit-transform: rotate(135deg);\n    -moz-transform: rotate(135deg);\n    -ms-transform: rotate(135deg);\n    -o-transform: rotate(135deg);\n    transform: rotate(135deg);\n}\n\n/**\n * ===========================\n * iSlider.plugin.dot\n * ===========================\n */\n.islider-dot-wrap {\n    width: 80%;\n    height: 10%;\n    margin: 0 auto;\n    position: absolute;\n    padding: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 10000;\n    text-align: center;\n}\n\n.islider-dot {\n    position: relative;\n    display: inline-block;\n    width: 0.8em;\n    height: 0.8em;\n    border-radius: 50%;\n    border: 1px solid #ffffff;\n    list-style: none;\n    margin: 5px;\n}\n\n.islider-dot.active {\n    background-color: #ffffff;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
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
	     * noop function
	     */
	    function noop() {
	    }

	    /**
	     * Check in array
	     * @param {*} o
	     * @param {Array} arr
	     * @returns {Boolean}
	     */
	    function inArray(o, arr) {
	        return arr.indexOf(o) > -1;
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
	     * @param {HTMLElement} el
	     * @param {String} cls
	     * @returns {Array|{index: number, input: string}}
	     */
	    function hasClass(el, cls) {
	        return el.className.match(new RegExp('(\\s|^)(' + cls + ')(\\s|$)'));
	    }

	    /**
	     * @param {HTMLElement} el
	     * @param {String} cls
	     */
	    function addClass(el, cls) {
	        if (!hasClass(el, cls)) {
	            el.className += ' ' + cls;
	        }
	    }

	    /**
	     * @param {HTMLElement} el
	     * @param {String} cls
	     */
	    function removeClass(el, cls) {
	        if (hasClass(el, cls)) {
	            el.className = el.className.replace(RegExp('(\\s|^)(' + cls + ')(\\s|$)'), '$3');
	        }
	    }

	    /**
	     * Check is url
	     * @param {String} url
	     * @returns {Boolean}
	     */
	    function isUrl(url) {
	        if (/<\/?[^>]*>/.test(url))
	            return false;
	        return /^(?:(https|http|ftp|rtsp|mms):)?(\/\/)?(\w+:{0,1}\w*@)?([^\?#:\/]+\.[a-z]+|\d+\.\d+\.\d+\.\d+)?(:[0-9]+)?((?:\.?\/)?([^\?#]*)?(\?[^#]+)?(#.+)?)?$/.test(url);
	    }

	    /**
	     * Check is dom object
	     * @param {object} dom
	     * @returns {Boolean}
	     */
	    function isDom(obj) {
	        try {
	            return obj instanceof HTMLElement;
	        }
	        catch (e) {
	            return (typeof obj === "object") &&
	                (obj.nodeType === 1) && (typeof obj.style === "object") &&
	                (typeof obj.ownerDocument === "object");
	        }
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

	    function IU(word) {
	        return word.replace(/^[a-z]/, function (t) {
	            return t.toUpperCase();
	        });
	    }

	    /**
	     * @constructor
	     *
	     * iSlider([[{HTMLElement} container,] {Array} datalist,] {Object} options)
	     *
	     * @param {HTMLElement} container
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
	        else if (!isDom(opts.dom)) {
	            throw new Error('Container must be a HTMLElement instance!');
	        }

	        if (!opts.data || !opts.data.length) {
	            throw new Error('Data must be an array and must have more than one element!');
	        }

	        /**
	         * Options
	         * @private
	         */
	        this._opts = opts;

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
	     * version
	     * @type {string}
	     */
	    iSlider.VERSION = '2.2.4';

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
	        'renderComplete',
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
	    ];

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
	     * Scene node types
	     * @type {Object}
	     * @protected
	     * TODO Prepare for the migration Symbol ES6.
	     */
	    iSlider.NODE_TYPE = {
	        unknown: 'unknown',
	        empty: 'empty',
	        pic: 'pic',
	        dom: 'dom',
	        html: 'html',
	        node: 'node',
	        element: 'element'
	    };

	    /**
	     * @returns {String}
	     * @private
	     */
	    iSlider.TRANSITION_END_EVENT = null;

	    iSlider.BROWSER_PREFIX = null;

	    (function () {
	        var e = document.createElement('fakeElement');
	        [
	            ['WebkitTransition', 'webkitTransitionEnd', 'webkit'],
	            ['transition', 'transitionend', null],
	            ['MozTransition', 'transitionend', 'moz'],
	            ['OTransition', 'oTransitionEnd', 'o']
	        ].some(function (t) {
	            if (e.style[t[0]] !== undefined) {
	                iSlider.TRANSITION_END_EVENT = t[1];
	                iSlider.BROWSER_PREFIX = t[2];
	                return true;
	            }
	        });
	    })();

	    /**
	     * Event match depending on the browser supported
	     * @type {{hasTouch, startEvt, moveEvt, endEvt, cancelEvt, resizeEvt}}
	     */
	    iSlider.DEVICE_EVENTS = (function () {
	        // IOS desktop has touch events, make them busting
	        var hasTouch = !!(('ontouchstart' in global && !/Mac OS X /.test(global.navigator.userAgent)) || global.DocumentTouch && document instanceof global.DocumentTouch);
	        return {
	            hasTouch: hasTouch,
	            startEvt: hasTouch ? 'touchstart' : 'mousedown',
	            moveEvt: hasTouch ? 'touchmove' : 'mousemove',
	            endEvt: hasTouch ? 'touchend' : 'mouseup',
	            cancelEvt: hasTouch ? 'touchcancel' : 'mouseout',
	            resizeEvt: 'onorientationchange' in global ? 'orientationchange' : 'resize'
	        };
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
	     * @param {String} prop
	     * @param {String} value
	     * @returns {String}
	     * @public
	     */
	    iSlider.styleProp = function (prop, isDP) {
	        if (iSlider.BROWSER_PREFIX) {
	            if (!!isDP) {
	                return iSlider.BROWSER_PREFIX + IU(prop);
	            } else {
	                return '-' + iSlider.BROWSER_PREFIX + '-' + prop;
	            }
	        } else {
	            return prop;
	        }
	    };

	    /**
	     * @param {String} prop
	     * @param {HTMLElement} dom
	     * @param {String} value
	     * @public
	     */
	    iSlider.setStyle = function (dom, prop, value) {
	        dom.style[iSlider.styleProp(prop, 1)] = value;
	    };

	    /**
	     * @param {String} prop
	     * @param {HTMLElement} dom
	     * @param {String} value
	     * @public
	     */
	    iSlider.getStyle = function (dom, prop) {
	        return dom.style[iSlider.styleProp(prop, 1)];
	    };

	    /**
	     * @type {Object}
	     *
	     * @param {HTMLElement} dom The wrapper <li> element
	     * @param {String} axis Animate direction
	     * @param {Number} scale Outer wrapper
	     * @param {Number} i Wrapper's index
	     * @param {Number} offset Move distance
	     * @protected
	     */
	    iSlider._animateFuncs = {
	        normal: (function () {
	            function normal(dom, axis, scale, i, offset) {
	                iSlider.setStyle(dom, 'transform', 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)');
	            }

	            normal.effect = iSlider.styleProp('transform');
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

	        var self = this;

	        // --------------------------------
	        // - Status
	        // --------------------------------

	        /**
	         * The plugins
	         * @type {Array|{}|*}
	         * @private
	         */
	        self._plugins = iSlider.plugins;

	        /**
	         * Extend animations
	         * @type {{default: Function}|*}
	         * @private
	         */
	        self._animateFuncs = iSlider._animateFuncs;

	        /**
	         * @type {Boolean}
	         * @private
	         */
	        self._holding = false;

	        /**
	         * @type {Boolean}
	         * @private
	         */
	        self._locking = false;

	        /**
	         * @type {Array}
	         * @private
	         */
	        self._intermediateScene = null;

	        /**
	         * @type {null}
	         * @private
	         */
	        self._transitionEndHandler = null;

	        /**
	         * listener
	         * @type {{autoPlay: null, resize: null, transitionEnd: null}}
	         * @private
	         */
	        self._LSN = {
	            autoPlay: null,
	            resize: null,
	            transitionEnd: null
	        };

	        /**
	         * current scene element: this.els[1]
	         * @type {null}
	         * @public
	         */
	        self.currentEl = null;

	        /**
	         * Event handle
	         * @type {Object}
	         * @private
	         */
	        self._EventHandle = {};

	        /**
	         * is on Moving
	         * @type {Boolean}
	         * @private
	         */
	        self.onMoving = false;

	        /**
	         * is on Sliding
	         * @type {Boolean}
	         * @private
	         */
	        self.onSliding = false;

	        /**
	         * animate direction
	         * @type {Number|null}
	         * @private
	         */
	        self.direction = null;

	        // --------------------------------
	        // - Set options
	        // --------------------------------

	        var opts = this._opts;

	        /**
	         * dom element wrapping content
	         * @type {HTMLElement}
	         * @public
	         */
	        self.wrap = opts.dom;

	        /**
	         * Data list
	         * @type {Array}
	         * @public
	         */
	        self.data = opts.data;

	        /**
	         * default slide direction
	         * @type {Boolean}
	         * @public
	         */
	        self.isVertical = !!opts.isVertical;

	        /**
	         * Overspread mode
	         * @type {Boolean}
	         * @public
	         */
	        self.isOverspread = !!opts.isOverspread;

	        /**
	         * Play time gap
	         * @type {Number}
	         * @public
	         */
	        self.duration = opts.duration || 2000;

	        /**
	         * start from initIndex or 0
	         * @type {Number}
	         * @public
	         */
	        self.initIndex = opts.initIndex > 0 && opts.initIndex <= opts.data.length - 1 ? opts.initIndex : 0;

	        /**
	         * touchstart prevent default to fixPage
	         * @type {Boolean}
	         * @public
	         */
	        self.fixPage = (function () {
	            var fp = opts.fixPage;
	            if (fp === false || fp === 0) {
	                return false;
	            }
	            if (isArray(fp) && fp.length > 0 || typeof fp === 'string' && fp !== '') {
	                return [].concat(fp).toString();
	            }
	            return true;
	        })();

	        /**
	         * Fill seam when render
	         * Default is false
	         * @type {Boolean}
	         * @public
	         */
	        self.fillSeam = !!opts.fillSeam;

	        /**
	         * slideIndex
	         * @type {Number}
	         * @private
	         */
	        self.slideIndex = self.slideIndex || self.initIndex || 0;

	        /**
	         * Axis
	         * @type {String}
	         * @public
	         */
	        self.axis = self.isVertical ? 'Y' : 'X';

	        /**
	         * reverseAxis
	         * @type {String}
	         * @private
	         */
	        self.reverseAxis = self.axis === 'Y' ? 'X' : 'Y';

	        /**
	         * Wrapper width
	         * @type {Number}
	         * @private
	         */
	        self.width = typeof opts.width === 'number' ? opts.width : self.wrap.offsetWidth;

	        /**
	         * Wrapper height
	         * @type {Number}
	         * @private
	         */
	        self.height = typeof opts.height === 'number' ? opts.height : self.wrap.offsetHeight;

	        /**
	         * Ratio height:width
	         * @type {Number}
	         * @private
	         */
	        self.ratio = self.height / self.width;

	        /**
	         * Scale, size rule
	         * @type {Number}
	         * @private
	         */
	        self.scale = self.isVertical ? self.height : self.width;

	        /**
	         * On slide offset position
	         * @type {{X: number, Y: number}}
	         * @private
	         */
	        self.offset = self.offset || {X: 0, Y: 0};

	        /**
	         * Enable/disable touch events
	         * @type {Boolean}
	         * @private
	         */
	        self.isTouchable = opts.isTouchable == null ? true : !!opts.isTouchable;

	        /**
	         * looping logic adjust
	         * @type {Boolean}
	         * @private
	         */
	        self.isLooping = opts.isLooping && self.data.length > 1 ? true : false;

	        /**
	         * Damping force
	         * Effect in non-looping mode
	         * Range 0 ~ 1
	         * @type {Number}
	         * @private
	         */
	        self.dampingForce = Math.max(0, Math.min(1, parseFloat(opts.dampingForce) || 0));

	        /**
	         * AutoPlay waitting milsecond to start
	         * @type {Number}
	         * @private
	         */
	        self.delay = opts.delay || 0;

	        /**
	         * autoplay logic adjust
	         * @type {Boolean}
	         * @private
	         */
	        self.isAutoplay = opts.isAutoplay && self.data.length > 1 ? true : false;

	        /**
	         * When autoplay is enabled.
	         * User click/tap behavior(eg: active a link), or if the page loses focus will stop autoplay.
	         * This configuration will attempt to restart autoplay after N milliseconds.
	         * ! AutoPlay will be forced to wake up, even when the user fill in a form item
	         * ! It will be blocked by "lock()"
	         * @type {number}
	         */
	        self.wakeupAutoplayDazetime = opts.wakeupAutoplayDazetime > -1 ? parseInt(opts.wakeupAutoplayDazetime) : -1;

	        /**
	         * Animate type
	         * @type {String}
	         * @private
	         */
	        self.animateType = opts.animateType in self._animateFuncs ? opts.animateType : 'normal';

	        /**
	         * @protected
	         */
	        self._animateFunc = self._animateFuncs[self.animateType];

	        /**
	         * @private
	         */
	        self._animateReverse = (function () {
	            var _ = [];
	            for (var type in self._animateFuncs) {
	                if (self._animateFuncs.hasOwnProperty(type) && self._animateFuncs[type].reverse) {
	                    _.push(type);
	                }
	            }
	            return _;
	        })();

	        // little trick set, when you chooce tear & vertical same time
	        // iSlider overspread mode will be set true autometicly
	        if (self.isVertical && self.animateType === 'card') {
	            self.isOverspread = true;
	        }

	        /**
	         * Debug mode
	         * @type {Function}
	         * @private
	         */
	        self.log = opts.isDebug ? function () {
	            global.console.log.apply(global.console, arguments);
	        } : noop;

	        /**
	         * Enable damping when slider meet the edge
	         * @param distance
	         * @returns {*}
	         * @private
	         */
	        self._damping = (function () {
	            return function (distance) {
	                return Math.atan(Math.abs(distance) / self.scale) * 0.62 * (1 - self.dampingForce) * self.scale * (distance > 0 ? 1 : -1);
	            }
	        })();

	        /**
	         * animate process time (ms), default: 300ms
	         * @type {Number}
	         * @public
	         */
	        self.animateTime = opts.animateTime != null && opts.animateTime > -1 ? opts.animateTime : 300;

	        /**
	         * animate effects, default: ease
	         * @type {String}
	         * @public
	         */
	        self.animateEasing =
	            inArray(opts.animateEasing, iSlider.EASING[0])
	            || iSlider.EASING[1].test(opts.animateEasing)
	                ? opts.animateEasing
	                : 'ease';

	        /**
	         * Fix touch/mouse events
	         * @type {{hasTouch, startEvt, moveEvt, endEvt}}
	         * @private
	         */
	        self.deviceEvents = iSlider.DEVICE_EVENTS;

	        /**
	         * Finger recognition range, prevent inadvertently touch
	         * @type {Number}
	         * @private
	         */
	        self.fingerRecognitionRange = opts.fingerRecognitionRange > -1 ? parseInt(opts.fingerRecognitionRange) : 10;

	        /**
	         * Init events
	         * @type {{}}
	         * @private
	         */
	        self.events = {};

	        // --------------------------------
	        // - Register events
	        // --------------------------------

	        iSlider.EVENTS.forEach(function (eventName) {
	            // TODO callback name of All-Lower-Case will be discarded
	            var fn = opts['on' + eventName.replace(/^\w{1}/, function (m) {
	                    return m.toUpperCase();
	                })] || opts['on' + eventName.toLowerCase()];
	            typeof fn === 'function' && self.on(eventName, fn, 1);
	        });

	        // --------------------------------
	        // - Plugins
	        // --------------------------------

	        /**
	         * @type {Object}
	         * @private
	         */
	        self.pluginConfig = (function () {
	            var config = {};
	            if (isArray(opts.plugins)) {
	                opts.plugins.forEach(function pluginConfigEach(plugin) {
	                    if (isArray(plugin)) {
	                        config[plugin[0]] = plugin.slice(1);
	                    } else if (typeof plugin === 'string') {
	                        config[plugin] = [];
	                    }
	                });
	            }
	            return config;
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
	        var _NT = iSlider.NODE_TYPE;
	        var type;
	        if (content == null) {
	            type = _NT.empty;
	        } else {
	            if (Boolean(content.nodeName) && Boolean(content.nodeType)) {
	                type = _NT.node;
	            } else if (typeof content === 'string') {
	                if (isUrl(content)) {
	                    type = _NT.pic;
	                } else {
	                    type = _NT.html;
	                }
	            } else {
	                type = _NT.unknown;
	            }
	        }

	        item.type = type;

	        return type;
	    };

	    /**
	     * render single item html by idx
	     * @param {HTMLElement} el ..
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
	        var _NT = iSlider.NODE_TYPE;

	        this.log('[RENDER]:', type, dataIndex, item);

	        addClass(el, 'islider-' + type);

	        switch (type) {
	            case _NT.pic:
	                if (item.load === 2) {
	                    insertImg();
	                }
	                if (item.load === -1) {

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
	                    currentImg.onerror = function () {
	                        item.load = -1;
	                    }
	                }
	                break;
	            case _NT.dom:
	            case _NT.html:
	                el.innerHTML = item.content;
	                break;
	            case _NT.node:
	            case _NT.element:
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
	            this.fillSeam && this.originScale(el);
	        }.bind(this));
	    };

	    /**
	     * render list html
	     * @private
	     */
	    iSliderPrototype._renderWrapper = function () {
	        //this.wrap.style.overflow = 'hidden';
	        // initail outer element
	        var outer;
	        if (this.outer) {
	            outer = this.outer;
	            outer.innerHTML = '';
	        } else {
	            outer = document.createElement('ul');
	        }
	        outer.className = 'islider-outer';

	        //outer.style.overflow = 'hidden';
	        // no need...
	        // outer.style.cssText += 'width:' + this.width + 'px;height:' + this.height + 'px';

	        // storage li elements, only store 3 elements to reduce memory usage
	        /**
	         * Slider elements x3
	         * @type {Array}
	         * @public
	         */
	        this.els = [];

	        for (var i = 0; i < 3; i++) {
	            var li = document.createElement('li');
	            outer.appendChild(li);
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
	             * @type {HTMLElement}
	             * @public
	             */
	            this.outer = outer;
	            this.wrap.appendChild(outer);
	        }

	        this.currentEl = this.els[1];

	        this.fire('renderComplete', this.slideIndex, this.currentEl, this);
	    };

	    /**
	     * resetAnimation, slideTo每次切换使用不同的动画时调用
	     * @private
	     */
	    iSliderPrototype._resetAnimation = function () {
	        var els = this.els;
	        for (var i = 0; i < 3; i++) {
	            els[i].style.cssText = '';
	            this._animateFunc(els[i], this.axis, this.scale, i, 0);
	            this.isVertical && (this.animateType === 'rotate' || this.animateType === 'flip')
	                ? this._renderItem(els[i], 1 - i + this.slideIndex)
	                : this._renderItem(els[i], i - 1 + this.slideIndex);
	        }
	    }

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
	            var loadImg = function (index) {
	                var item = data[index];
	                if (self._itemType(item) === 'pic' && !item.load) {
	                    var preloadImg = new Image();
	                    preloadImg.src = item.content;
	                    preloadImg.onload = function () {
	                        item.width = preloadImg.width;
	                        item.height = preloadImg.height;
	                        item.load = 2;
	                    };
	                    preloadImg.onerror = function () {
	                        item.load = -1;
	                    }
	                    item.load = 1;
	                }
	            };

	            loadImg((dataIndex + 2) % len);
	            loadImg((dataIndex - 2 + len) % len);
	        }
	    };

	    /**
	     * watch transition end
	     * @private
	     */
	    iSliderPrototype._watchTransitionEnd = function (squeezeTime, eventType) {
	        var cb = function () {
	            this._unWatchTransitionEnd();
	            if (eventType === 'slideChanged') {
	                this._changedStyles();
	            }
	            this.fire.call(this, eventType, this.slideIndex, this.currentEl, this);
	            this._renderIntermediateScene();
	            this.play();
	            this.onSliding = false;
	            this.direction = null;
	        }.bind(this);

	        if (iSlider.TRANSITION_END_EVENT) {
	            this.currentEl.addEventListener(iSlider.TRANSITION_END_EVENT, cb);
	            // keep handler and element
	            this._transitionEndHandler = {el: this.currentEl, handler: cb};
	        }
	        this._LSN.transitionEnd = global.setTimeout(cb, squeezeTime);
	    };

	    /**
	     * unwatch transition end
	     * @private
	     */
	    iSliderPrototype._unWatchTransitionEnd = function () {
	        if (this._LSN.transitionEnd) {
	            global.clearTimeout(this._LSN.transitionEnd);
	        }
	        if (this._transitionEndHandler !== null) {
	            this._transitionEndHandler.el.removeEventListener(iSlider.TRANSITION_END_EVENT, this._transitionEndHandler.handler);
	            this._transitionEndHandler = null;
	        }

	        //this.onSliding = false;
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
	            case device.cancelEvt: // mouseout, touchcancel event, trigger endEvent
	                this.endHandler(evt);
	                break;
	            case device.resizeEvt:
	                this.resizeHandler();
	                break;
	            case 'focus':
	                this.play();
	                break;
	            case 'blur':
	                this.pause();
	                this._tryToWakeupAutoplay();
	                break;
	        }
	    };

	    /**
	     *  touchstart callback
	     *  @param {Object} evt event object
	     *  @public
	     */
	    iSliderPrototype.startHandler = function (evt) {
	        if (this.fixPage && iSlider.FIX_PAGE_TAGS.indexOf(evt.target.tagName.toUpperCase()) < 0 && !this._isItself(evt.target)) {
	            evt.preventDefault();
	        }
	        if (this._holding || this._locking) {
	            return;
	        }
	        var device = this.deviceEvents;
	        this.onMoving = true;
	        this.pause();

	        this.log('[EVENT]: start');
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
	     *  @public
	     */
	    iSliderPrototype.moveHandler = function (evt) {
	        if (!this.onMoving) {
	            return;
	        }
	        this.log('[EVENT]: moving');
	        var device = this.deviceEvents;
	        var len = this.data.length;
	        var axis = this.axis;
	        var reverseAxis = this.reverseAxis;
	        var offset = {};

	        if (evt.hasOwnProperty('offsetRatio')) {
	            offset[axis] = evt.offsetRatio * this.scale;
	            offset[reverseAxis] = 0;
	        } else {
	            offset.X = device.hasTouch ? (evt.targetTouches[0].pageX - this.startX) : (evt.pageX - this.startX);
	            offset.Y = device.hasTouch ? (evt.targetTouches[0].pageY - this.startY) : (evt.pageY - this.startY);
	        }

	        this.offset = offset;
	        evt.offsetRatio = offset[axis] / this.scale;

	        if (Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {

	            evt.preventDefault();
	            this._unWatchTransitionEnd();

	            if (!this.isLooping) {
	                if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
	                    offset[axis] = this._damping(offset[axis]);
	                }
	            }

	            this.els.forEach(function (item, i) {
	                item.style.visibility = 'visible';
	                iSlider.setStyle(item, 'transition', 'none');
	                this._animateFunc(item, axis, this.scale, i, offset[axis], offset[axis]);
	                this.fillSeam && this.seamScale(item);
	            }.bind(this));

	            this.fire('slide', evt, this);
	        }
	    };

	    /**
	     *  touchend callback
	     *  @param {Object} evt event object
	     *  @public
	     */
	    iSliderPrototype.endHandler = function (evt) {
	        if (!this.onMoving) {
	            return;
	        }
	        this.log('[EVENT]: end');
	        this.onMoving = false;
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
	            if (Math.abs(this.offset[axis]) >= FRR) {
	                this.slideTo(this.slideIndex);
	            }
	        }

	        // create sim tap event if offset < this.fingerRecognitionRange
	        if (Math.abs(this.offset[axis]) < FRR && this.fixPage && evt.target) {
	            dispatchLink(evt.target);
	        }

	        this.offset.X = this.offset.Y = 0;

	        this._tryToWakeupAutoplay();
	    };

	    /**
	     * resize callback
	     * @public
	     */
	    iSliderPrototype.resizeHandler = function () {
	        var _L = this._LSN.resize;
	        var startTime = +new Date, _W, _H;

	        if (this.deviceEvents.hasTouch) {
	            // Fuck Android
	            _L && global.clearInterval(_L);
	            _L = global.setInterval(function () {
	                if (this.height !== this.wrap.offsetHeight || this.width !== this.wrap.offsetWidth) {
	                    _L && global.clearInterval(_L);
	                    _L = global.setInterval(function () {
	                        if (_W === this.wrap.offsetWidth && _H === this.wrap.offsetHeight) {
	                            _L && global.clearInterval(_L);
	                            this.reset();
	                            this.log('[EVENT]: resize');
	                        } else {
	                            _W = this.wrap.offsetWidth, _H = this.wrap.offsetHeight;
	                        }
	                    }.bind(this), 12);
	                } else {
	                    if (+new Date - startTime >= 1000) {
	                        _L && global.clearInterval(_L);
	                    }
	                }
	            }.bind(this), 12);
	        } else {
	            _L && global.clearTimeout(_L);
	            _L = global.setTimeout(function () {
	                if (this.height !== this.wrap.offsetHeight || this.width !== this.wrap.offsetWidth) {
	                    _L && global.clearInterval(_L);
	                    this.reset();
	                    this.log('[EVENT]: resize');
	                }
	            }.bind(this), 200);
	        }
	    };

	    /**
	     *  slide logical, goto data index
	     *  @param {Number} dataIndex the goto index
	     *  @public
	     */
	    iSliderPrototype.slideTo = function (dataIndex, opts) {
	        // stop auto play
	        if (this.isAutoplay) {
	            this.pause();
	        }
	        if (this._locking) {
	            return;
	        }
	        this.unhold();
	        this.onSliding = true;
	        var animateTime = this.animateTime;
	        var animateType = this.animateType;
	        var animateFunc = this._animateFunc;
	        var data = this.data;
	        var els = this.els;
	        var axis = this.axis;
	        var idx = dataIndex;
	        var n = dataIndex - this.slideIndex;
	        var offset = this.offset;
	        var eventType;
	        var squeezeTime = 0;

	        if (typeof opts === 'object') {
	            if (opts.animateTime > -1) {
	                animateTime = opts.animateTime;
	            }
	            if (typeof opts.animateType === 'string' && opts.animateType in this._animateFuncs) {
	                animateType = opts.animateType;
	                animateFunc = this._animateFuncs[animateType];
	                this._animateFunc = animateFunc;
	                this.animateType = animateType;
	                this._resetAnimation();
	            }
	        }

	        // In the slide process, animate time is squeezed
	        if (offset[axis] !== 0) {
	            squeezeTime = Math.abs(offset[axis]) / this.scale * animateTime;
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
	                n = 0;
	            }
	        }

	        this.log('[SLIDE TO]: ' + this.slideIndex);

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
	            } else {
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
	                if ((this.isVertical && (inArray(animateType, this._animateReverse)))) {
	                    this._renderItem(tailEl, idx + direction);
	                    this._renderItem(els[1], idx);
	                    this._intermediateScene = [headEl, idx - direction];
	                }
	                else {
	                    this._renderItem(headEl, idx + direction);
	                    this._intermediateScene = [tailEl, idx - direction];
	                }
	            }

	            iSlider.setStyle(headEl, 'transition', 'none');

	            // Minus squeeze time
	            squeezeTime = animateTime - squeezeTime;

	            eventType = 'slideChange';

	            // For seams
	            if (this.fillSeam) {
	                els.forEach(function (el) {
	                    removeClass(el, 'islider-sliding|islider-sliding-focus');
	                });
	                addClass(this.currentEl, 'islider-sliding-focus');
	                addClass(headEl, 'islider-sliding');
	            }

	            this.direction = direction;
	        }

	        // do the trick animation
	        for (var i = 0; i < 3; i++) {
	            if (els[i] !== headEl) {
	                // Only applies their effects
	                iSlider.setStyle(els[i], 'transition', (animateFunc.effect || 'all') + ' ' + squeezeTime + 'ms ' + this.animateEasing);
	            }
	            animateFunc.call(this, els[i], axis, this.scale, i, 0, direction);
	            this.fillSeam && this.seamScale(els[i]);
	        }

	        this._watchTransitionEnd(squeezeTime, eventType + 'd');
	        this.fire(eventType, this.slideIndex, this.currentEl, this);
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
	     *
	     *  @param {String} evtType event name
	     *  @param {String} selector the simple css selector like jQuery
	     *  @param {Function} callback event callback
	     *  @public
	     *
	     *  @alias iSliderPrototype.bind
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
	     *
	     * @alias iSliderPrototype.unbind
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
	     * @returns {Object} return this instance of iSlider
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
	        return this;
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
	        this._unWatchTransitionEnd();
	        //this._setting();
	        this.width = typeof this._opts.width === 'number' ? this._opts.width : this.wrap.offsetWidth;
	        this.height = typeof this._opts.height === 'number' ? this._opts.height : this.wrap.offsetHeight;
	        this.ratio = this.height / this.width;
	        this.scale = this.isVertical ? this.height : this.width;
	        this._renderWrapper();
	        this._autoPlay();
	        this.fire('reset slideRestored', this.slideIndex, this.currentEl, this);
	    };

	    /**
	     * Reload Data & render
	     *
	     * @param {Array} data
	     * @param {Number} initIndex
	     * @public
	     */
	    iSliderPrototype.loadData = function (data, initIndex) {
	        this.pause();
	        this._unWatchTransitionEnd();
	        this.slideIndex = initIndex || 0;
	        this.data = data;
	        this._renderWrapper();
	        this._autoPlay();
	        this.fire('loadData slideChanged', this.slideIndex, this.currentEl, this);
	    };

	    /**
	     * Add scenes to the end of the data datasheets
	     *
	     * @param {Object|Array} sceneData
	     * @description
	     *   Object:
	     *     {content:...}
	     *   Array:
	     *     [{content:...}, {content:...}, ...]
	     */
	    iSliderPrototype.pushData = function (sceneData) {
	        if (sceneData == null) {
	            return;
	        }
	        var len = this.data.length;
	        this.data = this.data.concat(sceneData);
	        if (this.isLooping && this.slideIndex === 0) {
	            this._renderItem(this.els[0], this.data.length - 1);
	        } else if (len - 1 === this.slideIndex) {
	            this._renderItem(this.els[2], len);
	            this._autoPlay(); // restart
	        }
	    };

	    /**
	     * Add scenes to the head of the data datasheets
	     *
	     * @param {Object|Array} sceneData
	     * @description
	     *   Object:
	     *     {content:...}
	     *   Array:
	     *     [{content:...}, {content:...}, ...]
	     */
	    iSliderPrototype.unshiftData = function (sceneData) {
	        if (sceneData == null) {
	            return;
	        }

	        if (!isArray(sceneData)) {
	            sceneData = [sceneData];
	        }

	        var n = sceneData.length;
	        this.data = sceneData.concat(this.data);

	        if (this.slideIndex === 0) {
	            this._renderItem(this.els[0], n - 1);
	        }
	        this.slideIndex += n;
	    };

	    /**
	     * auto check to play and bind events
	     * @private
	     */
	    iSliderPrototype._autoPlay = function () {
	        this.delay > 0 ? global.setTimeout(this.play.bind(this), this.delay) : this.play();
	    };

	    /**
	     * try to restart autoplay
	     * @private
	     */
	    iSliderPrototype._tryToWakeupAutoplay = function () {
	        if (~this.wakeupAutoplayDazetime) {
	            this.wakeupAutoplayDazetime > 0 ? global.setTimeout(this.play.bind(this), this.wakeupAutoplayDazetime) : this.play();
	        }
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
	        this._holding = true;
	    };

	    /**
	     * Release current scene
	     * unlock at same time
	     * @public
	     */
	    iSliderPrototype.unhold = function () {
	        this._holding = false;
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
	        this._locking = true;
	    };

	    /**
	     * unlock native method calls
	     * @public
	     */
	    iSliderPrototype.unlock = function () {
	        this._locking = false;
	    };

	    /**
	     * Fill the seam
	     * @param {HTMLElement} el
	     * @private
	     */
	    iSliderPrototype.seamScale = function (el) {
	        var regex = /scale([XY]?)\(([^\)]+)\)/;
	        var transformStyle = iSlider.getStyle(el, 'transform');
	        if (regex.test(transformStyle)) {
	            iSlider.setStyle(el, 'transform', transformStyle.replace(regex, function (res, axis, scale) {
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
	            }.bind(this)));
	        } else {
	            iSlider.setStyle(el, 'transform', transformStyle + ' scale' + this.axis + '(1.001)');
	        }
	    };

	    /**
	     * @param {HTMLElement} el
	     * @private
	     */
	    iSliderPrototype.originScale = function (el) {
	        var regex = /([\x20]?scale)([XY]?)\(([^\)]+)\)/;
	        iSlider.setStyle(el, 'transform', iSlider.getStyle(el, 'transform').replace(regex, function (sc, res, axis, scale) {
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
	        }.bind(this)));
	    };


	    /**
	     * Whether this node in rule
	     *
	     * @param {HTMLElement} target
	     * @param {Array} rule
	     * @returns {boolean}
	     */
	    iSliderPrototype._isItself = function (target) {
	        var rule = this.fixPage;
	        if (typeof rule === 'string') {
	            //get dom path
	            var path = [], parent = target, selector;
	            while (!hasClass(parent, 'islider-outer') && parent !== this.wrap) {
	                path.push(parent);
	                parent = parent.parentNode;
	            }
	            parent = path.pop();

	            if (path.length) {
	                try {
	                    selector = Array.prototype.slice.call(parent.querySelectorAll(rule));
	                    if (selector.length) {
	                        for (var i = 0; i < path.length; i++) {
	                            if (selector.indexOf(path[i]) > -1) {
	                                return true;
	                            }
	                        }
	                    }
	                } catch (e) {
	                    return false;
	                }
	            }
	        }
	        return false;
	    }

	    /**
	     * Let target islider controls this one
	     *
	     * @param {iSlider} target
	     * @param {Object} how
	     * @public
	     */
	    iSliderPrototype.subjectTo = function (target, how) {
	        if (!target instanceof iSlider) {
	            return;
	        }

	        var self = this;

	        self.animateTime = target.animateTime;
	        self.isLooping = target.isLooping;
	        self.isAutoplay = false;

	        target.on('slideStart', function (evt) {
	            self.startHandler(evt);
	        });

	        target.on('slide', function (evt) {
	            self.moveHandler(evt);
	        });

	        target.on('slideEnd', function (evt) {
	            self.endHandler(evt);
	        });

	        target.on('slideChange', function (i) {
	            var l = self.data.length;
	            var d = self.direction;
	            if (d > 0 && (i - self.slideIndex + l) % l === 1) {
	                self.slideNext();
	            } else if (d < 0 && (i - self.slideIndex - l) % l === -1) {
	                self.slidePrev();
	            }
	        });

	        target.on('slideRestore', function (i) {
	            if (self.slideIndex !== i) {
	                self.slideTo(i);
	            }
	        });
	    };

	    /* CommonJS */
	    if ("function" === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
	        module.exports = iSlider;
	    /* AMD */
	    else if ("function" === 'function' && __webpack_require__(7)['amd'])
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return iSlider;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    /* Global */
	    else
	        global['iSlider'] = global['iSlider'] || iSlider;

	})(window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * More animations
	 * @file animate.js
	 * @author BE-FE Team
	 *    xieyu33333 xieyu33333@gmail.com
	 *    shinate shine.wangrs@gmail.com
	 */

	(function (global, factory) {
	    /* CommonJS */
	    if ("function" === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
	        factory(__webpack_require__(5));
	    /* AMD */
	    else if ("function" === 'function' && __webpack_require__(7)['amd'])
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (iSlider) {
	            factory(iSlider);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    /* Global */
	    else
	        factory(global['iSlider']);

	})(window ? window : this, function (iSlider) {

	    'use strict';

	    iSlider && iSlider.extend(iSlider._animateFuncs, {
	        // rotate
	        rotate: (function () {
	            function rotate(dom, axis, scale, i, offset, direct) {
	                var rotateDirect = (axis === 'X') ? 'Y' : 'X';

	                if (this.isVertical) {
	                    offset = -offset;
	                    if (Math.abs(direct) > 1) {
	                        direct = -direct;
	                    }
	                }

	                var outer = dom.parentElement;
	                iSlider.setStyle(outer, 'perspective', scale * 4);

	                dom.style.visibility = 'visible';
	                if (direct > 0 && i === 2) {
	                    dom.style.visibility = 'hidden';
	                }
	                if (direct < 0 && i === 0) {
	                    dom.style.visibility = 'hidden';
	                }
	                dom.style.zIndex = i === 1 ? 1 : 0;

	                dom.style.cssText += iSlider.styleProp('backface-visibility') + ':hidden;' + iSlider.styleProp('transform-style') + ':preserve-3d;' + 'position:absolute;';

	                // TODO: overflow... I dont understand why there are many differences between ios and desktop. Maybe they have different interpretations of Perspective
	                iSlider.setStyle(dom, 'transform', 'rotate' + rotateDirect + '(' + 90 * (offset / scale + i - 1) + 'deg) translateZ(' + (0.889 * scale / 2) + 'px) scale(0.889)');
	            }

	            rotate.effect = iSlider.styleProp('transform');
	            rotate.reverse = true;
	            return rotate;
	        })(),
	        // flip
	        flip: (function () {
	            function flip(dom, axis, scale, i, offset, direct) {
	                if (this.isVertical) {
	                    offset = -offset;
	                }

	                var outer = dom.parentElement;
	                iSlider.setStyle(outer, 'perspective', scale * 4);

	                dom.style.visibility = 'visible';
	                if (direct > 0 && i === 2) {
	                    dom.style.visibility = 'hidden';
	                }
	                if (direct < 0 && i === 0) {
	                    dom.style.visibility = 'hidden';
	                }

	                dom.style.cssText += 'position:absolute;' + iSlider.styleProp('backface-visibility') + ':hidden';
	                iSlider.setStyle(dom, 'transform', 'translateZ(' + (scale / 2) + 'px) rotate' + ((axis === 'X') ? 'Y' : 'X') + '(' + 180 * (offset / scale + i - 1) + 'deg) scale(0.875)');
	            }

	            flip.effect = iSlider.styleProp('transform');
	            flip.reverse = true;
	            return flip;
	        })(),
	        depth: (function () {

	            function depth(dom, axis, scale, i, offset, direct) {
	                var zoomScale = (4 - Math.abs(i - 1)) * 0.18;
	                var outer = dom.parentElement;
	                iSlider.setStyle(outer, 'perspective', scale * 4);
	                dom.style.zIndex = i === 1 ? 1 : 0;
	                iSlider.setStyle(dom, 'transform', 'scale(' + zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)');
	            }

	            depth.effect = iSlider.styleProp('transform');
	            return depth;
	        })(),
	        flow: (function () {
	            function flow(dom, axis, scale, i, offset, direct) {
	                var absoluteOffset = Math.abs(offset);
	                var rotateDirect = (axis === 'X') ? 'Y' : 'X';
	                var directAmend = (axis === 'X') ? 1 : -1;
	                var offsetRatio = Math.abs(offset / scale);
	                var outer = dom.parentElement;

	                iSlider.setStyle(outer, 'perspective', scale * 4);

	                if (i === 1) {
	                    dom.style.zIndex = scale - absoluteOffset;
	                }
	                else {
	                    dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
	                }

	                iSlider.setStyle(dom, 'transform', 'scale(0.7, 0.7) translateZ(' + (offsetRatio * 150 - 150) * Math.abs(i - 1) + 'px)' + 'translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)' + 'rotate' + rotateDirect + '(' + directAmend * (30 - offsetRatio * 30) * (1 - i) + 'deg)');
	            }

	            flow.effect = iSlider.styleProp('transform');
	            return flow;
	        })(),
	        card: (function () {
	            function card(dom, axis, scale, i, offset, direct) {
	                var absoluteOffset = Math.abs(offset);
	                var zoomScale = 1;
	                var z = 1;

	                if (absoluteOffset > 0) {
	                    if (i === 1) {
	                        zoomScale = 1 - 0.2 * Math.abs(i - 1) - Math.abs(0.2 * offset / scale).toFixed(6);
	                        z = 0;
	                    }
	                } else {
	                    if (i !== 1) {
	                        if ((direct > 0 && i === 0) || (direct < 0 && i === 2)) {
	                            zoomScale = 1 - 0.2 * Math.abs(i - 1);
	                        }
	                        z = 0;
	                    }
	                }
	                dom.style.zIndex = z;
	                iSlider.setStyle(dom, 'transform', 'scale(' + zoomScale + ') translateZ(0) translate' + axis + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)');
	            }

	            card.effect = iSlider.styleProp('transform');
	            return card;
	        })(),
	        fade: (function () {
	            function fade(dom, axis, scale, i, offset, direct) {
	                dom.style.zIndex = i === 1 ? 1 : 0;
	                offset = Math.abs(offset);
	                if (i === 1) {
	                    dom.style.opacity = 1 - (offset / scale);
	                } else {
	                    dom.style.opacity = offset / scale;
	                }
	            }

	            fade.effect = 'opacity';
	            return fade;
	        })(),
	        zoomout: (function () {
	            var lsn;

	            function zoomout(dom, axis, scale, i, offset) {
	                var z, o, s;

	                var oa = offset / scale;
	                switch (i) {
	                    case 0:
	                        lsn && window.clearTimeout(lsn);
	                        o = oa < 1 ? oa : 1;
	                        s = 2 - (0.5 * oa);
	                        z = 2;
	                        var at = parseInt(window.getComputedStyle(dom)[iSlider.styleProp('transitionDuration', 1)]) * 1000;
	                        if (at > 0) {
	                            lsn = window.setTimeout(function () {
	                                dom.style.zIndex = 0;
	                            }, at);
	                        }
	                        break;
	                    case 1:
	                        o = 1 - oa;
	                        s = 1 - (0.5 * oa);
	                        z = 1;
	                        break;
	                    case 2:
	                        o = oa > 0 ? oa : 0;
	                        s = 0.5 - (0.5 * oa);
	                        z = 0;
	                        break;
	                }
	                dom.style.cssText += 'z-index:' + z + ';opacity:' + o + ';' + iSlider.styleProp('transform') + ':scale(' + s + ');';
	            }

	            zoomout.reverse = true;
	            return zoomout;
	        })()
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }
/******/ ])
});
;