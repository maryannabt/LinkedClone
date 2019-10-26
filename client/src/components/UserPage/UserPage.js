import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getSelectedUserInfo,
  removeUserPageData
} from "./UserPageReducer/UserPage.actions";
import Loader from "../../img/Loader";
import ProfileTop from "./ProfileTop";

class UserPage extends Component {
  componentDidMount() {
    this.props.getSelectedUserInfo(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getSelectedUserInfo(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.removeUserPageData();
  }

  render() {
    const {
      fetchDone,
      selectedUser,
      usersToFollow,
      userLastComments
    } = this.props.userPageData;

    const { user, auth } = this.props.loginData;

    if (!auth) {
      this.props.history.push("/");
    }

    if (fetchDone) {
      return (
        <Wrapper>
          <Main>
            <LeftColum>
              <ProfileTop selectedUser={selectedUser} user={user} />
            </LeftColum>
          </Main>
        </Wrapper>
      );
    } else {
      return <Loader />;
    }
  }
}

function mapStateToProps(state) {
  const { loginData, userPageData } = state;

  return {
    loginData,
    userPageData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSelectedUserInfo: id => dispatch(getSelectedUserInfo(id)),
    removeUserPageData: () => dispatch(removeUserPageData())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);

// CSS
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.div`
  margin-top: 5.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: 1.6rem;
  background-color: #f5f5f5;
`;

const LeftColum = styled.div`
  width: 79.2rem;

  @media only screen and (max-width: 580px) {
    width: 99%;
  }
`;
