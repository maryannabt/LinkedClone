import React, { Component } from "react";
import styled from "styled-components";
import LogoImg from "../../img/logo.png";
import { withRouter } from "react-router-dom";
import { flexbox } from "../../utils/utils";

class Navbar extends Component {
  state = {
    email: "",
    password: ""
  };

  updateInfo(event) {
    const target = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: target });
  }

  login() {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      const userData = this.state;
      this.props.loginUser(userData);
    }
  }

  render() {
    return (
      <Main>
        <Logo>
          <Img src={LogoImg} onClick={() => this.props.history.push("/")} />
        </Logo>
        <Login>
          <Form>
            <Email
              name="email"
              placeholder="Email"
              onChange={this.updateInfo.bind(this)}
            />
            <Password
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.updateInfo.bind(this)}
            />
            <SignIn type="button" onClick={this.login.bind(this)}>
              Sign in
            </SignIn>
          </Form>

          <ForgotPass>Forgot password?</ForgotPass>
        </Login>
      </Main>
    );
  }
}

export default withRouter(Navbar);

//CSS//
const Main = styled.div`
  display: flex;
  width: 100%;
  height: 5.2rem;
  position: absolute;
  background-color: #283e4a;
  top: 0;
  z-index: 2;
`;

const Logo = styled.div`
  height: 100%;
  width: 30%;
  ${flexbox()}
`;

const Login = styled.div`
  height: 100%;
  width: 70%;
  ${flexbox()}
`;

const Img = styled.img`
  width: 11.1rem;
  height: 2.8rem;
  cursor: pointer;
  margin-left: 10.5rem;
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
  font-weight: 600;
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

  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 1.4rem;
  }
`;
