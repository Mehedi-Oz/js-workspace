/*
==================================================
LOCALSTORAGE, SESSIONSTORAGE, AND COOKIES
==================================================
*/

/*
==================================================
1) WEB STORAGE OVERVIEW
==================================================
*/

/*
Web Storage allows storing data in the browser.

Types:
1. localStorage: persistent (survives browser restart)
2. sessionStorage: temporary (cleared when tab closes)
3. Cookies: small data with expiration and domain control

Key points:
- All are key-value stores
- Store strings only (must JSON.stringify objects)
- Limited size (typically 5-10MB per origin)
- Cannot store functions or complex objects directly
- Domain-specific (cannot share across domains)
*/

console.log('--- Storage overview ---');
console.log('localStorage: persistent until manually deleted');
console.log('sessionStorage: deleted when tab/window closes');
console.log('Cookies: small size, can expire, sent with requests');

/*
==================================================
2) LOCALSTORAGE BASICS
==================================================
*/

console.log('--- localStorage setItem ---');
/*
localStorage.setItem('key', 'value');

Stores a string value with key.
Overwrites if key already exists.
Cannot store objects directly (must JSON.stringify).

Example:
localStorage.setItem('username', 'alice');
localStorage.setItem('theme', 'dark');
localStorage.setItem('count', '42');
*/

console.log('--- localStorage getItem ---');
/*
const value = localStorage.getItem('key');

Returns string value or null if key doesn't exist.
Always returns string type (even if stored number).

Example:
const username = localStorage.getItem('username'); // 'alice'
const missing = localStorage.getItem('nothere'); // null

const count = localStorage.getItem('count');
typeof count; // 'string' not 'number'
parseInt(count); // 42 to convert
*/

console.log('--- localStorage removeItem ---');
/*
localStorage.removeItem('key');

Removes specific key-value pair.
Does nothing if key doesn't exist.

Example:
localStorage.removeItem('theme');
// 'theme' key is now gone
*/

console.log('--- localStorage clear ---');
/*
localStorage.clear();

Removes ALL key-value pairs for current origin.
Cannot be undone easily.

Example:
localStorage.clear(); // everything deleted
*/

console.log('--- localStorage length and key ---');
/*
localStorage.length - number of items stored

localStorage.key(index) - get key at index
// Useful for looping through all keys

Example:
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(key + ': ' + value);
}
*/

console.log('--- localStorage direct access (bracket notation) ---');
/*
localStorage['key'] = 'value'; // set
const value = localStorage['key']; // get
delete localStorage['key']; // remove (works but use removeItem)

// Works but not recommended, use setItem/getItem instead
// Less clear intent and harder to handle null values
*/

console.log('--- Checking if key exists ---');
/*
if (localStorage.getItem('key') !== null) {
  console.log('Key exists');
}

// or
if ('key' in localStorage) {
  console.log('Key exists');
}
*/

/*
==================================================
3) LOCALSTORAGE WITH JSON
==================================================
*/

console.log('--- Storing objects with JSON.stringify ---');
/*
const user = { name: 'Alice', age: 25, email: 'alice@email.com' };
localStorage.setItem('user', JSON.stringify(user));

localStorage.getItem('user');
// Returns: '{"name":"Alice","age":25,"email":"alice@email.com"}'
*/

console.log('--- Retrieving objects with JSON.parse ---');
/*
const userString = localStorage.getItem('user');
const user = JSON.parse(userString);
console.log(user.name); // 'Alice'

// Handle null if key doesn't exist
const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log(user.name); // undefined if didn't exist
*/

console.log('--- Storing arrays ---');
/*
const items = ['apple', 'banana', 'cherry'];
localStorage.setItem('items', JSON.stringify(items));

// Retrieve
const storedItems = JSON.parse(localStorage.getItem('items'));
storedItems.forEach(item => console.log(item));
*/

