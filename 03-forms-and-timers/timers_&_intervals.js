/*
==================================================
TIMERS & INTERVALS IN JAVASCRIPT
==================================================
*/

/*
This file is a compact practice companion for timers and intervals.
It includes explanations, runnable examples, output questions,
practice problems, viva questions, and things to remember.
*/

/*
==================================================
1) TIMERS & INTERVALS OVERVIEW
==================================================
*/

/*
Timers and intervals allow code to run after a delay or repeatedly.

Key points:
- setTimeout: executes code once after delay
- setInterval: executes code repeatedly at intervals
- Both are asynchronous (non-blocking)
- Must clear with clearTimeout() and clearInterval()
- Timer IDs can be stored to clear later
- Timing is not guaranteed to be exact
*/

console.log('--- Timers and Intervals overview ---');
console.log('setTimeout: run once after delay');
console.log('setInterval: run repeatedly');
console.log('requestAnimationFrame: optimized for animations');

/*
==================================================
2) setTimeout BASICS
==================================================
*/

console.log('--- setTimeout syntax ---');
/*
const timeoutId = setTimeout(callback, delay, arg1, arg2);

Parameters:
- callback: function to execute
- delay: milliseconds to wait (1000 = 1 second)
- arg1, arg2, etc: arguments to pass to callback

Returns: numeric ID to cancel timeout

Example:
setTimeout(() => {
  console.log('Runs after 2 seconds');
}, 2000);
*/

console.log('--- setTimeout with arguments ---');
/*
function greet(name, age) {
  console.log(`${name} is ${age} years old`);
}

setTimeout(greet, 2000, 'Alice', 25);
// After 2 seconds: "Alice is 25 years old"
*/

console.log('--- setTimeout executes only once ---');
/*
setTimeout(() => {
  console.log('This runs once');
}, 1000);

// Output: "This runs once" (after 1 second, never again)
*/

console.log('--- Nested setTimeout (callback hell) ---');
/*
setTimeout(() => {
  console.log('First');
  setTimeout(() => {
    console.log('Second');
    setTimeout(() => {
      console.log('Third');
    }, 1000);
  }, 1000);
}, 1000);

// Better: Use promises or async/await
*/

console.log('--- setTimeout with 0 delay ---');
/*
setTimeout(() => {
  console.log('Deferred');
}, 0);

console.log('Immediate');

// Output:
// "Immediate"
// "Deferred"

0 delay doesn't run immediately, defers to end of call stack.
Useful for deferring work.
*/

/*
==================================================
3) CLEARING TIMERS: clearTimeout
==================================================
*/

console.log('--- clearTimeout stops timeout ---');
/*
const id = setTimeout(() => {
  console.log('This might not run');
}, 2000);

clearTimeout(id); // Stop the timeout

// Callback never executes
*/

console.log('--- When to clear timeouts ---');
/*
1. Component unmounts
2. User cancels action
3. Event listener removed
4. Element deleted from DOM

Always store ID to clear:
const id = setTimeout(callback, 1000);
clearTimeout(id);
*/

console.log('--- Clearing with stored ID ---');
/*
let timeoutId;

button.addEventListener('click', () => {
  timeoutId = setTimeout(() => {
    console.log('Action');
  }, 3000);
});

cancelButton.addEventListener('click', () => {
  clearTimeout(timeoutId);
  console.log('Cancelled');
});
*/

/*
==================================================
4) setInterval BASICS
==================================================
*/

console.log('--- setInterval syntax ---');
/*
const intervalId = setInterval(callback, interval, arg1, arg2);

Parameters:
- callback: function to execute repeatedly
- interval: milliseconds between executions
- arg1, arg2, etc: arguments to pass

Returns: numeric ID to cancel interval

Example:
setInterval(() => {
  console.log('Runs every 1 second');
}, 1000);
*/

console.log('--- setInterval executes repeatedly ---');
/*
let count = 0;
setInterval(() => {
  count++;
  console.log('Count:', count);
}, 1000);

// Output:
// "Count: 1"
// "Count: 2"
// "Count: 3"
// ... (forever or until cleared)
*/

