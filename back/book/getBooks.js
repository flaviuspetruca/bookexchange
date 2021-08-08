const Book = require('../schemas/book');
const User = require('../schemas/user')
const jwt = require('jsonwebtoken');

const getbooks = (req, res) => {
    const token = req.header("x-auth-token");
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            Book.find({}, (err, books) => {
                if(books){
                    res.status(200).json(books);
                }
                else{
                    res.status(400).send(err);
                }
            })  
    }catch(err){
        res.status(401).send("Invalid token");
        console.log(err);
    }
}

module.exports = getbooks;