var $toggleBox = document.getElementById('toggle-box');
var iframes = document.getElementById('demos').getElementsByTagName('iframe');
var $showCode = document.getElementById('demo-code');
var hljs = window.hljs;

iframes[0].onload = function () {
    setShowCode(iframes[0]);
};
// 确保第一个实例的代码被展示
setTimeout(function () {
    if (!$showCode.textContent) {
        setShowCode(iframes[0]);
    }
}, 2000);

$toggleBox.addEventListener('click', function(evnet) {
    var target = event.target;
    var id = target.getAttribute('data-target');
    var iframe = document.getElementById(id);
    var len = iframes.length - 1;

    if (id) {
        for (;len >= 0; len--) {
            iframes[len].hidden = true;
        }
        iframe.style.opacity = 0;
        iframe.hidden = false;
        setTimeout(function () {
            iframe.style.opacity = 1;
        }, 100);

        // $showCode.textContent = window.frames[1].document.getElementById('show-code').innerHTML;
        setShowCode(iframe);
    }
});

function setShowCode (iframe) {
    $showCode.textContent = iframe.contentDocument.getElementById('show-code').innerHTML;
    hljs.highlightBlock($showCode);
}