import React from "react";
import PropTypes from "prop-types";
import SearchForm from "./SearchForm";

class SearchResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animalType: props.animalType,
      animalList: []
    };
  }

  componentDidUpdate() {
    if(this.props.animalType !== this.state.animalType){
      this.setState({animalType: this.props.animalType});
    }
  }



  //Render Logic
  render() {
    return(
      <React.Fragment>
        <SearchForm animalType={this.state.animalType} />
      </React.Fragment>
    );
  }
}

SearchResult.propTypes = {
  animalType: PropTypes.string,
  animalList: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResult;