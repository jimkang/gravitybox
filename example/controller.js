((function createController() {
  var samples = [
    '   // Begin the counter of the passed time',
    ' // label2',
    ' /// Collection of "assassin targets" (network adapters).',
    'function(req, res){});',
    '//   TODO to main',
    ' // per gestire il cambio di ruolo',
    'function_exists(\'drawAdsPlace\') ) drawAdsPlace(array(\'id\' => 1)',
    '-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    ' // Decompose statement',
    '  // A fix for LDAP users. array_merge loses keys...',
    ' //scanning can take ages',
    ' //TODO: DI for cookies and OC_Config',
    'function(dir) {',
    '  // for primary groups',
    'function composeLdapFilter($filterType) {',
    'function prepareFilterForUsersInPrimaryGroup($groupDN, $search = \'\') {',
    'function countUsersInGroup($gid, $search = \'\') {',
    '  // only append colon if there are more entries',
    'function setUp(){',
    'function getMimetype($id) {',
    'function basicOperation($operation, $path, $hooks = array(), $extraParam',
    'function update($path, $time = null) {',
    ' //make sure we have an new empty folder to work in',
    ' // \\x y. y (y x) : N -> (N -> N) -> N',
    ' /// </param>',
    '  //TODO make this cleaner and wrap enqueue in a function',
    ' // When the Fireplace adapter posts to the API it is generating a',
    ' +//    mLocationClient = new LocationClient(this, this, this);',
    'fns = xmalloc_array(unsigned int*, size*sizeof(unsigned int));',
    'unction afterInstallation($keyOfInstalledExtension) {',
    '-// Login account FORM',
    '+//  MOASwitch.m',
    ' // TODO ⚪️ に対して 0.f / 1.f をセット',
    '  // Prepare necessary data for _cli_lowlevel user creation',
    '+//  Copyright (c) 2015年 MOAI. All rights reserved.',
    ' // Owned by the Channel object',
    ' /// Only first invocation has effect.',
    ' /// </summary>',
    ' // do next state, return false if all done',
    'func,    call_destroy_func,    sizeof(int),',
    'fneq ($(NO_SECURE),true)',
    'function<void(grpc::Status, ResponseType *)> on_done):',
    'function<void(grpc::Status, ResponseType *)> on_done)',
    'fn(self))',
    ' // Client recv status',
    ' // Will add threads when ready to execute',
    'function<void(grpc::Status, ResponseType *)> on_done)',
    'var excerptStream = createAnalysisToExcerptStream({',
    'var analysisStream = createAnalysisStream();',
    'createSampleCommitStream({}, function connectPipe(error, sampleCommitStream) {',
    '    sampleCommitStream.pipe(analysisStream);',
    '    analysisStream.pipe(excerptStream);',
    '    done(null, excerptStream);'
  ];

  var colors = [
    'hsla(0, 100%, 50%, 1.0)',
    'hsla(18, 100%, 62%, 1.0)',
    'hsla(48, 100%, 66%, 1)',
    'hsla(123, 59%, 50%, 1)',
    'hsla(219, 90%, 52%, 0.8)',
    'hsla(278, 85%, 55%, 1)',
    'hsla(305, 82%, 69%, 1)',
    'white',
    'hsl(24, 67%, 43%)',
    'hsl(353, 29%, 41%)',
    'hsl(146, 100%, 30%)',
    'hsl(166, 100%, 30%)',
    'hsl(63, 85%, 41%)',
    'hsl(212, 100%, 36%)',
    'hsl(198, 72%, 68%)',
    'hsl(193, 100%, 37%)',
    'hsl(312, 100%, 35%)',
    'hsl(300, 74%, 39%)',
    'hsl(333, 84%, 62%)',
    'hsl(328, 100%, 41%)',
    'hsl(353, 72%, 56%)',
    'hsl(355, 85%, 54%)',
    'hsl(346, 100%, 42%)',
    'hsl(38, 100%, 50%)',
    'hsl(15, 100%, 61%)',
    'hsl(12, 100%, 77%)',
    'hsl(45, 94%, 72%)',
    'hsl(51, 89%, 60%)'
  ];

  var gravitybox = createGravityBox({
    root: d3.select('#ball-layer'),
    width: 1280,
    height: 960,
    r: 25,
    nodeClass: 'tagbox',
    nodeElementName: 'text',
    xAttr: 'x',
    yAttr: 'y',
    processSelection: function setText(d) {
      if (d.attrs && d.attrs.codeText) {
        d3.select(this).text(d.attrs.codeText);        
      }
    },
    rectRecoilFactor: 3.0
  });


  function makeNode(codeText) { 
    var color = colors[~~(Math.random() * colors.length)];

    return {
      x: ~~(Math.random() * 1180),
      y: 0,
      width: codeText.length * 3,
      height: 15,
      attrs: {
        width: codeText.length * 3,
        height: 15,
        codeText: codeText,
        transform: 'rotate(' + ~~(Math.random() * 360) + ')'
      },
      styles: {
        fill: color
      }
    };
  }

  var nodes = samples.slice(0, samples.length/10).map(makeNode);
  gravitybox.add(nodes);
  gravitybox.render();

  var wavesUnleashed = 0;
  var intervalKey = setInterval(function unleashMore() {
    if (wavesUnleashed > 9) {
      clearInterval(intervalKey);
    }
    var nextWave = samples.slice(samples.length/10 * wavesUnleashed)
      .map(makeNode);
    gravitybox.add(nextWave);
    gravitybox.render();
    wavesUnleashed += 1;
  },
  1500);

})());
