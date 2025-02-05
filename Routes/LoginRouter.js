const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const expressRouter = require("../models/expressRouter");

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

router.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  let user = await expressRouter.find({ email: req.body.email });
  if (user.length > 0) {

    let isPasswordCorrect = await bcrypt.compare(req.body.password,user[0].password)
    if (isPasswordCorrect == true) {
      let token =  jwt.sign({ email: req.body.email,password:req.body.password }, "vivek");
      let dataToSend = {
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        phone: user[0].phone,
        profilePic: user[0].profilePic,
        token: token,
      };
      res.json({ msg: "Login success", status: "success", data: dataToSend });
    } else {
      res.json({ msg: "Incorrect Password", status: "failed" });
    }
  } else {
    res.json({ msg: "User not found", status: "failed" });
  }
});


router.post("/validateToken",upload.none(),async(req,res)=>{

  console.log(req.body)
  let dcryptCredentials = jwt.verify(req.body.token,"vivek");
  
  let userArr = await expressRouter.find().and({email:dcryptCredentials.email});

  if(userArr.length > 0){
    if(userArr[0].password== dcryptCredentials.password){
      let dataToSend={
        firstName:userArr[0].firstName,
        lastName:userArr[0].lastName,
        email:userArr[0].email,
        phone:userArr[0].phone,
        profilePic:userArr[0].profilePic,

      }
      res.json({msg:"Token validated",status:"success",data:dataToSend});
    }else{
      res.json({msg:"Incorrect password",status:"failed"});
    }
  }else{
    res.json({msg:"User not found",status:"failed"});
  }
})

module.exports = router;
