import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ApiArrayCall, ApiObjectCall, animalArrayClear, animalObjectClear } from "../actions/index";
import SearchForm from "./SearchForm";
import SearchAnimal from "./SearchAnimal";
import CustomModal from "./CustomModal";
import AnimalDetails from "./AnimalDetails";
import { Redirect } from "react-router-dom";

class SearchResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animalType: props.animalType,
      redirectEdit: false
    };
  }

  //Component Lifecycle
  componentDidUpdate() {
    if(this.props.animalType !== this.state.animalType){
      this.setState({animalType: this.props.animalType, animalList: []});
      const { dispatch } = this.props;
      const action = animalArrayClear();
      dispatch(action);
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    const action = animalArrayClear();
    dispatch(action);
  }

  //State Functions
  redirectToEdit = () => {
    this.setState({redirectEdit: true});
  }

  //Redux Function
  apiSearchArray = (animalType, ageCompare, gender) => {
    const { dispatch } = this.props;
    let data = {
      animalAge: ageCompare,
      animalGender: gender
    };
    let actionCall = { type: null }; //Blank default action

    if (animalType === "dog"){ actionCall = ApiArrayCall("dog", data) }
    else if (animalType === "cat"){ actionCall = ApiArrayCall("cat", data) };
    dispatch(actionCall);
  }
  apiSearchSingle = (animalId) => {
    const { dispatch } = this.props;
    const action = ApiObjectCall(this.state.animalType, animalId);
    dispatch(action);
  }
  clearSingle = () => {
    const { dispatch } = this.props;
    const action = animalObjectClear();
    dispatch(action);
  }

  //Render Logic
  render() {
    let animalModal = null;
    let modalTag = [];
    if(this.props.animalSelected.name !== undefined){
      if(this.props.auth){
        modalTag.push(<button type="button" onClick={this.redirectToEdit}>Edit</button>);
      }else{
        modalTag.push(<h4>To adopt please contact the shelter at (XXX)-XXX-XXXX</h4>);
      }
      animalModal = (
        <CustomModal show={true} handleClose={this.clearSingle}>
          <AnimalDetails animal={this.props.animalSelected}/>
          <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            {modalTag}
          </div>
        </CustomModal>
      );
    }

    if(this.state.redirectEdit){
      return(
        <Redirect to={`${this.state.animalType}s/edit`} />
      );
    }else{
      return(
        <React.Fragment>
          {animalModal}
          <SearchForm animalType={this.state.animalType} submitFunc={this.apiSearchArray} />
          <hr />
          {this.props.animalList.map((animal) => {
            return (<SearchAnimal animalName={animal.name}
              animalFemale={animal.isFemale}
              animalBirthday={animal.birthday}
              animalWeight={animal.weightKilo}
              animalModal={() => this.apiSearchSingle(animal[`${this.state.animalType}Id`])}
              key={animal[`${this.state.animalType}Id`]} />)
          })}
        </React.Fragment>
      );
    }
  }
}

SearchResult.propTypes = {
  animalType: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    animalList: state.animalArray,
    animalSelected: state.animalObject,
    auth: (state.auth.token !== null)
  }
}

SearchResult = connect(mapStateToProps)(SearchResult);

export default SearchResult;