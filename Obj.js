/**
 * Created by army8735 on 2018/8/28.
 */

'use strict';

const migi = require('migi');

const util = migi.util;
const encodeHtml = util.encodeHtml;
const stringify = util.stringify;
const Element = migi.Element;

let joinArray = util.joinArray = function(arr, prop) {
  var res = '';
  for(var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    if(Array.isArray(item)) {
      res += joinArray(item);
    }
    else if(item instanceof Element) {
      res += prop ? encodeHtml(item.toString(), prop) : item.toString();
    }
    else if(item && item.str) {
      res += prop ? encodeHtml(item.str, prop) : item.str;
    }
    else if(item instanceof Obj) {
      res += item.toString(prop);
    }
    else {
      res += encodeHtml(stringify(item), prop);
    }
  }
  return res;
};

let joinSourceArray = util.joinSourceArray = function(arr) {
  var res = '';
  for(var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    if(Array.isArray(item)) {
      res += joinSourceArray(item);
    }
    else if(item && item.str) {
      res += stringify(item.str);
    }
    else {
      res += stringify(item);
    }
  }
  return res;
};

function Obj(k, cb, single, vBind) {
  this.k = k;
  this.cb = cb;
  this.single = single;
  this.vBind = vBind;
  this.setV(cb());
}

Obj.prototype.setV = function(v) {
  this.v = v;
};

Obj.prototype.toString = function(prop) {
  if(Array.isArray(this.v)) {
    return util.joinArray(this.v, prop);
  }
  if(this.v && this.v.str) {
    return this.v.str;
  }
  var s = util.stringify(this.v);
  if(prop) {
    return util.encodeHtml(s, prop);
  }
  return util.encodeHtml(s);
};

Obj.prototype.toSourceString = function() {
  if(Array.isArray(this.v)) {
    return util.joinSourceArray(this.v);
  }
  return util.stringify(this.v);
};

Obj.prototype.update = function(ov) {
  var nv = this.cb();
  if(!util.equal(ov, nv)) {
    this.setV(nv);
    return true;
  }
};

module.exports = Obj;
