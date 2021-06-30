import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter, HashRouter } from "react-router-dom";
import configStore from "./store";
import classnames from "classnames";
import { Provider } from "react-redux";
import Home from "./page/Home/Home";
import Detail from "./page/Detail/Detail";
import ufreedom from "./ufreedom.png";
import jump from "./jump.jpg";
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
        <div className='app-footer'>
          <div className={classnames("about-us", "ufreedom")}>
            <img
              src={ufreedom}
              className='ufreedom-img'
              alt='ufreedom'
              width={150}
            />
            <div className={"about-us-detail"}>获取更多职位</div>
          </div>
          <div className={classnames("about-us", "jump")}>
            <img src={jump} className='jump-img' alt='jump' width={150} />
            <div className={"about-us-detail"}>获取更多信息</div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
