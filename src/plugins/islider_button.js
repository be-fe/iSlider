define( ['iSlider'], function(iSlider){
    iSlider.prototype.extend({
        addBtn: function() {
            if (!this.isVertical) {
                var btnOuter = [];
                var btnInner = [];
                var self = this;
                for (var i = 0; i < 2; i++) {
                    btnOuter[i] = document.createElement('div'); 
                    btnOuter[i].className = 'islider-btn-outer';
                    btnInner[i] = document.createElement('div');
                    btnInner[i].className = 'islider-btn-inner';

                    if (i === 0) {
                        btnOuter[i].className += ' left';
                        btnOuter[i].dir = -1;
                    } else {
                        btnOuter[i].className += ' right';
                        btnOuter[i].dir = 1
                    }
                    
                    btnOuter[i].addEventListener('click', function() {
                        var dir = parseInt(this.getAttribute('dir'));
                        self.slideTo(self.slideIndex + dir);
                    })

                    if (!this.isLooping) {
                        if (this.slideIndex === 0) {
                            btnOuter[0].style.display = 'none';
                        }
                    }

                    btnOuter[i].appendChild(btnInner[i]);
                    this.wrap.appendChild(btnOuter[i], this.wrap.nextSibling);
                }
            }
        }
    })
})