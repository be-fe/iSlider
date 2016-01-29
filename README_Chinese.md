# iSlider

![](http://be-fe.github.io/iSlider/thumbnails/iSlider-logo.png)

#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider DEMO](http://be-fe.github.io/iSlider/demo/index.html)
#### [iSlider 中文文档](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
#### [iSlider 演示](http://be-fe.github.io/iSlider/demo/index_chinese.html)
#### [iSlider 动画效果](http://be-fe.github.io/iSlider/demo/animation.html)

iSlider是一个轻量且高性能，无任何库依赖的跨平台滑动控件。

它能够处理大多数的滑动场景，提供多种切换动画效果，展示多种类型的场景。

目前具有以下特性：

- 优秀的性能，更少的内存占用;
- 丰富的动画效果，可自行扩展;
- 自动播放，循环播放，水平/垂直滑动等众多参数功能皆可配置;
- 可以按需加载需要的功能;
- 多种可设置的回调方法;

## 移动端展示

![](http://be-fe.github.io/iSlider/thumbnails/qrcode.png)

Demo [http://be-fe.github.io/iSlider/index.html](http://be-fe.github.io/iSlider/index.html)

## 获取 iSlider
- 直接在Github网站进行下载
- 如果使用bower进行包管理，可以使用 `bower install iSlider`进行安装.
- 可以使用 `npm install islider.js`

## 开始使用 iSlider

使用iSlider最简单的办法是查阅我们提供的简易例子，请浏览demo文件夹中的内容。

#### 创建一個容器
    
``` html
<div id="iSlider-wrapper"></div>
```

#### 准备一些数据

``` javascript
var data = [
    {content: "imgs/1.jpg"},
    {content: "imgs/2.jpg"},
    {content: "imgs/3.jpg"}
];
```

#### 载入iSlider

``` html
<script src="iSlider.min.js"></script>
```

#### 初始化一个iSlider

``` javascript
var islider = new iSlider(document.getElementById('iSlider-wrapper'), data);
```

也可以

``` javascript
var islider = new iSlider({
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

``` javascript
var islider = new iSlider(document.getElementById('iSlider-wrapper'), data, {
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

***配置对象属性的优先级高于参数***

### iSlider 扩展

#### 动画效果

**如果您想加入更多效果，可以载入效果扩展库，并在初始化时配置参数，指定animateType**

``` html
<script src="iSlider.min.js"></script>
<script src="iSlider.animate.min.js"></script>
```

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

#### 插件

从2.X版本开始，iSlider加入插件注册机制，可以帮助您扩展自己需要的功能

``` html
<script src="iSlider.min.js"></script>
<script src="iSlider.plugin.dot.min.js"></script>
```

``` javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    plugins: ['dot'],
});
```

当然还可以为插件的初始化传递更多的自定义参数

``` javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    plugins: [['dot', {background:'rgba(0,0,0,0)'}]],
});
```


That's it!

## 定制您的 iSlider

从2.X版本开始，iSlider将不再需要指定数据的类型“type”，而变化为更加智能的识别方式，您可以在列表中设置多种类型的数据，如图片、HTML、element或fragment

``` javascript
var data = [{
    'content' : './qrcode.png'  // 图片
},{
    'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>' // HTML
},{
    'content' : (function () { // element
            var dom = document.createElement('div');
            dom.innerHTML = 'Element';
            return dom;
        })()
},{
    'content' : (function () { // fragment
            var frag = document.createDocumentFragment();
            var dom = document.createElement('div');
            dom.innerHTML = 'Fragment';
            frag.appendChild(dom);
            return frag;
        })()
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
        <td colspan="3">
            必要的
        </td>
    </tr>
    <tr>
        <td>dom</td>
        <td>{HTML Element}</td>
        <td>容器节点</td>
    </tr>
    <tr>
        <td>data</td>
        <td>{Array}</td>
        <td>
            数据列表:
            <br>
            [{
                content:'{url|HTML string|element|fragment}',
            },
            ...]
        </td>
    </tr>
    <tr>
        <td colspan="3">
            配置项
        </td>
    </tr>
    <tr>
        <td>type (已废弃)</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>{Number}</td>
        <td>单位:毫秒，在自动播放模式中，设置每个场景的停留时间</td>
    </tr>
    <tr>
        <td>animateType</td>
        <td>{String}</td>
        <td>动画效果，目前支持默认default, rotate, depth, flow, flip and card</td>
    </tr>
    <tr>
        <td>animateTime</td>
        <td>{Number}</td>
        <td>单位:毫秒，动画效果持续时间</td>
    </tr>
    <tr>
        <td>animateEasing</td>
        <td>{String}</td>
        <td>动画效果曲线，支持linear, ease, ease-in, ease-out, ease-in-out以及自定义的cubic-bezier曲线</td>
    </tr>
    <tr>
        <td>isDebug</td>
        <td>{Boolean}</td>
        <td>开启/关闭调试模式，会打印更多日志信息，默认:false (关闭)</td>
    </tr>
    <tr>
        <td>isLooping</td>
        <td>{Boolean}</td>
        <td>开启/关闭循环模式，默认:false (关闭)</td>
    </tr>
    <tr>
        <td>isAutoplay</td>
        <td>{Boolean}</td>
        <td>开启/关闭自动滑动模式，默认:false (关闭)</td>
    </tr>
    <tr>
        <td>isVertical</td>
        <td>{Boolean}</td>
        <td>开启水平/垂直滑动模式，默认:false (关闭)</td>
    </tr>
    <tr>
        <td>isOverspread</td>
        <td>{Boolean}</td>
        <td>如果场景为图片模式，是否平铺整个浏览器屏幕(CSS3背景)，默认:false (关闭)</td>
    </tr>
    <tr>
        <td>isTouchable</td>
        <td>{Boolean}</td>
        <td>开启/关闭触屏事件. 默认: true (开启)</td>
    </tr>
    <tr>
        <td>initIndex</td>
        <td>{Number}</td>
        <td>默认首屏所使用的数据列表索引</td>
    </tr>
    <tr>
        <td>fixPage</td>
        <td>{Boolean}</td>
        <td>是否禁用垂直滚动和回弹效果，默认:true (开启)</td>
    </tr>
    <tr>
        <td>fillSeam</td>
        <td>{Boolean}</td>
        <td>填补场景间的接缝. Default: false (关闭)</td>
    </tr>
    <tr>
        <td>plugins</td>
        <td>{Array}</td>
        <td>
            启用插件，可为插件名称列表：
            <pre>['dot', 'button', 'zoompic', ...]</pre>
            当然，还可以这样写，支持传入更多的插件初始化参数
            <pre>[..., ['zoompic', {zoomFactor: 2}], ...]</pre>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            事件
        </td>
    </tr>
    <tr>
        <td>initialize</td>
        <td>{Function}</td>
        <td>开始初始化时的回调函数（在调用setting后，渲染之前）</td>
    </tr>
    <tr>
        <td>initialized</td>
        <td>{Function}</td>
        <td>完成初始化时的回调函数（渲染之后）</td>
    </tr>
    <tr>
        <td>onslide</td>
        <td>{Function}</td>
        <td>手指滑动时的回调函数</td>
    </tr>
    <tr>
        <td>onslidestart</td>
        <td>{Function}</td>
        <td>手指触屏时的回调函数</td>
    </tr>
    <tr>
        <td>onslideend</td>
        <td>{Function}</td>
        <td>手指离开屏幕时的回调函数</td>
    </tr>
    <tr>
        <td>onslidechange</td>
        <td>{Function}</td>
        <td>当场景发生改变时触发的回调函数</td>
    </tr>
    <tr>
        <td>onslidechanged</td>
        <td>{Function}</td>
        <td>当场景改变完成(动画完成)时触发的回调函数</td>
    </tr>
    <tr>
        <td>onsliderestore</td>
        <td>{Function}</td>
        <td>当场景未发生变化时触发的回调函数</td>
    </tr>
    <tr>
        <td>onsliderestored</td>
        <td>{Function}</td>
        <td>当场景未发生变化完成(回弹动画完成)时触发的回调函数</td>
    </tr>
</tbody>
</table>

## iSlider更多功能

<table>
<thead>
    <tr>
        <td>方法</td>
        <td>参数</td>
        <td>说明</td>
    </tr>
</thead>
<tbody>
    <tr>
        <td colspan="3">
            静态方法
        </td>
    </tr>
    <tr>
        <td>
            extend
        </td>
        <td>
            [{Object} 原对象(可选)]
            <br>
            {Object} 新对象
        </td>
        <td>
            当参数长度为1时，将参数对象继承到iSlider.prototype
            <br>
            当参数长度为2时，将第二个对象继承到第一个
        </td>
    </tr>
    <tr>
        <td>
            regPlugin
        </td>
        <td>
            {String} 插件名称
            <br>
            {Function} 插件初始化方法
        </td>
        <td>
            注册插件
        </td>
    </tr>
    <tr>
        <td colspan="3">
            实例方法
        </td>
    </tr>
    <tr>
        <td>
            slideTo
        </td>
        <td>
            {Number} 数据列表索引
            <br>
            [{Object} 临时配置(可选)]
        </td>
        <td>
            滚动到第n个场景，可以在第二个参数设置配置信息，改变本次滑动的动画效果: animateTime animateType
        </td>
    </tr>
    <tr>
        <td>
            slideNext
        </td>
        <td>
            [{Object} 临时配置(可选)]
        </td>
        <td>
            滚动到后一场景，可以设置配置信息，改变本次滑动的动画效果: animateTime animateType
        </td>
    </tr>
    <tr>
        <td>
            slidePrev
        </td>
        <td>
            [{Object} 临时配置(可选)]
        </td>
        <td>
            滚动到前一场景，可以设置配置信息，改变本次滑动的动画效果: animateTime animateType
        </td>
    </tr>
    <tr>
        <td>
            delegate
        </td>
        <td>
            {String} 事件名称
            <br>
            {String} 选择器 (querySelectorAll)
            <br>
            {Function} 事件响应方法
        </td>
        <td>
            在容器node上绑定代理事件
        </td>
    </tr>
    <tr>
        <td>
            bind
        </td>
        <td></td>
        <td>
            delegate 的别名
        </td>
    </tr>
    <tr>
        <td>
            unDelegate
        </td>
        <td>
            {String} 事件名称
            <br>
            {String} 选择器 (querySelectorAll)
            <br>
            {Function} 事件响应方法
        </td>
        <td>
            解绑事件句柄
        </td>
    </tr>
    <tr>
        <td>
            unbind
        </td>
        <td></td>
        <td>
            unDelegate的别名
        </td>
    </tr>
    <tr>
        <td>
            on
        </td>
        <td>
            {String} 事件
            <br>
            {Function} 回掉方法
        </td>
        <td>
            在iSlider的事件中注册回掉方法
            <br>
            <ul>
                <li>
                    initialize
                </li>
                <li>
                    initialized
                </li>
                <li>
                    slide
                </li>
                <li>
                    slideStart
                </li>
                <li>
                    slideEnd
                </li>
                <li>
                    slideChange
                </li>
                <li>
                    slideChanged
                </li>
                <li>
                    slideRestore
                </li>
                <li>
                    slideRestored
                </li>
                <li>
                    reloadData
                </li>
                <li>
                    destroy
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            off
        </td>
        <td>
            {String} 事件
            <br>
            {Function} 回掉方法
        </td>
        <td>
            从iSlider的事件中移除回掉方法
        </td>
    </tr>
    <tr>
        <td>
            fire
        </td>
        <td>
            随相应事件变化
        </td>
        <td>
            出发某个事件
        </td>
    </tr>
    <tr>
        <td>
            play
        </td>
        <td></td>
        <td>
            开始自动切换（必须在自动播放模式中）
        </td>
    </tr>
    <tr>
        <td>
            pause
        </td>
        <td></td>
        <td>
            暂停自动切换（必须在自动播放模式中）
        </td>
    </tr>
    <tr>
        <td>
            extend
        </td>
        <td></td>
        <td>
            同iSlider.extend
        </td>
    </tr>
    <tr>
        <td>
            regPlugin
        </td>
        <td></td>
        <td>
            同iSlider.regPlugin，注册的同时会自动加入激活的插件列表中，并自动执行初始化
        </td>
    </tr>
    <tr>
        <td>
            loadData
        </td>
        <td>
            {Array} 数据列表
        </td>
        <td>
            载入数据列表
        </td>
    </tr>
    <tr>
        <td>
            hold
        </td>
        <td></td>
        <td>
            当前场景禁止手势
        </td>
    </tr>
    <tr>
        <td>
            unhold
        </td>
        <td></td>
        <td>
            当前场景开启手势，同时解除锁定
        </td>
    </tr>
    <tr>
        <td>
            lock
        </td>
        <td></td>
        <td>
            锁定当前场景，禁用sliceTo, slideNext, slidePrev方法，同时禁止手势
        </td>
    </tr>
    <tr>
        <td>
            unlock
        </td>
        <td></td>
        <td>
            解除锁定
        </td>
    </tr>
    <tr>
        <td>
            destroy
        </td>
        <td></td>
        <td>
            销毁当前iSlider实例，内存释放
        </td>
    </tr>
    <tr>
        <td>
            reset
        </td>
        <td></td>
        <td>
            复位当前iSlider实例
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
