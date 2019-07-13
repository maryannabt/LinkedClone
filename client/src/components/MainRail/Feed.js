import React, { Component } from "react";
import styled from "styled-components";
import Post from "./Post";

class Feed extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    let nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (!this.props.fetchingPosts && this.props.auth && nearBottom) {
      this.props.getPosts();
    }
  };

  render() {
    const {
      user,
      posts,
      updateLike,
      uploadComment,
      uploadSubComment,
      fetchComments
    } = this.props;

    return (
      <Main>
        {user &&
          posts.map(item => (
            <Post
              {...item}
              key={item._id}
              user={user}
              updateLike={updateLike}
              uploadComment={uploadComment}
              uploadSubComment={uploadSubComment}
              fetchComments={fetchComments}
            />
          ))}
      </Main>
    );
  }
}

export default Feed;

// CSS
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: none;
  width: 100%;

  @media only screen and (max-width: 580px) {
    align-items: flex-start;
    margin-top: 1.5rem;
    width: 99%;
  }
`;
