import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AnimalModify from "./AnimalModify";
import NavBar from "./NavBar";
import SearchResult from "./SearchResult";

function App() {
  //Temp Values
  // const authStatus = null;
  const authStatus = "1hr 52min";
  const animalArray = [
    {
      id: "c1",
      name: "Taz",
      weightkilo: 5.5,
      isfemale: false,
      birthday: "2017-09-08T19:01:55",
      coloring: "black",
      description: "indoor / outdoor"
    },
    {
      id: "c2",
      name: "Phantom",
      weightkilo: 2.5,
      isfemale: true,
      birthday: "2022-09-08T19:01:55",
      coloring: "black",
      description: "indoor"
    },
    {
      id: "c3",
      name: "Sasha",
      weightkilo: 5.1,
      isfemale: true,
      birthday: "2017-09-08T19:01:55",
      coloring: "grey striped",
      description: "indoor"
    },
    {
      id: "c4",
      name: "Tigger",
      weightkilo: 4.3,
      isfemale: false,
      birthday: "2022-09-08T19:01:55",
      coloring: "grey striped",
      description: "indoor"
    },
    {
      id: "d1",
      name: "Ceres",
      weightkilo: 99.3,
      isfemale: false,
      birthday: "2017-09-08T19:01:55",
      coloring: "blonde",
      description: "known as Littles",
      breed: "English Mastiff"
    },
    {
      id: "d2",
      name: "Cali",
      weightkilo: 23.4,
      isfemale: true,
      birthday: "2022-09-08T19:01:55",
      coloring: "black",
      description: "meth lab",
      breed: "Mutt"
    },
    {
      id: "d3",
      name: "Elsa",
      weightkilo: 24.3,
      isfemale: true,
      birthday: "2017-09-08T19:01:55",
      coloring: "black with brown highlights",
      description: "allergic to food",
      breed: "Doberman"
    },
    {
      id: "d4",
      name: "Lowkey",
      weightkilo: 27.5,
      isfemale: false,
      birthday: "2022-09-08T19:01:55",
      coloring: "black / blonde",
      description: "tries to eat playmates",
      breed: "German Shepard"
    }
  ] //Will be replaced by API

  //Return Logic
  return(
    <BrowserRouter>
      <NavBar authStatus={authStatus}/>
      <div style={{height: "90px", width: "100vh"}}>
        <p>NavBar spacer</p>
      </div>
      <Switch>
        <Route exact path="/cats">
          <SearchResult animalType="cat" animalList={animalArray} />
        </Route>
        <Route path="/cats/edit">
          <AnimalModify editMode={true} species="cat" animal={animalArray[0]} />
        </Route>
        <Route path="/cats/new">
          <AnimalModify editMode={false} species="cat" />
        </Route>

        <Route exact path="/dogs">
          <SearchResult animalType="dog" animalList={animalArray} />
        </Route>
        <Route path="/dogs/edit">
          <AnimalModify editMode={true} species="dog" animal={animalArray[4]} />
        </Route>
        <Route path="/dogs/new">
          <AnimalModify editMode={false} species="dog" />
        </Route>

        <Route exact path="/auth">
          <p>Sign in / Re-Sign in</p>
        </Route>
        <Route path="/auth/end">
          {/* log out function fires here */}
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth/other">
          <p>Account Modify</p>
        </Route>

        <Route path="/">
          <h2 style={{height: "300vh"}}>default path</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;