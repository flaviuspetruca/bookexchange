const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = require("./schemas/user");
const multer = require('multer');


const app = express();

//setting up express
app.use(express.json());
app.listen(8000);

mongoose.connect('mongodb://localhost/BOOK-EX');

//middleware
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cors = require('cors');
app.use(cors());

const login = require('./auth/login');
const addBook = require('./book/addBook');
const getBooks = require("./book/getBooks");
const deleteBook = require("./book/deleteBooks");
const islogged = require("./auth/islogged");
const getDonatedBooks = require("./book/getDonatedBooks");


/* app.get('/adduser', (req, res) =>{
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync("", salt);
    const User = new user({username: "admin", password});
    User.save().then(res.status(200).send()).catch(e => res.status(400).send(e));
})
 */

/* app.get('/verifyuser', (req, res) => {
    user.findOne({username: "admin"}, (err, user) => {
        bcrypt.compare("", user.password, (err, result) => {
            res.json(result);
        })
    })
}) */

// Configure multer
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '/root/apps/bookexchange/back/thumbnails')
    },

    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

app.use('/images', express.static('/root/apps/bookexchange/back/thumbnails'))

//routes

app.post('/api/login', (req, res) => {
    login(req,res);
})

app.get('/api/islogged', (req, res) => {
    islogged(req, res);
})

app.post('/api/addbook', upload.single('thumbnail'), (req, res) => {    	
    addBook(req, res);
})

app.get('/api/getbooks', (req, res) => {
    getBooks(req, res);
})

app.get('/api/getdonatedbooks/:number', (req, res) => {
    getDonatedBooks(req, res);
})

app.delete("/api/deletebook/:id/:type", (req,res) => {
    deleteBook(req, res);
})
