/**
 * Created by army8735 on 2018/1/5.
 */

'use strict';

const expect = require('expect.js');
require('./hack');

let migi = require('migi');

let div = <div/>.toString();
migi.resetUid();

let div1 = <div>aaa</div>.toString();
migi.resetUid();

let div2 = <div>{ 'bbb' }</div>.toString();
migi.resetUid();

let div3 = <div>{ [1, 2] }</div>.toString();
migi.resetUid();

let div4 = <div>{}</div>.toString();
migi.resetUid();

let div5 = <div><span/></div>.toString();
migi.resetUid();

let div6 = <div>1<span>2</span>3</div>.toString();
migi.resetUid();

let div7 = <div>{ 'a' } { 'b' }</div>.toString();
migi.resetUid();

let img = <img/>;
migi.resetUid();

class Component extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div>1</div>;
  }
}
let cp = <Component/>.toString();
migi.resetUid();

class Component1 extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div test="1" test1={ this.props.a }>123</div>;
  }
}
let cp1 = <Component1 a={ 2 }/>.toString();
migi.resetUid();

class Component2 extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div>
      {
        this.children.map(function(item) {
          return item;
        })
      }
    </div>;
  }
}
let cp2 = <Component2>{ [1, 2] }</Component2>.toString();
migi.resetUid();

class Component3 extends migi.Component {
  constructor(...data) {
    super(...data);
  }
}
let cp3 = <Component3/>.toString();
migi.resetUid();

class Component4 extends migi.Component {
  constructor(...data) {
    super(...data);
    this.a = 123;
  }
  @bind a
  render() {
    return <div>{ this.a }</div>;
  }
}
let cp4 = <Component4/>.toString();
migi.resetUid();

class Component5 extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div>
      {
        [1,2,3].map(function(item) {
          return <span>{ item }</span>;
        })
      }
    </div>;
  }
}
let cp5 = <Component5/>.toString();
migi.resetUid();

migi = require('../');

describe('vd', function() {
  beforeEach(function() {
    migi.resetUid();
  });
  it('div', function() {
    let res = migi.render(<div/>);
    expect(res).to.eql(div);
  });
  it('div1', function() {
    let res = migi.render(<div>aaa</div>);
    expect(res).to.eql(div1);
  });
  it('div2', function() {
    let res = migi.render(<div>{ 'bbb' }</div>);
    expect(res).to.eql(div2);
  });
  it('div3', function() {
    let res = migi.render(<div>{ [1, 2] }</div>);
    expect(res).to.eql(div3);
  });
  it('div4', function() {
    let res = migi.render(<div>{}</div>);
    expect(res).to.eql(div4);
  });
  it('div5', function() {
    let res = migi.render(<div><span/></div>);
    expect(res).to.eql(div5);
  });
  it('div6', function() {
    let res = migi.render(<div>1<span>2</span>3</div>);
    expect(res).to.eql(div6);
  });
  it('div7', function() {
    let res = migi.render(<div>{ 'a' } { 'b' }</div>);
    expect(res).to.eql(div7);
  });
});

describe('cp', function() {
  beforeEach(function() {
    migi.resetUid();
  });
  it('empty', function() {
    class Component extends migi.Component {
      constructor(...data) {
        super(...data);
      }
      render() {
        return <div>1</div>;
      }
    }
    let res = migi.render(<Component/>);
    expect(res).to.eql(cp);
  });
  it('props', function() {
    class Component1 extends migi.Component {
      constructor(...data) {
        super(...data);
      }
      render() {
        return <div test="1" test1={ this.props.a }>123</div>;
      }
    }
    let res = migi.render(<Component1 a={ 2 }/>);
    expect(res).to.eql(cp1);
  });
  it('children', function() {
    class Component2 extends migi.Component {
      constructor(...data) {
        super(...data);
      }
      render() {
        return <div>
          {
            this.children.map(function(item) {
              return item;
            })
          }
        </div>;
      }
    }
    let res = migi.render(<Component2>{ [1, 2] }</Component2>);
    expect(res).to.eql(cp2);
  });
  it('no overwrite render', function() {
    class Component3 extends migi.Component {
      constructor(...data) {
        super(...data);
      }
    }
    let res = migi.render(<Component3/>);
    expect(res).to.eql(cp3);
  });
  it('bind', function() {
    class Component4 extends migi.Component {
      constructor(...data) {
        super(...data);
        this.a = 123;
      }
      @bind a
      render() {
        return <div>{ this.a }</div>;
      }
    }
    let res = migi.render(<Component4/>);
    expect(res).to.eql(cp4);
  });
  it('nest', function() {
    class Component5 extends migi.Component {
      constructor(...data) {
        super(...data);
      }
      render() {
        return <div>
          {
            [1,2,3].map(function(item) {
              return <span>{ item }</span>;
            })
          }
        </div>;
      }
    }
    let res = migi.render(<Component5/>);
    expect(res).to.eql(cp5);
  });
});
