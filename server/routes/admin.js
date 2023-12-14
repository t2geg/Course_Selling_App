const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const { SECRET, authenticateJwt } = require('../middleware/auth')
const { User, Course, Admin } = require('../db/index')


const router = express.Router();

router.get('/me', authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesn't Exist" });
    }
    res.json({
        username: req.user.username
    })
})

// Admin Signup
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
        } else {
            const obj = { username: username, password: password };
            const newAdmin = new Admin(obj);
            newAdmin.save();
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Admin created successfully', token });
        }

    }
    Admin.findOne({ username }).then(callback);
});


// admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// Create Course
router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
});

// Update Course
router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// get course using CourseId
router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
        res.json({ course });
    }
    else res.status(404).json({ message: "Course not found" })
})

// Get all courses
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

module.exports = router