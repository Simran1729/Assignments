/// ----***** req.user is handled differnetly in the case of jwt tokens and middlewares having jwt tokens

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKeyUser = "ThisIsSecretKeyForUser";
const secretKeyAdmin = "ThisIsSecretKeyForAdmin";

const generateJwtUser = (user) => {
  const payload = {
    username: user.username
  }
  return jwt.sign(payload, secretKeyUser, { expiresIn: '1h' });
}

const generateJwtAdmin = (user) => {
  const payload = {
    username: user.username
  }
  return jwt.sign(payload, secretKeyAdmin, { expiresIn: '1h' });
}

const authenticateJwtUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKeyUser, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        req.user = user;
        next();
      }
    });
  }
  else {
    res.sendStatus(401);
  }
};

const authenticateJwtAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKeyAdmin, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        req.user = user;
        next();
      }
    });
  }
  else {
    res.sendStatus(401);
  }
};


// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin = req.body;
  const adminExists = ADMINS.find(u => u.username == admin.username);
  if (adminExists) {
    res.status(403).json({ message: "Admin already exists" });
  }
  else {
    ADMINS.push(admin)
    const token = generateJwtAdmin(admin);
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(u => u.username === username && u.password === password);
  if (admin) {
    const token = generateJwtAdmin(admin);
    res.json({ message: "Logged in successfully!", token })
  }
  else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});

app.post('/admin/courses', authenticateJwtAdmin, (req, res) => {
  const course = req.body;
  course.id = COURSES.length + 1;
  COURSES.push(course);
  res.json({ message: "Course created successfully!" })
});

app.put('/admin/courses/:courseId', authenticateJwtAdmin, (req, res) => {
  courseId = parseInt(req.params.courseId);
  const courseIndex = COURSES.findIndex(u => u.id === courseId);
  if (courseIndex > -1) {
    const updatedCourse = { ...COURSES[courseIndex], ...req.body };
    COURSES[courseIndex] = updatedCourse;
    res.json({ message: 'Course updated!' })
  }
  else {
    res.status(404).json({ message: 'Course not found!' })
  }
});

app.get('/admin/courses', authenticateJwtAdmin, (req, res) => {
  res.status(200).json({ courses: COURSES })
});

// User routes
app.post('/users/signup', (req, res) => {
  const user = req.body;
  const userExists = USERS.find(u => u.username === user.username && u.password === user.password)
  if (userExists) {
    res.status(403).json({ message: 'User already exists' });
  }
  else {
    user.purchasedCourses = [];
    console.log(user)
    USERS.push(user);
    const token = generateJwtUser(user);
    res.json({ message: "User created successfully", token })
  }
});

app.post('/users/login', (req, res) => {
  const user = req.headers;
  const userExists = USERS.find(u => u.username === user.username && u.password === user.password)
  if (userExists) {
    const token = generateJwtUser(user)
    res.json({ message: 'Logged in Successfully!', token });
  }
  else {
    res.status(403).json({ message: "Authentication failed!" })
  }
});

app.get('/users/courses', authenticateJwtUser, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwtUser, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      console.log(req.user)
      req.user.purchasedCourses.push(course);
      res.json({ message: "Course purchased successfully!" });
    }
    else {
      res.status(403).json({ message: "User not found" });
    }
  }
  else {
    res.status(404).json({ message: "Course not found!" })
  }
});

app.get('/users/purchasedCourses', authenticateJwtUser, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (req.user && user.purchasedCourses) {
    res.json({ purchasedCourses: req.user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
