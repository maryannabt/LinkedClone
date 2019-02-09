/* Rendered in App component with path "/". Connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import LoginBottom from "./LoginBottom";
import { flexbox } from "../../utils/utils";
import { connect } from "react-redux";

// Actions
import {
  createNewUser,
  clearLoginFormErrMsg
} from "./LoginReducer/Login.actions";

class Login extends Component {
  render() {
    const { createNewUser, clearLoginFormErrMsg } = this.props;
    const { auth, user, errorMsg, loginErrMsg } = this.props.loginData;

    if (auth && user.registrationWizard === "done") {
      this.props.history.push("/feed");
      console.log("Ridirected from Login to Feed");
    }
    if (auth && user.registrationWizard !== "done") {
      this.props.history.push("/start/location");
    }
    if (loginErrMsg === "201" || loginErrMsg === "202") {
      this.props.history.push("/login");
    }

    return (
      <Wrapper>
        <LoginForm
          createNewUser={createNewUser}
          errorMsg={errorMsg}
          clearLoginFormErrMsg={clearLoginFormErrMsg}
        />
        <LoginBottom />
      </Wrapper>
    );
  }
}

// Redux
function mapStateToProps(state) {
  const { loginData } = state;

  return {
    loginData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createNewUser: userData => dispatch(createNewUser(userData)),
    clearLoginFormErrMsg: () => dispatch(clearLoginFormErrMsg())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

// CSS
const Wrapper = styled.div`
  ${flexbox({ d: "column" })}
  width: 100%;
  margin-top: 5.2rem;
`;
