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
        var zoneSize = opts && opts.size > 0 ? opts.size : 0;
        var device = this.deviceEvents;

        var range = (function (self) {
            var doc = self.outer.ownerDocument;
            var docEl = doc.documentElement;
            var box = {top: 0, left: 0};
            if (typeof self.outer.getBoundingClientRect !== 'undefined') {
                box = self.outer.getBoundingClientRect();
            }

            var top = box.top + ( window.pageYOffset || docEl.scrollTop ) - ( docEl.clientTop || 0 );
            var left = box.left + ( window.pageXOffset || docEl.scrollLeft ) - ( docEl.clientLeft || 0 );

            return [
                [
                    left + zoneSize,
                    left + self.outer.offsetWidth - zoneSize
                ],
                [
                    top + zoneSize,
                    top + self.outer.offsetHeight - zoneSize
                ]
            ]
        }(this))[this.isVertical ? 1 : 0];

        if (zoneSize > 0) {
            self.on('slide', function (eventName, evt) {
                var rangeMatch = this.isVertical ? 'Y' : 'X';
                var pos = device.hasTouch ? evt.targetTouches[0]['page' + rangeMatch] : evt['page' + rangeMatch];
                if (pos < range[0] || pos > range[1]) {
                    this.endHandler(new Event(device.endEvt));
                }
            });
        }
    })
});