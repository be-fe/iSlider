iSlider.prototype.extend({
    bindMouse: function() {
        var self = this;
        var scaleW = self.scaleW;
        var outer = self.outer;
        var len = self.data.length;
        var bDrag = false;

        var mouseStart = function (evt) {
            bDrag = true;
            self.pause();
            self.onslidestart && self.onslidestart();

            self.startTime = new Date().getTime();
            self.startX = evt.clientX;
            self.startY = evt.clientY;

            var target = evt.target;
            while (target.nodeName != 'LI' && target.nodeName != 'BODY') {
                target = target.parentNode;
            }
            self.target = target;
        };

        var mouseMove = function (evt) {
            if ( bDrag ) {
                evt.preventDefault();
                self.onslide && self.onslide();

                var axis = self.axis;
                var offset = evt['client' + axis] - self['start' + axis];

                if (!self.isLooping) {
                    if (offset > 0 && self.sliderIndex === 0 || offset < 0 && self.sliderIndex === self.data.length - 1) {
                        offset = self._damping(offset);
                    }
                }

                for (var i = 0; i < 3; i++) {
                    var item = self.els[i];
                    item.style.webkitTransition = 'all 0s';
                    self._animateFunc(item, axis, self.scale, i, offset);
                }

                self.offset = offset;
            }
        };

        var mouseEnd = function (evt) {
            evt.preventDefault();

            bDrag = false;
            var boundary = self.scale / 2;
            var metric = self.offset;
            var endTime = new Date().getTime();

            //a quick slide time must under 300ms
            //a quick slide should also slide at least 14 px
            boundary = endTime - self.startTime > 300 ? boundary : 14;

            if (metric >= boundary) {
                self._slide(-1);
            } else if (metric < -boundary) {
                self._slide(1);
            } else {
                self._slide(0);
            }

            self.isAutoplay && self.play();
            self.offset = 0;
            self.onslideend && self.onslideend();
            self.log('Event: afterslide');
        };

        outer.addEventListener('mousedown', mouseStart);
        outer.addEventListener('mousemove', mouseMove);
        outer.addEventListener('mouseup', mouseEnd);

    }

})