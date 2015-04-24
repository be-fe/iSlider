/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

define(['iSlider'], function (iSlider) {
    iSlider.prototype.extend({
        addDot: function () {
            if (!this.isVertical) {
                var self = this;
                var data = this.data;
                var dots = [];
                var dotWrap = document.createElement('ul');
                dotWrap.className = 'islider-dot-wrap';
                var fregment = document.createDocumentFragment();
                for (var i = 0; i < data.length; i++) {
                    dots[i] = document.createElement('li');
                    dots[i].className = 'islider-dot';
                    dots[i].setAttribute('index', i);
                    if (i === this.slideIndex) {
                        dots[i].className += ' active';
                    }
                    dots[i].addEventListener('click', function () {
                        var index = parseInt(this.getAttribute('index'), 10);
                        self.slideTo(index);
                    });
                    fregment.appendChild(dots[i]);
                }
                dotWrap.appendChild(fregment);
                this.wrap.parentNode.appendChild(dotWrap);

                this.dotchange = function () {
                    for (var i = 0; i < data.length; i++) {
                        dots[i].className = 'islider-dot';
                        if (i === this.slideIndex) {
                            dots[i].className += ' active';
                        }
                    }
                };
            }
        }
    });
});
