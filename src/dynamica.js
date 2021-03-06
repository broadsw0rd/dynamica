import now from 'performance-now'

function noop () {}

function id (value) {
  return value
}

function indexOf (array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i
    }
  }
  return -1
}

class Animation {
  static add (animation) {
    Animation.instances.push(animation)
  }

  static remove (animation) {
    var idx = indexOf(Animation.instances, animation)
    if (idx !== -1) {
      Animation.instances.splice(idx, 1)
    }
  }

  static animate (time) {
    var animations = Animation.instances.concat()
    for (var i = 0, animation; i < animations.length; i++) {
      animation = animations[i]
      animation.animate(time)
    }
  }

  constructor (options) {
    var {
      duration,
      handler,
      ease,
      onstart,
      oncancel,
      oncomplete
    } = options || {}

    if (isNaN(duration)) {
      throw Error('`duration` should be defined, check https://github.com/broadsw0rd/dynamica#api')
    }

    this.startTime = 0

    this.duration = Number(duration)
    this.handler = handler || noop
    this.ease = ease || id

    this.onstart = onstart || noop
    this.oncancel = oncancel || noop
    this.oncomplete = oncomplete || noop

    this.next = []
    this._started = false
  }

  start (startTime = now()) {
    Animation.add(this)
    this._started = true
    this.startTime = startTime
    this.onstart && this.onstart()
  }

  animate (time) {
    var t = (time - this.startTime) / this.duration
    if (t < 1) {
      this.handler(this.ease(t))
    } else {
      this.complete(time)
    }
  }

  complete (time = now()) {
    if (!this.started()) return

    this.remove()
    this.handler(1)
    this.oncomplete && this.oncomplete()
    for (var i = 0, next; i < this.next.length; i++) {
      next = this.next[i]
      next.start(Math.min(this.startTime + this.duration, time))
      next.animate(time)
    }
  }

  remove () {
    Animation.remove(this)
    this._started = false
  }

  cancel () {
    if (!this.started()) return

    this.remove()
    this.oncancel && this.oncancel()
  }

  queue (animation) {
    this.next.push(animation)
  }

  dequeue (animation) {
    var idx = indexOf(this.next, animation)
    if (idx !== -1) {
      this.next.splice(idx, 1)
    }
  }

  started () {
    return this._started
  }
}

Animation.instances = []

export default Animation
