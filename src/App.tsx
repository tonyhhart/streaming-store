import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './style/bootstrap.min.css';
import './style/global.css';
import Login from './pages/login';
import Home from './pages/home';
import { useDispatch, useSelector } from 'react-redux';
import { logout, StoreState } from './store';


function App() {
  const dispatch = useDispatch();

  const { api_token } = useSelector((state: StoreState) => ({
    api_token: state.auth.api_token
  }));

  function onClickLogout() {
    dispatch(logout())
  }

  return (
    <Router>
      <div>

        {!!api_token && (
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="#">Streaming Store</a>
            <button onClick={onClickLogout} className="btn btn-link text-white" type="button">
              Logout
            </button>
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
