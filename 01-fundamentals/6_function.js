/*
==================================================
FUNCTIONS IN JAVASCRIPT
==================================================
*/

/*
A compact practice file for functions.
Covers declarations, expressions, arrows, parameters,
rest/default/spread, closures, hoisting, IIFE, this,
scope chains, practice prompts, viva questions, and notes.
*/
/*
==================================================
Function overview
==================================================
*/
// A function is a reusable block of code.
function greetUser(name) {
  console.log('Hello, ' + name + '!');
}
greetUser('Hasan');
greetUser('Maha');
// Reuse, organization, and readability are the main reasons we use functions.
/*
==================================================
Function declarations
==================================================
*/
// Declarations are hoisted with their body.
sayMorning();

function sayMorning() {
  console.log('Good morning!');
}
sayMorning();
// Use declarations for reusable named functions.
/*
==================================================
Function expressions
==================================================
*/
// Expressions store a function in a variable.
const add = function (a, b) {
  return a + b;
};
console.log(add(2, 3)); // 5

const multiply = function multiplyNumbers(a, b) {
  return a * b;
};
console.log(multiply(4, 5)); // 20
// Expressions are useful when functions are values.
/*
==================================================
Arrow functions
==================================================
*/
// Shorter syntax, useful for callbacks.
const square = (n) => n * n;
const cube = (n) => {
  return n * n * n;
};
const welcome = name => 'Welcome, ' + name;

console.log(square(6)); // 36
console.log(cube(3));   // 27
console.log(welcome('Hasan'));
// Arrow functions do not have their own this.
/*
==================================================
Parameters vs arguments
==================================================
*/
// Parameters are in the definition, arguments are in the call.
function describePerson(name, age) {
  console.log(name + ' is ' + age + ' years old.');
}
describePerson('Hasan', 24);
// name, age are parameters.
// 'Hasan', 24 are arguments.
/*
==================================================
Default parameters
==================================================
*/
function greet(name = 'Guest') {
  console.log('Hello, ' + name);
}
greet('Asha');
greet();
// Default parameters are used when the argument is missing.
/*
==================================================
Rest parameters
==================================================
*/
function sumAll(...numbers) {
  let total = 0;
  for (const num of numbers) total += num;
  return total;
}
console.log(sumAll(1, 2, 3));       // 6
console.log(sumAll(5, 10, 15, 20)); // 50
// Rest collects remaining arguments into an array.
/*
==================================================
Spread syntax
==================================================
*/
const nums = [1, 2, 3];
console.log(...nums); // 1 2 3

function addThreeNumbers(a, b, c) {
  return a + b + c;
}
console.log(addThreeNumbers(...nums)); // 6

const moreNums = [4, 5, 6];
const combined = [...nums, ...moreNums];
console.log(combined); // [1, 2, 3, 4, 5, 6]
// Spread expands arrays or values.
/*
==================================================
Return values and early return
==================================================
*/
function getStatus(isLoggedIn) {
  if (!isLoggedIn) return 'Please log in';
  return 'Welcome back';
}
console.log(getStatus(false)); // Please log in
console.log(getStatus(true));  // Welcome back

function checkAge(age) {
  if (age < 18) return 'Minor';
  return 'Adult';
}
// Early return keeps code shallow and readable.
/*
==================================================
First-class functions
==================================================
*/
const sayHi = function () {
  return 'Hi';
};
const fnHolder = sayHi;
console.log(fnHolder()); // Hi

function execute(fn) {
  return fn();
}
console.log(execute(() => 'Executed'));
// Functions can be assigned, passed, and returned.
/*
==================================================
Higher-order functions
==================================================
*/
function operate(a, b, callback) {
  return callback(a, b);
}
console.log(operate(10, 5, (x, y) => x + y)); // 15
console.log(operate(10, 5, (x, y) => x - y)); // 5

