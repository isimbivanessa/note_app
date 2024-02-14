//import express
const express = require("express");
//import dotenv
require("dotenv").config();

//import cors
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");

// initializing express/calling express object
const app = express();

//use cors
app.use(cors());

//root endpoint
//app which is the invocation of express()
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "account create successful",
  });
});

//all routes
app.use("/notes", noteRoutes);

//not found
app.get("*", (req, res) => {
    return res.status(404).json({
      message: "not found",
    });
  });
  
//define port and host

const port = process.env.PORT;
const host = process.env.HOST;

//listening to server
app.listen(port, () => {
  console.log(`server running  at ${host}:${port}`);
});
