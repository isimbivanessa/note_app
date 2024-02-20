const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const noteRoutes = require("./routes/noteRoutes");
const UserRoutes = require("./routes/UserRoutes");
const authRoute= require("./routes/authRoute");
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
app.use("/users", UserRoutes);
app.use("/auth", authRoute );

app.all("*", (req, res) => {
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