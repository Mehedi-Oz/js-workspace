/*
==================================================
ARRAYS IN JAVASCRIPT
==================================================
*/

/*
This file is a compact practice companion for arrays.
It includes explanations, runnable examples, output questions,
practice problems, viva questions, and things to remember.
*/

/*
==================================================
1) ARRAY OVERVIEW
==================================================
*/

/*
An array is an ordered collection of elements, indexed from 0.
Each element can be any data type: numbers, strings, objects, etc.

Key points:
- Arrays are ordered collections
- Zero-indexed (first element is at index 0)
- Mutable (can be changed)
- Can hold mixed data types
*/

console.log('--- Array overview example ---');
const colors = ['red', 'green', 'blue'];
console.log(colors);
console.log('Length:', colors.length);
console.log('First element:', colors[0]);

/*
==================================================
2) CREATING & ACCESSING ARRAYS
==================================================
*/

console.log('--- Creating arrays ---');
const arr1 = [1, 2, 3];
const arr2 = new Array(4, 5, 6);
const arr3 = [];

console.log('arr1:', arr1);
console.log('arr2:', arr2);
console.log('arr3:', arr3);

console.log('--- Accessing elements ---');
const numbers = [10, 20, 30, 40, 50];
console.log('Index 0:', numbers[0]);
console.log('Index 2:', numbers[2]);
console.log('Last element:', numbers[numbers.length - 1]);
console.log('Index out of bounds:', numbers[10]);

console.log('--- Mixed types array ---');
const mixed = [42, 'hello', true, null, { name: 'Hasan' }, [1, 2]];
console.log(mixed);

console.log('--- Array length ---');
console.log('numbers.length:', numbers.length);
const empty = [];
console.log('empty.length:', empty.length);

/*
==================================================
3) MODIFIERS (Methods that change the array)
==================================================
*/

console.log('--- push: add to end ---');
const stack = [1, 2, 3];
stack.push(4);
stack.push(5, 6);
console.log(stack);

console.log('--- pop: remove from end ---');
const popped = stack.pop();
console.log('Popped:', popped);
console.log('After pop:', stack);

console.log('--- unshift: add to beginning ---');
const queue = [2, 3];
queue.unshift(1);
queue.unshift(0, -1);
console.log(queue);

console.log('--- shift: remove from beginning ---');
const shifted = queue.shift();
console.log('Shifted:', shifted);
console.log('After shift:', queue);

console.log('--- splice: insert, remove, or replace ---');
const fruits = ['apple', 'banana', 'mango', 'orange'];
const removed = fruits.splice(1, 2, 'blueberry', 'cherry');
console.log('Removed:', removed);
console.log('After splice:', fruits);

console.log('--- reverse: reverse in place ---');
const digits = [1, 2, 3, 4, 5];
digits.reverse();
console.log('Reversed:', digits);

console.log('--- sort: sort in place ---');
const letters = ['c', 'a', 'd', 'b'];
letters.sort();
console.log('Sorted:', letters);

const nums = [30, 5, 100, 2, 15];
nums.sort((a, b) => a - b);
console.log('Sorted numbers:', nums);

console.log('--- fill: fill with value ---');
const filled = [1, 2, 3, 4, 5];
filled.fill(0, 1, 3);
console.log('After fill:', filled);

/*
When to use modifiers:
- push/pop for stack behavior
- shift/unshift for queue behavior
- splice for precise insertions/removals
- sort and reverse change the original array
*/

/*
==================================================
4) EXTRACTORS (Methods that return new data without changing the array)
==================================================
*/

console.log('--- slice: extract portion ---');
const origArray = ['a', 'b', 'c', 'd', 'e'];
const sliced1 = origArray.slice(1, 4);
const sliced2 = origArray.slice(2);
const sliced3 = origArray.slice(-2);
console.log('Original:', origArray);
console.log('slice(1, 4):', sliced1);
console.log('slice(2):', sliced2);
console.log('slice(-2):', sliced3);

console.log('--- concat: join arrays ---');
const arr10 = [1, 2];
const arr20 = [3, 4];
const arr30 = [5, 6];
const combined = arr10.concat(arr20, arr30);
console.log('Combined:', combined);
console.log('Original arr10:', arr10);

console.log('--- join: convert to string ---');
const words = ['Hello', 'from', 'JavaScript'];
const sentence = words.join(' ');
const csv = words.join(',');
console.log('Joined with space:', sentence);
console.log('Joined with comma:', csv);

console.log('--- includes: check if element exists ---');
const items = ['pen', 'pencil', 'eraser'];
console.log('Includes pen?', items.includes('pen'));
console.log('Includes ruler?', items.includes('ruler'));

console.log('--- indexOf & lastIndexOf ---');
const langs = ['JS', 'Python', 'JS', 'Go', 'JS'];
console.log('indexOf JS:', langs.indexOf('JS'));
console.log('lastIndexOf JS:', langs.lastIndexOf('JS'));
console.log('indexOf Rust:', langs.indexOf('Rust'));

