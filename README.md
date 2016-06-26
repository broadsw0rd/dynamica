<h1 align="center">Dynamica</h1>
<h4 align="center">Cute animations.</h2>
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
- [Install & Usage](#install--usage)
- [Examples](#examples)
- [API](#api)
- [Development](#development)

## Features

- Simple - [91 LOC](https://github.com/broadsw0rd/dynamica/blob/master/src/dynamica.js#L91)
- Lightweight - [1.36 KB](https://github.com/broadsw0rd/dynamica/blob/master/dist/dynamica.min.js)
- Built for [any](https://github.com/broadsw0rd/dynamica/blob/master/dist/dynamica.js#L1) environment
- Well tested
- Designed with performance in mind and reviewed with [IRHydra](http://mrale.ph/irhydra/2/)

## Install & Usage

## Examples

## API

### `Animation.amimate(time)`

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
