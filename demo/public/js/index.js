(function () {
    var t = document.getElementById("js-toggle-menu");

    t.addEventListener('click', function (e) {
        // e.stopPropagation();
        // document.body.className = -1 !== document.body.className.indexOf("open-menu") ? "closed-menu": "open-menu";
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

        $('.hamburger-menu').click(function (e) {
            e.stopPropagation();
            document.body.className = -1 !== document.body.className.indexOf("open-menu") ? "closed-menu": "open-menu";
        });

        var str = '';
        $("#functions h4").each(function(index, element) {
            str += '<li><a class="item" href="#'+element.innerText+'">'+element.innerText+'</a></li>'
        }); 
        $("#function-tree").html(str);

        str = '';
        $(".options-content h4").each(function(index, element) {
            str += '<li><a class="item" href="#'+element.innerText+'">'+element.innerText+'</a></li>'
        }); 
        $("#options-param-tree").html(str);

        str = '';
        $("#method-static h4").each(function(index, element) {
            str += '<li><a class="item" href="#'+element.innerText+'">'+element.innerText+'</a></li>'
        }); 
        $("#method-static-tree").html(str);

        str = '';
        $("#method-example h4").each(function(index, element) {
            str += '<li><a class="item" href="#'+element.innerText+'">'+element.innerText+'</a></li>'
        }); 
        $("#method-example-tree").html(str);

        $(".tree").each(function(index, element) { 
            if($(this).next(".node").length>0){ 
                $(this).addClass("ceng_close"); 
            } 
        });

        $('.item').click(function (e) {
            document.body.className = -1 !== document.body.className.indexOf("open-menu") ? "closed-menu": "open-menu";
        });

        $(".tree").click(function(e){ 
            var ul = $(this).next(".node");
            if (ul.css("display")=="none"){ 
                ul.slideDown(); 
                $(this).addClass("ceng_open"); 
                ul.find(".ceng_close").removeClass("ceng_open"); 
            }
            else { 
                ul.slideUp(); 
                $(this).removeClass("ceng_open"); 
                ul.find(".node").slideUp(); 
                ul.find(".ceng_close").removeClass("ceng_open"); 
            } 
        }); 
    });

})();