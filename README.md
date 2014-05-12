gravitybox
==========

Module the browser that creates a bounded D3 force layout in which each node added has 'gravity' that makes it fall to the bottom of the box, which respecting collisions with other nodes.

[Check it out.](http://jimkang.com/gravitybox/example)


Installation
------------

    npm install gravitybox

Usage
-----

In your html:

    <script src="node_modules/gravitybox/gravitybox.js">

In your JavaScript, create an instance of gravitybox:

    var gravitybox = createGravityBox({
      root: d3.select('g#boxroot'),
      width: 400,
      height: 600,
      nodeClass: 'node',
      nodeElementName: 'circle',
      xAttr: 'cx',
      yAttr: 'cy'      
    });

`nodeClass` can be anything. `nodeElementName` can be any SVG element that can be positioned with two attributes, such as `cx` and `cy` for a circle. 

Make an array of nodes to pass to `gravitybox.add()`. Each node should have an initial x and y position. (gravitybox will map `x` and `y` to whatever you specify as `xAttr` and `yAttr.`) You can also specify attributes and styles to apply to the node elements.

    {
      x: 20,
      y: 0,
      attrs: {
      r: 15
      },
      styles: {
        fill: 'papaya',
        stroke: 'lightsteelblue'
      }
    }

Call `gravitybox.render()`.

Look at the code in /example for more detail.

License
-------

MIT.
