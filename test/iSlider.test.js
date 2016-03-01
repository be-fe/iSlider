describe('iSlider-create', function () {
    var DATA = [];
    for (var i = 0; i < 7; i++) {
        DATA.push({
            content: '//be-fe.github.io/static/images/saber/' + i + '.jpg'
        });
    }

    var anims = iSlider._animateFuncs;
    for (var type in anims) {
        if (anims.hasOwnProperty(type)) {
            var container = document.createElement('div');
            document.body.appendChild(container);
            new iSlider(container, DATA, {
                animateType: type,
                isLooping: 1,
                isOverspread: 1,
                isAutoplay: 1,
                animateTime: 2000,
                duration: 2000,
                plugins: [
                    ['dot', {locate: 'relative'}],
                    'button',
                    ['zoompic', {zoomFactor: 2}],
                    ['BIZone', {'size': 20}]
                ]
            });
        }
    }
});