=============================================================================
System
=============================================================================


Hierarchy
=============================================================================

.. graphviz:: hierarchy.dot
    :caption: From Game to Game object


* Application has a Game instance

    * Game has a scene manager, scene manager contains many scenes

        * World instances receive ``'update'`` and ``'render'`` events fired from scene

            * World contains children game objects

                * Game object can have children game objects


Update loop
=============================================================================

.. graphviz:: update-loop.dot
    :caption: Every tick


Simplest sample code
=============================================================================

.. literalinclude:: ../../../examples/test/sample.ts
   :language: javascript



.. toctree::
   :hidden:

   game.rst
   scene.rst
   static-world.rst