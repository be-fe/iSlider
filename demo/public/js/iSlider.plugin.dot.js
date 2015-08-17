/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */
(function (global) {
    'use strict';

    global.iSlider && global.iSlider.regPlugin('dot', function () {
        var HANDLE = this;
        if (!HANDLE.isVertical) {
            var data = HANDLE.data;
            var dots = [];
            var dotWrap = document.createElement('ul');
            dotWrap.className = 'islider-dot-wrap';
            var fregment = document.createDocumentFragment();
            for (var i = 0; i < data.length; i++) {
                dots[i] = document.createElement('li');
                dots[i].className = 'islider-dot';
                dots[i].setAttribute('index', i);
                if (i === HANDLE.slideIndex) {
                    dots[i].className += ' active';
                }
                dots[i].addEventListener('click', function () {
                    var index = parseInt(this.getAttribute('index'), 10);
                    HANDLE.slideTo(index);
                });
                fregment.appendChild(dots[i]);
            }
            dotWrap.appendChild(fregment);
            HANDLE.wrap.parentNode.appendChild(dotWrap);

            HANDLE.on('slideChange', function () {
                if (!HANDLE.isVertical) {
                    for (var i = 0; i < data.length; i++) {
                        dots[i].className = 'islider-dot';
                        if (i === this.slideIndex) {
                            dots[i].className += ' active';
                        }
                    }
                }
            });
        }
    });
})(this);
