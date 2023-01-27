import React from "react";
import PropTypes from "prop-types";
import SearchForm from "./SearchForm";
import SearchAnimal from "./SearchAnimal";
import CustomModal from "./CustomModal";

class SearchResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animalType: props.animalType,
      animalList: [],
      animalSelected: null
    };
  }

  componentDidUpdate() {
    if(this.props.animalType !== this.state.animalType){
      this.setState({animalType: this.props.animalType, animalList: []});
    }
  }

  //Testing Function
  filterSearch = (animalType, ageCompare, gender) => { //To be replaced by calls to database
    let newAnimalList = [];
    if(animalType === "dog"){
      newAnimalList = this.props.animalList.filter(animal => animal.id.charAt(0) === "d");
    } else if(animalType === "cat"){
      newAnimalList = this.props.animalList.filter(animal => animal.id.charAt(0) === "c");
    }
    if(ageCompare === "under"){
      newAnimalList = newAnimalList.filter(animal => animal.birthday.substring(0, 4) === "2022");
    } else if(ageCompare === "over"){
      newAnimalList = newAnimalList.filter(animal => animal.birthday.substring(0, 4) !== "2022");
    } //else all animals continue
    if(gender === "female"){
      newAnimalList = newAnimalList.filter(animal => animal.isfemale === true);
    } else if(gender ==="male"){
      newAnimalList = newAnimalList.filter(animal => animal.isfemale === false);
    } //else all animals continue
    console.log(newAnimalList);
    this.setState({animalList: newAnimalList});
  }

  //Modal Functions
  ModalShow = (animalId) => {
    this.setState({animalSelected: animalId});
  }
  ModalHide = () => {
    this.setState({animalSelected: null});
  }


  //Render Logic
  render() {
    let animalModal = null;
    let modalContent = [];
    if(this.state.animalSelected !== null){
      modalContent.push(<h1>Test</h1>);
      modalContent.push(<button type="button" onClick={() => console.log("edit:", this.state.animalSelected)}>Edit</button>);
      animalModal = (
        <CustomModal show={true} handleClose={this.ModalHide}>{modalContent}</CustomModal>
      );
    }

    return(
      <React.Fragment>
        {animalModal}
        <SearchForm animalType={this.state.animalType} submitFunc={this.filterSearch} />
        <hr />
        {this.state.animalList.map((animal) => {
          return (<SearchAnimal animalName={animal.name}
            animalFemale={animal.isfemale}
            animalBirthday={animal.birthday}
            animalWeight={animal.weightkilo}
            // animalModal={() => console.log("animal: " + animal.id)}
            animalModal={() => this.ModalShow(animal.id)}
            key={animal.id} />)
        })}
      </React.Fragment>
    );
  }
}

SearchResult.propTypes = {
  animalType: PropTypes.string,
  animalList: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResult;