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

//TODO: Send Message to the Client
const createMessage = async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "I love you dear",
      from: `whatsapp:${senderNumber}`,
      to: `whatsapp:${receiverNumber}`,
    });
    console.log(message);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
};

//TODO: Response to the incoming message

const responseMessage = async(req,res)=>{
 try{
  const incomingMessage = req.body.Body; // Extract incoming message content
  const senderNumber = req.body.From; // Extract sender's phone number
  const receiverNumber = req.body.To; // Extract receiver's phone number
  console.log(senderNumber, receiverNumber, incomingMessage)
  // Implement your logic to process the incoming message and generate a reply
  const replyMessage = `You said: "${incomingMessage}"`;

  // Send the reply message back to the sender
  const message = await client.messages
    .create({
      from: `whatsapp:${senderNumber}`, // Replace with your Twilio WhatsApp Sandbox number
      body: replyMessage,
      to: `whatsapp:${receiverNumber}`,
      statusCallback: "https://e42f-183-171-31-202.ngrok-free.app"
    });
    console.log(message);
    res.status(200).json({ message: "Successfully response"})
 }catch(err) {
  console.log(err.message)
  res.status(500).json({ message: err.message})
 }
}

module.exports = { createMessage, responseMessage };
