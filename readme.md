# Simple-chronos-scheduler.js

A simple task scheduler for JavaScript with support for recurring tasks, pause/resume functionality, and task management. This library allows you to schedule tasks with a specified delay, execute them once, or make them recurring. You can also pause and resume tasks as needed.

## Features

- **Add one-time tasks**: Execute a task after a specified delay.
- **Recurring tasks**: Schedule tasks that repeat at regular intervals.
- **Pause tasks**: Pause tasks without removing them from the scheduler.
- **Resume tasks**: Resume paused tasks from where they left off.
- **Task removal**: Remove tasks by their ID.

## Installation

To install `task-scheduler-js`, run the following npm command:

```bash
npm install task-scheduler-js
```

If you're using the package in a Node.js environment or as part of your front-end build, you can import the Scheduler class as follows:
```javascript
const { Scheduler } = require('task-scheduler-js');
```

For ES Modules, you can import it like this:
```javascript
import { Scheduler } from 'task-scheduler-js';
```

```javascript
const sche = new Scheduler();

// Adds a one-time task (executes after 1 second)
sche.addTask(() => console.log('Task executed once'), 1000, false);

// Adds a recurring task (executes every 2 seconds)
sche.addTask(() => console.log('Recurring task executed'), 2000, true);

// Pause the recurring task after 5 seconds
setTimeout(() => {
    console.log("Pausing the recurring task...");
    sche.pauseTask(2);  // Assuming task ID 2 is the recurring task
}, 5000);

// Resume the task after 8 seconds
setTimeout(() => {
    console.log("Resuming the recurring task...");
    sche.resumeTask(2);  // Resumes the recurring task
}, 8000);

// Removes the one-time task after 3 seconds
setTimeout(() => {
    console.log("Removing the one-time task...");
    sche.removeTask(1);  // Removes the task with ID 1
}, 3000);
```