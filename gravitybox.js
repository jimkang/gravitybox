function createGravityBox(opts) {
  var w = opts.width,
      h = opts.height,
      r = 16;

  var force = d3.layout.force()
      .friction(0.4)
      .size([w, h]);

  function render(nodeData) {
    var magnetNodes = nodeData.map(magnetNodeForNode);

    var linkData = magnetNodes.map(function makeLink(magnetNode, i) {
      return {
        source: magnetNode,
        target: nodeData[i]
      };
    });

    nodeData = nodeData.concat(magnetNodes);
    nodeData.forEach(function setRadius(node) { node.radius = r; });

    var allNodes = opts.root.selectAll('.' + opts.nodeClass).data(nodeData);
    var newNodes = allNodes.enter().append(opts.nodeElementName)
      .classed(opts.nodeClass, true);

    newNodes.each(function updateSelection(d) {
      var node = d3.select(this);
      node.attr(d.attrs);
      node.style(d.styles);
    });

    force
      .nodes(nodeData)
      .links(linkData)
      .on('tick', tick)
      .start();

    function tick() {
      var q = d3.geom.quadtree(nodeData),
        i = 0,
        n = nodeData.length;

      while (++i < n) q.visit(collide(nodeData[i]));

      allNodes
        .attr(opts.xAttr, updateX)
        .attr(opts.yAttr, updateY);
    }

    function collide(node) {
      var r = node.radius,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius;
          if (!node.fixed && l < r) {
            // The node and the node described by the quad are too close.
            // Push them away from each other.
            l = (l - r) / l * 0.5;
            if (!isFinite(l)) {
              l = 0;
            }
            x *= l;
            y *= l;
            node.x -= x;
            node.y -= y;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      }
    }

  }

  // The magnet nodeData do not move. 
  // It stays under the bottom of the bounding box.

  function magnetNodeForNode(node) {
    return {
      name: 'magnet',
      fixed: true,
      x: node.x,
      y: h + r + 20
    };
  }

  function updateX(d) {
    if (!d.fixed) {
      d.x = Math.max(r, Math.min(w - r, d.x));
    }
    return d.x;
  }

  function updateY(d) {
    if (!d.fixed) {
      d.y = Math.max(r, Math.min(h - r, d.y));
    }
    return d.y;
  }

  function linkNodesToMagnetNode(nodeData, magnetNode) {
    return nodeData.map(function linkToNode(node) {
      return {
        source: magnetNode,
        target: node,
        value: 1
      };
    });
  }

  return {
    render: render
  };
}
