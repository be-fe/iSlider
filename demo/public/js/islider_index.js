/**
 * iSlider Dots Plugin
 * A simple, efficent mobile slider
 * @Author BEFE
 *
 * @param {Object}      dotMenuOpts                参数集         Options
 * @param {Boolean}     dotMenuOpts.isVertical     垂直/居中      Veritcal/Horizontal     
 * @param {String}      dotMenuOpts.width          宽度           width
 * @param {String}      dotMenuOpts.height         高度           height
 * @param {String}      dotMenuOpts.top            距高           top position
 * @param {String}      dotMenuOpts.bottom         距底           bottom position
 * @param {String}      dotMenuOpts.left           距左           left position
 * @param {String}      dotMenuOpts.right          距右           right position
 * @param {String}      dotMenuOpts.diameter       直径           diameter of points
 * @param {String}      dotMenuOpts.borderColor    边框颜色        color of border
 * @param {String}      dotMenuOpts.className      CSS类          css class
 * @class
 */
iSlider.prototype.extend({
    renderIndex: function(dotMenuOpts) {

        this.dotMenuOpts = dotMenuOpts || {};
        var data = this.data;
        var len = data.length;
        var wrap = this.wrap;
        var pointList = [];

        var indexLayer = document.createElement('ul');
        indexLayer.style.margin = 0;
        indexLayer.className = this.dotMenuOpts.className || '';
        if (this.dotMenuOpts.isVertical && this.dotMenuOpts.isVertical === true) {
            indexLayer.style.width = this.dotMenuOpts.width || '10%';
            indexLayer.style.height = this.dotMenuOpts.height || '50%';
            indexLayer.style.marginTop = 'auto';
            indexLayer.style.marginBottom = 'auto';
        }
        else {
            indexLayer.style.width = this.dotMenuOpts.width || '50%';
            indexLayer.style.height = this.dotMenuOpts.height || '10%';
            indexLayer.style.marginLeft = 'auto';
            indexLayer.style.marginRight = 'auto';
            indexLayer.style.textAlign = 'center';
        }

        indexLayer.style.padding = '0';
        indexLayer.style.position = 'absolute';
        indexLayer.style.left = this.dotMenuOpts.left || '0';
        indexLayer.style.right = this.dotMenuOpts.right || '0';
        indexLayer.style.top = this.dotMenuOpts.top || '0';
        indexLayer.style.bottom = this.dotMenuOpts.bottom || '0';

        indexLayer.style.zIndex = '10000';

        wrap.parentNode.insertBefore(indexLayer, wrap.nextSibling);
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < len; i++) {
            var point = document.createElement('li');
            point.id = 'point' + i;
            point.style.height = this.dotMenuOpts.diameter || '1em';
            point.style.width = this.dotMenuOpts.diameter || '1em';
            point.style.borderRadius = '50%';
            point.style.border = '1px solid';
            point.style.borderColor = this.dotMenuOpts.borderColor || '#fff';
            point.style.listStyleType = 'none';
            point.style.position = 'relative';
            point.style.margin = '5px';

            if (this.dotMenuOpts.isVertical && this.dotMenuOpts.isVertical === true) {
                point.style.display = 'block';
            }
            else {
                point.style.display = 'inline-block';
            }

            pointList.push(point);

            if (i === 0) {
                point.style.backgroundColor = this.dotMenuOpts.borderColor || '#fff';
            }
            point.self = this;
            point.addEventListener('touchstart', this.bindTouchEvent, false);
            point.addEventListener('click', this.bindTouchEvent, false);
            fragment.appendChild(point);
        }

        indexLayer.appendChild(fragment);
        this.pointList = pointList;
    },

    changeIndex: function() {

        var idx = this.slideIndex;
        var data = this.data;
        var len = data.length;
        var pointList = this.pointList;

        for (var i = 0; i < len; i++) {
            pointList[i].style.backgroundColor = '';
            if (i === idx) {
                pointList[i].style.backgroundColor = this.dotMenuOpts.borderColor || '#fff';
            }
        }
    },

    bindTouchEvent: function(evt) {
        var self = this.self;
        var idx = parseInt(evt.target.id.substring(5));
        self.slideTo(idx);
    }
});