console.log('--- Practical interval example ---');
/*
// Clock that updates every second
setInterval(() => {
  const time = new Date().toLocaleTimeString();
  console.log('Time:', time);
}, 1000);

// Check server every 30 seconds
setInterval(() => {
  fetch('/api/status').then(r => r.json());
}, 30000);

// Animate something
setInterval(() => {
  element.style.left = Math.random() * 100 + 'px';
}, 100);
*/

/*
==================================================
5) CLEARING INTERVALS: clearInterval
==================================================
*/

console.log('--- clearInterval stops interval ---');
/*
const id = setInterval(() => {
  console.log('Running');
}, 1000);

clearInterval(id); // Stop the interval

// Callback stops executing
*/

console.log('--- Stop after N executions ---');
/*
let count = 0;
const id = setInterval(() => {
  console.log('Execution:', count++);
  if (count === 5) {
    clearInterval(id);
    console.log('Stopped after 5 runs');
  }
}, 1000);
*/

console.log('--- Toggle interval on/off ---');
/*
let intervalId;
let isRunning = false;

button.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    button.textContent = 'Start';
  } else {
    intervalId = setInterval(() => {
      console.log('Running');
    }, 1000);
    isRunning = true;
    button.textContent = 'Stop';
  }
});
*/

console.log('--- Always clear intervals on unmount ---');
/*
class Timer {
  constructor() {
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  destroy() {
    this.stop(); // Always clear on cleanup
  }
}
*/

/*
==================================================
6) DEBOUNCE & THROTTLE PATTERNS
==================================================
*/

console.log('--- Debounce: delay execution until events stop ---');
/*
For high-frequency events (input, resize, scroll),
debounce waits for event to stop firing before executing.

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Usage: API call only after user stops typing
const searchAPI = debounce((query) => {
  fetch(`/api/search?q=${query}`);
}, 500);

input.addEventListener('input', (e) => {
  searchAPI(e.target.value);
});
*/

console.log('--- Throttle: limit execution frequency ---');
/*
Throttle executes at most once per interval.
Useful for animations and scroll events.

function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      fn(...args);
      lastCall = now;
    }
  };
}

// Usage: animate on scroll at most every 100ms
const handleScroll = throttle(() => {
  console.log('Scroll handled');
}, 100);

window.addEventListener('scroll', handleScroll);
*/

console.log('--- Debounce vs Throttle ---');
/*
Debounce:
- Waits for event to stop
- Executes once when stops
- Good for: search, validation, resize

Throttle:
- Executes periodically
- At most once per interval
- Good for: scroll, animation, drag
*/

/*
==================================================
7) requestAnimationFrame
==================================================
*/

console.log('--- requestAnimationFrame ---');
/*
const id = requestAnimationFrame(callback);

- Callback executes before next browser repaint
- Optimized for animations (synced with refresh rate)
- Better than setInterval for animations
- Returns ID for cancellation with cancelAnimationFrame()

Example:
let x = 0;
function animate() {
  x += 5;
  element.style.left = x + 'px';

  if (x < 500) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
*/

console.log('--- Advantages of requestAnimationFrame ---');
/*
1. Synced with browser refresh rate (60 FPS)
2. CPU efficient (pauses when tab not visible)
3. Prevents "jank" from uneven timing
4. Better battery life on mobile
5. Automatically optimized by browser

For animations: always use requestAnimationFrame
For intervals: use setInterval only if needed
*/

console.log('--- Cancelling requestAnimationFrame ---');
/*
const id = requestAnimationFrame(animate);
cancelAnimationFrame(id); // stops animation
*/

/*
==================================================
8) PRACTICAL EXAMPLES
==================================================
*/

console.log('--- Countdown timer ---');
/*
function countdown(seconds) {
  let remaining = seconds;

  const id = setInterval(() => {
    console.log(remaining--);

    if (remaining < 0) {
      clearInterval(id);
      console.log('Time up!');
    }
  }, 1000);
}

countdown(5); // counts down from 5
*/

