# iSlider

#### [iSlider English Official Page](http://be-fe.github.io/iSlider/index_en.html)
#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider 中文官网](http://be-fe.github.io/iSlider/index.html)
#### [iSlider Example](http://be-fe.github.io/iSlider/demo/)

iSlider是一个表现出众，无任何插件依赖的手机平台JavaScript的滑动组件。

它能够处理大多数的滑动场景，例如图片或者DOM元素。

目前支持以下特性：

- 优秀的性能，更少的内存占用;
- 丰富的动画效果，并可自行扩展;
- 自动播放，循环播放，水平/垂直滑动等众多参数功能皆可配置;
- 可以按需加载需要的功能;
- 多种可设置的回调方法;

## 移动端展示

![](qrcode.png)

Demo [http://be-fe.github.io/iSlider/index.html](http://be-fe.github.io/iSlider/index.html)

## 获取 iSlider
- 直接在Github网站进行下载
- 如果使用bower进行包管理，可以使用 `bower install iSlider`进行安装.
- 可以使用 `npm install islider.js`

## 开始使用 iSlider

使用iSlider最简单的办法是查阅我们提供的简易例子，大代码存放在demo文件夹的文件里面。

- 创建一個容器
    
``` html
<div id="iSlider-wrapper"></div>
```

- 准备一些数据

``` javascript
var data = [
    {content: "imgs/1.jpg"},
    {content: "imgs/2.jpg"},
    {content: "imgs/3.jpg"}
];
```

- 初始化一个iSlider

``` javascript
var islider = new iSlider({
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

如果你想加入更多效果，可以在初始化时配置参数

``` javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    isVertical: true,
    isLooping: false,
    isDebug: true,
    isAutoplay: false,
    animateType: 'rotate'
});
```

That's it!

## 定制您的 iSlider

从2.X版本开始，iSlider将不再需要指定数据的类型“type”，而变化为更加智能的识别方式，您可以在列表中设置多种类型的数据，如图片、HTML、node或fragment

``` javascript
var data = [{
    'content' : '<div><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},{
    'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
},{
    'content' : '<div><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
}];
```

一些进阶功能可以参考[WIKI](https://github.com/BE-FE/iSlider/wiki/Notices)

### 下面是iSlider详细的选项配置列表

<table>
<thead>
    <tr>
        <td>选项</td>
        <td>类型</td>
        <td>说明</td>
    </tr>
</thead>
<tbody>
    <tr>
        <td>dom*</td>
        <td>{HTML Element}</td>
        <td>容器节点</td>
    </tr>
    <tr>
        <td>data*</td>
        <td>{array}</td>
        <td>数据列表:
        <pre>
[{
    content:'{url|HTML string|element|fragment}',
}, ...]
        </pre>
        </td>
    </tr>
    <tr>
        <td>type</td>
        <td>{string}</td>
        <td>设置为'pic'将开启全局图图片预加载功能，默认:null(不开启)</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>{number}</td>
        <td>单位:毫秒，在自动播放模式中，设置每个场景的停留时间</td>
    </tr>
    <tr>
        <td>animateType</td>
        <td>{string}</td>
        <td>动画效果，目前支持默认default, rotate, depth, flow, flip and card</td>
    </tr>
    <tr>
        <td>animateTime</td>
        <td>{number}</td>
        <td>单位:毫秒，动画效果持续时间</td>
    </tr>
    <tr>
        <td>animateEasing</td>
        <td>{string}</td>
        <td>动画效果曲线，支持linear, ease, ease-in, ease-out, ease-in-out以及自定义的cubic-bezier曲线</td>
    </tr>
    <caption>事件</caption>
    <tr>
        <td>onslide</td>
        <td>{function}</td>
        <td>手指滑动时的回调函数</td>
    </tr>
    <tr>
        <td>onslidestart</td>
        <td>{function}</td>
        <td>手指触屏时的回调函数</td>
    </tr>
    <tr>
        <td>onslideend</td>
        <td>{function}</td>
        <td>手指离开屏幕时的回调函数</td>
    </tr>
    <tr>
        <td>onslidechange</td>
        <td>{function}</td>
        <td>当场景发生改变时触发的回调函数</td>
    </tr>
    <tr>
        <td>onslidechanged</td>
        <td>{function}</td>
        <td>当场景改变完成(动画完成)时触发的回调函数</td>
    </tr>
    <tr>
        <td>onsliderestore</td>
        <td>{function}</td>
        <td>当场景未发生变化时触发的回调函数</td>
    </tr>
    <tr>
        <td>onsliderestored</td>
        <td>{function}</td>
        <td>当场景未发生变化完成(回弹动画完成)时触发的回调函数</td>
    </tr>
    <tr>
        <td>isDebug</td>
        <td>{boolean}</td>
        <td>开启/关闭调试模式，会打印更多日志信息，默认:false(关闭)</td>
    </tr>
    <tr>
        <td>isLooping</td>
        <td>{boolean}</td>
        <td>开启/关闭循环模式，默认:false(关闭)</td>
    </tr>
    <tr>
        <td>isAutoplay</td>
        <td>{boolean}</td>
        <td>开启/关闭自动滑动模式，默认:false(关闭)</td>
    </tr>
    <tr>
        <td>isVertical</td>
        <td>{boolean}</td>
        <td>开启水平/垂直滑动模式，默认:false(关闭)</td>
    </tr>
    <tr>
        <td>isOverspread</td>
        <td>{boolean}</td>
        <td>如果场景为图片模式，是否平铺整个浏览器屏幕(CSS3背景)，默认:false(关闭)</td>
    </tr>
    <tr>
        <td>initIndex</td>
        <td>{number}</td>
        <td>默认首屏所使用的数据列表索引</td>
    </tr>
    <tr>
        <td>plugins</td>
        <td>{array}</td>
        <td>启用插件，可为插件名称列表：
        <pre>
['dot', 'button', 'zoompic', ...]
        </pre>
        当然，还可以这样写，支持传入更多的插件初始化参数
        <pre>
[..., ['zoompic', {zoomFactor: 2}], ...]
        </pre>
        </td>
    </tr>
</tbody>
</table>

## 联系我们
对iSlider的使用有任何问题,或者发现bug,欢迎给我们反馈：
[提交反馈](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
