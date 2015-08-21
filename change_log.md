### 2.X alpha 2015-08-18

#### Optimization, bug fixes

- Original plug-in decoupling: dot, button, zoompic
- Script reference change, adding mode
- Remove configure options
    - useZoom (move to plugins)

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
