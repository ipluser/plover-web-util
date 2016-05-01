'use strict';


const pathUtil = require('path');


module.exports = {
  applicationRoot: pathUtil.join(__dirname, '..'),

  web: {
    favicon: pathUtil.join(__dirname, '../public/favicon.ico'),
    rtime: {},
    conditional: {},
    etag: {}
  }
};

