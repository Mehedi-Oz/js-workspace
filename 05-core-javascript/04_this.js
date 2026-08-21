/*
==================================================
THE THIS KEYWORD IN JAVASCRIPT
==================================================
*/

/*
This file is a compact guide to understanding the this keyword.
It covers different contexts, binding methods, and common confusions.
*/

/*
==================================================
1) THIS OVERVIEW
==================================================
*/

/*
The 'this' keyword refers to the object that is executing the current code.
Its value depends on HOW and WHERE the function is called.

Key principle: this is determined at call time, not definition time.
Exception: Arrow functions (lexical this).
*/

console.log('--- this is dynamic ---');
/*
The value of this changes based on execution context.
The same function can have different this in different calls.

Example:
function greet() {
  console.log(this.name);
}

const person1 = { name: 'Alice', greet };
const person2 = { name: 'Bob', greet };

person1.greet(); // 'Alice' - this = person1
person2.greet(); // 'Bob' - this = person2
*/

/*
==================================================
2) THIS IN GLOBAL SCOPE
==================================================
*/

console.log('--- Global this ---');
/*
In browser: this = window object
In Node.js: this = global object (or module.exports)

Example (browser):
console.log(this); // window

function globalFunction() {
  console.log(this); // window
}

globalFunction();

In strict mode:
'use strict';
function test() {
  console.log(this); // undefined
}
*/

console.log('--- Global scope without strict mode ---');
/*
Variables declared without const/let/var become properties of global object.
Dangerous practice, avoid it.

var x = 5; // becomes window.x in browser
function test() {
  console.log(this.x); // 5 (refers to window.x)
}
*/

/*
==================================================
3) THIS IN METHODS
==================================================
*/

console.log('--- Method: this refers to object ---');
/*
When function is called as method of object,
this refers to that object.

Example:
const person = {
  name: 'Alice',
  age: 25,
  greet: function() {
    console.log('Hello, ' + this.name); // this = person
  },
  address: {
    city: 'New York',
    show: function() {
      console.log(this.city); // this = address object
    }
  }
};

person.greet(); // 'Hello, Alice'
person.address.show(); // 'New York'

this is the object calling the method.
*/

console.log('--- Method: this depends on caller ---');
/*
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

const getValue = obj.getValue; // extract method

obj.getValue(); // 42 - this = obj
getValue(); // undefined - this = window/global

Method loses this when extracted.
this depends on how it's called, not where defined.
*/

/*
==================================================
4) THIS IN FUNCTIONS
==================================================
*/

console.log('--- Regular function: this is undefined or global ---');
/*
In non-strict mode:
function test() {
  console.log(this); // window object
}

In strict mode:
'use strict';
function test() {
  console.log(this); // undefined
}

Standalone function call: this is global (non-strict) or undefined (strict).
*/

console.log('--- Constructor function: this is new instance ---');
/*
function Person(name) {
  this.name = name;
  this.greet = function() {
    console.log('Hello, ' + this.name);
  };
}

const person = new Person('Alice');
person.greet(); // 'Hello, Alice'
console.log(person.name); // 'Alice'

With new keyword:
- Creates new object
- Sets this to new object
- Returns the object
*/

/*
==================================================
5) THIS IN EVENT HANDLERS
==================================================
*/

console.log('--- Event handler: this is the element ---');
/*
const button = document.getElementById('btn');

button.addEventListener('click', function(event) {
  console.log(this); // the button element
  console.log(this.textContent); // button text
  console.log(event.target); // also button
});

In event listener:
- Regular function: this = element that triggered event
- event.target also points to element
*/

console.log('--- Event handler with arrow function ---');
/*
const button = document.getElementById('btn');

button.addEventListener('click', (event) => {
  console.log(this); // NOT button, refers to outer this
  console.log(event.target); // still button
});

Arrow function: this is NOT the button
Arrow functions don't have their own this.
this refers to surrounding scope (likely window/global).
*/

/*
==================================================
6) ARROW FUNCTIONS & LEXICAL THIS
==================================================
*/

console.log('--- Arrow functions: lexical this ---');
/*
Arrow functions don't have their own this.
They inherit this from surrounding scope at definition time.

const obj = {
  name: 'Alice',
  regular: function() {
    console.log(this.name); // 'Alice' (this = obj)
  },
  arrow: () => {
    console.log(this.name); // undefined (this = window/global)
  }
};

obj.regular(); // 'Alice'
obj.arrow(); // undefined
*/

console.log('--- Arrow function inside method ---');
/*
const obj = {
  value: 42,
  getValue: function() {
    const arrow = () => {
      console.log(this.value); // 42 (inherits from getValue)
    };
    arrow(); // works correctly
  }
};

obj.getValue();

Arrow function inside method:
- this comes from method (obj)
- Arrow this is captured at definition
- Useful for callbacks and nested functions
*/

