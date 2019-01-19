/* Rendered in TopBar component which is connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import LogoImg from "../../img/logo.png";
import { withRouter } from "react-router-dom";
import { flexbox } from "../../utils/utils";

class LoginTopBar extends Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const target = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: target });
  };

  login = () => {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      const userData = this.state;
      this.props.loginUser(userData);
    }
  };

  render() {
    return (
      <Main>
        <Logo>
          <Img src={LogoImg} />
        </Logo>
        <Login>
          <Form>
            <Email
              name="email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <Password
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <SignIn type="button" onClick={this.login}>
              Sign in
            </SignIn>
          </Form>

          <ForgotPass>Forgot password?</ForgotPass>
        </Login>
      </Main>
    );
  }
}

export default withRouter(LoginTopBar);

//CSS//
const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  height: 100%;
  width: 30%;
  ${flexbox()}

  @media only screen and (max-width: 580px) {
    width: 15%;
  }
`;

const Login = styled.div`
  height: 100%;
  width: 70%;
  ${flexbox()}

  @media only screen and (max-width: 580px) {
    width: 85%;
  }
`;

const Img = styled.img`
  width: 11.1rem;
  height: 2.8rem;
  /* margin-left: 10.5rem; */

  @media only screen and (max-width: 580px) {
    width: 5rem;
    height: 1.5rem;
  }
`;

const Form = styled.form`
  ${flexbox()}
`;

const Email = styled.input`
  width: 20rem;
  height: 3rem;
  margin-right: 1rem;
  ${flexbox()}
  padding-left: 1rem;
  border-radius: 2px;
  background-color: #f3f6f8;
  border: 1px solid #b3b6b9;
  font-size: 1.4rem;
  font-weight: 600;

  @media only screen and (max-width: 580px) {
    width: 16rem;
    height: 2.4rem;
  }
  @media only screen and (max-width: 480px) {
    width: 11rem;
    height: 1.98rem;
  }
`;

const Password = styled(Email)``;

const SignIn = styled.button`
  width: 8rem;
  height: 3.5rem;
  border: 1px solid white;
  color: white;
  background-color: transparent;
  font-size: 1.6rem;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
    width: 7rem;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: white;
    color: #283e4a;
  }
`;

const ForgotPass = styled.div`
  margin-left: 2rem;
  ${flexbox()}
  color: #cdcfd2;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;

  @media only screen and (max-width: 580px) {
    margin-left: 1rem;
  }

  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 1.4rem;
  }
`;
