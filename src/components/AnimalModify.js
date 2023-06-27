import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ApiCatsCall, ApiDogsCall, ApiObjectCall, errorClear, animalObjectClear } from "../actions/index";
import CustomModal from "./CustomModal";
import AnimalDetails from "./AnimalDetails";
import AnimalCreateForm from "./AnimalCreateForm";
import ErrorModal from "./ErrorModal";

class AnimalModify extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edit: props.editMode,
      species: props.species,
      createCounter: 0,
      attemptDelete: false
    };
  }

  //Lifecycle Functions
  componentDidUpdate(prevProps) {
    if((this.props !== prevProps) && (this.props.error === null)){
      // console.log(prevProps);
      this.setState((prevState) => ({
        edit: this.props.editMode,
        species: this.props.species,
        createCounter: (prevState.createCounter + 1)
      }));
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    const action = animalObjectClear();
    dispatch(action);
  }

  //Redux Functions
  ClearError = () => {
    const { dispatch } = this.props;
    const action = errorClear();
    dispatch(action);
  }
  AnimalUpdate = () => {
    const animalId = this.props.animalSelected[`${this.state.species}Id`];
    const { dispatch } = this.props;
    const action = ApiObjectCall(this.state.species, animalId);
    dispatch(action);
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
      weightKilo: parseFloat(event.target.weight.value),
      isFemale: (event.target.isFemale.value.toLowerCase() === "true"),
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
    const { dispatch } = this.props;
    const animal = this.CompileCat(event);
    let action = ApiCatsCall("post", animal);
    dispatch(action);
    this.resetCreateForm();
  }
  CreateDog = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const animal = this.CompileDog(event);
    let action = ApiDogsCall("post", animal);
    dispatch(action);
    this.resetCreateForm();
  }

  EditCat = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    let animal = this.CompileCat(event);
    animal.catId = this.props.animalSelected[`${this.state.species}Id`];
    let action = ApiCatsCall("put", animal);
    dispatch(action);
  }
  EditDog = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    let animal = this.CompileDog(event);
    animal.dogId = this.props.animalSelected[`${this.state.species}Id`];
    let action = ApiDogsCall("put", animal);
    dispatch(action);
  }

  DeleteCat = () => {
    const { dispatch } = this.props;
    const animal = { catId: this.props.animalSelected[`${this.state.species}Id`] };
    let action = ApiCatsCall("delete", animal);
    dispatch(action);
    this.ModalHide();
  }
  DeleteDog = () => {
    const { dispatch } = this.props;
    const animal = { dogId: this.props.animalSelected[`${this.state.species}Id`] };
    let action = ApiDogsCall("delete", animal);
    dispatch(action);
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
      },
      table: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr"
      },
    }

    //Return Logic
    if((this.props.error !== null) || (this.state.attemptDelete === true)){ //Error Modal and Delete Modal Blocks
      const isErrorBool = (this.props.error !== null);
      let errorModalContents = [];
      let deleteAnimal = () => { console.log("Error in selected animal") };

      if(isErrorBool){
        if(typeof this.props.error === "string"){
          errorModalContents.push(<h2 key={"h2Tag1"}>Server Message:</h2>);
          errorModalContents.push(<h3 key={"h3Tag1"}>{this.props.error}</h3>);
          errorModalContents.push(<div style={styles.center} key={"clearButton1"}><button onClick={this.ClearError}>Clear</button></div>);
        }else{
          errorModalContents.push(<h2 key={"h2Tag2"}>ERROR: {this.props.error.message}</h2>);
          errorModalContents.push(<div style={styles.center} key={"clearButton2"}><button onClick={this.ClearError}>Clear</button></div>);
        }
      }

      if (this.state.species === "cat") {
        deleteAnimal = this.DeleteCat;
      } else if (this.state.species === "dog") {
        deleteAnimal = this.DeleteDog;
      }

      return(
        <React.Fragment>
          <ErrorModal show={isErrorBool} handleClose={this.ClearError} >
            <div style={{...styles.center, ...{flexDirection: "column"}}}>
              {errorModalContents}
            </div>
          </ErrorModal>
          <CustomModal show={this.state.attemptDelete} handleClose={this.ModalHide}>
            <h1 style={styles.center}>Are you sure you want to delete this animal from the database?</h1>
            <div style={styles.center}>
              <button onClick={deleteAnimal}>Confirm Delete</button>
              <button onClick={this.ModalHide}>Cancel Delete</button>
            </div>
          </CustomModal>
        </React.Fragment>
      );
    }
    if(this.state.edit === true && this.props.animalSelected.name === undefined){ //Redirect Block
      return(
        <Redirect to={`/${this.state.species}s`}/>
      )
    }
    if((this.state.edit === false) || (this.props.animalSelected.name === undefined)){ //Create View Block
      let saveAnimal = () => {console.log("Error in selected animal")};
      if (this.state.species === "cat") {
        saveAnimal = this.CreateCat;
      } else if (this.state.species === "dog") {
        saveAnimal = this.CreateDog;
      }
    
      return(
        <React.Fragment>
          <AnimalCreateForm key={this.state.createCounter} species={this.state.species} submitFunc={saveAnimal} />
        </React.Fragment>
      );
    }
    if(this.state.edit === true){ //Edit View Block
      let submitAnimal = () => { console.log("Error in selected animal") };
      let animalDetailsButtons = [];
      let animalDetailsBuild = [];
      let animalDetailDisplay = null;

      if (this.state.species === "cat") {
        submitAnimal = this.EditCat;
      } else if (this.state.species === "dog") {
        submitAnimal = this.EditDog;
      }
      animalDetailsButtons.push(<div key="deleteButton" style={styles.center}><button style={{backgroundColor: "red"}} onClick={this.ModalShow}>Delete</button></div>)
      animalDetailsButtons.push(<div key="refreshButton" style={styles.center}><button onClick={this.AnimalUpdate}>Refresh</button></div>)
      animalDetailsBuild.push(<AnimalDetails key="details" animal={this.props.animalSelected} />);
      animalDetailsBuild.push(<div style={styles.table} key="buttons">{animalDetailsButtons}</div>);
      animalDetailDisplay = <div style={styles.borderBubble}>{animalDetailsBuild}</div>

      return(
        <React.Fragment>
          <div style={styles.borderBubble}>
            <h1 style={styles.center}>Update Form</h1>
            <AnimalCreateForm key={this.state.createCounter} species={this.state.species} animal={this.props.animalSelected} submitFunc={submitAnimal} />
          </div>
          {animalDetailDisplay}
        </React.Fragment>
      );
    }
  }
}

AnimalModify.defaultProps = {
  editMode: false
}

AnimalModify.propTypes = {
  editMode: PropTypes.bool,
  species: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    animalSelected: state.animalObject,
    error: state.error
  }
}

export default connect(mapStateToProps)(AnimalModify);