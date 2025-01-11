const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellorp2024rp";
const { UserModel } = require("./db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



// let users =[]; //array of users

mongoose.connect("mongodb+srv://admin:fGUpHgZrZNyqRL7Y@cluster0.zf3dh.mongodb.net/splitwise-database");


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
    
    const objectId = new ObjectId(idString);
    console.log(objectId);
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

    try {
        const userId = req.userId;

        // Fetch the user and populate the friends field
        const user = await UserModel.findById(userId).populate('friends', 'username');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            friends: user.friends // This will now include friend objects with their usernames
        });
    } catch (error) {
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
            { $addToSet: { friends: friend._id } }, // Avoid duplicates
            { new: true } // Return the updated document
        );

        return res.status(200).json({ message: 'Friend added successfully', 
            user: updatedUser,
            friendId : friend._id,
            fiendUsername : friend.username}); //SHOULD I DO TO_STRING OR NOT CHECK , .findById method accepts both string and ObjectId type of data
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(
    5000,() => {
    console.log("server started on port 5000")
});