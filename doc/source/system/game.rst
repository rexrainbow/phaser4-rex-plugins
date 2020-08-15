=============================================================================
Game
=============================================================================

.. contents:: :local:


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
