(function (global) {
    class Scheduler {
        constructor() {
            this.taskId = 0;
            this.tasks = {};
        }

        /**
         * Adds a new task to the scheduler.
         * @param {Function} callbackFunction - The function to execute after the delay.
         * @param {number} delay - The delay in milliseconds before executing the callback function.
         * @param {boolean} recurring - Whether the task should be recurring. If `true`, the task will execute repeatedly at the specified interval.
         */
        addTask(cb, delay, recurring = false) {
            this.taskId++;

            const task = {
                id: this.taskId,
                cb,
                delay,
                recurring,
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
        runTask(task) {
            task.timerId = setTimeout(() => {
                const _runTask = () => {
                    if (!task._paused) {
                        task.cb();
                    }
                    if (task.recurring && !task._paused) {
                        task.timerId = setTimeout(_runTask, task.delay);
                    } else if (!task.recurring) {
                        this.removeTask(task.id);
                    }
                };
                _runTask();
            }, task.delay);
        }

        /**
         * Removes a task by its ID.
         * @param {number} taskId - The ID of the task to remove.
         */
        removeTask(taskId) {
            if (this.tasks[taskId]) {
                clearTimeout(this.tasks[taskId].timerId);
                delete this.tasks[taskId];
            }
        }

        /**
         * Pauses a task by its ID.
         * @param {number} taskId - The ID of the task to pause.
         */
        pauseTask(taskId) {
            const task = this.tasks[taskId];
            if (task) {
                clearTimeout(task.timerId);
                task._paused = true;
            }
        }

        /**
         * Resumes a paused task by its ID.
         * @param {number} taskId - The ID of the task to resume.
         */
        resumeTask(taskId) {
            const task = this.tasks[taskId];
            if (task && task._paused) {
                task._paused = false;
                this.runTask(task);
            }
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Scheduler;
    } else {
        global.Scheduler = Scheduler;
    }
})(this);
