# migi-server

`migi-server`采用String-Based替代Virtual-Dom，用以提升`migi`在服务端模板渲染的性能，并且保持接口简单和一致。

[![NPM version](https://badge.fury.io/js/migi-server.png)](https://npmjs.org/package/migi-server)
[![Build Status](https://travis-ci.org/migijs/migi-server.svg?branch=master)](https://travis-ci.org/migijs/migi-server)
[![Coverage Status](https://coveralls.io/repos/migijs/migi-server/badge.png)](https://coveralls.io/r/migijs/migi-server)
[![Dependency Status](https://david-dm.org/migijs/migi-server.png)](https://david-dm.org/migijs/migi-server)

## INSTALL
```
npm install migi-server
```

# License
[MIT License]

#Benchmark

migi x 13,752 ops/sec ±15.82% (66 runs sampled)\
migi-server x 39,949 ops/sec ±18.78% (77 runs sampled)\
Fastest is migi-server