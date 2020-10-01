
const express = require("express");
const router = express.Router();
const customerController=require("../controllers/customer");
const verifyToken = require("../middleware").verifyToken;
router.post("/add",verifyToken,customerController.addCustomer);
router.post("/edit",verifyToken,customerController.editCustomer);
router.get("/details",verifyToken,customerController.getCustomerDetails);
router.get("/all",verifyToken,customerController.getAllCustomers);
router.post("/sendEmail",verifyToken,customerController.sendEmailToCustomer);

module.exports = router;