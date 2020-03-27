import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import "./App.scss";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <main className="main-content">
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
