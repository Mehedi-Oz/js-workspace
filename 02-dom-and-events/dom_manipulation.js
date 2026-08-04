/*
==================================================
DOM IN JAVASCRIPT
==================================================
*/


/*
==================================================
1) OVERVIEW
==================================================
*/

/*
The DOM (Document Object Model) is an interface that represents HTML documents
as a tree of nodes. It allows you to access, modify, and create HTML elements.

Key points:
- DOM represents the structure of HTML as a tree
- Everything is a node (elements, text, comments, etc.)
- Nodes have a parent-child relationship
- The top node is the document object
- Changes to DOM update what users see in the browser
*/

console.log('--- DOM overview example ---');
console.log('document:', document);
console.log('document.documentElement:', document.documentElement);
console.log('document.body:', document.body);
console.log('Root element tag:', document.documentElement.tagName);

/*
==================================================
2) DOM TREE STRUCTURE
==================================================
*/

console.log('--- Node types ---');
/*
Node types:
- Element Node: HTML tags (<div>, <p>, etc.)
- Text Node: Text content between tags
- Comment Node: <!-- comments -->
- Document Node: The root node (document)
- Attribute Node: Element attributes (rarely used directly)
*/

console.log('--- Nodes vs Elements ---');
console.log('Nodes include: elements, text, comments');
console.log('Elements are specifically HTML tags');
console.log('Every element is a node, but not every node is an element');

console.log('--- Node relationships ---');
/*
- parentNode: the parent of a node
- childNodes: all child nodes (including text nodes)
- children: all child elements (not text/comment nodes)
- firstChild: first child node
- firstElementChild: first child element
- lastChild: last child node
- lastElementChild: last child element
- nextSibling: next sibling node
- previousSibling: previous sibling node
- nextElementSibling: next sibling element
- previousElementSibling: previous sibling element
*/

console.log('--- Example DOM structure ---');
/*
<!DOCTYPE html>
<html>
  <head>
    <title>Page</title>
  </head>
  <body>
    <div class="container">
      <p>Hello</p>
      <p>World</p>
    </div>
  </body>
</html>
*/

/*
==================================================
3) SELECTING ELEMENTS
==================================================
*/

console.log('--- Selecting by ID ---');
/*
const element = document.getElementById('id-name');
- Returns single Element or null
- Fastest method for getting an element
- ID should be unique in the document
*/

console.log('--- Selecting by class ---');
/*
const elements = document.getElementsByClassName('class-name');
- Returns live HTMLCollection
- Updates automatically if DOM changes
- Can select multiple elements at once
*/

console.log('--- Selecting by tag name ---');
/*
const elements = document.getElementsByTagName('div');
- Returns live HTMLCollection
- Includes all elements of that tag type
*/

console.log('--- Selecting with querySelector ---');
/*
const element = document.querySelector('.class-name #id-name');
- Returns first matching element or null
- Supports any CSS selector
- Can be more expensive than getElementById for large DOMs
*/

console.log('--- Selecting with querySelectorAll ---');
/*
const elements = document.querySelectorAll('.class-name div > p');
- Returns static NodeList (snapshot)
- Supports any CSS selector
- Does NOT update if DOM changes after selection
*/

console.log('--- Selector examples ---');
/*
getElementById('main') - by ID
querySelector('#main') - by ID
querySelector('.button') - by class
querySelector('div') - by tag
querySelector('div.active') - tag with class
querySelector('div > p') - child combinator
querySelector('div p') - descendant combinator
querySelector('[data-id="123"]') - by attribute
querySelectorAll('li') - all matching elements
*/

console.log('--- Context-based selection ---');
/*
element.querySelector('.child') - searches within element
element.querySelectorAll('span') - finds all spans within element
element.getElementById() - NOT available, only on document
*/

/*
==================================================
4) TEXT & CONTENT ACCESS
==================================================
*/