function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (index) => console.log('Run', index));
// HOFs either take functions or return functions.
/*
==================================================
Return functions and closures
==================================================
*/
function createMultiplier(factor) {
  return function (num) {
    return num * factor;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(8)); // 16
console.log(triple(8)); // 24

function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counterOne = makeCounter();
console.log(counterOne()); // 1
console.log(counterOne()); // 2
const counterTwo = makeCounter();
console.log(counterTwo()); // 1
// The inner function remembers outer variables.
/*
==================================================
Pure vs impure functions
==================================================
*/
function pureAdd(a, b) {
  return a + b;
}
console.log(pureAdd(2, 4)); // 6

let counter = 0;
function impureIncrement() {
  counter++;
  return counter;
}
console.log(impureIncrement()); // 1
console.log(impureIncrement()); // 2
// Pure functions have same output for same input and no side effects.
/*
==================================================
Lexical scoping and scope chains
==================================================
*/
function outer() {
  const outerVar = 'outside';

  function inner() {
    console.log(outerVar);
  }

  inner();
}
outer();

const globalValue = 'global';
function levelOne() {
  const levelOneValue = 'level one';
  function levelTwo() {
    const levelTwoValue = 'level two';
    console.log(globalValue);
    console.log(levelOneValue);
    console.log(levelTwoValue);
  }
  levelTwo();
}
levelOne();
// JavaScript searches current scope, then outer scopes, then global.
/*
==================================================
IIFE
==================================================
*/
(function () {
  console.log('IIFE executed');
})();

(function (name) {
  console.log('Hello, ' + name);
})('Hasan');
// IIFEs (Immediately Invoked Function Expression) create a private scope and run immediately.
/*
==================================================
Hoisting differences
==================================================
*/
hoistedDeclaration();
function hoistedDeclaration() {
  console.log('This works because the declaration is hoisted.');
}

// console.log(notYetReady()); // not available before initialization
const notYetReady = function () {
  return 'Now ready';
};
console.log(notYetReady());
// Declarations are hoisted with body, expressions are not.
/*
==================================================
Function hoisting and TDZ
==================================================
*/
// Declarations can be called before they appear.
// let and const used with function expressions cannot.

// callBefore(); // works
// function callBefore() {}

// callBeforeExpression(); // fails before initialization
// const callBeforeExpression = function () {};

// TDZ means the binding exists, but cannot be used before initialization.
/*
==================================================
Arrow vs regular function, this context
==================================================
*/
const user = {
  name: 'Hasan',
  regularMethod: function () {
    console.log('regular:', this.name);
  },
  arrowMethod: () => {
    console.log('arrow:', this.name);
  }
  
};
user.regularMethod();
user.arrowMethod();
// Regular functions get this from the call site.
// Arrow functions capture this from the surrounding scope.
/*
==================================================
Common confusion and mistakes
==================================================
*/
// 1. Parameters vs arguments
// 2. Forgetting return in multi-step functions
// 3. Using var in loops with async callbacks
// 4. Using arrow functions where this is needed
// 5. Assuming function expressions are fully hoisted
// 6. Forgetting rest parameters must be last
// 7. Trying to use arguments inside arrow functions
// 8. Mutating external state without need
/*
==================================================
Output prediction questions
==================================================
*/
// Q1
function q1(x) { return x + 1; }
console.log(q1(4)); // 5

// Q2
function q2(a = 10) { return a; }
console.log(q2()); // 10

// Q3
const q3 = (a, b) => (a > b ? a : b);
console.log(q3(7, 3)); // 7

// Q4
function q4(...items) { return items.length; }
console.log(q4(1, 2, 3, 4)); // 4

// Q5
function q5() { return function () { return 'inner'; }; }
console.log(q5()()); // inner
/*
==================================================
Practice problems
==================================================
*/
// 1. Write a function that returns the square of a number.
// 2. Write a function that returns the sum of two numbers.
// 3. Write a function that checks whether a number is even.
// 4. Write a function that returns the bigger of two numbers.
// 5. Write a function that greets a user by name.
// 6. Write a function with a default age parameter.
// 7. Write a function that accepts any number of scores and returns the total.
// 8. Write a function that accepts an array and returns its first element.
// 9. Write a function that joins three words with spaces.
// 10. Write a function that returns true only for positive numbers.
// 11. Write a function that counts how many arguments were passed.
// 12. Write a function that returns another function for multiplication.
// 13. Write a function that logs each item in an array.
// 14. Write a pure function example and explain why it is pure.
// 15. Write an impure function example and explain the side effect.
// 16. Write a closure that remembers a name.
// 17. Write an IIFE that prints a setup message.
// 18. Write a function expression and call it.
// 19. Write an arrow function that adds two values.
// 20. Write a function that uses early return for invalid input.
// 21. Write a function that demonstrates lexical scoping.
// 22. Write a function that uses rest parameters correctly.
/*
==================================================
Viva questions with detailed answers
==================================================
*/
// 1. What is a function in JavaScript?
// Answer: A function is a reusable block of code used to perform a task, accept inputs, and optionally return a value.
// 2. What is the difference between a function declaration and expression?
// Answer: A declaration is hoisted with its body and can be called before it appears. An expression is stored in a variable and is not available before initialization.
// 3. What is an arrow function?
// Answer: An arrow function is a shorter function syntax that uses =>. It does not have its own this, arguments, or super.
// 4. What is the difference between parameters and arguments?
// Answer: Parameters are the names in the definition. Arguments are the actual values passed when the function is called.
// 5. What are default parameters?
// Answer: Default parameters provide fallback values when an argument is missing or undefined.
// 6. What are rest parameters?
// Answer: Rest parameters collect the remaining arguments into an array.
// 7. What is spread syntax?
// Answer: Spread expands arrays or objects into individual elements or properties.
// 8. What is a return value?
// Answer: The value sent back from a function to the place where it was called.
// 9. What is an early return?
// Answer: An early return exits the function as soon as a condition is met, which keeps code simpler.
// 10. What does first-class function mean?
// Answer: Functions can be treated like values, stored in variables, passed as arguments, and returned from other functions.
// 11. What is a higher-order function?
// Answer: A higher-order function takes another function as an argument or returns a function.
// 12. What is a pure function?
// Answer: A pure function always gives the same output for the same input and has no side effects.
// 13. What is an impure function?
// Answer: An impure function depends on or changes outside state, so it may produce side effects.
// 14. What is a side effect?
// Answer: Any effect outside the function's return value, like logging, mutating data, or changing the DOM.
// 15. What is lexical scoping?
// Answer: Lexical scoping means variable access is determined by where functions are written in the code.
// 16. What is a closure?
// Answer: A closure is a function that remembers variables from its outer scope even after that outer function finishes.
// 17. What is an IIFE?
// Answer: An Immediately Invoked Function Expression is a function expression that runs immediately after being defined.
// 18. Why use an IIFE?
// Answer: It creates a private scope and avoids polluting the global namespace.
// 19. How does hoisting differ for declarations and expressions?
// Answer: Declarations are hoisted with their definitions. Expressions only hoist the variable binding, not the assigned function.
// 20. What is the main difference between arrow and regular functions with this?
// Answer: Regular functions get this from how they are called. Arrow functions capture this from the surrounding scope.
/*
==================================================
Things to remember
==================================================
*/
// - Function declarations are hoisted with their body.
// - Function expressions are not available before initialization.
// - Arrow functions do not have their own this.
// - Parameters are defined in the function, arguments are passed in the call.
// - Rest collects, spread expands.
// - Return ends the function immediately.
// - Closures remember outer variables.
// - IIFEs help create private scope.
// - Pure functions are easier to test and reason about.
// - Use early return to reduce nesting.
/*
==================================================
Quick interview notes
==================================================
*/
// - Prefer pure functions when possible.
// - Use arrows for short callbacks, not for object methods that need dynamic this.
// - Use declarations for widely reused utilities.
// - Use expressions when you want functions as values.
// - Watch for closure traps in loops and async code.
// - Be clear about hoisting and TDZ in interviews.
