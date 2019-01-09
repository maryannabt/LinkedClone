import React, { Component } from "react";
import styled from "styled-components";
import Img from "../../img/showcase.jpg";
import { withRouter } from "react-router-dom";
import { flexbox } from "../../utils/utils";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    this.setState({ form_valid: true, error_msg: "", error_field: "" });
  }

  validateForm() {
    let form_valid = true;
    let error_msg = "";
    let error_field = "";

    let conclude = () => {
      this.setState({ form_valid, error_msg, error_field });
      return form_valid;
    };

    if (this.state.name === "") {
      form_valid = false;
      error_msg = "Please enter your name";
      error_field = "name";
      return conclude();
    }

    if (this.state.email === "") {
      form_valid = false;
      error_msg = "Please enter your email address";
      error_field = "email";
      return conclude();
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    if (this.state.password2 !== this.state.password) {
      form_valid = false;
      error_msg = "Please confirm your password";
      error_field = "password2";
      return conclude();
    }
  }

  submitForm(e) {
    // Prevent page reload - default form submit behaviour
    e.preventDefault();

    const form_valid = this.validateForm();

    // Do not proceed any further if the form is not valid
    if (form_valid === false) return;

    // Extract relevant keys from props
    const { history } = this.props;

    // Create new user
    const newUser = {
      ...this.state
    };

    // Remove these keys from the new user object
    delete newUser.form_valid;
    delete newUser.error_msg;
    delete newUser.error_field;

    console.log(newUser);

    history.push("/");
    // history.push("/dashboard");
  }

  render() {
    return (
      <Wrapper>
        <Box>
          <Header>
            <BigText>Be great at what you do</BigText>
            <SmallText>Get started - it's free.</SmallText>
          </Header>
          <ErrorBox show={this.state.form_valid !== true}>
            {this.state.error_msg}
          </ErrorBox>
          <Form>
            <FormText>Name</FormText>
            <Input
              onChange={this.handleInputChange}
              name="name"
              type="text"
              error_styled={this.state.error_field === "name"}
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
            <GravText>
              If you want a profile image, please use a Gravatar email.
            </GravText>
            <FormText type="password">Password (6 or more characters)</FormText>
            <Input
              onChange={this.handleInputChange}
              name="password"
              type="password"
              error_styled={this.state.error_field === "password"}
              onBlur={this.validateForm}
              onFocus={this.hideErrors}
            />
            <FormText type="password">Confirm password</FormText>
            <Input
              onChange={this.handleInputChange}
              name="password2"
              type="password"
              error_styled={this.state.error_field === "password2"}
              onBlur={this.validateForm}
              onFocus={this.hideErrors}
            />
            <Term>
              By clicking Join now, you agree to the LinkedIn User Agreement,
              Privacy Policy, and <span>Cookie Policy.</span>
            </Term>
            <Submit type="button" onClick={this.submitForm}>
              Join Now
            </Submit>
          </Form>
        </Box>
      </Wrapper>
    );
  }
}

export default withRouter(Landing);

//CSS//
const Wrapper = styled.div`
width: 100%;
height: 58rem;
background-color: lightcyan;
background-image: url('${Img}');
background-size: cover;
${flexbox()}
`;

const Box = styled.div`
  width: 40rem;
  background-color: #edf0f3;
  ${flexbox({ d: "column" })}
  padding: 2px 0 2.5rem;
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
`;

const SmallText = styled(BigText)`
  font-size: 1.6rem;
`;

const Form = styled.form`
  width: 35rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  color: black;
  padding-top: 1rem;
`;

const FormText = styled.div`
  font-size: 1.4rem;
  margin: 0.5rem 0;
`;

const GravText = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  margin: 0.3rem 0 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  height: 2.7rem;
  border: 1px ${props => (props.error_styled ? "red" : "rgba(0,0,0,0.15)")}
    solid;
`;

const Term = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;

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
  height: 3.5rem;
  border: none;
  color: white;
  background-color: #0073b1;
  font-size: 1.4rem;
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
