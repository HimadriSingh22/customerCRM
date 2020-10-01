const mongoose = require("mongoose");
const DB = require("../db");

let ActiveSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  session_id: {
    type: String,
    unique: true,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
  
  token: {
    type: {
      text: { type: String },
      status: { type: String, enum: ["valid", "invalid"] },
    },
    required: true,
  },
  session_status: {
    type: String,
    required: true,
    default: "active",
    enum: ["active", "expired"],
  },
  last_login: { type: Date, default: Date.now() },
  last_logout: { type: Date },
});

module.exports = DB.customerDB.model("active_sessions", ActiveSessionSchema);
