const Book = require("../schemas/book");
const DonatedBook = require('../schemas/bookDonated');
const jwt = require("jsonwebtoken");

const deleteBook = (req, res) => {
    const token = JSON.parse(req.header("x-auth-token"));
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decodedToken.role === "admin"){
            if(req.params.type === 'exchange'){
                Book.findOneAndDelete({"_id": req.params.id}, (err, book) =>{
                    if(err)
                        res.status(400).send();
                    else{
                        const fs = require('fs')

                        
                        const path = `../back/${book.thumbnailPath}`;
                        
                        console.log(path);
                        fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                        })
                        res.status(200).json({deleted: true});
                    }
                })
            } else if(req.params.type === 'donate'){
                DonatedBook.findOneAndDelete({"_id": req.params.id}, (err, book) =>{
                    if(err)
                        res.status(400).send();
                    else{
                        const fs = require('fs')

                        
                        const path = `../back/${book.thumbnailPath}`;
                        
                        console.log(path);
                        fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                        })
                        res.status(200).json({deleted: true});
                    }
                })
            }
            else
                res.status(400).send("bad req");
        }
    }catch(err){
        res.status(401).send("Invalid token");
    }
}

module.exports = deleteBook;