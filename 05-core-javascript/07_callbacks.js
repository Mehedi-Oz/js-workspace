/*
===============================================================================
                    CALLBACKS & CALLBACK HELL
===============================================================================
A callback is simply a FUNCTION passed as an argument to another function,
to be executed LATER (either immediately after, or asynchronously).
===============================================================================
*/


/*
===============================================================================
1. BASIC CALLBACK (Synchronous)
===============================================================================
*/

function greet(name, callback) {
  console.log(`Hi, ${name}`);
  callback();
}

greet("Hasan", function () {
  console.log("Callback executed!");
});

// Hi, Hasan
// Callback executed!



/*
===============================================================================
2. ASYNCHRONOUS CALLBACK (the real use case)
===============================================================================

Most callbacks matter because JavaScript is single-threaded,
but many operations (timers, file reads, API calls) take time.

Instead of BLOCKING the program while waiting,
JS runs the operation in the background and calls
the callback ONCE it's done.
===============================================================================
*/

console.log("1. Start");

setTimeout(function () {
  console.log("2. This runs after 2 seconds");
}, 2000);

console.log("3. End");

/*
Output order:

1. Start
3. End
2. This runs after 2 seconds

Even though "2. This runs after 2 seconds" is written in the middle
of the code, it runs LAST -- because setTimeout is asynchronous.
JS does not wait; it moves on and runs the callback later.
*/



/*
===============================================================================
3. SIMULATING A REAL ASYNC TASK (e.g. fetching data)
===============================================================================
*/

function getUser(id, callback) {
  console.log("Fetching user...");

  setTimeout(() => {
    const user = { id, name: "Maha" };
    callback(user); // pass the result INTO the callback
  }, 1000);
}

getUser(1, function (user) {
  console.log("User received:", user);
});

// Fetching user...
// (1 second later)
// User received: { id: 1, name: 'Maha' }



/*
===============================================================================
4. ERROR-FIRST CALLBACKS (Node.js convention)
===============================================================================

By convention, many callbacks take ERROR as the FIRST argument.
If something goes wrong, err will be truthy.
If everything is fine, err is null.
===============================================================================
*/

function getUserSafe(id, callback) {
  setTimeout(() => {
    if (!id) {
      callback(new Error("User id is required"), null);
      return;
    }
    callback(null, { id, name: "Nabila" });
  }, 500);
}

getUserSafe(2, (err, user) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("User:", user);
});

getUserSafe(null, (err, user) => {
  if (err) {
    console.log("Error:", err.message); // Error: User id is required
    return;
  }
  console.log("User:", user);
});



/*
===============================================================================
5. CALLBACK HELL ("Pyramid of Doom")
===============================================================================

Callback Hell happens when you need several ASYNC steps
to run ONE AFTER ANOTHER, and each step depends on the
result of the previous one.

Nesting callback inside callback inside callback creates
a pyramid shape that is hard to read and hard to maintain.
===============================================================================
*/

function getUserId(username, callback) {
  setTimeout(() => {
    console.log(`Got ID for ${username}`);
    callback(101);
  }, 500);
}

function getUserPosts(userId, callback) {
  setTimeout(() => {
    console.log(`Got posts for user ${userId}`);
    callback(["Post 1", "Post 2"]);
  }, 500);
}

function getPostComments(post, callback) {
  setTimeout(() => {
    console.log(`Got comments for ${post}`);
    callback(["Nice post!", "Great read!"]);
  }, 500);
}

// THIS is callback hell:

getUserId("hasan", function (userId) {
  getUserPosts(userId, function (posts) {
    getPostComments(posts[0], function (comments) {
      console.log("Final comments:", comments);
      // Notice how far right the code has drifted.
      // Every new async step adds another level of nesting.
    });
  });
});

/*
Problems with callback hell:

1. Hard to READ -- deeply nested code, drifting to the right
2. Hard to DEBUG -- errors must be handled at EVERY level manually
3. Hard to MAINTAIN -- adding/removing a step means restructuring
   the whole pyramid
4. Error handling gets repetitive (error-first callback at every level)
5. Hard to reason about EXECUTION ORDER at a glance
*/



/*
===============================================================================
6. A GLIMPSE OF THE FIX (Promises, briefly)
===============================================================================

Promises (and later async/await) were introduced specifically
to solve callback hell, by letting async steps be CHAINED
instead of NESTED.
===============================================================================
*/

function getUserIdPromise(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got ID for ${username}`);
      resolve(101);
    }, 500);
  });
}

function getUserPostsPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got posts for user ${userId}`);
      resolve(["Post 1", "Post 2"]);
    }, 500);
  });
}

// Same task as before, but FLAT instead of nested:

getUserIdPromise("hasan")
  .then((userId) => getUserPostsPromise(userId))
  .then((posts) => console.log("Posts:", posts))
  .catch((err) => console.log("Error:", err));

/*
Notice:

- No nesting, just chained .then() calls
- Single .catch() handles errors from ANY step in the chain
- Reads top-to-bottom, in the actual order things happen

Promises and async/await are their own topic --
this is just here to show WHY callback hell matters,
and what problem the next tools were built to solve.
*/
