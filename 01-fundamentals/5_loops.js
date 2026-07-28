/*
==================================================
LOOPS IN JAVASCRIPT
==================================================
*/

/*
This file is a compact practice companion for loops.
It includes explanations, runnable examples, output questions,
practice problems, viva questions, and things to remember.
*/

/*
==================================================
1) LOOP OVERVIEW
==================================================
*/

/*
A loop repeats code while a condition is true, or over items in a collection.

Main loop types:
- for
- while
- do...while
- for...in
- for...of

Loop control:
- break
- continue
*/

console.log('--- Loop overview example ---');
for (let i = 1; i <= 3; i++) {
  console.log('Iteration:', i);
}

/* Characteristics:
- Repetition reduces repeated code
- The stop condition controls how long the loop runs
- Wrong conditions can create infinite loops
*/

/*
==================================================
2) FOR LOOP
==================================================
*/

/*
Structure:
for (initialization; condition; update) {
  // code
}
*/

console.log('--- for loop basic ---');
for (let i = 1; i <= 5; i++) {
  console.log('Count:', i);
}

console.log('--- array with index ---');
const fruits = ['apple', 'banana', 'mango'];
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}

let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log('Sum 1 to 5 =', sum);

console.log('--- count down ---');
for (let i = 5; i >= 1; i--) {
  console.log(i);
}

console.log('--- skip by 2 ---');
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}

/*
When to use:
- Known number of iterations
- Index-based array traversal
*/

/*
==================================================
3) WHILE LOOP
==================================================
*/

/*
Structure:
while (condition) {
  // code
}
*/

console.log('--- while loop basic ---');
let num = 1;
while (num <= 3) {
  console.log('num:', num);
  num++;
}

/*
Important: update the counter inside the loop.
If you forget, the loop may run forever.
*/

let attempts = 0;
let found = false;
while (attempts < 3 && !found) {
  attempts++;
  if (attempts === 2) {
    found = true;
  }
  console.log('attempt:', attempts, 'found:', found);
}

/*
When to use:
- Unknown number of iterations
- Condition-based repetition
*/

/*
==================================================
4) DO...WHILE LOOP
==================================================
*/

/*
Structure:
do {
  // code
} while (condition);
*/

console.log('--- do...while basic ---');
let x = 1;
do {
  console.log('x:', x);
  x++;
} while (x <= 3);

let y = 10;
do {
  console.log('This runs once');
} while (y < 5);

/*
Difference from while:
- do...while runs at least once
- while may run zero times
*/

/*
==================================================
5) break AND continue
==================================================
*/

console.log('--- break example ---');
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}

console.log('--- continue example ---');
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}

/*
break stops the loop immediately.
continue skips only the current iteration.
*/

/*
==================================================
6) NESTED LOOPS
==================================================
*/

console.log('--- nested loop example ---');
for (let row = 1; row <= 2; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log('row', row, 'col', col);
  }
}

console.log('--- multiplication table of 2 ---');
for (let i = 1; i <= 5; i++) {
  console.log(`2 x ${i} = ${2 * i}`);
}

/*
Outer loop sets the main level.
Inner loop runs fully for each outer iteration.
*/

/*
==================================================
7) for...of
==================================================
*/

console.log('--- for...of array ---');
for (const fruit of fruits) {
  console.log(fruit);
}

console.log('--- for...of string ---');
for (const ch of 'JS') {
  console.log(ch);
}

/*
Use for...of for values from arrays, strings, sets, and maps.
*/

/*
==================================================
8) for...in
==================================================
*/

const user = {
  name: 'Hasan',
  age: 22,
  city: 'Dhaka'
};

console.log('--- for...in object ---');
for (const key in user) {
  console.log(key, user[key]);
}

/*
for...in gives keys.
It is mostly used for objects, not arrays.
*/

/*
==================================================
9) LOOP WITH ARRAYS
==================================================
*/

const numbers = [10, 20, 30, 40];

console.log('--- sum array using for loop ---');
let total = 0;
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}
console.log('total =', total);

console.log('--- even numbers using continue ---');
for (const n of numbers) {
  if (n % 2 !== 0) {
    continue;
  }
  console.log('even:', n);
}

console.log('--- find first even using early exit ---');
function findFirstEven(arr) {
  for (const item of arr) {
    if (item % 2 === 0) {
      return item;
    }
  }
  return null;
}
console.log('first even:', findFirstEven([1, 3, 7, 8, 10]));

/*
Common array loop tasks:
- Find max and min
- Count matches
- Build filtered arrays
*/

/*
==================================================
10) WHILE VS DO...WHILE
==================================================
*/

let check = 5;
while (check < 3) {
  console.log('while runs?');
  check++;
}

