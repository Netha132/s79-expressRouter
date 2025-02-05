const express = require("express");
const multer = require("multer");

const expressRouter = require("../models/expressRouter");
let router= express.Router();

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

router.delete("/deleteProfile",upload.none(),async(req,res)=>{
    try{
        let deleteObj = await expressRouter.deleteMany({email:req.body.email})
        if(deleteObj.deletedCount>0){
            res.json({msg:"Account deleted successfully",status:"success"})
        }
        else{
            res.json({msg:"Unable to delete account",status:"Failure"})
        }
    }catch(err){
        res.json({msg:"Something went wrong" , status:"Failure",err:err})
    }
})


module.exports=router;