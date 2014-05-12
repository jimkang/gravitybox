var assert = require('assert');
var thingFactory = require('../yet-another-module');

//require('approvals').mocha(__dirname + '/approvals');

suite('The basic stuff', function basiSuite() {
  test('Test of thing', 
    function testThing(testDone) {
      testDone();
    }
  );
});