console.log('--- innerText property ---');
/*
element.innerText - returns visible text content
- Only returns visible text (respects CSS display)
- Excludes <script> and <style> tags
- Includes text from hidden elements if not display:none
- Updates trigger browser reflow/repaint
- Value is a string
*/

console.log('--- textContent property ---');
/*
element.textContent - returns all text content
- Returns text as-is, regardless of visibility
- Includes text from <script> and <style> tags
- Faster than innerText (no reflow)
- Updates trigger reflow
- Value is a string
*/

console.log('--- innerHTML property ---');
/*
element.innerHTML - returns/sets HTML content
- Returns actual HTML markup
- Can include nested tags
- Setting innerHTML parses HTML
- Security risk if used with user input (XSS)
- Can trigger parser and reflow
*/

console.log('--- Example of differences ---');
/*
<div id="demo">
  <p>Hello</p>
  <script>alert("hi");</script>
  This is text
</div>

div.innerText: "Hello This is text"
div.textContent: "Hello alert("hi"); This is text"
div.innerHTML: '<p>Hello</p><script>alert("hi");</script>This is text'
*/

console.log('--- textContent for setting ---');
/*
element.textContent = 'new text';
- Safe way to set text content
- Does not parse HTML
- Replaces all child nodes with text node
*/

console.log('--- innerHTML for setting ---');
/*
element.innerHTML = '<p>New content</p>';
- Sets complete HTML content
- Parses HTML tags
- Dangerous with user input
*/

/*
==================================================
5) ATTRIBUTE MANIPULATION
==================================================
*/

console.log('--- getAttribute ---');
/*
const value = element.getAttribute('attr-name');
- Returns string value or null if doesn't exist
- Works for any attribute
- Returns actual attribute value from HTML
*/

console.log('--- setAttribute ---');
/*
element.setAttribute('attr-name', 'value');
- Sets or updates an attribute
- Creates attribute if it doesn't exist
- Value is always a string
*/

console.log('--- removeAttribute ---');
/*
element.removeAttribute('attr-name');
- Removes an attribute completely
- Does nothing if attribute doesn't exist
*/

console.log('--- hasAttribute ---');
/*
const exists = element.hasAttribute('attr-name');
- Returns true/false
- Checks if attribute is present
*/

console.log('--- Direct property access ---');
/*
element.id - get/set id attribute
element.className - get/set class attribute
element.title - get/set title attribute
element.value - for input elements
element.checked - for checkboxes/radios
- Faster than getAttribute for common attributes
- Some attributes map directly to properties
*/

console.log('--- data- attributes ---');
/*
<div data-user-id="123" data-status="active"></div>

element.getAttribute('data-user-id') - "123"
element.dataset.userId - "123" (camelCase)
element.dataset.status - "active"
*/

/*
==================================================
6) CLASS MANIPULATION
==================================================
*/

console.log('--- className property ---');
/*
element.className - get/set all classes
- Returns space-separated string
- Setting replaces all classes
- Less convenient for single class operations
*/

console.log('--- classList API ---');
/*
element.classList.add('active') - add a class
element.classList.remove('active') - remove a class
element.classList.toggle('active') - add if missing, remove if present
element.classList.contains('active') - check if has class
element.classList.replace('old', 'new') - replace one class with another
*/

console.log('--- classList advantages ---');
/*
- Simpler syntax than className
- Can add/remove multiple classes
- Non-destructive (doesn't replace all classes)
- More readable and maintainable
*/

/*
==================================================
7) STYLE MANIPULATION
==================================================
*/

console.log('--- element.style property ---');
/*
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '14px';
element.style.marginTop = '10px';

- CSS properties become camelCase in JavaScript
- Sets inline styles
- Can read and write individual properties
- Inline styles have high specificity
*/

console.log('--- Setting multiple styles ---');
/*
element.style.cssText = 'color: red; background: blue; font-size: 16px;';
- Replaces all inline styles
- Useful for bulk changes
*/

console.log('--- Getting computed styles ---');
/*
const styles = window.getComputedStyle(element);
const color = styles.color;
const fontSize = styles.fontSize;
- Returns actual computed styles (not just inline)
- Includes styles from CSS files
- Read-only (cannot set values this way)
*/

