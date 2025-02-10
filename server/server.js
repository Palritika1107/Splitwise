const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellorp2024rp";
const { UserModel , GroupModel } = require("./db");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



// let users =[]; //array of users
mongoose.connect(process.env.MONGO_URI)  // Access variable using process.env
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



app.use(cors());
app.use(express.json());





function auth(req,res,next){

    

    const token = req.headers.token;
    

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        console.log(typeof(decodedInfo.id));
        req.userId = decodedInfo.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }



}

//signup
app.post('/signup', async function (req, res) {
    const { email,username ,password} = req.body;

    try {
        // Attempt to create the user
        const response = await UserModel.create({
            username: username,
            password: password,
            email: email
        });

        res.status(201).json({
            isPresent: false,
            message: "You have successfully signed up"
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            // MongoDB duplicate key error code
            res.status(409).json({
                isPresent: true,
                message: "Email already exists, please sign in"
            });
        } else {
            // Handle other errors
            console.error('Error during signup:', error);
            res.status(500).json({
                isPresent: false,
                message: "An error occurred. Please try again later."
            });
        }
    }
});


//signin

app.post('/signin' , async function(req,res){

    // const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // const user = users.find((user) => user.username===username && user.password===password);

    const user = await UserModel.findOne({
        email : email,
        password : password
    })

    console.log(user);
    

    if(user){ 
        const token = jwt.sign({

            "id" : user._id.toString()

        },JWT_SECRET);
        // user["token"] = token;

        // console.log(users);
        
    res.json({

        "isPresent" : true,
        "token" : token,
        "message" : "signed in"
        

    })
}else{
    res.json({
        "isPresent" : false,
        "message" : "user not found"
    })
}

})

app.get('/me',auth,async function(req,res){

    const idString = req.userId;
    
    // const objectId = new ObjectId(idString);
    // console.log(`me ${typeof(objectId)}`);
    // const objectId = new mongoose.Types.ObjectId(idString);
    

    // let findUser =  await UserModel.findOne({

    //     _id : objectId.path

    // })
   let findUser =  await UserModel.findById(idString); //findById method accepts both string and objectId type argument

    

    

    if(findUser){
        res.json({

            "user" : findUser
        })
    }else{
        res.json({
            "message" : "token not found"
        })
    }


})

app.get('/friends',auth,async(req,res) => {
    const userId = req.userId;
    


    try {
        

        // Fetch the user and populate the friends field
        const user = await UserModel.findById(userId).populate('friends', 'username');

        if(user.friends.length){
            const n = user.friends.length;
            
            for(let i=0;i<n;i++){
                console.log(user.friends[i]);
            }
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            friends: user.friends // This will now include friend objects with their usernames
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

    // const userId = req.userId;

    // const user = await UserModel.findById(userId);
    // console.log(user);

    // res.json({
    //     "friend-list" : user.friends
    // })



})

app.post('/addfriends',auth, async (req, res) => {
    // const userId  = (new ObjectId(req.userId)).path;
    const userId = req.userId;
    const friendEmail = req.body.friendEmail;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user or friend ID' });
    }

    try {
        // Ensure both users exist (optional but recommended)
        const user = await UserModel.findById(userId);
        const friend = await UserModel.findOne({
            "email" : friendEmail
        });

        if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }

        // Add the friend to the user's friends array
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friend._id } }, // addToSet function Avoid duplicates 
            { new: true } // Return the updated document
        );

        return res.status(200).json({ message: 'Friend added successfully', 
            user: updatedUser,
            friendId : friend._id,
            friendUsername : friend.username}); //SHOULD I DO TO_STRING OR NOT CHECK , .findById method accepts both string and ObjectId type of data
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get("/get-group/",async(req,res) => {
    let groupId = req.query.groupId;
    // console.log(groupId);

    try{

    const group = await GroupModel.findById({
       "_id" : groupId
    })

    

    res.json({
        "group" : group
    })

}catch(err){
    console.log(`get-group error : ${err}`);
}




});

app.post("/create-group", auth, async (req, res) => {
    let userId = req.userId;
    try {
      const { groupName, members } = req.body;
  
      // Validate request body
      if (!groupName || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ error: "Invalid groupName or members list" });
      }
  
      // Check if all members exist in the users collection
      const users = await UserModel.find({ _id: { $in: members } });
      if (users.length !== members.length) {
        return res.status(400).json({ error: "One or more members do not exist" });
      }
  
      // Create and save the group
      const group = await GroupModel.create({
        groupName,
        members,
        createdBy: req.userId,
      });

      //add group _id to each members "group" array
      //add to person who created group

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { groups: group._id } }, // addToSet function Avoid duplicates 
        { new: true } // Return the updated document
    );

    //add to group list of other members who created group
    for(let i=0;i<members.length;i++){

        let memberId = new ObjectId(members[i]);
        console.log(memberId);

        const updatedMember = await UserModel.findByIdAndUpdate(
            memberId.toString(),
            { $addToSet: { groups: group._id } }, // addToSet function Avoid duplicates 
            { new: true } // Return the updated document
        );


        console.log(`other members ${updatedMember.username}`);
    }




  
      res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post('/add-expense', async (req, res) => {
    const { groupId, description, amount, payerIdString } = req.body;

    if (!payerIdString || !ObjectId.isValid(payerIdString)) {
        return res.status(400).json({ error: 'Invalid payerIdString' });
      }
    
    // const {payerIdString} = req.body;
    const payerIdObj = new ObjectId(payerIdString);
    

    console.log(payerIdObj);


    try {
      const group = await GroupModel.findById(groupId);
      if (!group) return res.status(404).json({ error: 'Group not found' });
  
      const numMembers = group.members.length;
      const splitAmount = amount / numMembers;
      
  
      // Create splits
      const splits = group.members.map((member) => ({
        member: member,
        amount: splitAmount,
        paid: member.toString() === payerIdString, // Mark payer's split as paid
      }));

      console.log(splits);

  
      // Add the expense
      const expense = {
        description,
        amount,
        payer: payerIdObj,
        createdAt : Date.now(),
        splits,
      };
  
      group.expenses.push(expense);
      await group.save();
  
      res.json({ success: true, group,expense});
    } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ error: 'Failed to add expense' });
    }
    // res.json({
    //     "message" : "success"
    // })
  });


  app.post('/pay-expense', async (req, res) => {
    const { groupId, expenseId, memberId } = req.body;
    console.log("pay-expense");
  
    try {
      const group = await GroupModel.findById(groupId);
      if (!group) return res.status(404).json({ error: 'Group not found' });

      console.log('1------');
  
      const expense = group.expenses.id(expenseId);
      
      if (!expense) return res.status(404).json({ error: 'Expense not found' });

      console.log('2------');
      console.log(expense);
      debugger;
      const split = expense.splits.find((s) => s.member.toString() === memberId);
      
      if (!split || split.paid) {
        return res.status(400).json({ error: 'No payment due or already paid' });
      }

      console.log('3------');
  
      split.paid = true; // Mark the split as paid
      await group.save();
  
      res.json({ success: true, group });
    } catch (error) {
      console.error('Error updating payment:', error);
      res.status(500).json({ error: 'Failed to update payment' });
    }
  });

// Route to fetch paginated items
app.get("/group/expenses", async (req, res) => {
  const { page, pageSize, groupId } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(pageSize, 10);

  try {
    // Use MongoDB aggregation to reverse and paginate the expenses array
    const result = await GroupModel.aggregate([
      { $match: { _id: new ObjectId(groupId) } }, // Match the group by ID
      {
        $project: {
          expenses: { $reverseArray: "$expenses" }, // Reverse the expenses array
        },
      },
      {
        $project: {
          expenses: {
            $slice: ["$expenses", (pageNumber - 1) * limitNumber, limitNumber], // Apply pagination
          },
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Group not found" });

    }

   

    res.json(result[0].expenses); // Return the reversed and paginated expenses
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
  
  




app.listen(
    8000,() => {
    console.log("server started on port 8000")
});