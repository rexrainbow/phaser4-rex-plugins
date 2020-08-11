=============================================================================
Static world
=============================================================================

A Static World is designed specifically to have a bounds of a fixed size 
and a camera that doesn't move at all (no scrolling, rotation, etc)

Because it has a fixed size, there is no camera culling enabled.

Games that use this kind of world include Pacman, Bejeweled and 2048.


Import modules
=============================================================================

.. code-block:: typescript

    import { StaticWorld } from '@phaserjs/phaser/world';
    import { AddChild } from '@phaserjs/phaser/display/';


Create world instance
=============================================================================

.. code-block:: typescript

    const world = new StaticWorld(scene);


* World instance will listen :code:`'update'`, and :code:`'render'` events of 
  this scene.

    * Run :code:`child.update()` for each child game object, in order.
    * Render children game objects, in order.


Add game object to World
=============================================================================

.. code-block:: typescript

    AddChild(world, gameObject);


Shoutdown
=============================================================================

.. code-block:: typescript

    world.shutdown();


Clear the display list and reset the camera, but leave everything in place 
so we can return to this World again at a later stage.


Destroy
=============================================================================

.. code-block:: typescript

    world.destroy();


Events
=============================================================================

* On update, triggered before :code:`child.update()`

    .. code-block:: typescript

        Events.On(world, 'update', function(delta, time) { }, context);

* On post update, triggered after :code:`child.update()`

    .. code-block:: typescript

        Events.On(world, 'postupdate', function(delta, time) { }, context);

* On shutdown

    .. code-block:: typescript

        Events.On(world, 'worldshutdown', function(world) { }, context);

* On destroy

    .. code-block:: typescript

        Events.On(world, 'destroy', function(world) { }, context);
