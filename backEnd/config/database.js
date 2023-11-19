// config/database.js

// const mongoose = require("mongoose");

// const dbURI = "mongodb://localhost:27017/"; // Replace with your actual database URI

// // Connect to the database
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Get the default connection
// const db = mongoose.connection;

// // Event listeners for database connection
// db.on("connected", () => {
//   console.log(`Connected to the database on ${dbURI}`);
// });

// db.on("error", (err) => {
//   console.error(`Database connection error: ${err}`);
// });

// db.on("disconnected", () => {
//   console.log("Database disconnected");
// });
// db.collection("expenses");
// // Export the Mongoose instance
// module.exports = mongoose;

const configiration = require("../../config.js");

const { MongoClient, ServerApiVersion } = require("mongodb");
// const password = encodeURIComponent("Expense@Split");
const pass = configiration.password;
const uri =
  "mongodb+srv://Bits-Expense-Splitter:" +
  pass +
  "@cluster0.z70uixj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("ExpenseSplitter");
    const collection = database.collection("groups");
    const result = await collection.insertOne({
      name: "John Doe",
      email: "paresh@example.com",
    });
    console.log(
      `Inserted ${result.insertedCount} document into the collection`
    );

    // Send a ping to confirm a successful connection
    await client.db("ExpenseSplitter").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
module.exports = MongoClient;
