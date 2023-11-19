// app.js

const express = require("express");
const cors = require("cors");
const mongoose = require("./config/database"); // Import the database configuration
const app = express();
// const Schema = mongoose.Schema;
// const MyModel = mongoose.model("Test_Paresh", new Schema({ name: String }));
// // Works
// MyModel.findOne();
const spiltterRouter = require("./routes/routes.js");
app.use("/splitter", spiltterRouter);
// async fetchExpense(myColl) {
//   return await myColl.find({});
// };

app.use(cors());
app.use(express.json());
// ... Other application setup and middleware

// Start your Express server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
