import React from "react";
import PropTypes from "prop-types";

function ErrorModal(props) {
  const styles = {
    base: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)"
    },
    internal: {
      position: "fixed",
      background: "white",
      width: "60vw",
      height: "60vh",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    exit: {
      positioning: {
        display: "flex",
        position: "fixed",
        width: "100%",
        height: "2.5em",
        justifyContent: "right"
      },
      button: {
        fontSize: "2em",
        width: "1.5em",
        fontFamily: "monospace",
        background: "red"
      }
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      height: "100%"
    }
  }

  const modalOuterStyle = props.show ? { ...styles.base, display: "block" } : { ...styles.base, display: "none" };

  return (
    <div style={modalOuterStyle}>
      <section style={styles.internal}>
        <div style={styles.exit.positioning}>
          <button type="button" style={styles.exit.button} onClick={() => props.handleClose()}>X</button>
        </div>
        <div style={styles.center}>
          {props.children}
        </div>
      </section>
    </div>
  );
}


ErrorModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.any
};

export default ErrorModal;