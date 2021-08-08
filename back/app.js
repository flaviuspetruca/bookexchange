const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = require("./schemas/user");

const app = express();

//setting up express
app.use(express.json());
app.listen(3000);

mongoose.connect('mongodb://localhost/BOOK-EX');

//middleware
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const login = require('./auth/login');


/* app.get('/adduser', (req, res) =>{
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync("book3xChangeSecret123", salt);
    const User = new user({username: "admin", password});
    User.save().then(res.status(200).send()).catch(e => res.status(400).send(e));
})
 */

/* app.get('/verifyuser', (req, res) => {
    user.findOne({username: "admin"}, (err, user) => {
        bcrypt.compare("book3xChangeSecret123", user.password, (err, result) => {
            res.json(result);
        })
    })
}) */

app.post('/login', (req, res) => {
    login(req, res);
})