console.log('--- classList vs style ---');
/*
For single changes: classList.add() is often better
For rapid multiple changes: element.style.cssText is better
For predefined styles: classList is cleaner
For calculated values: element.style is necessary
*/

/*
==================================================
8) CREATING & INSERTING ELEMENTS
==================================================
*/

console.log('--- createElement ---');
/*
const element = document.createElement('div');
- Creates a new element not attached to DOM
- Element exists in memory but not visible
- Must be added to DOM to appear
*/

console.log('--- appendChild ---');
/*
parent.appendChild(child);
- Adds child as last child of parent
- Moves element if it already exists in DOM
- Returns the appended child
*/

console.log('--- prepend ---');
/*
parent.prepend(child);
- Adds child as first child
- Can accept text or elements
*/

console.log('--- insertBefore ---');
/*
parent.insertBefore(newElement, referenceElement);
- Inserts newElement before referenceElement
- referenceElement must be a child of parent
*/

console.log('--- insertAdjacentHTML ---');
/*
element.insertAdjacentHTML('beforebegin', '<p>text</p>');
- 'beforebegin': before the element
- 'afterbegin': inside, at the start
- 'beforeend': inside, at the end
- 'afterend': after the element
*/

console.log('--- insertAdjacentElement ---');
/*
element.insertAdjacentElement('afterbegin', newElement);
- Same positions as insertAdjacentHTML
- Takes element instead of HTML string
*/

console.log('--- appendChild vs insertAdjacentHTML ---');
/*
appendChild: safer for elements, moves/adds elements
insertAdjacentHTML: useful for HTML fragments, potential XSS
*/

/*
==================================================
9) REMOVING ELEMENTS
==================================================
*/

console.log('--- removeChild ---');
/*
parent.removeChild(child);
- Removes child from parent
- child must be a child of parent
- Element still exists in memory
- Can be re-inserted later
*/

console.log('--- remove ---');
/*
element.remove();
- Removes element from DOM
- Simpler syntax than removeChild
- Element still exists in memory
- Modern browsers (IE11+)
*/

console.log('--- replaceChild ---');
/*
parent.replaceChild(newChild, oldChild);
- Replaces oldChild with newChild
- oldChild must be a child of parent
*/

console.log('--- clearing children ---');
/*
element.innerHTML = ''; - fast but crude
while (element.firstChild) {
  element.removeChild(element.firstChild);
} - explicit removal
*/

/*
==================================================
10) LIVE HTMLCollection VS STATIC NodeList
==================================================
*/

console.log('--- Live HTMLCollection ---');
/*
const collection = document.getElementsByClassName('item');
const collection2 = document.getElementsByTagName('div');

- Returns live HTMLCollection
- Updates automatically if DOM changes
- Selected elements change as DOM changes
- Slightly slower due to dynamic updates
- Cannot use forEach directly (needs Array.from)
*/

console.log('--- Static NodeList ---');
/*
const nodeList = document.querySelectorAll('.item');
const nodeList2 = document.childNodes;

- Returns snapshot of current state
- Does NOT update if DOM changes
- Selected elements remain the same
- Can use forEach
- Faster for large operations
*/

console.log('--- Accessing items ---');
/*
Both HTMLCollection and NodeList:
collection[0] - first item
collection.item(0) - first item
collection.length - number of items
collection.namedItem('id') - by id (HTMLCollection only)
*/

console.log('--- Converting to array ---');
/*
const arr = Array.from(collection);
const arr2 = [...nodeList];
- Useful for methods like map, filter, forEach
- Static copy at that moment
*/

/*
==================================================
11) EVENT-RELATED PROPERTIES
==================================================
*/

console.log('--- Common event properties ---');
/*
element.onclick = function() {};
element.onmouseover = function() {};
element.onkeyup = function() {};
- Direct property assignment
- Only one handler per event type
- Easier for simple cases
*/

