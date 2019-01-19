/* Rendered in Login component. */

import React, { Component } from "react";
import styled from "styled-components";
import FooterImg from "../../img/footer_logo.png";
import { flexbox } from "../../utils/utils";

class LoginBottom extends Component {
  state = {
    letters: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ],
    first_name: "",
    last_name: ""
  };

  handleInputChange = event => {
    const target = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: target });
  };

  render() {
    return (
      <Main>
        <Form>
          <FindColleague>Find a colleague</FindColleague>
          <Input
            placeholder="First name"
            name="first_name"
            onChange={this.handleInputChange}
          />
          <Input
            placeholder="Last name"
            name="last_name"
            onChange={this.handleInputChange}
          />
          <SearchButton
            type="button"
            first_name={this.state.first_name}
            last_name={this.state.last_name}
          >
            Search
          </SearchButton>
        </Form>

        <ABC>
          LinkedIn member directory:
          {this.state.letters.map(letter => (
            <Letter key={letter}>{letter}</Letter>
          ))}
          <More>More</More>
          <Browse>Browse by country/region</Browse>
        </ABC>

        <Links>
          <LinkBox>
            <LinkBoxTitle>General</LinkBoxTitle>
            <LinkBoxList>
              <Link ml="0">Sign Up</Link>|<Link>Help Center</Link>|
              <Link>About</Link>|<Link>Press</Link>|<Link>Blog</Link>|
              <Link>Careers</Link>|<Link>Developers</Link>
            </LinkBoxList>
          </LinkBox>

          <LinkBox>
            <LinkBoxTitle>Business Solutions</LinkBoxTitle>
            <LinkBoxList>
              <Link ml="0">Talent</Link>|<Link>Marketing</Link>|
              <Link>Sales</Link>|<Link>Learning</Link>|
              <Link>Company Pages</Link>
            </LinkBoxList>
          </LinkBox>

          <LinkBox>
            <LinkBoxTitle>Browse LinkedIn</LinkBoxTitle>
            <LinkBoxList>
              <Link ml="0">Learning</Link>|<Link>Jobs</Link>|<Link>Salary</Link>
              |<Link>Mobile</Link>|<Link>ProFinder</Link>
            </LinkBoxList>
          </LinkBox>

          <LinkBox>
            <LinkBoxTitle>Directories</LinkBoxTitle>
            <LinkBoxList>
              <Link ml="0">Members</Link>|<Link>Jobs</Link>|
              <Link>Companies</Link>|<Link>Salaries</Link>|
              <Link>Universities</Link>|<Link>Top Jobs</Link>
            </LinkBoxList>
          </LinkBox>
        </Links>

        <BottomBar>
          <Img src={FooterImg} />
          <Copyright>&copy; {new Date().getFullYear()}</Copyright>
          <Link>User Agreement</Link>
          <Link>Privacy Policy</Link>
          <Link>Community Guidelines</Link>
          <Link>Cookie Policy</Link>
          <Link>Copyright Policy</Link>
          <Link>Guest Controls</Link>
          <Link>Language</Link>
        </BottomBar>
      </Main>
    );
  }
}

export default LoginBottom;

//CSS//
const Main = styled.div`
  width: 100%;
  background-color: #434649;
  ${flexbox({ d: "column" })}
`;

const Form = styled.form`
  ${flexbox()}
  color: white;
  font-size: 1.6rem;
  margin-top: 3rem;

  @media only screen and (max-width: 480px) {
    font-size: 1.2rem;
    overflow: hidden;
  }
`;

const FindColleague = styled.span`
  @media only screen and (max-width: 480px) {
    width: 5.2rem;
  }
`;

const Input = styled.input`
  margin-left: 1rem;
  padding-left: 10px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 1.4rem;
  width: 23.2rem;
  height: 2.8rem;

  @media only screen and (max-width: 480px) {
    width: 16rem;
    height: 2.52rem;
  }
  @media only screen and (max-width: 360px) {
    margin-left: 0.5rem;
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  width: 8.27rem;
  height: 3.3rem;
  font-size: 1.6rem;
  color: ${props =>
    props.first_name.length > 0 || props.last_name.length > 0
      ? "white"
      : "rgba(255,255,255,0.35)"};
  box-shadow: inset 0 0 0 0.1rem
    ${props =>
      props.first_name.length > 0 || props.last_name.length > 0
        ? "white"
        : "rgba(255,255,255,0.35)"};
  font-weight: 400;
  margin-left: 1rem;
  cursor: ${props =>
    props.first_name.length > 0 || props.last_name.length > 0
      ? "pointer"
      : "not-allowed"};
`;

const ABC = styled.div`
  ${flexbox()}
  color: white;
  font-size: 1.4rem;
  font-weight: 400;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 480px) {
    font-size: 1rem;
    overflow: hidden;
  }
`;

const Letter = styled.div`
  cursor: pointer;
  margin-left: 0.75rem;
  font-size: 1.4rem;
  text-transform: uppercase;

  @media only screen and (max-width: 480px) {
    font-size: 1.2rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const More = styled(Letter)`
  text-transform: none;
`;

const Browse = styled(More)`
  margin-left: 2rem;

  @media only screen and (max-width: 480px) {
    margin-left: 1rem;
  }
`;

const Links = styled.div`
  margin: 2rem 0;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  width: 75%;
  flex-wrap: wrap;
  justify-content: start;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.4rem;
  width: 45%;
  margin: 0 5rem 3rem 4px;

  @media only screen and (max-width: 1460px) {
    flex-basis: 40%;
  }

  @media only screen and (max-width: 580px) {
    flex-basis: 35%;
  }
`;

const LinkBoxTitle = styled.div`
  font-weight: 500;
`;

const LinkBoxList = styled.div`
  display: flex;
  margin-top: 0.9rem;
  flex-wrap: wrap;
`;

const Link = styled.div`
  margin: 0 0.7rem 0 ${props => props.ml || "0.7rem"};
  cursor: pointer;
  color: white;
  font-size: 1.4rem;
  font-weight: 400;

  @media only screen and (max-width: 580px) {
    font-size: 1.2rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  width: 75%;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Img = styled.img`
  margin-right: 0.5rem;
`;

const Copyright = styled.span`
  color: white;
  font-size: 1.2rem;
  margin-right: 2rem;
`;
