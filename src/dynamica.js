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
    for (var i = 0, animation; i < Animation.instances.length; i++) {
      animation = Animation.instances[i]
      animation.animate(time)
    }
  }

  constructor ({ duration, handler, easing }) {
    this.startTime = 0
    this.duration = duration
    this.handler = handler || noop
    this.easing = easing || id
    this.next = []
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
