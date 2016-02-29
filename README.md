# iSlider

iSlider is a lightweight, high-performant, no library dependencies 
cross-platform slide controller. It can help handling most sliding effects, offering dozens 
of transition animations, and presenting various scenarios.

![](http://be-fe.github.io/iSlider/thumbnails/iSlider-logo.png)

#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider DEMO](http://be-fe.github.io/iSlider/demo/index.html)
#### [iSlider 中文文档](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
#### [iSlider 演示](http://be-fe.github.io/iSlider/demo/index_chinese.html)
#### [iSlider animation](http://be-fe.github.io/iSlider/demo/animation.html)

## Features

- Outstanding performance, less memory usage;
- Various animation effects, including effects such as `default`, `rotate`, `depth`, `flow`, `flip`, `card`, 
`fade`, etc., and capability of adding custom animations;
- Provide rich callback trigger. Adding a callback function is easy, 
regardless of initialization or during operation;
- Easy to configure, e.g. Slide the dampening effect of the cycle, automatic sliding effect, 
horizontal / vertical sliding, etc.
- Automatic matching the desktop mouse movements or gestures on mobile device. Easy to test and use cross platforms;
- Supports for image pre-loaded, excellent user experience;
- \[Plugin\] Offers a variety of plug-ins, such as a toggle button, the scene indicator, 
image scaling, etc. Provides plug-in registration, management and other methods to facilitate 
custom extension;
- \[2.0+\] Can be loaded on demand (effect or plug-in);
- \[2.0+\] Supports more types of elements. Automatically matches the data type.
Capable of image recognition and pre-loading;
- \[2.0+\] Better delegated event management mechanism, optimized memory usage;
- \[2.0+\] Enriched callback events, more flexible event management and trigger mechanisms;

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

The easiest way of getting started is to consult our examples, please visit 
the [DEMOs](https://github.com/be-fe/iSlider/tree/master/demo).

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

Or, 

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

**If you want more effects, you can load the animation effect extensions, 
set up the configuration when initializing iSlider and specify `animationType`.**

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

You can also pass in more custom params to the extension initialize method.

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

Scene toggle button. For switching to the previous (left/up) or next (right/down) scene of the current scene.

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

### Configurations

#### DOM (`Optional`, `OPTIONS.dom`)

- new iSlider(```DOM```, DATA, OPTIONS);
- `{HTMLElement}`
- DOM Container 
- Though the first parameter is not required, it is highly recommended, as setting a DOM container can make it more convenient to use iSlider.

#### DATA (`Optional`, `default: OPTIONS.data`)

- new iSlider(DOM, ```DATA```, OPTIONS);
- `{Array}`
- Datasheets
- Allowed types URLString, HTMLString, HTMLElement, HTMLFragment.
- * TODO: currently a member of the type `{Object}`, which only supports content property 
in the future will get more extensions, 
such as the configuration of each scene transitions, waiting time, etc. *
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


##### fingerRecognitionRange

- `{Number}`
- 误触识别范围，大于范围值的touchMove被视为有效滑动距离
- 默认：10(px)


##### fixPage

- `{Boolean}`
- Native event stop
- In the original scene shield trigger event, such as: scroll, drag, zoom, etc.
    - "A" elements to prevent the mobile terminal is recommended to use tap (touch-based event jointly judgment) custom
    - Of the form element "SELECT", "INPUT", "TEXTAREA", "BUTTON", "LABEL", under any circumstances be blocked
    - *排除策略：若参数类型为字符串（规则，querySelector选择器字符串）或数组(多个规则)，此选项为开启状态(true)并排除复合规则的元素，与`iSlider.FIX_PAGE_TAGS`相同对待
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

#### DEVICE_EVENTS

- `{Object}`
- `{{hasTouch, startEvt, moveEvt, endEvt, cancelEvt, resizeEvt}}`
- 根据设备所匹配的事件


### 静态方法

#### extend

- When the parameter length is 1, the object inheritance to iSlider.prototype
- When the parameter length is 2, the second to the first object inheritance
- Parameters:
    - \[`{Object}` original object\] or default iSlider.prototype
    - `{Object}` new object
    
#### regPlugin

- Register the plug-in
- Parameters:
    - `{String}` plug-in name
    - `{Function}` plug-in initialization method


### Instance methods


#### slideTo

- Switch to the N-th scene, you can set the configuration information in a second parameter, this change slide animation: animateTime animateType
- Parameters:
    - `{Number}` data list index
    - \[`{Object}` temporary configuration\]


#### slidePrev

- Switch to the next scene, you can set the configuration information, change this slide animation: animateTime animateType
- Parameters:
    - \[`{Object}` temporary configuration\]


#### slidePrev

- Switch to the previous scene, you can set the configuration information, change this slide animation: animateTime animateType
- Parameters:
    - \[`{Object}` temporary configuration\]


#### delegate

- Binding delegate event on the container node
- Parameters:
    - `{String}` event name
    - `{String}` selector (querySelectorAll)
    - `{Function}` incident response method


#### bind

- delegate alias


#### unDelegate

- Unbundling delegate event handler
- Parameters:
    - `{String}` event name
    - `{String}` selector (querySelectorAll)
    - `{Function}` incident response method


#### unbind

- UnDelegate alias


#### on

- In the event of registered iSlider the callback method
- Parameters:
    - `{String}` event name
    - `{Function}` back off method
    - \[`{Boolean}`\] priority registration, callback events registered to the header event queue during initialization event callbacks are registered in the queue before the default: false


#### has

- Detecting an event callback method already exists
- Parameters:
    - `{String}` event name
    - `{Function}` back off method


#### off

- Remove the callback method from iSlider events
- Parameters:
    - `{String}` event
    - `{Function}` back off method


#### fire

- Event Trigger


#### play

- Start Auto Play
- Precondition: isAutoplay === ```TRUE```


#### pause

- Pause automatic switching
- Precondition: isAutoplay === ```TRUE```


#### extend

- Same with static method "extend"


#### regPlugin

- Same with the static method "regPlugin"
- ** This method will register the plug to iSlider instance, registered at the same time are automatically added to the list of active plug-ins, and automatically performs initialization.**


#### loadData

- Loading new Datasheets
- Parameters:
    - `{Array}` Datasheets


#### subjectTo

- Subject to another instance of Slider
- This Slider completely controlled by the target iSlider
- Parameters:
    - `{Object}` target
    - `{Object}` controlled configuration item (Not Enabled)

```javascript
var IS_1 = new iSlider(dom, data);
var IS_2 = new iSlider(dom, data);

IS_1.subjectTo(IS_2);
// At this point IS_1 fully controlled IS_2, that is to say on the drag, switching, auto-play and other acts performed IS_2 synced to IS_1
```


#### hold

- Prohibit the current scene gesture


#### unhold

- The current scene to open gestures while unlocked


#### lock

- Lock the current scene, disable sliceTo, slideNext, slidePrev method, while prohibiting gesture


#### unlock

- Unlock


#### destroy

- Destruction of the current iSlider instance, freeing memory


#### reset

- Reset the current iSlider instance


## Contact us
Any feedback is most welcome if you have any question regarding iSlider or any bug is found:
[Commit a feedback](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
