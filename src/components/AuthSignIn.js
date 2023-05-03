import React from "react";
import { useDispatch } from "react-redux";
import { ApiAuthCall } from "../actions/index";
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

  const dispatch = useDispatch();

  function DoSignIn(event){
    event.preventDefault();
    let attempt = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    let action = ApiAuthCall("login", attempt);
    dispatch(action);
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