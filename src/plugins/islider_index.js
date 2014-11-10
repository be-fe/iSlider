iSlider.prototype.extend({
    renderIndex: function(indexOpts){
        if (this.type != 'dom') {
            var indexOpts = indexOpts || {};
            var data = this.data;
            var len = data.length;
            var wrap = this.wrap;
            var pointList = [];

            var indexLayer = document.createElement('ul');
            indexLayer.style.margin = 0;
            indexLayer.style.width = '60%';
            indexLayer.style.left = '50%';
            indexLayer.style.height = '10%';
            indexLayer.style.textAlign = 'center';
            indexLayer.style.position = 'absolute';
            indexLayer.style.bottom = 0;
            indexLayer.style.marginLeft = '-30%';
            indexLayer.style.zIndex = '1000000';

            wrap.appendChild(indexLayer); 

            for (i = 0; i < len; i++){
                var point = document.createElement('li');


                point.style.height = '10px';
                point.style.width = '10px';
                point.style.borderRadius = '50%';
                point.style.border = '1px solid #fff';
                point.style.display = 'inline-block';
                point.style.position = 'relative';
                point.style.margin = '5px';

                pointList.push(point);

                if (i == 0) {
                    point.style.backgroundColor = 'white';
                }

                indexLayer.appendChild(point);

            }

            this.pointList = pointList;
        }
    },

    changeIndex: function(){
        var idx = this.sliderIndex;
        var data = this.data;
        var len = data.length;
        var pointList = this.pointList;

        for (i = 0; i < len; i++){
            pointList[i].style.backgroundColor = '';
            if (i == idx) {
                pointList[i].style.backgroundColor = 'white';
            }
        } 

    }

})