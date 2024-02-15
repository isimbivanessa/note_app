//import expreess
const express = require("express");
const{getNotes, getSingleNote}=require('../controllers/notesController');

//define router
const router = express.Router();
//get notes router
router.get("/",getNotes );

// get one note
router.get("/:noteId",getSingleNote)

//add note
router.get("/")


//create a note route
//router.post("/create-notes",addNote)

//export the router
module.exports = router
