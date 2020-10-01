const Customer = require("../models/customer");
const nodemailer = require('nodemailer');


exports.addCustomer=(req,res)=>{
 console.log("customer::",req.body)
 let customerInfo={...req.body,
    addedBy:"rajput.2220.himadri@gmail.com",
    createdAt:new Date()}
 const newCustomer = new Customer(customerInfo);
 newCustomer.save((err,saved)=>{
     if(err){
        console.log("error while saving:",err);
     }
     if(saved){
         console.log("saved customer:",saved);
         res.status(200).json({operation:true,addedCustomer:saved});
     }
 })
}

exports.editCustomer=(req,res)=>{
    console.log("edit customer::",req.body)
}

exports.getCustomerDetails=(req,res)=>{
    
}

exports.getAllCustomers=(req,res)=>{
   Customer.find().then(result=>{
       console.log("this is customer get request::",result);
       res.status(200).json({customerList:result});
   })
}

exports.sendEmailToCustomer=(req,res)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        
        auth: {
          user: "rajput.2220.himadri@gmail.com",
          pass: "hoshi2622",
        },      });
    
      var message = {
        from: req.user.email|| 'rajput.2220.himadri@gmail.com',
        to: req.body.customerEmail||'rajput.2220.himadri@gmail.com',
        subject: req.body.emailSubject,
        text: req.body.emailContent,
        html: `<p>${req.body.emailContent}</p>`
      };
    
      transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log("transport error",error);
        }
        else{
            console.log('Message sent: %s', info);
            let newEmail = req.body
            Customer.findOneAndUpdate({email:req.body.customerEmail},{$push:{
                "communications":{newEmail}
            }},{new:true}).then(customerUpdated=>{
                res.status(200).json({message:"Email Sent!",messageId:info.messageId,customerDetails:customerUpdated});
            }).catch(err=>{

            })
           
        }
        
      });

}

