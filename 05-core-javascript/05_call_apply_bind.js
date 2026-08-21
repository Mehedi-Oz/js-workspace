/*
===============================================================================
CALL, APPLY, and BIND
===============================================================================
call, apply, and bind are methods available on every FUNCTION in JavaScript.

They all do the SAME core thing:
They let you control what "this" refers to inside a function.

Difference:
- call()  -> invokes the function immediately, args passed one by one
- apply() -> invokes the function immediately, args passed as an array
- bind()  -> does NOT invoke immediately, returns a NEW function with "this" fixed
===============================================================================
*/


/*
===============================================================================
WHY DO WE NEED THEM?
===============================================================================

Normally, "this" inside a function depends on HOW the function is called
(this is called "this" binding at call-time).

Example:
*/

const person1 = {
  name: "Hasan",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const person2 = {
  name: "Maha",
};

person1.greet(); // Hello, my name is Hasan

/*
But what if we want to reuse person1.greet()
and make "this" point to person2 instead?

That's exactly what call, apply, and bind are for.
*/



/*
===============================================================================
1. call()
===============================================================================

Syntax:
functionName.call(thisArg, arg1, arg2, arg3, ...)

- thisArg -> the object "this" should refer to
- arg1, arg2... -> arguments passed individually (comma separated)
- Invokes the function IMMEDIATELY
===============================================================================
*/

function greet(greeting, punctuation) {
  console.log(`${greeting}, my name is ${this.name}${punctuation}`);
}

greet.call(person2, "Hello", "!");
// Hello, my name is Maha!

/*
Breakdown:

- "this" inside greet() = person2
- "Hello" -> greeting
- "!"     -> punctuation
*/



/*
===============================================================================
2. apply()
===============================================================================

Syntax:
functionName.apply(thisArg, [arg1, arg2, arg3, ...])

- Same as call()
- ONLY difference: arguments are passed as an ARRAY
- Invokes the function IMMEDIATELY
===============================================================================
*/

greet.apply(person2, ["Hi", "?"]);
// Hi, my name is Maha?

/*
Easy way to remember:

call  -> Comma separated arguments
apply -> Array of arguments (both start with "A")
*/


// Practical use case: Math.max with an array

const numbers = [3, 5, 1, 9, 2];

console.log(Math.max.apply(null, numbers)); // 9

/*
Math.max() doesn't accept arrays directly,
so apply() spreads the array into individual arguments.

(Modern alternative: Math.max(...numbers))
*/



/*
===============================================================================
3. bind()
===============================================================================

Syntax:
const newFunc = functionName.bind(thisArg, arg1, arg2, ...)

- Does NOT invoke the function immediately
- Returns a NEW function with "this" permanently bound
- You call the returned function whenever you want
===============================================================================
*/

const greetMaha = greet.bind(person2, "Hey", ".");

console.log(typeof greetMaha); // function (not called yet)

greetMaha(); // Hey, my name is Maha.

/*
Memory:

bind() -> "Bind this value, give it back to me later"
*/


// Practical use case: setTimeout losing "this"

const person3 = {
  name: "Nabila",
  greet: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};

setTimeout(person3.greet, 1000);
// Hello, I'm undefined
// "this" is lost because setTimeout calls the function
// on its own, without person3 as the caller.

setTimeout(person3.greet.bind(person3), 1000);
// Hello, I'm Nabila
// bind() locks "this" to person3, so it works correctly.



/*
===============================================================================
BORROWING METHODS (Common Real-World Use Case)
===============================================================================

call, apply, and bind let you "borrow" a method from one object
and use it on another object.
===============================================================================
*/

const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

// arrayLike is NOT a real array, so it has no .join(), .map(), etc.

const result = Array.prototype.join.call(arrayLike, "-");

console.log(result); // "a-b-c"

/*
Here we "borrowed" the join() method from Array.prototype
and used call() to run it with "this" = arrayLike.
*/



/*
===============================================================================
QUICK COMPARISON TABLE
===============================================================================

Method   | Invokes immediately? | Argument format      | Returns
---------|-----------------------|-----------------------|------------------
call()   | Yes                   | Comma separated       | function's result
apply()  | Yes                   | Array                 | function's result
bind()   | No                    | Comma separated       | new function
===============================================================================
*/



/*
===============================================================================
IMPORTANT QUESTIONS
===============================================================================
*/


// 1. What's the main difference between call/apply and bind?

/*
Answer:

call() and apply() invoke the function immediately.
bind() does not invoke the function -- it returns a new function
with "this" permanently set, to be called later.
*/


// 2. Why do we need call/apply/bind if methods already have "this"?

/*
Answer:

Because "this" in JavaScript is determined by HOW a function is called,
not where it is defined.

If a method is passed around (like into setTimeout, or as a callback),
it can lose its original "this" context.

call, apply, and bind let us explicitly control what "this" should be.
*/


// 3. Can bind() be used for partial application (preset arguments)?

function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5)); // 10
console.log(double(10)); // 20

/*
Answer:

Yes. bind() can "preset" some arguments in advance.
Here, "a" is always locked to 2.
Whatever you pass into double() becomes "b".

This is called Partial Application.
*/


// 4. Does arrow function "this" get affected by call/apply/bind?

const arrowGreet = () => {
  console.log(this);
};

arrowGreet.call(person2);
// Arrow functions ignore call/apply/bind for "this".
// They keep "this" from where they were DEFINED (lexical scope).

/*
Answer:

No. Arrow functions do NOT have their own "this".
They inherit "this" from their surrounding (lexical) scope.
call(), apply(), and bind() have NO effect on an arrow function's "this".
*/



/*
===============================================================================
SUMMARY
===============================================================================

call()
------
✓ Invokes immediately
✓ Arguments passed one by one (comma separated)
✓ Used to set "this" + call the function right away

apply()
-------
✓ Invokes immediately
✓ Arguments passed as an array
✓ Useful when arguments are already in array form

bind()
------
✓ Does NOT invoke immediately
✓ Returns a new function with "this" permanently bound
✓ Useful for callbacks, event handlers, setTimeout, partial application

Common Use Cases
-----------------
✓ Borrowing methods (e.g. Array.prototype.join.call(arrayLike))
✓ Fixing "this" in callbacks (setTimeout, event listeners)
✓ Partial application / presetting arguments with bind()

Remember
--------
call  -> Comma separated args, runs now
apply -> Array of args, runs now
bind  -> Returns new function, runs later
Arrow functions ignore call/apply/bind entirely.
===============================================================================
*/
