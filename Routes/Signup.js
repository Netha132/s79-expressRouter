const express = require("express");
const multer = require('multer');
const bcrypt = require("bcrypt");

const expressRouter = require('../models/expressRouter');

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/signup",upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let hashedPassword = await bcrypt.hash(req.body.password,10)

  try{
    let user = new expressRouter({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      profilePic: req.file.path,
    });
    await expressRouter.insertMany([user]);
    res.json({ msg: "User created" ,status:"success"});
  }catch(err){
    res.json({ msg: "User not created",status:"failed",error:err });
  }
});

module.exports = router;