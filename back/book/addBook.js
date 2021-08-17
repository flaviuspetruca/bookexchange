const Book = require('../schemas/book');
const DonatedBook = require('../schemas/bookDonated');
const jwt = require('jsonwebtoken')

const addBook = (req, res) => {
    const token = req.header("x-auth-token");
    if(token){
        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if (decodedToken.role === 'admin') {
                if (
                    req.body.authors.length > 0  && req.body.title !== ''  &&
                    req.body.thumbnail !== '' && (req.body.type === 'donate' || req.body.type === 'exchange')
                    ){
                    const authors = req.body.authors.split(',');
                    if(req.file.size > 1897120000)
                       res.status(400).send("limit excedeed"); 
                    if(req.body.type === 'exchange'){
                        let newBook = new Book({
                            "authors": authors,
                            "title": req.body.title,
                            "thumbnailPath": req.file.path.toString(),
                            "thumbnail": `http://www.bookarest.live/images/`+ req.file.originalname,
                        });
                        newBook.save(newBook, (err, data) => {
                            if (data)
                                res.status(201).send(data)
                            else
                                res.status(409).send(err)
                        })
                    }else{
                        let newBook = new DonatedBook({
                            "authors": authors,
                            "title": req.body.title,
                            "thumbnailPath": req.file.path.toString(),
                            "thumbnail": `http://www.bookarest.live/images/`+ req.file.originalname,
                        });
                        newBook.save(newBook, (err, data) => {
                            if (data)
                                res.status(201).send(data)
                            else
                                res.status(409).send(err)
                        })
                    }
                } else {
                    res.status(400).send("Invalid input")
                }
            } else {
                res.status(403).send("Unauthorized: cannot add book")
            }
        } catch(err) {
            console.log(err)
            res.status(401).send("Invalid token")
        }
    } else{
        res.status(400).send();
    }
}

module.exports = addBook
