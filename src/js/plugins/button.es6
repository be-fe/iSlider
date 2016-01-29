/**
 * To create right&left botton on iSlider
 *
 * @file button.js
 * @author BE-FE Team
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 */

'use strict';

iSlider && iSlider.regPlugin('button', function button(opts = {}) {
    let outer;
    let inner;

    for (let i = 0; i < 2; i++) {
        outer = document.createElement('div');
        outer.className = 'islider-btn-outer';
        inner = document.createElement('div');
        inner.className = 'islider-btn-inner';

        if (i === 0) {
            btnOuter[i].className += ' left';
            btnOuter[i].dir = -1;
        }
        else {
            btnOuter[i].className += ' right';
            btnOuter[i].dir = 1;
        }

        btnOuter[i].addEventListener('click', (evt) => {
            this.slideTo(this.slideIndex + parseInt(evt.target.getAttribute('dir')));
        }, false);

        btnOuter[i].appendChild(btnInner[i]);
        this.wrap.appendChild(btnOuter[i], this.wrap.nextSibling);
    }
});