console.log('--- Storing complex data structures ---');
/*
const data = {
  user: { name: 'Bob', id: 1 },
  settings: { theme: 'dark', language: 'en' },
  lastActive: new Date().toISOString()
};

localStorage.setItem('appData', JSON.stringify(data));
const retrieved = JSON.parse(localStorage.getItem('appData'));
*/

console.log('--- Error handling with JSON ---');
/*
try {
  const data = JSON.parse(localStorage.getItem('config'));
  console.log(data);
} catch (error) {
  console.log('Invalid JSON in storage');
  localStorage.removeItem('config');
}

Corrupted JSON in storage will throw error.
Good practice to handle with try-catch.
*/

/*
==================================================
4) SESSIONSTORAGE BASICS
==================================================
*/

console.log('--- sessionStorage API ---');
/*
sessionStorage.setItem(key, value);
sessionStorage.getItem(key);
sessionStorage.removeItem(key);
sessionStorage.clear();
sessionStorage.length;
sessionStorage.key(index);

Same API as localStorage but data expires when:
- Tab is closed
- Window is closed
- Browser is closed

Persists across page reloads within same tab/window.
*/

console.log('--- Practical sessionStorage use cases ---');
/*
1. Temporary user session data
2. Page state while user browses
3. Shopping cart during session
4. Form progress before submission
5. Temporary tokens (not for long-term)

Example:
sessionStorage.setItem('cartItems', JSON.stringify(cart));
sessionStorage.setItem('currentPage', 'products');
sessionStorage.setItem('sessionToken', 'abc123');
*/

console.log('--- sessionStorage vs localStorage ---');
/*
localStorage:
- Persists after browser close
- Good for preferences, settings
- Good for data user wants saved

sessionStorage:
- Clears when tab closes
- Good for temporary data
- Good for session-specific info
- More secure for sensitive data
*/

/*
==================================================
5) COOKIES BASICS
==================================================
*/

console.log('--- Cookie structure ---');
/*
Cookies are stored as: name=value; attributes

Example:
document.cookie = 'username=alice';
document.cookie = 'theme=dark';

Setting multiple attributes:
document.cookie = 'sessionId=abc123; path=/; secure; httpOnly';

Common attributes:
path=/        - cookie available on entire site
path=/admin   - cookie only on /admin pages
domain=example.com - cookie available to all subdomains
max-age=3600  - cookie expires in 3600 seconds (1 hour)
expires=...   - expires at specific date/time
secure        - only sent over HTTPS
httpOnly      - not accessible from JavaScript (server-side only)
sameSite=Lax  - prevent cross-site cookie sending
*/

console.log('--- Setting cookies ---');
/*
// Simple cookie (session cookie, expires when browser closes)
document.cookie = 'user=john';

// Cookie with expiration (7 days)
const date = new Date();
date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
document.cookie = 'theme=dark; expires=' + date.toUTCString();

// Cookie with path and secure
document.cookie = 'token=xyz; path=/; secure';

// Using max-age (3 hours)
document.cookie = 'sessionId=123; max-age=10800; path=/';
*/

console.log('--- Reading cookies ---');
/*
document.cookie returns all cookies as string:
'username=alice; theme=dark; sessionId=123'

To read specific cookie:
function getCookie(name) {
  const nameEQ = name + '=';
  const cookies = document.cookie.split('; ');

  for (let cookie of cookies) {
    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
}

const username = getCookie('username'); // 'alice'
*/

console.log('--- Deleting cookies ---');
/*
// Set max-age to 0 or past expiration date
document.cookie = 'username=; max-age=0';

// or use past date
const date = new Date();
date.setTime(date.getTime() - 1);
document.cookie = 'username=; expires=' + date.toUTCString();

Function:
function deleteCookie(name) {
  document.cookie = name + '=; max-age=0';
}

deleteCookie('username');
*/

