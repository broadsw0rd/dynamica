<h1 align="center">Dynamica</h1>
<h4 align="center">Goddess of animations</h2>
<p align="center">
  <a href="https://www.npmjs.com/package/dynamica" target="_blank">
    <img src="https://img.shields.io/npm/v/dynamica.svg" alt="NPM version" target="_blank"></img>
  </a>
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

- [Intro](#intro)
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Development](#development)

## Intro

Dynamica is a low-level animation engine library, which provides smooth and exact work of any amount of serial or parallel animations with a simple and flexible API

## Features

- Designed with performance in mind
- Simple - [191 LOC](https://github.com/broadsw0rd/dynamica/blob/master/dist/dynamica.js#L191)
- Lightweight - [2.5 KB](https://github.com/broadsw0rd/dynamica/blob/master/dist/dynamica.min.js)
- Well tested - [100% code coverage](https://coveralls.io/github/broadsw0rd/dynamica?branch=master)
- Built for any environment - HTML, CSS, Canvas, React, etc...

## Install


```
npm install --save dynamica
```

or

Download [dev](https://rawgit.com/broadsw0rd/dynamica/master/dist/dynamica.umd.js) or [prod](https://rawgit.com/broadsw0rd/dynamica/master/dist/dynamica.min.js) version and put it in your html

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
  handler: function (t) {
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

Execution of all animations by a single call. It guarantees full animations' synchronization. In other words, two (or endlessly more) different animations with the same duration and start time will be completed at the same time. Recommended to use [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) or [raf](https://www.npmjs.com/package/raf).

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
`duration` | Animation duration. If not passed, error will thrown | | +
`handler` | Animation implementation | `(t) => {}` | 
`easing` | Animation easing. Check [Custom easing](http://codepen.io/broadsw0rd/pen/LZxJjQ) example | `(t) => t` | 
`onstart` | Called by [`Animation#start()`](#animationstart) | `() => {}` |
`oncancel` | Called by [`Animation#cancel()`](#animationcancel) | `() => {}` | 
`oncomplete` | Called by [`Animation#complete()`](#animationcomplete) | `() => {}` | 

#### `Animation#start()`

Start an animation. First tick will be executed on the next animation frame. This method calls `onstart` callback

#### `Animation#complete()`

Immediately completes the animation and starts next animations from the queue. It means that `handler` callback will be called with `t = 1`. This method calls `oncomplete` callback

#### `Animation#cancel()`

Immediately cancels the animation. Animations in the queue **will not be started**. This method calls `oncancel` callback

#### `Animation#queue(animation)`

Puts animation to the queue. If you put several animations to the queue, all these animations will start at same time with source animation completion. [Animation queue](http://codepen.io/broadsw0rd/pen/ezgLGB) example

#### `Animation#dequeue(animation)`

Removes passed animations from the queue. Provides full control over animations queues

#### `Animation#started()`

Indicates if the animation has been started or not

## Development

Command | Description
------- | -----------
`npm run check` | Check standard code style by [snazzy](https://www.npmjs.com/package/snazzy)
`npm run test` | Run tests by [tape](https://github.com/substack/tape) and compute code coverage by [nyc](https://github.com/bcoe/nyc)
`npm run build` | Wrap source code in [UMD](https://github.com/umdjs/umd) by [rollup](http://rollupjs.org/)
`npm run min` | Minify code by [UglifyJS](https://github.com/mishoo/UglifyJS)
