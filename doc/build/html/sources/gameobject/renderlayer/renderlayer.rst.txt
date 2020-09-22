=============================================================================
Render layer
=============================================================================

The children are drawn to the RenderLayers texture and then the 
RenderLayer texture is drawn to the WebGL Renderer.

.. graphviz:: renderlayer-class-tree.dot
    :caption: Class inheritance tree of Render Layer

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { RenderLayer } from '@phaserjs/phaser/gameobjects';


Custom class
=============================================================================

.. code-block:: javascript

    class MyRenderLayer extends RenderLayer {
        constructor() {
            supert();
        }

        update(delta, time) {
            super.update(delta, time);
        }
    }


Create instance
=============================================================================

.. code-block:: javascript

    let renderLayer = new RenderLayer();


Children game objects
=============================================================================

see :ref:`Game object<chileren-game-objects>`.
