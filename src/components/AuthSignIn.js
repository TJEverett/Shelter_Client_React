import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiAuthCall, errorClear} from "../actions/index";
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

  //Redux Connection
  const customEqual = (oldValue, newValue) => oldValue === newValue;
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error, customEqual);

  function DoSignIn(event){
    event.preventDefault();
    let attempt = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    let action = ApiAuthCall("login", attempt);
    dispatch(action);
  }

  //Render Logic
  function RenderAlert(){
    if(errorMessage !== null){
      alert("Failure due to: \n" + errorMessage);
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
          <AuthForm textHead="Get Authentication Token" textButton="Sign In" submitFunc={DoSignIn} />
        </div>
        <div />
      </div>
    </React.Fragment>
  );
}

export default AuthSignIn;