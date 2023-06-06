import React from "react";
import PropTypes from "prop-types";
import AnimalProperty from "./AnimalProperty";

class AnimalDetails extends React.Component{
  constructor(props){
    super(props);
    let animalKeyCount = Object.keys(this.props.animal).length;
    this.state = {
      animal: props.animal,
      animalKeyCount
    };
  }

  componentDidUpdate() {
    if(this.props.animal !== this.state.animal){
      const animalKeyCount = Object.keys(this.props.animal).length;
      this.setState({
        animal: this.props.animal,
        animalKeyCount
      });
    }
  };

  //Styles Functions
  StyleListTable = (rowNumber) => {
    const table = {
      display: "grid",
      gridTemplateColumns: "100%",
      gridTemplateRows: "auto ".repeat(rowNumber)
    };
    return table;
  };

  //Data Translation Functions
   BirthdayTranslate = (dateString) => {
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNumber = parseInt(dateString.substring(5, 7));
    const year = dateString.substring(0, 4);
    const month = monthArray[monthNumber];
    const day = dateString.substring(8, 10);
    const date = month + " " + day + " " + year;
    return date;
  };
  GenderTranslate = (femaleBool) => {
    return (femaleBool ? "Female" : "Male");
  }

  //Element Functions
  BuildAnimalDisplay = (animal, keysCount) => {
    const keyTitles = ["Name", "Weight", "Gender", "Birthday", "Coloring", "Description", "Breed"];
    const keyCodes = ["name", "weightKilo", "isFemale", "birthday", "coloring", "description", "breed"];
    let animalDetails = [];
    for (let i = 0; i < (keysCount - 1); i++) {
      if (i === 1) {
        animalDetails.push(
          <AnimalProperty title={keyTitles[i]} body={animal[keyCodes[i]]} key={"property" + i}/>
        );
      } else if (i === 2) {
        animalDetails.push(
          <AnimalProperty title={keyTitles[i]} body={this.GenderTranslate(animal[keyCodes[i]])} key={"property" + i}/>
        );
      } else if (i === 3) {
        animalDetails.push(
          <AnimalProperty title={keyTitles[i]} body={this.BirthdayTranslate(animal[keyCodes[i]])} key={"property" + i}/>
        );
      } else {
        animalDetails.push(
          <AnimalProperty title={keyTitles[i]} body={animal[keyCodes[i]]} key={"property" + i}/>
        );
      }
    }
    return animalDetails;
  }

  //Render Logic
  render(){
    //Return Logic
    return(
      <React.Fragment>
        <div style={this.StyleListTable(this.state.animalKeyCount)}>
          {this.BuildAnimalDisplay(this.state.animal, this.state.animalKeyCount)}
        </div>
      </React.Fragment>
    );
  };
}

AnimalDetails.defaultProps = {
  animal: {name: "Entry missing"}
}

AnimalDetails.propTypes = {
  animal: PropTypes.object
}

export default AnimalDetails;