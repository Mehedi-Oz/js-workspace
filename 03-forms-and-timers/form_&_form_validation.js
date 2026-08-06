/*
==================================================
FORMS & FORM VALIDATION IN JAVASCRIPT
==================================================
*/

/*
==================================================
1) FORMS OVERVIEW
==================================================
*/

/*
HTML forms collect user input.
JavaScript validates and processes form data.

Key points:
- Forms contain input, textarea, select elements
- FormData API helps collect form data
- Validation can be HTML5 or JavaScript
- preventDefault() stops default submission
- Form data can be sent via fetch or XMLHttpRequest
*/

console.log('--- Form structure ---');
/*
<form id="myForm">
  <input type="text" name="username" required>
  <input type="email" name="email" required>
  <textarea name="message"></textarea>
  <select name="country">
    <option value="">Select...</option>
    <option value="us">USA</option>
  </select>
  <input type="checkbox" name="agree" value="yes">
  <input type="radio" name="gender" value="male">
  <button type="submit">Submit</button>
</form>
*/

console.log('--- Forms allow user data input ---');
console.log('Validation ensures data quality');

/*
==================================================
2) FORM ELEMENTS ACCESS
==================================================
*/

console.log('--- Accessing form elements ---');
/*
// Get form
const form = document.getElementById('myForm');
const form2 = document.forms['myForm']; // by name
const form3 = document.forms[0];         // by index

// Access input by name
const username = form.elements['username'];
const username2 = form.username;  // shorthand

// Get all inputs
const inputs = form.querySelectorAll('input');
const inputs2 = form.getElementsByTagName('input');
*/

console.log('--- Form element values ---');
/*
Text input: element.value = 'text'
Textarea: element.value = 'text'
Select: element.value = 'option-value'
Checkbox: element.checked = true/false
Radio: element.checked = true/false
File: element.files = FileList object
*/

/*
==================================================
3) GETTING FORM DATA
==================================================
*/

console.log('--- Accessing individual input values ---');
/*
const username = form.elements['username'].value;
const email = form.elements['email'].value;
const agreed = form.elements['agree'].checked;
const country = form.elements['country'].value;
*/

console.log('--- FormData API ---');
/*
const formData = new FormData(form);

// Get individual values
const username = formData.get('username');
const email = formData.get('email');

// Get all values
const entries = formData.entries(); // iterator

// Convert to object
const obj = Object.fromEntries(formData);

// Send via fetch
fetch('/submit', {
  method: 'POST',
  body: formData
});

Useful for:
- Collecting all form data at once
- Sending files
- Creating multipart/form-data
*/

console.log('--- Manual object creation ---');
/*
const data = {
  username: form.elements['username'].value,
  email: form.elements['email'].value,
  agreed: form.elements['agree'].checked
};

// Send as JSON
fetch('/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
*/

console.log('--- Getting multiple values (checkboxes/radios) ---');
/*
// Multiple checkboxes with same name
const checkedboxes = form.querySelectorAll('input[name="interests"]:checked');
const values = Array.from(checkedboxes).map(cb => cb.value);

// Selected radio
const selected = form.querySelector('input[name="gender"]:checked');
const value = selected ? selected.value : null;
*/

/*
==================================================
4) HTML5 VALIDATION ATTRIBUTES
==================================================
*/

console.log('--- Built-in HTML5 validation ---');
/*
<input type="email" required>
<input type="number" min="1" max="100">
<input type="text" minlength="3" maxlength="20">
<input type="password" pattern="[A-Za-z0-9]{8,}">
<input type="url" required>

Attributes:
required     - field must have value
type         - input type (email, number, url, date, etc.)
min/max      - for numbers/dates
minlength    - minimum text length
maxlength    - maximum text length
pattern      - regex pattern to match
step         - for numbers (increment by)

Browser shows error message, prevents submission.
*/

console.log('--- Validation types ---');
/*
email    - must be valid email format
number   - must be valid number
url      - must be valid URL
date     - must be valid date
time     - must be valid time
color    - color picker
range    - slider
tel      - telephone number
search   - search input
*/

/*
==================================================
5) JAVASCRIPT VALIDATION
==================================================
*/

