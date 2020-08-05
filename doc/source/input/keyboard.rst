=============================================================================
Keyboard
=============================================================================

Keyboard events.


Import modules
=============================================================================

.. code-block:: typescript

    import { Keyboard } from '@phaserjs/phaser/input';
    import { Events } from '@phaserjs/phaser';


Create keyboard instance
=============================================================================

.. code-block:: typescript

    const keyboard = new Keyboard.Keyboard();


Keyboard events
=============================================================================

* On any keydown

    .. code-block:: typescript
    
        Events.On(keyboard, 'keydown', function (event: KeyboardEvent) { 
            const keyCode = event.key;
        }, context);

* On any keyup

    .. code-block:: typescript
    
        Events.On(keyboard, 'keyup', function (event: KeyboardEvent) { 
            const keyCode = event.key;
        }, context);

* On a keydown

    .. code-block:: typescript
    
        Events.On(keyboard, 'keydown-' + key, function (event: KeyboardEvent) { }, context);

* On a keyup

    .. code-block:: typescript
    
        Events.On(keyboard, 'keyup-' + key, function (event: KeyboardEvent) { }, context);


Destroy keyboard
=============================================================================

.. code-block:: typescript

    keyboard.destroy();


Key object and events
=============================================================================

* Create key object

    .. code-block:: typescript
    
        const keyA = new Keyboard.Keys.AKey();
        keyboard.addKeys(keyA);

* Is keydown

    .. code-block:: typescript

        let isKeyADown = keyA.isDown;

* Set keydown/keyup callback

    .. code-block:: typescript

       keyA.downCallback = function(keyA) { };
       keyA.upCallback = function(keyA) { };

* On keydown

    .. code-block:: typescript

        Events.On(keyA, 'keydown', function (event: KeyboardEvent) { }, context);

* On keyup

    .. code-block:: typescript

        Events.On(keyA, 'keyup', function (event: KeyboardEvent) { }, context);

* Remove all key objects

    .. code-block:: typescript
    
        keyboard.clearKeys();

