/**
 * More animations
 * @file animate.js
 * @author BE-FE Team
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 */

(function (global, factory) {
    /* CommonJS */
    if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        factory(require('iSlider'));
    /* AMD */
    else if (typeof define === 'function' && define['amd'])
        define(['iSlider'], function (iSlider) {
            factory(iSlider);
        });
    /* Global */
    else
        factory(global['iSlider']);

})(window ? window : this, function (iSlider) {

    'use strict';

    iSlider && iSlider.extend(iSlider._animateFuncs, {
        // rotate
        'rotate': function rotate(dom, axis, scale, i, offset) {
            var rotateDirect = (axis === 'X') ? 'Y' : 'X';
            var absoluteOffset = Math.abs(offset);
            // var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;

            if (this.isVertical) {
                offset = -offset;
            }

            this.wrap.style.webkitPerspective = scale * 4;

            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            }
            else {
                dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
            }

            dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; position:absolute;';
            dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + 90 * (offset / scale + i - 1) + 'deg) translateZ(' + (0.889 * scale / 2) + 'px) scale(0.889)';
        },
        // flip
        'flip': function flip(dom, axis, scale, i, offset) {
            var rotateDirect = (axis === 'X') ? 'Y' : 'X';
            // var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
            if (this.isVertical) {
                offset = -offset;
            }
            this.wrap.style.webkitPerspective = scale * 4;

            if (offset > 0) {
                dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
            }
            else {
                dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
            }

            dom.style.cssText += 'position:absolute; -webkit-backface-visibility:hidden;';
            dom.style.webkitTransform = 'translateZ(' + (scale / 2) + 'px) rotate' + rotateDirect + '(' + 180 * (offset / scale + i - 1) + 'deg) scale(0.875)';
        },
        'depth': function depth(dom, axis, scale, i, offset) {
            var zoomScale = (4 - Math.abs(i - 1)) * 0.18;
            this.wrap.style.webkitPerspective = scale * 4;
            dom.style.zIndex = (i === 1) ? 100 : (offset > 0) ? (1 - i) : (i - 1);
            dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
        },
        'flow': function flow(dom, axis, scale, i, offset) {
            var absoluteOffset = Math.abs(offset);
            var rotateDirect = (axis === 'X') ? 'Y' : 'X';
            var directAmend = (axis === 'X') ? 1 : -1;
            var offsetRatio = Math.abs(offset / scale);

            this.wrap.style.webkitPerspective = scale * 4;

            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            }
            else {
                dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
            }

            dom.style.webkitTransform = 'scale(0.7, 0.7) translateZ(' + (offsetRatio * 150 - 150) * Math.abs(i - 1) + 'px)' + 'translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)' + 'rotate' + rotateDirect + '(' + directAmend * (30 - offsetRatio * 30) * (1 - i) + 'deg)';
        },
        'card': function card(dom, axis, scale, i, offset) {
            var absoluteOffset = Math.abs(offset);

            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
                dom.cur = 1;
            }
            else {
                dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset * 1000 : (i - 1) * absoluteOffset * 1000;
            }

            if (dom.cur && dom.cur !== i) {
                setTimeout(function () {
                    dom.cur = null;
                }, 300);
            }
            var zoomScale = (dom.cur) ? 1 - 0.2 * Math.abs(i - 1) - Math.abs(0.2 * offset / scale).toFixed(6) : 1;
            dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
        },
        'fade': function fade(dom, axis, scale, i, offset) {
            if (offset > 0) {
                dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
            }
            else {
                dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
            }
            offset = Math.abs(offset);
            if (i === 1) {
                dom.style.opacity = 1 - (offset / scale);
            } else {
                dom.style.opacity = offset / scale;
            }
        }
    });
});