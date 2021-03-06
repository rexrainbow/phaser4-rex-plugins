=============================================================================
Sprite
=============================================================================

Display of static image, extended from :doc:`Container<../container/container>`.

.. graphviz:: sprite-class-tree.dot
    :caption: Class inheritance tree of Sprite

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { Sprite } from '@phaserjs/phaser/gameobjects';


Custom class
=============================================================================

.. code-block:: javascript

    class MySprite extends Sprite {
        constructor(x, y, texture, frame) {
            supert(x, y, texture, frame);
        }

        update(delta, time) {
            super.update(delta, time);
        }
    }


Create instance
=============================================================================

.. code-block:: javascript

    let sprite = new Sprite(x, y, texture, frame);
    // let sprite = new Sprite(x, y, texture);


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

            let texture = sprite.texture;
            let textureKey = sprite.texture.key;

    * Frame

        .. code-block:: javascript

            let frame = sprite.frame;
            let frameKey = sprite.frame.key;

* Set

    * Set texture and frame

        .. code-block:: javascript
        
            sprite.setTexture(texture, frame);

        :texture: Texture key, or a Texture object.
        :frame: Frame key, or a Frame object.
    
    * Change frame

        .. code-block:: javascript
        
            sprite.setFrame(frame);

        :frame: Frame key, or a Frame object.
