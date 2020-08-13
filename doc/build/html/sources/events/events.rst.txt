=============================================================================
General event emitter
=============================================================================

.. contents:: :local:


Import methods
=============================================================================

.. code-block:: javascript

    import { Events } from '@phaserjs/phaser';
    // import { On, Off } from '@phaserjs/phaser/events';


Register event
=============================================================================

.. code-block:: javascript

    Events.On(eventEmitter, eventName, function () { }, context);
    // let eventInstance = Events.On(eventEmitter, eventName, function () { }, context);


.. code-block:: javascript

    Events.Once(eventEmitter, eventName, function () { }, context);


Remove event
=============================================================================

.. code-block:: javascript

    Events.Off(eventEmitter, eventName, function () { }, context);
    // Events.Off(eventEmitter, eventInstance);


Remove all events
=============================================================================

.. code-block:: javascript

    Events.RemoveAllListeners(eventEmitter);


Emit event
=============================================================================

.. code-block:: javascript

    Events.Emit(eventEmitter, eventName, arg0, arg1, ...);

