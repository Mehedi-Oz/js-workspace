/*
===============================================================================
                              PROMISES
===============================================================================
A Promise is an OBJECT that represents a value that isn't
available YET, but will be at some point (or will fail).

It has 3 possible states:

1. pending   -> initial state, neither fulfilled nor rejected
2. fulfilled -> the operation completed successfully
3. rejected  -> the operation failed

Once a promise is fulfilled or rejected, it is SETTLED --
it can never change state again.
===============================================================================
*/


/*
===============================================================================
1. CREATING A PROMISE
===============================================================================

new Promise(executor)

executor -> a function that runs IMMEDIATELY, with two params:
  - resolve(value) -> call this when the task succeeds
  - reject(error)  -> call this when the task fails
===============================================================================
*/

const myPromise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("Task completed!");
    } else {
      reject(new Error("Task failed!"));
    }
  }, 1000);
});

console.log(myPromise); // Promise { <pending> }  (immediately, before settling)



/*
===============================================================================
2. CONSUMING A PROMISE: .then() / .catch() / .finally()
===============================================================================

.then(onFulfilled, onRejected) -> runs when the promise resolves
.catch(onRejected)             -> runs when the promise rejects
.finally(callback)             -> runs regardless of outcome
===============================================================================
*/

myPromise
  .then((result) => {
    console.log("Success:", result); // Success: Task completed!
  })
  .catch((error) => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    console.log("Done (success or fail)");
  });



/*
===============================================================================
3. A REALISTIC EXAMPLE
===============================================================================
*/

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject(new Error("User id is required"));
        return;
      }
      resolve({ id, name: "Maha" });
    }, 500);
  });
}

getUser(1)
  .then((user) => console.log("User:", user))
  .catch((err) => console.log("Error:", err.message));

getUser(null)
  .then((user) => console.log("User:", user))
  .catch((err) => console.log("Error:", err.message)); // Error: User id is required



/*
===============================================================================
4. CHAINING PROMISES (fixing callback hell)
===============================================================================

Each .then() returns a NEW promise, so you can chain
them one after another WITHOUT nesting.
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

getUserId("hasan")
  .then((userId) => getUserPosts(userId))
  .then((posts) => getPostComments(posts[0]))
  .then((comments) => console.log("Final comments:", comments))
  .catch((err) => console.log("Something went wrong:", err.message));

/*
Compare this to the nested callback version:

- FLAT instead of nested (no pyramid)
- ONE .catch() handles errors from ANY step in the chain
- Reads top-to-bottom in the actual order things happen
*/



/*
===============================================================================
5. RETURNING VALUES vs RETURNING PROMISES IN .then()
===============================================================================

Whatever you RETURN inside a .then() becomes the value
passed into the NEXT .then().

- Return a plain value -> next .then() gets that value immediately
- Return a Promise      -> next .then() WAITS for it to resolve
===============================================================================
*/

Promise.resolve(5)
  .then((num) => num * 2) // returns a plain value
  .then((num) => console.log("Result:", num)); // Result: 10

Promise.resolve(5)
  .then((num) => new Promise((resolve) => {
    setTimeout(() => resolve(num * 2), 300);
  })) // returns a PROMISE
  .then((num) => console.log("Result (delayed):", num)); // Result (delayed): 10


/*
===============================================================================
6. ERROR HANDLING & PROPAGATION
===============================================================================

If ANY .then() in a chain throws an error or returns a
rejected promise, execution SKIPS straight to the nearest
.catch() -- all the .then() calls in between are skipped.
===============================================================================
*/

Promise.resolve()
  .then(() => {
    throw new Error("Something broke in step 1");
  })
  .then(() => {
    console.log("This never runs");
  })
  .then(() => {
    console.log("This never runs either");
  })
  .catch((err) => {
    console.log("Caught:", err.message); // Caught: Something broke in step 1
  });



/*
===============================================================================
7. Promise.all() -- run in PARALLEL, wait for ALL
===============================================================================

Takes an array of promises.
Resolves when ALL of them resolve (returns an array of results).
Rejects IMMEDIATELY if ANY one of them rejects.
===============================================================================
*/

const p1 = new Promise((resolve) => setTimeout(() => resolve("A"), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve("B"), 100));
const p3 = new Promise((resolve) => setTimeout(() => resolve("C"), 200));

Promise.all([p1, p2, p3]).then((results) => {
  console.log(results); // ["A", "B", "C"]  (order matches input, not finish time)
});

/*
Total time taken ≈ 300ms (the SLOWEST one),
because they all run at the same time, not one after another.
*/



/*
===============================================================================
8. Promise.race() -- resolves/rejects with the FIRST to settle
===============================================================================
*/

const fast = new Promise((resolve) => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise((resolve) => setTimeout(() => resolve("Slow!"), 500));

Promise.race([fast, slow]).then((result) => {
  console.log(result); // "Fast!"  (whichever settles first, wins)
});



/*
===============================================================================
9. Promise.allSettled() -- wait for ALL, regardless of success/failure
===============================================================================

Unlike Promise.all(), this does NOT short-circuit on rejection.
It waits for every promise and reports each outcome individually.
===============================================================================
*/

const okPromise = Promise.resolve("Worked!");
const badPromise = Promise.reject(new Error("Failed!"));

Promise.allSettled([okPromise, badPromise]).then((results) => {
  console.log(results);
  /*
  [
    { status: "fulfilled", value: "Worked!" },
    { status: "rejected", reason: Error: Failed! }
  ]
  */
});



/*
===============================================================================
10. Promise.any() -- resolves with the FIRST successful one
===============================================================================

Ignores rejections, UNLESS every single promise rejects
(then it throws an AggregateError).
===============================================================================
*/

const fail1 = Promise.reject(new Error("fail1"));
const fail2 = Promise.reject(new Error("fail2"));
const success = new Promise((resolve) => setTimeout(() => resolve("Success!"), 100));

Promise.any([fail1, fail2, success]).then((result) => {
  console.log(result); // "Success!" (ignores the two failures)
});
