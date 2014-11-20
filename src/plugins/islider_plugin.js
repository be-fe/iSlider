/**
 * iSlider Plugin
 * A simple, efficent mobile slider
 * @Author BEFE
 *
 */
iSlider.prototype.extend({

    _checkDevice: function() {
        var system = { 
        win: false, 
        mac: false, 
        xll: false, 
        ipad:false 
        }; 

        var p = navigator.platform; 
        system.win = p.indexOf("Win") == 0; 
        system.mac = p.indexOf("Mac") == 0; 
        system.xll = (p == "X11") || (p.indexOf("Linux") == 0); 
        system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;

        if (system.xll || system.ipad) { 
            return true;
        }
        return false;
    },

    // * Dots Navgitation Menu
    // * @param {Object}      dotMenuOpts                参数集         Options
    // * @param {Boolean}     dotMenuOpts.isVertical     垂直/居中      Veritcal/Horizontal     
    // * @param {String}      dotMenuOpts.width          宽度           width
    // * @param {String}      dotMenuOpts.height         高度           height
    // * @param {String}      dotMenuOpts.top            距高           top position
    // * @param {String}      dotMenuOpts.bottom         距底           bottom position
    // * @param {String}      dotMenuOpts.left           距左           left position
    // * @param {String}      dotMenuOpts.right          距右           right position
    // * @param {String}      dotMenuOpts.diameter       直径           diameter of points
    // * @param {String}      dotMenuOpts.borderColor    边框颜色        color of border
    // * @param {String}      dotMenuOpts.className      CSS类          css class

    renderDot: function(dotMenuOpts) {

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

            if (this._checkDevice() === true) {
                point.addEventListener('touchstart', this.bindTouchEventDot, false);
            }
            else {
                point.addEventListener('click', this.bindTouchEventDot, false);
            }
            fragment.appendChild(point);
        }

        indexLayer.appendChild(fragment);
        this.pointList = pointList;
    },

    changeIndexDot: function() {

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

    bindTouchEventDot: function(evt) {
        var self = this.self;
        var idx = parseInt(evt.target.id.substring(5));
        self.slideTo(idx);
    },

    // Button Navigation Menu
    // * @param {Object}      menuOpts                    参数集         Options
    // * @param {Boolean}     menuOpts.isVertical         垂直/居中      Veritcal/Horizontal     
    // * @param {String}      menuOpts.width              宽度           width
    // * @param {String}      menuOpts.height             高度           height
    // * @param {String}      menuOpts.top                距高           top position
    // * @param {String}      menuOpts.bottom             距底           bottom position
    // * @param {String}      menuOpts.left               距左           left position
    // * @param {String}      menuOpts.right              距右           right position
    // * @param {String}      menuOpts.border             边框样式        style of border
    // * @param {String}      menuOpts.backgroundColor    背景颜色        background color
    // * @param {String}      menuOpts.className          CSS类          css class

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

            if (this._checkDevice() === true) {
                btnLayer[i].addEventListener('touchstart', this.bindTouchEventBtn, false);
            }
            else {
                btnLayer[i].addEventListener('click', this.bindTouchEventBtn, false);
            }

            if (this.btnMenuOpts.isLooping === false) {
            
                if (this.slideIndex === 0) {
                    btnLayer[0].style.display = 'none';
                }
            }

            btnLayer[i].appendChild(btnLayerChild[i]);
            wrap.parentNode.insertBefore(btnLayer[i], wrap.nextSibling);
        }

        this.buttonLayer = btnLayer;
    },

    changeIndexBtn: function() {

        var len = this.data.length;
        this.buttonLayer[0].style.display = 'block';
        this.buttonLayer[1].style.display = 'block';
        if (this.btnMenuOpts.isLooping === false) {
            
            if (this.slideIndex === len - 1) {
                this.buttonLayer[1].style.display = 'none';
            }
            else if (this.slideIndex === 0) {
                this.buttonLayer[0].style.display = 'none';
            }
        }
    },

    bindTouchEventBtn: function(evt) {

        var self = this.self;
        self.direction = this.direction;

        if (self.direction === 0) {
            self.direction = -1;
        }
        else {
            self.direction = 1;
        }

        self.slideTo(self.slideIndex + self.direction);
    }
});
