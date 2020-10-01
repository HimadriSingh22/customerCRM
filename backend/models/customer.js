const mongoose= require('mongoose');
const db=require('../db');
const customerSchema= mongoose.Schema({
    id:{
        type:mongoose.Types.ObjectId
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    gst:{
        type:String,
        require:true
    },
    addedBy:{
        type:String
    },
    createdAt:{
        type:Date
    },
    communication:{type:Array},
    totalEmailSent:{type:Number}
})
module.exports = db.customerDB.model("customers", customerSchema);
