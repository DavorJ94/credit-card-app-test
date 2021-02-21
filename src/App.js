import React from "react";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import "./App.css";
import AddCreditCard from "./AddCreditCard";
import Home from "./home";

function App() {
  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

  return (
    <div>
      {allStorage().length === 0 ? (
        <Redirect from="/" to="/cards/add" />
      ) : (
        <Redirect from="/" to="/cards" />
      )}
      <Switch>
        <Route exact path="/cards">
          <Home />
        </Route>
        <Route path="/cards/add">
          <AddCreditCard />
        </Route>
        <Route path="/cards/{id}/edit">
          <AddCreditCard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
