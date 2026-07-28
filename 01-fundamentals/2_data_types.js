/*
===============================================================================
                           JAVASCRIPT DATA TYPES
===============================================================================
JavaScript has 2 categories of data types:

1. Primitive Types (stored by value)
2. Reference Types (stored by reference)
===============================================================================
*/

/*
===============================================================================
1. PRIMITIVE TYPES (Stored by Value)
===============================================================================

Primitive values are immutable (cannot be changed directly).

When you assign a primitive to another variable,
JavaScript COPIES the value.

Types:
- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- BigInt
===============================================================================
*/

// String
let name = "John";

// Number
let age = 25;

// Boolean
let isLoggedIn = true;

// Null (must be assigned explicitly)
let user = null;

// Undefined (assigned automatically if no value is given)
let city;
console.log(city); // undefined

// Symbol (every Symbol is unique)
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false

// BigInt (used for very large integers)
let big = 9007199254740992n;

/*
Number.MAX_SAFE_INTEGER
9007199254740991

Anything larger can lose precision.

Use BigInt by adding "n".
*/

console.log(Number.MAX_SAFE_INTEGER);
console.log(big);

/*
===============================================================================
Primitive Copy Example
===============================================================================
*/

let a = 12;
let b = a; // copies the VALUE

/*
Memory:

a      b
↓      ↓
12     12
*/

a = a + 1;

/*
Now:

a      b
↓      ↓
13     12

Changing 'a' does NOT affect 'b'
because primitives are copied by value.
*/

console.log(a); // 13
console.log(b); // 12



/*
===============================================================================
2. REFERENCE TYPES (Stored by Reference)
===============================================================================

Reference types include:

- Object
- Array
- Function

When assigned to another variable,
JavaScript copies the REFERENCE (address),
NOT the actual object.
===============================================================================
*/

// Object

let person = {
  name: "John",
  age: 20,
};

let copy = person;

/*
Memory:

person --------┐
               │
               ▼
        { name: "John", age:20 }
               ▲
               │
copy ----------┘
*/

copy.age = 30;

console.log(person.age); // 30
console.log(copy.age);   // 30

// Both changed because they point to the same object.



// Array

let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2.push(4);

console.log(arr1); // [1,2,3,4]
console.log(arr2); // [1,2,3,4]



// Function

function greet() {
  console.log("Hello");
}

let anotherGreet = greet;

anotherGreet(); // Hello



/*
===============================================================================
TRUTHY & FALSY VALUES
===============================================================================

Falsy values (only these are false in boolean context)
===============================================================================
*/

Boolean(0);           // false
Boolean(false);       // false
Boolean(null);        // false
Boolean(undefined);   // false
Boolean(NaN);         // false
Boolean("");          // false
Boolean(document.all);// false (browser only)

/*
Everything else is Truthy.

Examples:
*/

Boolean(1);        // true
Boolean(-1);       // true
Boolean("Hello");  // true
Boolean([]);       // true
Boolean({});       // true

/*
Shortcut to check boolean value

!!value
*/

console.log(!!0);          // false
console.log(!!"Hello");    // true
console.log(!!undefined);  // false
console.log(!![]);         // true



/*
Example
*/

if (null) {
  console.log("Runs");
} else {
  console.log("Does not run");
}



/*
===============================================================================
TYPE COERCION (Automatic Type Conversion)
===============================================================================
*/

console.log(true + false);
// 1 + 0
// 1

console.log(null + 1);
// 0 + 1
// 1

console.log("5" + 5);
// "55"

console.log("5" - 1);
// 4

console.log(5 + "5");
// "55"

console.log(!!undefined);
// false

console.log(true + true);
// 2

console.log(false + false);
// 0



/*
===============================================================================
IMPORTANT QUESTIONS
===============================================================================
*/


// 1. Why is typeof null "object"?

console.log(typeof null); // "object"

/*
Answer:

This is a well-known historical bug in JavaScript.

When JavaScript was first created (1995), values were stored using
type tags. The binary representation of null accidentally matched the
tag used for objects.

As a result:

typeof null // "object"

This behavior was never fixed because millions of existing websites
depend on it. Changing it now would break backward compatibility.

Remember:
- null is NOT an object.
- It is a primitive data type.

Interview Tip:
"typeof null returns 'object' because of a historical bug in JavaScript."
*/


// 2. Why is NaN a number?

console.log(typeof NaN); // "number"

/*
Answer:

NaN stands for "Not a Number".

NaN is a special value of the Number data type.

It represents a failed numeric (number) operation.
Whenever JavaScript expects a number but cannot produce a valid one,
it returns NaN.

Examples:
*/

console.log(0 / 0);          // NaN
console.log("hello" * 5);    // NaN
console.log(Number("abc"));  // NaN

/*
Since NaN is still a special Number value,
JavaScript returns:

typeof NaN === "number" // true

Interview Tip:
"NaN is a special Number value that represents a failed numeric operation."



// 3. Difference between null and undefined

/*
undefined
-----------
A variable has been declared,
but JavaScript has not assigned any value yet.
*/

let x;

console.log(x); // undefined

/*
null
------
null is a value that the programmer assigns intentionally.

It usually means:
"There is no value here."
*/

let y = null;

console.log(y); // null

/*
Comparison

undefined
-----------
✔ Assigned automatically by JavaScript
✔ Means "value not assigned"

null
------
✔ Assigned manually by the programmer
✔ Means "empty" or "no value"

Examples:
*/

let userName;
console.log(userName); // undefined

let selectedUser = null;
console.log(selectedUser); // null

/*
Interview Tip:

undefined
→ JavaScript says:
"I don't have a value yet."

null
→ The programmer says:
"I intentionally want this variable to have no value."
*/


// 4. Why does '5' + 1 return "51" and '5' - 1 return 4?

console.log("5" + 1); // "51"
console.log("5" - 1); // 4

/*
Answer:

JavaScript automatically converts values when needed.
This is called Type Coercion.

'+' can add numbers OR join strings.

If one value is a string,
JavaScript converts the other value to a string.

Example:

"5" + 1
↓
"5" + "1"
↓
"51"


'-' is only for subtraction.

So JavaScript converts the string to a number.

Example:

"5" - 1
↓
5 - 1
↓
4


Easy to Remember:

'+' → Joins strings if a string is present.
'-' → Converts values to numbers and subtracts.
*/



/*
===============================================================================
SUMMARY
===============================================================================

Primitive Types (Copied by Value)
--------------------------------
✓ String
✓ Number
✓ Boolean
✓ Null
✓ Undefined
✓ Symbol
✓ BigInt

Reference Types (Copied by Reference)
-------------------------------------
✓ Object
✓ Array
✓ Function

Falsy Values
------------
0
false
null
undefined
NaN
""
document.all

Useful Facts
------------
typeof null        -> "object" (JavaScript bug)
typeof NaN         -> "number"
'5' + 1            -> "51"
'5' - 1            -> 4
true + false       -> 1
null + 1           -> 1
Number.MAX_SAFE_INTEGER -> 9007199254740991
Use BigInt for larger integers.
===============================================================================
*/
