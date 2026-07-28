/*
==================================================
CONTROL FLOW: if, else if, else, switch, loops of decision making
==================================================

This file is organized like a study sheet and practice file.
It includes:
- Control flow overview
- Truthy and falsy values
- Comparison operators
- Logical operators
- if, if...else, else if
- Nested if
- switch, break, default, fall-through
- switch vs if
- Early return
- Ternary operator
- Common mistakes
- Output prediction questions with answers
- 20+ practice problems
- 20+ viva questions with detailed answers
- Things to remember

How to use this file:
1. Read each concept section.
2. Run the examples.
3. Try the practice questions before reading answers.
4. Use viva questions for interview revision.
*/

/*
==================================================
1. CONTROL FLOW OVERVIEW
==================================================

Control flow means the order in which code runs.

Normally, JavaScript runs from top to bottom.
Control flow statements let us change that path.

Common control flow tools:
- if
- else if
- else
- nested if
- switch
- break
- return
- ternary operator
*/

console.log("====================================");
console.log("CONTROL FLOW PRACTICE FILE STARTED");
console.log("====================================");

/*
==================================================
2. TRUTHY & FALSY
==================================================

Falsy values in JavaScript:
- false
- 0
- -0
- 0n
- ""
- null
- undefined
- NaN

Everything else is truthy.
*/

console.log("\n--- Truthy & Falsy ---");

let userName = "";
if (userName) {
  console.log("User name exists");
} else {
  console.log("User name is empty");
}

let score = 10;
if (score) {
  console.log("Score is truthy");
}

let someValue = null;
if (!someValue) {
  console.log("someValue is falsy");
}

/*
==================================================
3. COMPARISON OPERATORS
==================================================

Comparison operators:
- ==   loose equality
- ===  strict equality
- !=   loose not equal
- !==  strict not equal
- >    greater than
- <    less than
- >=   greater than or equal to
- <=   less than or equal to

Important:
- == and != do type coercion
- === and !== do not type coercion
*/

console.log("\n--- Comparison Operators ---");

console.log(5 == "5");   // true
console.log(5 === "5");  // false
console.log(5 != "5");   // false
console.log(5 !== "5");  // true

console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 >= 10);   // true
console.log(10 <= 9);    // false

/*
==================================================
4. LOGICAL OPERATORS
==================================================

Logical operators:
- &&  AND
- ||  OR
- !   NOT

Short explanation:
- &&  returns true only if both sides are true
- ||  returns true if any side is true
- !   reverses the boolean value
*/

console.log("\n--- Logical Operators ---");

let isLoggedIn = true;
let hasPermission = false;

if (isLoggedIn && hasPermission) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}

let isAdmin = false;
let isEditor = true;

if (isAdmin || isEditor) {
  console.log("Can edit content");
}

console.log(!true);  // false
console.log(!false); // true

/*
==================================================
5. if STATEMENT
==================================================

Syntax:
if (condition) {
  // code
}

The block runs only when the condition is truthy.
*/

console.log("\n--- if Statement ---");

let temperature = 35;

if (temperature > 30) {
  console.log("It is hot outside");
}

let age = 18;
if (age >= 18) {
  console.log("You are eligible to vote");
}

/*
==================================================
6. if...else STATEMENT
==================================================

Syntax:
if (condition) {
  // runs when condition is true
} else {
  // runs when condition is false
}
*/

console.log("\n--- if...else Statement ---");

let isRainy = false;

if (isRainy) {
  console.log("Take an umbrella");
} else {
  console.log("No umbrella needed");
}

let marks = 45;
if (marks >= 50) {
  console.log("Passed");
} else {
  console.log("Failed");
}

/*
==================================================
7. else if LADDER
==================================================

Use else if when there are multiple conditions.
Only the first true condition runs.
*/

console.log("\n--- else if Ladder ---");

let examScore = 82;

