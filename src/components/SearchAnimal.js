import React from "react";
import PropTypes from "prop-types";

function SearchAnimal(props){
  //Styles Object
  const styles = {
    table: {
      display: "grid",
      gridTemplateColumns: "9fr 9fr 9fr 9fr 14fr",
      girdTemplateRows: "1fr"
    },
    center: {
      display: "flex",
      justifyContent: "center"
    }
  }

  //Element Functions
  function BirthdayTranslate(dateString){
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNumber = parseInt(dateString.substring(5, 7)) - 1;
    const year = dateString.substring(0,4);
    const month = monthArray[monthNumber];
    const day = dateString.substring(8, 10);
    const date = month + " " + day + " " + year;
    return date;
  };
  function GenderTranslate(femaleBool){
    return(femaleBool ? "Female" : "Male");
  }

  //Return Logic
  return(
    <React.Fragment>
      <div style={styles.table}>
        <div style={styles.center}>
          <h3>{props.animalName}</h3>
        </div>
        <div style={styles.center}>
          <h3>{GenderTranslate(props.animalFemale)}</h3>
        </div>
        <div style={styles.center}>
          <h3>{BirthdayTranslate(props.animalBirthday)}</h3>
        </div>
        <div style={styles.center}>
          <h3>{props.animalWeight} Kilograms</h3>
        </div>
        <div style={styles.center}>
          <h4><button onClick={props.animalModal}>More<br/>Information</button></h4>
        </div>
      </div>
    </React.Fragment>
  );
}

SearchAnimal.propTypes = {
  animalName: PropTypes.string,
  animalFemale: PropTypes.bool,
  animalBirthday: PropTypes.string,
  animalWeight: PropTypes.number,
  animalModal: PropTypes.func
};

export default SearchAnimal;