var test = require('ava')
var sinon = require('sinon')

var Animation = require('../dist/dynamica.js')

test.beforeEach(function (t) {
  Animation.instances = []
})

test('`Animation` should be defined', function (t) {
  t.truthy(Animation)
})

test('`Animation#constructor()` should create new animation instance', function (t) {
  var animation = new Animation({
    duration: 1000
  })

  t.true(animation instanceof Animation)
  t.is(animation.startTime, 0)
  t.is(animation.duration, 1000)
  t.true(animation.handler instanceof Function)
  t.true(animation.ease instanceof Function)
  t.true(animation.next instanceof Array)
  t.throws(() => Animation({ duration: 1000 }))
})

test('`Animation#constructor()` should throw error if duration not passed', function (t) {
  function createAnimation () {
    return new Animation()
  }

  t.throws(createAnimation)
})

test('`Animation#start()` should start the animation', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  animation.start()

  t.is(Animation.instances.length, 1)
  t.not(Animation.instances.indexOf(animation), -1)
})

test('`Animation#start()` should call onstart callback', function (t) {
  var animation = new Animation({
    duration: 1000,
    onstart: function () {}
  })

  var onstart = sinon.spy(animation, 'onstart')

  animation.start()
  t.is(onstart.callCount, 1)
})

test('`Animation#cancel()` should stop the animation', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  animation.start()
  animation.cancel()

  t.is(Animation.instances.length, 0)
  t.is(Animation.instances.indexOf(animation), -1)

  t.notThrows(() => animation.cancel())
})

test('`Animation#cancel()` should call oncancel callback', function (t) {
  var animation = new Animation({
    duration: 1000,
    oncancel: function () {}
  })

  var oncancel = sinon.spy(animation, 'oncancel')

  animation.cancel()
  t.is(oncancel.callCount, 1)
})

test('`Animation#queue()` should add animation to the queue', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  var next = new Animation({
    duration: 1000
  })
  animation.queue(next)

  t.is(animation.next.length, 1)
  t.not(animation.next.indexOf(next), -1)
})

test('`Animation#dequeue()` should remove animation from the queue', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  var next = new Animation({
    duration: 1000
  })
  animation.queue(next)
  animation.dequeue(next)

  t.is(animation.next.length, 0)
  t.is(animation.next.indexOf(next), -1)

  t.notThrows(() => animation.dequeue(next))
})

test('`Animation#started()` should indicate animation status', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  animation.start()

  t.true(animation.started())

  animation.cancel()
  t.false(animation.started())
})

test('`Animation#complete()` should immediately complete the animation', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  var next = new Animation({
    duration: 1000
  })
  animation.queue(next)
  var handler = sinon.spy(animation, 'handler')
  animation.complete()

  t.true(handler.getCall(0).calledWith(1))
  t.true(next.started())
})

test('`Animation.animate()` should animate the animation', function (t) {
  var animation = new Animation({
    duration: 1000
  })
  var handler = sinon.spy(animation, 'handler')
  var ease = sinon.spy(animation, 'ease')
  var time = Date.now()
  animation.start()
  Animation.animate(time)

  t.is(animation.startTime, time)
  t.true(handler.getCall(0).calledWith(0))
  t.true(ease.getCall(0).calledWith(0))
  t.is(ease.getCall(0).returnValue, 0)

  Animation.animate(time + 500)

  t.true(handler.getCall(1).calledWith(0.5))
  t.true(ease.getCall(1).calledWith(0.5))
  t.is(ease.getCall(1).returnValue, 0.5)

  Animation.animate(time + 1100)

  t.true(handler.getCall(2).calledWith(1))
})
