
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({

    username : String,
    password : String,
    email : {type : String,unique : true},
    friends: [{ type: Schema.Types.ObjectId, ref: 'users' }], // Array of references to User documents
    groups: [{ type: Schema.Types.ObjectId, ref: 'groups' }],

});

const GroupSchema = new Schema({
    groupName: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});



const UserModel = mongoose.model('users', UserSchema);
const GroupModel = mongoose.model('groups',GroupSchema);

// console.log(UserSchema.paths);


module.exports = {
    UserModel : UserModel,
    GroupModel : GroupModel


}

