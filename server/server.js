const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellorp2024rp";

let users =[]; //array of users


app.use(cors());
app.use(express.json());


//instead of using this function , we will be using jwt to create a token
function generateToken(){

    const chars = [
        ...'abcdefghijklmnopqrstuvwxyz', // Lowercase letters
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // Uppercase letters
        ...'0123456789' // Digits
      ];
      
      
      let token = "";

      for(let i=1;i<=32;i++){

        token += chars[Math.floor(Math.random() * chars.length)];


      }

      return token;
}


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
app.post('/signup',function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    let userAlreadyPresent = users.find((user) => user.username===username && user.password===password);

    if(userAlreadyPresent){
        res.json({
            "isPresent" : true,
            "message" : "username already exists please sign in"
        })
    }
    else{

    users.push({
        "username" : username,
        "password" : password

    });

    console.log(users);

    res.json({
        "isPresent" : false,
        "message" : "you have successfully signed up"
    });
    }

})

//signin

app.post('/signin' , function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((user) => user.username===username && user.password===password);

    if(user){
        const token = jwt.sign({

            "username" : username

        },JWT_SECRET);
        // user["token"] = token;

        console.log(users);
        
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