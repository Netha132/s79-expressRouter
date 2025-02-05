
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {

  let dispatch = useDispatch();

  let navigate = useNavigate();

  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let phoneInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicInputRef = useRef();

  let [updateprofilePic, setUpdateProfilePic] = useState(
    "./images/no-pic3.png"
  );

  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:2233";

    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    firstNameInputRef.current.value = userDetails.firstName;
    lastNameInputRef.current.value = userDetails.lastName;
    emailInputRef.current.value = userDetails.email;
    phoneInputRef.current.value = userDetails.phone;
    // passwordInputRef.current.value = userDetails.password;
    setUpdateProfilePic(`http://localhost:2233/${userDetails.profilePic}`);
  }, []);

  // let onUpdateProfile = async () => {
  //   let dataToSend = new FormData();
  //   dataToSend.append("firstName", firstNameInputRef.current.value);
  //   dataToSend.append("lastName", lastNameInputRef.current.value);
  //   dataToSend.append("email", emailInputRef.current.value);
  //   dataToSend.append("phone", phoneInputRef.current.value);
  //   dataToSend.append("password", passwordInputRef.current.value);

  //   for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
  //     dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
  //   }

  //   let reqOptions = {
  //     method: "PATCH",
  //     body: dataToSend,
  //   };

  //   let JSONData = await fetch(
  //     "http://localhost:4000/updateProfile/updateProfile",
  //     reqOptions
  //   );
  //   let JSOData = await JSONData.json();

  //   console.log(JSOData);

  //   alert(JSOData.msg);


  // };


  let onUpdateProfile = async () => {
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
    //   method: "PATCH",
    //   body: dataToSend,
    // };

    let response = await axios.patch(
      "/updateProfile/updateProfile",
      dataToSend
    );
    // let JSOData = await JSONData.json();

    console.log(response);

    alert(response.data.status);

    // if(response.data.status == "Success"){
    //   // localStorage.setItem("token",response.data.data.token);
    //   dispatch({type:"login",data:response.data.data})
    //   navigate("/")
    // }


  };

  return (
    <div>
      <div className="updatePage">
        <div>
          <Link to="/user">
            <img className="leftArrowIcon" src="./images/left-arrow.png" alt=""></img>
          </Link>
        </div>
        <form className="updateForm">
          <h2 className="updateHead">Update Profile</h2>

          <div className="updateDiv">
            <input
              className="updateInput"
              ref={firstNameInputRef}
              type="text"
              placeholder="First Name"
            ></input>
          </div>

          <div className="updateDiv">
            <input
              className="updateInput"
              ref={lastNameInputRef}
              type="text"
              placeholder="Last Name"
            ></input>
          </div>

          <div className="updateDiv">
            <input
              className="updateInput"
              ref={emailInputRef}
              type="email"
              placeholder="Email"
            ></input>
          </div>

          <div className="updateDiv">
            <input
              className="updateInput"
              ref={phoneInputRef}
              type="number"
              placeholder="Phone"
            ></input>
          </div>

          <div className="updateDiv">
            <input
              className="updateInput"
              ref={passwordInputRef}
              type="text"
              placeholder="Password"
            ></input>
          </div>

          <div className="updateDiv">
            <input
              className="updateInput"
              ref={profilePicInputRef}
              type="file"
              onChange={(event) => {
                let onSelectedPic = URL.createObjectURL(event.target.files[0]);
                setUpdateProfilePic(onSelectedPic);
              }}
            ></input>
          </div>
          <div>
            <img
              className="updateProfilePic"
              src={updateprofilePic}
              alt=""
            ></img>
          </div>
          <button
            className="updateBtn"
            type="button"
            onClick={() => {
              onUpdateProfile();
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
