/*
===============================================================================
                            ASYNC / AWAIT
===============================================================================
async/await is SYNTACTIC SUGAR over Promises.

It lets you write asynchronous code that LOOKS synchronous --
no .then() chains, no nesting.

Under the hood, it's still Promises doing all the work.
===============================================================================
*/


/*
===============================================================================
1. THE `async` KEYWORD
===============================================================================

Putting `async` before a function means:
- The function ALWAYS returns a Promise
- Even if you `return` a plain value, it gets wrapped in a Promise
===============================================================================
*/

async function sayHi() {
  return "Hi!";
}

console.log(sayHi()); // Promise { 'Hi!' }

sayHi().then((result) => console.log(result)); // Hi!

/*
This is identical to writing:

function sayHi() {
  return Promise.resolve("Hi!");
}
*/



/*
===============================================================================
2. THE `await` KEYWORD
===============================================================================

`await` can ONLY be used INSIDE an async function.

It PAUSES the function's execution until the Promise
settles, then:
- returns the resolved value (on success)
- throws the error (on rejection) -- catchable with try/catch
===============================================================================
*/

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "Maha" });
    }, 1000);
  });
}

async function showUser() {
  console.log("Fetching...");
  const user = await getUser(1); // pauses here until resolved
  console.log("User:", user);
}

showUser();

// Fetching...
// (1 second later)
// User: { id: 1, name: 'Maha' }



/*
===============================================================================
3. ERROR HANDLING WITH try/catch
===============================================================================

Since a rejected promise THROWS when awaited,
you handle errors with normal try/catch -- no .catch() needed.
===============================================================================
*/

function getUserSafe(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject(new Error("User id is required"));
        return;
      }
      resolve({ id, name: "Nabila" });
    }, 500);
  });
}

async function showUserSafe(id) {
  try {
    const user = await getUserSafe(id);
    console.log("User:", user);
  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    console.log("Request finished");
  }
}

showUserSafe(2);    // User: { id: 2, name: 'Nabila' }
showUserSafe(null); // Error: User id is required



/*
===============================================================================
4. REWRITING PROMISE CHAINS WITH async/await
===============================================================================
*/

function getUserId(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got ID for ${username}`);
      resolve(101);
    }, 500);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got posts for user ${userId}`);
      resolve(["Post 1", "Post 2"]);
    }, 500);
  });
}

function getPostComments(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got comments for ${post}`);
      resolve(["Nice post!", "Great read!"]);
    }, 500);
  });
}

// Promise chain version:
//
// getUserId("hasan")
//   .then((userId) => getUserPosts(userId))
//   .then((posts) => getPostComments(posts[0]))
//   .then((comments) => console.log("Final comments:", comments))
//   .catch((err) => console.log("Error:", err.message));

// async/await version (reads top to bottom, like sync code):

async function loadComments() {
  try {
    const userId = await getUserId("hasan");
    const posts = await getUserPosts(userId);
    const comments = await getPostComments(posts[0]);
    console.log("Final comments:", comments);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

loadComments();



/*
===============================================================================
5. SEQUENTIAL vs PARALLEL await (common performance mistake)
===============================================================================
*/

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// SEQUENTIAL -- BAD if the tasks don't depend on each other
// Each await BLOCKS the next line until it finishes.
async function sequential() {
  console.time("sequential");
  const a = await delay("A", 300); // waits 300ms
  const b = await delay("B", 300); // THEN waits another 300ms
  console.log(a, b);
  console.timeEnd("sequential"); // ~600ms total
}

// PARALLEL -- GOOD when tasks are independent
// Start both promises FIRST, then await them together.
async function parallel() {
  console.time("parallel");
  const promiseA = delay("A", 300); // starts immediately
  const promiseB = delay("B", 300); // starts immediately too
  const [a, b] = await Promise.all([promiseA, promiseB]);
  console.log(a, b);
  console.timeEnd("parallel"); // ~300ms total (both ran at the same time)
}

sequential();
parallel();

/*
Rule of thumb:

If task B does NOT depend on task A's result,
don't await them one after another -- run them in PARALLEL
with Promise.all() to save time.
*/



/*
===============================================================================
6. await INSIDE LOOPS
===============================================================================
*/

const ids = [1, 2, 3];

// Sequential loop -- each iteration waits for the previous one
async function fetchSequentially() {
  for (const id of ids) {
    const user = await getUser(id);
    console.log("Fetched:", user);
  }
}

// Parallel loop -- all requests fire at once, then wait together
async function fetchInParallel() {
  const promises = ids.map((id) => getUser(id));
  const users = await Promise.all(promises);
  console.log("All fetched:", users);
}



/*
===============================================================================
7. TOP-LEVEL await (modern JS modules)
===============================================================================

In ES modules, `await` can be used OUTSIDE an async function,
directly at the top level of the file.

(Only works in module files, e.g. type="module" or .mjs)
===============================================================================
*/

// const user = await getUser(1);
// console.log(user);

/*
Outside of modules (like a normal script or Node CommonJS file),
top-level await is NOT allowed -- you still need an async
wrapper function like the examples above.
*/
