const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("./models/user");
const UserSessions = require("./models/userSessions");



exports.verifyToken = async (req, res, next) => {
    try {
      console.log("auth headers:",req.headers.authorization);
      let token = req.headers.authorization;
  
      if (!token) {
       //res.status(400).json({error:"Unauthorised request!"});
      }
      if (token === "null") {
        //res.status(400).json({error:"Unauthorised request!"});
      }
  
      req.token = token;
      let payload = false;
  
      try {
        payload = jwt.verify(token, "Fly High", {
          ignoreExpiration: true,
        });
      } catch (err) {
        payload = false;
      }
  
      if (!payload) {
        //res.status(400).json({error:"Unauthorised request!"})
      }
  
      const resp = await User.findOne({
        _id: mongoose.Types.ObjectId(payload.user),
      });
        
      if (!resp) {
        //res.status(400).json({error:"Unauthorised request!"})
      }
      req.user = resp;
  
      const found_session = await UserSessions.findOne({
        user: mongoose.Types.ObjectId(resp._id),
        session_id: token,
      }).select("_id session_id session_status");
  
      if (!found_session) {
       // res.status(400).json({error:"Unauthorised request!"})
      }
  
      req.user_session = found_session;
      if (found_session.session_status == "expired") {
        //res.status(400).json({error:"Unauthorised request!"})
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(error.status || 401).json(error);
    }
  };
  