# iSlider

#### [iSlider English Official Page](http://be-fe.github.io/iSlider/index_en.html)
#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider 中文官网](http://be-fe.github.io/iSlider/index.html)
#### [iSlider Example](http://be-fe.github.io/iSlider/demo/)

![](thumbnails/logo.png)

iSlider is a light-weight, high performance, dependency free, yet cross-platform plugin.

It can help handling most sliding effects, offering dozens of transition animation, and presenting various scenarios.

Currently, it features:

- Outstanding performance, less memory required
- Various animation effects, and capability of adding custom animations
- Easy to configure, e.g. Auto-play, looping, vertical/horizontal sliding etc.
- Ability to load features on demand
- Numbers of configurable callbacks

## Mobile demo

![](thumbnails/qrcode.png)

Demo [http://be-fe.github.io/iSlider/index.html](http://be-fe.github.io/iSlider/index.html)

## Installation

You can either:

- Download directly from Github
- Run `bower install iSlider` if bower is used
- Run `npm install islider.js` 

## Get started

The easiest way to get your hands dirty is to have a try the cases that we offer. Please refer to the folder `demo/` for more information.

#### Creating a container
    
``` html
<div id="iSlider-wrapper"></div>
```

#### Preparing some data

``` javascript
var data = [
    {content: "imgs/1.jpg"},
    {content: "imgs/2.jpg"},
    {content: "imgs/3.jpg"}
];
```

#### Loading iSlider

``` html
<script src="iSlider.min.js"></script>
```

#### Initializing a iSlider

``` javascript
var islider = new iSlider({
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

### Extending iSlider

#### Animations

**If you want more effects, you can load the animation effect extensions, set up the configuration when initializing iSlider and specify `animationType`.**
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

#### Extension

From 2.x, iSlider supports extension registration. You can now extend iSlide with your own features.

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

You can surely pass in more customed params to the extension initialize method.

``` javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    plugins: [['dot', {background:'rgba(0,0,0,0)'}]],
});
```


That's it!

## Customise your iSlider

From 2.x, iSlider no longer requires `type` to specify the data type. It can now detect wisely, so that you can easily use various types of data, e.g. images, HTML elements or fragments.

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

To learn more advanced features, please refer to [WIKI](https://github.com/BE-FE/iSlider/wiki/Notices)

### Detailed explanation of the configuration options

<table>
<thead>
    <tr>
        <td>Option</td>
        <td>Type</td>
        <td>Explanation</td>
    </tr>
</thead>
<tbody>
    <tr>
        <td colspan="3">
            Required
        </td>
    </tr>
    <tr>
        <td>dom</td>
        <td>{HTML Element}</td>
        <td>Container node</td>
    </tr>
    <tr>
        <td>data</td>
        <td>{array}</td>
        <td>
            data list:
            <br>
            [{
                content:'{url|HTML string|element|fragment}',
            },
            ...]
        </td>
    </tr>
    <tr>
        <td colspan="3">
            Options
        </td>
    </tr>
    <tr>
        <td>type</td>
        <td>{string}</td>
        <td>Setting to `pic` will enable global images preload. Default: null (disabled)</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>{number}</td>
        <td>Setting the duration of each scene during auto-play mode. Unit: millis.</td>
    </tr>
    <tr>
        <td>animateType</td>
        <td>{string}</td>
        <td>Setting the animation type. Currently it could be one of `default`, `rotate`, `depth`, `flow`, `flip` and `card`</td>
    </tr>
    <tr>
        <td>animateTime</td>
        <td>{number}</td>
        <td>Duration of the animation. Unit: millis.</td>
    </tr>
    <tr>
        <td>animateEasing</td>
        <td>{string}</td>
        <td>Animation easing function. Possible values are `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out` or customed `cubic-bezier`</td>
    </tr>
    <tr>
        <td>isDebug</td>
        <td>{boolean}</td>
        <td>If true, more logs will be output. Default: false (disabled)</td>
    </tr>
    <tr>
        <td>isLooping</td>
        <td>{boolean}</td>
        <td>Turning on/off the loop mode. Default: false (turned off)</td>
    </tr>
    <tr>
        <td>isAutoplay</td>
        <td>{boolean}</td>
        <td>Turning on/off the auto sliding mode. Default: false (turned off)</td>
    </tr>
    <tr>
        <td>isVertical</td>
        <td>{boolean}</td>
        <td>Setting vertical/horizontal sliding. Default: false (horizontal)</td>
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
            [{object} 原对象(可选)]
            <br>
            {object} 新对象
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
            {string} 插件名称
            <br>
            {function} 插件初始化方法
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
            {number} 数据列表索引
            <br>
            [{object} 临时配置(可选)]
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
            [{object} 临时配置(可选)]
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
            [{object} 临时配置(可选)]
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
            {string} 事件名称
            <br>
            {string} 选择器 (querySelectorAll)
            <br>
            {function} 事件响应方法
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
            on
        </td>
        <td>
            {string} 事件
            <br>
            {function} 回掉方法
        </td>
        <td>
            在iSlider的事件中注册回掉方法
            <br>
            <ul>
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
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            off
        </td>
        <td>
            {string} 事件
            <br>
            {function} 回掉方法
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
            {array} 数据列表
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
