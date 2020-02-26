const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        // await user.save();
        // _id is creaetd by mongoose first and then save happen;
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
        // res.send({ user: user.getPublicProfile(), token });
    } catch (error) {
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send();
    } catch (error) {
        await res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        await res.status(500).send();
    }
})

// this should be not
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'age', 'password', 'email'];
    const isValidOperation = updates.every((update => allowUpdates.includes(update)));

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalide updates' });
    }
    const user = req.user;
    try {
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.send(user); // 200
    } catch (error) {
        res.status(400).send(error);
        // res.status(500).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        // remove tasks 
        res.send(req.user); // 200
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;






// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error)
//     }
// });

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowUpdates = ['name', 'age', 'password', 'email'];
//     const isValidOperation = updates.every((update => allowUpdates.includes(update)));

//     if (!isValidOperation) {
//         return res.status(404).send({ error: 'Invalide updates' });
//     }
//     const _id = req.params.id;
//     try {
//         // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
//         // findByIdAndUpdate bypasses mangoose,it perfomace a direct operation on db,that's why we event have to set a options for running a validator
//         // here middleware is not going to be called due to findByIdAndUpdate; so we will need to update 
//         const user = await User.findById(_id);
//         updates.forEach(update => user[update] = req.body[update]);
//         await user.save()

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user); // 200
//     } catch (error) {
//         res.status(400).send(error);
//         // res.status(500).send(error)
//     }
// })

// router.delete('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findByIdAndDelete(_id);
//         // console.log(user);
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user); // 200
//     } catch (error) {
//         // res.status(400).send(error);
//         res.status(500).send(error)
//     }
// })