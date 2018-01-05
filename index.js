/**
 * Created by army8735 on 2018/1/5.
 */

'use strict';

let migi = require('migi');

function render(element) {
  return element;
}

function createCp(cp, props, children) {}

function createVd(name, props, children) {}

migi.preRender = migi.render = render;
migi.createCp = createCp;
migi.createVd = createVd;

module.exports = migi;
