const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  
};

const DB_URL_CUSTOMER = 
  "mongodb://localhost:27017/customer?retryWrites=true&w=majority";


const customerDB = mongoose.createConnection(DB_URL_CUSTOMER, options);

exports.connectToDB = () => {
  try {
    customerDB.on("close", function () {
      console.log("connection closed %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    });
    customerDB.on("disconnected", function () {
      console.log("connection disconnect %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    });
    customerDB.on("reconnected", function () {
      console.log("connection reconnect %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    });
    customerDB.on("error", function () {
      console.log("connection error %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    });
    customerDB.on("reconnectFailed", function () {
      console.log("connection reconnectFailed %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    });
    customerDB.on("connected", function () {
      console.log("connection connected %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    });
    process.on("SIGINT", async () => {
      try {
        await customerDB.close();
        
      } catch (e) {
        console.log(e, "error in db connection");
      }
    });
  } catch (e) {
    console.log(e, "error in db connection");
  }
  autoIncrement.initialize(mongoose.connection);
};

exports.customerDB = customerDB;

