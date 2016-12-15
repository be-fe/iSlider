# iSlider

iSlider is a lightweight, high-performant, no library dependencies cross-platform slide controller. It can help handling most sliding effects, offering dozens of transition animations, and presenting various scenarios.

![](http://be-fe.github.io/iSlider/thumbnails/iSlider-logo.png)

#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider DEMO](http://be-fe.github.io/iSlider/demo/index.html)
#### [iSlider 中文文档](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
#### [iSlider 演示](http://be-fe.github.io/iSlider/demo/index_chinese.html)
#### [iSlider animation](http://be-fe.github.io/iSlider/demo/animation.html)

## Features

- Outstanding performance, less memory usage;
- Various animation effects, including effects such as `default`, `rotate`, `depth`, `flow`, `flip`, `card`, `fade`, etc., and capability of adding custom animations;
- Provide rich callback trigger. Adding a callback function is easy, regardless of initialization or during operation;
- Easy to configure, e.g. Slide the dampening effect of the cycle, automatic sliding effect, horizontal / vertical sliding, etc.
- Automatic matching the desktop mouse movements or gestures on mobile device. Easy to test and use cross platforms;
- Supports for image pre-loaded, excellent user experience;
- \[Plugin\] Offers a variety of plug-ins, such as a toggle button, the scene indicator, image scaling, etc. Provides plug-in registration, management and other methods to facilitate custom extension;
- \[2.0+\] Can be loaded on demand (effect or plug-in);
- \[2.0+\] Supports more types of elements. Automatically matches the data type. Capable of image recognition and pre-loading;
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

The easiest way of getting started is to consult our examples, please visit the [DEMOs](https://github.com/be-fe/iSlider/tree/master/demo).

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
- Data list
- Though it's not required, the second param is also recommended.
- Allowed types: URLString, HTMLString, HTMLElement, HTMLFragment.
- *TODO:  Currently, each of the member in the array is type of `{Object}`, which only supports content property, in the future, it will get more extensions, such as the configuration of the effect about each scene transitions, wait time, etc.*
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
- dom node which is used as Container, same as the role of the parameter [DOM] (#dom), if this has been setted, DOM will be overwritten.


##### data

- `{Array}`
- A list of data, same as the role of the parameter [DATA] (#data), if this has been setted, DATA will be overwritten.


##### animateType

- `{String}`
- Animation
- Currently supports: default (scrolling), rotate (rotation), depth, flow, flip, card, fade (fade in / hidden), (outside / inside zoom) zoomout
- Precondition: Loading library iSlider.animate(.min).js which is used for effects
- Default: "default"


##### animateTime

- `{Number}`
- Animation duration
- Unit: ms
- Default: 1000


##### animateEasing

- `{String}`
- Animation curve
- Options: linear, ease, ease-in, ease-out, ease-in-out, even cubic-bezier
- Default: ease


##### isAutoplay

- `{Boolean}`
- Turn on / off the automatic sliding mode
- Default: false (Disabled)


##### duration

- `{Number}`
- Suspending time of scene when it's playback automatically
- Suspending time of each scene, it switches to the next scene when it is ended
- Unit: ms
- Precondition: isAutoplay === ```TRUE```


##### wakeupAutoplayDazetime

- `{Number}`
- User click/tap behavior(eg: active a link), or if the page loses focus will stop autoplay.
- This configuration will attempt to restart autoplay after N milliseconds.
- **AutoPlay will be forced to wake up, even when the user fill in a form items !**
- **It will be blocked by "lock()"**
- Unit: ms
- Precondition: isAutoplay === ```TRUE```


##### isLooping

- `{Boolean}`
- Repeat Mode
- Default: false (Disabled)


##### dampingForce

- `{Number}`
- Damping force, the rebound effect of overflow Scene
- Range: 0 ~ 1, Sliding distance decreases with increasing values (more difficult to slide)
- Default: 0
- Precondition: isLooping === ```FALSE```

<a href="http://be-fe.github.io/static/images/iSlider-notice/dampingForce-origin.png">
    <img src="http://be-fe.github.io/static/images/iSlider-notice/dampingForce-thumb.png"/>
</a>


##### isVertical

- `{Boolean}`
- Vertical sliding mode
- Default: false (Disabled)


##### isOverspread

- `{Boolean}`
- Background Tile
- If the scene is picture mode (URL), use the CSS3 backgrounds ways to filling the scenes
- Default: false (Disabled)


##### isTouchable

- `{Boolean}`
- Touch events
- Default: true (Enabled)


##### isDebug

- `{Boolean}`
- On / off debug mode, it will print more information about the log
- Default: false (Disabled)


##### initIndex

- `{Number}`
- Index of the list which is used for the first screen 
- Default: 0


##### fingerRecognitionRange

- `{Number}`
- The scope of wrong touch, if it's bigger than the value of scope, the touchMove will be treat as an effective distance of slide
- Default：10(px)


##### fixPage

- `{Boolean|Array|String}`
- Prevent native event
- Prevent to trigger the event in the scene shield, such as: scroll, drag, zoom, etc.
    - "A" elements, prevented, the mobile terminal is recommended to use user-defined tap (touch-based event jointly judgment)
    - For the form element "SELECT", "INPUT", "TEXTAREA", "BUTTON", "LABEL", in any situations it will not to be prevented
    - *Exclude strategies：if the type of param is string（rule，querySelector selector string）or Array(mutiple regulations)，this option is in opening status(true)and exlude elements with composite regulations, treat as`iSlider.FIX_PAGE_TAGS`
- Default: true (Enabled)


##### fillSeam

- `{Boolean}`
- To fill the gaps between scenes
- There is some rendering problems in the browser of some systems, resulting in a gap between scenes, this situation is particularly evident when the scene had setted the background color and use ** ** for connected.
- Default: false (Disabled)


##### plugins

- `{Array}`
- Enable plug-ins and configure the initialization parameters
- Incomming a name list of plugins which would be actived: ```['dot', 'button', 'zoompic', ...]```, in addition, it's support incoming initialization parameters: ```[..., ['zoompic', {zoomFactor: 2}], ...]```
- It will be ignored if the plug-in does not exist or is not loaded 


### Event callbacks

- `{Function}`
- Incomming at initialization, it's needed to beginning with **on** and it would to be Camel-Case
    - OR all **lowercase** **!! Will be discarded, If the Camel-Case or All-Lower-Case coexist, the Camel-Case will be used.**
- Binding with method "on" at living example, please use the Camel-Case, refer to the following list.
- *Due to the different scenes,callback method should be different , there will be different between the incoming parameters.

Example:

```javascript
var S = new iSlider({
	...,
	onSlideChange: callback
	onSlideChanged: callback
	onslidechanged: callBack, // !!All lower case will be abandoned, and now, it will be covered camelCasing
	...
});

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

- (Each)Be triggered at initialization
- Parameters: None


#### pluginInitialized

- Be triggered when all plug-in initialization is complete
- Parameters: None


#### renderComplete

- Be triggered when the outer container is rendered completely
- Be triggered before reset, loadData 
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### slideStart

- Be triggered when the finger touching screen
- Parameters
    - `{Object}` Event object
        
        
#### slide

- Be triggered when the finger is sliding
- Parameters
    - `{Object}` Event object


#### slideEnd

- Be triggered when the finger has lifted
- Parameters
    - `{Object}` Event object


#### slideChange

- `{Function}`
- Be triggered when the scene changes
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements

#### slideChanged

- `{Function}`
- Be triggered when the changing of scene is completed (the animation is completed)
- Be triggered when executing loadData
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### slideRestore

- `{Function}`
- Be triggered when the scene has not changed (rebound, animation is completed)
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### slideRestored

- `{Function}`
- Be triggered when the scene is changing and it's not completed (Rebound animation is completed)
- Be triggered when performing reset
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### loadData

- `{Function}`
- Be triggered when data is reset (execution loadData method)
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### reset

- `{Function}`
- Be triggered when the scene reset (phone screen rotate, resize)
- Parameters
    - `{Number}` current data index
    - `{HTMLElement}` current scene elements


#### destroy

- `{Function}`
- Be triggered when iSlider destruction
- Parameters: None


### Constant

#### VERSION

- `{String}`
- Version


#### EVENTS

- `{Array}`
- The list of events callback


#### EASING

- `{Array}`
- Animation effect（easing）regulation lists
    - 0: `{Array}` `['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']`
    - 1: `{Regexp}` Bézier curve expressions, writting same as the CSS3


#### FIX_PAGE_TAGS

- `{Array}`
- The white list which is matched the fixPage form


#### NODE_TYPE

- `{Array}`
- Scene type


#### TRANSITION_END_EVENT

- `{String}`
- The name of Animation's ending


#### BROWSER_PREFIX

- `{String}`
- CSS prefix


#### DEVICE_EVENTS

- `{Object}`
- `{{hasTouch, startEvt, moveEvt, endEvt, cancelEvt, resizeEvt}}`
- According to the event which the divices matched


### Static Methods

#### extend

- When the parameter's length is equal to 1, the object will inherit iSlider.prototype
- When the parameter's length is equal to 2, the second object will inherit the first
- Parameters:
    - \[`{Object}` original object\] or default iSlider.prototype
    - `{Object}` new object
    
#### regPlugin

- Register the plug-in
- Parameters:
    - `{String}` plug-in name
    - `{Function}` plug-in initialization method


### Instance Methods


#### slideTo

- Switch to the N-th scene, you can set the configuration information in second parameter to change slide animation this time: animateTime animateType
- Parameters:
    - `{Number}` data list index
    - \[`{Object}` temporary configuration\]


#### slidePrev

- Switch to the next scene, you can set the configuration information in second parameter to change slide animation this time: animateTime animateType
- Parameters:
    - \[`{Object}` temporary configuration\]


#### slidePrev

- Switch to the previous scene, you can set the configuration information in second parameter to change slide animation this time: animateTime animateType
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

- To register the callback method in the event of iSlider 
- Parameters:
    - `{String}` event name
    - `{Function}` back off method
    - \[`{Boolean}`\] priority registration, callback events registered to the header of the event queue, the event callback is always be the fisrt which is registered at the initialization, Default: false


#### has

- Detecting the event callback method is already exists
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

- Same as static method "extend"


#### regPlugin

- Same as the static method "regPlugin"
- ** This method will be registered the plug-in into the iSlider instance, It will add an active list of plug-in automatically when registeration and performs initialization automatically.**


#### loadData

- Loading new Datasheets
- Parameters:
    - `{Array}` Datasheets
    - `{Number}` Index, default: 0


#### pushData

- Add scenes to the end of the data datasheets
- Parameters:
    - `{Array|Object}` A member or additional datasheets


#### unshiftData

- Add scenes to the head of the data datasheets
- Parameters:
    - `{Array|Object}` A member or additional datasheets


#### subjectTo

- Subject to another Slider instance
- This Slider will completely controlled by the target iSlider
- Parameters:
    - `{Object}` target
    - `{Object}` controlled configuration item (Not Enabled)

```javascript
var IS_1 = new iSlider(dom, data);
var IS_2 = new iSlider(dom, data);

IS_1.subjectTo(IS_2);
// At this time IS_1 if fully controlled by IS_2, that is to say the drag, switching, auto-play and other acts performed on IS_2 would synced to IS_1
```


#### hold

- Prohibit the current scene gesture


#### unhold

- The current scene to open gestures, and trigger "unlocked" at the same time


#### lock

- Lock the current scene, disabled method of sliceTo, slideNext, slidePrev, while prohibiting gesture


#### unlock

- Unlock


#### destroy

- Destruction of the current iSlider instance, freeing memory


#### reset

- Reset the current iSlider instance


## Contact us
If you have any questions or find any bugs about iSlider, we will be appreciated for your feedback:
[Commit a feedback](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