console.log('--- Manual validation on submit ---');
/*
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = form.elements['username'].value;

  if (username.length < 3) {
    alert('Username must be at least 3 characters');
    return;
  }

  // Validation passed, submit
  submitForm();
});
*/

console.log('--- Validation functions ---');
/*
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
}

const email = form.elements['email'].value;
if (!validateEmail(email)) {
  alert('Invalid email format');
}
*/

console.log('--- Real-time validation (input event) ---');
/*
const email = form.elements['email'];
email.addEventListener('input', (event) => {
  const value = event.target.value;
  const isValid = validateEmail(value);

  if (isValid) {
    event.target.classList.remove('error');
    event.target.classList.add('valid');
  } else {
    event.target.classList.add('error');
    event.target.classList.remove('valid');
  }
});
*/

console.log('--- Showing validation errors ---');
/*
function showError(inputElement, message) {
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  inputElement.after(error);
  inputElement.classList.add('input-error');
}

function clearErrors(form) {
  form.querySelectorAll('.error-message').forEach(e => e.remove());
  form.querySelectorAll('.input-error').forEach(e => {
    e.classList.remove('input-error');
  });
}
*/

/*
==================================================
6) FORM CONSTRAINT VALIDATION API
==================================================
*/

console.log('--- Constraint Validation API ---');
/*
Modern browsers provide validation API:

element.checkValidity() - returns true if valid
element.reportValidity() - shows validation UI
element.validity - object with validation details
form.checkValidity() - check all form elements
*/

console.log('--- Validity object ---');
/*
const input = form.elements['email'];
const validity = input.validity;

validity.valid - true if element is valid
validity.valueMissing - true if required field empty
validity.typeMismatch - true if wrong type
validity.patternMismatch - true if doesn't match pattern
validity.tooShort - true if too short
validity.tooLong - true if too long
validity.rangeUnderflow - true if below min
validity.rangeOverflow - true if above max
validity.stepMismatch - true if wrong step value
validity.customError - true if setCustomValidity() set
*/

console.log('--- Custom validation message ---');
/*
const password = form.elements['password'];

password.addEventListener('input', () => {
  if (password.value.length < 8) {
    password.setCustomValidity('Password must be 8+ characters');
  } else if (!/[A-Z]/.test(password.value)) {
    password.setCustomValidity('Password must have uppercase letter');
  } else {
    password.setCustomValidity(''); // clear error
  }
});

// Display custom message
password.reportValidity();
*/

console.log('--- Preventing browser validation ---');
/*
<form novalidate>
  <!-- form will not show browser validation -->
</form>

form.noValidate = true; // in JavaScript

Useful when:
- Want custom validation UI
- Want custom error messages
- Want different validation logic
*/

/*
==================================================
7) FORM SUBMISSION
==================================================
*/

console.log('--- Submit event ---');
/*
form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop default reload

  if (!validateForm()) {
    return;
  }

  sendFormData();
});

Submit fires when:
- User clicks submit button
- User presses Enter in input
- JavaScript calls form.submit()
*/

console.log('--- Form submission without reload ---');
/*
async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

form.addEventListener('submit', handleSubmit);
*/

console.log('--- Reset form ---');
/*
form.reset(); // clears all inputs to default

form.addEventListener('reset', (event) => {
  // Runs before reset
  event.preventDefault(); // optional, prevent reset
  // custom cleanup
});
*/

/*
==================================================
8) INPUT TYPES & VALIDATION
==================================================
*/

console.log('--- Common input types ---');
/*
text         - plain text
email        - email validation
password     - hidden text
number       - numeric validation
range        - slider
checkbox     - multiple selection
radio        - single selection
date         - date picker
time         - time picker
datetime-local - date and time
file         - file upload
color        - color picker
url          - URL validation
tel          - telephone
search       - search with clear button
hidden       - not displayed
submit       - submit button
reset        - reset button
button       - generic button
*/

console.log('--- File input ---');
/*
const fileInput = form.elements['file'];

fileInput.addEventListener('change', (event) => {
  const files = event.target.files; // FileList

  for (let file of files) {
    console.log('Name:', file.name);
    console.log('Size:', file.size);
    console.log('Type:', file.type);

    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('File too large');
      return;
    }
  }
});

// Clear file input
fileInput.value = '';
*/

