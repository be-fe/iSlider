(function () {
    var t = document.getElementById("js-toggle-menu");

    t.addEventListener('click', function () {
        document.body.className = -1 !== document.body.className.indexOf("open-menu") ? "closed-menu": "open-menu";
    })
    var hljs = window.hljs;
    var demoCode = $('#demo-code');
    var toggleBox = $('#toggle-box');

    var frameSet = $('#frameset');
    frameSet.on('load', function () {
        setShowCode($(this).get(0));
    });

    toggleBox.on('click', 'button', function () {
        var el = $(this);
        toggleBox.find('.active').removeClass('active');
        el.addClass('active');
        frameSet.attr('src', el.data('target'));
    });

    function setShowCode(iframe) {
        demoCode.text(iframe.contentDocument.getElementById('show-code').innerHTML);
        hljs.highlightBlock(demoCode.get(0));
    }

    $(document).ready(function () {
        setShowCode(frameSet.get(0));
        $('.mobile-menu').click(function (e) {
            e.stopPropagation();
            $('.guide').addClass('open');
        });
        $(document).bind('click',function(){
            $('.guide').removeClass('open');
        });
    });

})();