console.log('--- Cookie limitations ---');
/*
- Small size (~4KB per cookie)
- Sent with every HTTP request (inefficient)
- Can be accessed by any JavaScript (unless httpOnly)
- Subject to same-origin policy
- Limited number (~180 per domain)
- Cannot store complex objects directly
- httpOnly cookies not accessible from JavaScript

Note: httpOnly cookies can only be set by server.
*/

/*
==================================================
6) COMPARING STORAGE OPTIONS
==================================================
*/

console.log('--- Storage comparison table ---');
/*
localStorage:
- Size: ~5-10MB
- Persistent: Yes
- Domain-specific: Yes
- Sent with requests: No
- JavaScript accessible: Yes
- Perfect for: User preferences, persistent data

sessionStorage:
- Size: ~5-10MB
- Persistent: No (until tab closes)
- Domain-specific: Yes
- Sent with requests: No
- JavaScript accessible: Yes
- Perfect for: Temporary session data

Cookies:
- Size: ~4KB each
- Persistent: Yes (if set)
- Domain-specific: Yes
- Sent with requests: Yes
- JavaScript accessible: Yes (unless httpOnly)
- Perfect for: Authentication, tracking
*/

/*
==================================================
7) PRACTICAL PATTERNS
==================================================
*/

console.log('--- Store and retrieve user preferences ---');
/*
// Store preferences
const prefs = {
  theme: 'dark',
  language: 'en',
  fontSize: 14,
  notifications: true
};
localStorage.setItem('userPrefs', JSON.stringify(prefs));

// Load preferences on app start
const stored = localStorage.getItem('userPrefs');
const userPrefs = stored ? JSON.parse(stored) : {};
*/

console.log('--- Caching API responses ---');
/*
async function fetchData(url, cacheKey) {
  // Check cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from API
  const response = await fetch(url);
  const data = await response.json();

  // Store in cache
  localStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
}

const users = await fetchData('/api/users', 'users_cache');
*/

console.log('--- Remember form data ---');
/*
const form = document.getElementById('form');

// Save on input
form.addEventListener('submit', (e) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  localStorage.setItem('formDraft', JSON.stringify(data));
});

// Load on page load
window.addEventListener('load', () => {
  const draft = localStorage.getItem('formDraft');
  if (draft) {
    const data = JSON.parse(draft);
    Object.entries(data).forEach(([key, value]) => {
      const input = form.elements[key];
      if (input) input.value = value;
    });
  }
});
*/

console.log('--- Authentication token storage ---');
/*
// Store token after login
localStorage.setItem('authToken', token);

// Use token in requests
const token = localStorage.getItem('authToken');
fetch('/api/data', {
  headers: { 'Authorization': 'Bearer ' + token }
});

// Clear on logout
localStorage.removeItem('authToken');

// Better: use sessionStorage for tokens
sessionStorage.setItem('authToken', token);
*/

/*
==================================================
8) SECURITY CONSIDERATIONS
==================================================
*/

console.log('--- localStorage security concerns ---');
/*
1. Accessible to all JavaScript on page (XSS risk)
2. Accessible by browser extensions
3. Not sent with requests (more secure than cookies)
4. Data stored in plain text
5. Cannot be marked as httpOnly

Never store:
- Passwords
- Sensitive tokens (if XSS vulnerable)
- Credit card info
- Private user data

For sensitive data: use httpOnly cookies (server-side only)
*/

console.log('--- Preventing XSS with storage ---');
/*
// Bad: storing sensitive data that can be stolen by XSS
localStorage.setItem('adminToken', token);

// Better: use sessionStorage for shorter duration
sessionStorage.setItem('sessionToken', token);

// Best: use httpOnly cookie (set by server)
// Accessible only by server, not JavaScript

// Additional: validate data before using
const data = localStorage.getItem('user');
try {
  const user = JSON.parse(data);
  // Validate user object
} catch {
  console.log('Invalid stored data');
  localStorage.removeItem('user');
}
*/

