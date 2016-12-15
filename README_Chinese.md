# iSlider

iSlider是一个表现出众，轻量且高性能，无任何库依赖的跨平台滑动控件。它能够处理大多数的滑动场景，提供多种切换动画效果，展示多种类型的场景。

![](http://be-fe.github.io/iSlider/thumbnails/iSlider-logo.png)

#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider DEMO](http://be-fe.github.io/iSlider/demo/index.html)
#### [iSlider 中文文档](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
#### [iSlider 演示](http://be-fe.github.io/iSlider/demo/index_chinese.html)
#### [iSlider 动画效果](http://be-fe.github.io/iSlider/demo/animation.html)

## 特性

- 优秀的性能，更少的内存占用；
- 提供丰富的动画切换效果，自带的效果包括 default, rotate, depth, flow, flip, card, fade 等，并且可以进行无限的扩展；
- 提供丰富的回调触发器，并且添加回调函数极为方便，无论在初始化还是运行过程中；
- 支持滑动衰减效果，循环效果，自动滑动效果，水平/垂直滑动等众多参数，且功能皆可配置；
- 自动适配桌面鼠标动作与移动端手势，方便测试与跨平台使用；
- 支持图片预加载，优秀的用户体验；
- \[插件\] 提供多种插件，如切换按钮、场景指示器、图片缩放等，提供插件注册、管理等方法方便自定义扩展；
- \[2.0+\] 可以按需加载需要的功能（效果 或 插件）；
- \[2.0+\] 支持更多种类的元素置入，自动匹配数据类型，识别图片并进行预加载；
- \[2.0+\] 更完善的代理事件管理机制，优化内存占用；
- \[2.0+\] 更加丰富的回调事件，更灵活的事件管理、触发机制；

## 移动端展示

![](http://be-fe.github.io/iSlider/thumbnails/qrcode.png)

Demo [http://be-fe.github.io/iSlider/index.html](http://be-fe.github.io/iSlider/index.html)

## 获取 iSlider

#### 从Github克隆到本地

```bash
git clone https://github.com/be-fe/iSlider.git
```

#### 使用bower安装.

```bash
bower install iSlider
```

#### 使用npm安装

```bash
npm install islider.js
```

## 开始使用 iSlider

使用iSlider最简单的办法是查阅我们提供的简易例子，请浏览[DEMO](https://github.com/be-fe/iSlider/tree/master/demo)文件夹中的内容。

#### 创建一個容器
    
```html
<div id="iSlider-wrapper"></div>
```

#### 准备一些数据

```javascript
var data = [
    {content: "imgs/1.jpg"},
    {content: "imgs/2.jpg"},
    {content: "imgs/3.jpg"}
];
```

#### 载入iSlider

```html
<script src="iSlider.min.js"></script>
```

#### 初始化一个iSlider

```javascript
var islider = new iSlider(document.getElementById('iSlider-wrapper'), data);
```

也可以

```javascript
var islider = new iSlider({
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

```javascript
var islider = new iSlider(document.getElementById('iSlider-wrapper'), data, {
    dom : document.getElementById('iSlider-wrapper'),
    data : data
});
```

### iSlider 扩展

#### 动画效果

**如果您想加入更多效果，可以载入效果扩展库，并在初始化时配置参数，指定animateType**

```html
<script src="iSlider.min.js"></script>
<script src="iSlider.animate.min.js"></script>
```

```javascript
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

```html
<script src="iSlider.min.js"></script>
<script src="iSlider.plugin.dot.min.js"></script>
```

```javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    plugins: ['dot'],
});
```

当然还可以为插件的初始化传递更多的自定义参数

```javascript
var islider = new iSlider({
    dom: document.getElementById("iSlider-wrapper"),
    data: list,
    plugins: [['dot', {background:'rgba(0,0,0,0)'}]],
});
```

That's it!

#### 官方提供的插件

##### button

场景切换按钮，用于切换到前（上）或后（下）一场景

##### dot

场景指示器，当前所处的位置及切换到某一场景功能

##### zoompic

移动端图片缩放，在图片的非背景模式中，通过对图片双击或双指放大，达到放大预览的效果

- 已知的问题：恢复默认尺寸必须通过双击，双指缩小目前无法回到默认状态

##### BIZone

触控点边缘脱离识别区，虽然已经加入了mouseout和touchcancel的边缘处理，但是对于某些应用里，自定义的顶部（底部）菜单栏依然无能为力。识别区的意义在于可以主动的设置这些区域达到触摸脱离的效果。

## 场景数据

从2.X版本开始，iSlider将不再需要指定数据的类型“type”，而变化为更加智能的识别方式，您可以在列表中设置多种类型的数据，如图片、HTML、element、fragment、node

```javascript
var data = [{
    'content' : './qrcode.png'  // 图片
},{
    'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>' // HTML字符串
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
},{
     'content' : document.getElementById('node') // selectors
}];
```

一些进阶功能可以参考[WIKI](https://github.com/BE-FE/iSlider/wiki/Notices)

## iSlider 详细说明

### 配置参数

#### DOM

- new iSlider(```DOM```, DATA, OPTIONS);
- `{HTMLElement}`
- 容器dom节点
- 作为第一个参数并不是必须的，会被OPTIONS.dom覆盖，但是这十分必要，它可以使你更便捷的使用iSlider。

#### DATA

- new iSlider(DOM, ```DATA```, OPTIONS);
- `{Array}`
- 数据列表
- 作为第二个参数并不是必须的，会被OPTIONS.data覆盖，但是这十分必要，它可以使你更便捷的使用iSlider。
- 允许的类型：URLString、HTMLString、HTMLElement、HTMLFragment。
- *TODO：目前成员为{Object}类型，只支持content属性，在将来会得到更多的扩展，比如配置每一场景的切换效果、等待时间等等*
- 数据格式：

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
- 容器dom节点，作用同参数[DOM](#dom)，若设置此项，DOM会被覆盖。


##### data

- `{Array}`
- 数据列表，作用同参数[DATA](#data)，若设置此项，DATA会被覆盖。


##### animateType

- `{String}`
- 动画效果
- 目前支持：default（卷动）、rotate（旋转）、depth、flow、flip、card、fade（渐显/隐）、zoomout（向外/内缩放）
- 前置条件：载入效果库 iSlider.animate(.min).js
- 默认："default"


##### animateTime

- `{Number}`
- 动画效果持续时间
- 单位：毫秒
- 默认：1000


##### animateEasing

- `{String}`
- 动画效果曲线
- 可选 linear、ease、ease-in、ease-out、ease-in-out，甚至cubic-bezier
- 默认：ease


##### isAutoplay

- `{Boolean}`
- 开启/关闭自动滑动模式
- 默认：false(关闭)


##### duration

- `{Number}`
- 自动播放时，场景停留时间
- 每个场景停留时间，结束时会切换至下一场景
- 单位：毫秒
- 前置条件：isAutoplay === ```TRUE```


##### wakeupAutoplayDazetime

- `{Number}`
- 当用户产生点击/触摸行为(比如触发一个超链接)，或者页面失去焦点时会停止自动播放
- 此项配置会在吻合上面条件之后，尝试在N毫秒后重新唤醒自动播放
- **自动播放的唤醒是强制性的，无论你在做什么，比如正在某一帧上填写表单!**
- **此项配置会被"lock()"阻止，当你设置了此项又想在某一帧停留的时候请使用"lock()"方法**
- 单位：毫秒
- 前置条件：isAutoplay === ```TRUE```


##### isLooping

- `{Boolean}`
- 循环播放模式
- 默认：false(关闭)


##### dampingForce

- `{Number}`
- 阻尼力度, 非循环模式下，首尾场景的回弹效果阻尼系数
- 值域: 0 ~ 1，数值越大滑动距离越小（越难以滑动）
- 默认: 0
- 前置条件: isLooping === ```FALSE```

<a href="http://be-fe.github.io/static/images/iSlider-notice/dampingForce-origin.png">
    <img src="http://be-fe.github.io/static/images/iSlider-notice/dampingForce-thumb.png"/>
</a>


##### isVertical

- `{Boolean}`
- 垂直滑动模式
- 默认：false(关闭)


##### isOverspread

- `{Boolean}`
- 背景平铺
- 如果场景为图片模式（URL），使用CSS3背景的方式填充场景
- 默认：false(关闭)


##### isTouchable

- `{Boolean}`
- 触屏事件
- 默认：true(开启)


##### isDebug

- `{Boolean}`
- 开启/关闭调试模式，会打印更多日志信息
- 默认：false(关闭)


##### initIndex

- `{Number}`
- 首屏所使用的数据列表索引
- 默认：0


##### fingerRecognitionRange

- `{Number}`
- 误触识别范围，大于范围值的touchMove被视为有效滑动距离
- 默认：10(px)


##### fixPage

- `{Boolean|Array|String}`
- 原生事件阻止
- 场景内屏蔽原生事件的触发，如：滚动、拖拽、缩放等
    - "A"元素，阻止，移动端建议使用自定义的tap（touch系事件联合判断）
    - 对表单类元素"SELECT"、"INPUT"、"TEXTAREA"、"BUTTON"、"LABEL"，任何情况下均不进行阻止
    - *排除策略：若参数类型为字符串（规则，querySelector选择器字符串）或数组(多个规则)，此选项为开启状态(true)并排除符合规则的元素，与`iSlider.FIX_PAGE_TAGS`相同对待
- 默认：true(开启)


##### fillSeam

- `{Boolean}`
- 填补场景间接缝
- 在某些系统的浏览器中存在的渲染问题，造成场景间出现一条缝隙，这种情况在场景设置了背景色并且使用**相连**的切换效果时尤为明显。
- 默认：false(关闭)


##### plugins

- `{Array}`
- 启用插件并配置初始化参数
- 传入欲激活的插件名称列表：```['dot', 'button', 'zoompic', ...]```，另外，支持传入初始化参数：```[..., ['zoompic', {zoomFactor: 2}], ...]```
- 若插件未被载入或不存在则忽略


### 事件回调

- `{Function}`
- 在初始化时作为参数传入，需要以**on**开头，回调方法名改为**首字母大写（驼峰命名）**
	- 或者全为**小写** **！！即将废弃，如果同时设置了驼峰及全小写，则采纳驼峰**
- 通过实例方法"on"进行事件注册，驼峰命名，与下列列表中的名称一致即可。
- *不同的回调方法由于所处场景不同，传入的参数会存在区别。

示例：

```javascript
var S = new iSlider({
	...,
	onSlideChange: callback
	onSlideChanged: callback
	onslidechanged: callBack, // !!全小写即将废弃，优先级低于驼峰命名
	...
});

// 或者
S.on('slideChanged', callBack);
```

#### initialize

- 初始化开始（在调用setting后，渲染之前）
- 参数：无


#### initialized

- 初始化完成时（渲染之后）触发
- 参数：无


#### pluginInitialize (未开启)

- (每个)插件初始化时触发
- 参数：无


#### pluginInitialized

- 全部插件初始化完成时触发
- 参数：无


#### renderComplete

- 当外容器渲染完成时触发
- reset、loadData触发之前会触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素


#### slideStart

- 当手指触屏时触发
- 参数
    - `{Object}` 事件(Event)对象
        
        
#### slide

- 当手指滑动时触发
- 参数
    - `{Object}` 事件(Event)对象


#### slideEnd

- 当手指离开时触发
- 参数
    - `{Object}` 事件(Event)对象


#### slideChange

- `{Function}`
- 当场景发生改变时触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素

#### slideChanged

- `{Function}`
- 当场景改变完成(动画完成)时触发
- 执行loadData时触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素


#### slideRestore

- `{Function}`
- 当场景未发生变化(回弹，动画完成)时触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素


#### slideRestored

- `{Function}`
- 当场景未发生变化完成(回弹动画完成)时触发
- 执行reset时触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素


#### loadData

- `{Function}`
- 当数据重置(执行loadData方法)时触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素


#### reset

- `{Function}`
- 当场景重置(手机屏幕旋转、resize)时触发
- 参数
    - `{Number}` 当前数据索引
    - `{HTMLElement}` 当前场景元素


#### destroy

- `{Function}`
- 当iSlider销毁时触发
- 参数：无


### 常量

#### VERSION

- `{String}`
- 版本号


#### EVENTS

- `{Array}`
- 事件回调列表


#### EASING

- `{Array}`
- 动画效果（easing）规则列表
    - 0: `{Array}` `['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']`
    - 1: `{Regexp}` 贝塞尔曲线公式，同CSS3中的写法


#### FIX_PAGE_TAGS

- `{Array}`
- 对应fixPage的表单元素白名单


#### NODE_TYPE

- `{Array}`
- 场景类型


#### TRANSITION_END_EVENT

- `{String}`
- 动画效果结束事件名


#### BROWSER_PREFIX

- `{String}`
- CSS前缀


#### DEVICE_EVENTS

- `{Object}`
- `{{hasTouch, startEvt, moveEvt, endEvt, cancelEvt, resizeEvt}}`
- 根据设备所匹配的事件


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

- 切换到第n个场景，可以在第二个参数设置配置信息，改变本次滑动的动画效果: animateTime animateType
- 参数：
    - `{Number}` 数据列表索引
    - \[`{Object}` 临时配置\]


#### slidePrev

- 切换到后一场景，可以设置配置信息，改变本次滑动的动画效果: animateTime animateType
- 参数：
    - \[`{Object}` 临时配置\]


#### slidePrev

- 切换到前一场景，可以设置配置信息，改变本次滑动的动画效果: animateTime animateType
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

- 同静态方法中的"extend"


#### regPlugin

- 同静态方法"regPlugin"
- **此方法会注册插件到iSlider实例中，在注册的同时会自动加入激活的插件列表，并自动执行初始化**


#### loadData

- 载入新的数据列表
- 参数：
    - `{Array}` 数据列表
    - `{Number}` 初始场景索引


#### pushData

- 追加数据到已有的数据序列末尾
- 参数：
    - `{Array|Object}` 一个成员或者追加的序列（数组）


#### unshiftData

- 添加数据到已有的数据序列头部
- Parameters:
    - `{Array|Object}` 一个成员或者追加的序列（数组）


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


## 联系我们
对iSlider的使用有任何问题,或者发现bug,欢迎给我们反馈：
[提交反馈](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
