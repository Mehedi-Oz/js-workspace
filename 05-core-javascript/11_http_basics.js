/*
===============================================================================
                              HTTP BASICS
===============================================================================
HTTP (HyperText Transfer Protocol) is the set of rules that
browsers and servers use to communicate.

It's a REQUEST/RESPONSE protocol:

Client (browser) sends a REQUEST  --->  Server
Client (browser) receives a RESPONSE <--- Server

This file covers the concepts you need to understand
BEFORE working with fetch(), APIs, or backend servers.
===============================================================================
*/


/*
===============================================================================
1. WHAT HAPPENS WHEN YOU VISIT A URL
===============================================================================

1. Browser looks up the domain's IP address (DNS lookup)
2. Browser opens a connection to the server (TCP handshake)
3. Browser sends an HTTP REQUEST
4. Server processes the request and sends back an HTTP RESPONSE
5. Browser renders the response (HTML, JSON, image, etc.)

fetch() in JavaScript automates steps 2-4 for you.
===============================================================================
*/



/*
===============================================================================
2. HTTP METHODS (VERBS)
===============================================================================

The method tells the server WHAT you want to do.

GET     -> Retrieve data (should NOT change anything on the server)
POST    -> Create new data
PUT     -> Replace/update an ENTIRE existing resource
PATCH   -> Partially update an existing resource
DELETE  -> Remove a resource
===============================================================================
*/

// Example (using fetch, covered in detail in fetch-api.js)

fetch("https://api.example.com/users", { method: "GET" });
fetch("https://api.example.com/users", { method: "POST" });
fetch("https://api.example.com/users/1", { method: "PUT" });
fetch("https://api.example.com/users/1", { method: "PATCH" });
fetch("https://api.example.com/users/1", { method: "DELETE" });

/*
PUT vs PATCH (commonly confused):

PUT   -> send the WHOLE object, even fields that didn't change
         (replaces the entire resource)

PATCH -> send ONLY the fields that changed
         (partial update)
*/



/*
===============================================================================
3. HTTP STATUS CODES
===============================================================================

The status code tells you the RESULT of the request.
They're grouped into 5 categories by their first digit:

1xx -> Informational (rarely seen directly)
2xx -> Success
3xx -> Redirection
4xx -> Client error (YOU made a mistake in the request)
5xx -> Server error (the SERVER failed to handle it)
===============================================================================
*/

/*
Most common codes to know:

200 OK                  -> request succeeded
201 Created              -> resource successfully created (after POST)
204 No Content           -> succeeded, but nothing to send back (after DELETE)

301 Moved Permanently    -> resource has a new permanent URL
304 Not Modified         -> cached version is still valid, no need to re-download

400 Bad Request          -> request was malformed/invalid
401 Unauthorized         -> you're not logged in / missing credentials
403 Forbidden            -> you ARE logged in, but not allowed to access this
404 Not Found             -> resource doesn't exist
409 Conflict              -> request conflicts with current server state
429 Too Many Requests     -> you're being rate-limited

500 Internal Server Error -> something broke on the server's side
502 Bad Gateway            -> server acting as a proxy got an invalid response
503 Service Unavailable    -> server is temporarily overloaded/down
*/

console.log(200 >= 200 && 200 < 300); // true -> success range
console.log(404 >= 400 && 404 < 500); // true -> client error range
console.log(500 >= 500 && 500 < 600); // true -> server error range



/*
===============================================================================
4. REQUEST STRUCTURE
===============================================================================

An HTTP request has 3 main parts:

1. Request Line -> method + URL + HTTP version
     e.g. GET /users/1 HTTP/1.1

2. Headers -> metadata about the request
     e.g. Content-Type, Authorization, Accept

3. Body -> the actual data being sent (only for POST/PUT/PATCH usually)
     e.g. JSON payload
===============================================================================
*/

// This fetch call maps directly onto that structure:

fetch("https://api.example.com/users", {
  method: "POST",                              // Request line (method)
  headers: {                                    // Headers
    "Content-Type": "application/json",
    "Authorization": "Bearer some-token-here",
  },
  body: JSON.stringify({ name: "Hasan" }),       // Body
});



/*
===============================================================================
5. RESPONSE STRUCTURE
===============================================================================

An HTTP response also has 3 main parts:

1. Status Line -> HTTP version + status code + status text
     e.g. HTTP/1.1 200 OK

2. Headers -> metadata about the response
     e.g. Content-Type, Content-Length, Set-Cookie

3. Body -> the actual data returned
     e.g. HTML page, JSON data, image bytes
===============================================================================
*/



/*
===============================================================================
6. COMMON HEADERS
===============================================================================

Content-Type
  -> tells the receiver what KIND of data the body contains
     e.g. "application/json", "text/html", "multipart/form-data"

Authorization
  -> credentials for authentication
     e.g. "Bearer <token>", "Basic <base64-credentials>"

Accept
  -> tells the SERVER what format the CLIENT wants back
     e.g. "application/json"

Cache-Control
  -> caching rules
     e.g. "no-cache", "max-age=3600"

User-Agent
  -> identifies the client software (browser, app, etc.) making the request
===============================================================================
*/



/*
===============================================================================
7. QUERY PARAMS vs ROUTE PARAMS vs BODY
===============================================================================

Query Params -> appended to the URL after "?", used for filtering/searching
     /users?age=25&city=Dhaka

Route Params -> part of the URL PATH itself, usually identifies a resource
     /users/101   (101 is the route param, the user's id)

Body -> data sent along with POST/PUT/PATCH requests, NOT visible in the URL
     { "name": "Hasan", "age": 25 }
===============================================================================
*/

const url = new URL("https://api.example.com/users?age=25&city=Dhaka");

console.log(url.searchParams.get("age"));  // "25"
console.log(url.searchParams.get("city")); // "Dhaka"



/*
===============================================================================
8. HTTP IS STATELESS
===============================================================================

Every single HTTP request is INDEPENDENT --
the server does NOT automatically remember previous requests.

This is why we need mechanisms like:

- Cookies    -> small pieces of data stored in the browser,
                sent automatically with every request to that domain
- Sessions   -> server-side storage tied to a cookie (session ID)
- Tokens     -> (e.g. JWT) sent manually in the Authorization header
                on every request to prove who you are

Without one of these, the server has NO idea if two requests
came from the "same" logged-in user.
===============================================================================
*/



/*
===============================================================================
9. HTTP vs HTTPS
===============================================================================

HTTP  -> data sent in PLAIN TEXT, can be intercepted/read by anyone
         on the network (routers, ISPs, attackers on public wifi)

HTTPS -> HTTP + TLS/SSL ENCRYPTION
         data is encrypted before sending, so even if intercepted,
         it can't be read without the decryption key

Always use HTTPS in production. Browsers actively warn users
(and can block features like geolocation/camera) on plain HTTP sites.
===============================================================================
*/



/*
===============================================================================
10. CORS (Cross-Origin Resource Sharing)
===============================================================================

By default, browsers BLOCK JavaScript from making requests
to a DIFFERENT origin (different domain, protocol, or port)
than the page it's running on. This is the "Same-Origin Policy".

CORS is a set of HEADERS the SERVER sends back to explicitly
ALLOW requests from other origins.

Example header the server must send:

Access-Control-Allow-Origin: https://myfrontend.com

If this header is missing/mismatched, the browser blocks the
response from reaching your JavaScript code, even though the
request technically succeeded on the server.

This is a BROWSER security feature -- tools like Postman or
curl are NOT affected by CORS, only browser-based JS is.
===============================================================================
*/
