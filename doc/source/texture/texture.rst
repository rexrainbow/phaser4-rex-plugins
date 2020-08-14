=============================================================================
Texture
=============================================================================

.. contents:: :local:

Canvas texture
=============================================================================

Add a canvas texture
-----------------------------------------------------------------------------

.. code-block:: javascript

    import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
    textureManager.add(key, CanvasTexture());

:textureManager: :doc:`Texture manager<texture-manager>`


Set size
-----------------------------------------------------------------------------

.. code-block:: javascript

    texture.setSize(width, height);


Update texture after resized.


Update texture
-----------------------------------------------------------------------------

.. code-block:: javascript

    if (texture.binding) {
        texture.binding.update();
    }


Frame
=============================================================================


Get frame
-----------------------------------------------------------------------------

.. code-block:: javascript

    let frame = textureManager.get(textureKey).getFrame(frameKey);

:textureManager: :doc:`Texture manager<texture-manager>`


Properties
-----------------------------------------------------------------------------

* Frame key, texture key

    .. code-block:: javascript

        let frameKey = frame.key;
        let textureKey = frame.texture.key;

* Source HTML image element

    .. code-block:: javascript
    
        let img = frame.texture.image;

* Frame rectangle on source HTML image element

    .. code-block:: javascript

        let left = frame.x;
        let top = frame.y;
        let width = frame.width;
        let height = frame.height;