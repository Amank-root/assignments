const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { z } = require("zod");
const { Admin, Course } = require("../db")
const jwt = require("jsonwebtoken")
const jwt_secret = "AdminTopSecret"
const cName = z.string()
const cPass = z.string().min(8)
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.headers;
    if (cName.safeParse(username).success && cPass.safeParse(password).success) {
        await Admin.create({ username, password })
        res.status(200).json({ message: "Admin created successfully" });
    } else {
        res.send("pasword length should be > 8")
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password}= req.headers
    const user = await Admin.findOne({username, password})
    console.log(user)
    if (user){
        const token = jwt.sign({username}, jwt_secret)
        res.json({token})
    }
    res.send("Admin not found!")
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body[0];
    console.log(req.body)
    console.log(title, description, price, imageLink)
    const courseAdded = await Course.create({
        title,
        description,
        price,
        imageLink
    });

    res.status(200).json({ message: "Course created successfully", id: courseAdded._id });

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});

    res.status(200).json({ courses: allCourses });

});

module.exports = router;