console.log('--- Delayed execution with cancel ---');
/*
class DelayedAction {
  constructor(action, delay) {
    this.action = action;
    this.delay = delay;
    this.timeoutId = null;
  }

  start() {
    this.timeoutId = setTimeout(this.action, this.delay);
  }

  cancel() {
    clearTimeout(this.timeoutId);
  }
}

const action = new DelayedAction(() => {
  console.log('Action executed');
}, 3000);

action.start();
action.cancel(); // prevents execution
*/

console.log('--- Retry with exponential backoff ---');
/*
function retryWithBackoff(fn, maxRetries = 3) {
  let attempt = 0;

  function tryFn() {
    attempt++;

    try {
      fn();
    } catch (error) {
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        setTimeout(tryFn, delay);
      } else {
        console.log('Max retries reached');
      }
    }
  }

  tryFn();
}
*/

console.log('--- Rate limiting ---');
/*
class RateLimiter {
  constructor(maxCalls, windowMs) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
    this.calls = [];
  }

  call(fn) {
    const now = Date.now();
    this.calls = this.calls.filter(t => now - t < this.windowMs);

    if (this.calls.length < this.maxCalls) {
      this.calls.push(now);
      fn();
    }
  }
}

const limiter = new RateLimiter(5, 60000); // 5 calls per minute
button.addEventListener('click', () => {
  limiter.call(() => console.log('Called'));
});
*/

/*
==================================================
9) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: setTimeout(fn, 0) runs immediately ---');
/*
setTimeout(() => console.log('Later'), 0);
console.log('Now');

// Output: "Now" then "Later"
0 delay doesn't mean immediate, just deferred to call stack end.
*/

console.log('--- Confusion 2: Interval is not exact ---');
/*
setInterval(() => {
  console.log('Every 1 second?');
}, 1000);

Actual delay can be longer if:
- Browser tab is not active
- CPU is busy
- System is under load

Never rely on exact timing for critical operations.
*/

console.log('--- Confusion 3: Clearing after ID assigned ---');
/*
const id = setTimeout(fn, 1000);
clearTimeout(id); // clears properly

setTimeout(fn, 1000); // no ID, can't clear later
// This can cause issues if never fires
*/

console.log('--- Confusion 4: Passing function vs calling it ---');
/*
// Correct: pass function reference
setTimeout(() => console.log('Hello'), 1000);

// Correct: pass named function
setTimeout(myFunction, 1000);

// Wrong: calling function immediately
setTimeout(myFunction(), 1000); // executes now!
*/

console.log('--- Confusion 5: Memory leaks from uncleared intervals ---');
/*
setInterval(() => {
  console.log('Running');
}, 1000);

If never cleared, runs forever (even in background).
Always clear intervals when done or component unmounts.
*/

/*
==================================================
10) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: setTimeout(fn, 0); Runs before or after synchronous code?
A1: After synchronous code (deferred to event loop)
*/

/*
Q2: setInterval(fn, 1000) with heavy CPU work. Executes exactly every 1000ms?
A2: No, may take longer if work is heavy
*/

/*
Q3: clearTimeout(id) called. Does callback execute?
A3: No, callback is prevented from executing
*/

/*
Q4: setInterval returns same ID each time?
A4: No, each call returns unique ID
*/

/*
Q5: setTimeout(fn, 1000); Returns what?
A5: Numeric ID (positive integer)
*/

/*
Q6: Tab not visible, setInterval still runs?
A6: Yes, but may throttle to save battery
*/

/*
Q7: clearInterval called while callback executing?
A7: Next execution is prevented, current continues
*/

/*
Q8: requestAnimationFrame vs setInterval(fn, 16)?
A8: rAF is more efficient and synced with refresh rate
*/

/*
==================================================
11) PRACTICE PROBLEMS
==================================================
*/

/* 1. Create a simple countdown timer (5 to 0). */

/* 2. Clear a timeout before it executes. */

