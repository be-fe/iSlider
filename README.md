# iSlider

iSlider is an outstanding performance, lightweight, high-performance, no library dependencies cross-platform slide controller. It can help handling most sliding effects, offering dozens of transition animation, and presenting various scenarios.

![](http://be-fe.github.io/iSlider/thumbnails/iSlider-logo.png)

#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider DEMO](http://be-fe.github.io/iSlider/demo/index.html)
#### [iSlider 中文文档](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
#### [iSlider 演示](http://be-fe.github.io/iSlider/demo/index_chinese.html)
#### [iSlider animation](http://be-fe.github.io/iSlider/demo/animation.html)

## Features

- Outstanding performance, less memory required;
- Various animation effects, including effects comes default, rotate, depth, flow, flip, card, fade, etc., and capability of adding custom animations;
- Provide rich callback trigger, add the callback function is extremely convenient, regardless of initialization or during operation;
- Easy to configure, e.g. Slide the dampening effect of the cycle, automatic sliding effect, horizontal / vertical sliding, etc.
- Automatic matching the desktop mouse movements or gestures mobile device, cross-platform easy to use;
- Support for image pre-loaded, excellent user experience;
- \ [Plugin \] Offers a variety of plug-ins, such as a toggle button, the scene indicator, image scaling, etc., to provide plug-in registration, management and other methods to facilitate custom extension;
- \ [2.0+ \] Can be loaded on demand function (effect or plug-in) required;
- \ [2.0+ \] Support more kinds of elements placed automatically match the data type, image recognition and pre-loaded;
- \ [2.0+ \] Better delegated event management mechanism, optimize memory usage;
- \ [2.0+ \] Richer callback events, event management more flexible trigger mechanisms;

## Mobile demo

![](http://be-fe.github.io/iSlider/thumbnails/qrcode.png)

Demo [http://be-fe.github.io/iSlider/index.html](http://be-fe.github.io/iSlider/index.html)

## Get iSlider

#### Clone from Github

```bash
git clone https://github.com/be-fe/iSlider.git
```

#### Use bower installation

```bash
bower install iSlider
```

## Use npm installation

```bash
npm install islider.js
```

## Started iSlider

Use Slider easiest way is to consult our examples, please visit the [DEMO](https://github.com/be-fe/iSlider/tree/master/demo) folder content.

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
var islider = new iSlider(document.getElementById('iSlider-wrapper'), data);
```

you can also

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

### Extending iSlider

#### Animations

**If you want more effects, you can load the animation effect extensions, set up the configuration when initializing iSlider and specify `animationType`.**

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

#### Official Plugins

##### Button

Scene toggle button. Switch to the front (upper) or after (below) a scene.

##### Dot

Scene indicator, the current location and switch to a scene function

##### Zoompic

Mobile image scaling, image in non-background mode by double-clicking on the image or two fingers to enlarge, to amplify the effect of the preview.

- Known issues: must restore the default size by double-clicking, double that currently can not be reduced to its default state

##### BIZone

Touch points from the edge of the area to identify, although has joined edge processing mouseout and touchcancel, but for some applications, the definition from the top (bottom) menu bar remains powerless. Meaning that it can take the initiative to identify areas of these regions is set to touch on detachment.

## Scene data

From 2.x, iSlider no longer requires `type` to specify the data type. It can now detect wisely, so that you can easily use various types of data, e.g. images, HTML elements, fragments or selectors.

``` javascript
var data = [{
    'content' : './qrcode.png'  // picture
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
}{
      'content' : document.getElementById('node') // selectors
}];
```

To learn more advanced features, please refer to [WIKI](https://github.com/BE-FE/iSlider/wiki/Notices)

## iSlider details

### Configuration parameters

#### DOM

- new iSlider(```DOM```, DATA, OPTIONS);
- `{HTMLElement}`
- Container dom node
- As the first parameter is not required, it will be overwritten OPTIONS.dom, but it is necessary, it can make you more convenient to use iSlider.

#### DATA

- new iSlider(DOM, ```DATA```, OPTIONS);
- `{Array}`
- Datasheets
- As the second parameter is not required, it will be overwritten OPTIONS.data, but it is necessary, it can make you more convenient to use iSlider. Allowed types URLString, HTMLString, HTMLElement, HTMLFragment.
- * TODO: currently a member of the type `{Object}`, which only supports content property in the future will get more extensions, such as the configuration of each scene transitions, waiting time, etc. *
- Data format:

```javascript
[
    {
        content:'{URLString|HTMLString|HTMLElement|HTMLFragment}',
    },
    ...
]
```

#### OPTIONS

- new iSlider(DOM, DATA, ```OPTIONS```);
- `{Object}`


##### dom

- `{HTMLElement}`
- Container dom node, with the role of the parameter [DOM] (#dom), if this setting, DOM will be overwritten.


##### data

- `{Array}`
- A list of data, with the role of the parameter [DATA] (#data), if this setting, DATA will be overwritten.


##### animateType

- `{String}`
- Animation
- Currently supports: default (scrolling), rotate (rotation), depth, flow, flip, card, fade (fade in / hidden), (outside / inside zoom) zoomout
- Precondition: Loading Effects library iSlider.animate(.min).js
- Default: "default"


##### animateTime

- `{Number}`
- Animation duration
- Unit: ms
- Default: 1000


##### animateEasing

- `{String}`
- Animation curve
- Optional linear, ease, ease-in, ease-out, ease-in-out, even cubic-bezier
- Default: ease


##### isAutoplay

- `{Boolean}`
- Turn on / off the automatic sliding mode
- Default: false (Disabled)


##### duration

- `{Number}`
- Automatic playback scene dwell time
- Residence time of each scene, it switches to the next scene at the end of
- Unit: ms
- Precondition: isAutoplay === ```TRUE```


##### isLooping

- `{Boolean}`
- Repeat Mode
- Default: false (Disabled)


##### isVertical

- `{Boolean}`
- Vertical sliding mode
- Default: false (Disabled)


##### isOverspread

- `{Boolean}`
- Background Tile
- If the scene is picture mode (URL), use the CSS3 backgrounds populate scenes
- Default: false (Disabled)


##### isTouchable

- `{Boolean}`
- Touch events
- Default: true (Enabled)


##### isDebug

- `{Boolean}`
- On / off debug mode, the log will print more information
- Default: false (Disabled)


##### initIndex

- `{Number}`
- Fold data used list index
- Default: 0


##### fixPage

- `{Boolean}`
- Native event stop
- In the original scene shield trigger event, such as: scroll, drag, zoom, etc.
    - "A" elements to prevent the mobile terminal is recommended to use tap (touch-based event jointly judgment) custom
    - Of the form element "SELECT", "INPUT", "TEXTAREA", "BUTTON", "LABEL", under any circumstances be blocked
- Default: true (Enabled)


##### fillSeam

- `{Boolean}`
- To fill the joints between scenes
- Rendering problems on some systems browsers, resulting in a gap between scenes appear, in this case the scene and set the background color to use when connected ** ** switching effect is particularly evident.
- Default: false (Disabled)


##### plugins

- `{Array}`
- Enable plug-ins and configure the initialization parameters
- A list of names incoming To activate plugins: ```['dot', 'button', 'zoompic', ...]```, in addition, support incoming initialization parameters: ```[..., ['zoompic', {zoomFactor: 2}], ...]```
- If the plug does not exist or is not loaded ignored


### Event callbacks

- `{Function}`
- At initialization passed, by way of example the method can also be "on" for event registration.
- As the initialization parameter needed **on** at the beginning and to all lowercase for hump naming binding.
- Due to the different callback method in which different scenes, there will be differences between the incoming parameters.

Example:

```
var S = new iSlider({..., onslidechanged: callBack, ...});
// OR
S.on('slideChanged', callBack);
```

#### initialize

- Start initialization (After the call setting, Before rendering)
- Parameters: None


#### initialized

- When initialization is complete (after rendering)
- Parameters: None


#### pluginInitialize (Not Enabled)

- (Each) widget initialization
- Parameters: None


#### pluginInitialized

- All plug-in initialization is complete
- Parameters: None


#### renderComplete

- Rendering is completed when the outer container
- Before reset, loadData will trigger
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### slideStart

- When the finger touch screen
- Parameters
    - `{Object}` Event
        
        
#### slide

- When the finger sliding
- Parameters
    - `{Object}` Event


#### slideEnd

- When the finger lifted
- Parameters
    - `{Object}` Event


#### slideChange

- `{Function}`
- When the scene changes
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements

#### slideChanged

- `{Function}`
- When the scene change is completed (the animation is complete)
- When executive loadData
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### slideRestore

- `{Function}`
- When the scene has not changed (rebound, animation is complete)
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### slideRestored

- `{Function}`
- When the scene has not changed is completed (Rebound animation is complete)
- When performing reset
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### loadData

- `{Function}`
- When data is reset (execution loadData method)
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### reset

- `{Function}`
- When the scene reset (phone screen rotate, resize)
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### destroy

- `{Function}`
- When iSlider destruction
- Parameters: None


### 静态方法

#### extend

- 当参数长度为1时，将对象继承到iSlider.prototype
- 当参数长度为2时，将第二个对象继承到第一个
- 参数：
    - \[`{Object}` 原对象\] 或默认为 iSlider.prototype
    - `{Object}` 新对象
    
#### regPlugin

- 注册插件
- 参数：
    - `{String}` 插件名称
    - `{Function}` 插件初始化方法


### 实例方法


#### slideTo

- 滚动到第n个场景，可以在第二个参数设置配置信息，改变本次滑动的动画效果: animateTime animateType
- 参数：
    - `{Number}` 数据列表索引
    - \[`{Object}` 临时配置\]


#### slidePrev

- 滚动到后一场景，可以设置配置信息，改变本次滑动的动画效果: animateTime animateType
- 参数：
    - \[`{Object}` 临时配置\]


#### slidePrev

- 滚动到前一场景，可以设置配置信息，改变本次滑动的动画效果: animateTime animateType
- 参数：
    - \[`{Object}` 临时配置\]


#### delegate

- 在容器node上绑定代理事件
- 参数：
    - `{String}` 事件名称
    - `{String}` 选择器 (querySelectorAll)
    - `{Function}` 事件响应方法


#### bind

- delegate 的别名


#### unDelegate

- 解绑事件句柄
- 参数：
    - `{String}` 事件名称
    - `{String}` 选择器 (querySelectorAll)
    - `{Function}` 事件响应方法


#### unbind

- unDelegate的别名


#### on

- 在iSlider的事件中注册回掉方法
- 参数：
    - `{String}` 事件名
    - `{Function}` 回掉方法
    - \[`{Boolean}`\] 优先注册，回调事件注册到事件队列的首部，所有在初始化时注册的事件回调均在队列最前，默认：false


#### has

- 检测事件回调方法是否已存在
- 参数：
    - `{String}` 事件名
    - `{Function}` 回掉方法


#### off

- 从iSlider的事件中移除回掉方法
- 参数：
    - `{String}` 事件
    - `{Function}` 回掉方法


#### fire

- 事件触发


#### play

- 开始自动播放
- 前置条件：isAutoplay === ```TRUE```


#### pause

- 暂停自动切换
- 前置条件：isAutoplay === ```TRUE```


#### extend

- 同静态方法extend


#### regPlugin

- 同静态方法regPlugin
- **此方法会注册插件到iSlider实例中，在注册的同时会自动加入激活的插件列表，并自动执行初始化**


#### loadData

- 载入数据列表
- 参数：
    - `{Array}` 数据列表


#### subjectTo

- 服从于另一个iSlider实例
- 此iSlider会完全受目标iSlider控制
- 参数：
    - `{Object}` 目标
    - `{Object}` 受控的配置项（未开启）

```javascript
var IS_1 = new iSlider(dom, data);
var IS_2 = new iSlider(dom, data);

IS_1.subjectTo(IS_2);
// 此时IS_1完全受控于IS_2，也就是说对IS_2执行的拖拽、切换、自动播放等行为会同步到IS_1
```


#### hold

- 当前场景禁止手势


#### unhold

- 当前场景开启手势，同时解除锁定


#### lock

- 锁定当前场景，禁用sliceTo, slideNext, slidePrev方法，同时禁止手势


#### unlock

- 解除锁定


#### destroy

- 销毁当前iSlider实例，释放内存


#### reset

- 复位当前iSlider实例

## Contact us
Any feedback is most welcome if you have any question regarding iSlider or any bug is found:
[Commit a feedback](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
