const asyncHandler = require("express-async-handler");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

//TODO: Error Handler function

const errorHandler = (error) => {
  let errors = { status: "" };
  console.log(error.code);

  if (error.code === 63007) {
    errors.status =
      "Sending a message using number that re not registred to the Twilio";
    return errors;
  }
};

const senderNumber = +14155238886;
const receiverNumber = +601129512295;
const conversationSID = "CH2d35b007da1c4f5e9712ba4deb5b764d";

//TODO: Send Message From Server to the Client
const createConverSation = async (req, res) => {
  try {
    const serverToClient = await client.conversations.v1
      .conversations(conversationSID)
      .messages.create({ author: "system", body: "I love you" });
    res.status(200).json({ serverToClient });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
};

const getMessage = async (req, res) => {
  try {
    const incomingMessage = req.body.body;
    const getMessage = await client.conversations.v1
      .conversations(conversationSID)
      .messages(incomingMessage)
      .fetch()
      .then((message) => console.log(message.body));
      res.status(200).json({getMessage})
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
};

//TODO: Response to the incoming message

module.exports = { createConverSation, getMessage };
