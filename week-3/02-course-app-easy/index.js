const express = require('express');
const app = express();

app.use(express.json());


let ADMINS = [];
let USERS = [];
let COURSES = [];

// middleware for admin authentication ----> this will be a route speciifc middleware
// we will pass it as an arguement to specific routes
const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(u => u.username === username && u.password === password)
  if (admin) {
    next();
  }
  else {
    res.status(404).json({ message: "Authentication failed!" })
  }
};

//user authentication
const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    req.user = user
    next();
  }
  else {
    res.status(403).json({ message: "User Authentication failed" });
  }
};

// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find(u => u.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists! , Try to log in." })
  }
  else {
    ADMINS.push(admin);
    res.status(200).json({ message: 'Admin created successfully!' });
  }
});


app.post('/admin/login', adminAuthentication, (req, res) => {
  res.json({ message: "Logged in successfully!" })
});


app.post('/admin/courses', adminAuthentication, (req, res) => {
  const course = req.body;
  course.id = Date.now();
  COURSES.push(course);
  res.json({ message: "Course created successfully!", courseId: course.id });
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "Course updated successfully!" });
  }
  else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get('/admin/courses', (req, res) => {
  res.json({ courses: COURSES })
});

// User routes
app.post('/users/signup', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(403).json({ message: "User already exists!" });
  }
  else {
    const user = { ...req.body, purchasedCourses: [] };
    USERS.push(user);
    res.status(200).json({ message: "User created successfully!" });
  }


});

app.post('/users/login', userAuthentication, (req, res) => {
  // logic to log in user
  res.json({ message: "Logged in successfully!" });
});


app.get('/users/courses', userAuthentication, (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES.filter(c => c.published) });
});

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  // logic to purchase a course
  const courseId = Number(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    req.user.purchasedCourses.push(course);
    res.json({ message: "Course puchased successfully!" });
  }
  else {
    res.status(404).json({ message: "Course not found or not availaible" });
  }
});

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  // logic to view purchased courses
  res.status(200).json({ purchasedCourses: req.user.purchasedCourses });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
