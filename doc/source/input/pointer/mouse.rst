=============================================================================
Mouse
=============================================================================

Mouse events, touch events are not included.


Import modules
=============================================================================

.. code-block:: typescript

    import { Mouse } from '@phaserjs/phaser/input';
    import { Events } from '@phaserjs/phaser';


Create mouse instance
=============================================================================

.. code-block:: typescript

    const mouse = new Mouse.Mouse();


Mouse events
=============================================================================

* On pointer down

    .. code-block:: typescript
    
        Events.On(mouse, 'pointerdown', function (localX, localY, button, event) { 
            // const primaryDown = mouse.primaryDown;
            // const auxDown = mouse.auxDown;
            // const secondaryDown = mouse.secondaryDown;
        }, context);

    * State of buttons

        * :code:`mouse.primaryDown`
        * :code:`mouse.auxDown`
        * :code:`mouse.secondaryDown`

* On pointer up

    .. code-block:: typescript
    
        Events.On(mouse, 'pointerup', function (localX, localY, button, event) { 
            // const primaryDown = mouse.primaryDown;
            // const auxDown = mouse.auxDown;
            // const secondaryDown = mouse.secondaryDown;
        }, context);

* On pointer move

    .. code-block:: typescript

        Events.On(mouse, 'pointermove', function (localX, localY, event) { 
            // const primaryDown = mouse.primaryDown;
            // const auxDown = mouse.auxDown;
            // const secondaryDown = mouse.secondaryDown;
        }, context);

* On mouse wheel

    .. code-block:: typescript

        Events.On(mouse, 'wheel', function (deltaX, deltaY, deltaZ, event) { }, context);

* On context menu

    .. code-block:: typescript
    
        Events.On(mouse, 'contextmenu', function (event) { }, context);


Hit test
=============================================================================

* Get hit children

    .. code-block:: typescript

        let hitChildren = mouse.hitTestChildren(parentGameObject);
        // let hitChildren = mouse.hitTestChildren(parentGameObject, topOnly = true);

    :parentGameObject: A world, or a game object.
    :topOnly:

        * :code:`true` : Return top most hit game object, default value.
        * :code:`false` : Return all hit game objects

* Hit test

    .. code-block:: typescript
    
        let isHit = mouse.hitTest(gameObject0, gameObject1, ... );

    :isHit: Return :code:`true` if any game object is hit.

        * Game object won't be checked if it is not added to any world.

    .. code-block:: typescript

        let hitPoint = mouse.hitPoint;

    :hitPoint: Local position :code:`{x, y}` of hit point.
