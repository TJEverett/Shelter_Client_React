import React from "react";
import PropTypes from "prop-types";

function AuthForm(props) {
  //Styles Object
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "15% 70% 15%",
      gridTemplateRows: "auto"
    },
    align:{
      right: {
        display: "flex",
        justifyContent: "end"
      },
      center: {
        display: "flex",
        justifyContent: "center"
      }
    }
  };

  return(
    <React.Fragment>
      <h1 style={styles.align.center}>{props.textHead}</h1>
      <div style={styles.grid}>
        <div />
        <div>
          <form onSubmit={props.submitFunc}>
            <p style={{fontFamily: "monospace", fontSize: "125%"}}>Username:
              <input type="text"
                name="username"
                placeholder="Username"
                required={true}
                style={{ marginLeft: "2ex" }} />
            </p>
            <p style={{ fontFamily: "monospace", fontSize: "125%" }}>Password:
              <input type="password"
                name="password"
                placeholder="Password"
                required={true}
                style={{ marginLeft: "2ex" }} />
            </p>
            <div style={styles.align.right}>
              <button type="submit">{props.textButton}</button>
            </div>
          </form>
        </div>
        <div />
      </div>
    </React.Fragment>
  );
}

AuthForm.defaultProps = {
  submitFunc: () => {console.log("no function supplied to AuthForm")}
}

AuthForm.propTypes = {
  submitFunc: PropTypes.func,
  textHead: PropTypes.string,
  textButton: PropTypes.string
}

export default AuthForm;