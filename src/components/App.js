import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AnimalModify from "./AnimalModify";
import AuthModifyUsers from "./AuthModifyUsers";
import AuthSignIn from "./AuthSignIn";
import NavBar from "./NavBar";
import SearchResult from "./SearchResult";

function App() {
  function CheckAuth(newRoute){
    const auth = useSelector((state) => state.auth.token);
    if(auth === null){
      return(
        <Redirect to={newRoute} />
      );
    }else{
      return(null);
    }
  }

  //Return Logic
  return(
    <BrowserRouter>
      <NavBar />
      <div style={{height: "70px", width: "100vw"}}>
        <p>NavBar spacer</p>
      </div>
      <Switch>
        <Route exact path="/cats">
          <SearchResult animalType="cat" key="dogSearch" />
        </Route>
        <Route path="/cats/edit">
          {CheckAuth("/cats")}
          <AnimalModify editMode={true} species="cat" key="catEdit" />
        </Route>
        <Route path="/cats/new">
          {CheckAuth("/cats")}
          <AnimalModify editMode={false} species="cat" key="catCreate" />
        </Route>

        <Route exact path="/dogs">
          <SearchResult animalType="dog" key="dogSearch" />
        </Route>
        <Route path="/dogs/edit">
          {CheckAuth("/dogs")}
          <AnimalModify editMode={true} species="dog" key="dogEdit" />
        </Route>
        <Route path="/dogs/new">
          {CheckAuth("/dogs")}
          <AnimalModify editMode={false} species="dog" key="dogCreate" />
        </Route>

        <Route exact path="/auth">
          <AuthSignIn key="auth" />
        </Route>
        <Route path="/auth/other">
          {CheckAuth("/auth")}
          <AuthModifyUsers key="authModify" />
        </Route>

        <Route path="/">
          <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
            <h1>Animal Shelter Web App</h1>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;