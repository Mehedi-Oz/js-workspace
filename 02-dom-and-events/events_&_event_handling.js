/*
==================================================
EVENTS AND EVENT HANDLING IN JAVASCRIPT
==================================================
*/

/*
==================================================
1) EVENTS OVERVIEW
==================================================
*/

/*
Events are user interactions or browser actions that trigger code execution.
Examples: clicking, typing, scrolling, loading, resizing, etc.

Key points:
- Events are triggered by user actions or browser
- Event listeners respond to events
- Event handlers are callback functions that execute when event fires
- Events have phases: capturing, target, bubbling
- Event object contains information about the event
*/

console.log('--- Events overview example ---');
/*
In browser:
<button id="btn">Click me</button>

const btn = document.getElementById('btn');
btn.addEventListener('click', (event) => {
  console.log('Button clicked!');
});
*/

console.log('Events allow interactive user experiences');
console.log('Without events, JavaScript cannot respond to user input');

/*
==================================================
2) EVENT BINDING: addEventListener
==================================================
*/

console.log('--- addEventListener basics ---');
/*
element.addEventListener(eventType, callbackFunction, options);

Parameters:
- eventType: string like 'click', 'input', 'keyup' (no 'on' prefix)
- callbackFunction: function to execute when event fires
- options: boolean or object with properties
*/

console.log('--- addEventListener syntax ---');
/*
// Simple usage
element.addEventListener('click', (event) => {
  console.log('Clicked!');
});

// With named function
function handleClick(event) {
  console.log('Clicked!');
}
element.addEventListener('click', handleClick);

// Multiple listeners for same event
element.addEventListener('click', () => console.log('First'));
element.addEventListener('click', () => console.log('Second'));
// Both execute, in order
*/

console.log('--- addEventListener options ---');
/*
element.addEventListener('click', handler, {
  once: true,        // listener fires only once, then removes itself
  capture: true,     // use capturing phase (default is bubbling)
  passive: true      // handler won't call preventDefault()
});

// As boolean (shorthand for capture)
element.addEventListener('click', handler, true); // capture phase
element.addEventListener('click', handler, false); // bubbling phase (default)
*/

console.log('--- Event types (no "on" prefix in addEventListener) ---');
/*
addEventListener: 'click', 'input', 'change', 'submit'
Direct property: onclick, oninput, onchange, onsubmit
*/

/*
==================================================
3) REMOVING EVENT LISTENERS: removeEventListener
==================================================
*/

console.log('--- removeEventListener ---');
/*
element.removeEventListener(eventType, functionReference, options);

Important:
- Must pass the SAME function reference
- Must match capture option
- Anonymous functions cannot be removed
*/

console.log('--- Removable vs non-removable listeners ---');
/*
// Removable (named function reference)
function handleClick(event) {
  console.log('Clicked');
}
element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick); // works

// Not removable (anonymous function)
element.addEventListener('click', () => {
  console.log('Clicked');
});
// Cannot remove - no reference to pass

// Workaround: store reference
const handler = () => console.log('Clicked');
element.addEventListener('click', handler);
element.removeEventListener('click', handler); // works
*/

console.log('--- once option eliminates need for removeEventListener ---');
/*
element.addEventListener('click', handler, { once: true });
// Automatically removes listener after first execution
*/

/*
==================================================
4) COMMON EVENTS
==================================================
*/

console.log('--- Mouse events ---');
/*
click        - when element is clicked
dblclick     - when element is double clicked
mouseover    - when mouse enters element
mouseout     - when mouse leaves element
mouseenter   - when mouse enters element (doesn't bubble)
mouseleave   - when mouse leaves element (doesn't bubble)
mousemove    - when mouse moves over element
mousedown    - when mouse button pressed
mouseup      - when mouse button released
contextmenu  - when right-click (context menu)
*/

console.log('--- Input events ---');
/*
input        - when input value changes (fires continuously)
change       - when input loses focus after change (fires once)
focus        - when element receives focus
blur         - when element loses focus
submit       - when form is submitted
reset        - when form is reset
keydown      - when key is pressed down
keyup        - when key is released
keypress     - when key produces character (deprecated, use keydown/keyup)
*/

