require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;
const app = express();
const cors = require("cors");
const FRONTEND_CONNECTION = process.env.FRONTEND_CONNECTION;

//TODO: To allow only specific domain to access
var corsOptions = {
  origin: FRONTEND_CONNECTION,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//intiate  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);
app.use(cors(corsOptions));

//intitiate routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

//Prevent the strictQuery in MongoDB
mongoose.set("strictQuery", false);

//Connecting to the MongoDB using Mongoose
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successful connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.messsage);
  });
