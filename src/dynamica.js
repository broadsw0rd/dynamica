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

var currentTime
var startTime

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

  /* istanbul ignore next */
  static digest (time) {
    startTime = startTime || Date.now()
    currentTime = startTime + (time | 0)
    Animation.animate(currentTime)
    window.requestAnimationFrame(Animation.digest)
  }

  constructor ({ duration, handler, ease }) {
    this.startTime = 0
    this.duration = duration
    this.handler = handler || noop
    this.ease = ease || id
    this.next = []
    this._started = false
  }

  start () {
    Animation.add(this)
    this._started = true
  }

  animate (time) {
    this.startTime = this.startTime || time
    time = (time - this.startTime) / this.duration
    if (time < 1) {
      this.handler(this.ease(time))
    } else {
      this.complete()
    }
  }

  complete () {
    this.cancel()
    this.handler(1)
    for (var i = 0, next; i < this.next.length; i++) {
      next = this.next[i]
      next.start()
    }
  }

  cancel () {
    this.startTime = 0
    Animation.remove(this)
    this._started = false
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
