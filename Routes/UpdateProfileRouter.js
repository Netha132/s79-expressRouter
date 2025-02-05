const express = require("express");
const multer = require("multer");
const expressRouter = require("../models/expressRouter");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")

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

router.patch(
  "/updateProfile",
  upload.single("profilePic"),
  async (req, res) => {
    try {
    console.log(req.body);
    console.log(req.file);

    let user = await expressRouter.find({ email: req.body.email });

    if (user.length > 0) {
    
        if (req.body.firstName.trim().length > 0) {
          await expressRouter.updateMany(
            { email: req.body.email },
            { firstName: req.body.firstName }
          );
        }

        if (req.body.lastName.trim().length > 0) {
          await expressRouter.updateMany(
            { email: req.body.email },
            { lastName: req.body.lastName }
          );
        }
        if (req.body.phone.trim().length > 0) {
          await expressRouter.updateMany(
            { email: req.body.email },
            { phone: req.body.phone }
          );
        }

        if (req.body.password.length > 0) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          await expressRouter.updateMany(
            { email: req.body.email },
            { password: hashedPassword }
          );
        }

        if (req.file.path) {
          await expressRouter.updateMany(
            { email: req.body.email },
            { profilePic: req.file.path }
          );
        }
        res.json({
          msg: "Profile Updated Successfully",
          status: "Success"
        })};
      } catch (err) {
        res.json({
          msg: "Unable to update profile",
          status: "Failure",
          error: err,
        });
      }
    
  }
);

module.exports = router;
