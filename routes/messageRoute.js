const express = require("express");
const router = express.Router();
const {
  createMessage,
  responseMessage,
} = require("../controllers/messageController");

//TODO: Create message to the client
router.post("/send-message", createMessage);

//TODO: Response to chat of the client
router.post("/twilio-status-callback", responseMessage);

module.exports = router;
