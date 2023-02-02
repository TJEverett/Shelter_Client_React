import React from "react";
import PropTypes from "prop-types";

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

  //Styles Object
  styles = {
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
    const keyCodes = ["name", "weightkilo", "isfemale", "birthday", "coloring", "description", "breed"];
    let animalDetails = [];
    for (let i = 0; i < (keysCount - 1); i++) {
      if (i === 1) {
        animalDetails.push(
          <div style={this.styles.columnThreeSeven}>
            <h2 style={this.styles.center}>{keyTitles[i]}</h2>
            <p style={this.styles.center}>{animal[keyCodes[i]]} Kilograms</p>
          </div>
        );
      } else if (i === 2) {
        animalDetails.push(
          <div style={this.styles.columnThreeSeven}>
            <h2 style={this.styles.center}>{keyTitles[i]}</h2>
            <p style={this.styles.center}>{this.GenderTranslate(animal[keyCodes[i]])}</p>
          </div>
        );
      } else if (i === 3) {
        animalDetails.push(
          <div style={this.styles.columnThreeSeven}>
            <h2 style={this.styles.center}>{keyTitles[i]}</h2>
            <p style={this.styles.center}>{this.BirthdayTranslate(animal[keyCodes[i]])}</p>
          </div>
        );
      } else {
        animalDetails.push(
          <div style={this.styles.columnThreeSeven}>
            <h2 style={this.styles.center}>{keyTitles[i]}</h2>
            <p style={this.styles.center}>{animal[keyCodes[i]]}</p>
          </div>
        );
      }
    }
    console.log(animalDetails);
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
        <h4 style={this.styles.center}>To adopt please contact the shelter at (XXX)-XXX-XXXX</h4>
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