console.log('--- addEventListener (recommended) ---');
/*
element.addEventListener('click', handler);
- Can add multiple handlers for same event
- Can use event delegation
- Can remove listener with removeEventListener
*/

console.log('--- Event delegation ---');
/*
parent.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    // handle button click
  }
});
- Single listener for multiple children
- Useful for dynamically added elements
- More efficient than individual listeners
*/

/*
==================================================
12) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: innerText vs textContent ---');
/*
innerText:
- Returns only visible text
- Respects CSS display property
- Slower (requires layout information)

textContent:
- Returns all text
- Ignores visibility
- Faster
- Includes hidden script/style text
*/

console.log('--- Confusion 2: innerHTML vs textContent ---');
/*
innerHTML = '<p>text</p>' - creates paragraph element
textContent = '<p>text</p>' - displays literal string "<p>text</p>"
Always use textContent for text, innerHTML for HTML
*/

console.log('--- Confusion 3: HTMLCollection vs NodeList ---');
/*
HTMLCollection (live):
- getElementsByClassName(), getElementsByTagName()
- Updates when DOM changes
- Cannot use forEach

NodeList (static):
- querySelectorAll(), childNodes
- Snapshot, doesn't update
- Can use forEach
*/

console.log('--- Confusion 4: appendChild moves elements ---');
/*
const div = document.getElementById('first');
const section = document.getElementById('second');
section.appendChild(div); // div MOVES to section, not copied
// div is no longer in 'first' parent
*/

console.log('--- Confusion 5: className replaces all classes ---');
/*
element.className = 'new-class'; // removes all previous classes
element.classList.add('new-class'); // keeps existing classes
Always use classList for single class operations
*/

console.log('--- Confusion 6: style property is inline only ---');
/*
element.style.color; // only reads inline styles
window.getComputedStyle(element).color; // reads all styles
Stylesheet styles aren't accessible via element.style
*/

console.log('--- Confusion 7: getAttribute vs property ---');
/*
element.getAttribute('id') - always returns string from HTML
element.id - returns property value
element.getAttribute('value') - HTML attribute
element.value - current form value (can differ from attribute)
*/

console.log('--- Confusion 8: querySelectorAll is static ---');
/*
const items = document.querySelectorAll('.item');
// add new item to DOM
console.log(items.length); // SAME length (not updated)

const items2 = document.getElementsByClassName('item');
// add new item to DOM
console.log(items2.length); // increased length (live)
*/

/*
==================================================
13) USEFUL DOM PATTERNS
==================================================
*/

console.log('--- Delegated event listening ---');
/*
document.addEventListener('click', (e) => {
  const button = e.target.closest('.button');
  if (button) {
    console.log('Button clicked:', button.textContent);
  }
});
- Handles current and future elements
- More efficient than individual listeners
*/

console.log('--- Creating elements from HTML string ---');
/*
const container = document.createElement('div');
container.innerHTML = '<button class="btn">Click me</button>';
const button = container.querySelector('.btn');
- Safer than directly setting document.innerHTML
- Parses HTML without adding to page
*/

console.log('--- Checking element visibility ---');
/*
const isVisible = element.offsetParent !== null;
// or
const styles = window.getComputedStyle(element);
const isVisible = styles.display !== 'none';
*/

console.log('--- Getting element position ---');
/*
const rect = element.getBoundingClientRect();
console.log(rect.top, rect.left, rect.width, rect.height);
- Returns position relative to viewport
- Useful for positioning popups
*/

/*
==================================================
14) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: document.getElementById('x'); Element doesn't exist. Returns what?
A1: null
*/

/*
Q2: element.innerText vs element.textContent for hidden element?
A2: innerText ignores hidden (respects CSS), textContent includes it
*/

/*
Q3: element.className = 'new'; Existing classes after this?
A3: Replaced, only 'new' class remains
*/

/*
Q4: const list = document.getElementsByClassName('item'); DOM adds item. Length changed?
A4: Yes, HTMLCollection is live
*/

