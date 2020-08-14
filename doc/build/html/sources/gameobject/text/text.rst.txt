=============================================================================
Text
=============================================================================

Draw text on canvas texture, extended from :doc:`Sprite<../sprite/sprite>`.

.. contents:: :local:


Import modules
=============================================================================

.. code-block:: javascript

    import { Text } from '@phaserjs/phaser/gameobjects';


Custom class
=============================================================================

.. code-block:: javascript

    class MyText extends Text {
        constructor(x, y, content, font, fillStyle) {
            supert(x, y, content, font, fillStyle);
        }

        update(delta, time) {
            super.update(delta, time);
        }
    }


Create instance
=============================================================================

.. code-block:: javascript

    let text = new Text(x, y, content);
    // let text = new Text(x, y, content, font, fillStyle);

:content: String, or string array.
:font: Font string, e.x. :code:`'16px monospace'`.
:fillStyle: Color string, e.x. :code:`'white'`, or :code:`'#fff'`, or gradient.


Content
=============================================================================

* Get

    .. code-block:: javascript

        let content = text.text;

* Set

    .. code-block:: javascript

        text.setText(content);

    or

    .. code-block:: javascript

        text.text = content;


Color
=============================================================================

.. code-block:: javascript

    import { SetFillStyle } from '@phaserjs/phaser/gameobjects/text';
    SetFillStyle(style, text);

:style: Color string, e.x. :code:`'white'`, or :code:`'#fff'`, or gradient.
:text: Text game object.

or

.. code-block:: javascript

    text.fillStyle = style;
    text.updateText();