console.log('--- Select element ---');
/*
const select = form.elements['country'];

// Get selected value
const selected = select.value;

// Get selected option element
const option = select.options[select.selectedIndex];
const text = option.text;

// Listen for change
select.addEventListener('change', (event) => {
  console.log('Selected:', event.target.value);
});

// Add option dynamically
const newOption = document.createElement('option');
newOption.value = 'us';
newOption.textContent = 'United States';
select.appendChild(newOption);
*/

/*
==================================================
9) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: preventDefault on form ---');
/*
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevents reload
  // Now you can process data yourself
});

Without preventDefault(), form reloads page (default behavior).
With preventDefault(), form doesn't reload, you control it.
*/

console.log('--- Confusion 2: input vs change ---');
/*
input:  fires continuously while user typing
change: fires after field loses focus

For validation feedback: use input (real-time)
For final validation: use change or submit
*/

console.log('--- Confusion 3: value property vs attribute ---');
/*
<input type="text" value="default">

element.value    - current value (can change)
element.getAttribute('value') - original HTML value

Resetting form: element.value reverts to value attribute
*/

console.log('--- Confusion 4: checked property vs checked attribute ---');
/*
<input type="checkbox" checked>

element.checked  - current state (true/false)
element.hasAttribute('checked') - has checked attribute

After user unchecks: checked is false, attribute still exists
*/

console.log('--- Confusion 5: FormData and null values ---');
/*
const formData = new FormData(form);
const unchecked = formData.get('unchecked_checkbox'); // null

Unchecked checkboxes and unselected radios aren't included in FormData.
Include them in manual object if needed.
*/

/*
==================================================
10) VALIDATION PATTERNS
==================================================
*/

console.log('--- Email validation ---');
/*
Simple: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
Better: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

Best: Use HTML5 email type or server-side validation
Email regex is complex, HTML5 is simpler.
*/

console.log('--- Password validation ---');
/*
At least 8 characters: /.{8,}/
With uppercase: /[A-Z]/
With number: /[0-9]/
With special char: /[!@#$%^&*]/

function validatePassword(pwd) {
  return pwd.length >= 8 &&
         /[A-Z]/.test(pwd) &&
         /[0-9]/.test(pwd) &&
         /[!@#$%^&*]/.test(pwd);
}
*/

console.log('--- URL validation ---');
/*
Simple: /^https?:\/\/.+\..+/i
Better: Use HTML5 url type
Best: Try parsing with URL constructor

try {
  new URL(urlString);
  console.log('Valid URL');
} catch {
  console.log('Invalid URL');
}
*/

console.log('--- Phone validation ---');
/*
US: /^\d{3}-?\d{3}-?\d{4}$/
Or just check: /^\d{10}$/ after removing non-digits

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}
*/

/*
==================================================
11) FORM VALIDATION CHECKLIST
==================================================
*/

console.log('--- Complete validation pattern ---');
/*
1. Get form reference
2. Add submit listener with preventDefault()
3. Get form data (FormData or manual)
4. Validate each field
5. Show errors if validation fails
6. Clear errors if validation passes
7. Send data if valid
8. Handle response

function validateForm() {
  clearErrors();
  const errors = {};

  const username = form.elements['username'].value;
  if (!username) errors.username = 'Required';
  else if (username.length < 3) errors.username = 'Too short';

  const email = form.elements['email'].value;
  if (!email) errors.email = 'Required';
  else if (!validateEmail(email)) errors.email = 'Invalid email';

  if (Object.keys(errors).length) {
    Object.entries(errors).forEach(([field, msg]) => {
      showError(form.elements[field], msg);
    });
    return false;
  }

  return true;
}
*/

/*
==================================================
12) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: preventDefault() called on submit. Form reloads?
A1: No, default submission prevented
*/

/*
Q2: Unchecked checkbox in FormData. Returns what?
A2: null or not included (not in FormData)
*/

/*
Q3: input event fires while user typing. change fires when?
A3: After field loses focus (blur)
*/

/*
Q4: element.value = 'new'. getAttribute('value') returns?
A4: Original value from HTML, not changed value
*/

/*
Q5: checkValidity() returns false. Form submits?
A5: No, if novalidate not set, browser blocks it
*/