console.log('--- Page/Window events ---');
/*
load         - when page/resource fully loads
unload       - when page is unloaded
scroll       - when user scrolls
resize       - when window is resized
orientationchange - when device orientation changes
beforeunload - before page unload (can prevent)
*/

console.log('--- Form events ---');
/*
submit       - when form submitted
reset        - when form reset
input        - when form input changes
change       - when form field changes and loses focus
focus        - when element gains focus
blur         - when element loses focus
invalid      - when form validation fails
*/

console.log('--- Touch events (mobile) ---');
/*
touchstart   - when touch begins
touchend     - when touch ends
touchmove    - when touch moves
touchcancel  - when touch is cancelled
*/

/*
==================================================
5) EVENT OBJECT & PROPERTIES
==================================================
*/

console.log('--- Event object ---');
/*
When event fires, callback receives event object automatically.

In browser:
element.addEventListener('click', (event) => {
  console.log(event); // full event object
});
*/

console.log('--- Common event properties ---');
/*
event.type       - name of the event ('click', 'input', etc.)
event.target     - element that triggered the event
event.currentTarget - element with the event listener attached
event.timeStamp  - milliseconds since page load
event.key        - key pressed (for keyboard events)
event.code       - physical key code (for keyboard events)
event.shiftKey   - true if shift was held
event.ctrlKey    - true if ctrl was held
event.altKey     - true if alt was held
event.metaKey    - true if meta/cmd was held
event.button     - which mouse button (0=left, 1=wheel, 2=right)
event.clientX    - X position relative to viewport
event.clientY    - Y position relative to viewport
event.pageX      - X position relative to page
event.pageY      - Y position relative to page
event.offsetX    - X position relative to target element
event.offsetY    - Y position relative to target element
*/

console.log('--- Input/Change event specific properties ---');
/*
For input elements:
event.target.value      - current input value
event.target.checked    - for checkboxes/radios
event.target.files      - for file inputs
event.target.name       - name attribute
*/

console.log('--- Form submit event ---');
/*
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent page reload
  const formData = new FormData(event.target);
  // process form data
});
*/

/*
==================================================
6) PREVENTING DEFAULT BEHAVIOR: preventDefault
==================================================
*/

console.log('--- preventDefault ---');
/*
event.preventDefault();

- Prevents the default browser action for that event
- Doesn't prevent event propagation
- Can be called from capturing or bubbling phase
*/

console.log('--- Common preventDefault uses ---');
/*
// Prevent form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // handle form manually
});

// Prevent link navigation
link.addEventListener('click', (e) => {
  e.preventDefault();
  // handle click manually
});

// Prevent context menu
element.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  // show custom menu
});

// Prevent text selection
element.addEventListener('mousedown', (e) => {
  e.preventDefault();
  // prevent selection
});
*/

console.log('--- stopPropagation ---');
/*
event.stopPropagation();

- Stops event from bubbling up or capturing down
- Prevents event from reaching parent elements
- Does NOT prevent default behavior
- Different from preventDefault()
*/

console.log('--- stopImmediatePropagation ---');
/*
event.stopImmediatePropagation();

- Stops propagation like stopPropagation()
- ALSO prevents other handlers for same event from firing
- If multiple listeners on same element, first one can block others
*/

/*
==================================================
7) EVENT BUBBLING
==================================================
*/

console.log('--- Event bubbling explained ---');
/*
Bubbling: Event starts at target, then bubbles up to parent elements.

Example:
<div id="parent">
  <button id="child">Click me</button>
</div>

When button clicked:
1. Click event fires on button (target phase)
2. Event bubbles to parent div
3. Event bubbles to body
4. Event bubbles to document
5. All listeners in the chain fire

This happens UNLESS stopPropagation() is called.
*/

console.log('--- Bubbling phase listeners ---');
/*
element.addEventListener('click', handler, false); // bubbling (default)
element.addEventListener('click', handler);       // bubbling (default)

In bubbling phase:
- Event starts at target
- Works upward through parent elements
- Handlers at higher levels execute after target
*/

