=============================================================================
Game
=============================================================================

Initial game instance, add scenes.

.. contents:: :local:


Quick start
=============================================================================

.. code-block:: javascript

    import { Game } from '@phaserjs/phaser/Game';
    import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';

    // ...
    new Game(
        WebGLRenderer(),
        Size(800, 600),
        Parent('game'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
        // More configurations
    );


Renderer
=============================================================================

* Initial webGL renderer

    .. code-block:: javascript
    
        import { WebGLRenderer } from '@phaserjs/phaser/config';
    
        // ...
    
        new Game(
            // ...
            WebGLRenderer(),
            // ...
        )

* Initial canvas renderer


Size of game window
=============================================================================

* Initialize

    .. code-block:: javascript
    
        import { Size } from '@phaserjs/phaser/config';
    
        // ...
    
        new Game(
            // ...
            Size(width, height),
            // ...
        )
    
    * Default width : ``800``.
    * Default height : ``600``.

* Get

   .. code-block:: javascript

       import { GetWidth, GetHeight } from '@phaserjs/phaser/config/size';

       let width = GetWidth();
       let height = GetHeight();


Background color
=============================================================================

* Initialize

    .. code-block:: javascript
    
        import { BackgroundColor } from '@phaserjs/phaser/config';
    
        // ...
    
        new Game(
            // ...
            BackgroundColor(color),
            // ...
        )
    
    
    * Default background color : ``0x000000``

* Get

   .. code-block:: javascript

       import { GetBackgroundColor } from '@phaserjs/phaser/config/backgroundcolor';

       let color = GetBackgroundColor();


Parent element
=============================================================================

* Initialize

    .. code-block:: javascript
    
        import { Parent } from '@phaserjs/phaser/config';
    
        // ...
    
        new Game(
            // ...
            Parent(parentElement),
            // ...
        )
    
    
    * ``parentElement`` : String or HTML element.
    * Default parent element : Document body

* Get

   .. code-block:: javascript

       import { GetParent } from '@phaserjs/phaser/config/parent';

       let htmlElement = GetParent();


Scenes
=============================================================================

* Initialize

    .. code-block:: javascript
    
        import { Scenes } from '@phaserjs/phaser/config';
    
        // ...
    
        new Game(
            // ...
            Scenes(scene),
            // ...
        )
    
    * ``scene`` : :doc:`Scene class<scene>`, or array of scene class.
