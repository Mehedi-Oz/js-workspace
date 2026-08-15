/*
==================================================
EXECUTION CONTEXT: Understanding JavaScript Execution
==================================================

JavaScript Execution Context is the environment where code is executed.
It tracks variables, manages scope, and handles function calls.

Key Components:
1. Global Execution Context (entry point)
2. Function Execution Contexts (for each function call)
3. Scope Chain (links to outer contexts)
4. this (execution-specific context)
*/

/*
==================================================
1. EXECUTION CONTEXT LIFECYCLE
==================================================

Every execution context has two phases:

CREATION PHASE:
- Declare all variables (var, let, const)
- Declare all functions
- Set up scope chain

EXECUTION PHASE:
- Execute statements one by one
- Allocate memory for values
- Return results when done
*/

// Example: Simple function
function showContext() {
  console.log('Inside function context'); // Execution phase
}

showContext();

/*
==================================================
2. SCOPE CHAIN
==================================================

Scope chain links contexts to find variables:

Global → Function1 → Function2 → ... → Null

JavaScript searches:
1. Current function context
2. Outer function context
3. Global context
4. Until found or ends at Null
*/

let globalVar = 'I am global';

function outerFunction() {
  let outerVar = 'I am outer';
  
  function innerFunction() {
    let innerVar = 'I am inner';
    
    // Resolution order:
    console.log('Search:', innerVar);    // Found in inner
    console.log('Search:', outerVar);    // Found in outer (through chain)
    console.log('Search:', globalVar);   // Found in global (through chain)
  }
  
  return innerFunction;
}

const nested = outerFunction();
nested(); // Shows scope chain in action

/*
==================================================
3. VARIABLE DECLARATION HOISTING
==================================================

**var**: Hoisted to top, initialized with undefined
**let/const**: Hoisted but remain in TDZ (can't access before declaration)

Hoisting happens during CREATION phase.
*/

// var: Hoisted and accessible before declaration
console.log('var (undefined):', tempVar); // undefined
var tempVar = 'hoisted var';
console.log('var (set):', tempVar); // hoisted var

// let: In TDZ until declaration
// console.log('let (undefined):', letVar); // ReferenceError
let letVar = 'declared later';
console.log('let (set):', letVar);

/*
==================================================
4. this BEHAVIOR
==================================================

this depends on HOW a function is called:

1. Default call: this = undefined (strict mode)
2. Method call: this = calling object
3. Constructor call: this = new object
4. Explicit call: this = whatever you pass
5. Arrow: this = lexical this from parent
*/

// Method call
const obj = {
  name: 'JavaScript',
  speak: function() {
    console.log('this as method:', this.name);
  }
};

obj.speak(); // this = obj

// Constructor call
function createPerson(name) {
  this.name = name;
  this.greet = function() {
    console.log('this as constructor:', this.name);
  };
}

const person = new createPerson('Alice');
person.greet(); // this = new object (person)

/*
==================================================
5. EXECUTION CONTEXT STACK
==================================================

Stack frames are pushed when functions are called:

Push → Execute → Pop

Stack Order: Global → Function1 → Function2 → ...
*/

function level1() {
  console.log('Level 1');
  level2(); // Push level2 context
}

function level2() {
  console.log('Level 2');
}

level1(); // Stack: Global → level1 → level2

/*
==================================================
6. MEMORY ALLOCATION
==================================================

Memory is allocated during EXECUTION phase:

- Variables (var, let, const): Get memory space
- Function results: Get memory for return values
- Objects/Arrays: Get memory for their properties

var: Memory allocated during creation phase
let/const: Memory allocated during execution phase
*/

function allocateMemory() {
  var varMemory = 'var variable'; // Memory allocated here
  let letMemory = 'let variable'; // Memory allocated here
  const constMemory = 'const variable'; // Memory allocated here
  
  return {
    varMemory,
    letMemory,
    constMemory
  };
}

const result = allocateMemory();
console.log('Memory allocated:', result);

/*
==================================================
7. DECLARATION VS EXPRESSION
==================================================

**Function Declaration**: Hoisted, can call before definition
**Function Expression**: Not hoisted, must declare first
**Arrow Function**: Not hoisted

Declaration happens during creation phase.
Expression happens when code is executed.
*/

// Declaration: Hoisted
console.log('Declaration:', functionDecl());

function functionDecl() {
  return 'declaration';
}

// Expression: Not hoisted
const funcExpr = function() {
  return 'expression';
};

console.log('Expression:', funcExpr());

/*
==================================================
SUMMARY
==================================================

Execution Context:
- Creation phase: declarations, scope setup
- Execution phase: actual code runs
- Stack frames: pushed/popped for each function
- Scope chain: links nested contexts
- this: determined by function call type
- Hoisting: var hoisted, let/const in TDZ

Stack flow:
Global → Function1 (push) → Function2 (push) → ... → Pop → Pop
*/