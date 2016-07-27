<h1 align="center">Dynamica</h1>
<h4 align="center">Goddess of animations</h2>
<p align="center">
  <a href='https://travis-ci.org/broadsw0rd/dynamica'>
    <img src='https://travis-ci.org/broadsw0rd/dynamica.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://coveralls.io/github/broadsw0rd/dynamica?branch=master'>
    <img src='https://coveralls.io/repos/github/broadsw0rd/dynamica/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href="https://www.bithound.io/github/broadsw0rd/dynamica">
    <img src="https://www.bithound.io/github/broadsw0rd/dynamica/badges/score.svg" alt="bitHound Overall Score">
  </a>
  <a href="https://github.com/feross/standard" target="_blank">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat" alt="js-standard-style"></img>
  </a>
</p>

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Development](#development)

## Features

- Simple - [103 LOC](https://github.com/broadsw0rd/dynamica/blob/master/src/dynamica.js#L103)
- Lightweight - [1.47 KB](https://github.com/broadsw0rd/dynamica/blob/master/dist/dynamica.min.js)
- Well tested - [100% code coverage](https://coveralls.io/github/broadsw0rd/dynamica?branch=master)
- Built for any environment - HTML, CSS, Canvas, React, etc...
- Designed with performance in mind and reviewed with [IRHydra](http://mrale.ph/irhydra/2/)

## Install

Download [dev](https://rawgit.com/broadsw0rd/dynamica/master/dist/dynamica.js) or [prod](https://rawgit.com/broadsw0rd/dynamica/master/dist/dynamica.min.js) version and put it in your html

```html
<script src="vendor/dynamica.min.js"></script>
```

## Usage

```js
// start the animation digest
Animation.digest()

var target = document.getElementById('target')

// create animation instance
var animation = new Animation({
  duration: 10 * 1000,
  handler: function(t) {
    // animation implementation
    target.textContent = t.toFixed(5)
  }
})

// start the animation
animation.start()
```

## Examples

- **[All](http://codepen.io/collection/nZOBdk/)**
- [Basic number animation](http://codepen.io/broadsw0rd/pen/zBNJvo)
- [Basic motion animation](http://codepen.io/broadsw0rd/pen/qNRMjp)
- [Custom easing](http://codepen.io/broadsw0rd/pen/LZxJjQ)
- [Animation queue](http://codepen.io/broadsw0rd/pen/ezgLGB)
- [Parallel animations](http://codepen.io/broadsw0rd/pen/NArpzK)

## API

### `Animation.digest()`

### `Animation.animate(time)`

### `Animation#constructor({ duration, handler, easing })`

### `Animation#start()`

### `Animation#complete()`

### `Animation#cancel()`

### `Animation#queue(animation)`

### `Animation#dequeue(animation)`

### `Animation#started()`

## Development

Command | Description
--------| -----------
`npm run check` | Check standard code style by [snazzy](https://www.npmjs.com/package/snazzy)
`npm run test` | Run tests by [ava](https://github.com/sindresorhus/ava) and compute code coverage by [nyc](https://github.com/bcoe/nyc)
`npm run build` | Wrap source code in [UMD](https://github.com/umdjs/umd) by [rollup](http://rollupjs.org/)
`npm run min` | Minify code by [UglifyJS](https://github.com/mishoo/UglifyJS)
