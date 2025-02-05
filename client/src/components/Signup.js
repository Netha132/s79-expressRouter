import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  let navigate = useNavigate();


  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let phoneInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicInputRef = useRef();

  useEffect(()=>{
    axios.defaults.baseURL="";

    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  },[])

  let onSignup = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("phone", phoneInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    // let reqOptions = {
    //   method: "POST",
    //   body: dataToSend,
    // };

    let response = await axios.post("/signup/signup", dataToSend);

    // let JSOData = await response.json();

    console.log(response);
    alert(response.data.msg);
    if(response.data.status == "success"){
      navigate("/");
    }
  };

  return (
    <div>
      
      <div className="signupBG">
        <div className="homeDiv">
      <Link to="/" className="homeLink"><img className="homeIcon" src="./images/veravogueIcon.png"></img></Link>
      </div>
      <form className="signupForm">
        <h1 className="signupHead">Sign up</h1>
        <div className="loginDiv">
          <label className="loginLabel">First Name</label>
          <input className="loginInput" ref={firstNameInputRef} type="text"></input>
        </div>
        <div className="loginDiv">
          <label className="loginLabel">Last Name</label>
          <input className="loginInput" ref={lastNameInputRef} type="text"></input>
        </div>
        <div className="loginDiv">
          <label className="loginLabel">Email</label>
          <input className="loginInput" ref={emailInputRef} type="email"></input>
        </div>
        <div className="loginDiv">
          <label className="loginLabel">Phone</label>
          <input className="loginInput" ref={phoneInputRef} type="number"></input>
        </div>
        <div className="loginDiv">
          <label className="loginLabel">Password</label>
          <input className="loginInput" ref={passwordInputRef} type="password"></input>
        </div>
        <div className="loginDiv">
          <label className="loginLabel">Profile Pic</label>
          <input className="loginInput" ref={profilePicInputRef} type="file"></input>
        </div>

        <button className="signupbtn"
          type="button"
          onClick={() => {
            onSignup();
          }}
        >
          Submit
        </button>
        <div>
          <p className="loginText">Already have an account?<Link className="loginLink" to="/login">Login</Link></p>
        
        </div>
      </form>
      </div>
    </div>
  );
}

export default Signup;
