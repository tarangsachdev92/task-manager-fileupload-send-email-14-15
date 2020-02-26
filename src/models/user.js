const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.length < 7) {
                throw new Error('Password must be greater than 6 character')
            } else if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            // console.log(value);
            if (value < 0) {
                throw new Error('Age must be positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
})

// 
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // owner_id(user id)(user model)
    foreignField: 'owner' // name of the field on the other thing(task model)
})

// this methods is accessible on object(instances), it sometime called instancemethods
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecretkey');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

// 
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// middleware
// Hash the plain text passoword before saving
userSchema.pre('save', async function (next) {
    // here we use normal function because this biniding plays an important role;
    // here this is equal => document that's being saved
    const user = this;
    if (user.isModified('password')) {
        // console.log('test');
        user.password = await bcrypt.hash(user.password, 8)
    }
    // console.log('just before save')
    next();
})
// userSchema.post

// Delete the task when user is removed

userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User;