//import expreess
const express = require("express");
const { notes } = require("../utils");

//define router
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "all notes",
    data: notes
  });
});
//export the router
module.exports = router
