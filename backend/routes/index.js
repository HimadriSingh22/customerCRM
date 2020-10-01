const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/customer", require("./customer"));



module.exports = router;
