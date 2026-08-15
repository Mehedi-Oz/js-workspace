/*
==================================================
CLOSURES IN JAVASCRIPT
==================================================
*/

/*
This file is a compact practice companion for closures.
It includes explanations, runnable examples, output questions,
practice problems, viva questions, and things to remember.
*/

/*
==================================================
1) CLOSURES OVERVIEW
==================================================
*/

/*
A closure is a function that has access to variables from its outer scope,
even after the outer function has returned.

Key points:
- Every function creates a closure
- Closures "remember" the environment they were created in
- Inner function has access to outer function's variables
- Outer function's variables stay in memory
- Used for data privacy and maintaining state
*/

console.log('--- Closure concept ---');
/*
function outer() {
  const message = 'Hello'; // outer variable

  function inner() {
    console.log(message); // inner accesses outer variable
  }

  return inner;
}

const fn = outer();
fn(); // 'Hello' - closure remembers 'message'
*/

console.log('Closures allow functions to remember variables');

/*
==================================================
2) SIMPLE CLOSURE EXAMPLES
==================================================
*/

console.log('--- Basic closure ---');
/*
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(3)); // 8
console.log(add5(7)); // 12

The returned function "remembers" x=5 from makeAdder.
Each call to makeAdder(x) creates a new closure.
*/

console.log('--- Closure with counter ---');
/*
function counter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const myCounter = counter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3

The returned function has access to count.
count is private (cannot access directly).
Each call increments and remembers the value.
*/

console.log('--- Closure returning object ---');
/*
function createUser(name) {
  let age = 0;

  return {
    getName: function() {
      return name;
    },
    getAge: function() {
      return age;
    },
    setAge: function(newAge) {
      age = newAge;
    }
  };
}

const user = createUser('Alice');
console.log(user.getName()); // 'Alice'
user.setAge(25);
console.log(user.getAge()); // 25

All methods share access to name and age.
name and age are private variables.
This is data encapsulation via closures.
*/

/*
==================================================
3) CLOSURE SCOPE
==================================================
*/

console.log('--- Closure accesses outer scope ---');
/*
function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';
    console.log(outerVar); // can access outer
    console.log(innerVar); // can access own
  }

  inner();
  // console.log(innerVar); // ERROR: innerVar not accessible here
}

outer();

Inner function can access:
1. Its own variables
2. Outer function variables
3. Global variables

Outer function cannot access inner variables.
*/

console.log('--- Closure with multiple levels ---');
/*
function level1() {
  const var1 = 'Level 1';

  function level2() {
    const var2 = 'Level 2';

    function level3() {
      const var3 = 'Level 3';
      console.log(var1, var2, var3); // all accessible
    }

    return level3;
  }

  return level2;
}

const fn = level1()();
fn(); // 'Level 1 Level 2 Level 3'

Each level can access all outer levels.
Scope chain goes: level3 -> level2 -> level1 -> global
*/

/*
==================================================
4) CLOSURE USE CASES
==================================================
*/

console.log('--- Use case: Data privacy ---');
/*
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
account.withdraw(30); // 120

balance is private, can only be changed via methods.
Cannot directly access or modify balance.
This provides data encapsulation.
*/

console.log('--- Use case: Function factory ---');
/*
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

Create specialized functions from a factory.
Each closure "remembers" its specific multiplier.
*/

console.log('--- Use case: Callback with context ---');
/*
function setupButton(buttonId, message) {
  const button = document.getElementById(buttonId);

  button.addEventListener('click', function() {
    alert(message); // closure remembers message
  });
}

setupButton('btn1', 'Button 1 clicked');
setupButton('btn2', 'Button 2 clicked');

Each click handler remembers its own message.
Without closure, would need global variables.
*/

console.log('--- Use case: Module pattern ---');
/*
const calculator = (function() {
  let result = 0;

  return {
    add: function(x) {
      result += x;
      return result;
    },
    subtract: function(x) {
      result -= x;
      return result;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
    }
  };
})();

calculator.add(10);     // 10
calculator.subtract(3); // 7
calculator.reset();     // 0

IIFE creates closure that holds private state.
Public methods access private data.
Classic module pattern for encapsulation.
*/

/*
==================================================
5) CLOSURES WITH LOOPS
==================================================
*/

console.log('--- Common mistake: closure in loop ---');
/*
// Problem:
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // prints 3, 3, 3
  }, 1000);
}

All callbacks share same i variable.
By the time callback runs, i = 3.
This is a common closure mistake.
*/

