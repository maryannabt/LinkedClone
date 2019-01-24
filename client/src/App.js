import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import TopBar from "./components/TopBar/TopBar";
import Login from "./components/Login/Login";
import LoginStage1 from "./components/Login/LoginStage1";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <TopBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/start/location" component={LoginStage1} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default App;

//CSS//
const Wrapper = styled.div`
  display: flex;
  flex-basis: 100%;
`;
