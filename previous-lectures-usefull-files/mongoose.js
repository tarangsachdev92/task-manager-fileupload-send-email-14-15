const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
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
    }
})

// const me = new User({
//     name: '   rakesh   ',
//     age: 22,
//     email: '  Rakehs@gmail.com ',
//     password: 'as',

// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'This is my task 3',
    completed: true,
});

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Error!', error)
})