if (examScore >= 90) {
  console.log("Grade A");
} else if (examScore >= 80) {
  console.log("Grade B");
} else if (examScore >= 70) {
  console.log("Grade C");
} else if (examScore >= 60) {
  console.log("Grade D");
} else {
  console.log("Grade F");
}

/*
==================================================
8. NESTED if
==================================================

Nested if means an if inside another if.
Use it when one condition depends on another.
*/

console.log("\n--- Nested if ---");

let hasID = true;
let ageToCheck = 20;

if (hasID) {
  if (ageToCheck >= 18) {
    console.log("Allowed to enter");
  } else {
    console.log("Too young");
  }
} else {
  console.log("ID required");
}

/*
==================================================
9. switch STATEMENT
==================================================

Syntax:
switch (expression) {
  case value1:
    // code
    break;
  case value2:
    // code
    break;
  default:
    // code
}

Use switch when checking one expression against multiple fixed values.
*/

console.log("\n--- switch Statement ---");

let day = "Wednesday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Wednesday":
    console.log("Midweek");
    break;
  case "Friday":
    console.log("Weekend is near");
    break;
  default:
    console.log("Ordinary day");
}

/*
==================================================
10. break, default, AND FALL-THROUGH
==================================================

break:
- stops the switch after a match

default:
- runs when no case matches

Fall-through:
- happens when break is missing
- execution continues into the next case
*/

console.log("\n--- break, default, Fall-through ---");

let fruit = "banana";

switch (fruit) {
  case "apple":
    console.log("Apple selected");
    break;
  case "banana":
    console.log("Banana selected");
    break;
  default:
    console.log("Unknown fruit");
}

let grade = "B";

switch (grade) {
  case "A":
  case "B":
    console.log("Good performance");
    break;
  case "C":
    console.log("Average performance");
    break;
  default:
    console.log("Needs improvement");
}

/*
==================================================
11. switch vs if
==================================================

Use if / else if when:
- you have ranges
- you have complex conditions
- you need logical operators

Use switch when:
- you compare one variable to many exact values
- the cases are fixed and clear
*/

console.log("\n--- switch vs if ---");

let marksForComparison = 72;

if (marksForComparison >= 90) {
  console.log("if: Excellent");
} else if (marksForComparison >= 70) {
  console.log("if: Good");
} else {
  console.log("if: Needs work");
}

let color = "red";

switch (color) {
  case "red":
    console.log("switch: Stop");
    break;
  case "yellow":
    console.log("switch: Wait");
    break;
  case "green":
    console.log("switch: Go");
    break;
  default:
    console.log("switch: Unknown signal");
}

/*
==================================================
12. EARLY RETURN
==================================================

Early return means returning from a function as soon as a condition is met.
This reduces nesting and improves readability.

Before:
- nested checks
After:
- guard clauses and simpler flow
*/

console.log("\n--- Early Return ---");

function getDiscountBefore(membership, cartTotal) {
  if (membership) {
    if (cartTotal > 100) {
      return "Discount: 20%";
    } else {
      return "Discount: 10%";
    }
  } else {
    return "No discount";
  }
}

function getDiscountAfter(membership, cartTotal) {
  if (!membership) return "No discount";
  if (cartTotal > 100) return "Discount: 20%";
  return "Discount: 10%";
}

console.log(getDiscountBefore(true, 120));
console.log(getDiscountAfter(true, 120));
console.log(getDiscountAfter(false, 120));

/*
==================================================
13. TERNARY OPERATOR
==================================================

Syntax:
condition ? valueIfTrue : valueIfFalse

The ternary operator is a short form of if...else.
Use it for simple decisions.
*/

console.log("\n--- Ternary Operator ---");

let loginMessage = isLoggedIn ? "Welcome back" : "Please log in";
console.log(loginMessage);

let resultMessage = score >= 50 ? "Pass" : "Fail";
console.log(resultMessage);

