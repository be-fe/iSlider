var MSlider = require('./MSlider');
var list = [{
    height: 300,
    width: 400,
    content: "imgs/1.jpg",
},
{
    height: 300,
    width: 400,
    content: "imgs/2.jpg",
},];
// {
//     height: 300,
//     width: 400,
//     content: "imgs/3.jpg",
// },
// {
//     height: 300,
//     width: 400,
//     content: "imgs/4.jpg",
// }];
new MSlider({
    imgPrefix: "imgs/",
    imgSubfix: ".jpg",
    layerContent: false,
    //or true default false
    //autoPlay: true,
    //or false default false
    verticle: false,
    loop: true,
    //or true default false
    dom: document.getElementById("canvas"),
    data: list,
    onBeforeSlide: function (nowIndex, dataArr) {

    },
    onAfterSlide: function (nowIndex, dataArr) {

    },
});