
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({

    username : String,
    password : String,
    email : {type : String,unique : true},
    friends: [{ type: Schema.Types.ObjectId, ref: 'users' }] // Array of references to User documents

})



const UserModel = mongoose.model('users', UserSchema);


module.exports = {
    UserModel : UserModel,


}

