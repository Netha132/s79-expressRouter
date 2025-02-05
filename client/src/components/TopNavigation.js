import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();

  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  useEffect(() => {
    if (userDetails && userDetails.email) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <nav className="navBar">
      <Link className="navLink" to="/dashboard">
        Dashboard
      </Link>
      <Link className="navLink" to="/reports">
        Reports
      </Link>
      <Link className="navLink" to="/projects">
        Projects
      </Link>
      <Link className="navLink" to="/user">
        User
      </Link>
    </nav>
  );
}

export default TopNavigation;
