=============================================================================
Keyboard
=============================================================================

Keyboard events.

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { Keyboard } from '@phaserjs/phaser/input';
    import { Events } from '@phaserjs/phaser';


Create keyboard instance
=============================================================================

.. code-block:: javascript

    const keyboard = new Keyboard.Keyboard();


Keyboard events
=============================================================================

* On any key down

    .. code-block:: javascript
    
        Events.On(keyboard, 'keydown', function (event) { 
            const keyCode = event.key;
        }, context);

    * Key code : :code:`event.key`

* On any key up

    .. code-block:: javascript
    
        Events.On(keyboard, 'keyup', function (event) { 
            const keyCode = event.key;
        }, context);

* On a key down

    .. code-block:: javascript
    
        Events.On(keyboard, 'keydown-' + key, function (event) { }, context);

* On a key up

    .. code-block:: javascript
    
        Events.On(keyboard, 'keyup-' + key, function (event) { }, context);


Destroy keyboard
=============================================================================

.. code-block:: javascript

    keyboard.destroy();


Key object and events
=============================================================================

* Create key object

    .. code-block:: javascript
    
        const keyA = new Keyboard.Keys.AKey();
        keyboard.addKeys(keyA);

* Is key down

    .. code-block:: javascript

        let isKeyADown = keyA.isDown;

* Set key down/key up callback

    .. code-block:: javascript

       keyA.downCallback = function(keyA) { };
       keyA.upCallback = function(keyA) { };

* On key down

    .. code-block:: javascript

        Events.On(keyA, 'keydown', function (event) { }, context);

* On key up

    .. code-block:: javascript

        Events.On(keyA, 'keyup', function (event) { }, context);

* Remove all key objects

    .. code-block:: javascript
    
        keyboard.clearKeys();

