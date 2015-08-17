/*
 * @file   To create right&left botton on iSlider
 * @author xieyu33333
 */
(function (global) {
    'use strict';

    global.iSlider && global.iSlider.regPlugin('button', function () {
        var HANDLE = this;
        if (!HANDLE.isVertical) {
            var btnOuter = [];
            var btnInner = [];
            for (var i = 0; i < 2; i++) {
                btnOuter[i] = document.createElement('div');
                btnOuter[i].className = 'islider-btn-outer';
                btnInner[i] = document.createElement('div');
                btnInner[i].className = 'islider-btn-inner';

                if (i === 0) {
                    btnOuter[i].className += ' left';
                    btnOuter[i].dir = -1;
                }
                else {
                    btnOuter[i].className += ' right';
                    btnOuter[i].dir = 1;
                }

                btnOuter[i].addEventListener('click', function () {
                    var dir = parseInt(this.getAttribute('dir'), 10);
                    HANDLE.slideTo(HANDLE.slideIndex + dir);
                });

                btnOuter[i].appendChild(btnInner[i]);
                HANDLE.wrap.appendChild(btnOuter[i], HANDLE.wrap.nextSibling);
            }
        }
    })
})(this);
