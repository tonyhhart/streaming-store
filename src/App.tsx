import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./style/global.css";
import Login from "./pages/login";
import Home from "./pages/home";
import { useDispatch, useSelector } from "react-redux";
import { logout, StoreState } from "./store";

function App() {
  const dispatch = useDispatch();

  const { api_token } = useSelector((state: StoreState) => ({
    api_token: state.auth.api_token,
  }));

  function onClickLogout() {
    dispatch(logout());
  }

  return (
    <Router>
      <div id="router-container" className="flex-column">
        {!!api_token && (
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Streaming Store{" "}
              </a>

              <button
                onClick={onClickLogout}
                className="btn btn-dark"
                type="button"
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        <Switch>
          {!api_token ? (
            <Route path="*">
              <Login />
            </Route>
          ) : (
            <Route path="/">
              <Home />
            </Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
