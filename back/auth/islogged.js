const jwt = require('jsonwebtoken')

const islogged = (req, res) => {
    const token = req.header('x-auth-token');
    if(token){
        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if(decodedToken.role === "admin")
                res.status(201).send();
            else
                res.status(200).send();
        } catch(err) {
            console.log(err);
            res.status(401).send("Invalid token")
        }
    } else{
        res.status(400).send();
    }
}

module.exports = islogged;