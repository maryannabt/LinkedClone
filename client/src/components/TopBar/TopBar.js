/* Rendered in App component. Connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import LoginTopBar from "./LoginTopBar";
import { withRouter } from "react-router-dom";

class TopBar extends Component {
  render() {
    return (
      <Wrapper>
        <LoginTopBar />
      </Wrapper>
    );
  }
}

export default withRouter(TopBar);

//CSS//
const Wrapper = styled.div`
  position: ${props => (props.loged ? "fixed" : "absolute")};
  background-color: #283e4a;
  top: 0;
  height: 5.2rem;
  display: flex;
  width: 100%;
  z-index: 2;
`;
