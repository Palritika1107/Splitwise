const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellorp2024rp";
const { UserModel } = require("./db");
const mongoose = require("mongoose");


// let users =[]; //array of users

mongoose.connect("mongodb+srv://admin:fGUpHgZrZNyqRL7Y@cluster0.zf3dh.mongodb.net/splitwise-database");


app.use(cors());
app.use(express.json());





function auth(req,res,next){

    const token = req.headers.token;
    const decodedInfo = jwt.verify(token,JWT_SECRET);
    const username = decodedInfo.username;

    if(username){
        req.username = username;
        next();
    }
    else{
        res.json({
            "message" : "user not found"
        })
    }



}

//signup
app.post('/signup',async function(req,res){

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    // let userAlreadyPresent = users.find((user) => user.username===username && user.password===password);

    const userAlreadyPresent  = UserModel.findOne({
        email : email,
        password : password
    })

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

    if(user){ 
        const token = jwt.sign({

            "id" : user._id

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

app.get('/me',auth,function(req,res){

    
    const username = req.username;

    let findUser = null;

    for(let i=0;i<users.length;i++){

        if(users[i].username === username){
            findUser = users[i];
            break;
        }

    }

    if(findUser){
        res.json({

            "username" : findUser.username,
            "password" : findUser.password

        })
    }else{
        res.json({
            "message" : "token not found"
        })
    }


})

app.listen(5000,() => {
    console.log("server started on port 5000")
});