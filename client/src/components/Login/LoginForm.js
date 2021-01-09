/* Rendered in Login component which is connected to the redux store.
   Props: createNewUser - action dispatcher for creating a user, takes in user data as an argument.
          clearLoginFormErrMsg - action dispatcher for clearing the errors that came from the back end server (errorMsg).
          errorMsg - value derived from the redux store state as a result of loginData reducer operation. */

import React, { Component } from "react";
import styled from "styled-components";
import Img from "../../img/showcase.jpg";
import { flexbox } from "../../utils/utils";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      registrationWizard: "not done",
      // For front end form validation only:
      form_valid: true,
      error_msg: "",
      error_field: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: target });
  }

  hideErrors() {
    this.setState({
      form_valid: true,
      error_msg: "",
      error_field: ""
    });
  }

  validateForm() {
    let form_valid = true;
    let error_msg = "";
    let error_field = "";

    let conclude = () => {
      this.setState({ form_valid, error_msg, error_field });
      return form_valid;
    };

    if (this.state.first_name === "") {
      form_valid = false;
      error_msg = "Please enter your first name";
      error_field = "first_name";
      return conclude();
    }

    if (this.state.last_name === "") {
      form_valid = false;
      error_msg = "Please enter your last name";
      error_field = "last_name";
      return conclude();
    }

    if (this.state.email === "") {
      form_valid = false;
      error_msg = "Please enter your email address";
      error_field = "email";
      return conclude();
    }

    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(this.state.email).toLowerCase()) === false) {
      form_valid = false;
      error_msg = "Please enter a valid email address";
      error_field = "email";
      return conclude();
    }

    if (this.state.password === "") {
      form_valid = false;
      error_msg = "Please enter your password";
      error_field = "password";
      return conclude();
    }

    if (this.state.password.length <= 5) {
      form_valid = false;
      error_msg = "Password must be 6 characters or more";
      error_field = "password";
      return conclude();
    }
  }

  submitForm(e) {
    const { createNewUser, clearLoginFormErrMsg } = this.props;

    this.setState({ form_valid: true });
    clearLoginFormErrMsg();

    // Prevent page reload - default form submit behaviour
    e.preventDefault();

    const form_valid = this.validateForm();

    // Do not proceed any further if the form is not valid
    if (form_valid === false) return;

    // Create new user
    const newUser = this.state;

    // Remove these keys from the new user object
    delete newUser.form_valid;
    delete newUser.error_msg;
    delete newUser.error_field;

    // Dispatch action from props
    createNewUser(newUser);
  }

  componentWillUnmount() {
    this.props.clearLoginFormErrMsg();
  }

  render() {
    return (
      <Wrapper>
        <Box>
          <Header>
            <BigText>Be great at what you do</BigText>
            <SmallText>Get started - it's free.</SmallText>
          </Header>
          {/* Errors from the back end */}
          {this.props.errorMsg && (
            <ErrorBox show={this.props.errorMsg !== null}>
              {this.props.errorMsg}
            </ErrorBox>
          )}
          {/* Errors from the front end */}
          {!this.props.errorMsg && (
            <ErrorBox show={this.state.form_valid !== true}>
              {this.state.error_msg}
            </ErrorBox>
          )}
          <Form>
            <FormText>First name</FormText>
            <Input
              onChange={this.handleInputChange}
              name="first_name"
              type="text"
              error_styled={this.state.error_field === "first_name"}
              onBlur={this.validateForm}
              onFocus={this.hideErrors}
            />
            <FormText>Last name</FormText>
            <Input
              onChange={this.handleInputChange}
              name="last_name"
              type="text"
              error_styled={this.state.error_field === "last_name"}
              onBlur={this.validateForm}
              onFocus={this.hideErrors}
            />
            <FormText>Email</FormText>
            <Input
              onChange={this.handleInputChange}
              name="email"
              type="email"
              error_styled={this.state.error_field === "email"}
              onBlur={this.validateForm}
              onFocus={this.hideErrors}
            />
            <FormText type="password">Password (6 or more characters)</FormText>
            <Input
              onChange={this.handleInputChange}
              name="password"
              type="password"
              error_styled={this.state.error_field === "password"}
              onBlur={this.validateForm}
              onFocus={this.hideErrors}
            />
            <Term>
              By clicking Join now, you agree to the LinkedIn User Agreement,
              Privacy Policy, and <span>Cookie Policy.</span>
            </Term>
            <Submit type="button" onClick={this.submitForm}>
              Join now
            </Submit>
          </Form>
        </Box>
      </Wrapper>
    );
  }
}

export default LoginForm;

//CSS//
const Wrapper = styled.div`
width: 100%;
height: 56rem;
background-color: lightcyan;
background-image: url('${Img}');
background-size: cover;
${flexbox()}

@media only screen and (max-width: 580px) {
   height: 76rem;
}
`;

const Box = styled.div`
  width: 40rem;
  background-color: #edf0f3;
  ${flexbox({ d: "column" })}
  padding: 2px 0 1rem;
  border-radius: 2px;
`;

const Header = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #f6f8fa;
  ${flexbox({ d: "column" })}
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

const BigText = styled.div`
  font-size: 2.6rem;
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 400;
`;

const SmallText = styled(BigText)`
  font-size: 1.7rem;
`;

const Form = styled.form`
  width: 35rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 400;
  padding-top: 1rem;
`;

const FormText = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const Input = styled.input`
  width: 100%;
  height: 2.8rem;
  border: 1px ${props => (props.error_styled ? "red" : "rgba(0,0,0,0.15)")}
    solid;
`;

const Term = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);

  & span {
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #0073b1;
    }
  }
`;

const Submit = styled.button`
  width: 100%;
  height: 3rem;
  border: none;
  color: white;
  background-color: #0073b1;
  font-size: 1.6rem;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: #006097;
  }
`;

const ErrorBox = styled.div`
  width: 100%;
  height: 4rem;
  background-color: red;
  color: white;
  display: ${props => (props.show === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
`;
