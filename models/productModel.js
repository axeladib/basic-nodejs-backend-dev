const mongoose = require("mongoose");
const { Schema } = mongoose;

//This is Schema
//Collection of db object that group together
//Can be tables, views or chart
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a priduct name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },

  {
    //Use to create 2 fields which are CREATED and UPDATED app
    //Track when the data is saved to the database and when data is modified
    timestamps: true,
  }
);

//Create model

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
