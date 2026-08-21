/*
===============================================================================
                    OBJECT-ORIENTED JAVASCRIPT (OOP)
===============================================================================
JavaScript is NOT a classical OOP language like Java or C++.

It uses PROTOTYPES under the hood, even when you use the `class` keyword.

`class` is just "syntactic sugar" over the old prototype system --
it does not change how JavaScript actually works internally.
===============================================================================
*/


/*
===============================================================================
1. CONSTRUCTOR FUNCTIONS
===============================================================================

Before ES6 classes existed, objects were created using
regular functions called "constructor functions".

Convention: Capitalize the first letter (e.g. Person, not person).
===============================================================================
*/

function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype (shared by ALL instances)
Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const p1 = new Person("Hasan", 25);
const p2 = new Person("Maha", 22);

p1.greet(); // Hi, I'm Hasan
p2.greet(); // Hi, I'm Maha

/*
Why put greet() on the prototype instead of inside the function?

If greet() was defined INSIDE Person, every single instance
would get its OWN copy of that function in memory.

By putting it on Person.prototype, all instances SHARE
the same function -- much more memory efficient.
*/



/*
===============================================================================
2. THE `new` KEYWORD -- WHAT IT ACTUALLY DOES
===============================================================================

When you call a function with `new`, 4 things happen behind the scenes:

1. A brand new empty object is created: {}
2. That new object's internal [[Prototype]] is set to
   the constructor function's .prototype
3. The constructor function runs, with "this" bound to the new object
4. If the constructor doesn't explicitly return an object,
   the new object is returned automatically
===============================================================================
*/

function Car(brand) {
  // Step 1 (implicit): const this = {}
  // Step 2 (implicit): this.__proto__ = Car.prototype

  this.brand = brand; // Step 3

  // Step 4 (implicit): return this
}

const myCar = new Car("Toyota");
console.log(myCar.brand); // Toyota

/*
What if you FORGET the `new` keyword?
*/

const brokenCar = Car("Honda");

console.log(brokenCar); // undefined
// "this" inside Car() was NOT a new object.
// In non-strict mode, "this" fell back to the global object (window).
// In strict mode, "this" would be undefined and this would THROW an error.

/*
This is exactly WHY ES6 classes were introduced --
classes throw an error if you forget `new`, constructor functions do not.
*/



/*
===============================================================================
3. ES6 CLASSES
===============================================================================

Classes are the modern, cleaner way to write the SAME
constructor-function + prototype pattern.

They are NOT a new object model.
They compile down to constructor functions + prototypes internally.
===============================================================================
*/

class Animal {
  // constructor -> runs automatically when you do `new Animal(...)`
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  // Methods written here are automatically added to Animal.prototype
  // (NOT copied onto every instance)
  makeSound() {
    console.log(`${this.name} says ${this.sound}`);
  }
}

const dog = new Animal("Dog", "Woof");
dog.makeSound(); // Dog says Woof

/*
Proof that class methods live on the prototype, not the instance:
*/

console.log(dog.hasOwnProperty("makeSound")); // false
console.log(Animal.prototype.hasOwnProperty("makeSound")); // true

/*
Proof that classes REQUIRE `new`:

Animal("Cat", "Meow");

Error:
Uncaught TypeError: Class constructor Animal cannot be invoked without 'new'
*/



/*
===============================================================================
4. extends AND super
===============================================================================

extends -> sets up inheritance between classes
super   -> calls the PARENT class's constructor or methods
===============================================================================
*/

class Dog extends Animal {
  constructor(name, breed) {
    // super() MUST be called before using "this" in a subclass
    super(name, "Woof"); // calls Animal's constructor
    this.breed = breed;
  }

  makeSound() {
    super.makeSound(); // calls Animal's makeSound()
    console.log(`${this.name} is a ${this.breed}`);
  }
}

const husky = new Dog("Rex", "Husky");
husky.makeSound();
// Rex says Woof
// Rex is a Husky

/*
Rule:

If a subclass has a constructor, it MUST call super()
before it can use "this".

const husky = new Dog("Rex", "Husky") without calling super():

Error:
Uncaught ReferenceError:
Must call super constructor in derived class
before accessing 'this' or returning from derived constructor
*/



