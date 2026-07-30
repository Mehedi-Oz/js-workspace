/*
==================================================
OBJECTS IN JAVASCRIPT
==================================================
*/

/*
This file is a compact practice companion for objects.
It includes explanations, runnable examples, output questions,
practice problems, viva questions, and things to remember.
*/

/*
==================================================
1) OBJECT OVERVIEW
==================================================
*/

/*
An object is an unordered collection of key-value pairs.
Keys are strings or symbols, values can be any data type.

Key points:
- Objects store related data and functions together
- Properties accessed by key (not index like arrays)
- Mutable (can be changed)
- Keys must be unique
- Can hold any data type as values
*/

console.log('--- Object overview example ---');
const person = {
  name: 'Alice',
  age: 25,
  city: 'New York'
};
console.log(person);
console.log('Keys:', Object.keys(person));
console.log('Number of properties:', Object.keys(person).length);

/*
==================================================
2) CREATING & ACCESSING OBJECTS
==================================================
*/

console.log('--- Creating objects: literal syntax ---');
const obj1 = { name: 'Bob', age: 30 };
const obj2 = {};
console.log('obj1:', obj1);
console.log('obj2:', obj2);

console.log('--- Creating objects: constructor ---');
const obj3 = new Object();
obj3.name = 'Charlie';
obj3.age = 35;
console.log('obj3:', obj3);

console.log('--- Dot notation vs Bracket notation ---');
const car = { brand: 'Toyota', model: 'Camry', year: 2020 };
console.log('Dot notation - brand:', car.brand);
console.log('Bracket notation - brand:', car['brand']);

console.log('--- When to use bracket notation ---');
const dynamicKey = 'model';
console.log('Using variable key:', car[dynamicKey]);

console.log('--- Keys with spaces or special chars require bracket ---');
const config = { 'max-width': '100px', 'font-size': '14px' };
console.log('max-width:', config['max-width']);

console.log('--- Adding properties dynamically ---');
const student = { name: 'David' };
student.grade = 'A';
student['email'] = 'david@email.com';
console.log(student);

console.log('--- Deleting properties ---');
const temp = { a: 1, b: 2, c: 3 };
delete temp.b;
console.log('After delete:', temp);

console.log('--- Checking if property exists ---');
const user = { username: 'john', active: true };
console.log('Has username?', 'username' in user);
console.log('Has password?', 'password' in user);
console.log('Has username (own property)?', user.hasOwnProperty('username'));

console.log('--- undefined vs property not existing ---');
const obj = { prop: undefined };
console.log('obj.prop:', obj.prop);
console.log('obj.missing:', obj.missing);
console.log('Are they the same?', obj.prop === obj.missing);

/*
==================================================
3) NESTED OBJECTS & DEEP ACCESS
==================================================
*/

console.log('--- Nesting objects ---');
const company = {
  name: 'TechCorp',
  ceo: {
    name: 'Emma',
    age: 45,
    office: {
      floor: 10,
      city: 'San Francisco'
    }
  },
  employees: 150
};
console.log('Company:', company);

console.log('--- Accessing nested properties ---');
console.log('CEO name:', company.ceo.name);
console.log('Office city:', company.ceo.office.city);
console.log('Using bracket:', company['ceo']['office']['city']);

console.log('--- Error when accessing deeply without checking ---');
const incomplete = { data: {} };
console.log('incomplete.data.value:', incomplete.data.value);
console.log('This returns undefined without error');

/*
==================================================
4) OPTIONAL CHAINING (?.)
==================================================
*/

console.log('--- Optional chaining: safe deep access ---');
const profile = { user: { address: { city: 'Boston' } } };
console.log('With optional chaining:', profile.user?.address?.city);
console.log('Missing property:', profile.user?.email);
console.log('Deeply missing:', profile.settings?.theme?.color);

console.log('--- Optional chaining with method calls ---');
const obj_methods = { greet: () => 'Hello' };
console.log('Method exists:', obj_methods.greet?.());

const obj_no_method = {};
console.log('Method missing:', obj_no_method.greet?.());

console.log('--- Optional chaining with bracket notation ---');
const data = { items: [1, 2, 3] };
console.log('With bracket:', data['items']?.[0]);
console.log('Missing:', data['missing']?.[0]);

/*
==================================================
5) DESTRUCTURING OBJECTS
==================================================
*/

