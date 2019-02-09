/* Rendered in App component with path "/login". Connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { flexbox } from "../../utils/utils";
import {
  loginUser,
  clearLoginError
} from "../Login/LoginReducer/Login.actions";

class LoginFail extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.setState({
      email: this.props.loginData.sentData.email,
      password: this.props.loginData.sentData.password
    });
  }

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
    const { loginErrMsg } = this.props.loginData;
    const { clearLoginError } = this.props;

    return (
      <Wrapper>
        {loginErrMsg === "269" && this.props.history.push("/feed")}
        {loginErrMsg === null && this.props.history.push("/")}
        <Main>
          <Title>Welcome Back</Title>
          <Text>
            Don't miss your next opportunity. Sign in to stay updated on your
            professional world.
          </Text>
          <Input
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <ErrorText>
            {loginErrMsg === "201" &&
              `Hmm, we don't recognize that email. Please try again.`}
          </ErrorText>
          <Input
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.handleInputChange}
          />
          <ErrorText>
            {loginErrMsg === "202" &&
              `Hmm, that's not the right password. Please try again or request a new one.`}
          </ErrorText>
          <Button onClick={this.login}>Sign in</Button>
          <ForgotPassword>Forgot password?</ForgotPassword>
          <Register>
            New to Linkedin? <Link onClick={clearLoginError}>Join Now</Link>
          </Register>
        </Main>
      </Wrapper>
    );
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
    loginUser: userData => dispatch(loginUser(userData)),
    clearLoginError: () => dispatch(clearLoginError())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFail);

// CSS
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  ${flexbox()}
`;

const Main = styled.div`
  width: 74rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  font-size: 2.6rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: black;
`;

const Text = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 39rem;
  height: 5rem;
  border: 1px solid black;
  padding-left: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  width: 40rem;
  height: 5.6rem;
  color: white;
  background-color: #0073b1;
  font-size: 1.8rem;
  margin-top: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #006097;
  }
`;

const ForgotPassword = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #0073b1;
  margin-top: 4rem;
  font-size: 1.6rem;
  font-weight: 600;
  &:hover {
    background-color: rgba(152, 216, 244, 0.25);
    color: #006097;
  }
`;

const Register = styled.div`
  display: flex;
  margin-top: 3rem;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
`;

const Link = styled.div`
  cursor: pointer;
  margin-left: 0.4rem;
  color: #0073b1;
  font-weight: 700;
  &:hover {
    color: #665ed0;
  }
`;

const ErrorText = styled.div`
  font-size: 1.4rem;
  color: red;
  font-weight: 400;
  width: 39rem;
  height: 2.5rem;
  padding: 0.3rem;
`;
