const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;
const route = require("./routes/route")
const signup = require("./routes/signup")
const env = require("dotenv")

env.config()

app.use(express.json())
app.use("/signup",signup)
app.use("/api",route)

// MongoDB connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.URL);
  console.log("Connected to MongoDB");
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
