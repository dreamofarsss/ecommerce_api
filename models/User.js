const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        match: [/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z0-9.]{2,4}$/, "Invalid email form"]
    },
    password:{
        type: String,
        required: [true, 'Passoword is required!']
    },
    address:{
        type: String,
        default: null
    },
    phone:{
        type: String,
        default: null,
        match:[/^\+[0-9]+$/, 'Invalid phone format']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

const User = model('User', userSchema);
module.exports = User;