console.log('--- Storage quota management ---');
/*
Try to estimate and limit stored data:

const maxStorage = 5 * 1024 * 1024; // 5MB
let currentSize = 0;

function addToStorage(key, value) {
  const size = key.length + JSON.stringify(value).length;

  if (currentSize + size > maxStorage) {
    console.log('Storage quota exceeded');
    localStorage.clear(); // clear old data
  }

  localStorage.setItem(key, JSON.stringify(value));
  currentSize += size;
}
*/

/*
==================================================
9) STORAGE EVENTS
==================================================
*/

console.log('--- storage event (cross-tab sync) ---');
/*
When localStorage changes in another tab, storage event fires.

window.addEventListener('storage', (event) => {
  console.log('Storage changed in another tab');
  console.log('Key:', event.key);
  console.log('New value:', event.newValue);
  console.log('Old value:', event.oldValue);

  // Reload data if needed
  if (event.key === 'userPrefs') {
    const prefs = JSON.parse(event.newValue);
    updateUI(prefs);
  }
});

Note:
- Only fires in OTHER tabs/windows
- Not in tab that made the change
- Useful for real-time sync across tabs
- sessionStorage doesn't trigger storage event
*/

console.log('--- Cross-tab communication ---');
/*
// Tab 1: Save data
localStorage.setItem('sharedData', JSON.stringify(data));

// Tab 2: Listen for changes
window.addEventListener('storage', (event) => {
  if (event.key === 'sharedData') {
    const newData = JSON.parse(event.newValue);
    console.log('Received from other tab:', newData);
  }
});

Useful for:
- Notifying other tabs of changes
- Syncing state across tabs
- Logging out all tabs at once
*/

/*
==================================================
10) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: localStorage stores strings only ---');
/*
const num = 42;
localStorage.setItem('count', num); // stores as string '42'

localStorage.getItem('count'); // returns '42' (string)
localStorage.getItem('count') + 1; // '421' not 43!

Must convert: parseInt(localStorage.getItem('count')) + 1
*/

console.log('--- Confusion 2: JSON.parse(null) throws ---');
/*
const data = localStorage.getItem('missing');
data; // null

JSON.parse(data); // ERROR: SyntaxError

Must check first or use default:
const parsed = JSON.parse(data || '{}');
*/

console.log('--- Confusion 3: storage event not in same tab ---');
/*
localStorage.setItem('key', 'value');
// storage event does NOT fire in this tab

// Other tabs see storage event
// Only way to detect in same tab: no event, check manually
*/

console.log('--- Confusion 4: sessionStorage is tab-specific ---');
/*
Tab 1: sessionStorage.setItem('x', 'value');

Tab 2: sessionStorage.getItem('x'); // null

Each tab has its own sessionStorage instance.
Cannot share sessionStorage between tabs.
*/

console.log('--- Confusion 5: Cookies sent with every request ---');
/*
document.cookie = 'name=value';

// Automatically sent with every HTTP request
// Increases request size
// Use only for data needed by server

localStorage doesn't have this overhead.
*/

/*
==================================================
11) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: localStorage.getItem('missing') returns what?
A1: null
*/

/*
Q2: Storing 42, getItem returns type?
A2: string '42', not number
*/

/*
Q3: JSON.parse(localStorage.getItem('data')) where data not set?
A3: SyntaxError (null is not valid JSON)
*/

/*
Q4: sessionStorage after browser closes?
A4: Cleared, all data gone
*/

/*
Q5: document.cookie shows what?
A5: String of all cookies: 'name1=value1; name2=value2'
*/

/*
Q6: localStorage.clear() in tab 1. Tab 2 sees storage event?
A6: Yes, if they have same origin
*/

/*
Q7: httpOnly cookie via JavaScript: document.cookie = 'name=value'?
A7: Cannot set httpOnly from JavaScript, only server can
*/

/*
Q8: Cookie size limit? localStorage size limit?
A8: Cookie ~4KB, localStorage ~5-10MB
*/

/*
==================================================
12) PRACTICE PROBLEMS
==================================================
*/

/* 1. Store and retrieve user name using localStorage. */

