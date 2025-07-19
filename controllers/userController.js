const User = require('../models/User')

const createUser = async(req, res) => {
    try{
        const {name, email, password, address, phone} = req.body;   
        // // Log values and types for debugging
        // console.log("name:", name, "- Type:", typeof name);
        // console.log("email:", email, "- Type:", typeof email);
        // console.log("password:", password, "- Type:", typeof password);
        // console.log("address:", address, "- Type:", typeof address);
        // console.log("phone:", phone, "- Type:", typeof phone);

        const user = new User({name, email, password, address, phone});
        await user.save()
        res.status(200).json({
            message: "User created succesfully!",
            data: {email: user.email, id: user._id}
        })
    }catch(err){
        console.log(err)
        if(err.code == 11000){
            return res.status(400).json({message: "User with this email already exists!"})
        }
        return res.status(400).json({message: err.message})
    }
}

const getAllUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({data:users})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const getUserById = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).select('name email address phone createdAt')
        
        if(!user){
            return res.status(500).json({message:"can't get user with that id"})
        }

        res.status(200).json({
            message: "user found",
            data: user
        })
    } catch(err){
        if(err.name == 'CastError'){
            return res.status(400).json({message: "user with this ID not found"})
        }
        return res.status(400).json({message: err.message})
    }
}

const deleteUserById = async(req, res) => {
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:"Can't find user with that ID"})
        }
    
        const result = await User.findByIdAndDelete(id)
        res.status(200).json({message: "Succesfully deleted"})
    } catch(err){
        return res.status(500).json({error: err.message})
    }

}

const updateUserById = async(req, res) => {
    try{
        const {id} = req.params;
        const {name, email, address, phone} = req.body;4
    
        if(!id){
            return res.status(400).json({message:"Can't find user with that ID"})
        }
        const result = await User.findByIdAndUpdate(
            id,
            { name, email, address, phone},
            { new: true, runValidators: true }
        )

        res.status(200).json({
            message: "updated succesfully",
            user: result
        })
    } catch(err) {
        return res.status(400).json({message:err.message})
    }

}

module.exports = {createUser, getAllUsers, getUserById, deleteUserById, updateUserById}