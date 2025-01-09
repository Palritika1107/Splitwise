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
app.post('/signup',async function(req,res){

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    // let userAlreadyPresent = users.find((user) => user.username===username && user.password===password);

    // const userAlreadyPresent  = UserModel.findOne({
    //     email : email,
    //     password : password
    // })

    // if(userAlreadyPresent){
    //     res.json({
    //         "isPresent" : true,
    //         "message" : "username already exists please sign in"
    //     })
    // }
    // else{

    await UserModel.create({
        "username" : username,
        "password" : password,
        "email" : email

    });

    // console.log(users);

    res.json({
        "isPresent" : false,
        "message" : "you have successfully signed up"
    });
    // }

})

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
    

    let findUser =  await UserModel.findOne({

        _id : objectId.path

    })

    

    

    if(findUser){
        res.json({

            "username" : findUser.username,
            "email" : findUser.email

        })
    }else{
        res.json({
            "message" : "token not found"
        })
    }


})

app.listen(
    5000,() => {
    console.log("server started on port 5000")
});