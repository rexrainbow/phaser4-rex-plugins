=============================================================================
Scene
=============================================================================

Scene class.

* Load assets.

* Create world.

* Create game objects, add to world.

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { Scene } from '@phaserjs/phaser/scenes/Scene';


Define Scene class
=============================================================================

.. code-block:: javascript

    class MyScene extends Scene {
        constructor() {
            super();
    
            // Load assets, or create world and game objects
        }
    }


Events
=============================================================================

* On update

    .. code-block:: javascript

        Events.On(scene, 'update', function(delta, time) { }, context);

    * Each world fires ``'update'`` event under scene's ``'update'`` event,
      and run ``world.update(delta, time)`` to invoke ``gameObject.update(delta, time)`` 
      of all children.

* On render

    .. code-block:: javascript

        Events.On(scene, 'render', function(renderResult) { }, context);

    * Each world prepare renderable game object list under scene's ``'render'`` event.