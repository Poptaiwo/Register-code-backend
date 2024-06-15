const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then((hashed)=>{
        this.password = hashed
        next()
        console.log(hashed);
    })
})

userSchema.methods.validatePassword= function(password, callback){
    bcrypt.compare(password, this.password, (err,same)=>{
        if(!err){
            callback(err,same)
        } else{
            next()
        }
    })
}

let userModel = mongoose.model("taiwo", userSchema)

module.exports = userModel;