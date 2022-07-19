const express = require("express");
const router = express.Router()

router.use("/stats", require("./stats"))

module.exports = router