/*
==================================================
14. COMMON MISTAKES
==================================================

1. Using = instead of ==
   - = assigns a value
   - == compares values

2. Using == instead of === when type matters

3. Forgetting break in switch

4. Writing unreachable conditions
   - example: if (x > 10) then else if (x > 5)
     The second check may never be useful in some cases depending on order

5. Using switch for ranges
   - switch is usually not the right tool for ranges

6. Forgetting braces
   - braces improve readability and reduce bugs

7. Over-nesting
   - use early return to flatten logic
*/

console.log("\n--- Common Mistakes Examples ---");

let compareA = 5;
let compareB = "5";

if (compareA === compareB) {
  console.log("Strict equal");
} else {
  console.log("Not strictly equal");
}

let mode = "dark";
switch (mode) {
  case "dark":
    console.log("Dark mode enabled");
    break;
  default:
    console.log("Default mode");
}

/*
==================================================
15. MULTIPLE RUNNABLE EXAMPLES
==================================================

Example 1: Login access
*/

console.log("\n--- Runnable Example 1: Login Access ---");

function canAccessDashboard(isLoggedIn, isBlocked) {
  if (!isLoggedIn) {
    return "Please log in first";
  }

  if (isBlocked) {
    return "Account blocked";
  }

  return "Dashboard access granted";
}

console.log(canAccessDashboard(true, false));
console.log(canAccessDashboard(false, false));
console.log(canAccessDashboard(true, true));

/*
Example 2: Student result
*/

console.log("\n--- Runnable Example 2: Student Result ---");

function getResult(marks) {
  if (marks >= 80) {
    return "A+";
  } else if (marks >= 70) {
    return "A";
  } else if (marks >= 60) {
    return "A-";
  } else if (marks >= 50) {
    return "B";
  } else {
    return "Fail";
  }
}

console.log(getResult(91));
console.log(getResult(73));
console.log(getResult(58));
console.log(getResult(42));

/*
Example 3: Traffic signal
*/

console.log("\n--- Runnable Example 3: Traffic Signal ---");

function trafficAction(signal) {
  switch (signal) {
    case "red":
      return "Stop";
    case "yellow":
      return "Slow down";
    case "green":
      return "Go";
    default:
      return "Invalid signal";
  }
}

console.log(trafficAction("red"));
console.log(trafficAction("yellow"));
console.log(trafficAction("green"));
console.log(trafficAction("blue"));

/*
==================================================
16. OUTPUT PREDICTION QUESTIONS WITH ANSWERS
==================================================

Try to predict the output before reading the answer.
*/

console.log("\n--- Output Prediction 1 ---");

/*
Question:
let x = 10;
if (x > 5) {
  console.log("High");
} else {
  console.log("Low");
}

Answer:
High
*/

let x1 = 10;
if (x1 > 5) {
  console.log("High");
} else {
  console.log("Low");
}

console.log("\n--- Output Prediction 2 ---");

/*
Question:
let x = 2;
if (x > 5) {
  console.log("A");
} else if (x > 1) {
  console.log("B");
} else {
  console.log("C");
}

Answer:
B
*/

let x2 = 2;
if (x2 > 5) {
  console.log("A");
} else if (x2 > 1) {
  console.log("B");
} else {
  console.log("C");
}

console.log("\n--- Output Prediction 3 ---");

/*
Question:
let value = "2";
if (value == 2) {
  console.log("Equal");
} else {
  console.log("Not Equal");
}

Answer:
Equal
*/

let value3 = "2";
if (value3 == 2) {
  console.log("Equal");
} else {
  console.log("Not Equal");
}

console.log("\n--- Output Prediction 4 ---");

/*
Question:
let value = "2";
if (value === 2) {
  console.log("Equal");
} else {
  console.log("Not Equal");
}

Answer:
Not Equal
*/

let value4 = "2";
if (value4 === 2) {
  console.log("Equal");
} else {
  console.log("Not Equal");
}

console.log("\n--- Output Prediction 5 ---");