console.log('--- Which events bubble ---');
/*
Bubble:
click, dblclick, mousedown, mouseup, mouseover, mouseout, input, change,
submit, reset, focus (bubbles as focusin), blur (bubbles as focusout)

Do NOT bubble:
mouseenter, mouseleave, scroll, resize, load, unload, focus, blur
*/

/*
==================================================
8) EVENT CAPTURING
==================================================
*/

console.log('--- Event capturing explained ---');
/*
Capturing: Event starts at root, travels down to target.

Example:
<div id="parent">
  <button id="child">Click me</button>
</div>

When button clicked (with capturing listener on parent):
1. Click event fires at root (document)
2. Event travels down through html element
3. Event travels down through parent div
4. Event reaches target button
5. Then bubbles back up (if not stopped)

Capturing is opposite of bubbling.
*/

console.log('--- Capturing phase listeners ---');
/*
element.addEventListener('click', handler, true); // capturing phase
element.addEventListener('click', handler, { capture: true }); // capturing

In capturing phase:
- Event starts at root
- Works downward through child elements
- Handlers at higher levels execute before target
*/

console.log('--- Event flow phases ---');
/*
1. Capturing phase: from document down to target
2. Target phase: at the target element
3. Bubbling phase: from target up to document

Listeners with capture:true execute during phase 1
Listeners with capture:false execute during phase 3
Both can call preventDefault() or stopPropagation()
*/

console.log('--- Capturing vs Bubbling order ---');
/*
<div class="parent">
  <div class="middle">
    <button class="child">Click</button>
  </div>
</div>

Execution order:
1. parent capturing listener (if exists)
2. middle capturing listener (if exists)
3. child capturing listener (if exists)
4. child bubbling listener (if exists)
5. middle bubbling listener (if exists)
6. parent bubbling listener (if exists)
*/

/*
==================================================
9) EVENT DELEGATION
==================================================
*/

console.log('--- Event delegation concept ---');
/*
Instead of adding listener to each element,
add ONE listener to parent and use event.target to identify child.

Advantages:
- More efficient (fewer listeners)
- Works for dynamically added elements
- Cleaner code
- Better performance
*/

console.log('--- Event delegation implementation ---');
/*
In browser:
<ul id="list">
  <li><button>Item 1</button></li>
  <li><button>Item 2</button></li>
</ul>

// BAD: Individual listeners
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.addEventListener('click', handler);
});
// Doesn't work for dynamically added buttons

// GOOD: Event delegation
const list = document.getElementById('list');
list.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    console.log('Button clicked:', event.target.textContent);
  }
});
// Works for all current and future buttons
*/

console.log('--- Event delegation with closest ---');
/*
parent.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) {
    console.log('Button clicked');
  }
});

closest() travels up from target until match found or hits document.
Very useful for nested structures.
*/

console.log('--- Event delegation with class check ---');
/*
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('deletable')) {
    console.log('Delete:', event.target);
  }
});
*/

/*
==================================================
10) CONFUSION: event.target vs event.currentTarget
==================================================
*/

console.log('--- event.target vs event.currentTarget ---');
/*
event.target:
- The ACTUAL element that triggered the event
- Doesn't change (always the innermost element)
- Useful for delegation

event.currentTarget:
- The element with the listener attached
- Changes depending on phase and listener location
- Usually the element you registered listener on
*/

console.log('--- Example in browser ---');
/*
<div id="parent" class="outer">
  <button id="child" class="btn">Click</button>
</div>

const parent = document.getElementById('parent');
parent.addEventListener('click', (event) => {
  console.log('target:', event.target.id);       // 'child'
  console.log('currentTarget:', event.currentTarget.id); // 'parent'
});
*/

console.log('--- Key difference ---');
/*
If user clicks the button:
- event.target is the button (what triggered it)
- event.currentTarget is the parent (where listener is)

In delegated listening:
- event.target helps identify which child was clicked
- event.currentTarget is always the delegating parent
*/

/*
==================================================
11) CONFUSION: CAPTURING VS BUBBLING PHASES
==================================================
*/

