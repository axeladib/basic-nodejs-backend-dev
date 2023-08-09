require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;
const app = express();

//intiate  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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