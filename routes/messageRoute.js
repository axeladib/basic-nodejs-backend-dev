const express = require("express");
const router = express.Router();
const  {createConverSation, getMessage }= require("../controllers/messageController");

//TODO: Create message to the client
router.post("/create-conversation", createConverSation);

//TODO: Response to chat of the client
router.post("/get-message", getMessage);


module.exports = router;
