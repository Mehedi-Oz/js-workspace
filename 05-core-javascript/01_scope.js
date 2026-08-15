/*
==================================================
SCOPE: Understanding JavaScript Scopes
==================================================

This file explores different JavaScript scope types:
1. Global scope
2. Function scope (var)
3. Block scope (let, const)
4. Lexical scope (closures)
5. Module pattern for privacy
*/

/*
==================================================
1. GLOBAL SCOPE
==================================================

Global scope refers to variables that are declared outside of any function or block.
These variables can be accessed from anywhere in the code.
*/

var globalVar = "I am a global variable";
let globalLet = "I am also global";
const globalConst = "I am a global constant";

console.log(globalVar);
console.log(globalLet);
console.log(globalConst);

/*
==================================================
2. FUNCTION SCOPE (var)
==================================================

Function scope means that variables declared with `var` are accessible only within
the function they are defined in. The scope starts from the function definition
and ends at the end of that function.
*/

function checkVarScope() {
  if (true) {
    var varInFunction = "I am var-scoped";
    console.log("Inside if:", varInFunction);
  }
  console.log("Outside if:", varInFunction);
  // varInFunction is accessible here because var is function-scoped
}

checkVarScope();

/*
==================================================
3. BLOCK SCOPE (let, const)
==================================================

Block scope (using let and const) is more granular than function scope. These
variables are only accessible within the block (e.g., inside if, for, while loops).

Important Note: In JavaScript, only {} can create a block scope, not functions,
except in ES6 with const and let. var always uses function scope.
*/

function checkBlockScope() {
  if (true) {
    let letInBlock = "I am block-scoped";
    console.log("Inside if:", letInBlock);
  }
  // letInBlock is NOT accessible here because let is block-scoped
  // console.log(letInBlock); // ReferenceError
}

checkBlockScope();

/*
==================================================
4. LEXICAL (CLOSURE) SCOPE
==================================================

Closures occur when an inner function retains access to variables from its
outer function's scope even after the outer function has finished executing.

This creates a scope chain where the inner function can access variables from
its own scope, plus all outer scopes that contain those variables.
*/

function makeCounter() {
  var count = 0; // This variable is in the closure's scope

  return function() {
    count++;
    return count;
  };
}

var myCounter = makeCounter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2

/*
==================================================
5. MODULE PATTERN FOR PRIVACY
==================================================

JavaScript modules allow for creating private variables that are not accessible
from outside the module. This is useful for encapsulation and data hiding.
*/

function createCounterModule() {
  var privateCounter = 0;

  function increaseCounter() {
    privateCounter++;
  }

  function getCounter() {
    return privateCounter;
  }

  return {
    increase: increaseCounter,
    get: getCounter
  };
}

var counterModule = createCounterModule();
console.log("Counter:", counterModule.get()); // 0
counterModule.increase();
console.log("Counter:", counterModule.get()); // 1

/*
==================================================
6. IMMEDIATE FUNCTION EXPRESSIONS (IIFEs)
==================================================

An IIFE is a function that is executed immediately after it's created.
It creates a new scope that protects variables from leaking into the global scope.
*/

(function() {
  var privateVar = "I am private to this IIFE";
  console.log(privateVar);
})();

/*
==================================================
7. NESTED FUNCTIONS
==================================================

Nested functions are functions defined inside other functions. They have access
to the variables of their containing function (lexical scoping).
*/

function outerFunction() {
  var outerVar = "I am outer";

  function innerFunction() {
    console.log(outerVar); // Inner can access outer's variables
  }

  return innerFunction;
}

var nestedFn = outerFunction();
nestedFn(); // I am outer

/*
==================================================
8. SCOPE CHAIN DEMONSTRATION
==================================================

The scope chain shows how JavaScript resolves variable lookups. When looking for
a variable, JavaScript searches:
1. The current scope
2. The outer function scope
3. The global scope
*/

var scopeChainVar = "global";

function outerScope() {
  var outerScopeVar = "outer";

  function innerScope() {
    var innerScopeVar = "inner";
    console.log("Looking for scopeChainVar:", scopeChainVar); // Found in global
    console.log("Looking for outerScopeVar:", outerScopeVar); // Found in outer
    console.log("Looking for innerScopeVar:", innerScopeVar); // Found in inner
  }

  return innerScope;
}

var scopeChainFn = outerScope();
scopeChainFn(); // Shows the scope chain in action

/*
==================================================
9. ARGUMENTS OBJECT
==================================================

The arguments object is available in all functions and provides access to the
arguments passed to that function. It's not a standard array, but an array-like
object.

Note: Arrow functions do NOT have their own arguments object.
*/

function showArguments() {
  console.log("Arguments:", Array.from(arguments));
  arguments.someValue = "modified"; // Arguments object can be modified
}

showArguments("a", "b", "c");

/*
==================================================
10. WITH STATEMENT (LEGACY - AVOID)
==================================================

The with statement adds an object to the beginning of the scope chain for the
block. It's rarely used and generally considered bad practice because it makes
code harder to understand and can cause performance issues.

It's not supported in strict mode.
*/

/*
var obj = { value: "hello" };
with (obj) {
  console.log(value); // "hello" - accessed from obj scope
}
*/

/*
==================================================
SUMMARY
==================================================

Key takeaways:
1. Global scope: Variables declared outside functions
2. Function scope (var): Variables accessible only within their function
3. Block scope (let, const): Variables accessible only within blocks {}
4. Closures: Inner functions retain access to outer function variables
5. Scope chain: Lexical scoping chain from inner to outer to global
6. Privacy: Use closures or modules to create private variables
*/
