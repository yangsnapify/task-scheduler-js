"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (global) {
  var isNode = typeof window === 'undefined';
  var Scheduler = /*#__PURE__*/function () {
    function Scheduler() {
      _classCallCheck(this, Scheduler);
      this.taskId = 0;
      this.tasks = {};
    }

    /**
     * Adds a new task to the scheduler.
     * @param {Function} callbackFunction - The function to execute after the delay.
     * @param {number} delay - The delay in milliseconds before executing the callback function.
     * @param {boolean} recurring - Whether the task should be recurring. If `true`, the task will execute repeatedly at the specified interval.
     */
    return _createClass(Scheduler, [{
      key: "addTask",
      value: function addTask(cb, delay) {
        var recurring = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.taskId++;
        var task = {
          id: this.taskId,
          cb: cb,
          delay: delay,
          recurring: recurring,
          timerId: null,
          _paused: false
        };
        this.tasks[this.taskId] = task;
        this.runTask(task);
        return task;
      }

      /**
       * Runs the task after the delay.
       * @param {Object} task - The task object containing the task details.
       */
    }, {
      key: "runTask",
      value: function runTask(task) {
        var _this = this;
        task.timerId = setTimeout(function () {
          var _runTask2 = function _runTask() {
            if (!task._paused) {
              task.cb();
            }
            if (task.recurring && !task._paused) {
              task.timerId = setTimeout(_runTask2, task.delay);
            } else if (!task.recurring) {
              _this.removeTask(task.id);
            }
          };
          _runTask2();
        }, task.delay);
      }

      /**
       * Removes a task by its ID.
       * @param {number} taskId - The ID of the task to remove.
       */
    }, {
      key: "removeTask",
      value: function removeTask(taskId) {
        if (this.tasks[taskId]) {
          clearTimeout(this.tasks[taskId].timerId);
          delete this.tasks[taskId];
        }
      }

      /**
       * Pauses a task by its ID.
       * @param {number} taskId - The ID of the task to pause.
       */
    }, {
      key: "pauseTask",
      value: function pauseTask(taskId) {
        var task = this.tasks[taskId];
        if (task) {
          clearTimeout(task.timerId);
          task._paused = true;
        }
      }

      /**
       * Resumes a paused task by its ID.
       * @param {number} taskId - The ID of the task to resume.
       */
    }, {
      key: "resumeTask",
      value: function resumeTask(taskId) {
        var task = this.tasks[taskId];
        if (task && task._paused) {
          task._paused = false;
          this.runTask(task);
        }
      }
    }]);
  }();
  if (isNode) {
    module.exports = Scheduler;
  } else {
    global.Scheduler = Scheduler;
  }
})(globalThis);
