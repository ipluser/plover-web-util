'use strict';


const koa = require('koa');
const request = require('supertest');


describe('web/query', function() {
  const app = koa();
  require('../../lib/web/query')(app);
  app.use(function* () {
    this.body = this.query;
  });
  const agent = request.agent(app.callback());

  const tests = {
    'a=1&b=2': { a: '1', b: '2' }
  };

  Object.keys(tests).forEach(key => {
    const value = tests[key];
    it(key, () => {
      return agent.get('/?' + key).expect(value);
    });
  });
});