/*
===============================================================================
5. PROTOTYPAL INHERITANCE vs CLASSICAL INHERITANCE
===============================================================================
*/

/*
Classical Inheritance (Java, C++, etc.)
-----------------------------------------
- Classes are BLUEPRINTS.
- Objects are INSTANCES built from a fixed class definition.
- Inheritance is defined at compile time and is rigid.

Prototypal Inheritance (JavaScript)
-------------------------------------
- There are no real "classes" internally -- only OBJECTS.
- Every object has a hidden link to another object: [[Prototype]]
- When you access a property, JS looks:
    1. On the object itself
    2. If not found, walks UP the prototype chain
    3. Continues until it hits `null` (end of the chain)
- This chain lookup is called the "Prototype Chain".
*/

console.log(husky.__proto__ === Dog.prototype);          // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of chain)

/*
So husky.makeSound() actually works like this:

1. JS checks: does husky itself have makeSound()? No.
2. JS checks: does Dog.prototype have makeSound()? Yes -> uses it.

If Dog didn't override makeSound(), JS would keep walking up:

3. Does Animal.prototype have makeSound()? Yes -> uses it.

This walking-up process IS prototypal inheritance.
`class` and `extends` just make this chain easier to set up.
*/



/*
===============================================================================
6. ENCAPSULATION -- PRIVATE FIELDS (#)
===============================================================================

Before ES2022, JavaScript had NO real private properties.
Convention was to prefix with an underscore (_balance),
but this was just a NAMING convention -- still fully public/accessible.

Now, the `#` symbol creates TRUE private fields.
===============================================================================
*/

class BankAccount {
  #balance; // private field declaration (must be declared, not just assigned)

  constructor(owner, startingBalance) {
    this.owner = owner; // public
    this.#balance = startingBalance; // private
  }

  // Public method to safely access private data
  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit must be positive");
      return;
    }
    this.#balance += amount;
  }

  // Private METHODS are also possible using #
  #logTransaction(type, amount) {
    console.log(`[LOG] ${type}: ${amount}`);
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient funds");
      return;
    }
    this.#balance -= amount;
    this.#logTransaction("withdraw", amount); // private method, called internally
  }
}

const account = new BankAccount("Nabila", 1000);

account.deposit(500);
account.withdraw(200);

console.log(account.getBalance()); // 1300
console.log(account.owner); // Nabila (public, accessible)

/*
console.log(account.#balance);

Error:
Uncaught SyntaxError: Private field '#balance' must be
declared in an enclosing class
*/

/*
Key points about # private fields:

- Only accessible INSIDE the class body.
- NOT accessible from outside, NOT even via account["#balance"].
- Subclasses cannot directly access a parent's # fields either.
- This is TRUE encapsulation, unlike the old "_balance" convention
  which was only a polite suggestion, not real protection.
*/



/*
===============================================================================
7. STATIC MEMBERS (Bonus -- commonly confused with instance members)
===============================================================================

`static` properties/methods belong to the CLASS itself,
not to any individual instance.
===============================================================================
*/

class MathHelper {
  static PI = 3.14159;

  static square(n) {
    return n * n;
  }
}

console.log(MathHelper.PI); // 3.14159
console.log(MathHelper.square(4)); // 16

const helper = new MathHelper();
// console.log(helper.square(4));
// Error: helper.square is not a function
// static methods are NOT available on instances.



/*
===============================================================================
CONFUSION #1: CLASS SYNTAX vs FUNCTION PROTOTYPE CHAIN
===============================================================================

These two pieces of code do BASICALLY THE SAME THING internally:
*/

// Old way (constructor function)
function PersonOld(name) {
  this.name = name;
}
PersonOld.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

