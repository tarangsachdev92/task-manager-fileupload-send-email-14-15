const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false // to remove depricated warning DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
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

// const task = new Task({
//     description: 'This is my task 3',
//     completed: true,
// });

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error!', error)
// })
