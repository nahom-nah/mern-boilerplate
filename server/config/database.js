var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB = process.env.DB;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on("connected", () => {
  console.log("database successfully connected...");
});
