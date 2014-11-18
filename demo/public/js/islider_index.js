iSlider.prototype.extend({
    renderIndex: function(indexOpts) {
        
        this.indexOpts = indexOpts || {};
        var pointMenuOpt = this.indexOpts.pointMenu || {};
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
        }
            
        indexLayer.style.position = 'absolute';
        indexLayer.style.left = pointMenuOpt.left || '0';
        indexLayer.style.right = pointMenuOpt.right || '0';
        indexLayer.style.top = pointMenuOpt.top || '0';
        indexLayer.style.bottom = pointMenuOpt.bottom || '0';
        
        indexLayer.style.zIndex = '10000';

        var node = wrap.parentNode.insertBefore(indexLayer, wrap.nextSibling);
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
                
            }
            else {
                point.style.display = 'inline-block';
            }

            pointList.push(point);

            if (i === 0) {
                point.style.backgroundColor = pointMenuOpt.borderColor || '#fff';
            }

            var self = this;
            point.addEventListener('touchstart', function(evt) {
                self.bindTouchEvent(evt, self);
            } ,false);
            point.addEventListener('click', function(evt) {
                self.bindTouchEvent(evt, self);
            } ,false);
            fragment.appendChild(point);
        }

        indexLayer.appendChild(fragment);
        this.pointList = pointList;
    },

    changeIndex: function() {

        var pointMenuOpt = this.indexOpts.pointMenu || {};
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

    bindTouchEvent: function(evt, self) {
        
        var idx = parseInt(evt.target.id.substring(5));
        self.slideTo(idx);
    }

});
