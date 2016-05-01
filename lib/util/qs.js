'use strict';


const qs = require('querystring');


/**
 * parse querystring，支持嵌套数据类型
 * 类似于[qs](https://github.com/ljharb/qs)，但主要有以下区别
 * 1. 由于只用于nodejs querystring的解析，所以功能不需要这么强大
 * 2. 只支持明确的形如`a[]`的数组类型，不支持`a=1&a=2`这种数组类型
 *
 * @param {String}  str   - querystring
 * @return {Object}       - parsed query
 */
exports.parse = function(str) {
  const obj = qs.parse(str);
  const result = {};

  Object.keys(obj).forEach(name => {
    const v = obj[name];
    // `a=1&a=2`这种形式会被`querystring`转成数组
    if (Array.isArray(v)) {
      v.forEach(item => {
        setItem(result, name, item);
      });
    } else {
      setItem(result, name, v);
    }
  });

  return result;
};


function setItem(result, name, value) {
  name = name.replace(/]$/, '');  // 去掉最后一个可能的]

  // people[name][2].color -> ['people', '2', 'color']
  const props = name.split(/]?(?:\.|\[)/);  // 分解出属性列表

  regular(props);

  let o = result;
  for (let i = 0, c = props.length; i < c; i++) {
    const prop = props[i];

    // 最后一个直接设置
    if (i === c - 1) {
      if (prop === -1) {
        o.push(value);
      } else {
        o[prop] = value;
      }
      break;
    }

    if (!o[prop] || typeof o !== 'object') {
      // 容器为空，需要初始化一下
      // 要看下一个是数字还是字符串来决定容器数据类型
      const next = props[i + 1];
      o[prop] = typeof next === 'number' ? [] : {};
    }

    o = o[prop];
  }
}


const rNum = /^\d+$/;

function regular(props) {
  for (let i = 0, c = props.length; i < c; i++) {
    const prop = props[i];
    if (!prop) {
      props[i] = -1;  // 数组元素添加
    } else if (rNum.test(prop)) {
      props[i] = +prop; // 转换成number
    }
  }
}
