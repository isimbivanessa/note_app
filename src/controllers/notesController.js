const { Note } = require("../database/models");
const { connect } = require("../routes/noteRoutes");

let notes = [];

// Fetching all notes
const getNotes = async (req, res) => {
  // fetch notes from our db using model Note
  const data = await Note.findAll();
  return res.status(200).json({
    data,
  });
};

// fething a single note
const getSingleNote = async (req, res) => {
  // get  note id
  const noteId = parseInt(req.params.noteId);

  // Use the noteId to find a note with that id
  const oneNote = await Note.findByPk(noteId);

  if (!oneNote) {
    // if it is undefined
    return res.status(404).json({
      message: `Note with id: ${noteId} was not found`,
    });
  }

  return res.status(200).json({
    data: oneNote,
  });
};

// add note
const addNote = async (req, res) => {
  // get your body element/field
  const { title, content } = req.body;

  const noteExists = await Note.findOne({ where: { title } });

  if (noteExists) {
    return res.status(400).json({
      message: `Note with title : ${title} already exists`,
    });
  }

  // create a new note
  const newNote = await Note.create({
    title,
    content,
  });

  // return to the user a message
  res.status(201).json({
    message: "A new has been created",
    data: newNote,
  });
};

//UPDATE NOTE
const updateNote=async (req,res)=>{

const {noteId}=req.params
  
const id=parseInt(noteId)

const {title,content}=req.body
const oneNote= await Note.findByPk(id);

if (!oneNote){
  return res.status(404).json({
    message:`note with id:${id} not found`
  })
}
if(title){
  oneNote.title=title
}
if(content){
  oneNote.content=content
}

await oneNote.save() 
return res.status(200).json({
  message:"Successfully updated",
});

}




// delete
const deleteNote = async (req, res) => {
  // get  note id
  const noteId = parseInt(req.params.id);

  // Use the noteId to find a note with that id
  const oneNote = await Note.findByPk(noteId);

  if (!oneNote) {
    // if it is undefined
    return res.status(404).json({
      message: `Note with id: ${noteId} was not found`,
    });
  }

  await oneNote.destroy()

  return res.status(200).json({ message: "Note deleted successfully" });
};




module.exports = { getNotes, getSingleNote, addNote, deleteNote,updateNote };
