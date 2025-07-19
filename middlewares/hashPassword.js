const  bcrypt = require('bcrypt')

const hashPassword = async(req, res, next) => {
    if(req.body.password){
        try{
            req.body.password = await bcrypt.hash(req.body.password, 10)
        } catch(err){
            return res.send(500).json({message: "can't hash your password. sorry"}, {error_msg: error.message})
        }
    }else{
        console.log('somehow password is undefined ://')
    }
    next()
}

module.exports = {hashPassword};