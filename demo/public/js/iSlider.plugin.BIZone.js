/**
 * Boundary Identification Zone
 *
 * @file BIZone.js
 * @author BE-FE Team
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

    iSlider && iSlider.regPlugin('BIZone', function (opts) {

        var HANDLE = this;
        var zoneSize = parseZone(opts.size || 0);
        var device = this.deviceEvents;
        var outer = HANDLE.outer;

        var range = initRange();

        function parseZone(sizes) {
            if (typeof sizes === 'number') {
                if (sizes < 0) {
                    sizes = 0;
                }
                return [sizes, sizes, sizes, sizes];
            } else if (sizes instanceof Array) {
                switch (sizes.length) {
                    case 4:
                        return sizes;
                    case 3:
                        return [sizes[0], sizes[1], sizes[2], sizes[1]];
                    case 2:
                        return [sizes[0], sizes[1], sizes[0], sizes[1]];
                    case 1:
                        return [sizes[0], sizes[0], sizes[0], sizes[0]];
                }
            }

            return [0, 0, 0, 0];
        }

        function initRange() {
            var docEl = outer.ownerDocument.documentElement;
            var box = {top: 0, left: 0};
            if (typeof outer.getBoundingClientRect !== 'undefined') {
                box = outer.getBoundingClientRect();
            }

            var top = box.top + ( window.pageYOffset || docEl.scrollTop ) - ( docEl.clientTop || 0 );
            var left = box.left + ( window.pageXOffset || docEl.scrollLeft ) - ( docEl.clientLeft || 0 );

            return [
                top, // top
                left + outer.offsetWidth, // right
                top + outer.offsetHeight, // bottom
                left // left
            ];
        }

        if (zoneSize.filter(function (i) {
                return i > 0;
            }).length > 0) {
            HANDLE.on('slide', function (evt) {
                var finger = device.hasTouch ? evt.targetTouches[0] : evt;
                var pos = [finger.pageY, finger.pageX, finger.pageY, finger.pageX];
                for (var i = 0; i < 4; i++) {
                    if (Math.abs(pos[i] - range[i]) < zoneSize[i]) {
                        this.endHandler(new Event(device.endEvt));
                        break;
                    }
                }
            });
        }
    });
});