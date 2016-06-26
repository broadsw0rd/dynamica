import test from 'ava'
import sinon from 'sinon'

import Animation from '../dist/dynamica.js'

test.beforeEach(t => {
  Animation.instances = []
})

test('`Animation` should be defined', t => {
  t.truthy(Animation)
})

test('`Animation#constructor() should create new animation instance`', t => {
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

test('`Animation#start()` should start the animation', t => {
  var animation = new Animation({
    duration: 1000
  })
  animation.start()

  t.is(Animation.instances.length, 1)
  t.not(Animation.instances.indexOf(animation), -1)
})

test('`Animation#cancel()` should stop the animation', t => {
  var animation = new Animation({
    duration: 1000
  })
  animation.start()
  animation.cancel()

  t.is(Animation.instances.length, 0)
  t.is(Animation.instances.indexOf(animation), -1)

  t.notThrows(() => animation.cancel())
})

test('`Animation#queue()` should add animation to the queue', t => {
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

test('`Animation#dequeue()` should remove animation from the queue', t => {
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

test('`Animation#started()` should indicate animation status', t => {
  var animation = new Animation({
    duration: 1000
  })
  animation.start()

  t.true(animation.started())

  animation.cancel()
  t.false(animation.started())
})

test('`Animation#complete()` should immediately complete the animation', t => {
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

test('`Animation.animate()` should animate the animation', t => {
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
