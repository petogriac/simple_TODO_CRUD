# TODO Server

Just a simple node.js server with CRUD functionality:

+ CREATE:

a POST request to /todos with todo parameter creates a todo item in the MongoDB with done parameter default false

+ READ:

a GET request to /todos returns all todos in the MongoDB

+ UPDATE:

a PUT request to /todos/_id with either a todo or a done parameter will update the specific todo item

+ DELETE:

a DELETE request to /todos/_id will delete the specific todo item
