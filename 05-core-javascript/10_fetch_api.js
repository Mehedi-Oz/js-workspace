/*
===============================================================================
                              FETCH API
===============================================================================
fetch() is the modern, built-in way to make HTTP requests in
the browser (and Node 18+).

It is PROMISE-based, so it works naturally with .then()
or async/await.

Basic syntax:

fetch(url, options)
  -> returns a Promise that resolves to a Response object
===============================================================================
*/


/*
===============================================================================
1. BASIC GET REQUEST
===============================================================================
*/

fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json()) // parse the body as JSON
  .then((data) => console.log(data))
  .catch((error) => console.log("Error:", error.message));

/*
Important: fetch() resolves the Promise as soon as the
server sends ANY response -- even a 404 or 500 error.

response.json() is ITSELF asynchronous (it returns a Promise),
because reading/parsing the response body takes time too.
That's why there are TWO .then() calls above.
*/



/*
===============================================================================
2. GET REQUEST WITH async/await
===============================================================================
*/

async function getUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json();
    console.log("User:", data);
  } catch (error) {
    console.log("Network error:", error.message);
  }
}

getUser();



/*
===============================================================================
3. FETCH DOES NOT REJECT ON HTTP ERRORS (Common Trap!)
===============================================================================

fetch() only rejects on a NETWORK failure
(no internet, DNS failure, CORS block, etc).

A 404 or 500 response is still a "successful" fetch
as far as the Promise is concerned -- it resolved,
the server just sent back an error status.

You must check response.ok / response.status manually.
===============================================================================
*/

async function getUserSafe(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      // response.ok is true only for status codes 200-299
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User:", data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getUserSafe(9999); // likely 404, but fetch() itself won't throw for this
getUserSafe(1);    // works fine



/*
===============================================================================
4. POST REQUEST (sending data)
===============================================================================

By default, fetch() sends a GET request.
To send data, pass a second argument (options object):

- method  -> "POST", "PUT", "PATCH", "DELETE", etc.
- headers -> metadata about the request (e.g. content type)
- body    -> the data being sent (must be a STRING, not an object)
===============================================================================
*/

async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "My New Post",
        body: "This is the content.",
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Created:", data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

createPost();

/*
Common mistake:

body: { title: "My New Post" }   // WRONG -- fetch expects a STRING

body: JSON.stringify({ title: "My New Post" })   // CORRECT
*/



/*
===============================================================================
5. THE Response OBJECT
===============================================================================

Useful properties/methods on the response object:

response.ok          -> true if status is 200-299
response.status       -> numeric status code (200, 404, 500...)
response.statusText   -> "OK", "Not Found", etc.
response.headers      -> a Headers object
response.json()       -> parse body as JSON (returns a Promise)
response.text()       -> get body as plain text (returns a Promise)
response.blob()       -> get body as binary data (for images/files)
===============================================================================
*/

async function inspectResponse() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

  console.log(response.ok);         // true
  console.log(response.status);     // 200
  console.log(response.statusText); // OK
  console.log(response.headers.get("content-type")); // application/json; charset=utf-8

  const data = await response.json();
  console.log(data);
}

inspectResponse();



/*
===============================================================================
6. FETCHING MULTIPLE REQUESTS IN PARALLEL
===============================================================================

Just like with promises in general, independent fetch()
calls should run in PARALLEL using Promise.all(),
not one after another.
===============================================================================
*/

async function getMultipleUsers() {
  try {
    const [user1Res, user2Res] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/users/2"),
    ]);

    const user1 = await user1Res.json();
    const user2 = await user2Res.json();

    console.log(user1, user2);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getMultipleUsers();



/*
===============================================================================
7. CANCELLING A FETCH REQUEST (AbortController)
===============================================================================

fetch() has no built-in timeout or cancel button by itself.
AbortController is used to cancel a request in progress
(e.g. user navigates away, or a timeout is reached).
===============================================================================
*/

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // request finished in time, cancel the timeout
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request timed out!");
    } else {
      console.log("Error:", error.message);
    }
  }
}

fetchWithTimeout("https://jsonplaceholder.typicode.com/users/1", 3000);



/*
===============================================================================
8. fetch() vs XMLHttpRequest / axios (quick context)
===============================================================================

XMLHttpRequest (XHR)
- The old, callback-based way of making HTTP requests
- Verbose, harder to read, no native Promise support

fetch()
- Built into modern browsers/Node, Promise-based, cleaner syntax
- Does NOT reject on HTTP errors (see section 3)
- No built-in request timeout or automatic JSON stringify/parsing

axios (popular third-party library)
- Automatically parses JSON (no need for response.json())
- Rejects the promise automatically on HTTP error status codes
- Has built-in request timeout support
- Not built into JS -- must be installed as a dependency
*/
