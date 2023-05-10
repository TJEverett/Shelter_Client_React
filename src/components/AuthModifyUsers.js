import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiAuthCall, errorClear } from "../actions/index";
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

  //Redux Connection
  const customEqual = (oldValue, newValue) => oldValue === newValue;
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error, customEqual);
  
  function DoAuthCreate(event) {
    event.preventDefault();
    let attempt = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    let action = ApiAuthCall("new", attempt);
    dispatch(action);
  }
  function DoAuthDelete(event) {
    event.preventDefault();
    let attempt = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    let action = ApiAuthCall("delete", attempt);
    dispatch(action);
  }

  //Render Logic
  function RenderAlert(){
    if(errorMessage !== null){
      alert(errorMessage);
      const action = errorClear();
      dispatch(action);
    }
  }

  return(
    <React.Fragment>
      {RenderAlert()}
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