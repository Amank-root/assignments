const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://user_42mxs3kz9:p42mxs3kz9@ocdb.app:5050/db_42mxs3kz9')
    // .then(() => {
    //     console.log("connected")

    // })
    // .catch((err) => {
    //     console.log(err)
    // })
// console.log(client.isConnected())

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },


});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: [8, "Length should be greater than 8"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: true
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}