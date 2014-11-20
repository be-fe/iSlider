/**
 * iSlider Button Plugin
 * A simple, efficent mobile slider
 * @Author BEFE
 *
 * @param {Object}      menuOpts                    参数集         Options
 * @param {Boolean}     menuOpts.isVertical         垂直/居中      Veritcal/Horizontal     
 * @param {String}      menuOpts.width              宽度           width
 * @param {String}      menuOpts.height             高度           height
 * @param {String}      menuOpts.top                距高           top position
 * @param {String}      menuOpts.bottom             距底           bottom position
 * @param {String}      menuOpts.left               距左           left position
 * @param {String}      menuOpts.right              距右           right position
 * @param {String}      menuOpts.border             边框样式        style of border
 * @param {String}      menuOpts.backgroundColor    背景颜色        background color
 * @param {String}      menuOpts.className          CSS类          css class
 * @class
 */
iSlider.prototype.extend({
    renderBtn: function(btnMenuOpts) {

        this.btnMenuOpts = btnMenuOpts || {};
        var data = this.data;
        var len = data.length;
        var wrap = this.wrap;

        var btnLayer = [];
        var btnLayerChild = [];

        var size = this.btnMenuOpts.width || '3em';
        var borderStyle = this.btnMenuOpts.border || '2px solid #fff';

        for (var i = 0; i < 2; i++) {
            btnLayer[i] = document.createElement('div');
            btnLayer[i].className = this.btnMenuOpts.className || '';
            btnLayer[i].style.position = 'absolute';
            btnLayer[i].style.width = size;
            btnLayer[i].style.height = size;
            btnLayer[i].style.cursor = 'pointer';
            btnLayer[i].style.backgroundColor = this.btnMenuOpts.backgroundColor || '#777';

            btnLayerChild[i] = document.createElement('div');
            btnLayerChild[i].style.position = 'absolute';
            btnLayerChild[i].style.width = '50%';
            btnLayerChild[i].style.height = '50%';
            btnLayerChild[i].style.borderTop = borderStyle;
            btnLayerChild[i].style.cursor = 'pointer';

            if (this.btnMenuOpts.isVertical) {
                btnLayer[i].style.left = '0';
                btnLayer[i].style.right = '0';
                btnLayer[i].style.marginLeft = 'auto';
                btnLayer[i].style.marginRight = 'auto';

                if (i === 0) {
                    btnLayer[i].style.top = this.btnMenuOpts.top || '2%';
                    btnLayerChild[i].style.borderLeft = borderStyle;
                    btnLayerChild[i].style.webkitTransform = 'rotate(45deg)';
                }
                else {
                    btnLayer[i].style.bottom = this.btnMenuOpts.bottom || '2%';
                    btnLayerChild[i].style.borderRight = borderStyle;
                    btnLayerChild[i].style.webkitTransform = 'rotate(135deg)';
                }
            }
            else {
                btnLayer[i].style.top = '0';
                btnLayer[i].style.bottom = '0';
                btnLayer[i].style.marginTop = 'auto';
                btnLayer[i].style.marginBottom = 'auto';

                if (i === 0) {
                    btnLayer[i].style.left = this.btnMenuOpts.left || '5%';
                    btnLayerChild[i].style.borderLeft = borderStyle;
                    btnLayerChild[i].style.webkitTransform = 'rotate(-45deg)';
                }
                else {
                    btnLayer[i].style.right = this.btnMenuOpts.right || '5%';
                    btnLayerChild[i].style.borderRight = borderStyle;
                    btnLayerChild[i].style.webkitTransform = 'rotate(45deg)';
                }
            }

            btnLayerChild[i].style.top = '0';
            btnLayerChild[i].style.bottom = '0';
            btnLayerChild[i].style.left = '0';
            btnLayerChild[i].style.right = '0';
            btnLayerChild[i].style.margin = 'auto';

            btnLayer[i].self = this;
            btnLayer[i].direction = i;
            btnLayer[i].addEventListener('touchstart', this.bindTouchEvent, false);
            // btnLayer[i].addEventListener('click', this.bindTouchEvent, false);

            btnLayer[i].appendChild(btnLayerChild[i]);
            wrap.parentNode.insertBefore(btnLayer[i], wrap.nextSibling);
        }
        
    },

    changeIndex: function(self, direction) {
        self.slideTo(self.slideIndex + direction);
    },

    bindTouchEvent: function(evt) {
        var self = this.self;
        var direction = this.direction;

        if (direction === 0) {
            direction = -1;
        }
        else {
            direction = 1;
        }
        self.changeIndex(self, direction);
    }
});
