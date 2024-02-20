//import expreess
const express = require("express");
const{login}=require('../controllers/authController');

//define router
const router = express.Router();

router.post("/login",login)

//export the router
module.exports = router
