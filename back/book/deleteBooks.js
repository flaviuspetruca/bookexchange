const Book = require("../schemas/book");
const jwt = require("jsonwebtoken");

const deleteBook = (req, res) => {
    const token = JSON.parse(req.header("x-auth-token"));
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decodedToken.role);
        if(decodedToken.role === "admin"){
            Book.findOneAndRemove({"_id": req.params.id}, (err) =>{
                if(err)
                    res.status(400).send();
                else
                    res.status(200).json({deleted: true});
            })
        }
    }catch(err){
        res.status(401).send("Invalid token");
    }
}

module.exports = deleteBook;