import React from "react";
import "../CSS/DropMenu.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavBar(props){
  //Styles Object
  const styles = {
    general: {
      position: "fixed",
      backgroundColor: "white",
      top: "0",
      width: "100vw",
      height: "86px"
    },
    table: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      girdTemplateRows: "1fr"
    }
  };

  //Return Logic
  if(props.authStatus === null){
    return(
      <div style={styles.general}>
        <div style={styles.table}>
          <div />
          <div className="dropdown">
            <button className="dropButton">Cats</button>
            <div className="dropdown-content">
              <Link to="/cats">View Available</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropButton">Dogs</button>
            <div className="dropdown-content">
              <Link to="/dogs">View Available</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropButton">Auth: Null</button>
            <div className="dropdown-content">
              <Link to="/auth">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={styles.general}>
        <div style={styles.table}>
          <div />
          <div className="dropdown">
            <button className="dropButton">Cats</button>
            <div className="dropdown-content">
              <Link to="/cats">View Available</Link>
              <Link to="/cats/new">Create</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropButton">Dogs</button>
            <div className="dropdown-content">
              <Link to="/dogs">View Available</Link>
              <Link to="/dogs/new">Create</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropButton">Auth: {props.authStatus}</button>
            <div className="dropdown-content">
              <Link to="/auth">Renew Auth</Link>
              <Link to="/auth/other">Create User</Link>
              <Link to="/auth/other">Delete User</Link>
              <Link to="/auth/end">Log Out</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

NavBar.propTypes = {
  authStatus: PropTypes.string
}

export default NavBar;