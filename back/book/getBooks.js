const Book = require('../schemas/book');

const getbooks = (req, res) => {
    Book.find({}, (err, books) => {
        if(books){
            res.status(200).json({books: books.reverse()});
        }
        else{
            res.status(400).send(err);
        }
    })
}

module.exports = getbooks;
