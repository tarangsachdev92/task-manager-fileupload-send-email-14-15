
const Task = require('./models/task');
const User = require('./models/user');


const main = async () => {
    // owner is the field of the task model (refer task.model)
    // const task = await Task.findById('5e560b85bef6071842ed5956');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('5e560a9f61807a172b60abd9');
    // tasks is the virtual field (refer user.model)
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);

}

main();