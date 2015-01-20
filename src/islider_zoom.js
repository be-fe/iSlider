/**
 * Created by liuhui01 on 2015/1/7.
 */
define(['iSlider'], function (iSlider) {
    var has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
    var minScale=1/2;
    var viewScope = {};

    function generateTranslate(x, y, z, scale) {
        return "translate" + (has3d ? "3d(" : "(") + x + "px," + y + (has3d ? "px," + z + "px)" : "px)") + "scale(" + scale + ")";
    }
    function getDistance(a,b){
        var x,y;
        x= a.left- b.left;
        y= a.top- b.top;
        return Math.sqrt(x*x+y*y);
    }
    function generateTransformOrigin(x, y) {
        return x + "px " + y + "px";
    }
    function getTouches(touches){
        return Array.prototype.slice.call(touches).map(function(touch){
            return {
                left:touch.pageX,
                top:touch.pageY
            }
        });
    }
    function calculateScale(start,end){
        var startDistance=getDistance(start[0],start[1]);
        var endDistance=getDistance(end[0],end[1]);
        return endDistance/startDistance;
    }

    function getComputedTranslate(obj) {
        var result = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            scaleX: 1,
            scaleY: 1,
            offsetX: 0,
            offsetY: 0
        };
        var offsetX = 0, offsetY = 0;
        if (!window.getComputedStyle || !obj) return result;
        var style = window.getComputedStyle(obj), transform, origin;
        transform = style.webkitTransform || style.mozTransform;
        origin = style.webkitTransformOrigin || style.mozTransformOrigin;
        var par = origin.match(/(.*)px\s+(.*)px/);
        if (par.length > 1) {
            offsetX = par[1] - 0;
            offsetY = par[2] - 0;
        }
        if (transform == "none") return result;
        var mat3d = transform.match(/^matrix3d\((.+)\)$/);
        var mat2d = transform.match(/^matrix\((.+)\)$/);
        if (mat3d) {
            var str = mat3d[1].split(', ');
            result = {
                translateX: str[12] - 0,
                translateY: str[13] - 0,
                translateZ: str[14] - 0,
                offsetX:    offsetX - 0,
                offsetY:    offsetY - 0,
                scaleX:     str[0] - 0,
                scaleY:     str[5] - 0,
                scaleZ:     str[10] - 0
            };
        } else if (mat2d) {
            var str = mat2d[1].split(', ');
            result = {
                translateX: str[4] - 0,
                translateY: str[5] - 0,
                offsetX:    offsetX - 0,
                offsetY:    offsetY - 0,
                scaleX:     str[0] - 0,
                scaleY:     str[3] - 0
            };
        }
        return result;
    }

    function getCenter(a, b) {
        return {
            x: (a.x + b.x) / 2,
            y: (a.y + b.y) / 2
        }
    }

    //初始化缩放参数等
    function initZoom(opts) {
        this.currentScale = 1;
        this.zoomFactor = opts.zoomFactor || 2;
    }

    function startHandler(evt) {
        if (this.useZoom) {
            var node = this.els[1].querySelector('img');
            var transform = getComputedTranslate(node);
            this.startTouches=getTouches(evt.targetTouches);
            this._startX = transform.translateX - 0;
            this._startY = transform.translateY - 0;
            this.currentScale = transform.scaleX;
            this.zoomNode = node;
            var pos = getPosition(node);
            if (evt.targetTouches.length == 2) {
                console.log("gesture");
                this.lastTouchStart = null;
                var touches = evt.touches;
                var touchCenter = getCenter({
                    x: touches[0].pageX,
                    y: touches[0].pageY
                }, {
                    x: touches[1].pageX,
                    y: touches[1].pageY
                });
                node.style.webkitTransformOrigin = generateTransformOrigin(touchCenter.x - pos.left, touchCenter.y - pos.top);
            } else if (evt.targetTouches.length === 1) {
                var time = (new Date()).getTime();
                this.gesture = 0;
                if (time - this.lastTouchStart < 300) {
                    evt.preventDefault();
                    this.gesture = 3;

                }
                this.lastTouchStart = time;
            }
        }

    }

    function moveHandler(evt) {
        var result = 0, node = this.zoomNode;
        if (evt.targetTouches.length == 2 && this.useZoom) {
            node.style.webkitTransitionDuration = "0";
            evt.preventDefault();
            this._scaleImage(evt);
            result = 2;
        } else if (evt.targetTouches.length == 1 && this.useZoom && this.currentScale > 1) {
            node.style.webkitTransitionDuration = "0";
            evt.preventDefault();
            this._moveImage(evt);
            result = 1;
        }
        this.gesture = result;
        return result;

    }

    function handleDoubleTap(evt) {
        var zoomFactor = this.zoomFactor || 2;
        var node = this.zoomNode;
        var pos = getPosition(node);
        this.currentScale = this.currentScale == 1 ? zoomFactor : 1;
        node.style.webkitTransform = generateTranslate(0, 0, 0, this.currentScale);
        if (this.currentScale != 1) node.style.webkitTransformOrigin = generateTransformOrigin(evt.touches[0].pageX - pos.left, evt.touches[0].pageY - pos.top);

    }

    //缩放图片
    function scaleImage(evt) {
        var moveTouces=getTouches(evt.targetTouches);
        var scale=calculateScale(this.startTouches,moveTouces);
        evt.scale=evt.scale||scale;
        var node = this.zoomNode;
        scale=this.currentScale*evt.scale<minScale?minScale:this.currentScale*evt.scale;
        node.style.webkitTransform = generateTranslate(0, 0, 0, scale);

    }

    function endHandler(evt) {
        var result = 0;
        if (this.gesture === 2) {//双手指 todo
            this._resetImage(evt);
            result = 2;
        } else if (this.gesture == 1) {//放大拖拽 todo
            this._resetImage(evt);
            result = 1;
        } else if (this.gesture === 3) {//双击
            this._handleDoubleTap(evt);
            this._resetImage(evt);
        }

        return result;
    }

    //拖拽图片
    function moveImage(evt) {
        var node = this.zoomNode;
        var device = this._device();
        var offset = {
            X: device.hasTouch ? (evt.targetTouches[0].pageX - this.startX) : (evt.pageX - this.startX),
            Y: device.hasTouch ? (evt.targetTouches[0].pageY - this.startY) : (evt.pageY - this.startY)
        };
        this.moveOffset = {
            x: this._startX + offset.X - 0,
            y: this._startY + offset.Y - 0
        };
        node.style.webkitTransform = generateTranslate(this.moveOffset.x, this.moveOffset.y, 0, this.currentScale);
    }

    function getPosition(element) {
        var pos = {"left": 0, "top": 0};
        do {
            pos.top += element.offsetTop || 0;
            pos.left += element.offsetLeft || 0;
            element = element.offsetParent;
        }
        while (element);
        return pos;
    }

    function valueInViewScope(node, value, tag) {
        var min, max;
        var pos = getPosition(node);
        viewScope = {
            start: {left: pos.left, top: pos.top},
            end: {left: pos.left + node.clientWidth, top: pos.top + node.clientHeight}
        };
        var str = tag == 1 ? "left" : "top";
        min = viewScope.start[str];
        max = viewScope.end[str];
        return (value >= min && value <= max);
    }

    function overFlow(node, obj1) {
        var result = 0;
        var isX1In = valueInViewScope(node, obj1.start.left, 1);
        var isX2In = valueInViewScope(node, obj1.end.left, 1);
        var isY1In = valueInViewScope(node, obj1.start.top, 0);
        var isY2In = valueInViewScope(node, obj1.end.top, 0);
        if ((isX1In != isX2In) && (isY1In != isY2In)) {
            if (isX1In && isY2In) {
                result = 1;
            } else if (isX1In && isY1In) {
                result = 2;
            } else if (isX2In && isY2In) {
                result = 3;
            } else {
                result = 4;
            }
        } else if ((isX1In == isX2In)) {
            if (!isY1In && isY2In) {
                result = 5;
            } else if (!isY2In && isY1In) {
                result = 6;
            }

        } else if (isY1In == isY2In) {
            if (!isX1In && isX2In) {
                result = 7;
            } else if (isX1In && !isX2In) {
                result = 8;
            }
        } else if (isY1In == isY2In == isX1In == isX2In) {
            result = 9;
        }
        return result;
    }

    function resetImage(evt) {
        if (this.currentScale == 1) return;
        var node = this.zoomNode, left, top, trans, w, h, pos, start, end, parent, flowTag;
        trans = getComputedTranslate(node);
        parent = node.parentNode;
        w = node.clientWidth * trans.scaleX;
        h = node.clientHeight * trans.scaleX;
        pos = getPosition(node);
        start = {
            left: (1 - trans.scaleX) * trans.offsetX + pos.left + trans.translateX,
            top:  (1 - trans.scaleX) * trans.offsetY + pos.top + trans.translateY
        };
        end = {
            left: start.left + w,
            top:  start.top + h
        };
        left = start.left;
        top = start.top;

        flowTag = overFlow(parent, {start: start, end: end});
        switch (flowTag) {
            case 1:
                left = viewScope.start.left;
                top = viewScope.end.top - h;
                break;
            case 2:
                left = viewScope.start.left;
                top = viewScope.start.top;
                break;
            case 3:
                left = viewScope.end.left - w;
                top = viewScope.end.top - h;
                break;
            case 4:
                left = viewScope.end.left - w;
                top = viewScope.start.top;
                break;
            case 5:
                top = viewScope.end.top - h;
                break;
            case 6:
                top = viewScope.start.top;
                break;
            case 7:
                left = viewScope.end.left - w;
                break;
            case 8:
                left = viewScope.start.left;
                break;
        }
        if (w < parent.clientWidth) {
            left = pos.left - (trans.scaleX - 1) * node.clientWidth / 2;
        }
        if (h < parent.clientHeight) {
            top = pos.top - (trans.scaleX - 1) * node.clientHeight / 2;
        }
        node.style.webkitTransitionDuration = "100ms";
        node.style.webkitTransform = generateTranslate(trans.translateX + left - start.left, trans.translateY + top - start.top, 0, trans.scaleX);

    }

    iSlider.prototype.extend({
        _initZoom: initZoom,
        _scaleImage: scaleImage,
        _moveImage: moveImage,
        _resetImage: resetImage,
        _handleDoubleTap: handleDoubleTap,
        _moveHandler: moveHandler,
        _endHandler: endHandler,
        _startHandler: startHandler
    });
});