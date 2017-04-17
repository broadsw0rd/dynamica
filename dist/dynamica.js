(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Animation = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

function noop() {}

function id(value) {
  return value;
}

function indexOf(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
}

var startTime = Date.now();
/* istanbul ignore next */
function now() {
  if (typeof window !== 'undefined' && window.performance != null) {
    return window.performance.now();
  } else {
    return Date.now() - startTime;
  }
}

var Animation = function () {
  Animation.add = function add(animation) {
    Animation.instances.push(animation);
  };

  Animation.remove = function remove(animation) {
    var idx = indexOf(Animation.instances, animation);
    if (idx !== -1) {
      Animation.instances.splice(idx, 1);
    }
  };

  Animation.animate = function animate(time) {
    var animations = Animation.instances.concat();
    for (var i = 0, animation; i < animations.length; i++) {
      animation = animations[i];
      animation.animate(time);
    }
  };

  function Animation(options) {
    classCallCheck(this, Animation);

    var _ref = options || {},
        duration = _ref.duration,
        handler = _ref.handler,
        ease = _ref.ease,
        onstart = _ref.onstart,
        oncancel = _ref.oncancel,
        oncomplete = _ref.oncomplete;

    if (isNaN(duration)) {
      throw Error('`duration` should be defined, check https://github.com/broadsw0rd/dynamica#api');
    }

    this.startTime = 0;

    this.duration = Number(duration);
    this.handler = handler || noop;
    this.ease = ease || id;

    this.onstart = onstart || noop;
    this.oncancel = oncancel || noop;
    this.oncomplete = oncomplete || noop;

    this.next = [];
    this._started = false;
  }

  Animation.prototype.start = function start() {
    var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : now();

    Animation.add(this);
    this._started = true;
    this.startTime = startTime;
    this.onstart && this.onstart();
  };

  Animation.prototype.animate = function animate(time) {
    var t = (time - this.startTime) / this.duration;
    if (t < 1) {
      this.handler(this.ease(t));
    } else {
      this.complete(time);
    }
  };

  Animation.prototype.complete = function complete() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : now();

    if (!this.started()) return;

    this.remove();
    this.handler(1);
    this.oncomplete && this.oncomplete();
    for (var i = 0, next; i < this.next.length; i++) {
      next = this.next[i];
      next.start(Math.min(this.startTime + this.duration, time));
      next.animate(time);
    }
  };

  Animation.prototype.remove = function remove() {
    Animation.remove(this);
    this._started = false;
  };

  Animation.prototype.cancel = function cancel() {
    this.remove();
    this.oncancel && this.oncancel();
  };

  Animation.prototype.queue = function queue(animation) {
    this.next.push(animation);
  };

  Animation.prototype.dequeue = function dequeue(animation) {
    var idx = indexOf(this.next, animation);
    if (idx !== -1) {
      this.next.splice(idx, 1);
    }
  };

  Animation.prototype.started = function started() {
    return this._started;
  };

  return Animation;
}();

Animation.instances = [];

return Animation;

})));
