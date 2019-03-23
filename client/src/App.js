import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import TopBar from "./components/TopBar/TopBar";
import Login from "./components/Login/Login";
import LoginStage1 from "./components/Login/LoginStage1";
import LoginStage2 from "./components/Login/LoginStage2";
import LoginStage3 from "./components/Login/LoginStage3";
import LoginFail from "./components/Login/LoginFail";
import MyNetwork from "./components/MyNetwork/MyNetwork";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <TopBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/start/location" component={LoginStage1} />
            <Route path="/start/profile" component={LoginStage2} />
            <Route path="/start/photo" component={LoginStage3} />
            <Route path="/login" component={LoginFail} />
            <Route path="/mynetwork" component={MyNetwork} />
            <Route component={MyNetwork} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default App;

// CSS
const Wrapper = styled.div`
  display: flex;
  flex-basis: 100%;
`;
