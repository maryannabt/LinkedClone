/* Rendered in App component. Connected to the redux store. */

import React, { Component } from "react";
import styled from "styled-components";
import Search from "./Search";
import LoginTopBar from "./LoginTopBar";
import TutorialTopBar from "./TutorialTopBar";
import { connect } from "react-redux";
import { loginUser } from "../Login/LoginReducer/Login.actions";
import { fetchSearchResults } from "../MainRail/FeedReducer/Feed.actions";
import { withRouter } from "react-router-dom";

class TopBar extends Component {
  render() {
    const { auth, user, loginErrMsg } = this.props.loginData;
    const { searchSuggestions } = this.props.feedData;
    const { loginUser, fetchSearchResults } = this.props;

    if (auth) {
      if (user.registrationWizard === "done") {
        return (
          <LogedWrapper loged={auth}>
            <Search
              fetchSearchResults={fetchSearchResults}
              userID={user._id}
              searchSuggestions={searchSuggestions}
            />
          </LogedWrapper>
        );
      } else {
        return (
          <Wrapper loged={auth}>
            <TutorialTopBar />
          </Wrapper>
        );
      }
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
  const { loginData, feedData } = state;

  return {
    loginData,
    feedData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: userData => dispatch(loginUser(userData)),
    fetchSearchResults: (userID, searchStr) =>
      dispatch(fetchSearchResults(userID, searchStr))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBar)
);

// CSS
const LogedWrapper = styled.div`
  position: ${props => (props.loged ? "fixed" : "absolute")};
  background-color: #283e4a;
  top: 0;
  height: 5.2rem;
  display: flex;
  width: 100%;
  z-index: 2;

  @media only screen and (max-width: 580px) {
    flex-wrap: wrap;
    height: 12.4rem;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: ${props => (props.loged ? "fixed" : "absolute")};
  background-color: #283e4a;
  top: 0;
  height: 5.2rem;
  display: flex;
  width: 100%;
  z-index: 2;
`;
