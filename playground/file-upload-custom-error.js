const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');

// 1mb=1000000
const upload = multer({
    dest: '../images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document'));
        }
        cb(undefined, true)
    }
});

const errorMiddleware = (req, res, next) => {
    throw new Error('From my middleware')
}

// app.post('/upload', errorMiddleware, (req, res) => {
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
// })

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

app.use(express.json());

app.listen(port, () => {
    console.log('the server is up on ' + port)
})
