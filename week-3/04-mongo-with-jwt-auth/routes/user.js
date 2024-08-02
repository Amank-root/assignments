const { Router } = require("express");
const { z } = require("zod");
const { User, Course } = require("../db")
const jwt = require("jsonwebtoken")
const jwt_secret = "usertopsecret"
const cName = z.string()
const cPass = z.string().min(8)
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.headers;
    if (cName.safeParse(username).success && cPass.safeParse(password).success) {
        await User.create({ username, password })
        res.status(200).json({ message: "User created successfully" });
    } else {
        res.send("pasword length should be > 8")
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.headers
    const user = await User.findOne({ username, password })
    console.log(user)
    if (user) {
        const token = jwt.sign({ username }, jwt_secret)
        res.json({ token })
    }
    res.send("User not found!")
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({ courses: allCourses })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username
    }, {
        $push: {
            purchasedCourses: courseId
        }
    })
    res.json({ message: 'Course purchased successfully' })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router