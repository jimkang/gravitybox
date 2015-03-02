function createGravityBox(opts) {
  var w = opts.width,
      h = opts.height,
      r = opts.r ? opts.r : 16;

  if (!opts.rectRecoilFactor) {
    opts.rectRecoilFactor = 2.0;
  }

  var force = d3.layout.force()
      .friction(3.0)
      .size([w, h]);

  var allNodeData = [];
  var allLinkData = [];

  function add(nodeData) {
    var magnetNodes = nodeData.map(magnetNodeForNode);

    var linkData = magnetNodes.map(function makeLink(magnetNode, i) {
      return {
        source: magnetNode,
        target: nodeData[i]
      };
    });    

    nodeData = nodeData.concat(magnetNodes);
    nodeData.forEach(function setRadius(node) { node.radius = r; });

    allNodeData = allNodeData.concat(nodeData);
    allLinkData = allLinkData.concat(linkData);
  }

  function render() {
    var allNodes = opts.root.selectAll('.' + opts.nodeClass).data(allNodeData);
    var newNodes = allNodes.enter().append(opts.nodeElementName)
      .classed(opts.nodeClass, true);

    if (opts.processSelection) {
      newNodes.each(opts.processSelection);
    } 

    newNodes.each(function updateSelection(d) {
      var node = d3.select(this);
      node.attr(d.attrs);
      node.style(d.styles);
    });

    force
      .nodes(allNodeData)
      .links(allLinkData)
      .on('tick', tick)
      .start();

    function tick() {
      var q = d3.geom.quadtree(allNodeData),
        i = 0,
        n = allNodeData.length;

      var collisionFunction = collide;
      if (opts.useRectForCollision) {
        collisionFunction = createCollideRectFunction;
      }
      while (++i < n) q.visit(collisionFunction(allNodeData[i]));

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

    function createCollideRectFunction(node) {
      var aLeft = node.x;
      var aRight = node.x + node.attrs.width;
      var aTop = node.y;
      var aBottom = node.y + node.attrs.height;
      var aCx = aLeft + node.attrs.width/2;
      var aCy = aTop + node.attrs.height/2;

      return function collideRect(quad, x1, y1, x2, y2) {
        if (!node.fixed && quad.point && (quad.point !== node)) {
          var bLeft = quad.point.x;
          var bRight = quad.point.x + quad.point.attrs.width;
          var bTop = quad.point.y;
          var bBottom = quad.point.y + quad.point.attrs.height;

          var missed = aDoesNotCollideWithB(aTop, aBottom, aLeft, aRight,
            bTop, bBottom, bLeft, bRight);

          if (!missed) {
            var bCx = bLeft + quad.point.attrs.width/2;
            var bCy = bTop + quad.point.attrs.height/2;
            var dx = (bCx - aCx) * opts.rectRecoilFactor;
            var dy = (bCy - aCy) * opts.rectRecoilFactor;

            node.x -= dx/2;
            node.y -= dy/2;
            quad.point.x += dx/2;
            quad.point.y += dy/2;
          }
        }

        // Stop searching the quad's children if no part of the node's rect 
        // collides with the quad (expanded by maxRectWidth).
        return aDoesNotCollideWithB(
          aTop, aBottom, aLeft, aRight,
          y1 - opts.maxRectHeight, 
          y2 + opts.maxRectHeight, 
          x1 - opts.maxRectWidth, 
          x2 + opts.maxRectWidth
        );
      }
    }

    function aDoesNotCollideWithB(aTop, aBottom, aLeft, aRight,
      bTop, bBottom, bLeft, bRight) {
      
      return aTop > bBottom || aBottom < bTop || 
        aLeft > bRight || aRight < bLeft;
    }

  }

  // The magnet nodeData do not move. 
  // It stays under the bottom of the bounding box.

  function magnetNodeForNode(node) {
    var magnet = {
      name: 'magnet',
      fixed: true,
    };
    if (opts.useRectForCollision) {
      magnet.x = node.x;
      magnet.y = h + 20;
      magnet.attrs = {
        width: node.attrs.width,
        height: 20,
      }
    }
    else {
      magnet.x = node.x;
      magnet.y = h + r + 20
    }
    return magnet;
  }

  function updateX(d) {
    if (!d.fixed) {
      if (opts.useRectForCollision) {
        d.x = Math.max(0, Math.min(w - d.attrs.width, d.x));
      }
      else {
        d.x = Math.max(0, Math.min(w - r, d.x));
      }
    }
    return d.x;
  }

  function updateY(d) {
    if (!d.fixed) {
      if (opts.useRectForCollision) {
      }
      else {
        d.y = Math.max(0, Math.min(h - d.attrs.height, d.y));
      }
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
    add: add,
    render: render
  };
}
