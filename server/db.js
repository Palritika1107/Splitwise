
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({

    username : String,
    password : String,
    email : {type : String,unique : true},
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Array of references to User documents

})



const UserModel = mongoose.model('users', User);


module.exports = {
    UserModel : UserModel,


}

