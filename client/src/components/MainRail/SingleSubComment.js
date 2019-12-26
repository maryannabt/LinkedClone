import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LikesModal from "./LikesModal";

class SingleSubComment extends Component {
  state = {
    userLikeComment: false,
    likesArr: [],
    showModal: false
  };

  componentDidMount() {
    let userLike = this.props.comment.likes.find(singleLike => {
      return singleLike.userID === this.props.userID;
    });
    if (userLike) {
      this.setState({ userLikeComment: true });
    }
    this.setState({ likesArr: this.props.comment.likes });
  }

  displayModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  changeLikeStatus = () => {
    if (!this.state.userLikeComment) {
      this.setState(prevState => ({
        likesArr: [...prevState.likesArr, { userID: this.props.userID }]
      }));
    } else {
      let newLikesArr = this.state.likesArr.filter(
        item => item.userID !== this.props.userID
      );
      this.setState({ likesArr: newLikesArr });
    }
    this.setState(prevState => ({
      userLikeComment: !prevState.userLikeComment
    }));
  };

  likeClicked = () => {
    this.props.sendLiketoServer(this.props.comment._id);
    this.changeLikeStatus();
  };

  render() {
    const { comment, addNewComment } = this.props;

    return (
      <ComBox>
        <Link
          to={`/user/${comment.subUserInfo._id}`}
          style={{ textDecoration: "none" }}
        >
          <ComAvatar src={comment.subUserInfo.avatar} />
        </Link>
        <ComMain>
          <Link
            to={`/user/${comment.subUserInfo._id}`}
            style={{ textDecoration: "none" }}
          >
            <ComUser>
              {comment.subUserInfo.first_name} {comment.subUserInfo.last_name}
            </ComUser>
          </Link>
          <ComTitle>
            {comment.subUserInfo.job_title} at {comment.subUserInfo.company_name}
          </ComTitle>
          <ComText>{comment.text}</ComText>
          <ComSocialDiv>
            <ComSocialLike
              onClick={this.likeClicked}
              userLike={this.state.userLikeComment}
            >
              Like
            </ComSocialLike>
            <ComSocial onClick={() => addNewComment()}>Reply</ComSocial>

            {this.state.likesArr.length > 0 && (
              <ComLikesCount onClick={this.displayModal}>
                {this.state.likesArr.length} Likes
              </ComLikesCount>
            )}

            {this.state.showModal && (
              <LikesModal
                displayModal={this.displayModal}
                postID={comment._id}
              />
            )}
          </ComSocialDiv>
        </ComMain>
        <ComTime>{comment.createdAt}</ComTime>
        <ComReport>
          <i class="fas fa-ellipsis-h"></i>
        </ComReport>
      </ComBox>
    );
  }
}

export default SingleSubComment;

// CSS
const ComBox = styled.div`
  display: flex;
  margin-top: 1.5rem;
  align-items: flex-start;
  width: 100%;
  position: relative;
`;

const ComAvatar = styled.img`
  margin-left: 6rem;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  cursor: pointer;
`;

const ComMain = styled.div`
  margin-left: 1rem;
  width: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  margin-right: 1rem;
`;

const ComUser = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #0073b1;
  }
`;

const ComTitle = styled.div`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`;

const ComText = styled(ComTitle)`
  margin-top: 0.8rem;
  color: black;
`;

const ComLikesCount = styled.div`
  cursor: pointer;
  color: black;

  &:hover {
    text-decoration: underline;
    color: #0073b1;
  }
`;

const ComSocialDiv = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 0.2rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const ComSocial = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  margin-right: 1.25rem;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #0073b1;
  }
`;

const ComSocialLike = styled(ComSocial)`
  color: ${props => (props.userLike ? "#0073b1" : "rgba(0,0,0,.6)")};
`;

const ComTime = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
`;

const ComReport = styled(ComTime)`
  cursor: pointer;
  margin-right: 2rem;
`;
