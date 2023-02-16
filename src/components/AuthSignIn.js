import React from "react";
import AuthForm from "./AuthForm";

function AuthSignIn(){
  //Styles Object
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "20% 60% 20%",
      gridTemplateRows: "auto"
    },
    borderBubble: {
      border: "3px solid black",
      borderRadius: "50px",
      margin: "20px",
      padding: "10px"
    }
  };

  function DoSignIn(event){
    event.preventDefault();
    let attempt = {};
    attempt.username = event.target.username.value;
    attempt.password = event.target.password.value;
    console.log("User Login Credentials:");
    console.log(attempt);
  }

  return(
    <React.Fragment>
      <div style={styles.grid}>
        <div />
        <div style={styles.borderBubble}>
          <AuthForm textHead="Get Authentication Token" textButton="Sign In" submitFunc={DoSignIn} />
        </div>
        <div />
      </div>
    </React.Fragment>
  );
}

export default AuthSignIn;