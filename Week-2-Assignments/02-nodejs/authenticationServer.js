/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.
  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, 
    and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 
    Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. 
    Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, 
    or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

app.use(bodyParser.json());

const users = [];

app.post('/signup', (req, res) => {
  let userExists = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === req.body.email) {
      userExists = true;
      break;
    }
  }
  if (userExists) {
    res.status(404).json({ error: "User already exists" })
  }
  else {
    const user = {
      id: Math.floor(Math.random() * 1000),
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
    users.push(user);
    res.status(201).send("User created successfully!")
  }

}
)

app.post('/login', (req, res) => {
  const user = users.findIndex(u => u.email === req.body.email && u.password === req.body.password);
  if (user === -1) {
    res.status(404).json({ unauthorized: "invalid credentials" })
  }
  else {
    res.status(200).json({
      id: users[user].id,
      firstName: users[user].firstName,
      lastName: users[user].lastName
    })
  }
})

app.get('/data', (req, res) => {
  let email = req.headers.email;
  let password = req.headers.password;
  let userFound = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      userFound = true;
      break;
    }
  }
  if (userFound) {
    let usersToReturn = [];
    for (let i = 0; i < users.length; i++) {
      usersToReturn.push({
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        email: users[i].email
      });
    }
    res.json(usersToReturn);
  }
  else {
    res.sendStatus(401);
  }
})

app.get('/new', (req, res) => {
  res.json(users);
})
app.listen(port, () => {
  console.log(`app listening on port no: ${port}`)
})
// module.exports = app;