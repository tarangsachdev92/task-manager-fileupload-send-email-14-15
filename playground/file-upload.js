const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');

// 1mb=1000000
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // cb(new Error('File must be a pdf  '));
        // cb(undefined, true)// no error and file save
        // cb(undefined, false) // no error but file not save or we can say that reject the uplaod

        // if (!file.originalname.endsWith('.pdf')) {
        //     return cb(new Error('Please upload a pdf'));
        // }

        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document'));
        }
        cb(undefined, true)
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
})

app.post('/multiUpload', upload.array('upload', 2), (req, res) => {
    res.send();
})

app.use(express.json());

app.listen(port, () => {
    console.log('the server is up on ' + port)
})
