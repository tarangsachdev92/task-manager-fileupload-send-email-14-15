// CRUD create read update delete

const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(id.toHexString().length);

// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    // console.log('Connected Successfully!');

    const db = client.db(databaseName);
    // Start to interact with the database

    // // single insert
    // db.collection('users').insertOne({
    //     // _id: id,
    //     name: 'Tarang',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     // console.log(result);
    //     console.log(result.ops);
    // })

    // // multiple insert

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     }, {
    //         description: 'Renew inspection',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({
    //     name: 'Tarang',
    //     age: 32,
    //     _id: new ObjectID("5e4e5ad01411d4166f76dc7f")
    // }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(task)
    // })

    // find use cursor for data getting, because if user only wants count then there is not need to 
    // trasnfer all data thrugh the network instead it will give cursor which many methods like toArray to get
    // all records and count to get count of the records;

    // db.collection('users').find({ age: 32 }).toArray((error, users) => {
    //     console.log(users);
    // })

    // db.collection('users').find({ age: 32 }).count((error, userCount) => {
    //     console.log(userCount);
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks);
    // })

    // // update one
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5e4e542b11da8f1294c8b551')
    // }, {
    //     // other fields stay as it is
    //     $set: {
    //         name: 'Mihir'
    //     },
    //     $inc: {
    //         age: 1
    //     }
    // })

    // updatePromise.then(result => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error);
    // })

    // // update many
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // // delete many
    // // and operation in where condition that is age 27 and name 'mahesh' (not or mahesh)

    // db.collection('users').deleteMany({
    //     age: 27,
    //     name: 'mahesh'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // // delete one

    // db.collection('tasks').deleteOne({
    //     description: "Clean the house"
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

})