// New way (class)
class PersonNew {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

console.log(typeof PersonOld); // function
console.log(typeof PersonNew); // function  <-- classes ARE functions under the hood!

/*
So what's ACTUALLY different?

1. `class` forces you to use `new`.
   (Forgetting `new` on PersonOld silently breaks; on PersonNew it THROWS.)

2. Code inside a class body automatically runs in STRICT MODE.

3. Class methods are NON-enumerable by default
   (they don't show up in a for...in loop or Object.keys()).
   Prototype methods added manually with function.prototype.x = ...
   ARE enumerable by default, unless you configure them otherwise.

4. Classes are NOT HOISTED the same way functions are.
   Function declarations are fully hoisted (usable before definition).
   Classes are hoisted but stay in the Temporal Dead Zone (TDZ),
   just like `let` and `const`. You cannot use a class before
   its definition line runs.

5. `class` bodies cannot be called without `new` (see point 1),
   but constructor functions CAN be called like a normal function
   (this is often a source of bugs).

Bottom line:
`class` is syntactic sugar -- it looks different, adds safety rails,
but under the hood it is STILL building the same prototype chain.
*/



/*
===============================================================================
CONFUSION #2: SHARED vs OWN PROPERTIES
===============================================================================

"Own" property    -> lives directly ON the instance itself
"Shared" property -> lives on the prototype, shared by ALL instances
===============================================================================
*/

class Widget {
  constructor(id) {
    this.id = id; // OWN property -- unique to each instance
  }

  render() {
    // this method is SHARED -- lives once on Widget.prototype
    console.log(`Rendering widget ${this.id}`);
  }
}

const w1 = new Widget(1);
const w2 = new Widget(2);

console.log(w1.hasOwnProperty("id"));     // true  -> own property
console.log(w1.hasOwnProperty("render")); // false -> NOT own, it's shared

console.log(w1.render === w2.render); // true
// Both instances point to the EXACT SAME function in memory.

/*
Why this matters (common bug source):

If you accidentally define a method INSIDE the constructor
instead of on the class body / prototype, EVERY instance gets
its OWN separate copy -- wasting memory and breaking the
"shared behavior" idea of OOP.
*/

class BadWidget {
  constructor(id) {
    this.id = id;

    // BAD: this creates a NEW function for every single instance
    this.render = function () {
      console.log(`Rendering widget ${this.id}`);
    };
  }
}

const bw1 = new BadWidget(1);
const bw2 = new BadWidget(2);

console.log(bw1.render === bw2.render); // false -- two different functions in memory!

/*
Rule of thumb:

- Data that DIFFERS per instance (id, name, balance) -> assign with `this.x` in constructor -> OWN property
- Behavior that is the SAME for all instances (methods) -> define in class body -> SHARED via prototype
*/



/*
===============================================================================
BONUS: THINGS OFTEN LEFT OUT OF OOP NOTES
===============================================================================
*/

// A) Object.create() -- manual prototypal inheritance without classes

const animalProto = {
  speak() {
    console.log(`${this.name} makes a noise.`);
  },
};

const cat = Object.create(animalProto);
cat.name = "Whiskers";
cat.speak(); // Whiskers makes a noise.

/*
Object.create(proto) creates a brand new object whose [[Prototype]]
is set directly to `proto`. This is the RAW mechanism that
`class` and constructor functions are built on top of.
*/


// B) instanceof -- checking the prototype chain

console.log(husky instanceof Dog);    // true
console.log(husky instanceof Animal); // true (Dog inherits from Animal)
console.log(husky instanceof Object); // true (everything inherits from Object)

/*
instanceof checks whether Constructor.prototype
appears ANYWHERE in the object's prototype chain.
*/


// C) Getters and Setters -- controlled access to properties

class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this.#celsius = ((value - 32) * 5) / 9;
  }
}

const temp = new Temperature(25);
console.log(temp.fahrenheit); // 77 (called like a property, not a function!)

temp.fahrenheit = 100;
console.log(temp.fahrenheit); // 100

/*
Getters/setters let you run logic behind the scenes
while still using normal property syntax (no parentheses).
This is another piece of true encapsulation, alongside # fields.
*/


// D) Method Overriding vs Method Overloading

/*
JavaScript supports OVERRIDING (subclass replaces a parent method,
as seen with Dog.makeSound() above).

JavaScript does NOT support true OVERLOADING
(you cannot define the same method name twice with
different parameter types/counts like in Java/C++).
The LAST definition simply wins -- there's no automatic
dispatch based on argument signature.
*/

class Example {
  greet() {
    console.log("Hello");
  }
  // greet(name) { console.log(`Hello ${name}`); }
  // ^ this would OVERWRITE the greet() above, not overload it.
}


// E) Abstract-class-like pattern (JS has no real "abstract" keyword)

class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Shape is abstract and cannot be instantiated directly");
    }
  }
  area() {
    throw new Error("area() must be implemented by subclass");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}

