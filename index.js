const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const route = require("./routes/route")
const signup = require("./routes/signup")

app.use(express.json())
app.use("/signup",signup)
app.use("/api",route)

// MongoDB connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://ayushguleria73:YTVEtFzSe1w25Zit@ayush.i6jmd.mongodb.net/Userdata?retryWrites=true&w=majority&appName=Ayush`);
  console.log("Connected to MongoDB");
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
