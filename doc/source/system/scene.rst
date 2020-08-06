=============================================================================
Scene
=============================================================================

Scene class.

* Load assets.

* Create world.

* Create game objects, add to world.


Import modules
=============================================================================

.. code-block:: typescript

    import { Scene } from '@phaserjs/phaser/scenes/Scene';


Define Scene class
=============================================================================

.. code-block:: typescript

    class MyScene extends Scene {
        constructor() {
            super();
    
            // Load assets, or create world and game objects
        }
    }


Events
=============================================================================

* On update

    .. code-block:: typescript

        Events.On(scene, 'update', function(delta, time) { }, context);

    * Each world fires :code:`'update'` event under scene's :code:`'update'` event,
      and run :code:`world.update(delta, time)` to invoke :code:`gameObject.update(delta, time)` 
      of all children.

* On render

    .. code-block:: typescript

        Events.On(scene, 'render', function(renderResult) { }, context);

    * Each world prepare renderable game object list under scene's :code:`'render'` event.