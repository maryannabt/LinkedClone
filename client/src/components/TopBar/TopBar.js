/* Rendered in App component. Connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import LoginTopBar from "./LoginTopBar";
import TutorialTopBar from "./TutorialTopBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class TopBar extends Component {
  render() {
    const { auth } = this.props.loginData;

    if (auth) {
      return (
        <Wrapper loged={auth}>
          <TutorialTopBar />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <LoginTopBar />
        </Wrapper>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { loginData } = state;

  return {
    loginData
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBar)
);

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
