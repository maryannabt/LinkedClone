/* Rendered in App component. Connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import LoginTopBar from "./LoginTopBar";
import TutorialTopBar from "./TutorialTopBar";
import { connect } from "react-redux";
import { loginUser } from "../Login/LoginReducer/Login.actions";
import { withRouter } from "react-router-dom";

class TopBar extends Component {
  render() {
    const { auth, loginErrMsg } = this.props.loginData;
    const { loginUser } = this.props;

    if (auth) {
      return (
        <Wrapper loged={auth}>
          <TutorialTopBar />
        </Wrapper>
      );
    } else {
      if (!loginErrMsg) {
        return (
          <Wrapper loged={auth}>
            <LoginTopBar loginUser={loginUser} />
          </Wrapper>
        );
      } else {
        // If there was an error logging in
        return (
          <Wrapper loged={auth}>
            <TutorialTopBar />
          </Wrapper>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  const { loginData } = state;

  return {
    loginData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loginUser: userData => dispatch(loginUser(userData))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBar)
);

// CSS
const Wrapper = styled.div`
  position: ${props => (props.loged ? "fixed" : "absolute")};
  background-color: #283e4a;
  top: 0;
  height: 5.2rem;
  display: flex;
  width: 100%;
  z-index: 2;
`;
