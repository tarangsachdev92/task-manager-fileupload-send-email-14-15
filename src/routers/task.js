const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error)
    }
})

// GET /tasks?completed=false;
// GET /tasks?limit=10&skip=0;
// GET /tasks?limit=10&skip=10;
// GET /tasks?limit=10&skip=20;
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    // req.query.completed will be string
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id });
        // res.send(tasks);
        // above and below both solutions are valid
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id;
    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)

    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update => allowUpdates.includes(update)));

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalide updates' });
    }
    const _id = req.params.id;
    try {

        // const task = await Task.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true
        // });

        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.send(task); // 200
    } catch (error) {
        res.status(400).send(error);
        // res.status(500).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        // console.log(task);
        if (!task) {
            return res.status(404).send()
        }
        res.send(task); // 200
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;