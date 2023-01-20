import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  //Temp Values
  // const authStatus = null;
  const authStatus = "1hr 52min";

  //Return Logic
  return(
    <BrowserRouter>
      <NavBar authStatus={authStatus}/>
      <div style={{height: "90px", width: "100vh"}}>
        <p>NavBar spacer</p>
      </div>
      <Switch>
        <Route exact path="/cats">
          <p>available cats</p>
        </Route>
        <Route path="/cats/edit">
          <p>edit/delete cat</p>
        </Route>
        <Route path="/cats/new">
          <p>new cat</p>
        </Route>

        <Route exact path="/dogs">
          <p>available dogs</p>
        </Route>
        <Route path="/dogs/edit">
          <p>edit/delete dog</p>
        </Route>
        <Route path="/dogs/new">
          <p>new dog</p>
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