console.log('--- Phase execution order ---');
/*
<div class="level1">
  <div class="level2">
    <div class="level3">Click here</div>
  </div>
</div>

Listeners:
level1: capturing (true)
level2: capturing (true)
level3: capturing (true)
level1: bubbling (false)
level2: bubbling (false)
level3: bubbling (false)

Click on level3. Execution order:
1. level1 capturing
2. level2 capturing
3. level3 capturing (both phases occur at target)
4. level3 bubbling
5. level2 bubbling
6. level1 bubbling
*/

console.log('--- Capturing first, then bubbling ---');
/*
Capturing phase (third parameter = true):
- Goes DOWN from root to target
- Happens FIRST
- Listeners here execute first

Bubbling phase (third parameter = false):
- Goes UP from target to root
- Happens SECOND
- Listeners here execute second
*/

console.log('--- stopPropagation in each phase ---');
/*
If capturing listener calls stopPropagation():
- No more capturing listeners execute
- Event still reaches target (target phase still occurs)
- Bubbling phase still occurs

If bubbling listener calls stopPropagation():
- No more bubbling listeners execute
- Event doesn't bubble to parents
- But target phase already completed
*/

/*
==================================================
12) KEYBOARD EVENTS
==================================================
*/

console.log('--- Keyboard event properties ---');
/*
event.key       - the actual key (character or name like 'Enter', 'Escape')
event.code      - physical key code ('KeyA', 'Space', 'Enter')
event.keyCode   - numeric value (deprecated, don't use)
event.which     - numeric value (deprecated, don't use)

Example:
Press 'a': event.key = 'a', event.code = 'KeyA'
Press 'A': event.key = 'A', event.code = 'KeyA' (Shift held)
Press Enter: event.key = 'Enter', event.code = 'Enter'
*/

console.log('--- keydown vs keyup vs keypress ---');
/*
keydown   - fires when key pressed down (fires continuously if held)
keyup     - fires when key released
keypress  - deprecated, don't use (had issues with special keys)

Use keydown or keyup, not keypress.
*/

console.log('--- Modifier keys ---');
/*
event.shiftKey  - true if shift held
event.ctrlKey   - true if ctrl held
event.altKey    - true if alt held
event.metaKey   - true if cmd/windows held

Example:
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    // Ctrl+Enter pressed
  }
});
*/

/*
==================================================
13) MOUSE EVENTS & COORDINATES
==================================================
*/

console.log('--- Mouse coordinate properties ---');
/*
event.clientX, event.clientY  - relative to viewport (screen)
event.pageX, event.pageY      - relative to whole page (includes scroll)
event.offsetX, event.offsetY  - relative to target element
event.screenX, event.screenY  - relative to physical screen
*/

console.log('--- Mouse events order ---');
/*
When clicking:
1. mousedown - button pressed
2. mouseup   - button released
3. click     - after mouseup (if not moved much)

When double-clicking:
1. mousedown
2. mouseup
3. click
4. mousedown
5. mouseup
6. click
7. dblclick
*/

console.log('--- mouseenter vs mouseover ---');
/*
mouseover:
- Bubbles (can use delegation)
- Fires when entering element or child

mouseenter:
- Doesn't bubble
- Only fires when entering that specific element
- More efficient when bubbling not needed
*/

/*
==================================================
14) FORM EVENTS
==================================================
*/

console.log('--- Form submit ---');
/*
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent reload
  const data = new FormData(event.target);
  // process form data
});

Fires when:
- Form submitted (enter in input or click submit button)
- Before page reload
- Must call preventDefault() to stop reload
*/

console.log('--- Input vs Change ---');
/*
input:
- Fires while typing (continuously)
- Good for real-time validation or search
- Fires before blur

change:
- Fires after field value changed AND loses focus
- Good for final validation
- Fires after input
*/

console.log('--- Focus vs Blur ---');
/*
focus:
- When element receives focus (click or tab)
- Good for showing hints or enabling features

blur:
- When element loses focus
- Good for validation on field exit
- Opposite of focus
*/