/* 2. Store a user object and parse it back. */

/* 3. Clear all localStorage data. */

/* 4. Store data in sessionStorage that expires on tab close. */

/* 5. Create function to check if localStorage key exists. */

/* 6. Loop through all localStorage keys and log them. */

/* 7. Set a cookie with 1 day expiration. */

/* 8. Read a specific cookie value. */

/* 9. Delete a cookie. */

/* 10. Store form data and restore on page load. */

/* 11. Implement counter that increments in localStorage. */

/* 12. Cache API response and return cached if available. */

/* 13. Listen for storage events from other tabs. */

/* 14. Store preferences and apply on page load. */

/* 15. Sync data across multiple browser tabs. */

/*
==================================================
13) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is localStorage? */
/* A1. Browser API that stores key-value pairs persistently until manually deleted. */

/* Q2. What is sessionStorage? */
/* A2. Browser API that stores key-value pairs temporarily, cleared when tab closes. */

/* Q3. What is a cookie? */
/* A3. Small piece of data stored by browser, sent with HTTP requests, can have expiration. */

/* Q4. How much can you store in localStorage? */
/* A4. Typically 5-10MB per origin. */

/* Q5. How much can you store in a cookie? */
/* A5. Typically around 4KB per cookie. */

/* Q6. Can you store objects directly in localStorage? */
/* A6. No, only strings. Must use JSON.stringify. */

/* Q7. What does localStorage.getItem return if key doesn't exist? */
/* A7: null */

/* Q8. How do you delete a specific localStorage item? */
/* A8. localStorage.removeItem('key') */

/* Q9. What is the difference between localStorage and sessionStorage? */
/* A9. localStorage is persistent; sessionStorage is cleared when tab closes. */

/* Q10. What is httpOnly cookie? */
/* A10. Cookie that cannot be accessed by JavaScript, only sent by server. */

/* Q11. Are localStorage and sessionStorage sent with HTTP requests? */
/* A11. No, only cookies are sent automatically. */

/* Q12. What triggers storage event? */
/* A12. Changes to localStorage in OTHER tabs/windows of same origin. */

/* Q13. Can you share localStorage between different tabs? */
/* A13. Yes, via storage events (notifications of changes). */

/* Q14. Can you share sessionStorage between different tabs? */
/* A14. No, each tab has its own separate sessionStorage. */

/* Q15. What is the maximum number of cookies per domain? */
/* A15. Typically around 180 cookies per domain. */

/*
==================================================
14) THINGS TO REMEMBER
==================================================
*/

// - localStorage and sessionStorage store only strings.
// - Use JSON.stringify and JSON.parse for objects.
// - localStorage persists indefinitely until deleted.
// - sessionStorage clears when tab/window closes.
// - Cookies are small and sent with every HTTP request.
// - Check for null before JSON.parse.
// - Don't store sensitive data in localStorage (XSS risk).
// - Use sessionStorage for temporary session data.
// - httpOnly cookies can only be set by server.
// - storage event only fires in other tabs, not current tab.
// - Each tab has separate sessionStorage instance.
// - localStorage is shared across all tabs of same origin.
// - localStorage size is much larger than cookies.
// - Always clear sensitive data on logout.
// - Consider storage quota when storing large data.

/*
==================================================
15) FINAL MINI CHECKLIST
==================================================
*/

/*
- Am I storing strings (if not, use JSON)?
- Have I handled null from getItem?
- Should I use localStorage or sessionStorage?
- Is this data sensitive (avoid localStorage)?
- Have I considered storage quota?
- Do I need to clear this data later?
- Should I sync across tabs (use storage event)?
- Is this security-sensitive (use httpOnly cookies)?
- Have I set proper cookie attributes (path, expires)?
- Can I test this works after browser restart?
- Have I handled JSON.parse errors?
- Am I overwriting existing keys?
*/

console.log('localStorage, sessionStorage, and Cookies practice file loaded successfully.');