console.log('--- Basic destructuring ---');
const book = { title: 'JavaScript Guide', author: 'Kyle Simpson', pages: 600 };
const { title, author } = book;
console.log('Title:', title);
console.log('Author:', author);

console.log('--- Destructuring with renaming ---');
const { title: bookTitle, author: bookAuthor } = book;
console.log('Renamed - bookTitle:', bookTitle);
console.log('Renamed - bookAuthor:', bookAuthor);

console.log('--- Destructuring with default values ---');
const { title: t, rating = 5 } = { title: 'Book' };
console.log('Title:', t);
console.log('Rating (default):', rating);

console.log('--- Destructuring with rest operator ---');
const product = { id: 1, name: 'Laptop', price: 999, stock: 5 };
const { id, name, ...details } = product;
console.log('ID:', id);
console.log('Name:', name);
console.log('Rest:', details);

console.log('--- Nested destructuring ---');
const employee = {
  id: 101,
  personal: { name: 'Frank', age: 28 },
  contact: { email: 'frank@email.com' }
};
const { personal: { name: empName }, contact: { email } } = employee;
console.log('Employee name:', empName);
console.log('Email:', email);

console.log('--- Destructuring in function parameters ---');
const showUser = ({ name, age }) => {
  console.log(`User: ${name}, Age: ${age}`);
};
showUser({ name: 'Grace', age: 32, city: 'LA' });

/*
==================================================
6) DOT VS BRACKET NOTATION
==================================================
*/

console.log('--- Pros and cons summary ---');
const settings = { 'dark-mode': true, fontSize: 14 };

console.log('Dot notation:');
console.log('  Pro: Cleaner, easier to read');
console.log('  Con: Cannot use spaces or special characters');
console.log('  Con: Cannot use variables as keys');

console.log('Bracket notation:');
console.log('  Pro: Works with any key format');
console.log('  Pro: Can use variables as keys');
console.log('  Con: More verbose');

console.log('Example:', settings['dark-mode']);
const keyName = 'fontSize';
console.log('Using variable:', settings[keyName]);

/*
==================================================
7) LOOPING OBJECTS
==================================================
*/

const scores = { alice: 85, bob: 92, charlie: 78 };

console.log('--- for...in loop ---');
for (let name in scores) {
  console.log(`${name}: ${scores[name]}`);
}

console.log('--- for...in includes inherited properties ---');
const animal = { name: 'Dog' };
animal.constructor.prototype.type = 'Mammal';
for (let key in animal) {
  console.log(`${key}: ${animal[key]}`);
}
console.log('Use hasOwnProperty to filter inherited:');
for (let key in animal) {
  if (animal.hasOwnProperty(key)) {
    console.log(`${key}: ${animal[key]}`);
  }
}

console.log('--- Object.keys() ---');
const person2 = { name: 'Henry', age: 40, job: 'Engineer' };
const keys = Object.keys(person2);
console.log('Keys:', keys);
keys.forEach(key => {
  console.log(`${key}: ${person2[key]}`);
});

console.log('--- Object.values() ---');
const values = Object.values(person2);
console.log('Values:', values);

console.log('--- Object.entries() ---');
const entries = Object.entries(person2);
console.log('Entries:', entries);
entries.forEach(([key, value]) => {
  console.log(`${key} => ${value}`);
});

console.log('--- Object.getOwnPropertyNames() ---');
const obj_props = { visible: 1 };
Object.defineProperty(obj_props, 'hidden', { value: 2, enumerable: false });
console.log('Keys:', Object.keys(obj_props));
console.log('Property names:', Object.getOwnPropertyNames(obj_props));

/*
==================================================
8) COMPUTED PROPERTIES
==================================================
*/

console.log('--- Computed property names in literals ---');
const prefix = 'user_';
const dynamicObj = {
  [prefix + 'name']: 'Iris',
  [prefix + 'id']: 1001,
  ['status']: 'active'
};
console.log(dynamicObj);

console.log('--- Using expressions in computed properties ---');
const propNum = 1;
const obj_computed = {
  [`prop_${propNum}`]: 'value1',
  [`prop_${propNum + 1}`]: 'value2'
};
console.log(obj_computed);

console.log('--- Computed properties with functions ---');
const config_computed = {
  [(() => 'generated_key')()]: 'dynamic value'
};
console.log(config_computed);