console.log('--- Why arrow functions lose this in methods ---');
/*
const obj = {
  name: 'Alice',
  greet: () => {
    console.log(this.name); // undefined
  }
};

obj.greet(); // prints undefined

Arrow function defined in object literal:
- Inherits this from surrounding scope (global)
- Not from object being defined
- Arrow functions ignore who calls them
- Always use regular function for methods
*/

/*
==================================================
7) MANUAL BINDING: call()
==================================================
*/

console.log('--- call(): invoke with specific this ---');
/*
function.call(thisArg, arg1, arg2, ...);

Calls function immediately with specified this.

function greet(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.call(person, 'Hello', '!'); // 'Hello Alice!'

call() passes arguments one by one.
*/

console.log('--- call() use case: borrow methods ---');
/*
const person1 = {
  name: 'Alice',
  introduce: function() {
    console.log('I am ' + this.name);
  }
};

const person2 = { name: 'Bob' };

person1.introduce.call(person2); // 'I am Bob'

Borrow method from one object and use with another.
*/

/*
==================================================
8) MANUAL BINDING: apply()
==================================================
*/

console.log('--- apply(): invoke with specific this ---');
/*
function.apply(thisArg, [arg1, arg2, ...]);

Like call() but arguments passed as array.

function greet(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const person = { name: 'Alice' };
const args = ['Hello', '!'];

greet.apply(person, args); // 'Hello Alice!'

apply() passes arguments as array.
Useful when arguments are already in array.
*/

console.log('--- apply() use case: spread-like behavior ---');
/*
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);
console.log(max); // 7

Pass array as arguments to function.
apply() unpacks array to individual arguments.
*/

/*
==================================================
9) MANUAL BINDING: bind()
==================================================
*/

console.log('--- bind(): create bound function ---');
/*
const boundFn = function.bind(thisArg, arg1, arg2, ...);

Creates new function with fixed this and optional preset arguments.

function greet(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const person = { name: 'Alice' };
const boundGreet = greet.bind(person, 'Hello');

boundGreet('!'); // 'Hello Alice!'

bind() doesn't call immediately, returns new function.
this is permanently set to specified object.
Can preset some arguments (partial application).
*/

console.log('--- bind() use case: event handlers ---');
/*
const person = {
  name: 'Alice',
  handleClick: function() {
    console.log(this.name + ' clicked');
  }
};

const button = document.getElementById('btn');
button.addEventListener('click', person.handleClick.bind(person));

Without bind: this would be button element
With bind: this is person object
*/

console.log('--- bind() use case: callbacks ---');
/*
const user = {
  id: 1,
  name: 'Alice',
  fetchData: function() {
    setTimeout(function() {
      console.log(this.name); // undefined without bind
    }.bind(this), 1000);
  }
};

user.fetchData();

setTimeout callback loses this context.
bind() preserves this from fetchData method.
*/

console.log('--- call vs apply vs bind comparison ---');
/*
All three set this value, differences:

call(thisArg, arg1, arg2, ...):
- Invokes immediately
- Arguments one by one
- Returns result directly

apply(thisArg, [arg1, arg2, ...]):
- Invokes immediately
- Arguments as array
- Returns result directly

bind(thisArg, arg1, arg2, ...):
- Returns new function (NOT invoked)
- Arguments one by one or partial
- Can be called later multiple times
*/

/*
==================================================
10) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: Arrow functions in methods ---');
/*
const obj = {
  name: 'Alice',
  getName: () => {
    return this.name; // WRONG: this is not obj
  }
};

obj.getName(); // undefined

Don't use arrow functions for object methods.
Arrow functions don't bind to object context.
Use regular functions for methods.
*/

console.log('--- Confusion 2: this inside event listeners ---');
/*
const btn = document.getElementById('btn');

// Regular function: this = button
btn.addEventListener('click', function() {
  console.log(this); // button element
});

// Arrow function: this = surrounding scope
btn.addEventListener('click', () => {
  console.log(this); // window/global, NOT button
});

If you need element reference: use event.target or regular function.
*/

console.log('--- Confusion 3: Extracted methods lose this ---');
/*
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

const getValue = obj.getValue; // extracted
getValue(); // undefined, this is global

obj.getValue(); // 42, this is obj

Solution: use bind() when extracting methods.
const getValue = obj.getValue.bind(obj);
*/

console.log('--- Confusion 4: call/apply invoke immediately ---');
/*
greet.call(person, 'Hi'); // executes immediately, returns result
greet.apply(person, ['Hi']); // executes immediately

bind(person, 'Hi'); // returns function, doesn't execute
// Must call it: boundFn();
*/

console.log('--- Confusion 5: this in nested functions ---');
/*
const obj = {
  name: 'Alice',
  test: function() {
    console.log(this.name); // 'Alice'

    function inner() {
      console.log(this.name); // undefined (regular function)
    }
    inner();
  }
};

obj.test();

Regular nested function doesn't inherit this from outer.
Solution: use arrow function or bind.
*/

console.log('this Keyword practice file loaded successfully.');
