=============================================================================
Container
=============================================================================

Container of children game objects, extended from :doc:`Game object<../gameobject>`.

.. graphviz:: container-class-tree.dot
    :caption: Class inheritance tree of Container

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { Container } from '@phaserjs/phaser/gameobjects';


Custom class
=============================================================================

.. code-block:: javascript

    class MyContainer extends Container {
        constructor(x, y) {
            supert(x, y);
        }

        update(delta, time) {
            super.update(delta, time);
        }
    }


Create instance
=============================================================================

.. code-block:: javascript

    let container = new Container(x, y);


Position
=============================================================================

* Get

    .. code-block:: javascript
    
        let x = container.x;
        let y = container.y;

* Set

    .. code-block:: javascript
    
        container.setPosition(x, y);

    or

    .. code-block:: javascript
    
        container.x = x;
        container.y = y;


Angle
=============================================================================

* Get

    .. code-block:: javascript
    
        let rotation = container.rotation;  // Radians

* Set

    .. code-block:: javascript
    
        container.setRotation(rotation);  // Radians

    or

    .. code-block:: javascript
    
        container.rotation = rotation;


Alpha
=============================================================================

* Get

    .. code-block:: javascript
    
        let alpha = container.alpha;
    
* Set

    .. code-block:: javascript
    
        container.alpha = alpha;


Scale
=============================================================================

* Get

    .. code-block:: javascript
    
        let scaleX = container.scaleX;
        let scaleY = container.scaleY;
    
* Set

    .. code-block:: javascript
    
        container.setScale(x, y);
        // container.setScale(x); // y = x

    or

    .. code-block:: javascript
    
        container.scaleX = scaleX;
        container.scaleY = scaleY;


Size
=============================================================================

* Get

    .. code-block:: javascript
    
        let width = container.width;
        let height = container.height;
    
* Set

    .. code-block:: javascript
    
        container.setSize(width, height);
        // container.setSize(width); // height = width

    or

    .. code-block:: javascript
    
        container.width = width;
        container.height = height;


Origin
=============================================================================

* Get

    .. code-block:: javascript
    
        let originX = container.originX;
        let originY = container.originY;
    
* Set

    .. code-block:: javascript
    
        container.setOrigin(originX, originY);
        // container.setOrigin(originX); // originY = originX

    or

    .. code-block:: javascript
    
        container.originX = originX;
        container.originY = originY;