/*
==================================================
9) COPYING OBJECTS
==================================================
*/

console.log('--- Shallow copy: reference assignment ---');
const original = { a: 1, b: 2 };
const reference = original;
reference.a = 99;
console.log('Original after change via reference:', original);
console.log('They are the same object:', original === reference);

console.log('--- Shallow copy: Object.assign() ---');
const source = { x: 10, y: 20 };
const target = {};
Object.assign(target, source);
console.log('Target:', target);
target.x = 99;
console.log('Source after modifying target:', source);

console.log('--- Shallow copy: Object.assign with multiple sources ---');
const obj_a = { a: 1 };
const obj_b = { b: 2 };
const obj_c = { c: 3 };
const merged = Object.assign({}, obj_a, obj_b, obj_c);
console.log('Merged:', merged);

console.log('--- Shallow copy: spread operator ---');
const original2 = { name: 'Jack', age: 28 };
const copy = { ...original2 };
console.log('Copy:', copy);
copy.name = 'Jill';
console.log('Original:', original2);
console.log('Different objects:', original2 !== copy);

console.log('--- Shallow copy: spread with overrides ---');
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { ...defaults, theme: 'dark' };
console.log('User preferences:', userPrefs);

console.log('--- Shallow copy issue: nested objects ---');
const nested_orig = { user: { name: 'Kate', age: 30 } };
const nested_copy = { ...nested_orig };
nested_copy.user.name = 'Katherine';
console.log('Original nested obj changed:', nested_orig);
console.log('Problem: nested objects still reference the same object');

console.log('--- Deep clone: JSON method ---');
const deep_original = { a: 1, b: { c: 2 } };
const deep_copy = JSON.parse(JSON.stringify(deep_original));
deep_copy.b.c = 99;
console.log('Original deep object:', deep_original);
console.log('Deep copy independent:', deep_copy);
console.log('Limitation: methods and symbols are lost');

console.log('--- Deep clone: structuredClone (modern) ---');
const complex = { name: 'Leo', meta: { type: 'user' }, func: () => { } };
const cloned = structuredClone(complex);
console.log('Cloned:', cloned);

console.log('--- Deep clone: custom recursive function ---');
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};
const to_clone = { x: 1, y: { z: 2 } };
const manual_clone = deepClone(to_clone);
manual_clone.y.z = 99;
console.log('Original:', to_clone);
console.log('Manual clone:', manual_clone);

/*
==================================================
10) OBJECT METHODS & UTILITIES
==================================================
*/

console.log('--- Object.freeze() prevents changes ---');
const frozen = { id: 1, name: 'Mike' };
Object.freeze(frozen);
frozen.name = 'Michael';
console.log('Frozen object after change attempt:', frozen);
console.log('Change was ignored (strict mode would throw)');

console.log('--- Object.seal() allows property changes only ---');
const sealed = { id: 2, title: 'Event' };
Object.seal(sealed);
sealed.title = 'Big Event';
sealed.date = '2024-01-01';
console.log('Sealed after changes:', sealed);
console.log('New property ignored');

console.log('--- Object.create() with prototype ---');
const proto = { greet: () => 'Hello' };
const obj_created = Object.create(proto);
obj_created.name = 'Nathan';
console.log('Created object:', obj_created);
console.log('Has name:', obj_created.name);
console.log('Inherited greet:', obj_created.greet());

console.log('--- Object.defineProperty() ---');
const defined = {};
Object.defineProperty(defined, 'count', {
  value: 0,
  writable: false,
  enumerable: true
});
console.log('Defined object:', defined);
defined.count = 99;
console.log('After assignment attempt:', defined.count);

console.log('--- Object.getOwnPropertyDescriptor() ---');
const descriptor = Object.getOwnPropertyDescriptor(defined, 'count');
console.log('Property descriptor:', descriptor);

/*
==================================================
11) THIS KEYWORD IN OBJECTS
==================================================
*/

console.log('--- this inside object method ---');
const calculator = {
  value: 10,
  add: function (n) {
    this.value += n;
    return this;
  },
  get: function () {
    return this.value;
  }
};
console.log('Initial:', calculator.get());
calculator.add(5);
console.log('After add(5):', calculator.get());

