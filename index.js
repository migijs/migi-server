/**
 * Created by army8735 on 2018/1/5.
 */

'use strict';

const migi = require('migi');
const Component = require('./Component');

const Obj = migi.Obj;
const attr = migi.attr;
const util = migi.util;
const selfClose = migi.selfClose;

migi.Component = Component;

function render(element) {
  return element.str;
}

function createCp(cp, props, children) {
  let c = new cp(migi.uid++, props, children);
  return c.toString();
}

function createVd(name, props = [], children = [], uid = migi.uid++) {
  let res = {};
  let str = '<' + name;
  let dangerouslySetInnerHTML;
  props.forEach(function(prop) {
    let k = prop[0];
    let v = prop[1];
    // 忽略事件
    if(/^on[a-zA-Z]/.test(k)) {}
    //Obj类型
    else if(v instanceof Obj) {
      let s = v.toString(true);
      //忽略特殊html不转义
      if(k === 'dangerouslySetInnerHTML') {
        dangerouslySetInnerHTML = s;
        return;
      }
      if(k === 'className') {
        k = 'class';
      }
      else if(k === 'htmlFor') {
        k = 'for';
      }
      let special = attr.special(name, k);
      switch(special) {
        case attr.RENDER_EXIST:
          if(v.v) {
            str += ' ' + k + '="' + s + '"';
          }
          break;
        default:
          str += ' ' + k + '="' + s + '"';
          break;
      }
    }
    else {
      let s = Array.isArray(v) ? util.joinSourceArray(v) : util.stringify(v);
      if(k === 'dangerouslySetInnerHTML') {
        dangerouslySetInnerHTML = s;
        return;
      }
      if(k === 'className') {
        k = 'class';
      }
      else if(k === 'htmlFor') {
        k = 'for';
      }
      let special = attr.special(name, k);
      switch(special) {
        case attr.RENDER_EXIST:
          if(v) {
            str += ' ' + k + '="' + s + '"';
          }
          break;
        default:
          str += ' ' + k + '="' + s + '"';
          break;
      }
    }
  });
  str += ' migi-uid="' + uid + '"';
  //自闭合标签特殊处理
  if(selfClose.hasOwnProperty(name)) {
    str += '/>';
    res.str = str;
    return res;
  }
  str += '>';
  //有dangerouslySetInnerHTML直接返回
  if(dangerouslySetInnerHTML) {
    str += dangerouslySetInnerHTML;
  }
  //渲染children
  else {
    children.forEach(function(child) {
      str += renderChild(child);
    });
  }
  str +='</' + name + '>';
  res.str = str;
  return res;
}

function renderChild(child) {
  if(Array.isArray(child)) {
    let s = '';
    child.forEach(function(item) {
      s += renderChild(item);
    });
    return s;
  }
  else if(child.str) {
    return child.str;
  }
  return util.encodeHtml(util.stringify(child));
}

migi.preRender = migi.render = render;
migi.createCp = createCp;
migi.createVd = createVd;

module.exports = migi;
