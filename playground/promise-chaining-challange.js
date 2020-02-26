
require('../src/db/mongoose');

const Task = require('../src/models/task');

//$set update operator(mongodb native driver) 
// not used here because mongoose dirver automatically does for that
Task.findByIdAndDelete('5e53a53c9d3ebb15dbce2155').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result);
}).catch(() => {
    console.log(e);
})


