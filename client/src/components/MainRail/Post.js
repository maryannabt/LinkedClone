import React, { Component } from "react";
import styled from "styled-components";
import Loader from "../../img/Loader";
import Profile from "./Post_Profile";
import PostText from "./Post_Text";
import Image from "./Post_Image";

class Post extends Component {
  state = { doneLoading: false };

  componentDidMount() {
    this.setState({ doneLoading: true });
  }

  render() {
    const { postAuthUser, updatedAt, text, img } = this.props;

    if (!this.state.doneLoading) {
      return <Loader />;
    } else {
      return (
        <PostDiv>
          <Profile {...postAuthUser} timeOfPost={updatedAt} />
          <PostText post={text} />
          {img && <Image img={img} />}
        </PostDiv>
      );
    }
  }
}

export default Post;

// CSS
const PostDiv = styled.div`
  width: 54.8rem;
  background-color: #ffffff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;

  @media only screen and (max-width: 580px) {
    width: 99%;
  }
`;
