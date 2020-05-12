import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import Home from "./views/Home";

import { AnonRoute, PrivateRoute } from "./components";

import apiClient from "./services/apiClient";
import Protected from "./views/Protected";
import CreateExperience from "./components/CreateExperience";
import CreateExperience from "./components/ListExperience";
import CreateExperience from "./components/UpdateExperience";
import CreateExperience from "./components/DeleteExperience";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  render() {
    const { isLoggedIn, isLoading } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className="App">
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route exact path={"/expierience"} component={ListExperience} />
              <Route exact path={"/create-expirience"} component={CreateExperience} />
              <Route exact path={"/update-expirience"} component={UpdateExperience} />
              <Route exact path={"/delete-expirience"} component={DeleteExperience} />
              <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <PrivateRoute exact path={"/protected"} isLoggedIn={isLoggedIn}>
                <Protected />
              </PrivateRoute>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
