import React from "react";
import PropTypes from "prop-types";

function CustomModal(props) {
  const styles ={
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
      width: "80%",
      height: "auto",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    exit: {
      positioning: {
        display: "flex",
        width: "100%",
        justifyContent: "right"
      },
      button: {
        fontSize: "2em",
        fontFamily: "monospace",
        background: "red"
      }
    }
  }

  const modalStyle = props.show ? { ...styles.base, display: "block" } : { ...styles.base, display: "none" };

  return (
    <div style={modalStyle}>
      <section style={styles.internal}>
        <div style={styles.exit.positioning}>
          <button type="button" style={styles.exit.button} onClick={() => props.handleClose()}>X</button>
        </div>
        {props.children}
      </section>
    </div>
  );
}

CustomModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.any
};

export default CustomModal;