/*
Q5: const list = document.querySelectorAll('.item'); DOM adds item. Length changed?
A5: No, NodeList is static
*/

/*
Q6: parent.appendChild(child); child already in another parent. Result?
A6: child MOVES to new parent (not duplicated)
*/

/*
Q7: element.getAttribute('data-id') returns '123'. Type?
A7: String (always)
*/

/*
Q8: element.style.color = 'red'; element.classList.add('blue'); Final color?
A8: Depends on CSS, but inline style has higher specificity than class
*/

/*
==================================================
15) PRACTICE PROBLEMS
==================================================
*/

/* 1. Select an element by ID and change its text content. */

/* 2. Select all elements with a specific class and change their color. */

/* 3. Create a new element and add it to the page. */

/* 4. Remove an element from the DOM. */

/* 5. Toggle a class on an element when a button is clicked. */

/* 6. Get all text content from a div and its children. */

/* 7. Set multiple style properties on an element. */

/* 8. Check if an element has a specific attribute. */

/* 9. Add a click event listener to all buttons on a page. */

/* 10. Create and append multiple elements in a loop. */

/* 11. Insert an element before a specific element. */

/* 12. Get computed style of an element. */

/* 13. Find the parent of an element that has a specific class. */

/* 14. Clone an element and insert it into the DOM. */

/* 15. Get all child elements (not text nodes) of a parent. */

/*
==================================================
16) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is the DOM? */
/* A1. Document Object Model - a tree representation of HTML that allows JavaScript to interact with it. */

/* Q2. What is the difference between element and node? */
/* A2. Elements are HTML tags; nodes are all parts of the tree (elements, text, comments). */

/* Q3. What is the fastest way to select an element? */
/* A3. getElementById() is fastest for selecting a single element. */

/* Q4. What does querySelector return if no match? */
/* A4. null */

/* Q5. What does querySelectorAll return? */
/* A5. A static NodeList of all matching elements. */

/* Q6. Explain the difference between innerText and textContent. */
/* A6. innerText returns visible text; textContent returns all text regardless of visibility. */

/* Q7. What is innerHTML used for? */
/* A7. Getting or setting the HTML content of an element, including tags. */

/* Q8. What is the difference between getAttribute and property access? */
/* A8. getAttribute returns the HTML attribute value; property access returns the JavaScript property value. */

/* Q9. How do you add a class to an element? */
/* A9. element.classList.add('class-name') */

/* Q10. What is the difference between appendChild and insertBefore? */
/* A10. appendChild adds as the last child; insertBefore adds before a specific child. */

/* Q11. What is event delegation? */
/* A11. Adding a single listener to a parent to handle events from multiple children. */

/* Q12. What is the difference between HTMLCollection and NodeList? */
/* A12. HTMLCollection is live and updates with DOM changes; NodeList is static. */

/* Q13. How do you remove an element from the DOM? */
/* A13. element.remove() or parent.removeChild(element) */

/* Q14. What does getComputedStyle() return? */
/* A14. An object containing all computed style properties of an element. */

/* Q15. Why is insertAdjacentHTML potentially dangerous? */
/* A15. It parses HTML, creating an XSS vulnerability if used with unsanitized user input. */

/*
==================================================
17) THINGS TO REMEMBER
==================================================
*/

// - The DOM is a tree representation of the HTML.
// - Everything in the DOM is a node.
// - getElementById is the fastest selector.
// - querySelector is flexible but potentially slower.
// - querySelectorAll returns a static NodeList.
// - getElementsBy* returns a live HTMLCollection.
// - Use textContent for text, innerHTML for HTML.
// - classList is better than className for single operations.
// - element.style only accesses inline styles.
// - Use getComputedStyle() for all style properties.
// - appendChild moves elements, doesn't copy them.
// - Event delegation is more efficient than individual listeners.
// - HTMLCollection updates with DOM; NodeList doesn't.
// - Avoid innerHTML with untrusted user input (XSS risk).
// - Use data- attributes for custom data storage.
