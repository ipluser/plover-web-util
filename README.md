# plover-web-util


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]


【插件】集成常用web中间件，提供通用web功能。

## Usage
```js
const app = plover({
  web: {
    keys: ['17e6b6bc6129097383dcad4fa1602233'],
    favicon: '',
    rtime: true
  }
});
```

## Options
| Name | Type | Description |
|------|------|-------------|
| keys | String/Array | 设置`cookie keys`，详见 [koa-keys](http://koajs.com/#app-keys-) |
| favicon | String | `favicon`图标的路径，详见 [koa-favicon](https://github.com/koajs/favicon) |
| rtime | Boolean | `Response Header`添加字段`X-Response-Time`显示响应时间，详见 [koa-response-time](https://github.com/koajs/response-time) |
| conditional | Boolean | 缓冲条件请求处理，详见 [koa-conditional-get](https://github.com/koajs/conditional-get) |
| etag | Boolean | 支持`ETag`响应标签，详见 [koa-etag](https://github.com/koajs/etag) |
| bodyParser | Boolean | 解析`request.body`（默认开启），详见 [koa-bodyparser](https://github.com/koajs/bodyparser) |
| cookieSession | Object | 一个简单的基于`cookie`的`session`功能，详见 [koa-session](https://github.com/koajs/session) ｜
| csrf | Object | `CSRF`tokens, 详见 [koa-csrf](https://github.com/koajs/csrf) |

## Others
### query
`query`增强，若使用`querystring`传递多个相同值，最后一个值将覆盖前面的值。

假设访问地址为`http://www.alibaba.com?name=james&name=tomy`，在`controller`中获取的`name`值为`tomy`：

```js
// controller
console.log(this.query.name);  // tomy
```

### params
`params`增强，`params`包括`querystring`和`request.body`的值，如果存在相同值，后者将覆盖前者的值：

**Query String Parameters**

```
name: jame
age: 24
```

**Form Data**

```
name: tomy
address: hangzhou
```

在`controller`中可以通过`this.params`很方便的获取`querystring`和`request.body`的值：

```js
// controller
console.log(this.params.name);  // tomy
console.log(this.params.age);  // 24
console.log(this.params.address);  // hangzhou
```

### assertMethod
添加了`assertMethod`方法，方便验证Http Method：

```js
//
this.ctx.assertMethod('GET');
```

### output charset
可以通过`querystring`传递`_output_charset`参数指定响应输出编码格式。

### security headers
设置安全http相关头，移除了`X-Powered-By`：

| Name | Value |
|------|-------|
| X-XSS-Protection | 1; mode=block |
| X-Content-Type-Options | nosniff |
| X-Download-Options | noopen |
| X-Frame-Options | SAMEORIGN |



[npm-image]: https://img.shields.io/npm/v/plover-web-util.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/plover-web-util
[travis-image]: https://img.shields.io/travis/plover-modules/plover-web-util/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/plover-modules/plover-web-util
[coveralls-image]: https://img.shields.io/codecov/c/github/plover-modules/plover-web-util.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/plover-modules/plover-web-util?branch=master
