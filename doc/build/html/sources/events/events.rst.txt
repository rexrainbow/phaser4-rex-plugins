=============================================================================
General event emitter
=============================================================================

Import methods
=============================================================================

.. code-block:: typescript

    import { Events } from '@phaserjs/phaser';
    // import { On, Off } from '@phaserjs/phaser/events';


Register event
=============================================================================

.. code-block:: typescript

    Events.On(eventEmitter, eventName, function () { }, context);
    // let eventInstance = Events.On(eventEmitter, eventName, function () { }, context);


.. code-block:: typescript

    Events.Once(eventEmitter, eventName, function () { }, context);


Remove event
=============================================================================

.. code-block:: typescript

    Events.Off(eventEmitter, eventName, function () { }, context);
    // Events.Off(eventEmitter, eventInstance);


Remove all events
=============================================================================

.. code-block:: typescript

    Events.RemoveAllListeners(eventEmitter);


Emit event
=============================================================================

.. code-block:: typescript

    Events.Emit(eventEmitter, eventName, arg0, arg1, ...);

