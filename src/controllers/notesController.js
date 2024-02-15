const { notes } = require("../utils");
//fetcing all notes
const getNotes = (req, res) => {
  return res.status(200).json({
    message: "all notes",
    data: notes,
  });
};

//fetching  a single note
const getSingleNote = (req, res) => {
  //const noteId=req.params.noteId
  // console.log("***",noteId)
  const noteId= parseInt(req.params.noteId);
  // use the noteId to find a note with that id
  const singleNote = notes.find((note) => {
    return note.id === noteId;
  });
  if (!singleNote) {
    return res.status(404).json({
      message: `note with id:${noteId}was not found`,
    });
  }
  return res.status(200).json({
    data:singleNote,
  });
};
const addNote=(req,res)=>{
  const data=req.body
  const newNote={id:notes.length+1,...data}
  console.log(newNote)
}
module.exports = { getNotes,getSingleNote, addNote };
