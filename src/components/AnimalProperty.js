import React from "react";
import PropTypes from "prop-types";

function AnimalProperty(props){
  //Styles Object
  const styles = {
    columnThreeSeven: {
      display: "grid",
      gridTemplateColumns: "30% 70%",
      gridTemplateRows: "100%"
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    }
  };

  return(
    <React.Fragment>
      <div style={styles.columnThreeSeven}>
        <h2 style={styles.center}>{props.title}</h2>
        <p style={styles.center}>{props.body}</p>
      </div>
    </React.Fragment>
  )
}

AnimalProperty.propTypes = {
  title: PropTypes.string,
  body: PropTypes.any
}

export default AnimalProperty;