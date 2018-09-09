/**
 * Created by army8735 on 2018/1/6.
 */

'use strict';

const migi = require('migi');

const Obj = migi.Obj;
const util = migi.util;

function arr2hash(arr) {
  let hash = {};
  for(let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if(Array.isArray(item)) {
      hash[item[0]] = item[1];
    }
    else {
      for(let list = Object.keys(item), j = list.length - 1; j >= 0; j--) {
        let k = list[j];
        hash[k] = item[k];
      }
    }
  }
  return hash;
}
function hash2arr(hash) {
  let arr = [];
  for(let list = Object.keys(hash), i = 0, len = list.length; i < len; i++) {
    let k = list[i];
    arr.push([k, hash[k]]);
  }
  return arr;
}
function spread(arr) {
  for(let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if(!Array.isArray(item)) {
      let temp = [];
      for(let list = Object.keys(item), j = 0, len = list.length; j < len; j++) {
        let k = list[j];
        temp.push([k, item[k]]);
      }
      arr.splice(i, 1, ...temp);
    }
  }
  return arr;
}

function Component(uid, props, children) {
  if(Array.isArray(uid)) {
    [uid, props, children] = [...uid];
  }
  props = props || [];
  children = children || [];
  let self = this;
  // 构建工具中都是arr，手写可能出现hash情况
  if(Array.isArray(props)) {
    self.props = arr2hash(props);
    self.__props = spread(props);
  }
  else {
    self.props = props;
    self.__props = hash2arr(props);
  }
  self.__uid = uid;
  self.__children = children;
  self.__bindHash = {};

  self.__props.forEach(function(item, index) {
    let k = item[0];
    let v = item[1];
    // 忽略onXXX和on-XXX
    if(/^on[a-zA-Z]/.test(k)) {}
    else if(/^on-[a-zA-Z\d_]/.test(k) && util.isFunction(v)) {}
    else if(k === 'model') {}
    else if(v instanceof Obj) {
      self.__props[index] = v.v;
      self.props[k] = v.v;
    }
  });
}

Component.prototype.render = function() {
  return migi.createVd('div', this.__props, this.children, this.__uid);
};

Component.prototype.toString = function() {
  return this.render();
};

Component.prototype.__initBind = function(name) {
  return !this.__bindHash.hasOwnProperty(name);
};

Component.prototype.__getBind = function(name) {
  return this.__bindHash[name];
};

Component.prototype.__setBind = function(name, v) {
  this.__bindHash[name] = v;
};

Component.prototype.__data
  = Component.prototype.on
  = Component.prototype.once
  = Component.prototype.off
  = Component.prototype.emit
  = function() {};

Object.defineProperties(Component.prototype, {
  model: {
    get: function() {
      return this.__model;
    },
    set: function(v) {
      this.__model = v;
    },
  },
  children: {
    get: function() {
      return this.__children;
    },
  },
});

module.exports = Component;
