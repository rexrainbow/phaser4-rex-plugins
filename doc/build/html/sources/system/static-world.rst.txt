=============================================================================
Static world
=============================================================================

A Static World is designed specifically to have a bounds of a fixed size 
and a camera that doesn't move at all (no scrolling, rotation, etc)

Because it has a fixed size, there is no camera culling enabled.

Games that use this kind of world include Pacman, Bejeweled and 2048.


Import modules
=============================================================================

.. code-block:: javascript

    import { StaticWorld } from '@phaserjs/phaser/world';


Create world instance
=============================================================================

.. code-block:: javascript

    const world = new StaticWorld(scene);


* World instance will listen :code:`'update'`, and :code:`'render'` events of 
  this scene.

    * Run :code:`child.update()` for each child game object, in order.
    * Render children game objects, in order.


Children game objects
=============================================================================

List of game objects
-----------------------------------------------------------------------------

.. code-block:: javascript

    let gameObjects = world.children;

* Run :code:`gameObject.update(delta, time)` from first to last.

* Render game objects from first to last.

Add game object
-----------------------------------------------------------------------------

* Add a game object

    .. code-block:: javascript
    
        import { AddChild } from '@phaserjs/phaser/display';
        AddChild(world, gameObject);

* Add game objects

    .. code-block:: javascript
    
        import { AddChildren } from '@phaserjs/phaser/display';
        AddChildren(world, gameObject0, gameObject1, gameObject2, ...);

* Add a game object at index

    .. code-block:: javascript
    
        import { AddChildAt } from '@phaserjs/phaser/display';
        AddChildAt(world, index, gameObject);

* Add game objects at index

    .. code-block:: javascript
    
        import { AddChildrenAt } from '@phaserjs/phaser/display';
        AddChildrenAt(world, index, gameObject0, gameObject1, gameObject2, ...);


Arrange list
-----------------------------------------------------------------------------

* Move game object down

    .. code-block:: javascript
    
        import { MoveChildDown } from '@phaserjs/phaser/display';
        MoveChildDown(world, gameObject);

* Move game object up

    .. code-block:: javascript
    
        import { MoveChildUp } from '@phaserjs/phaser/display';
        MoveChildUp(world, gameObject);

* Move game object to index

    .. code-block:: javascript
    
        import { MoveChildTo } from '@phaserjs/phaser/display';
        MoveChildTo(world, gameObject, index);

* Send game object to back (i.e. move game object to list[0])

    .. code-block:: javascript
    
        import { SendChildToBack } from '@phaserjs/phaser/display';
        SendChildToBack(world, gameObject);

* Bring game object to top (i.e. move game object to list[list.length - 1])

    .. code-block:: javascript
    
        import { BringChildToTop } from '@phaserjs/phaser/display';
        BringChildToTop(world, gameObject);

* Swap 2 game objects

    .. code-block:: javascript
    
        import { SwapChildren } from '@phaserjs/phaser/display';
        SwapChildren(gameObject0, gameObject1);

* Shuffle game objects

    .. code-block:: javascript
    
        import { ShuffleChildren } from '@phaserjs/phaser/display';
        ShuffleChildren(world);

* Sort by callback

    .. code-block:: javascript
    
        world.children.sort(function(gameObjectA, gameObjectB) {
            // return (-1);  // index of gameObjectA < index of gameObjectB
            // return 0;
            // return 1;     // index of gameObjectA > index of gameObjectB
        });


Shoutdown
=============================================================================

.. code-block:: javascript

    world.shutdown();


Clear the display list and reset the camera, but leave everything in place 
so we can return to this World again at a later stage.


Destroy
=============================================================================

.. code-block:: javascript

    world.destroy();


Events
=============================================================================

* On update, triggered before :code:`child.update()`

    .. code-block:: javascript

        Events.On(world, 'update', function(delta, time) { }, context);

* On post update, triggered after :code:`child.update()`

    .. code-block:: javascript

        Events.On(world, 'postupdate', function(delta, time) { }, context);

* On shutdown

    .. code-block:: javascript

        Events.On(world, 'worldshutdown', function(world) { }, context);

* On destroy

    .. code-block:: javascript

        Events.On(world, 'destroy', function(world) { }, context);
