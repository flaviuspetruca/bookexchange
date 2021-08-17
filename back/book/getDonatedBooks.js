const jwt = require('jsonwebtoken');
const bookDonated = require('../schemas/bookDonated');

const getDonatedBooks = (req, res) => {
    if(req.params.number === "true"){
        bookDonated.find({}, (err, books) => {
            if(books){
                res.status(200).json({length: books.length});
            }
            else{
                res.status(400).send(err);
            }
        })
    }  else{
        try{
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if(decodedToken.role !== 'admin')
                res.status(405).send("Not allowed");
            bookDonated.find({}, (err, books) => {
                if(books){
                    res.status(200).json({books: books.reverse()});
                }
                else{
                    res.status(400).send(err);
                }
            })
        }catch(err){
            res.status(401).send("Invalid token");
        }
    }
}

module.exports = getDonatedBooks;
