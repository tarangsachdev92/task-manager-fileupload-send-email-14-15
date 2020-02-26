
require('../src/db/mongoose');

const User = require('../src/models/user');
const Task = require('../src/models/task');

//5e53ab65acdfa81cd35fb255

//$set update operator(mongodb native driver) 
// not used here because mongoose dirver automatically does for that
// User.findByIdAndUpdate('5e4fc103b124250fbcf1ad59', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result);
// }).catch(() => {
//     console.log(e);
// })

// async await
// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age });
//     const count = User.countDocuments({ age });
//     return count;
// }

// updateAgeAndCount('5e4fc103b124250fbcf1ad59', 3).then(count => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// });


//challange
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

// 5e53ae2b5c37ec2010efb716

deleteTaskAndCount('5e53ae2b5c37ec2010efb716').then(count => {
    console.log(count);
}).catch(e => {
    console.log('e', e)
})
