import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { flexbox } from "./utils/utils";

import Navbar from "./components/layout and auth/Navbar";
import Footer from "./components/layout and auth/Footer";
import Landing from "./components/layout and auth/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Navbar />
          <Container>
            <Switch>
              <Route exact path="/" component={Landing} />
            </Switch>
            <Footer />
          </Container>
        </Wrapper>
      </Router>
    );
  }
}

export default App;

//CSS//

const Wrapper = styled.div`
  display: flex;
  flex-basis: 100%;
`;

const Container = styled.div`
  ${flexbox({ d: "column" })}
  width: 100%;
  margin-top: 5.2rem;
`;
