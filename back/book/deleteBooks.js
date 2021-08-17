const Book = require("../schemas/book");
const jwt = require("jsonwebtoken");

const deleteBook = (req, res) => {
    res.status(200).send(req.params.type);
    const token = JSON.parse(req.header("x-auth-token"));
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decodedToken.role === "admin"){
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
        }
    }catch(err){
        res.status(401).send("Invalid token");
    }
}

module.exports = deleteBook;