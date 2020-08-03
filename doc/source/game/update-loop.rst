=============================================================================
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