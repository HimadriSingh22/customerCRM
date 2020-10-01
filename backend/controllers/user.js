const User = require("../models/user");
const UserSessions =require("../models/userSessions");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT_SECRET=require("../secret").JWT_SECRET;


exports.login=(req,res)=>{
console.log("req.body:",req.body);

try{
     User.findOne({
        email: req.body.email.toString(),
       // document_status: "live",
      }).then(user=>{
        console.log("user::",user);
        if(user){
          
              
          user.comparePassword(req.body.password, async (err, resp) =>{
      
                  console.log("user match:2",resp)
                  if (err) {
                      console.log("user error:2::",err)
                  }
            
                 
                  if(resp==true){
                  let payload = {
                    user: user._id,
                  };
            
                  let token = jwt.sign(payload, JWT_SECRET);
                  console.log("token generated::",token);
                  const found_session = UserSessions.findOneAndUpdate(
                    {
                      user: user._id,
                      //session_id: token,
                    },
                    {
                      last_login: new Date(),
                      session_status: "active",
                      token: { text: token, status: "valid" },
                    },
                    { new: true }
                  );
                  console.log("user:4",found_session);
                  // ?????
                  if (found_session) {
                    const session_data = setUserSession(req, user, token);
            
                    let new_session = new UserSessions(session_data);
            
                    new_session.save((err,saved)=>{
                      if(saved){
                      res.json({
                        token,
                        email:user.email,
                        name:user.name,
                        role:user.role
                      });}
                      else{
                        res.json({error:"Error Creating Session!"});
                      }
                    })
                   
                    
                  } else {

                    console.log("found null!");
                    res.status(200).json({
                      token,
                      email:user.email,
                      name:user.name,
                      role:user.role
                    });
                  }}
                  else{
                    res.json({error:"Password Mismatch!"});
                  }
                
          })
          
          
        }
        else{
            res.status(200).json({message:"No Such User Found!"});
        }
      })

      
}
catch(err){
    next(err)
}
}

exports.signup=(req,res)=>{
console.log("req.body:",req.body);

try{
    const newUser = new User(req.body);
    newUser.save(function(err,saved){
        if(err){
            console.log(err);
        }
        if(saved){
         console.log(saved);
         res.status(200).json({
            operation: true,
          });
            
        }
    });
}
catch(err){
    next(err);
}
}

const setUserSession = (req, user, token) => {
    console.log(req);
  
    var session_data = {
      user: user._id,
      ip_address: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      token: {
        text: token,
        status: "valid",
      },
      session_id: token,
    }
    return session_data;
}
