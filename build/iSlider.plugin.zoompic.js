/**
 * @file zoompic.js
 * @author liuhui01 on 2015/1/7.
 * @modify shinate shine.wangrs@gmail.com
 */

(function (global, factory) {
    /* CommonJS */
    if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        factory(global, require('iSlider'));
    /* AMD */
    else if (typeof define === 'function' && define['amd'])
        define(['iSlider'], function (iSlider) {
            factory(global, iSlider);
        });
    /* Global */
    else
        factory(global, global['iSlider']);

})(window ? window : this, function (global, iSlider) {

    'use strict';

    var startHandlerOriginal = iSlider.prototype.startHandler;
    var endHandlerOriginal = iSlider.prototype.endHandler;
    var moveHandlerOriginal = iSlider.prototype.moveHandler;

    /**
     * Support 3D matrix translate
     * @type {boolean}
     */
    var has3d = ('WebKitCSSMatrix' in global && 'm11' in new global.WebKitCSSMatrix());

    /**
     * Min scale
     * @type {number}
     */
    var minScale = 1 / 2;

    /**
     * Scene view range
     * @type {{}}
     */
    var viewScope = {};

    var currentScale;

    var zoomFactor;

    var zoomNode;

    var startTouches;

    var startX;

    var startY;

    var lastTouchStart;

    var gesture;

    var IN_SCALE_MODE = false;

    /**
     * Generate translate
     * @param x
     * @param y
     * @param z
     * @param scale
     * @returns {string}
     */
    function generateTranslate(x, y, z, scale) {
        return 'translate' + (has3d ? '3d(' : '(') + x + 'px,' + y + (has3d ? 'px,' + z + 'px)' : 'px)') + 'scale(' + scale + ')';
    }

    /**
     * Get distance
     * @param a
     * @param b
     * @returns {number}
     */
    function getDistance(a, b) {
        var x, y;
        x = a.left - b.left;
        y = a.top - b.top;
        return Math.sqrt(x * x + y * y);
    }

    /**
     * Transform to string
     * @param x
     * @param y
     * @returns {string}
     */
    function generateTransformOrigin(x, y) {
        return x + 'px ' + y + 'px';
    }

    /**
     * Get touch pointer
     * @param touches
     * @returns {Array}
     */
    function getTouches(touches) {
        return Array.prototype.slice.call(touches).map(function (touch) {
            return {
                left: touch.pageX,
                top: touch.pageY
            };
        });
    }

    /**
     * Get scale
     * @param start
     * @param end
     * @returns {number}
     */
    function calculateScale(start, end) {
        var startDistance = getDistance(start[0], start[1]);
        var endDistance = getDistance(end[0], end[1]);
        return endDistance / startDistance;
    }

    /**
     * Get computed translate
     * @param obj
     * @returns {{translateX: number, translateY: number, translateZ: number, scaleX: number, scaleY: number, offsetX: number, offsetY: number}}
     */
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
        if (!global.getComputedStyle || !obj) return result;
        var style = global.getComputedStyle(obj), transform, origin;
        transform = style.webkitTransform || style.mozTransform;
        origin = style.webkitTransformOrigin || style.mozTransformOrigin;
        var par = origin.match(/(.*)px\s+(.*)px/);
        if (par.length > 1) {
            offsetX = par[1] - 0;
            offsetY = par[2] - 0;
        }
        if (transform === 'none') return result;
        var mat3d = transform.match(/^matrix3d\((.+)\)$/);
        var mat2d = transform.match(/^matrix\((.+)\)$/);
        var str;
        if (mat3d) {
            str = mat3d[1].split(', ');
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
            str = mat2d[1].split(', ');
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

    /**
     * Get center point
     * @param a
     * @param b
     * @returns {{x: number, y: number}}
     */
    function getCenter(a, b) {
        return {
            x: (a.x + b.x) / 2,
            y: (a.y + b.y) / 2
        };
    }

    /**
     * init
     * @param opts
     */
    function initZoom(opts) {
        currentScale = 1;
        zoomFactor = opts && opts.zoomFactor || 2;
    }

    /**
     * Start event handle
     * @param {object} evt
     */
    function startHandler(evt) {
        startHandlerOriginal.call(this, evt);
        // must be a picture, only one picture!!
        var node = this.els[1].querySelector('img:first-child');
        var device = this.deviceEvents;
        if (device.hasTouch && node !== null) {
            IN_SCALE_MODE = true;
            var transform = getComputedTranslate(node);
            startTouches = getTouches(evt.targetTouches);
            startX = transform.translateX - 0;
            startY = transform.translateY - 0;
            currentScale = transform.scaleX;
            zoomNode = node;
            var pos = getPosition(node);
            if (evt.targetTouches.length == 2) {
                lastTouchStart = null;
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
                var time = (new Date()).getTime();
                gesture = 0;
                if (time - lastTouchStart < 300) {
                    evt.preventDefault();
                    gesture = 3;
                }
                lastTouchStart = time;
            }
        }
    }

    /**
     * Move event handle
     * @param {object} evt
     * @returns {number}
     */
    function moveHandler(evt) {
        if (IN_SCALE_MODE) {
            var result = 0;
            var node = zoomNode;
            var device = this.deviceEvents;
            if (device.hasTouch) {
                if (evt.targetTouches.length === 2) {
                    node.style.webkitTransitionDuration = '0';
                    evt.preventDefault();
                    scaleImage(evt);
                    result = 2;
                } else if (evt.targetTouches.length === 1 && currentScale > 1) {
                    node.style.webkitTransitionDuration = '0';
                    evt.preventDefault();
                    moveImage.call(this, evt);
                    result = 1;
                }
                gesture = result;

                if (result > 0) {
                    return;
                }
            }
        }
        moveHandlerOriginal.call(this, evt);
    }

    /**
     * Double tao handle
     * @param {object} evt
     */
    function handleDoubleTap(evt) {
        var zoomFactor = zoomFactor || 2;
        var node = zoomNode;
        var pos = getPosition(node);
        currentScale = currentScale == 1 ? zoomFactor : 1;
        node.style.webkitTransform = generateTranslate(0, 0, 0, currentScale);
        if (currentScale != 1) node.style.webkitTransformOrigin = generateTransformOrigin(evt.touches[0].pageX - pos.left, evt.touches[0].pageY - pos.top);
    }

    /**
     * scale image
     * @param {object} evt
     */
    function scaleImage(evt) {
        var moveTouces = getTouches(evt.targetTouches);
        var scale = calculateScale(startTouches, moveTouces);
        var node = zoomNode;
        scale = currentScale * scale < minScale ? minScale : currentScale * scale;
        node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
    }

    /**
     * End event handle
     * @param evt
     */
    function endHandler(evt) {
        if (IN_SCALE_MODE) {
            var result = 0;
            if (gesture === 2) {//双手指
                resetImage(evt);
                result = 2;
            } else if (gesture == 1) {//放大拖拽
                resetImage(evt);
                result = 1;
            } else if (gesture === 3) {//双击
                handleDoubleTap(evt);
                resetImage(evt);
                IN_SCALE_MODE = false;
            }

            if (result > 0) {
                return;
            }
        }
        endHandlerOriginal.call(this, evt);
    }

    /**
     * Dragmove image
     * @param {opject} evt
     */
    function moveImage(evt) {
        var node = zoomNode;
        var device = this.deviceEvents;
        var offset = {
            X: device.hasTouch ? (evt.targetTouches[0].pageX - this.startX) : (evt.pageX - this.startX),
            Y: device.hasTouch ? (evt.targetTouches[0].pageY - this.startY) : (evt.pageY - this.startY)
        };
        var moveOffset = {
            x: startX + offset.X - 0,
            y: startY + offset.Y - 0
        };
        node.style.webkitTransform = generateTranslate(moveOffset.x, moveOffset.y, 0, currentScale);
    }

    /**
     * Get position
     * @param element
     * @returns {{left: number, top: number}}
     */
    function getPosition(element) {
        var pos = {'left': 0, 'top': 0};
        do {
            pos.top += element.offsetTop || 0;
            pos.left += element.offsetLeft || 0;
            element = element.offsetParent;
        }
        while (element);
        return pos;
    }

    /**
     * Check target is in range
     * @param node
     * @param value
     * @param tag
     * @returns {boolean}
     */
    function valueInViewScope(node, value, tag) {
        var min, max;
        var pos = getPosition(node);
        viewScope = {
            start: {left: pos.left, top: pos.top},
            end: {left: pos.left + node.clientWidth, top: pos.top + node.clientHeight}
        };
        var str = tag == 1 ? 'left' : 'top';
        min = viewScope.start[str];
        max = viewScope.end[str];
        return (value >= min && value <= max);
    }

    /**
     *
     * @param node
     * @param obj1
     * @returns {number}
     */
    function overFlow(node, obj1) {
        var result = 0;
        var isX1In = valueInViewScope(node, obj1.start.left, 1);
        var isX2In = valueInViewScope(node, obj1.end.left, 1);
        var isY1In = valueInViewScope(node, obj1.start.top, 0);
        var isY2In = valueInViewScope(node, obj1.end.top, 0);
        if ((isX1In != isX2In) && (isY1In != isY2In)) {
            if (isX1In && isY2In) {
                result = 1;
            } else if (isX1In && isY1In) {
                result = 2;
            } else if (isX2In && isY2In) {
                result = 3;
            } else {
                result = 4;
            }
        } else if ((isX1In == isX2In)) {
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

    /**
     * Reset image
     * @param {object} evt
     */
    function resetImage(/*evt*/) {
        if (currentScale == 1) return;
        var node = zoomNode, left, top, trans, w, h, pos, start, end, parent, flowTag;
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

        flowTag = overFlow(parent, {start: start, end: end});
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

    iSlider.extend({
        startHandler: startHandler,
        moveHandler: moveHandler,
        endHandler: endHandler
    });

    iSlider.regPlugin('zoompic', initZoom);

});
