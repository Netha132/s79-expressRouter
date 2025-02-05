import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="imageContainer">
      <img src="/images/veravogueLogo.png" alt="Vera Vogue Logo" className="backgroundImage" />
      <div className="buttonContainer">
        <Link className="overlayButton" to="/login"> Register</Link>
        {/* <button className="overlayButton">Button 2</button> */}
        {/* <button className="overlayButton">Button 3</button> */}
      </div>
    </div>
  );
}

export default Main;
