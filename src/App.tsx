import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter, HashRouter } from "react-router-dom";
import configStore from "./store";
import { Provider } from "react-redux";
import Home from "./page/Home/Home";
import Detail from "./page/Detail/Detail";
import "./scss/style.scss";
import "./App.scss";

const store = configStore();

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <div className='topnavAndBanner'></div>
        <HashRouter>
          <Route exact path='/' component={Home} />
          <Route exact path='/detail' component={Detail} />
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
