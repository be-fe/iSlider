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