console.log('--- Solution 1: Use let instead of var ---');
/*
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // prints 0, 1, 2
  }, 1000);
}

let creates block scope for each iteration.
Each callback gets its own i variable.
This is the modern solution.
*/

console.log('--- Solution 2: IIFE wrapper ---');
/*
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // prints 0, 1, 2
    }, 1000);
  })(i);
}

IIFE creates new scope for each iteration.
Parameter index is captured separately.
Each callback gets different index value.
*/

console.log('--- Solution 3: Function parameter ---');
/*
for (var i = 0; i < 3; i++) {
  setTimeout((function(index) {
    return function() {
      console.log(index);
    };
  })(i), 1000);
}

Higher-order function creates closure.
Each closure captures different index.
*/

/*
==================================================
6) PRACTICAL CLOSURE PATTERNS
==================================================
*/

console.log('--- Memoization with closure ---');
/*
function memoize(fn) {
  const cache = {};

  return function(arg) {
    if (arg in cache) {
      return cache[arg];
    }

    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

function expensiveOperation(n) {
  console.log('Computing...');
  return n * n;
}

const memoized = memoize(expensiveOperation);
memoized(5); // Computing... 25
memoized(5); // 25 (from cache, no computing)

Closure keeps cache between calls.
Improves performance by avoiding recalculation.
*/

console.log('--- Debounce with closure ---');
/*
function debounce(fn, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log('Searching:', query);
}, 500);

search('javascript');
search('javascript closures');

Closure remembers timeoutId.
Each call updates the same timeout.
Prevents multiple API calls.
*/

console.log('--- Partial application with closure ---');
/*
function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

const result = multiply(2)(3)(4); // 24

Each function returns closure capturing its argument.
Creates specialized functions at each level.
Useful for currying patterns.
*/

/*
==================================================
7) CLOSURE VS VARIABLE SCOPE
==================================================
*/

console.log('--- Global vs closure scope ---');
/*
// Global scope
let globalVar = 'global';

function myFunc() {
  // Function scope
  let funcVar = 'function';

  return function() {
    // Closure scope
    let closureVar = 'closure';
    console.log(globalVar, funcVar, closureVar); // all accessible
  };
}

Global variables pollute namespace.
Closures create private scope.
Closures are safer than globals.
*/

console.log('--- Each closure has own scope ---');
/*
function makeGreeter(greeting) {
  return function(name) {
    console.log(greeting + ' ' + name);
  };
}

const sayHello = makeGreeter('Hello');
const sayHi = makeGreeter('Hi');

sayHello('Alice'); // Hello Alice
sayHi('Bob');      // Hi Bob

Each closure has own greeting variable.
sayHello.greeting !== sayHi.greeting
Different closures, different scope.
*/

/*
==================================================
8) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: Function returned vs called ---');
/*
function outer() {
  const x = 10;
  return function() {
    console.log(x);
  };
}

const fn = outer(); // returns function, outer completes
fn(); // 10 - closure still remembers x

x still exists even though outer() finished.
Returned function maintains closure.
*/

console.log('--- Confusion 2: Closure modifies outer variable ---');
/*
function counter() {
  let count = 0;

  return function() {
    count++; // modifies outer variable
    return count;
  };
}

const c = counter();
c(); // 1
c(); // 2 - count actually changed

Closures can modify outer variables.
Modifications persist between calls.
*/

console.log('--- Confusion 3: Multiple closures share scope ---');
/*
function createFunctions() {
  let x = 5;

  return {
    inc: function() { x++; },
    get: function() { return x; },
    dec: function() { x--; }
  };
}

const obj = createFunctions();
obj.inc();
console.log(obj.get()); // 6
obj.dec();
console.log(obj.get()); // 5

All methods share same x variable.
Modifications affect all of them.
Single closure shared by multiple functions.
*/

console.log('--- Confusion 4: Closure doesn\'t capture parameter value ---');
/*
function makeArray() {
  const funcs = [];

  for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i; });
  }

  return funcs;
}

const arr = makeArray();
console.log(arr[0]()); // 3, not 0
console.log(arr[1]()); // 3, not 1

All closures share same i variable.
i is 3 by the time any is called.
This is the loop closure problem.
*/

/*
==================================================
9) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: function outer() { let x = 5; return () => x; } const f = outer(); f() returns?
A1: 5 (closure remembers x)
*/

