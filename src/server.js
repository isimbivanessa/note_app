// //import express
// const express = require("express");

// //import helmet
// const helmet =require("helmet");

// //import dotenv
// require("dotenv").config();

// //import cors
// const cors = require("cors");
// const noteRoutes = require("./routes/noteRoutes");

// // initializing express/calling express object
// const app = express();

// //use cors
// app.use(cors());

// //root endpoint
// //app which is the invocation of express()
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "account create successful",
//   });
// });

// //all routes
// app.use("/notes", noteRoutes);

// //not found
// app.get("*", (req, res) => {
//     return res.status(404).json({
//       message: "not found",
//     });
//   });

//   //use helmet
//   app.use(helmet)

// //define port and host

// const port = process.env.PORT;
// const host = process.env.HOST;

// //listening to server
// app.listen(port, () => {
//   console.log(`server running  at ${host}:${port}`);
// });

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const noteRoutes = require("./routes/noteRoutes");
const { sequelize } = require("./database/models");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());




// Set routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Notes Projects APIs",
  });
});

// define your note route
app.use("/notes", noteRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Route doesn't exist",
  });
});

// Define the port number
const { PORT, HOST } = process.env;



//connect database
const dbConnection= async()=>{
  try{
    //connect to database
    await sequelize.authenticate();
    console.log('DB connected successfully')
    
    }catch(error){
      console.log(error);
    }
    
    

}






// Listening to the server
app.listen(PORT, async() => {
  await dbConnection()
  console.log(`Server is Running at ${HOST}:${PORT}`);
});