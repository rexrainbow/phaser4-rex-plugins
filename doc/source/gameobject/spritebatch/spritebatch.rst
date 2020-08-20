=============================================================================
Sprite Batch
=============================================================================

Display of mutiple static images, extended from Layer.

.. graphviz:: spritebatch-class-tree.dot
    :caption: Class inheritance tree of Sprite Batch

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { SpriteBatch } from '@phaserjs/phaser/gameobjects';


Custom class
=============================================================================

.. code-block:: javascript

    class MySpriteBatch extends SpriteBatch {
        constructor(maxSize, texture) {
            supert(maxSize, texture);
        }

        update(delta, time) {
            super.update(delta, time);
        }
    }


Create instance
=============================================================================

.. code-block:: javascript

    let spriteBatch = new SpriteBatch(maxSize, texture);

:maxSize: Clamp between ``0`` to ``65535``.


Max size
=============================================================================

* Set, also reset buffer.

    .. code-block:: javascript
    
        spriteBatch.setMaxSize(maxSize);
    
    :maxSize: Clamp between ``0`` to ``65535``.

* Get

    .. code-block:: javascript

        let maxSize = spriteBatch.maxSize;


Current size
=============================================================================

* Get

    .. code-block:: javascript

        let size = spriteBatch.count;

* Clear

    .. code-block:: javascript
    
        spriteBatch.clear();

    or

    .. code-block:: javascript
    
        spriteBatch.count = 0;


Texture
=============================================================================

* Load texture

    .. code-block:: javascript
    
        import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
        ImageFile(textureKey, url)
            .load()
            .then(function(){ });

* Get

    * Texture

        .. code-block:: javascript

            let texture = spriteBatch.texture;
            let textureKey = spriteBatch.texture.key;

* Set

    * Set texture and frame

        .. code-block:: javascript
        
            spriteBatch.setTexture(texture);

        :texture: Texture key, or a Texture object.


Add frame image
=============================================================================

.. code-block:: javascript

    spriteBatch.add({
            frame = null,
            x = 0,
            y = 0,
            rotation = 0,
            scaleX = 1,
            scaleY = 1,
            skewX = 0,
            skewY = 0,
            originX = 0,
            originY = 0,
            alpha = 1,
            tint = 0xffffff
    });

or

.. code-block:: javascript

    spriteBatch.addXY(x, y, frame);
    // spriteBatch.addXY(x, y);
