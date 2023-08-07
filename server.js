const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();

//specify middleware
app.use(express.json());

const port = 3001;

app.get("/", (req, res) => {
  res.send({
    employee1: {
      Nabil: {
        age: "20",
        skills: ["React", "Javascript", "Expessjs"],
        hobby: "Football",
      },
    },
  });
});

//Example of the app
app.get("/blog", (req, res) => {
  res.send("Test blog");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

//Fetch or get the all the data from database
app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Fetch a single data from database
//Using dynamic endpoint
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Save data to the database when the person attempt to hit the route
app.post("/products", async (req, res) => {
  // console.log(req.body);
  // res.send(req.body)

  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: `${error.message} ERROR` });
  }
});

//Update a product

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `cannot find any product ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a product listing

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }

    const updatedProduct = await Product.find({});
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Prevent the strictQuery in MongoDB
mongoose.set("strictQuery", false);

//Connecting to the MongoDB using Mongoose
mongoose
  .connect(
    "mongodb+srv://axel:o2tPWH41dRvsTZlW@basicdevapi.9rsknnc.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successful connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.messsage);
  });

//Create a model of data in Database
