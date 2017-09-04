(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Animation = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var performanceNow$1 = createCommonjsModule(function (module) {
// Generated by CoffeeScript 1.12.2
/* istanbul ignore next */
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(commonjsGlobal);


});

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

var Animation = function Animation (options) {
  var ref = options || {};
  var duration = ref.duration;
  var handler = ref.handler;
  var ease = ref.ease;
  var onstart = ref.onstart;
  var oncancel = ref.oncancel;
  var oncomplete = ref.oncomplete;

  if (isNaN(duration)) {
    throw Error('`duration` should be defined, check https://github.com/broadsw0rd/dynamica#api')
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
};

Animation.add = function add (animation) {
  Animation.instances.push(animation);
};

Animation.remove = function remove (animation) {
  var idx = indexOf(Animation.instances, animation);
  if (idx !== -1) {
    Animation.instances.splice(idx, 1);
  }
};

Animation.animate = function animate (time) {
  var animations = Animation.instances.concat();
  for (var i = 0, animation; i < animations.length; i++) {
    animation = animations[i];
    animation.animate(time);
  }
};

Animation.prototype.start = function start (startTime) {
    if ( startTime === void 0 ) startTime = performanceNow$1();

  Animation.add(this);
  this._started = true;
  this.startTime = startTime;
  this.onstart && this.onstart();
};

Animation.prototype.animate = function animate (time) {
  var t = (time - this.startTime) / this.duration;
  if (t < 1) {
    this.handler(this.ease(t));
  } else {
    this.complete(time);
  }
};

Animation.prototype.complete = function complete (time) {
    var this$1 = this;
    if ( time === void 0 ) time = performanceNow$1();

  if (!this.started()) { return }

  this.remove();
  this.handler(1);
  this.oncomplete && this.oncomplete();
  for (var i = 0, next; i < this.next.length; i++) {
    next = this$1.next[i];
    next.start(Math.min(this$1.startTime + this$1.duration, time));
    next.animate(time);
  }
};

Animation.prototype.remove = function remove () {
  Animation.remove(this);
  this._started = false;
};

Animation.prototype.cancel = function cancel () {
  if (!this.started()) { return }

  this.remove();
  this.oncancel && this.oncancel();
};

Animation.prototype.queue = function queue (animation) {
  this.next.push(animation);
};

Animation.prototype.dequeue = function dequeue (animation) {
  var idx = indexOf(this.next, animation);
  if (idx !== -1) {
    this.next.splice(idx, 1);
  }
};

Animation.prototype.started = function started () {
  return this._started
};

Animation.instances = [];

return Animation;

})));
