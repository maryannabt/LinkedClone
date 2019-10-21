import React, { Component } from "react";
import styled from "styled-components";
import SingleComment from "./SingleComment";

class Comments extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.fetchComments(this.props.postID);
  }

  sendLiketoServer = commentID => {
    let likeData = {};
    likeData.targetClass = "Comment";
    likeData.targetID = commentID;
    likeData.userID = this.props.userID;
    this.props.updateLike(JSON.stringify(likeData));
  };

  updateInfo = event => {
    const target = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: target });
  };

  sendComment = () => {
    let newComment = {};
    newComment.text = this.state.text;
    newComment.userID = this.props.userID;
    newComment.targetID = this.props.postID;
    let newCommentJson = JSON.stringify({ ...newComment });
    this.props.uploadComment(newCommentJson);
    this.setState({ text: "" });
  };

  render() {
    const {
      allowComments,
      userID,
      user,
      userAvatar,
      uploadSubComment,
      commentsArr
    } = this.props;

    if (!allowComments) {
      return (
        <Main>
          <PostDisabled>User disabled comments on this post.</PostDisabled>
        </Main>
      );
    } else {
      return (
        <Main>
          <AddComment>
            <AddCommentBox>
              <Avatar src={userAvatar} />
              <InputDiv>
                <Input
                  type="text"
                  name="text"
                  placeholder="Add a comment..."
                  value={this.state.text}
                  onChange={this.updateInfo}
                />
                <Photo>
                  <i class="fas fa-camera"></i>
                </Photo>
                <SendButton
                  input={this.state.text.length}
                  onClick={this.sendComment}
                  type="button"
                >
                  Post
                </SendButton>
              </InputDiv>
            </AddCommentBox>
          </AddComment>

          <ComDiv>
            {commentsArr.map(
              comment =>
                comment.userInfo && (
                  <SingleComment
                    comment={comment}
                    userID={userID}
                    user={user}
                    key={comment._id}
                    sendLiketoServer={this.sendLiketoServer}
                    uploadSubComment={uploadSubComment}
                  />
                )
            )}
          </ComDiv>
        </Main>
      );
    }
  }
}

export default Comments;

// CSS
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f3f6f8;
`;

const PostDisabled = styled.div`
  width: 53.3;
  height: 4rem;
  display: flex;
  align-items: center;
  background-color: #f3f6f8;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgb(0, 0, 0, 0.9);
  padding-left: 1.5rem;
`;

const AddComment = styled.div`
  display: flex;
  width: 100%;
`;

const AddCommentBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  position: relative;
`;

const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin-left: 1rem;
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  margin-left: 1rem;
  margin-right: 2rem;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  height: 3rem;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;

const Photo = styled.div`
  position: absolute;
  top: 0rem;
  right: 2.5rem;
  padding: 0.3rem;
  font-size: 1.8rem;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    color: #0073b1;
  }
`;

const SendButton = styled.button`
  display: ${props => (props.input === 0 ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2.6rem;
  border-radius: 0.1rem;
  background-color: #0073b1;
  color: white;
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;

  &:hover {
    background-color: #006097;
  }
`;

const ComDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