console.log('--- Arrow functions do not have their own this ---');
const counter = {
  count: 0,
  increment: function () {
    this.count++;
  },
  incrementArrow: () => {
    this.count++;
  }
};
counter.increment();
console.log('After increment():', counter.count);
counter.incrementArrow();
console.log('After incrementArrow():', counter.count);
console.log('Arrow function this refers to global scope');

/*
==================================================
12) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: Object equality ---');
const obj1_eq = { a: 1 };
const obj2_eq = { a: 1 };
console.log('Same structure but different objects:', obj1_eq === obj2_eq);
console.log('Only same if same reference:', obj1_eq === obj1_eq);

console.log('--- Confusion 2: Shallow vs deep copy ---');
const original_conf = { level1: { level2: { value: 'nested' } } };
const shallow = { ...original_conf };
shallow.level1.level2.value = 'changed';
console.log('Original after shallow copy change:', original_conf);
console.log('Nested reference still shared');

console.log('--- Confusion 3: for...in vs Object.keys ---');
function checkLoop(obj) {
  console.log('for...in results:');
  for (let key in obj) {
    console.log('  ' + key);
  }
  console.log('Object.keys results:');
  console.log('  ' + Object.keys(obj));
}
checkLoop({ a: 1, b: 2 });

console.log('--- Confusion 4: Bracket notation with numbers ---');
const num_obj = {};
num_obj[1] = 'one';
num_obj['1'] = 'ONE';
console.log('obj[1]:', num_obj[1]);
console.log('Numbers convert to strings as keys');

console.log('--- Confusion 5: delete vs setting to undefined ---');
const to_delete = { a: 1, b: 2 };
delete to_delete.a;
to_delete.b = undefined;
console.log('After delete and undefined:', to_delete);
console.log('delete removes the key; undefined keeps it');

console.log('--- Confusion 6: Property enumeration order ---');
const ordered = {};
ordered[3] = 'three';
ordered[1] = 'one';
ordered.name = 'test';
ordered[2] = 'two';
console.log('Keys in order:', Object.keys(ordered));
console.log('Numbers first (ascending), then strings in insertion order');

console.log('--- Confusion 7: Truthy objects ---');
const empty_obj = {};
if (empty_obj) {
  console.log('Empty object is truthy');
}
const arr_check = [];
if (arr_check) {
  console.log('Empty array is also truthy');
}

/*
==================================================
13) OBJECT PATTERNS & TECHNIQUES
==================================================
*/

console.log('--- Creating object with null prototype ---');
const clean = Object.create(null);
clean.data = 'value';
console.log('Clean object:', clean);
console.log('Has toString:', clean.toString);

console.log('--- Object.fromEntries() ---');
const entries_arr = [['name', 'Oscar'], ['age', 25], ['city', 'Chicago']];
const from_entries = Object.fromEntries(entries_arr);
console.log('From entries:', from_entries);

console.log('--- Using Symbol as key ---');
const id = Symbol('id');
const sym_obj = { [id]: 12345, name: 'Secret' };
console.log('Object:', sym_obj);
console.log('Accessing symbol key:', sym_obj[id]);
console.log('Not included in Object.keys():', Object.keys(sym_obj));

console.log('--- Getters and setters ---');
const account = {
  _balance: 0,
  get balance() {
    return this._balance;
  },
  set balance(amount) {
    if (amount >= 0) this._balance = amount;
  }
};
account.balance = 500;
console.log('Balance:', account.balance);
account.balance = -100;
console.log('After invalid set:', account.balance);

/*
==================================================
14) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: const obj = { a: 1 }; delete obj.a; What is obj.a?
A1: undefined
*/

/*
Q2: const x = { b: 2 }; const y = x; y.b = 99; What is x.b?
A2: 99 (same reference)
*/

/*
Q3: const { a, b } = { a: 1, b: 2, c: 3 }; What is b?
A3: 2
*/

/*
Q4: Object.keys({ 3: 'three', 1: 'one', name: 'test' }) returns what?
A4: ['1', '3', 'name']
*/

/*
Q5: const copy = { ...{ a: 1, b: { c: 2 } } }; copy.b.c = 99; Original unchanged?
A5: No, nested objects are still shared (shallow copy)
*/

/*
Q6: Object.freeze(obj); obj.x = 5; Does x get added?
A6: No, frozen objects cannot be modified
*/

/*
Q7: const obj = { a: 1 }; 'a' in obj; Result?
A7: true
*/