console.log('--- Checkbox and radio change ---');
/*
const checkbox = document.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', (event) => {
  console.log('Checked:', event.target.checked);
});

event.target.checked - true/false for checkboxes and radios
*/

/*
==================================================
15) ASYNC & EVENT TIMING
==================================================
*/

console.log('--- Event listener timing ---');
/*
Event listeners execute synchronously when event fires.
If listener code takes time, it blocks other listeners and UI.
*/

console.log('--- Handling async operations in events ---');
/*
button.addEventListener('click', async (event) => {
  const response = await fetch('/api/data');
  const data = await response.json();
  updateUI(data);
});

Button is still responsive while waiting (not blocking).
*/

console.log('--- Debouncing and throttling ---');
/*
For high-frequency events (scroll, resize, mousemove),
use debouncing/throttling to limit handler calls.

Debounce: wait until event stops for X ms, then execute once
Throttle: execute at most once every X ms

Example use:
resize event - thousands per second, throttle to limit
scroll event - debounce for expensive operations
input/search - debounce for API calls
*/

/*
==================================================
16) EVENT OBJECT METHODS
==================================================
*/

console.log('--- Event methods ---');
/*
event.preventDefault()           - stop default behavior
event.stopPropagation()          - stop bubbling/capturing
event.stopImmediatePropagation() - stop propagation + other listeners
event.composedPath()             - array of elements event traveled through
event.cancelable                 - boolean, can preventDefault() be called
event.defaultPrevented           - boolean, was preventDefault() called
*/

console.log('--- Checking if default is preventable ---');
/*
element.addEventListener('click', (event) => {
  if (event.cancelable) {
    event.preventDefault();
  }
});

Some events cannot have default prevented (cancelable = false).
*/

/*
==================================================
17) COMMON PATTERNS
==================================================
*/

console.log('--- Loading and dom ready ---');
/*
// Wait for all resources to load
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});

// Wait for DOM to be ready (faster than load)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready, scripts can run');
});

In modern development, often put <script> tag at end of body instead.
*/

console.log('--- Cleanup and removeEventListener ---');
/*
class Component {
  constructor(element) {
    this.element = element;
    this.handler = (e) => this.handleClick(e);
  }

  mount() {
    this.element.addEventListener('click', this.handler);
  }

  unmount() {
    this.element.removeEventListener('click', this.handler);
  }

  handleClick(event) {
    console.log('Clicked');
  }
}

Always clean up listeners when removing elements.
Prevents memory leaks.
*/

console.log('--- Custom events ---');
/*
// Creating custom event
const event = new CustomEvent('myEvent', {
  detail: { message: 'Hello' }
});

// Dispatching
element.dispatchEvent(event);

// Listening
element.addEventListener('myEvent', (event) => {
  console.log(event.detail.message); // 'Hello'
});

Useful for component communication.
*/

/*
==================================================
18) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: Child element clicked, parent has listener, capturing=false. Order?
A1: Target phase first, then bubbling phase
*/

/*
Q2: event.preventDefault() called. Default action happens?
A2: No, default action is prevented
*/

/*
Q3: event.stopPropagation() called. Parent listener fires?
A3: No, event doesn't bubble to parent
*/

/*
Q4: Button clicked, both target and parent have listeners. Listener order?
A4: Target first, then parent (if bubbling)
*/

/*
Q5: event.target is button, event.currentTarget is parent. Delegating?
A5: Yes, button was clicked through delegation at parent
*/

/*
Q6: Form submitted, preventDefault() not called. Page reloads?
A6: Yes, default form behavior is to reload
*/

/*
Q7: input event fires while typing. change event when?
A7: After input field loses focus (blur)
*/

/*
Q8: stopPropagation() called in capturing phase. Does bubbling occur?
A8: Yes, bubbling still occurs after target phase
*/

/*
==================================================
19) PRACTICE PROBLEMS
==================================================
*/

/* 1. Add a click listener to a button and log a message. */

/* 2. Remove an event listener from an element. */

/* 3. Prevent default form submission behavior. */

/* 4. Add input validation using the input event. */