/*
Question:
let n = 3;
switch (n) {
  case 1:
    console.log("One");
    break;
  case 3:
    console.log("Three");
    break;
  default:
    console.log("Other");
}

Answer:
Three
*/

let n5 = 3;
switch (n5) {
  case 1:
    console.log("One");
    break;
  case 3:
    console.log("Three");
    break;
  default:
    console.log("Other");
}

console.log("\n--- Output Prediction 6 ---");

/*
Question:
let flag = false;
console.log(flag ? "Yes" : "No");

Answer:
No
*/

let flag6 = false;
console.log(flag6 ? "Yes" : "No");

console.log("\n--- Output Prediction 7 ---");

/*
Question:
let a = 0;
if (a) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}

Answer:
Falsy
*/

let a7 = 0;
if (a7) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}

console.log("\n--- Output Prediction 8 ---");

/*
Question:
switch ("B") {
  case "A":
    console.log("Alpha");
  case "B":
    console.log("Bravo");
  case "C":
    console.log("Charlie");
    break;
  default:
    console.log("Default");
}

Answer:
Bravo
Charlie
Because there is no break after case "B".
*/

switch ("B") {
  case "A":
    console.log("Alpha");
  case "B":
    console.log("Bravo");
  case "C":
    console.log("Charlie");
    break;
  default:
    console.log("Default");
}

/*
==================================================
17. 20+ PRACTICE PROBLEMS
==================================================

Try these before checking the answers.

Practice 1:
Write an if statement that prints "Adult" if age is 18 or more.

Practice 2:
Write an if...else that prints "Pass" if marks is 50 or more, otherwise "Fail".

Practice 3:
Use else if to print a grade:
- 90 or more -> A
- 80 to 89 -> B
- 70 to 79 -> C
- below 70 -> D

Practice 4:
Check whether a number is positive, negative, or zero.

Practice 5:
Use a switch statement to print the day name for 1 to 7.

Practice 6:
Write a function that returns "Even" or "Odd".

Practice 7:
Use nested if to check whether a person is eligible for a discount:
- has membership
- age is 60 or above

Practice 8:
Write a ternary operator that prints "Allowed" if user is verified, otherwise "Denied".

Practice 9:
Write a switch statement for fruit names: apple, mango, banana, default.

Practice 10:
Write code to check if a number lies between 10 and 20.

Practice 11:
Write a function using early return to block empty input.

Practice 12:
Create a login check with early return for missing username.

Practice 13:
Write code that checks if a number is divisible by 3 and 5.

Practice 14:
Write a program that prints "Teen" for age 13 to 19.

Practice 15:
Write a switch statement that uses fall-through for grouped cases.

Practice 16:
Write a nested if for checking country and age.

Practice 17:
Use logical operators to verify both conditions are true.

Practice 18:
Use logical OR to approve if either condition is true.

Practice 19:
Write a function that returns "High", "Medium", or "Low" based on value.

Practice 20:
Write code to show default case in switch.

Practice 21:
Write a function that returns "Weekend" for Saturday and Sunday.

Practice 22:
Write a function that checks if an input is truthy or falsy.

Practice 23:
Write code that uses === instead of == and explain why.

Practice 24:
Create a simple calculator using switch for +, -, *, /.
*/

/*
==================================================
18. PRACTICE PROBLEM ANSWERS
==================================================

Answers are written as runnable examples.
*/

console.log("\n--- Practice Answers ---");

// Answer 1
let age1 = 19;
if (age1 >= 18) {
  console.log("Adult");
}

// Answer 2
let marks2 = 48;
if (marks2 >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}

// Answer 3
let gradeMarks3 = 85;
if (gradeMarks3 >= 90) {
  console.log("A");
} else if (gradeMarks3 >= 80) {
  console.log("B");
} else if (gradeMarks3 >= 70) {
  console.log("C");
} else {
  console.log("D");
}

// Answer 4
let number4 = -3;
if (number4 > 0) {
  console.log("Positive");
} else if (number4 < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}

