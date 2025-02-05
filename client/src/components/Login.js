import { useEffect, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  useEffect(() => {

    axios.defaults.baseURL="";
    
    if(localStorage.getItem("token")){
      // onValidateToken();
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    }
  },[]);

  // let onLogin = async () => {
  //   let dataToSend = new FormData();
  //   dataToSend.append("email", emailInputRef.current.value);
  //   dataToSend.append("password", passwordInputRef.current.value);

  //   let reqOptions = {
  //     method: "POST",
  //     body: dataToSend,
  //   };
  //   let JSONData = await fetch("http://localhost:4000/login/login", reqOptions);
  //   let JSOData = await JSONData.json();
  //   console.log(JSOData.msg);
  //   alert(JSOData.msg);
  //   if (JSOData.status == "success") {
  //     localStorage.setItem("token",JSOData.data.token);
     
  //     dispatch({type:"login", data:JSOData.data})
  //     navigate("/dashboard");
  //   }
  // };


  
  let onLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let response = await axios.post("/login/login", dataToSend);
    
    console.log(response);
    alert(response.data.msg);
    if (response.data.status == "success") {
      localStorage.setItem("token",response.data.data.token);
     
      dispatch({type:"login", data:response.data.data})
      navigate("/dashboard");
    }
  };

  let onValidateToken = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("token",localStorage.getItem("token"));

    // let reqOptions = {
    //   method: "POST",
    //   body: dataToSend,
    // };

    let response = await axios.patch ("/validateToken/validateToken",dataToSend);

    // let JSOData = await JSONData.json();
    console.log(response.data.msg);
    if(response.data.status == "success"){
      dispatch({type:"login", data:response.data.data})
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <div className="loginBG">
        <form className="loginForm">
          <h1 className="loginHead">Login</h1>
          <div className="loginDiv">
            <label className="loginLabel">Email</label>
            <input className="loginInput" ref={emailInputRef} type="email" />
          </div>
          <div className="loginDiv">
            <label className="loginLabel">Password</label>
            <input
              className="loginInput"
              ref={passwordInputRef}
              type="password"
            />
          </div>
          <button
            className="loginButton"
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>

          <div className="signupBtnDiv">
            <p className="signupText">
              Don't have an account?
              <Link className="signupLink" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
