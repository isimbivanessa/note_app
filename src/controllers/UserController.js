const bcrypt=require("bcrypt");
const { User } = require("../database/models");
const { connect } = require("../routes/UserRoutes");




// Fetching all notes
const getUsers= async (req, res) => {
  // fetch notes from our db using model Note
  const data = await User.findAll();
  return res.status(200).json({
    data,
  });
};

// fething a single note
const getSingleUser = async (req, res) => {
  // get  note id
  const userId = parseInt(req.params.UserId);

  // Use the noteId to find a note with that id
  const oneUser= await User.findByPk(userId);

  if (!oneUser) {
    // if it is undefined
    return res.status(404).json({
      message: `Note with id: ${userId} was not found`,
    });
  }

  return res.status(200).json({
    data: oneUser,
  });
};

// add note
const addUser = async (req, res) => {
  // get your body element/field
  const { fullName, email, password } = req.body;

    //conditions
    if (!email || !password || !fullName ){
      returnres.status(401).json({
          message:"Email and password are required",

      });
   }


  const userExists = await User.findOne({ where: { email} });

  if (userExists) {
    return res.status(400).json({
      message: `User with email : ${email} already exists`,
    });
  }


  //hash password
  const hashedPassword = bcrypt.hashSync(password,parseInt(process.env.SALT));
  // create a new note
  const newUser = await User.create({
    fullName,
    email,
    password : hashedPassword,
  });

  // return to the user a message
  res.status(201).json({
    message: "A new user has been created",
    data: newUser,
  });
};

//UPDATE NOTE
const updateUser=async (req,res)=>{

const {userId}=req.params
  
const id=parseInt(userId)

const {fullName,email,password}=req.body
const oneUser= await User.findByPk(id);

if (!oneUser){
  return res.status(404).json({
    message:`user with id:${id} not found`
  })
}
if(fullName){
  oneUser.fullName=fullName
}


await oneUser.save() 
return res.status(200).json({
  message:"Successfully updated",
});

}




// delete
const deleteUser= async (req, res) => {
  // get  note id
  const userId = parseInt(req.params.id);

  // Use the noteId to find a note with that id
  const oneUser = await User.findByPk(noteId);

  if (!oneUser) {
    // if it is undefined
    return res.status(404).json({
      message: `User with id: ${userId} was not found`,
    });
  }

  await oneUser.destroy()

  return res.status(200).json({ message: "a user deleted successfully" });
};




module.exports = { getUsers, getSingleUser, addUser, deleteUser,updateUser};
