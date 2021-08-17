const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookDonatedSchema = new Schema({
    title: String,
    authors: [],
    thumbnail: String,
    thumbnailPath: String,
})

const Book = mongoose.model('bookDonated', bookDonatedSchema);

module.exports = Book;