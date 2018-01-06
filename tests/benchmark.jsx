/**
 * Created by army8735 on 2018/1/6.
 */

'use strict';

const Benchmark = require('benchmark');

let suite = new Benchmark.Suite;

let migi = require('migi');

// add tests
suite.add('migi', function() {
  class Component extends migi.Component {
    constructor(...data) {
      super(...data);
    }
    render() {
      return <div>
        <p>1</p>
        <span>2</span>
        <strong>3</strong>
      </div>;
    }
  }
  migi.preRender(<Component/>);
})
.add('migi-server', function() {
  class Component extends migi.Component {
    constructor(...data) {
      super(...data);
    }
    render() {
      return <div>
        <p>1</p>
        <span>2</span>
        <strong>3</strong>
      </div>;
    }
  }
  migi.preRender(<Component/>);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
  migi = require('../');
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();