console.log('--- toString ---');
const mixed2 = [1, 'two', 3.5];
console.log(mixed2.toString());

/*
Extractors never modify the original array.
*/

/*
==================================================
5) ITERATION METHODS
==================================================
*/

const scores = [85, 92, 78, 88, 95];

console.log('--- forEach: execute for each element ---');
scores.forEach((score, index, arr) => {
  console.log(`Index ${index}: ${score}`);
});

console.log('--- map: transform each element ---');
const doubled = scores.map(score => score * 2);
console.log('Doubled:', doubled);

const messages = [1, 2, 3].map(n => `Number: ${n}`);
console.log('Messages:', messages);

console.log('--- filter: keep matching elements ---');
const passed = scores.filter(score => score >= 80);
console.log('Scores >= 80:', passed);

const evenNumbers = [1, 2, 3, 4, 5, 6].filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

console.log('--- find: get first matching element ---');
const firstPassed = scores.find(score => score >= 90);
console.log('First score >= 90:', firstPassed);

const firstEven = [1, 3, 5, 6, 7].find(n => n % 2 === 0);
console.log('First even:', firstEven);

console.log('--- findIndex: get index of first match ---');
const idx = scores.findIndex(score => score >= 90);
console.log('Index of first >= 90:', idx);

console.log('--- reduce: accumulate to single value ---');
const sum = scores.reduce((acc, score) => acc + score, 0);
console.log('Sum:', sum);

const product = [2, 3, 4].reduce((acc, n) => acc * n, 1);
console.log('Product:', product);

console.log('--- some: check if any match ---');
const hasFailing = scores.some(score => score < 70);
console.log('Has score < 70?', hasFailings);

console.log('--- every: check if all match ---');
const allPassed = scores.every(score => score >= 70);
console.log('All >= 70?', allPassed);

console.log('--- flat: flatten nested arrays ---');
const nested = [1, [2, 3], [4, [5, 6]]];
console.log('Flat (1 level):', nested.flat());
console.log('Flat (2 levels):', nested.flat(2));

console.log('--- flatMap: map then flatten ---');
const words2 = ['hi', 'bye'];
const letterArrays = words2.flatMap(word => word.split(''));
console.log('Letter arrays:', letterArrays);

/*
Iteration methods are non-mutating (except forEach affects external state).
choose based on what you need to return.
*/

/*
==================================================
6) DESTRUCTURING & SPREAD
==================================================
*/

console.log('--- Array destructuring ---');
const [first, second, third] = ['apple', 'banana', 'cherry'];
console.log('first:', first);
console.log('second:', second);
console.log('third:', third);

console.log('--- Destructuring with rest ---');
const [head, ...tail] = [10, 20, 30, 40];
console.log('head:', head);
console.log('tail:', tail);

console.log('--- Destructuring with skip ---');
const [a, , c] = [1, 2, 3];
console.log('a:', a, 'c:', c);

console.log('--- Destructuring with default ---');
const [x = 99, y = 88] = [11];
console.log('x:', x, 'y:', y);

console.log('--- Spread operator: unpack array ---');
const arr = [1, 2, 3];
const expanded = [...arr, 4, 5];
console.log('Expanded:', expanded);

console.log('--- Spread to copy array ---');
const original = [1, 2, 3];
const copy = [...original];
console.log('Copy:', copy);
console.log('Are they the same object?', original === copy);

console.log('--- Spread to concatenate ---');
const part1 = ['a', 'b'];
const part2 = ['c', 'd'];
const joined = [...part1, ...part2];
console.log('Joined:', joined);

/*
Destructuring makes extracting values cleaner.
Spread operator is useful for copying and concatenating.
*/

/*
==================================================
7) COMMON CONFUSIONS
==================================================
*/

console.log('--- Confusion 1: Array comparison ---');
const arr1Comp = [1, 2, 3];
const arr2Comp = [1, 2, 3];
console.log('Are they equal?', arr1Comp === arr2Comp);
console.log('Reason: objects compared by reference, not value');

console.log('--- Confusion 2: Modifying vs copying ---');
const original2 = [1, 2, 3];
const reference = original2;
reference.push(4);
console.log('Original after push via reference:', original2);
console.log('They point to the same array');

console.log('--- Confusion 3: slice vs splice ---');
const arr3slv = [1, 2, 3, 4, 5];
const sliced = arr3slv.slice(1, 3);
console.log('After slice(1, 3):', arr3slv);
console.log('Sliced result:', sliced);

const arr4slv = [1, 2, 3, 4, 5];
const spliced = arr4slv.splice(1, 2);
console.log('After splice(1, 2):', arr4slv);
console.log('Spliced result:', spliced);

console.log('--- Confusion 4: forEach returns undefined ---');
const mapped = [1, 2, 3].forEach(n => n * 2);
console.log('forEach returns:', mapped);
console.log('Use map() instead if you need a new array');

console.log('--- Confusion 5: sort() converts to strings by default ---');
const unsorted = [30, 5, 100, 2];
console.log('Sorted without comparator:', unsorted.sort());
console.log('Correct: sort with (a,b) => a - b');

