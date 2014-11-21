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
            ipad: false
        };
        var p = navigator.platform;
        system.win = p.indexOf('Win') === 0;
        system.mac = p.indexOf('Mac') === 0;
        system.xll = (p === 'X11') || (p.indexOf('Linux') === 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) !== null) ? true : false;

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
        this._setDotAttr();

        var indexLayer = document.createElement('ul');
        indexLayer.className = dotMenuOpts.className || ' ';
        indexLayer.style.cssText += 'width: ' + this.dotWidth + ';'
                                   + 'height: '+ this.dotHeight + ';'
                                   + 'margin: ' + this.dotMargin + ';'
                                   + 'position: ' + this.dotPosition + ';'
                                   + 'padding: ' + this.dotPadding + ';'
                                   + 'left: ' + this.dotLeft + ';'
                                   + 'right: ' + this.dotRight + ';'
                                   + 'bottom: ' + this.dotBottom + ';'
                                   + 'top: ' + this.dotTop + ';'
                                   + 'z-index: ' + this.dotZindex + ';'
                                   + 'text-align: ' + this.dotAlignment + ';';

        wrap.parentNode.insertBefore(indexLayer, wrap.nextSibling);
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < len; i++) {
            var point = document.createElement('li');
            point.id = 'point' + i;
            point.style.cssText += 'position: ' + this.dotPtPosition + ';'
                                   + 'display: ' + this.dotPtDisplay + ';'
                                   + 'width: ' + this.dotPtWidth + ';'
                                   + 'height: ' + this.dotPtHeight + ';'
                                   + 'border-radius: ' + this.dotPtBorderRadius + ';'
                                   + 'border: ' + this.dotPtBorder + ' ' + this.dotPtBorderColor + ';'
                                   + 'list-style-type: ' + this.dotPtListStyleType + ';'
                                   + 'margin: ' + this.dotPtMargin + ';'
            if (i === 0) {
                point.style.cssText += 'background-color: ' + this.dotPtBGColor + ';';
            }

            pointList.push(point);
            this._bindTouchEvent(point, this._bindTouchEventDot);
            fragment.appendChild(point);
        }

        indexLayer.appendChild(fragment);
        this.pointList = pointList;
    },

    _setDotAttr: function() {

        var dotMenuOpts = this.dotMenuOpts;

        this.dotPadding = '0';
        this.dotPosition = 'absolute';
        this.dotLeft = dotMenuOpts.left || '0';
        this.dotRight = dotMenuOpts.right || '0';
        this.dotTop = dotMenuOpts.top || '0';
        this.dotBottom = dotMenuOpts.bottom || '0';
        this.dotZindex = '10000';
        this.dotAlignment = 'center';

        if (dotMenuOpts.isVertical && dotMenuOpts.isVertical === true) {
            this.dotWidth = dotMenuOpts.width || '10%';
            this.dotHeight = dotMenuOpts.height || '50%';
            this.dotMargin = 'auto 0';
        } else {
            this.dotWidth = dotMenuOpts.width || '50%';
            this.dotHeight = dotMenuOpts.height || '10%';
            this.dotMargin = '0 auto';
        }

        this.dotPtPosition = 'relative';
        this.dotPtWidth = dotMenuOpts.diameter || '1em';
        this.dotPtHeight = dotMenuOpts.diameter || '1em';
        this.dotPtBorderRadius = '50%';
        this.dotPtBorder = '1px solid';
        this.dotPtBorderColor = dotMenuOpts.borderColor || '#fff';
        this.dotPtListStyleType = 'none';
        this.dotPtMargin = '5px';
        this.dotPtBGColor = dotMenuOpts.borderColor || '#fff';

        if (dotMenuOpts.isVertical && dotMenuOpts.isVertical === true) {
            this.dotPtDisplay = 'block';
        } else {
            this.dotPtDisplay = 'inline-block';
        }
    },

    changeIndexDot: function() {

        var dotMenuOpts = this.dotMenuOpts;
        var idx = this.slideIndex;
        var data = this.data;
        var len = data.length;
        var pointList = this.pointList;

        for (var i = 0; i < len; i++) {
            pointList[i].style.backgroundColor = '';
            if (i === idx) {
                pointList[i].style.backgroundColor = dotMenuOpts.borderColor || '#fff';
            }
        }
    },

    _bindTouchEventDot: function(evt) {
        var self = this.self;
        var idx = parseInt(evt.target.id.substring(5));
        self.slideTo(idx);
    },

    // Button Navigation Menu
    // * @param {Object}      menuOpts                    参数集         Options
    // * @param {Boolean}     menuOpts.isVertical         垂直/居中      Veritcal/Horizontal
    // * @param {Boolean}     menuOpts.isLooping          内容循环       Looping content or not
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
        var wrap = this.wrap;
        this._setBtnAttr();
        var btnLayer = [];
        var btnLayerChild = [];

        for (var i = 0; i < 2; i++) {
            btnLayer[i] = document.createElement('div');
            btnLayer[i].className = btnMenuOpts.className || ' ';
            btnLayer[i].style.cssText += 'position: ' + this.btnLayerPosition + ';'
                                         + 'width: ' + this.btnLayerWidth + ';'
                                         + 'height: ' + this.btnLayerHeight + ';'
                                         + 'cursor: ' + this.btnLayerCursor + ';'
                                         + 'background-color: ' + this.btnLayerBGColor + ';' 

            btnLayerChild[i] = document.createElement('div');
            btnLayerChild[i].style.cssText += 'position: ' + this.btnLayerChildPosition + ';'
                                              + 'width: ' + this.btnLayerChildWidth + ';'
                                              + 'height: ' + this.btnLayerChildHeight + ';'
                                              + 'border-top: ' + this.btnLayerChildBorderTop + ';'
                                              + 'border-left: ' + this.btnLayerChildBorderLeft + ';'
                                              + 'margin: ' + this.btnLayerChildMargin + ';'
                                              + 'top: ' + this.btnLayerChildTop + ';'
                                              + 'bottom: ' + this.btnLayerChildBottom + ';'
                                              + 'left: ' + this.btnLayerChildLeft + ';'
                                              + 'right: ' + this.btnLayerChildRight + ';';

            if (btnMenuOpts.isVertical) {
                btnLayer[i].style.left = '0';
                btnLayer[i].style.right = '0';
                btnLayer[i].style.margin = '0 auto';

                if (i === 0) {
                    btnLayer[i].style.top = btnMenuOpts.top || '2%';
                    btnLayerChild[i].style.webkitTransform = 'rotate(45deg)';
                } else {
                    btnLayer[i].style.bottom = btnMenuOpts.bottom || '2%';
                    btnLayerChild[i].style.webkitTransform = 'rotate(225deg)';
                }
            } else {
                btnLayer[i].style.top = '0';
                btnLayer[i].style.bottom = '0';
                btnLayer[i].style.margin = 'auto 0';

                if (i === 0) {
                    btnLayer[i].style.left = btnMenuOpts.left || '5%';
                    btnLayerChild[i].style.webkitTransform = 'rotate(-45deg)';
                } else {
                    btnLayer[i].style.right = btnMenuOpts.right || '5%';
                    btnLayerChild[i].style.webkitTransform = 'rotate(135deg)';
                }
            }
            btnLayer[i].direction = i;
            this._bindTouchEvent(btnLayer[i], this._bindTouchEventBtn);

            if (!this.btnMenuOpts.isLooping) {
                if (this.slideIndex === 0) {
                    btnLayer[0].style.display = 'none';
                }
            }

            btnLayer[i].appendChild(btnLayerChild[i]);
            wrap.parentNode.insertBefore(btnLayer[i], wrap.nextSibling);
        }

        this.buttonLayer = btnLayer;
    },

    _setBtnAttr: function() {
        var btnMenuOpts = this.btnMenuOpts;

        var size = btnMenuOpts.width || '3em';
        var borderStyle = btnMenuOpts.border || '2px solid #fff';

        this.btnLayerPosition = 'absolute';
        this.btnLayerWidth = size;
        this.btnLayerHeight = size;
        this.btnLayerCursor = 'pointer';
        this.btnLayerBGColor = btnMenuOpts.backgroundColor || '#777';

        this.btnLayerChildPosition = 'absolute';
        this.btnLayerChildWidth = '50%';
        this.btnLayerChildHeight = '50%';
        this.btnLayerChildBorderTop = borderStyle;
        this.btnLayerChildBorderLeft = borderStyle;
        this.btnLayerChildTop = '0';
        this.btnLayerChildBottom = '0';
        this.btnLayerChildLeft = '0';
        this.btnLayerChildRight = '0';
        this.btnLayerChildMargin = 'auto';
    },

    changeIndexBtn: function() {

        var btnMenuOpts = this.btnMenuOpts;
        var len = this.data.length;
        this.buttonLayer[0].style.display = 'block';
        this.buttonLayer[1].style.display = 'block';
        if (!btnMenuOpts.isLooping) {
            if (this.slideIndex === len - 1) {
                this.buttonLayer[1].style.display = 'none';
            } else if (this.slideIndex === 0) {
                this.buttonLayer[0].style.display = 'none';
            }
        }
    },

    _bindTouchEventBtn: function(evt) {

        var self = this.self;
        self.direction = this.direction;

        if (self.direction === 0) {
            self.direction = -1;
        } else {
            self.direction = 1;
        }

        self.slideTo(self.slideIndex + self.direction);
    },

    _bindTouchEvent: function(target, func) {
        target.self = this;
        if (this._checkDevice() === true) {
            target.addEventListener('touchstart', func, false);
        } else {
            target.addEventListener('click', func, false);
        }
    }
});
