const express = require("express");
const mongoose = require("mongoose");

const app = express();

//setup a middleware
app.use(express.json());

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//routes
const itemRouter = require("./routes/item");

app.use("/item", itemRouter);

app.get("/", (req, res) => {
  res.send("<a href='/item'>Items</a>");
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});
