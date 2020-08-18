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
:font: Font string, include font size, font style, and font family. e.x. ``'16px monospace'``.
:fillStyle: Color string, e.x. ``'white'``, or ``'#fff'``, or gradient.


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

    ``text.updateText()`` has been invoked when text changed.

Font
=============================================================================

.. code-block:: javascript

    import { SetFont } from '@phaserjs/phaser/gameobjects/text';
    SetFont(font, text);

:font: Font string, include font size, font style, and font family. e.x. ``'16px monospace'``.
:text: Text game object.

or

.. code-block:: javascript

    text.font = font;
    text.updateText();


Fill style
=============================================================================

.. code-block:: javascript

    import { SetFillStyle } from '@phaserjs/phaser/gameobjects/text';
    SetFillStyle(style, text);

:style: Color string, e.x. ``'white'``, or ``'#fff'``, or gradient.
:text: Text game object.

or

.. code-block:: javascript

    text.fillStyle = style;
    text.updateText();


Stroke style
=============================================================================

.. code-block:: javascript

    import { SetStrokeStyle } from '@phaserjs/phaser/gameobjects/text';
    SetStrokeStyle(style, lineWidth, text);

:style: Color string, e.x. ``'white'``, or ``'#fff'``, or gradient.
:text: Text game object.

or

.. code-block:: javascript

    text.strokeStyle = style;
    text.lineWidth = lineWidth;
    text.updateText();


Line width
-----------------------------------------------------------------------------

.. code-block:: javascript

    import { SetLineWidth } from '@phaserjs/phaser/gameobjects/text';
    SetLineWidth(lineWidth, text);

:text: Text game object.

or

.. code-block:: javascript

    text.lineWidth = lineWidth;
    text.updateText();


Background style
=============================================================================

.. code-block:: javascript

    import { SetBackgroundStyle } from '@phaserjs/phaser/gameobjects/text';
    SetBackgroundStyle(style, cornerRadius, text);

:style: Color string, e.x. ``'white'``, or ``'#fff'``, or gradient.
:text: Text game object.

or

.. code-block:: javascript

    text.backgroundStyle = style;
    text.cornerRadius = cornerRadius;
    text.updateText();


Corner raduis
-----------------------------------------------------------------------------

.. code-block:: javascript

    import { SetCornerRadius } from '@phaserjs/phaser/gameobjects/text';
    SetCornerRadius(cornerRadius, text);

:text: Text game object.

or

.. code-block:: javascript

    text.cornerRadius = cornerRadius;
    text.updateText();


Alignment
=============================================================================

.. code-block:: javascript

    import { SetTextAlign } from '@phaserjs/phaser/gameobjects/text';
    SetTextAlign(align, text);

:text: Text game object.
:align: ``'start'``, ``'end'``, ``'center'``, ``'left'``, ``'right'``

or

.. code-block:: javascript

    text.textAlign = align;
    text.updateText();


Line spacing
=============================================================================

.. code-block:: javascript

    import { SetLineSpacing } from '@phaserjs/phaser/gameobjects/text';
    SetLineSpacing(spacing, text);

:text: Text game object.

or

.. code-block:: javascript

    text.lineSpacing = spacing;
    text.updateText();


Padding
=============================================================================

.. code-block:: javascript

    import { SetPadding } from '@phaserjs/phaser/gameobjects/text';
    SetPadding(left, right, top, bottom, text);

:text: Text game object.

or

.. code-block:: javascript

    text.padding.left = left;
    text.padding.right = right;
    text.padding.top = top;
    text.padding.bottom = bottom;
    text.updateText();


Fixed size
=============================================================================

.. code-block:: javascript

    import { SetFixedSize } from '@phaserjs/phaser/gameobjects/text';
    SetFixedSize(width, height, text);

:text: Text game object.

or

.. code-block:: javascript

    text.fixedWidth = width;
    text.fixedHeight = height;
    text.updateText();


Baseline
=============================================================================

.. code-block:: javascript

    import { SetTextBaseline } from '@phaserjs/phaser/gameobjects/text';
    SetTextBaseline(baseline, text);

:text: Text game object.
:baseline: ``'alphabetic'``, ``'top'``, ``'hanging'``, ``'middle'``, ``'ideographic'``, ``'bottom'``

or

.. code-block:: javascript

    text.textBaseline = baseline;
    text.updateText();


Redraw content
=============================================================================

.. code-block:: javascript

    text.updateText();


Canvas
=============================================================================

.. code-block:: javascript

    let canvas = text.canvas;
    let context = text.context;

* `Get image data <https://www.w3schools.com/tags/canvas_getimagedata.asp>`_

    .. code-block:: javascript

        let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
