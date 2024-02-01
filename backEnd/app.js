const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");

const mongoose = require("mongoose");
const spiltterRouter = require("./routes/routes.js");

// Use CORS middleware
app.use(cors());
app.use("/splitter", spiltterRouter);
// const pass = configiration.password;
const uri =
  "mongodb+srv://Bits-Expense-Splitter:" +
  process.env.PASSWORD +
  "@cluster0.z70uixj.mongodb.net/ExpenseSplitter?retryWrites=true&w=majority";

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Welcome to SPlitExpences");
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useunifiedTopology: true,
  })
  .then(() => {
    console.log("db Connected succesfully..");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => console.log(err));
