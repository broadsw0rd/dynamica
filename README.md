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

- Simple - [138 LOC](https://github.com/broadsw0rd/dynamica/blob/master/src/dynamica.js#L138)
- Lightweight - [1.7 KB](https://github.com/broadsw0rd/dynamica/blob/master/dist/dynamica.min.js)
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
requestAnimationFrame(function loop (t) {
  Animation.animate(t)
  requestAnimationFrame(loop)
})

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
- [Countdown](http://codepen.io/broadsw0rd/pen/VjBBkR)

## API

#### `Animation.animate(time)`

Animatie all started animation by single call. This guarantees full animation synchronization. In other words two different animations with same duration and start time will be completed in same time. Recommended to use [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), but you can use `setTimeout`, `setInterval` or even [raf](https://www.npmjs.com/package/raf)

```js
requestAnimationFrame(function loop (t) {
  Animation.animate(t)
  requestAnimationFrame(loop)
})
```

#### `Animation#constructor(options)`

**Options**

Name | Description | Default | Required
---- | ----------- | ------- | --------
`duration` | | | +
`handler` | | `(t) => {}` | 
`easing` | | `t => t` | 
`onstart` | | `() => {}` |
`oncancel` | | `() => {}` | 
`oncomplete` | | `() => {}` | 

#### `Animation#start()`

Start the animation. First tick will be on the next animation frame. Call `onstart` callback

#### `Animation#complete()`

Immediately complete the animation and starts next animation in the queue. This means that `handler` callback will be called with `t = 1`. Next animations will start on the next animation frame. Call `oncomplete` callback

#### `Animation#cancel()`

Immediately cancel animation. Animations in the queue **will not be started**. Call `oncancel` callback

#### `Animation#queue(animation)`

Puts animation to the queue. If you put several animation to the queue, all these animation will start in same time after source animation completion. [Animation queue](http://codepen.io/broadsw0rd/pen/ezgLGB) example

#### `Animation#dequeue(animation)`

Remove passed animation from the queue. So you have full control over animations queues

#### `Animation#started()`

Indicates that animation has started or not

## Development

Command | Description
------- | -----------
`npm run check` | Check standard code style by [snazzy](https://www.npmjs.com/package/snazzy)
`npm run test` | Run tests by [ava](https://github.com/sindresorhus/ava) and compute code coverage by [nyc](https://github.com/bcoe/nyc)
`npm run build` | Wrap source code in [UMD](https://github.com/umdjs/umd) by [rollup](http://rollupjs.org/)
`npm run min` | Minify code by [UglifyJS](https://github.com/mishoo/UglifyJS)
