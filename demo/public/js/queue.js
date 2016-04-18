(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('queue', factory) :
  (global.queue = factory());
}(this, function () { 'use strict';

  var slice = [].slice;
  var running = {};
  function noop() {}

  function queue(parallelism) {
    var q,
        tasks = [],
        started = 0, // number of tasks that have been started (and perhaps finished)
        active = 0, // number of tasks currently being executed (started but not finished)
        remaining = 0, // number of tasks not yet finished
        popping, // inside a synchronous task callback?
        error = null,
        callback = noop,
        callbackAll;

    parallelism = arguments.length ? +parallelism : Infinity;

    function pop() {
      while (popping = started < tasks.length && active < parallelism) {
        var i = started++,
            t = tasks[i],
            j = t.length - 1,
            c = t[j];
        tasks[i] = running;
        ++active;
        t[j] = finished(i);
        c.apply(null, t);
      }
    }

    function finished(i) {
      return function(e, r) {
        if (tasks[i] !== running) throw new Error;
        tasks[i] = null;
        --active;
        if (error != null) return;
        if (e != null) {
          error = e; // ignore new tasks and squelch active callbacks
          started = remaining = NaN; // stop queued tasks from starting
          notify();
        } else {
          tasks[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function check() {
      if (callback !== noop) throw new Error;
    }

    function notify() {
      if (error != null) callback(error);
      else if (callbackAll) callback(error, tasks);
      else callback.apply(null, [error].concat(tasks));
    }

    return q = {
      defer: function(f) {
        check();
        if (!error) {
          var t = slice.call(arguments, 1);
          t.push(f);
          tasks.push(t);
          ++remaining;
          pop();
        }
        return q;
      },
      await: function(f) {
        check();
        callback = f, callbackAll = false;
        if (!remaining) notify();
        return q;
      },
      awaitAll: function(f) {
        check();
        callback = f, callbackAll = true;
        if (!remaining) notify();
        return q;
      }
    };
  }

  queue.version = "1.1.0";

  return queue;

}));