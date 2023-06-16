import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiAuthCall, errorClear } from "../actions/index";
import AuthForm from "./AuthForm";
import ErrorModal from "./ErrorModal";

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
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
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
  function ClearError(){
    const action = errorClear();
    dispatch(action);
  }

  //Render Logic
  let modalBlock = <div />
  let modalContents = [];
  let modalMode = true;

  if(errorMessage !== null){
    if(typeof errorMessage === "string"){
      modalContents.push(<h2 key={"h2Tag1"}>Server Message:</h2>);
      modalContents.push(<h3 key={"h3Tag1"}>{errorMessage}</h3>);
      modalContents.push(<div style={styles.center} key={"clearButton1"}><button onClick={ClearError}>Clear</button></div>);
      modalMode = false;
    }else{
      modalContents.push(<h2 key={"h2Tag2"}>ERROR: {errorMessage.message}</h2>);
      modalContents.push(<div style={styles.center} key={"clearButton2"}><button onClick={ClearError}>Clear</button></div>);
    }
    modalBlock = <ErrorModal show={true} handleClose={ClearError} errorMode={modalMode} >
      <div style={{...styles.center, ...{flexDirection: "column"}}}>
        {modalContents}
      </div>
    </ErrorModal>
  }

  return(
    <React.Fragment>
      {modalBlock}
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