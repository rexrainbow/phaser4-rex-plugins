Page0
=============================================================================

Content
----------------------------------------------------------------------------

This is a content string. ⭐️

.. note:: 
    Note here.

    * AAA
    * BBB

.. warning::
    Warning here.

Code block
-----------------------------------------------------------------------------

.. code-block:: c

    int a = 10, b = 20;
    int c = a + b;

* Code block under bullet list

    #. AAA 
    
        .. code-block:: c
        
            int a = 10, b = 20;
            int c = a + b;
        
    #. BBB

        .. code-block:: c
        
            int a = 10, b = 20;
            int c = a + b;
        
* BBB

* CCC

Table
----------------------------------------------------------------------------

=========== ===========
Header0     Header1
=========== ===========
Body0       Body1
Body2       Body3
⭐️         ⭐️
=========== ===========

=====  =====  ======
   Inputs     Output
------------  ------
  A      B    A or B
=====  =====  ======
False  False  False
True   False  True
=====  =====  ======

+--------------------------+------------+----------+----------+
| | Header row, column 1   | Header 2   | Header 3 | Header 4 |
| | (header rows optional) |            |          |          |
+==========================+============+==========+==========+
| | body row 1,            | column 2   | column 3 | column 4 |
| | column 1               |            |          |          |
+--------------------------+------------+----------+----------+
| body row 2               | ...        | ...      |          |
+--------------------------+------------+----------+----------+

.. list-table:: Title
   :widths: 25 25 50
   :header-rows: 1

   * - Heading row 1, column 1
     - Heading row 1, column 2
     - Heading row 1, column 3
   * - Row 1, column 1
     -
     - Row 1, column 3
   * - Row 2, column 1
     - Row 2, column 2
     - Row 2, column 3

Links
-----------------------------------------------------------------------------

* External link : `Python <http://www.python.org/>`_
* Internal anchor : `Content`_
* Custom anchor : :ref:`Part0`

Graph
-----------------------------------------------------------------------------

.. graphviz:: graph.dot

`Graphviz <https://www.sphinx-doc.org/en/master/usage/extensions/graphviz.html>`_