//import expreess
const express = require("express");
const{getUsers, getSingleUser, addUser,deleteUser, updateUser}=require('../controllers/UserController');
const isAuthenticated = require("../middleware/IsAuthenticated");

//define router
const router = express.Router();
//get notes router
router.get("/", isAuthenticated,getUsers);

// get one note
router.get("/:noteId",getSingleUser)

//add note
router.post("/",addUser)
//update note
router.put("/:noteId",updateUser)
//delete note 
router.delete("/:id",deleteUser)

//export the router
module.exports = router