/*
Q8: What does Object.entries({ x: 10, y: 20 }) return?
A8: [['x', 10], ['y', 20]]
*/

/*
==================================================
15) PRACTICE PROBLEMS
==================================================
*/

/* 1. Create an object representing a book with title, author, and year. */

/* 2. Add a new property (pages) to the book object. */

/* 3. Access a property using bracket notation with a variable. */

/* 4. Delete a property from an object. */

/* 5. Loop through an object and print all key-value pairs. */

/* 6. Merge two objects together. */

/* 7. Create a shallow copy of an object. */

/* 8. Destructure an object to extract specific properties. */

/* 9. Check if a key exists in an object. */

/* 10. Create a deep clone of a nested object. */

/* 11. Convert an object to an array of key-value pairs. */

/* 12. Filter object properties based on a condition. */

/* 13. Create an object from an array of key-value pairs. */

/* 14. Find all keys of an object. */

/* 15. Create a method inside an object that uses 'this'. */

/*
==================================================
16) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is an object? */
/* A1. An unordered collection of key-value pairs where keys are strings/symbols and values can be any type. */

/* Q2. What is the difference between dot and bracket notation? */
/* A2. Dot notation is cleaner but limited to valid identifiers; bracket notation works with any key and variables. */

/* Q3. How do you access a nested property? */
/* A3. Using chained dot notation (obj.prop.nested) or bracket notation. */

/* Q4. What is optional chaining? */
/* A4. The ?. operator safely accesses nested properties without throwing errors for missing values. */

/* Q5. What does Object.keys() return? */
/* A5. An array of the object's own enumerable property names. */

/* Q6. What is the difference between Object.keys(), Object.values(), and Object.entries()? */
/* A6. keys() returns property names, values() returns property values, entries() returns [key, value] pairs. */

/* Q7. How do you copy an object? */
/* A7. Shallow copy: spread operator {...obj} or Object.assign(). Deep copy: JSON method or structuredClone(). */

/* Q8. What is object destructuring? */
/* A8. Extracting object properties into variables using { name, age } = obj syntax. */

/* Q9. What is the difference between for...in and Object.keys()? */
/* A9. for...in includes inherited properties; Object.keys() returns only own properties. */

/* Q10. Can you use variables as property names? */
/* A10. Yes, with bracket notation in creation [variableName] or access obj[variableName]. */

/* Q11. What is the difference between shallow and deep copy? */
/* A11. Shallow copy shares nested object references; deep copy creates independent copies of everything. */

/* Q12. What does Object.freeze() do? */
/* A12. Prevents any modifications to an object (no adding, deleting, or changing properties). */

/* Q13. What is 'this' in an object method? */
/* A13. It refers to the object that the method belongs to. */

/* Q14. Why don't arrow functions work well as object methods? */
/* A14. Arrow functions don't have their own 'this'; they inherit it from the surrounding scope. */

/* Q15. How do you check if a property exists in an object? */
/* A15. Using 'in' operator, hasOwnProperty(), or checking if the value is not undefined. */

/*
==================================================
17) THINGS TO REMEMBER
==================================================
*/

// - Objects are collections of key-value pairs.
// - Use dot notation for simple keys; bracket for complex ones.
// - Objects are compared by reference, not value.
// - for...in loops include inherited properties.
// - Object.keys() returns only own properties.
// - Spread operator creates shallow copies.
// - Optional chaining (?.) prevents errors in deep access.
// - Destructuring simplifies property extraction.
// - JSON method for deep clone has limitations.
// - structuredClone() is the modern way to deep clone.
// - Object.freeze() and Object.seal() restrict modifications.
// - Nested objects in shallow copies still share references.
// - Use computed properties [key] for dynamic property names.
// - Arrow functions don't have their own 'this'.
// - Object methods using 'this' should be regular functions.

/*
==================================================
18) FINAL MINI CHECKLIST
==================================================
*/

/*
- Am I using the correct notation for this property?
- Does this property actually exist (not null/undefined)?
- Is this a shallow or deep copy situation?
- Should I use for...in or Object.keys()?
- Do I need optional chaining for safety?
- Is this a method that needs 'this' (use function, not arrow)?
- Did I handle nested object changes correctly?
- Can I use destructuring to simplify this?
- Is my deep clone method appropriate for the data?
- Have I considered performance with large objects?
*/

console.log('Object practice file loaded successfully.');