do {
  console.log('do...while runs at least once');
} while (check < 3);

/*
while checks before executing.
do...while checks after executing.
*/

/*
==================================================
11) COMMON MISTAKES
==================================================
*/

/*
1. Infinite loop, often from forgetting i++
2. Wrong boundary, such as using < when <= is needed
3. Off-by-one errors
4. Using for...in for arrays without a real reason
5. Not updating the loop variable
*/

/* Example of a bad pattern:
for (let i = 1; i <= 3; ) {
  console.log(i);
}
This never ends because i is never updated.
*/

/*
==================================================
12) OUTPUT PREDICTION QUESTIONS
==================================================
*/

/*
Q1:
for (let i = 1; i <= 3; i++) console.log(i);
A1: 1, 2, 3
*/

/*
Q2:
let n = 1; while (n <= 2) { console.log(n); n++; }
A2: 1, 2
*/

/*
Q3:
for (let i = 1; i <= 5; i++) { if (i === 3) continue; console.log(i); }
A3: 1, 2, 4, 5
*/

/*
Q4:
do { console.log('hello'); } while (false);
A4: hello
*/

/*
Q5:
for (const ch of 'abc') { if (ch === 'b') break; console.log(ch); }
A5: a
*/

/*
==================================================
13) PRACTICE PROBLEMS
==================================================
*/

/* 1. Print numbers from 1 to 10 using a for loop. */

/* 2. Print numbers from 10 to 1 using a for loop. */

/* 3. Print only even numbers from 1 to 20. */

/* 4. Print the multiplication table of 7. */

/* 5. Calculate the sum of numbers from 1 to 100. */

/* 6. Find the largest number in an array. */

/* 7. Find the smallest number in an array. */

/* 8. Count how many odd numbers are in an array. */

/* 9. Print each character of a string using for...of. */

/* 10. Loop through an object and print its keys and values. */

/* 11. Stop a loop when a target number is found. */

/* 12. Skip all negative numbers in an array. */

/* 13. Print a triangle pattern using nested loops. */

/* 14. Reverse an array using a loop. */

/* 15. Build a new array containing only positive numbers. */

/*
==================================================
14) VIVA QUESTIONS WITH ANSWERS
==================================================
*/

/* Q1. What is a loop? */
/* A1. A loop repeats a block of code until a condition changes or over a collection. */

/* Q2. What is the difference between for and while? */
/* A2. for is better when you know the count or need an index. while is better when the stop point depends on a condition. */

/* Q3. What is do...while? */
/* A3. It runs the block once before checking the condition, so it always executes at least once. */

/* Q4. What does break do? */
/* A4. It stops the loop immediately and exits the loop body. */

/* Q5. What does continue do? */
/* A5. It skips the current iteration and moves to the next one. */

/* Q6. What is a nested loop? */
/* A6. A loop inside another loop, often used for patterns, grids, and matrix problems. */

/* Q7. What is the difference between for...in and for...of? */
/* A7. for...in gives keys. for...of gives values from iterable objects. */

/* Q8. Why is for...in not ideal for arrays? */
/* A8. Because it is meant for keys, not ordered array values, so for...of or for is usually clearer. */

/* Q9. What is an infinite loop? */
/* A9. A loop that never ends because the stop condition is never reached. */

/* Q10. What is an off-by-one error? */
/* A10. A boundary mistake where a loop runs one time too many or too few. */

/* Q11. Why use early exit in loops? */
/* A11. To stop as soon as the answer is known, which is cleaner and faster. */

/* Q12. Can do...while run zero times? */
/* A12. No. It always runs at least once because the condition is checked after execution. */

/* Q13. What happens if the counter is not updated? */
/* A13. The loop may keep running forever. */

/* Q14. When is break useful? */
/* A14. When you want to stop as soon as a condition is satisfied. */

/* Q15. When is continue useful? */
/* A15. When one iteration should be skipped without ending the loop. */

/*
==================================================
15) THINGS TO REMEMBER
==================================================
*/

// - Use for when the count is known.
// - Use while when the condition controls the repetition.
// - Use do...while when one execution is guaranteed.
// - Use break to stop early.
// - Use continue to skip one iteration.
// - Keep the update step visible.
// - Watch for infinite loops and off - by - one errors.
// - Use for...of for values and for...in for object keys.
// - Nested loops can grow expensive quickly.
// - Early exit often makes code easier to read.

  /*
  ==================================================
  16) FINAL MINI CHECKLIST
  ==================================================
  */

  /*
  - Is the loop type appropriate?
  - Does the loop stop correctly?
  - Is the counter updated?
  - Are break and continue used clearly?
  - Did you test edge cases?
  */

  console.log('Loop practice file loaded successfully.');
