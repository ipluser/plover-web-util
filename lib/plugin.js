'use strict';


const debug = require('debug')('plover-web-util:plugin');


module.exports = function(app) {
  const config = app.settings.web || {};
  if (config.keys) {
    app.server.keys = config.keys;
  }

  require('./web/query')(app);

  installKoaUtillity(app, config);
};


function installKoaUtillity(app, config) {
  install(app, 'koa-favicon', config.favicon);
  install(app, 'koa-response-time', config.rtime);
  install(app, 'koa-conditional-get', config.conditional);
  install(app, 'koa-etag', config.etag);

  install(app, 'koa-bodyparser', config.bodyParser);
}


function install(app, name, config) {
  if (!config) {
    return;
  }

  debug('install %s: %o', name, config);
  const fn = require(name);
  const mw = fn(config);
  mw.$name = name;
  app.addMiddleware(mw, 0);
}
