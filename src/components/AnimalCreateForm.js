import React from "react";
import PropTypes from "prop-types";

function AnimalCreateForm(props){
  //Styles Object
  const styles = {
    columnFiveFive: {
      display: "grid",
      gridTemplateColumns: "50% 50%",
      gridTemplateRows: "100%"
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    }
  };

  //Styles Functions
  function StyleListTable(rowNumber){
    const table = {
      display: "grid",
      gridTemplateColumns: "100%",
      gridTemplateRows: "auto ".repeat(rowNumber)
    };
    return table;
  };

  //Data Translation Functions
  function BirthdayTranslate(dateString){
    const month = dateString.substring(5, 7);
    const year = dateString.substring(0, 4);
    const day = dateString.substring(8, 10);
    const date = year + "-" + month + "-" + day;
    return date;
  };

  //Element Functions
  function BuildGenderSelector(isFemale){
    let options = [];
    if(isFemale === false){
      options.push(<option key="male" value={false} defaultValue={true}>Male</option>);
      options.push(<option key="female" value={true}>Female</option>);
    }else{
      options.push(<option key="male" value={false}>Male</option>);
      options.push(<option key="female" value={true} defaultValue={true}>Female</option>);
    }
    return(<select name="isFemale">{options}</select>);
  }

  //Return Logic
  if(props.species === "cat"){
    return (
      <React.Fragment>
        <form onSubmit={props.submitFunc}>
          <div style={StyleListTable(6)}>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Name</h2>
              </div>
              <div>
                <input type="text"
                  name="name"
                  required={true}
                  defaultValue={props.animal.name} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Weight</h2>
              </div>
              <div>
                <input type="number"
                  name="weight"
                  min={0}
                  step={0.1}
                  defaultValue={props.animal.weightkilo} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Gender</h2>
              </div>
              <div>
                {BuildGenderSelector(props.animal.isfemale)}
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Birthday</h2>
              </div>
              <div>
                <input type="date"
                  name="birthday"
                  defaultValue={BirthdayTranslate(props.animal.birthday)} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Coloring</h2>
              </div>
              <div>
                <input type="text"
                  name="coloring"
                  required={true}
                  defaultValue={props.animal.coloring} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Description</h2>
              </div>
              <div>
                <input type="text"
                  name="description"
                  required={true}
                  defaultValue={props.animal.description} />
              </div>
            </div>
          </div>
          <div style={styles.center}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
  if(props.species === "dog"){
    return (
      <React.Fragment>
        <form onSubmit={props.submitFunc}>
          <div style={StyleListTable(6)}>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Name</h2>
              </div>
              <div>
                <input type="text"
                  name="name"
                  required={true}
                  defaultValue={props.animal.name} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Weight</h2>
              </div>
              <div>
                <input type="number"
                  name="weight"
                  min={0}
                  step={0.1}
                  defaultValue={props.animal.weightkilo} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Gender</h2>
              </div>
              <div>
                {BuildGenderSelector(props.animal.isfemale)}
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Birthday</h2>
              </div>
              <div>
                <input type="date"
                  name="birthday"
                  defaultValue={BirthdayTranslate(props.animal.birthday)} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Coloring</h2>
              </div>
              <div>
                <input type="text"
                  name="coloring"
                  required={true}
                  defaultValue={props.animal.coloring} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Description</h2>
              </div>
              <div>
                <input type="text"
                  name="description"
                  required={true}
                  defaultValue={props.animal.description} />
              </div>
            </div>
            <div style={styles.columnFiveFive}>
              <div style={styles.center}>
                <h2>Breed</h2>
              </div>
              <div>
                <input type="text"
                  name="breed"
                  required={true}
                  defaultValue={props.animal.breed} />
              </div>
            </div>
          </div>
          <div style={styles.center}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

AnimalCreateForm.defaultProps = {
  animal: {name: "", weightkilo: 0, isfemale: false, birthday: "2000-01-01T0:00:00", coloring: "", description: "", breed: ""},
  submitFunc: () => {console.log("No submitFunc given to AnimalCreateForm")}
}

AnimalCreateForm.propTypes = {
  animal: PropTypes.object,
  species: PropTypes.string,
  submitFunc: PropTypes.func
}

export default AnimalCreateForm;