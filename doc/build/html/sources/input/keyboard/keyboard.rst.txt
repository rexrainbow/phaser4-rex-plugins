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

* On any key down

    .. code-block:: typescript
    
        Events.On(keyboard, 'keydown', function (event) { 
            const keyCode = event.key;
        }, context);

    * Key code : :code:`event.key`

* On any key up

    .. code-block:: typescript
    
        Events.On(keyboard, 'keyup', function (event) { 
            const keyCode = event.key;
        }, context);

* On a key down

    .. code-block:: typescript
    
        Events.On(keyboard, 'keydown-' + key, function (event) { }, context);

* On a key up

    .. code-block:: typescript
    
        Events.On(keyboard, 'keyup-' + key, function (event) { }, context);


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

* Is key down

    .. code-block:: typescript

        let isKeyADown = keyA.isDown;

* Set key down/key up callback

    .. code-block:: typescript

       keyA.downCallback = function(keyA) { };
       keyA.upCallback = function(keyA) { };

* On key down

    .. code-block:: typescript

        Events.On(keyA, 'keydown', function (event) { }, context);

* On key up

    .. code-block:: typescript

        Events.On(keyA, 'keyup', function (event) { }, context);

* Remove all key objects

    .. code-block:: typescript
    
        keyboard.clearKeys();

