import React, { Component } from "react";
import styled from "styled-components";
import Loader from "../../img/Loader";
import Profile from "./Post_Profile";
import PostText from "./Post_Text";
import Image from "./Post_Image";
import SocialCount from "./Post_SocialCount";
import Social from "./Post_Social";

class Post extends Component {
  state = {
    doneLoading: false,
    likesArr: [],
    userLikePost: false,
    showComments: false,
    showBeFirst: true
  };

  async componentDidMount() {
    await this.setState({ likesArr: this.props.likes });
    let userLike = await this.state.likesArr.find(singleLike => {
      return singleLike.userID === this.props.user._id;
    });
    if (userLike) {
      this.setState({ userLikePost: true });
    }
    this.setState({ doneLoading: true });
  }

  showComments = () => {
    this.setState({ showComments: true, showBeFirst: false });
  };

  changeLikeStatus = () => {
    if (!this.state.userLikePost) {
      this.setState(prevState => ({
        likesArr: [...prevState.likesArr, { userID: this.props.user._id }]
      }));
    } else {
      let newLikesArr = this.state.likesArr.filter(
        item => item.userID !== this.props.user._id
      );
      this.setState({ likesArr: newLikesArr });
    }
    this.setState(prevState => ({ userLikePost: !prevState.userLikePost }));
  };

  render() {
    const {
      postAuthUser,
      updatedAt,
      text,
      img,
      comments,
      _id,
      updateLike,
      user
    } = this.props;

    if (!this.state.doneLoading) {
      return <Loader />;
    } else {
      return (
        <PostDiv>
          <Profile {...postAuthUser} timeOfPost={updatedAt} />
          <PostText post={text} />
          {img && <Image img={img} />}
          <SocialCount
            likeCount={this.state.likesArr.length}
            commentCount={comments.length}
            showComments={this.showComments}
            postID={_id}
          />
          <Social
            showComments={this.showComments}
            changeLikeStatus={this.changeLikeStatus}
            updateLike={updateLike}
            userLikePost={this.state.userLikePost}
            postID={_id}
            authorID={user._id}
          />
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