// const s = new Shape(); // throws -- "Shape is abstract..."
const circle = new Circle(5);
console.log(circle.area().toFixed(2)); // 78.54

/*
JavaScript has no built-in `abstract` keyword like Java.
This pattern (checking this.constructor inside the base constructor)
is a common workaround to simulate abstract classes.
*/



/*
===============================================================================
IMPORTANT QUESTIONS
===============================================================================
*/


// 1. Is JavaScript truly object-oriented like Java?

/*
Answer:

No. JavaScript uses PROTOTYPAL inheritance, not CLASSICAL inheritance.
`class` syntax (ES6) is syntactic sugar over the existing
prototype system -- it does NOT turn JS into a classical OOP language.

Interview Tip:
"JavaScript is prototype-based. Classes are just a cleaner syntax
over constructor functions and the prototype chain."
*/


// 2. What actually happens when you use the `new` keyword?

/*
Answer:

1. A new empty object is created.
2. Its internal [[Prototype]] is linked to the constructor's .prototype.
3. The constructor function runs with "this" bound to the new object.
4. The new object is returned automatically (unless the constructor
   explicitly returns a different object).
*/


// 3. What's the difference between an object's OWN property and a SHARED (inherited) property?

/*
Answer:

Own property -> exists directly on the instance (e.g. this.name = name)
Shared property -> exists on the prototype and is accessed via
the prototype chain (e.g. class methods)

hasOwnProperty() can be used to check the difference.
*/


// 4. Are # private fields REALLY private, or just a naming convention like _balance?

/*
Answer:

They are REALLY private -- enforced by the JS engine itself,
not just a developer convention.

_balance -> still fully accessible from outside (just "please don't touch" by convention)
#balance -> a SyntaxError is thrown if accessed outside the class body
*/


// 5. Why does forgetting `new` behave differently for functions vs classes?

/*
Answer:

Constructor functions can be called like normal functions.
If you forget `new`, "this" does NOT point to a new object --
it silently falls back to the global object (or undefined in strict mode),
often causing bugs.

Classes are protected: calling a class WITHOUT `new` throws a
TypeError immediately. This was a deliberate safety improvement in ES6.
*/



/*
===============================================================================
SUMMARY
===============================================================================

Constructor Functions
----------------------
✓ Regular functions used with `new` to create objects
✓ Shared methods go on Function.prototype
✓ Forgetting `new` silently breaks "this"

new Keyword (4 steps)
-----------------------
1. Create new empty object
2. Link its [[Prototype]] to Constructor.prototype
3. Run constructor with "this" = new object
4. Return the new object automatically

ES6 Classes
------------
✓ Syntactic sugar over constructor functions + prototypes
✓ constructor() runs on instantiation
✓ Methods auto-added to the prototype (shared, non-enumerable)
✓ extends -> inheritance, super() -> call parent constructor/methods
✓ Must call super() before using "this" in a subclass
✓ Classes are hoisted but live in the TDZ (like let/const)
✓ Calling a class without `new` throws a TypeError

Prototypal vs Classical Inheritance
--------------------------------------
✓ JS objects link to other objects via [[Prototype]] (prototype chain)
✓ Property lookup walks UP the chain until found or hits null
✓ No real "blueprints" -- just objects linked to other objects
✓ Object.create(proto) is the raw mechanism behind it all

Encapsulation (#)
-------------------
✓ TRUE private fields/methods, enforced by the engine
✓ Only accessible inside the class body
✓ Different from the old _underscore naming convention (not enforced)
✓ Getters/setters give controlled access to private data

Common Confusions Solved
---------------------------
✓ class vs prototype -> class is sugar, same chain underneath
✓ own vs shared properties -> instance data is own, methods are shared
✓ Defining methods inside the constructor = BAD (creates duplicate
  functions per instance instead of one shared function)

Extra Concepts Worth Knowing
--------------------------------
✓ Object.create() -- manual prototype linking without class/new
✓ instanceof -- checks the prototype chain
✓ static members -- belong to the class, not instances
✓ getters/setters -- property-like syntax with logic behind it
✓ JS has no true method overloading (last definition wins)
✓ JS has no built-in `abstract` keyword (must simulate it manually)
===============================================================================
*/