// Answer 5
let dayNumber5 = 6;
switch (dayNumber5) {
  case 1:
    console.log("Sunday");
    break;
  case 2:
    console.log("Monday");
    break;
  case 3:
    console.log("Tuesday");
    break;
  case 4:
    console.log("Wednesday");
    break;
  case 5:
    console.log("Thursday");
    break;
  case 6:
    console.log("Friday");
    break;
  case 7:
    console.log("Saturday");
    break;
  default:
    console.log("Invalid day");
}

// Answer 6
function evenOrOdd(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}
console.log(evenOrOdd(4));
console.log(evenOrOdd(7));

// Answer 7
let hasMembership7 = true;
let age7 = 61;
if (hasMembership7) {
  if (age7 >= 60) {
    console.log("Eligible for discount");
  } else {
    console.log("Membership only");
  }
} else {
  console.log("No membership");
}

// Answer 8
let verified8 = true;
console.log(verified8 ? "Allowed" : "Denied");

// Answer 9
let fruit9 = "mango";
switch (fruit9) {
  case "apple":
    console.log("Apple selected");
    break;
  case "mango":
    console.log("Mango selected");
    break;
  case "banana":
    console.log("Banana selected");
    break;
  default:
    console.log("Unknown fruit");
}

// Answer 10
let num10 = 15;
if (num10 >= 10 && num10 <= 20) {
  console.log("Inside range");
} else {
  console.log("Outside range");
}

// Answer 11
function showValue(value) {
  if (!value) return "Empty";
  return "Value exists";
}
console.log(showValue(""));
console.log(showValue("Hello"));

// Answer 12
function loginCheck(username) {
  if (!username) return "Username required";
  return "Login successful";
}
console.log(loginCheck(""));
console.log(loginCheck("Hasan"));

// Answer 13
let num13 = 15;
if (num13 % 3 === 0 && num13 % 5 === 0) {
  console.log("Divisible by 3 and 5");
} else {
  console.log("Not divisible by both");
}

// Answer 14
let age14 = 17;
if (age14 >= 13 && age14 <= 19) {
  console.log("Teen");
}

// Answer 15
let letter15 = "B";
switch (letter15) {
  case "A":
  case "B":
  case "C":
    console.log("Top group");
    break;
  default:
    console.log("Other group");
}

// Answer 16
let country16 = "Bangladesh";
let age16 = 20;
if (country16 === "Bangladesh") {
  if (age16 >= 18) {
    console.log("Eligible in Bangladesh");
  } else {
    console.log("Not old enough");
  }
}

// Answer 17
let condition17A = true;
let condition17B = true;
if (condition17A && condition17B) {
  console.log("Both true");
}

// Answer 18
let condition18A = false;
let condition18B = true;
if (condition18A || condition18B) {
  console.log("At least one true");
}

// Answer 19
function level19(value) {
  if (value >= 80) return "High";
  if (value >= 50) return "Medium";
  return "Low";
}
console.log(level19(90));
console.log(level19(60));
console.log(level19(20));

// Answer 20
let color20 = "purple";
switch (color20) {
  case "red":
    console.log("Red");
    break;
  default:
    console.log("Default case ran");
}

// Answer 21
function weekend21(dayName) {
  if (dayName === "Saturday" || dayName === "Sunday") {
    return "Weekend";
  }
  return "Weekday";
}
console.log(weekend21("Saturday"));
console.log(weekend21("Monday"));

// Answer 22
function truthyCheck22(input) {
  return input ? "Truthy" : "Falsy";
}
console.log(truthyCheck22(0));
console.log(truthyCheck22(5));

// Answer 23
let compare23 = "10";
if (compare23 === 10) {
  console.log("Equal");
} else {
  console.log("Not strictly equal");
}