/* 3. Create a stopwatch that counts up. */

/* 4. Stop an interval after 10 executions. */

/* 5. Implement a debounce function for search input. */

/* 6. Implement a throttle function for scroll events. */

/* 7. Create a delayed greeting (3 second delay). */

/* 8. Toggle an interval on/off with a button. */

/* 9. Animate an element using requestAnimationFrame. */

/* 10. Create retry logic with exponential backoff. */

/* 11. Implement rate limiting (max 3 calls per 10 seconds). */

/* 12. Create a flashing text using setInterval. */

/* 13. Build a timer that counts down with display update. */

/* 14. Clear all active timers when component unmounts. */

/* 15. Combine setTimeout and setInterval for complex timing. */

/*
==================================================
12) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is setTimeout? */
/* A1. Executes a callback function once after a specified delay in milliseconds. */

/* Q2. What is setInterval? */
/* A2. Executes a callback function repeatedly at specified interval in milliseconds. */

/* Q3. Why would you use clearTimeout or clearInterval? */
/* A3. To stop/cancel a pending timeout or running interval. */

/* Q4. How do you pass arguments to setTimeout? */
/* A4. setTimeout(callback, delay, arg1, arg2, ...) */

/* Q5. Does setTimeout(fn, 0) run immediately? */
/* A5. No, it defers execution to the end of the call stack. */

/* Q6. What is debounce? */
/* A6. Delaying execution until an event stops firing, executes once. */

/* Q7. What is throttle? */
/* A7. Limiting execution to at most once per specified interval. */

/* Q8. When should you use requestAnimationFrame? */
/* A8. For animations to sync with browser refresh rate and optimize performance. */

/* Q9. Is interval timing always exact? */
/* A9. No, actual delay can be longer due to system load or browser activity. */

/* Q10. What happens if you forget to clear an interval? */
/* A10. It runs forever, even if component is destroyed (memory leak). */

/* Q11. How do you stop an animation with requestAnimationFrame? */
/* A11. Store the ID and call cancelAnimationFrame(id). */

/* Q12. What is the advantage of setTimeout over immediate execution? */
/* A12. Allows UI to update, runs after current execution context. */

/* Q13. Can you clear a timeout after it executes? */
/* A13. No, it already ran. You can only clear before execution. */

/* Q14. What is the difference between setInterval and setTimeout in a loop? */
/* A14. setInterval repeats automatically; setTimeout in loop needs recursion. */

/* Q15. Should you use setInterval for animations? */
/* A15. No, use requestAnimationFrame for better performance and sync. */

/*
==================================================
13) THINGS TO REMEMBER
==================================================
*/

// - setTimeout executes once after delay.
// - setInterval executes repeatedly at intervals.
// - Always store the ID to clear later.
// - clearTimeout and clearInterval prevent execution.
// - setTimeout(fn, 0) defers to event loop, doesn't run immediately.
// - Interval timing is not guaranteed to be exact.
// - Always clear intervals to prevent memory leaks.
// - Use requestAnimationFrame for animations, not setInterval.
// - Debounce: wait for event to stop.
// - Throttle: execute at most once per interval.
// - High-frequency events need debounce or throttle.
// - Timers are asynchronous and non-blocking.
// - Clear timers when components unmount.
// - Don't call function immediately: use () => fn() not fn().
// - Browser tabs can throttle timers to save battery.

/*
==================================================
14) FINAL MINI CHECKLIST
==================================================
*/

/*
- Have I stored the timer ID?
- Will I clear the timer when done?
- Am I using the right tool (setTimeout vs setInterval)?
- For animations, did I use requestAnimationFrame?
- Have I handled high-frequency events (debounce/throttle)?
- Is the delay in milliseconds?
- Am I passing function reference, not calling it?
- Have I considered timing precision needs?
- Will this cause memory leaks?
- Am I clearing on component unmount?
- Is this callback blocking UI?
- Should this be async/promises instead?
*/

console.log('Timers & Intervals practice file loaded successfully.');