/*
Q2: After outer() returns, x still exists in memory?
A2: Yes, closure keeps it alive
*/

/*
Q3: Multiple calls to same returned function. Variables persist?
A3: Yes, same closure instance reused
*/

/*
Q4: Two different closures from same factory. Share variables?
A4: No, each has own copy
*/

/*
Q5: Inner function modifies outer variable. Does outer see change?
A5: Yes, they share same variable
*/

/*
Q6: Return function tries to access non-existent outer variable?
A6: ReferenceError when called
*/

/*
Q7: Closure from loop with var. All return same value?
A7: Yes, they share the loop variable
*/

/*
Q8: Closure from loop with let. Each returns different value?
A8: Yes, let creates block scope per iteration
*/

/*
==================================================
10) PRACTICE PROBLEMS
==================================================
*/

/* 1. Create a simple counter function with closure. */

/* 2. Make a function that returns a personalized greeter. */

/* 3. Create a bank account with deposit and withdraw methods. */

/* 4. Build a function factory that creates multipliers. */

/* 5. Implement simple memoization for a function. */

/* 6. Create a toggle function using closure (on/off switch). */

/* 7. Make a private variable that's only accessible via methods. */

/* 8. Build a simple module with public and private data. */

/* 9. Create a function that "remembers" how many times it was called. */

/* 10. Make a debounce function from scratch. */

/* 11. Build a stopwatch using closure and intervals. */

/* 12. Create a function that generates unique IDs. */

/* 13. Make a throttle function with closure. */

/* 14. Build a simple cache function with closure. */

/* 15. Create multiple counters that don't interfere with each other. */

/*
==================================================
11) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is a closure? */
/* A1. A function that has access to variables from its outer scope. */

/* Q2. When is a closure created? */
/* A2. Every time a function is created. */

/* Q3. Can inner function access outer variables? */
/* A3. Yes, inner function has access to outer scope. */

/* Q4. Can outer function access inner variables? */
/* A4. No, outer function cannot access inner scope. */

/* Q5. Why are closures useful? */
/* A5. They provide data privacy and help maintain state. */

/* Q6. What is data encapsulation? */
/* A6. Hiding internal data and only exposing public methods via closures. */

/* Q7. Do closures keep variables in memory? */
/* A7. Yes, as long as closure exists, variables stay in memory. */

/* Q8. Can multiple functions share closure scope? */
/* A8. Yes, methods in an object can share same closure scope. */

/* Q9. What is the module pattern? */
/* A9. Using IIFE and closures to create private and public methods. */

/* Q10. How do you fix closure in loop problem? */
/* A10. Use let instead of var (creates block scope). */

/* Q11. Why use closure instead of global variables? */
/* A11. Closures avoid namespace pollution and provide privacy. */

/* Q12. Can closure be garbage collected? */
/* A12. Yes, when no references remain to the function. */

/* Q13. What is memoization? */
/* A13. Caching function results using closure to avoid recalculation. */

/* Q14. Can you return multiple closures from one function? */
/* A14. Yes, return an object with multiple closure methods. */

/* Q15. Is every nested function a closure? */
/* A15. Yes, every function that accesses outer scope is a closure. */

/*
==================================================
12) THINGS TO REMEMBER
==================================================
*/

// - Closure = function + access to outer scope
// - Every function creates a closure
// - Inner function accesses outer variables
// - Closures keep variables in memory
// - Use closures for data privacy
// - Use closures to maintain state
// - Avoid global variables, use closures
// - Module pattern uses closures for encapsulation
// - Remember loop closure problem with var
// - Use let in loops to fix closure problem
// - Multiple functions can share closure scope
// - Each function from factory has own closure
// - Closures are perfect for factories and callbacks
// - Debounce and throttle use closures
// - Memoization caches with closures

/*
==================================================
13) FINAL MINI CHECKLIST
==================================================
*/

/*
- Do I need to keep data private? (use closure)
- Am I creating a module? (use closure pattern)
- Is this a loop problem? (use let, not var)
- Do I need to cache results? (use memoization)
- Am I passing callbacks? (closure captures context)
- Are variables staying in memory? (intended?)
- Can outer access inner variables? (no)
- Can inner access outer variables? (yes)
- Do multiple closures interfere? (shared scope?)
- Am I returning function or calling it? (return creates closure)
*/

console.log('Closures practice file loaded successfully.');
