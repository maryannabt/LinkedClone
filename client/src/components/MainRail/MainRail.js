import React, { Component } from "react";
import styled from "styled-components";
import NewPost from "./NewPost";
import Sort from "./Sort";
import { connect } from "react-redux";
import {
  uploadPost,
  removePostMsg,
  fetchPosts,
  removePosts
} from "./FeedReducer/Feed.actions";

class MainRail extends Component {
  getPosts = () => {
    this.props.fetchPosts(
      this.props.loginData.user._id,
      this.props.feedData.postOffSet
    );
  };

  componentDidMount() {
    this.getPosts();
  }

  componentWillUnmount() {
    this.props.removePosts();
  }

  render() {
    const { auth, user } = this.props.loginData;
    const { uploadPost, removePostMsg } = this.props;
    const { postSaved } = this.props.feedData;

    if (!auth) {
      this.props.history.push("/");
      console.log("Ridirected from Feed to Login");
    }

    return (
      <Main>
        <NewPost
          user={user}
          uploadPost={uploadPost}
          postSaved={postSaved}
          removePostMsg={removePostMsg}
        />
        <Sort />
      </Main>
    );
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
    uploadPost: postData => dispatch(uploadPost(postData)),
    removePostMsg: () => dispatch(removePostMsg()),
    fetchPosts: (userID, offSet) => dispatch(fetchPosts(userID, offSet)),
    removePosts: () => dispatch(removePosts())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRail);

// CSS
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: none;
  width: 54.8rem;
  margin-top: 5.2rem;
  padding: 0 2.5rem;
  background-color: #f5f5f5;
  z-index: 1;

  @media only screen and (max-width: 580px) {
    margin-top: 12.4rem;
    padding: 0;
    width: 99%;
    overflow-x: hidden;
  }
`;
