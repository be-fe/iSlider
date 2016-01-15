### iSlider 2.0.10
- [Optimization]Some effects (such as default, rotate) in some browsers, there is a thin seam between the two scenes.
    - We try to solve, yes, it has been resolved in most cases.
    - However, this caused some impact on performance, so we use it as a configuration option called "fillSeam", the default value is false, it is disabled. When you need it can be enabled.
- [Plug-in]button support vertically sliding case.
- [Plug-in]dot support vertically sliding case.

### iSlider 2.0.9
- [BUG fix]disperse ghost when rotate and flip
- [Optimization]animate: remove rotate and flip cover background-color
- [BUG fix]Background image rendering affect the first frame position
- Some optimization

### iSlider 2.0.8

- [BUG fix]Fix initPage error, thanks @ronnyKJ

### iSlider 2.0.7

- [BUG fix]Remove tap event trigger.
    - Without tap library support, if you bind a tap event, we will help you trigger it. If there are library supports tap, such as zepto, it will trigger twice. Accordingly, this action must be removed.
    - If you want to use the tap, or any other custom events, which means that it is important to you, we do not need to stop it.

### iSlider 2.0.6

- [Optimization]add default width:100% for ul in css file.
- [BUG fix]At isOverspread mode, background image cant be displayed. background size problem. (╯‵□′)╯︵┻━┻, baidu browser... kernel tooooooo damn old!

### iSlider 2.0.5

- [Optimization]Autoplay timer will start counting after animation("slideChanged", "slideRestored")
- [Optimization]Add option "delay" for setting what time to start auto-play
- [Optimization]Methods "on" add the third parameter to set a callback priority(Boolean equivalent value), If set to "true" then added to the top of the queue. default is "false".


### iSlider 2.0.4

2015-11-13

- [BUG Fix]None fixPage mode, overflow will set to "auto"
- [BUG Fix]Add "mouseout" event, on desktop browser. Sticky problem when the finger to draw boundaries during sliding.
- [Optimization] Image loading sequence
- [Optimization] Animation Scope
- [Optimization] AnimateType mount change
- [Plug-in] BIZone added

### iSlider 2.0.3

2015-11-02

Fix parameter error, opts is is no longer necessary.

### iSlider 2.0.2

#### bug fixes

- Fix mouse buttons error on safari;
- Fix timer clean in destroy;

#### Something new

- Create event callback management mechanism, and "unbind", "undelegate" method;
- Cleanup delegate event when destruction;

### iSlider 2.0.1

2015-10-20

#### bug fixes

- fixPage default value

#### Something new

- [Plug-ins] dot support more optisons,
    - locate - In which the container, values: 'absolute' or 'relative' or DOM, default is 'absolute'
        - absolute: Same with iSlider
        - relative: In iSlider
        - Specified dom, eg: document.getElementById('xxx')


### iSlider 2.0

2015-08-29

#### Optimization, bug fixes

- Original plug-in decoupling: dot, button, zoompic
- Script reference change, adding mode
- Remove configure options
    - useZoom (move to plugins)
- Preload will work in all modes when the frame is automatically recognized as a picture.

#### Something new

- Support scramble data
    - Now you can choose any combination, put pictures, html string, elements, and even fragment, into the data list.
    - Option "type" is unnecessary, when it is 'pic' will open the image globally pre-loaded, of course, you don't have to worry about the other type of list members:)

- Event registration mechanism added
    - Use "on"/"off" methods to manage events.
    - Now you can register event after the initialization, and they can be deleted.

- Plug-registration mechanism added. (support original/hot registration)

- Support for new event types
    - slideChanged
    - slideRestore
    - slideRestored

- Supported parameters methods

    Now, slideTo, slideNext, slidePrev support the second parmater ({Object}) for custom temporary
    - animateTime
    - animateType

- Configurable options
    - plugins: enable plugin
    - animateTime: animation process time
    - animateEasing: support linear, ease, ease-in, ease-out, ease-in-out and custom cubic-bezier()

- Callback parameter specification

- Hold and Lock. add 4 mothods "hold", "unhold", "lock", "unlock"
    - hold - disable touch events, except for the native method.
    - unhole - release current scene, and unlock at same time
    - lock - lock native method calls, you can't do anything on this scene, and hold at same time
    - unlock - unlock native method calls

    priority
    - hold << lock(hold)
    - unhold(unlock) >> unlock

- Jumpy reader scene more smoother

### iSlider 1.1.1
- Add image preload, load one more image when slideChange and renderHTML.
- Add scroll support, you can use origin scroll or iscroll in iSlider
- Add tap event, avoid click 300ms delay
- Add simple event bind, you can easy bind events without jQuery

### iSlider 1.1.0
- increased animation type , including(default, rotate, flip, depth, flow)
- fixed interval looping bug (when window blur)
- added overspread mode
- added desktop support
- optimized the code style

### iSlider 1.0 beta
- fixed orientationchange event
- add those event onslide & onslidechange & onslidestart & onslideend
- add parameter like isVerticle & isLooping & isAutoplay

### iSlider 0.9 beta
- Keep li elements in 3
- Add damping effect when meeting the edge of the list
- handle onorientationchange Event
- Add layer slider not just pic slider
