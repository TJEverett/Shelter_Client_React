import React from "react";
import AuthForm from "./AuthForm";

function AuthModifyUsers(){
  //Styles Object
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "10% 40% 40% 10%",
      gridTemplateRows: "auto"
    },
    borderBubble: {
      border: "3px solid black",
      borderRadius: "50px",
      margin: "20px",
      padding: "10px"
    }
  };
  
  function DoAuthCreate(event) {
    event.preventDefault();
    let attempt = {};
    attempt.username = event.target.username.value;
    attempt.password = event.target.password.value;
    console.log("Create User Login Credentials:");
    console.log(attempt);
  }
  function DoAuthDelete(event) {
    event.preventDefault();
    let attempt = {};
    attempt.username = event.target.username.value;
    attempt.password = event.target.password.value;
    console.log("Delete User Login Credentials:");
    console.log(attempt);
  }

  return(
    <React.Fragment>
      <div style={styles.grid}>
        <div />
        <div style={styles.borderBubble}>
          <AuthForm textHead="Create New Auth Credentials" textButton="Create" submitFunc={DoAuthCreate} key="Create" />
        </div>
        <div style={styles.borderBubble}>
          <AuthForm textHead="Delete Auth Credentials" textButton="Delete" submitFunc={DoAuthDelete} key="Delete" />
        </div>
        <div />
      </div>
    </React.Fragment>
  );
}

export default AuthModifyUsers;