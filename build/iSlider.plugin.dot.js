/**
 * To create dots index on iSlider
 *
 * @file dot.js
 * @author BE-FE Team
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 * @Instructions
 *    activation:
 *       new iSlider({
 *          ...
 *          plugins: ['dot']
 *          ...
 *       });
 *    more options:
 *       new iSlider({
 *          ...
 *          plugins: [['dot', {locate:'absoulute'}]]
 *          ...
 *       });
 * @options
 *    locate {string|HTML Element} the warpper of dots value: 'absolute', 'relative' or Specified dom, default: 'absolute'
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

    iSlider && iSlider.regPlugin('dot', function (opts) {


        var HANDLE = this;
        var data = HANDLE.data;
        var dots = [];
        var evtHandle = [];
        var endEvt = HANDLE.deviceEvents.endEvt;

        var dotWrap = document.createElement('ul');
        dotWrap.className = 'islider-dot-wrap';

        renderDots();

        locate(opts && opts.locate != null ? opts.locate : false)
            .appendChild(dotWrap);

        HANDLE.on('slideChange', function () {
            for (var i = 0; i < data.length; i++) {
                dots[i].className = 'islider-dot';
                if (i === this.slideIndex) {
                    dots[i].className += ' active';
                }
            }
        });

        HANDLE.on('loadData', function () {
            data = this.data;
            renderDots();
        }, 1);

        function renderDots() {
            var fragment = document.createDocumentFragment();
            dots.forEach(function (el, i) {
                el.removeEventListener(endEvt, evtHandle[i], false);
            });
            dots = [], evtHandle = [];
            dotWrap.innerHTML = '';
            for (var i = 0; i < data.length; i++) {
                dots[i] = document.createElement('li');
                dots[i].className = 'islider-dot';
                dots[i].setAttribute('index', i);
                if (i === HANDLE.slideIndex) {
                    dots[i].className += ' active';
                }
                evtHandle[i] = function () {
                    HANDLE.slideTo(parseInt(this.getAttribute('index'), 10));
                };
                dots[i].addEventListener(endEvt, evtHandle[i], false);
                fragment.appendChild(dots[i]);
            }
            dotWrap.appendChild(fragment);
        }

        function locate(locate) {
            if (locate === 'relative') {
                return HANDLE.wrap;
            } else if (Boolean(locate.nodeName) && Boolean(locate.nodeType)) {
                return locate;
            }
            return HANDLE.wrap.parentNode;
        }
    });
});