console.log('--- Confusion 6: Negative index ---');
const arr5conf = ['a', 'b', 'c'];
console.log('arr5conf[-1]:', arr5conf[-1]);
console.log('Negative index does not work; use slice(-1) instead');

console.log('--- Confusion 7: Mutability ---');
const constArr = [1, 2, 3];
constArr.push(4);
console.log('const array after push:', constArr);
console.log('Reason: const prevents reassignment, not mutation');

/*
==================================================
8) ARRAY METHODS QUICK REFERENCE
==================================================
*/

/*
MODIFIERS (mutate original):
- push, pop, shift, unshift
- splice, reverse, sort, fill

EXTRACTORS (return new data):
- slice, concat, join, includes, indexOf, toString

ITERATORS (return new array or value):
- map, filter, find, reduce, forEach
- findIndex, some, every, flat, flatMap
*/

/*
==================================================
9) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1: [1, 2, 3].push(4); What is returned?
A1: 4 (the new length)
*/

/*
Q2: [1, 2, 3].slice(0, 2); Result?
A2: [1, 2] (original unchanged)
*/

/*
Q3: [1, 2, 3].map(n => n * 2); Result?
A3: [2, 4, 6]
*/

/*
Q4: [1, 2, 3, 4].filter(n => n > 2); Result?
A4: [3, 4]
*/

/*
Q5: [1, 2, 3].reduce((a, b) => a + b, 0); Result?
A5: 6
*/

/*
Q6: ['a', 'b'].concat(['c']); Result?
A6: ['a', 'b', 'c']
*/

/*
Q7: [1, [2, 3]].flat(); Result?
A7: [1, 2, 3]
*/

/*
==================================================
10) PRACTICE PROBLEMS
==================================================
*/

/* 1. Create an array of numbers 1 to 10. */

/* 2. Get the last element of an array. */

/* 3. Add an element to the end of an array. */

/* 4. Remove the first element of an array. */

/* 5. Reverse an array without using reverse(). */

/* 6. Double every number in an array. */

/* 7. Filter out negative numbers from an array. */

/* 8. Find the sum of all numbers in an array. */

/* 9. Find if a specific number exists in an array. */

/* 10. Create a new array with unique elements only. */

/* 11. Flatten a deeply nested array. */

/* 12. Sort an array of objects by a property. */

/* 13. Split a string into an array. */

/* 14. Join array elements into a sentence. */

/* 15. Swap two elements in an array. */

/*
==================================================
11) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is an array? */
/* A1. An ordered collection of elements indexed from 0, capable of holding any data type. */

/* Q2. How do you access the last element? */
/* A2. Using arr[arr.length - 1] or arr.at(-1). */

/* Q3. What is the difference between push and unshift? */
/* A3. push adds to the end, unshift adds to the beginning. Both mutate. */

/* Q4. What is the difference between slice and splice? */
/* A4. slice returns a copy without modifying; splice modifies the array. */

/* Q5. What does map return? */
/* A5. A new array with transformed elements. */

/* Q6. What does filter return? */
/* A6. A new array with only elements that pass the condition. */

/* Q7. What does reduce do? */
/* A7. It accumulates array elements into a single value. */

/* Q8. What is array destructuring? */
/* A8. Extracting elements into variables using [a, b, c] = array syntax. */

/* Q9. What does the spread operator do? */
/* A9. It unpacks an array to pass elements individually or create a copy. */

/* Q10. Why can't you compare arrays with ===? */
/* A10. Because arrays are objects, compared by reference, not by value. */

/* Q11. Can const arrays be modified? */
/* A11. Yes, const prevents reassignment but not mutation of the array. */

/* Q12. What is the difference between forEach and map? */
/* A12. forEach has no return value; map returns a new array. */

/* Q13. What does some() return? */
/* A13. true if at least one element matches the condition. */

/* Q14. What does every() return? */
/* A14. true if all elements match the condition. */

/* Q15. What is the purpose of flat()? */
/* A15. To flatten nested arrays by a specified depth. */

/*
==================================================
12) THINGS TO REMEMBER
==================================================
*/

// - Arrays are zero-indexed.
// - Use push/pop for stack behavior.
// - Use shift/unshift for queue behavior.
// - slice doesn't modify; splice does.
// - map transforms; filter selects; reduce accumulates.
// - forEach doesn't return a value.
// - Array comparison checks reference, not value.
// - const arrays can still be mutated.
// - Spread operator (...) unpacks arrays.
// - Use sort with comparator for numbers.
// - Destructuring simplifies value extraction.
// - Iteration methods are powerful; choose wisely.

/*
==================================================
13) FINAL MINI CHECKLIST
==================================================
*/

/*
- Do I need to modify the original array?
- Is the array comparison checking reference or value?
- Did I use the correct method (map vs forEach)?
- Are negative indices handled correctly?
- Did I pass a comparator to sort()?
- Is destructuring used clearly?
- Did I handle edge cases (empty arrays)?
*/

console.log('Array practice file loaded successfully.');
