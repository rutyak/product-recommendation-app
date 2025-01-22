const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const productRouter = require("./router/productRouter");
const trackRouter = require("./router/trackerRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.MongoDB_url;

app.use(cors());
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connection established...");
    // return Product.insertMany(products)
  })
  .catch((error) => {
    console.error("Error in connection...", error);
  });

app.use(productRouter);
app.use(authRouter);
app.use(trackRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