/* 5. Use event delegation to handle clicks on dynamically added elements. */

/* 6. Log event.target and event.currentTarget in a bubbling scenario. */

/* 7. Add keyboard listener that checks for Enter key press. */

/* 8. Stop event propagation from child to parent. */

/* 9. Add different listeners for capturing and bubbling phases. */

/* 10. Create a debounced search input handler. */

/* 11. Use event.closest() to find parent elements. */

/* 12. Add mouse coordinate logging for mousemove events. */

/* 13. Handle form input value and checkbox checked state. */

/* 14. Dispatch a custom event and listen for it. */

/* 15. Clean up event listeners when removing an element. */

/*
==================================================
20) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is an event? */
/* A1. An action or occurrence (like click, input) that JavaScript can detect and respond to. */

/* Q2. What is the difference between addEventListener and direct property? */
/* A2. addEventListener allows multiple listeners and more control; direct property only allows one. */

/* Q3. Why can't you remove an anonymous event listener? */
/* A3. removeEventListener needs a function reference, but anonymous functions have no reference. */

/* Q4. What is event bubbling? */
/* A4. Event starts at target and bubbles up through parent elements, firing their listeners. */

/* Q5. What is event capturing? */
/* A5. Event starts at root and travels down to target, opposite of bubbling. */

/* Q6. What is event delegation? */
/* A6. Adding listener to parent to handle events from multiple children using event.target. */

/* Q7. What does event.preventDefault() do? */
/* A7. Stops the browser's default action for that event (e.g., form reload, link navigation). */

/* Q8. What does event.stopPropagation() do? */
/* A8. Stops event from bubbling to parent elements or capturing to children. */

/* Q9. What is the difference between event.target and event.currentTarget? */
/* A9. target is what triggered the event; currentTarget is where the listener is attached. */

/* Q10. How do you know which phase an event is in? */
/* A10. Listeners with capture:true are in capturing phase; capture:false are in bubbling phase. */

/* Q11. What events don't bubble? */
/* A11. Focus, blur, load, unload, scroll, resize, mouseenter, mouseleave, etc. */

/* Q12. What is the difference between input and change events? */
/* A12. input fires while typing; change fires after blur. */

/* Q13. How do you handle form submission without reload? */
/* A13. Add submit listener to form and call event.preventDefault() */

/* Q14. What is the { once: true } option? */
/* A14. Listener fires only once then automatically removes itself. */

/* Q15. Why use event delegation? */
/* A15. More efficient, works with dynamic elements, cleaner code, better performance. */

/*
==================================================
21) THINGS TO REMEMBER
==================================================
*/

// - Events are user interactions or browser actions.
// - Use addEventListener to add event listeners (recommended).
// - Always remove listeners when done or elements are removed.
// - event.target identifies what triggered the event.
// - event.currentTarget identifies where listener is attached.
// - Event bubbling goes from target up to root.
// - Event capturing goes from root down to target.
// - Use event delegation for better performance and dynamic elements.
// - preventDefault() stops default behavior; doesn't affect propagation.
// - stopPropagation() stops propagation; doesn't affect default behavior.
// - Use addEventListener(event, handler, true) for capturing.
// - Not all events bubble (focus, blur, scroll, resize, etc.).
// - Use input event for real-time feedback; change for final validation.
// - Use keyboard events with event.key for specific keys.
// - Clean up event listeners to prevent memory leaks.

/*
==================================================
22) FINAL MINI CHECKLIST
==================================================
*/

/*
- Am I using addEventListener or direct property?
- Can this listener be removed later (named function)?
- Should I prevent default behavior?
- Should I stop propagation?
- Am I using event delegation appropriately?
- Have I identified correct event type (click vs input, etc.)?
- Am I accessing the right property (target vs currentTarget)?
- Do I need to handle capturing or bubbling?
- Have I cleaned up listeners when elements removed?
- Is this a high-frequency event (needs debounce/throttle)?
- Am I checking event.key for keyboard events?
- Is this form submission (remember preventDefault)?
*/

console.log('Events and Event Handling practice file loaded successfully.');
