const { Note } = require("../database/models");
let notes=[]










//fetcing all notes
const getNotes =async (req, res) => {
//   return res.status(200).json({
//     message: "all notes",
//     data: notes,
//   });
// };
//fetching notes from our db using model Note
const data=await Note.findAll()
return res.status(200).json({
  data,
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
const addNote = async(req, res) => {
  const {title,content} = req.body 
  const noteExists=await Note.findOne({
    where:{title}
  });
  if(noteExists){
    return res.status(400).json({
      message:`Note with title:${title}already exists`
    })
  }
  // create a new note
  const newNote=await Note.create({
    title,content
  })

  res.status(201).json({
    message: "A Note created successfully",
    data:newNote,
  });
};

// delete
const deleteNote=(req,res)=>{
//get the id from the params
const{noteId}=req.params;
const id=parseInt(noteId)
const noteToDelete=notes.find((note)=>
{
  
})
console.log(noteId)
};


module.exports = { getNotes,getSingleNote, addNote, deleteNote };
