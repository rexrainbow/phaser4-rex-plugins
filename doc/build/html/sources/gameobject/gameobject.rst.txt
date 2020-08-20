=============================================================================
Game object
=============================================================================

Common method and properties of game object.

.. contents:: :local:


Destroy
=============================================================================

* Destroy game object and children game objects

    .. code-block:: javascript
    
        gameObject.destroy();

* Destroy game object , reparent children game objects

    .. code-block:: javascript
    
        gameObject.destroy(newParent);


.. _chileren-game-objects:

Children game objects
=============================================================================

List of children game objects
-----------------------------------------------------------------------------

.. code-block:: javascript

    let gameObjects = parent.children;

* Run ``gameObject.update(delta, time)`` from first to last.

* Render game objects from first to last.


Add child game object
-----------------------------------------------------------------------------

* Add a game object.

    .. code-block:: javascript
    
        import { AddChild } from '@phaserjs/phaser/display';
        AddChild(parent, child);

* Add game objects

    .. code-block:: javascript
    
        import { AddChildren } from '@phaserjs/phaser/display';
        AddChildren(parent, child0, child1, child2, ...);

* Add a game object at index

    .. code-block:: javascript
    
        import { AddChildAt } from '@phaserjs/phaser/display';
        AddChildAt(parent, index, child);

* Add game objects at index

    .. code-block:: javascript
    
        import { AddChildrenAt } from '@phaserjs/phaser/display';
        AddChildrenAt(parent, index, child0, child1, child2, ...);


Arrange list
-----------------------------------------------------------------------------

* Move game object down

    .. code-block:: javascript
    
        import { MoveChildDown } from '@phaserjs/phaser/display';
        MoveChildDown(parent, child);

* Move game object up

    .. code-block:: javascript
    
        import { MoveChildUp } from '@phaserjs/phaser/display';
        MoveChildUp(parent, child);

* Move game object to index

    .. code-block:: javascript
    
        import { MoveChildTo } from '@phaserjs/phaser/display';
        MoveChildTo(parent, child, index);

* Send game object to back (i.e. move game object to list[0])

    .. code-block:: javascript
    
        import { SendChildToBack } from '@phaserjs/phaser/display';
        SendChildToBack(parent, child);

* Bring game object to top (i.e. move game object to list[list.length - 1])

    .. code-block:: javascript
    
        import { BringChildToTop } from '@phaserjs/phaser/display';
        BringChildToTop(parent, child);

* Swap 2 game objects

    .. code-block:: javascript
    
        import { SwapChildren } from '@phaserjs/phaser/display';
        SwapChildren(child0, child1);

* Shuffle game objects

    .. code-block:: javascript
    
        import { ShuffleChildren } from '@phaserjs/phaser/display';
        ShuffleChildren(parent);

* Sort by callback

    .. code-block:: javascript
    
        world.children.sort(function(childA, childB) {
            // return (-1);  // index of childA < index of childB
            // return 0;
            // return 1;     // index of childA > index of childB
        });


World position <-> Local position
=============================================================================


World -> local
-----------------------------------------------------------------------------

.. code-block:: javascript

    let localXY = gameObject.transform.globalToLocal(worldX, worldY);


Local -> world
-----------------------------------------------------------------------------

.. code-block:: javascript

    let worldXY = gameObject.transform.localToGlobal(localX, localY);

