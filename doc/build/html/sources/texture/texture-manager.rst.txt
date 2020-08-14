=============================================================================
Texture manager
=============================================================================

Store textures.

.. contents:: :local:


Load texture
=============================================================================

.. code-block:: javascript

    import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
    ImageFile(textureKey, url)
        .load()
        .then(function(){ });


Add texture to texture manager via :code:`textureKey` after loaded.


Get instance
=============================================================================

.. code-block:: javascript

    import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
    let textureManager = TextureManagerInstance.get();

:textureManager: A singleton of Game.


Texture
=============================================================================

* Has

    .. code-block:: javascript

        let hasTexture = textureManager.has(textureKey);

* Get

    .. code-block:: javascript

        let texuture = textureManager.get(textureKey);

    :texuture: Return *MISSING* texture if :code:`textureKey` is not existed.

* Add

    .. code-block:: javascript

        let texture = textureManager.add(textureKey, source);
        // let texture = textureManager.add(textureKey, source, glConfig);

    :source: :doc:`Texture<texture>`, or HTMLImageElement
    :glConfig: 