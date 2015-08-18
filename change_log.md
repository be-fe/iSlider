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

- Configurable options
    - plugins: enable plugin
    - animateTime: animation process time
    - animateEasing: support linear, ease, ease-in, ease-out, ease-in-out and custom cubic-bezier()

- Callback parameter specification