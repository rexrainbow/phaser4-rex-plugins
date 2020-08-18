=============================================================================
Mouse
=============================================================================

Mouse events, touch events are not included.

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { Mouse } from '@phaserjs/phaser/input';
    import { Events } from '@phaserjs/phaser';


Create mouse instance
=============================================================================

.. code-block:: javascript

    const mouse = new Mouse.Mouse();


Mouse events
=============================================================================

* On pointer down

    .. code-block:: javascript
    
        Events.On(mouse, 'pointerdown', function (localX, localY, button, event) { 
            // const primaryDown = mouse.primaryDown;
            // const auxDown = mouse.auxDown;
            // const secondaryDown = mouse.secondaryDown;

            let hitGameObjects = mouse.hitTestChildren(world);
        }, context);

    * Get hit game object of a World : ``mouse.hitTestChildren(world)``

    * State of buttons

        * ``mouse.primaryDown``
        * ``mouse.auxDown``
        * ``mouse.secondaryDown``

* On pointer up

    .. code-block:: javascript
    
        Events.On(mouse, 'pointerup', function (localX, localY, button, event) { 
            // const primaryDown = mouse.primaryDown;
            // const auxDown = mouse.auxDown;
            // const secondaryDown = mouse.secondaryDown;

            let hitGameObjects = mouse.hitTestChildren(world);
        }, context);

* On pointer move

    .. code-block:: javascript

        Events.On(mouse, 'pointermove', function (localX, localY, event) { 
            // const primaryDown = mouse.primaryDown;
            // const auxDown = mouse.auxDown;
            // const secondaryDown = mouse.secondaryDown;

            let hitGameObjects = mouse.hitTestChildren(world);
        }, context);

* On mouse wheel

    .. code-block:: javascript

        Events.On(mouse, 'wheel', function (deltaX, deltaY, deltaZ, event) { }, context);

* On context menu

    .. code-block:: javascript
    
        Events.On(mouse, 'contextmenu', function (event) { }, context);


Hit test
=============================================================================

* Enable

    .. code-block:: javascript

        import { SetInteractive } from '@phaserjs/phaser/input';
        SetInteractive(gameObject0, gameObject1, ... );

    or

    .. code-block:: javascript

        gameObject.input.enabled = true;

* Disable

    .. code-block:: javascript

        gameObject.input.enabled = false;

* Set hit area, *optional*. 
  Use rectangle of display size as hit area by default.

    .. code-block:: javascript

        gameObject.input.hitArea = geom;

    :geom: Any kind of geometry object

        * Rectangle

            .. code-block:: javascript

                import { Rectangle } from '@phaserjs/phaser/geom/rectangle';
                gameObject.input.hitArea = new Rectangle(x, y, width, height);

        * Circle

            .. code-block:: javascript

                import { Circle } from '@phaserjs/phaser/geom/circle';
                gameObject.input.hitArea = new Circle(x, y, radius);

        * Custom object contains ``contains(x, y):boolean`` method.

* Get hit game objects

    .. code-block:: javascript

        let hitGameObjects = mouse.hitTestChildren(parentGameObject);
        // let hitGameObjects = mouse.hitTestChildren(parentGameObject, topOnly = true);

    :parentGameObject: A world, or a game object.
    :topOnly:

        * ``true`` : Return top most hit game object, default value.
        * ``false`` : Return all hit game objects

* Hit test

    .. code-block:: javascript
    
        let isHit = mouse.hitTest(gameObject0, gameObject1, ... );

    :isHit: Return ``true`` if any game object is hit.

        * Game object won't be checked if it is not added to any world.

    .. code-block:: javascript

        let hitPoint = mouse.hitPoint;

    :hitPoint: Local position ``{x, y}`` of hit point.
