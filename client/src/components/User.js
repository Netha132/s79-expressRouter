import React from "react";
import TopNavigation from "./TopNavigation";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function User() {
  let navigate = useNavigate();
  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  let deleteAccount = async()=>{
    let dataToSend= new FormData();
    dataToSend.append("email",userDetails.email);

    let reqOptions={
      method:"Delete",
      body:dataToSend
    }

    let JSONData = await fetch("http://localhost:2233/deleteProfile/deleteProfile",reqOptions);
    let JSOData= await JSONData.json();

    console.log(JSOData)
    if(JSOData.status == "success"){
      navigate("/")
      alert(JSOData.msg)
    }
  }


  return (
    <div>
      <TopNavigation />
      <div className="userProfileDiv">
        <div className="userProfileDetails">
          <h2>
            {userDetails.firstName} {userDetails.lastName}
          </h2>
          <h3>{userDetails.email}</h3>
          <h3>{userDetails.phone}</h3>
        </div>
        <img
          className="userProfile"
          src={`http://localhost:2233/${userDetails.profilePic}`}
          alt=""
        ></img>
      </div>

      <div className="updateProfileDiv">
        <Link className="updateLink" to="/updateprofile">
          Update Profile
          <img
            className="updateIcon"
            src="./images/updateProfile.png"
            alt=""
          ></img>
        </Link>
      </div>
      
      <div className="logoutDiv">
        <Link className="logoutLink" to="/login"  onClick={()=>{
          localStorage.clear();
        }}>
          Log Out
          <img className="exitIcon" src="./images/exit.png" alt=""></img>
        </Link>
      </div>

      <div className="deleteAccountDiv">
        <Link className="deleteAccountLink" onClick={()=>{
          deleteAccount();
        }}>Delete Account <img className="deleteAccountIcon" src="./images/delete.png" alt=""></img></Link>
      </div>

      
    </div>
  );
}

export default User;
