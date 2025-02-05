const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); //render.com

dotenv.config();

const signupRouter = require("./Routes/Signup");
const loginRouter = require("./Routes/LoginRouter");
const updateProfile = require("./Routes/UpdateProfileRouter");
const deleteProfile = require("./Routes/DeleteRouter");
const expressRouter = require('./models/expressRouter');

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname,"./client/build"))) //render.com

let authorise = (req,res,next)=>{

  console.log("inside authorise mwf")
  console.log(req.headers["authorization"])

  next();
}
app.use(authorise);
app.use("/", signupRouter);
app.use("/login", loginRouter);
app.use("/validateToken", loginRouter);
app.use("/updateProfile", updateProfile);
app.use("/deleteProfile", deleteProfile);
app.use("/signup",signupRouter);

app.use("/expressRouter",expressRouter);



app.listen( process.env.port, () => {
  console.log("Server started at ");
});

app.get("*",(req,res)=>{
  res.sendFile("./client/build/index.html");  //render.com
})

// let expressRouter = new mongoose.model('expressRouter',routerSchema,"expressDetails");

let connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDBUrl);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB");
  }
};
connectToMongoDB();