// Answer 24
function calculator24(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Cannot divide by zero";
    default:
      return "Invalid operator";
  }
}
console.log(calculator24(10, 5, "+"));
console.log(calculator24(10, 5, "-"));
console.log(calculator24(10, 5, "*"));
console.log(calculator24(10, 0, "/"));

/*
==================================================
19. 20+ VIVA QUESTIONS WITH DETAILED ANSWERS
==================================================

1. What is control flow in JavaScript?
Answer:
Control flow is the order in which statements execute. It decides which path the program takes based on conditions.

2. What is the difference between if and if...else?
Answer:
if runs code only when a condition is true. if...else gives two paths, one for true and one for false.

3. What is else if used for?
Answer:
else if is used when there are multiple conditions to check one after another. Only the first true condition runs.

4. What is nested if?
Answer:
A nested if is an if statement inside another if. It is used when one condition depends on another condition being true.

5. What is the difference between == and ===?
Answer:
== checks equality with type conversion. === checks both value and type, without type conversion.

6. What is the difference between != and !==?
Answer:
!= compares values with type conversion. !== compares both value and type strictly.

7. What are falsy values in JavaScript?
Answer:
Falsy values are values that behave like false in condition checks. Common falsy values include false, 0, "", null, undefined, NaN, and 0n.

8. What is a truthy value?
Answer:
Any value that is not falsy is truthy. For example, "hello", 1, [], and {} are truthy.

9. What does the && operator do?
Answer:
It returns true only when both conditions are true. It is used when all required conditions must be satisfied.

10. What does the || operator do?
Answer:
It returns true when at least one condition is true. It is used when any one of multiple conditions is enough.

11. What does the ! operator do?
Answer:
It reverses the boolean meaning of a value. true becomes false and false becomes true.

12. When should we use switch?
Answer:
Use switch when one expression is compared against many fixed values. It is clean for menu choices, days, modes, and similar cases.

13. What is break in switch?
Answer:
break stops the switch from continuing to later cases after a match is found.

14. What is default in switch?
Answer:
default runs when no case matches. It acts like a fallback path.

15. What is fall-through in switch?
Answer:
Fall-through happens when a case has no break, so execution continues into the next case.

16. When is switch better than if...else?
Answer:
switch is usually better when comparing one variable to exact values. if...else is better for ranges and complex logic.

17. When is if...else better than switch?
Answer:
if...else is better when conditions involve ranges, comparisons, or combinations of logical operators.

18. What is early return?
Answer:
Early return means exiting a function as soon as a condition is met. It makes code shorter and easier to read.

19. Why is early return useful?
Answer:
It reduces nesting, makes edge cases easier to handle, and improves readability.

20. What is a ternary operator?
Answer:
It is a short version of if...else. The syntax is condition ? value1 : value2.

21. Why should we avoid using == in many cases?
Answer:
Because == can convert types automatically, which may create unexpected results. === is safer and clearer in most situations.

22. Why are braces recommended even for one-line if statements?
Answer:
Braces make the code easier to read and reduce bugs when more lines are added later.

23. Can switch handle ranges easily?
Answer:
Not naturally. switch is designed for exact matches, so ranges are usually better with if...else.

24. What is a common mistake in switch?
Answer:
Forgetting break. This causes accidental fall-through and may run the wrong cases.

25. Why is control flow important?
Answer:
Because real programs need decisions. Without control flow, every statement would run the same way, which is not enough for dynamic behavior.
*/

/*
==================================================
20. THINGS TO REMEMBER
==================================================

- if is for single conditions
- if...else is for two-way decisions
- else if is for multiple branches
- nested if is for dependent conditions
- switch is for exact matches
- break stops switch execution
- default is the fallback case
- fall-through happens when break is missing
- early return reduces nesting
- ternary operator is for simple decisions
- === is usually safer than ==
- Truthy and falsy values affect condition checks
- Use braces for clarity
- Use the right tool for the job
*/

console.log("\n====================================");
console.log("CONTROL FLOW PRACTICE FILE ENDED");
console.log("====================================");
