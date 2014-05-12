((function createController() {
  var gravitybox = createGravityBox({
    root: d3.select('#ball-layer'),
    width: 400,
    height: 500,
    nodeClass: 'node',
    nodeElementName: 'circle',
    xAttr: 'cx',
    yAttr: 'cy'
  });

  var fill = d3.scale.category20();
  var nodes = d3.range(100).map(function makeNode(i) { 
    var color = fill(~~(Math.random() * 20));
    return {
      x: ~~(Math.random() * 400),
      y: 0,
      attrs: {
        r: 15
      },
      styles: {
        fill: color,
        stroke: d3.rgb(color).darker()
      }
    };
  });

  gravitybox.render(nodes);
})());
