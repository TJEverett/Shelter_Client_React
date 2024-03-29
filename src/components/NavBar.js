import React from "react";
import "../CSS/DropMenu.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authClear } from "../actions/index";

function NavBar(){
  //Styles Object
  const styles = {
    general: {
      position: "fixed",
      top: "0",
      width: "100vw",
      height: "70px"
    },
    table: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr"
    },
    coloring: {
      backgroundColor: "lightGrey",
      color: "black"
    }
  };

  //Redux Interaction
  const customEqual = (oldValue, newValue) => oldValue === newValue;
  const authMinutes = useSelector((state) => state.auth.timeRemaining, customEqual);
  const dispatch = useDispatch();

  function Logout() {
    const action = authClear();
    dispatch(action);
  }

  //Return Logic
  if(authMinutes === null){
    return(
      <div style={{ ...styles.general, ...styles.coloring }}>
        <div style={styles.table}>
          <div />
          <div className="dropdown">
            <button className="dropButton" style={styles.coloring}>Cats</button>
            <div className="dropdown-content">
              <Link to="/cats" style={styles.coloring}>View Available</Link>
            </div>
          </div>
          <div className="dropdown" style={styles.coloring}>
            <button className="dropButton" style={styles.coloring}>Dogs</button>
            <div className="dropdown-content" style={styles.coloring}>
              <Link to="/dogs" style={styles.coloring}>View Available</Link>
            </div>
          </div>
          <div className="dropdown" style={styles.coloring}>
            <button className="dropButton" style={styles.coloring}>Auth: Null</button>
            <div className="dropdown-content" style={styles.coloring}>
              <Link to="/auth" style={styles.coloring}>Log In</Link>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ ...styles.general, ...styles.coloring}}>
        <div style={styles.table}>
          <div />
          <div className="dropdown">
            <button className="dropButton" style={styles.coloring}>Cats</button>
            <div className="dropdown-content">
              <Link to="/cats" style={styles.coloring}>View Available</Link>
              <Link to="/cats/new" style={styles.coloring}>Create</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropButton" style={styles.coloring}>Dogs</button>
            <div className="dropdown-content">
              <Link to="/dogs" style={styles.coloring}>View Available</Link>
              <Link to="/dogs/new" style={styles.coloring}>Create</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropButton" style={styles.coloring}>Auth: {authMinutes} Minutes</button>
            <div className="dropdown-content">
              <Link to="/auth" style={styles.coloring}>Renew Auth</Link>
              <Link to="/auth/other" style={styles.coloring}>Create User</Link>
              <Link to="/auth/other" style={styles.coloring}>Delete User</Link>
              <Link to="/auth" style={styles.coloring} onClick={Logout}>Log Out</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default NavBar;