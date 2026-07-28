/*
==================================================
OPERATORS IN JAVASCRIPT
==================================================

Operators are symbols that perform operations on values
and variables.

Example:
5 + 3
^ ^ ^
| | |
| | Operand
| Operator
Operand
*/


/*
==================================================
Arithmetic Operators
==================================================

Used to perform mathematical calculations.
*/

let a = 10;
let b = 3;

console.log(a + b); // 13 (Addition)
console.log(a - b); // 7  (Subtraction)
console.log(a * b); // 30 (Multiplication)
console.log(a / b); // 3.333... (Division)
console.log(a % b); // 1 (Remainder)
console.log(a ** b); // 1000 (Exponentiation)



/*
==================================================
Increment & Decrement
==================================================

++ increases by 1
-- decreases by 1
*/

let count = 5;

count++;
console.log(count); // 6

count--;
console.log(count); // 5


/*
Pre Increment
*/

let x = 5;

console.log(++x); // 6
console.log(x);   // 6


/*
Post Increment
*/

let y = 5;

console.log(y++); // 5 (returns first)
console.log(y);   // 6 (increments later)


/*
Same idea for --
*/

let z = 5;

console.log(--z); // 4
console.log(z--); // 4
console.log(z);   // 3



/*
==================================================
Assignment Operators
==================================================

Used to assign or update values.
*/

let score = 10;

score += 5;
console.log(score); // 15

score -= 3;
console.log(score); // 12

score *= 2;
console.log(score); // 24

score /= 4;
console.log(score); // 6

score %= 4;
console.log(score); // 2

score **= 3;
console.log(score); // 8



/*
==================================================
Comparison Operators
==================================================

Comparison operators return true or false.
*/

console.log(10 > 5); // true
console.log(10 < 5); // false

console.log(10 >= 10); // true
console.log(10 <= 9);  // false

console.log(10 == "10"); // true
/*
== compares values only.
Type conversion (coercion) happens.
*/

console.log(10 === "10"); // false
/*
=== compares both value and type.
Always prefer ===
*/

console.log(10 != "10"); // false

console.log(10 !== "10"); // true



/*
==================================================
Logical Operators
==================================================

&&  Logical AND
||  Logical OR
!   Logical NOT
*/

let age = 20;
let hasID = true;

console.log(age >= 18 && hasID);
// true

console.log(age >= 21 && hasID);
// false

console.log(age >= 21 || hasID);
// true

console.log(!hasID);
// false



/*
==================================================
Truthy and Falsy Values
==================================================

Falsy values:

false
0
-0
0n
""
null
undefined
NaN

Everything else is truthy.
*/

console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("Hello")); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true



/*
==================================================
Short Circuit Evaluation
==================================================
*/

/*
Logical AND (&&)

Returns the first falsy value.
If none are falsy, returns the last value.
*/

console.log(true && "Hello"); // Hello
console.log(false && "Hello"); // false
console.log(10 && 20); // 20
console.log(0 && 20); // 0


/*
Logical OR (||)

Returns the first truthy value.
*/

console.log(false || "Hello"); // Hello
console.log(0 || 100); // 100
console.log("Hi" || "Bye"); // Hi


/*
Nullish Coalescing (??)

Returns the right value ONLY if the left value
is null or undefined.
*/

console.log(null ?? "Guest"); // Guest
console.log(undefined ?? "Guest"); // Guest
console.log("" ?? "Guest"); // ""
console.log(0 ?? 100); // 0



/*
==================================================
String Operators
==================================================
*/

let first = "Hello";
let second = "World";

console.log(first + " " + second);
// Hello World

let language = "Java";
language += "Script";

console.log(language);
// JavaScript



/*
==================================================
Ternary Operator
==================================================

Syntax:

condition ? valueIfTrue : valueIfFalse
*/

let marks = 75;

let result = marks >= 40 ? "Pass" : "Fail";

console.log(result);
// Pass


/*
Nested Ternary
*/

let grade =
  marks >= 90 ? "A" :
    marks >= 80 ? "B" :
      marks >= 70 ? "C" :
        marks >= 60 ? "D" :
          "F";

console.log(grade);
// C

/*
Equivalent if...else if

if (marks >= 90)
    grade = "A";
else if (marks >= 80)
    grade = "B";
else if (marks >= 70)
    grade = "C";
else if (marks >= 60)
    grade = "D";
else
    grade = "F";
*/



/*
==================================================
typeof Operator
==================================================

Returns the type of a value.
*/

console.log(typeof 10); // number
console.log(typeof "Hello"); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof Symbol()); // symbol
console.log(typeof 10n); // bigint
console.log(typeof function () { }); // function

/*
Arrays are objects.
*/

console.log(typeof []);
// object

console.log(typeof {});
// object

/*
Historical JavaScript bug.
*/

console.log(typeof null);
// object



/*
==================================================
instanceof Operator
==================================================

Checks whether an object's prototype chain
contains a constructor's prototype.
*/

let arr = [];

console.log(arr instanceof Array);
// true

console.log(arr instanceof Object);
// true

console.log(arr instanceof Function);
// false

function greet() { }

console.log(greet instanceof Function);
// true

console.log(greet instanceof Object);
// true



/*
==================================================
Operator Precedence
==================================================

Some operators execute before others.
*/

console.log(2 + 3 * 4);
// 14

/*
Equivalent to:

2 + (3 * 4)
*/

console.log((2 + 3) * 4);
// 20



/*
==================================================
Equality Summary
==================================================

==

- Compares value
- Performs type coercion

===

- Compares value
- Compares type
- Recommended
*/

console.log(5 == "5"); // true
console.log(5 === "5"); // false



/*
==================================================
One Sentence to Remember
==================================================

Arithmetic    -> Do Math

Assignment    -> Store values

Comparison    -> Returns true/false

Logical       -> Combine conditions

Ternary       -> Short if...else

typeof        -> Returns the type

instanceof    -> Checks inheritance

===           -> Preferred equality operator
*/
