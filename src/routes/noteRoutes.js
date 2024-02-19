//import expreess
const express = require("express");
const{getNotes, getSingleNote, addNote,deleteNote}=require('../controllers/notesController');

//define router
const router = express.Router();
//get notes router
router.get("/",getNotes );

// get one note
router.get("/:noteId",getSingleNote)

//add note
router.post("/",addNote)

//delete note 
router.delete("/",deleteNote)
//update note
//export the router
module.exports = router
