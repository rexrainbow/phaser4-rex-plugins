=============================================================================
Game
=============================================================================

    
Hierarchy
=============================================================================

.. graphviz:: hierarchy.dot
    :caption: From Game to Game object


* Application has a Game instance

    * Game has a scene manager, scene manager contains many scenes

        * World instances receive :code:`'update'` and :code:`'render'` events fired from scene

            * World contains children game objects

                * Game object can have children game objects


Update loop
=============================================================================

* Game.step()

    * :code:`SceneManager.update(delta)`

        * For each scene -> Emit scene's :code:`'update'` event -> :code:`World.update(delta)`

            * :code:`World.update(delta)` : 

                * Emit world's :code:`'update'` event

                * For each child game object -> :code:`child.update(delta)`

                    * :code:`Child.update(delta)`
                    
                        * For each child game object -> :code:`child.update(delta)`