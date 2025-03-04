const express = require("express");
const router = express.Router();

getTemparenture = async (req, res) =>{
    return 9999;
}

router.get("/Temperature", getTemparenture)

module.exports = router;