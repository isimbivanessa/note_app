//import expreess
const express = require("express");
const{getNotes, getSingleNote, addNote,deleteNote, updateNote}=require('../controllers/notesController');

//define router
const router = express.Router();
//get notes router
router.get("/",getNotes );

// get one note
router.get("/:noteId",getSingleNote)

//add note
router.post("/",addNote)
//update note
router.put("/:noteId",updateNote)
//delete note 
router.delete("/:id",deleteNote)

//export the router
module.exports = router