/*
Q6: Select dropdown changed multiple times rapidly. change fires how many times?
A6: For each change, each time focus lost (if event listeners added)
*/

/*
Q7: File input filesize 6MB, max accepted 5MB. Uploaded?
A7: Depends on code validation, HTML doesn't limit file size
*/

/*
Q8: setCustomValidity('error') called. checkValidity() returns?
A8: false, element is invalid
*/

/*
==================================================
13) PRACTICE PROBLEMS
==================================================
*/

/* 1. Create a basic form with username and email fields. */

/* 2. Add HTML5 validation attributes to form inputs. */

/* 3. Add submit listener and prevent default reload. */

/* 4. Validate email format using regex or HTML5 type. */

/* 5. Show/hide error messages based on validation. */

/* 6. Get all form data using FormData API. */

/* 7. Validate password has uppercase, number, and 8+ chars. */

/* 8. Make real-time validation feedback (input event). */

/* 9. Handle form submission via fetch without reload. */

/* 10. Validate and submit file upload. */

/* 11. Clear form after successful submission. */

/* 12. Add custom validation message with setCustomValidity(). */

/* 13. Validate multiple checkbox selections. */

/* 14. Create dependent field validation (select triggers input). */

/* 15. Show form errors in a summary div. */

/*
==================================================
14) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What does preventDefault() do on form submit? */
/* A1. Stops default form submission behavior (page reload). */

/* Q2. How do you get form data? */
/* A2. FormData API or manually accessing element.value for each input. */

/* Q3. What is FormData? */
/* A3. Object that automatically collects form data and handles multipart/form-data. */

/* Q4. When should you use JavaScript validation vs HTML5 validation? */
/* A4. HTML5 for simple validation; JavaScript for complex logic and custom UX. */

/* Q5. What is the difference between input and change events? */
/* A5. input fires continuously while typing; change fires after blur. */

/* Q6. How do you prevent form submission if validation fails? */
/* A6. Return false or don't call submit code in preventDefault listener. */

/* Q7. What is checkValidity()? */
/* A7. Checks if element/form passes HTML5 validation, returns boolean. */

/* Q8. What is validity object? */
/* A8. Object containing detailed info about why validation failed (valueMissing, typeMismatch, etc.). */

/* Q9. How do you set custom validation message? */
/* A9. element.setCustomValidity('message'); then reportValidity() to show. */

/* Q10. Should you trust client-side validation? */
/* A10. No, always validate on server. Client validation is for UX only. */

/* Q11. How do you get file from file input? */
/* A11. element.files returns FileList; loop through to get File objects. */

/* Q12. How do you get selected value from select dropdown? */
/* A12. element.value returns value attribute of selected option. */

/* Q13. How do you know checkbox is checked? */
/* A13. element.checked returns true/false. */

/* Q14. What does form.reset() do? */
/* A14. Clears all form inputs to their default values. */

/* Q15. Can FormData send files? */
/* A15. Yes, FormData handles file uploads automatically. */

/*
==================================================
15) THINGS TO REMEMBER
==================================================
*/

// - Always use preventDefault() on form submit event.
// - Validate both client-side (UX) and server-side (security).
// - Use HTML5 validation for basic validation.
// - Use JavaScript validation for complex rules.
// - FormData is the easiest way to collect form data.
// - element.value gets current input value.
// - element.checked gets checkbox/radio state.
// - Always clear or show errors on failed validation.
// - Use input event for real-time validation.
// - Use change event for field-change validation.
// - Don't trust client-side validation alone.
// - Show clear error messages to users.
// - File inputs need special handling for size/type.
// - Unchecked checkboxes aren't included in FormData.
// - Server-side validation is always necessary.

/*
==================================================
16) FINAL MINI CHECKLIST
==================================================
*/

/*
- Have I prevented default form submission?
- Am I collecting form data correctly?
- Have I validated all required fields?
- Am I showing helpful error messages?
- Am I validating on both client and server?
- Have I tested with empty/invalid inputs?
- Am I handling file uploads if needed?
- Can user reset the form if needed?
- Am I sending data via fetch/AJAX?
- Have I handled API response/errors?
- Am I clearing errors before revalidation?
- Is my validation UX clear and helpful?
*/

console.log('Forms & Form Validation practice file loaded successfully.');
