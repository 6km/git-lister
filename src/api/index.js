const express = require("express");
const router = express.Router()

router.use("/stars", require("./stars"))

module.exports = router