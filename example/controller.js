((function createController() {
  var gravitybox = createGravityBox({
    root: d3.select('#ball-layer'),
    width: 400,
    height: 500,
    r: 20,
    nodeClass: 'node',
    nodeElementName: 'circle',
    xAttr: 'cx',
    yAttr: 'cy'
  });

  var fill = d3.scale.category20();

  function makeNode(i) { 
    var color = fill(~~(Math.random() * 20));
    return {
      x: ~~(Math.random() * 400),
      y: 0,
      attrs: {
        r: 20
      },
      styles: {
        fill: color,
        stroke: d3.rgb(color).darker()
      }
    };
  }
  var nodes = d3.range(0).map(makeNode);
  gravitybox.add(nodes);
  gravitybox.render();

  var wavesUnleashed = 0;
  var intervalKey = setInterval(function unleashMore() {
    if (wavesUnleashed > 1) {
      clearInterval(intervalKey);
    }
    var nextWave = d3.range(50).map(makeNode);
    gravitybox.add(nextWave);
    gravitybox.render();
    wavesUnleashed += 1;
  },
  1500);

})());
