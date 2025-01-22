const express = require("express");
const trackerController = require("../controller/trackerController");
const router = express.Router();

router.post("/track", trackerController);

module.exports = router;