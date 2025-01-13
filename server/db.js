
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
    expenses: [
        {
          description: { type: String, required: true }, // Description of the expense
          amount: { type: Number, required: true }, // Total amount
          payer: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Member who paid
          createdAt: { type: Date, default: Date.now }, // When the expense was added
          splits: [
            {
              member: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Member involved
              amount: { type: Number, required: true }, // Amount owed or paid
              paid: { type: Boolean, default: false }, // Whether the amount has been paid
            },
          ],
        },
      ],
    
});



const UserModel = mongoose.model('users', UserSchema);
const GroupModel = mongoose.model('groups',GroupSchema);

// console.log(UserSchema.paths);


module.exports = {
    UserModel : UserModel,
    GroupModel : GroupModel


}

