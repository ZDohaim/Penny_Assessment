BUG:
main.js:546 TypeError: Cannot read properties of undefined (reading 'pipe')
Issue:
NgRx Effects Constructor Injection
FIX:
in AuthEffects
issue with @injevtable()

BUG:
Access to XMLHttpRequest at 'http://localhost:3000/api/auth/signup' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
ISSUE:
connecting front-end with back-end
FIX:
nestJS has cors built in so no need to do npm I cors. just add configuration in main.ts

BUG:
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
ISSUE:
Docker setup

potential fixes:
named docker instead of Docker
was COPYing only a couple of things
moved Docker to root instead of in /api
unable to fix for now

BUG:
Mondo Atlas Network IP (make sure to add IP address) for local testing
