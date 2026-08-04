/*
==================================================
VARIABLE DECLARATIONS: var, let, const
==================================================
*/

/*
==================================================
var
==================================================

Characteristics:
- Added to the global `window` object (when declared globally)
- Function scoped
- Can be re-declared
- Can be updated
*/

var name = "Hasan";
console.log(name);

// Re-declaration (Allowed)
var name = "Maha";
console.log(name);

// Function Scope Example
function checkVar() {
  if (true) {
    var x = 99;
    console.log(x);
  }
  /* x is also accessible here because var is function scoped */
  console.log('x accessible from outside of the if statement!', x);
}

checkVar();

/*
==================================================
let
==================================================

Characteristics:
- Not added to the global `window` object
- Block scoped
- Cannot be re-declared in the same scope
- Can be updated
*/

let age = 25;
console.log(age);

/*
// Re-declaration (Not Allowed)

let age = 30;

Error:
Uncaught SyntaxError: Identifier 'age' has already been declared
*/

// Updating (Allowed)
age = 26;
console.log(age);

/* Block scoped */
function checkLet() {
  if (true) {
    let y = 66;
    console.log(y);
  }

  /*
  y is also accessible here because let is function scoped

  console.log('y is not accessible from outside of the if statement!', y);
  */
}

checkLet();


/*
==================================================
const
==================================================

Characteristics:
- Not added to the global `window` object
- Block scoped
- Cannot be re-declared
- Cannot be reassigned
*/

const pi = 3.14;
console.log(pi);

/*
// Re-declaration (Not Allowed)

const pi = 3.2;

Error:
Uncaught SyntaxError: Identifier 'pi' has already been declared
*/

/*
// Reassignment (Not Allowed)

pi = 3.14159;

Error:
Uncaught TypeError: Assignment to constant variable.
*/


/*
==================================================
Temporal Dead Zone (TDZ)
==================================================

The Temporal Dead Zone is the period between entering a scope
and the point where a `let` or `const` variable is declared.

During this period, the variable exists but cannot be accessed.
Trying to access it will throw a ReferenceError.
*/

/*
// Example

console.log(username);

let username = "Hasan";

Error:
Uncaught ReferenceError:
Cannot access 'username' before initialization
*/

/*
`var` does NOT have a Temporal Dead Zone.

Instead, it is hoisted and initialized with `undefined`.
*/

console.log(city); // undefined

var city = "Dhaka";

console.log(city); // Dhaka


/*
==================================================
Hoisting Impact
==================================================

Hoisting refers to JavaScript giving higher precedence to the declaration of variables, classes, and functions during a program’s execution.

The behavior differs for `var`, `let`, and `const`.
*/


/*
--------------------
var
--------------------

- Declaration is hoisted
- Initialized with `undefined`
- Can be accessed before declaration
*/

console.log('pre-var', language); // undefined

var language = "JavaScript";

console.log('post-var', language); // JavaScript



/*
--------------------
let
--------------------

- Declaration is hoisted
- NOT initialized
- Stays in the Temporal Dead Zone (TDZ)
- Accessing before declaration throws a ReferenceError
*/

/*
console.log(age);

let age = 25;

Error:
Uncaught ReferenceError:
Cannot access 'age' before initialization
*/



/*
--------------------
const
--------------------

- Declaration is hoisted
- NOT initialized
- Stays in the Temporal Dead Zone (TDZ)
- Accessing before declaration throws a ReferenceError
*/

/*
console.log(PI);

const PI = 3.14;

Error:
Uncaught ReferenceError:
Cannot access 'PI' before initialization
*/

/*
One sentence to remember:

- Hoisting answers: "Does JavaScript know this variable exists before execution?"(Yes, for var, let, and const.)
- TDZ answers: "Can I use this let or const variable before its declaration executes?" (No.)

*/

/*
example 01:

var x = 10; //global
{
  var x = 20; // var respects functional scope,this is not a function // this becomes global too
}
console.log(x); // 20


example 02:
let a = 10; //global
{
  let a = 20; // let respects block scope
  console.log("Inside", a); // 20
}
console.log("Outside", a); // 10


example 03:

const person = {name: "Hasan"};
person.name = "Maha"; //✅ allowed, because we are not reassigning the variable, just changing a property of the object
person = {name: "Maha"}; //❌ not allowed, because we are reassigning the variable

*/
