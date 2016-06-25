(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Animation = factory());
}(this, function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var Animation = function () {
    createClass(Animation, null, [{
      key: "add",
      value: function add(animation) {
        Animation.instances.push(animation);
      }
    }, {
      key: "remove",
      value: function remove(animation) {
        var idx = indexOf(Animation.instances, animation);
        if (idx !== -1) {
          Animation.instances.splice(idx, 1);
        }
      }
    }, {
      key: "animate",
      value: function animate(time) {
        for (var i = 0, animation; i < Animation.instances.length; i++) {
          animation = Animation.instances[i];
          animation.animate(time);
        }
      }
    }]);

    function Animation(_ref) {
      var duration = _ref.duration;
      var handler = _ref.handler;
      var easing = _ref.easing;
      classCallCheck(this, Animation);

      this.startTime = 0;
      this.duration = duration;
      this.handler = handler || noop;
      this.easing = easing || id;
      this.next = [];
    }

    createClass(Animation, [{
      key: "start",
      value: function start() {
        Animation.add(this);
        this._started = true;
      }
    }, {
      key: "animate",
      value: function animate(time) {
        this.startTime = this.startTime || time;
        time = (time - this.startTime) / this.duration;
        if (time < 1) {
          this.handler(this.ease(time));
        } else {
          this.complete();
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        this.cancel();
        this.handler(1);
        for (var i = 0, next; i < this.next.length; i++) {
          next = this.next[i];
          next.start();
        }
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.startTime = 0;
        Animation.remove(this);
        this._started = false;
      }
    }, {
      key: "queue",
      value: function queue(animation) {
        this.next.push(animation);
      }
    }, {
      key: "dequeue",
      value: function dequeue(animation) {
        var idx = indexOf(this.next, animation);
        if (idx !== -1) {
          this.next.splice(idx, 1);
        }
      }
    }, {
      key: "started",
      value: function started() {
        return this._started;
      }
    }]);
    return Animation;
  }();

  Animation.instances = [];

  return Animation;

}));