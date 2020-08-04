=============================================================================
Game
=============================================================================

    
Hierarchy
=============================================================================

.. graphviz:: hierarchy.dot
    :caption: From Game to Game object


* Application has a Game instance

    * Game has a scene manager, scene manager contains many scenes

        * World instances receive 'update' and 'render' events fired from scene

            * World contains child game objects

                * Game object can have child game objects


Update loop
=============================================================================

* Game.step()

    * SceneManager.update(delta)

        * For each scene -> Emit scene's *'update'* event -> World.update(delta)

            * World.update(delta) : 

                * Emit world's *'update'* event

                * For each child game object -> child.update(delta)

                    * Child.update(delta)
                    
                        * For each child game object -> child.update(delta)