import React from "react";
import PropTypes from "prop-types";

function SearchForm(props){
  //Styles Object
  const styles = {
    table: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      girdTemplateRows: "1fr"
    },
    center: {
      display: "flex",
      justifyContent: "center"
    }
  }

  //Element Functions
  function BuildSelect(idValue, optionsArray){
    //options array of object in form of {optionValue: "value1", displayString: "option1"} listed in order of wanted appearance
    let selectListOptions = [];
    optionsArray.forEach((entry, index) => {
      selectListOptions.push(<option key={index} value={entry.optionValue}>{entry.displayString}</option>);
    });
    const selectList = <select name={idValue} id={idValue}>{selectListOptions}</select>;
    return selectList;
  }

  function FormSubmit(event) {
    event.preventDefault();
    const submitAnimalType = event.target.animalType.value;
    const submitAnimalAge = event.target.animalAge.value;
    const submitAnimalGender = event.target.animalGender.value;
    console.log("animalType:");
    console.log(submitAnimalType);
    console.log("animalAge:");
    console.log(submitAnimalAge);
    console.log("animalGender:");
    console.log(submitAnimalGender);
    props.submitFunc(submitAnimalType, submitAnimalAge, submitAnimalGender);
  }

  //Select Arrays
  const animalAge = [
    { optionValue: "any", displayString: "Any Age" },
    { optionValue: "under", displayString: "Under 1 Year" },
    { optionValue: "over", displayString: "Over 1 Year" }
  ];
  const animalGender = [
    { optionValue: "any", displayString: "Any Gender" },
    { optionValue: "female", displayString: "Female" },
    { optionValue: "male", displayString: "Male" }
  ];

  //Return Logic
  return(
    <React.Fragment>
      <form onSubmit={FormSubmit}>
        <div style={styles.table}>
          <div style={styles.center}>
            {BuildSelect("animalType", [{ optionValue: props.animalType, displayString: props.animalType }])}
          </div>
          <div style={styles.center}>
            {BuildSelect("animalAge", animalAge)}
          </div>
          <div style={styles.center}>
            {BuildSelect("animalGender", animalGender)}
          </div>
          <div style={styles.center}>
            <button type="submit">Update Search</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
};

SearchForm.propTypes = {
  animalType: PropTypes.string,
  submitFunc: PropTypes.func
};

export default SearchForm;