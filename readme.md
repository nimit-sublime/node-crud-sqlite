# Simple Crud Backend

## Setup

- ```npm i```
- ```npm start```

## Docker

- docker build -t test-backend .
- docker run -p 3000:3000 test-backend

## Use

- Get ```curl http://localhost:3000/items```
- Post ```curl -X POST -H "Content-Type: application/json" -d '{"task":"New Task", "user":"John", "comments":"Some comment"}' http://localhost:3000/items```
- Put ```curl -X PUT -H "Content-Type: application/json" -d '{"task":"Updated Task", "user":"Jane", "comments":"Updated comment"}' http://localhost:3000/items/:id```
- Delete ```curl -X DELETE http://localhost:3000/items/:id```

## Dcumentation

- Checkout Postman collection JSON File

