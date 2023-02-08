import React from "react";
import PropTypes from "prop-types";
import CustomModal from "./CustomModal";
import AnimalDetails from "./AnimalDetails";
import AnimalCreateForm from "./AnimalCreateForm";

class AnimalModify extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edit: props.editMode,
      species: props.species,
      animal: props.animal,
      createCounter: 0
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.setState({
        edit: this.props.editMode,
        species: this.props.species,
        animal: this.props.animal
      });
    }
  }

  //Submit Functions
  resetCreateForm = () => {
    const newCount = this.state.createCounter + 1;
    this.setState({createCounter: newCount})
  }

  CompileCat = (event) => {
    const birthday = event.target.birthday.value + "T00:00:00";
    let animal = {
      name: event.target.name.value,
      weightkilo: parseFloat(event.target.weight.value),
      isfemale: event.target.isFemale.value,
      birthday: birthday,
      coloring: event.target.coloring.value,
      description: event.target.description.value
    };
    return animal;
  }
  CompileDog = (event) => {
    let animal = this.CompileCat(event);
    animal.breed = event.target.breed.value;
    return animal;
  }

  CreateCat = (event) => {
    event.preventDefault();
    const animal = this.CompileCat(event);
    console.log("Creating Cat");
    console.log(animal);
    this.resetCreateForm();
  }
  CreateDog = (event) => {
    event.preventDefault();
    const animal = this.CompileDog(event);
    console.log("Creating Dog");
    console.log(animal);
    this.resetCreateForm();
  }

  EditCat = (event) => {
    event.preventDefault();
    const animal = this.CompileCat(event);
    console.log("Editing Cat with ID: " + this.state.animal.id);
    console.log(animal);
    this.resetCreateForm();
  }
  EditDog = (event) => {
    event.preventDefault();
    const animal = this.CompileDog(event);
    console.log("Editing Dog with ID: " + this.state.animal.id);
    console.log(animal);
    this.resetCreateForm();
  }

  DeleteCat = () => {
    console.log("Delete Cat with ID: " + this.state.animal.id);
    this.ModalHide();
  }
  DeleteDog = () => {
    console.log("Delete Dog with ID: " + this.state.animal.id);
    this.ModalHide();
  }

  //Modal Functions
  ModalShow = () => {
    this.setState({attemptDelete: true});
  }
  ModalHide = () => {
    this.setState({attemptDelete: false});
  }

  //Render Logic
  render(){
    //Styles Object
    const styles = {
      center: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
      },
      borderBubble: {
        border: "3px solid black",
        borderRadius: "50px",
        margin: "20px",
        padding: "10px"
      }
    }

    let deleteAnimal = () => {console.log("Error in selected animal")};
    let submitAnimal = () => {console.log("Error in selected animal")};
    let animalDetails = [];
    if(this.state.species === "cat"){
      deleteAnimal = this.DeleteCat;
      if(this.state.edit === true){
        submitAnimal = this.EditCat;
      }else{
        submitAnimal = this.CreateCat;
      }
    }else if(this.state.species === "dog"){
      deleteAnimal = this.DeleteDog;
      if(this.state.edit === true){
        submitAnimal = this.EditDog;
      }else{
        submitAnimal = this.CreateDog;
      }
    }
    if(this.state.edit === true){
      animalDetails.push(<AnimalDetails key="details" animal={this.state.animal} />);
      animalDetails.push(<div key="deleteButton" style={styles.center}><button onClick={this.ModalShow}>Delete</button></div>);
    }

    return(
      <React.Fragment>
        <CustomModal show={this.state.attemptDelete} handleClose={this.ModalHide}>
          <h1 style={styles.center}>Are you sure you want to delete this animal from the database?</h1>
          <div style={styles.center}>
            <button onClick={deleteAnimal}>Confirm Delete</button>
            <button onClick={this.ModalHide}>Cancel Delete</button>
          </div>
        </CustomModal>
        <div style={styles.borderBubble}>
          <AnimalCreateForm key={this.state.createCounter} species={this.state.species} animal={this.state.animal} submitFunc={submitAnimal} />
        </div>
        <div style={styles.borderBubble}>
          {animalDetails}
        </div>
      </React.Fragment>
    );
  }
}

AnimalModify.defaultProps = {
  editMode: false
}

AnimalModify.propTypes = {
  editMode: PropTypes.bool,
  species: PropTypes.string,
  animal: PropTypes.object
}

export default AnimalModify;