# iSlider

![](thumbnails/iSlider-logo.png)

#### [iSlider English README](https://github.com/BE-FE/iSlider/blob/master/README.md)
#### [iSlider DEMO](http://be-fe.github.io/iSlider/demo/index.html)
#### [iSlider 中文文档](https://github.com/BE-FE/iSlider/blob/master/README_Chinese.md)
#### [iSlider 演示](http://be-fe.github.io/iSlider/demo/index_chinese.html)

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

***Options properties precedence over parameters***

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

## Customise your iSlider

From 2.x, iSlider no longer requires `type` to specify the data type. It can now detect wisely, so that you can easily use various types of data, e.g. images, HTML elements or fragments.

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
        <td>type (obsolete)</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>{number}</td>
        <td>Sets the duration of each scene during auto-play mode. Unit: millis.</td>
    </tr>
    <tr>
        <td>animateType</td>
        <td>{string}</td>
        <td>Sets the animation type. Currently it could be one of `default`, `rotate`, `depth`, `flow`, `flip` and `card`</td>
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
        <td>Turns on/off the loop mode. Default: false (turned off)</td>
    </tr>
    <tr>
        <td>isAutoplay</td>
        <td>{boolean}</td>
        <td>Turns on/off the auto sliding mode. Default: false (turned off)</td>
    </tr>
    <tr>
        <td>isVertical</td>
        <td>{boolean}</td>
        <td>Sets vertical/horizontal sliding. Default: false (horizontal)</td>
    </tr>
    <tr>
        <td>isOverspread</td>
        <td>{boolean}</td>
        <td>Makes the image overspread the whole viewport (as CSS3 `background-size: cover`),
            if the scene mode is image. Default: false (disabled)</td>
    </tr>
    <tr>
        <td>initIndex</td>
        <td>{number}</td>
        <td>Specifies an index as the default home scene</td>
    </tr>
    <tr>
        <td>fixPage</td>
        <td>{boolean}</td>
        <td>Whether to disable native scrolling and rebound effect. Default: true (enabled)</td>
    </tr>
    <tr>
        <td>fillSeam</td>
        <td>{boolean}</td>
        <td>Fill the seam between scenes. Default: false (disabled)</td>
    </tr>
    <tr>
        <td>plugins</td>
        <td>{array}</td>
        <td>
            Enables plugins. It could be a simply list of plugin names:
            <pre>['dot', 'button', 'zoompic', ...]</pre>
            <br>
            Or, it could be a more complex list which can also contain init params for plugins:
            <pre>[..., ['zoompic', {zoomFactor: 2}], ...]</pre>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            Events
        </td>
    </tr>
    <tr>
        <td>onslide</td>
        <td>{function}</td>
        <td>Gets called on sliding</td>
    </tr>
    <tr>
        <td>onslidestart</td>
        <td>{function}</td>
        <td>Gets called when the sliding event starts</td>
    </tr>
    <tr>
        <td>onslideend</td>
        <td>{function}</td>
        <td>Gets called when the sliding event ends</td>
    </tr>
    <tr>
        <td>onslidechange</td>
        <td>{function}</td>
        <td>Gets called when the scene gets changed</td>
    </tr>
    <tr>
        <td>onslidechanged</td>
        <td>{function}</td>
        <td>Gets called post scene change (when the transition animation ends)</td>
    </tr>
    <tr>
        <td>onsliderestore</td>
        <td>{function}</td>
        <td>Gets called if scene restores</td>
    </tr>
    <tr>
        <td>onsliderestored</td>
        <td>{function}</td>
        <td>Gets called post scene restore (when the rollback animation ends)</td>
    </tr>
</tbody>
</table>

## More of iSlider

<table>
<thead>
    <tr>
        <td>Methods</td>
        <td>Params</td>
        <td>Explanation</td>
    </tr>
</thead>
<tbody>
    <tr>
        <td colspan="3">
            Static methods
        </td>
    </tr>
    <tr>
        <td>
            extend
        </td>
        <td>
            [{object} The original Object (Optional)]
            <br>
            {object} The new Object
        </td>
        <td>
            When the length of params is 1, the param object will be extended to iSlider.prototype
            <br>
            When the length is 2, use the second object as the param object, and extend all it's methods
            to the first object.
        </td>
    </tr>
    <tr>
        <td>
            regPlugin
        </td>
        <td>
            {string} Plugin name
            <br>
            {function} Init method for a plugin
        </td>
        <td>
            register plugin
        </td>
    </tr>
    <tr>
        <td colspan="3">
            Instance methods
        </td>
    </tr>
    <tr>
        <td>
            slideTo
        </td>
        <td>
            {number} index of a scene
            <br>
            [{object} one-off configuration (optional)]
        </td>
        <td>
            Slide to the N scene. Using the one-off configuration param, the transition effect
            for this particular slide can be specified. i.e. animateTime, animateType
        </td>
    </tr>
    <tr>
        <td>
            slideNext
        </td>
        <td>
            [{object} one-off configuration (optional)]
        </td>
        <td>
            Slide to the next scene. The one-off configuration can be used to specify the
            transition effect. i.e. animateTime, animateType
        </td>
    </tr>
    <tr>
        <td>
            slidePrev
        </td>
        <td>
            [{object} one-off configuration (optional)]
        </td>
        <td>
            Slide to the previous scene. The one-off configration can be used to specify the
            transition effect. i.e. animateTime, animateType
        </td>
    </tr>
    <tr>
        <td>
            delegate
        </td>
        <td>
            {string} event name
            <br>
            {string} selector (same syntax as querySelectorAll)
            <br>
            {function} event hanlder method
        </td>
        <td>
            Bind event handler to a node container
        </td>
    </tr>
    <tr>
        <td>
            bind
        </td>
        <td></td>
        <td>
            Alias of delegate
        </td>
    </tr>
    <tr>
        <td>
            unDelegate
        </td>
        <td>
            {string} event name
            <br>
            {string} selector (same syntax as querySelectorAll)
            <br>
            {function} event hanlder method
        </td>
        <td>
            unBind event handler
        </td>
    </tr>
    <tr>
        <td>
            unbind
        </td>
        <td></td>
        <td>
            Alias of unDelegate
        </td>
    </tr>
    <tr>
        <td>
            on
        </td>
        <td>
            {string} event name
            <br>
            {function} event handler method
        </td>
        <td>
            Register event handler for iSlider events
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
            {string} event name
            <br>
            {function} event handler method
        </td>
        <td>
            Remove an event handler from the registered handlers for a specified event
        </td>
    </tr>
    <tr>
        <td>
            fire
        </td>
        <td>
            {string} event name
        </td>
        <td>
            Trigger an event manually
        </td>
    </tr>
    <tr>
        <td>
            play
        </td>
        <td></td>
        <td>
            Start auto-play (auto-play mode must be specified)
        </td>
    </tr>
    <tr>
        <td>
            pause
        </td>
        <td></td>
        <td>
            Stop auto-play (auto-play mode must be specified)
        </td>
    </tr>
    <tr>
        <td>
            extend
        </td>
        <td></td>
        <td>
            Equivalent to iSlider.extend
        </td>
    </tr>
    <tr>
        <td>
            regPlugin
        </td>
        <td></td>
        <td>
            Equivalent to iSlider.regPlugin.
            Once registered, the plugin will be added to the active plugin list,
            and be initialized automatically.
        </td>
    </tr>
    <tr>
        <td>
            loadData
        </td>
        <td>
            {array} list of data
        </td>
        <td>
            Loads a list of data
        </td>
    </tr>
    <tr>
        <td>
            hold
        </td>
        <td></td>
        <td>
            Prevents the scene from any gesture
        </td>
    </tr>
    <tr>
        <td>
            unhold
        </td>
        <td></td>
        <td>
            Resumes and allows gesture on the current scene
        </td>
    </tr>
    <tr>
        <td>
            lock
        </td>
        <td></td>
        <td>
            Locks the current scene, disables `slideTo`, `slideNext` and `slidePrev` and also
            disable all gestures.
        </td>
    </tr>
    <tr>
        <td>
            unlock
        </td>
        <td></td>
        <td>
            Unlocks the scene
        </td>
    </tr>
    <tr>
        <td>
            destroy
        </td>
        <td></td>
        <td>
            Destroys the current iSlider instance, and frees memory
        </td>
    </tr>
    <tr>
        <td>
            reset
        </td>
        <td></td>
        <td>
            Resets the current iSlider instance
        </td>
    </tr>
</tbody>
</table>

## Contact us
Any feedback is most welcome if you have any question regarding iSlider or any bug is found:
[Commit a feedback](https://github.com/BE-FE/iSlider/issues/new?title=Bug%3A%20&body=)

## License (MIT)

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iSlider/blob/master/LICENSE)
