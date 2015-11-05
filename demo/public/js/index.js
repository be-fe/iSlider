(function ($) {

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
    });

})(jQuery);