'use strict';


const qs = require('../../lib/util/qs');


describe('util/qs', function() {
  const tests = [
    'a=1&b=2', { a: '1', b: '2' },
    'a=1&a=2', { a: '2' }
  ];


  function addTest(src, dst) {
    it(src, function() {
      qs.parse(src).should.eql(dst);
    });
  }

  for (let i = 0, c = tests.length / 2; i < c; i++) {
    const src = tests[i * 2];
    const dst = tests[i * 2 + 1];
    addTest(src, dst);
  }
});
