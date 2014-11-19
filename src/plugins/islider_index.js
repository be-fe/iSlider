/**
 * iSlider Dots Plugin
 * A simple, efficent mobile slider
 * @Author BEFE
 *
 * @param {Object}      menuOpts                参数集         Options
 * @param {Boolean}     menuOpts.isVertical     垂直/居中      Veritcal/Horizontal     
 * @param {String}      menuOpts.width          宽度           width
 * @param {String}      menuOpts.height         高度           height
 * @param {String}      menuOpts.top            距高           top position
 * @param {String}      menuOpts.bottom         距底           bottom position
 * @param {String}      menuOpts.left           距左           left position
 * @param {String}      menuOpts.right          距右           right position
 * @param {String}      menuOpts.diameter       直径           diameter of points
 * @param {String}      menuOpts.borderColor    边框颜色        color of border
 * @class
 */
iSlider.prototype.extend({
    renderIndex: function(menuOpts) {

        this.menuOpts = menuOpts || {};
        var pointMenuOpt = this.menuOpts || {};
        var data = this.data;
        var len = data.length;
        var wrap = this.wrap;
        var pointList = [];

        var indexLayer = document.createElement('ul');
        indexLayer.style.margin = 0;
        if (pointMenuOpt.isVertical && pointMenuOpt.isVertical === true) {
            indexLayer.style.width = pointMenuOpt.width || '10%';
            indexLayer.style.height = pointMenuOpt.height || '50%';
            indexLayer.style.marginTop = 'auto';
            indexLayer.style.marginBottom = 'auto';
        }
        else {
            indexLayer.style.width = pointMenuOpt.width || '50%';
            indexLayer.style.height = pointMenuOpt.height || '10%';
            indexLayer.style.marginLeft = 'auto';
            indexLayer.style.marginRight = 'auto';
            indexLayer.style.textAlign = 'center';
        }

        indexLayer.style.padding = '0';
        indexLayer.style.position = 'absolute';
        indexLayer.style.left = pointMenuOpt.left || '0';
        indexLayer.style.right = pointMenuOpt.right || '0';
        indexLayer.style.top = pointMenuOpt.top || '0';
        indexLayer.style.bottom = pointMenuOpt.bottom || '0';

        indexLayer.style.zIndex = '10000';

        wrap.parentNode.insertBefore(indexLayer, wrap.nextSibling);
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < len; i++) {
            var point = document.createElement('li');
            point.id = 'point' + i;
            point.style.height = pointMenuOpt.diameter || '1em';
            point.style.width = pointMenuOpt.diameter || '1em';
            point.style.borderRadius = '50%';
            point.style.border = '1px solid';
            point.style.borderColor = pointMenuOpt.borderColor || '#fff';
            point.style.listStyleType = 'none';
            point.style.position = 'relative';
            point.style.margin = '5px';

            if (pointMenuOpt.isVertical && pointMenuOpt.isVertical === true) {
                point.style.display = 'block';
            }
            else {
                point.style.display = 'inline-block';
            }

            pointList.push(point);

            if (i === 0) {
                point.style.backgroundColor = pointMenuOpt.borderColor || '#fff';
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

        var pointMenuOpt = this.menuOpts || {};
        var idx = this.slideIndex;
        var data = this.data;
        var len = data.length;
        var pointList = this.pointList;

        for (var i = 0; i < len; i++) {
            pointList[i].style.backgroundColor = '';
            if (i === idx) {
                pointList[i].style.backgroundColor = pointMenuOpt.borderColor || '#fff';
            }
        }
    },

    bindTouchEvent: function(evt) {
        var self = this.self;
        var idx = parseInt(evt.target.id.substring(5));
        self.slideTo(idx);
    }
});
