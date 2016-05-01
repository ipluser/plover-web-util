'use strict';


const debug = require('debug')('plover-web-util:plugin');


module.exports = function(app) {
  const config = app.settings.web || {};

  installKoaUtillity(app, config);

  require('./web/query')(app);
};


function installKoaUtillity(app, config) {
  install(app, 'koa-favicon', config.favicon);
  install(app, 'koa-response-time', config.rtime);
  install(app, 'koa-conditional-get', config.conditional);
  install(app, 'koa-etag', config.etag);
}


function install(app, name, config) {
  if (!config) {
    return;
  }

  debug('install %s: %o', name, config);
  var fn = require(name);
  var mw = fn(config);
  mw.$name = name;
  app.addMiddleware(mw, 0);
}
