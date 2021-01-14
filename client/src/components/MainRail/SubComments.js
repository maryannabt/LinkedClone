import React, { Component } from "react";
import styled from "styled-components";
import SingleSubComment from "./SingleSubComment";

class SubComments extends Component {
  state = {
    text: ""
  };

  updateInfo = event => {
    const target = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: target });
  };

  sendComment = () => {
    let newComment = {};
    newComment.text = this.state.text;
    newComment.userID = this.props.user._id;
    newComment.targetID = this.props.commentID;
    newComment.parentID = this.props.postID;
    let newCommentJson = JSON.stringify({ ...newComment });
    this.props.uploadSubComment(newCommentJson);
    this.setState({ text: "" });
  };

  render() {
    const {
      user,
      subCommentsArray,
      showNewCommentBox,
      addNewComment,
      sendLiketoServer
    } = this.props;

    return (
      <div>
        {subCommentsArray &&
          subCommentsArray.map(comment => (
            <SingleSubComment
              comment={comment}
              addNewComment={addNewComment}
              userID={user._id}
              key={comment._id}
              sendLiketoServer={sendLiketoServer}
            />
          ))}

        {showNewCommentBox && (
          <AddComment>
            <AddCommentBox>
              <Avatar src={user.avatar} />
              <InputDiv>
                <Input
                  type="text"
                  name="text"
                  placeholder="Add a comment..."
                  value={this.state.text}
                  onChange={this.updateInfo}
                />
                <Photo>
                  <i className="fas fa-camera"></i>
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
        )}
      </div>
    );
  }
}

export default SubComments;

// CSS
const AddComment = styled.div`
  display: flex;
  width: 100%;
`;

const AddCommentBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  position: relative;
  margin-left: 4rem;
`;

const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin-left: 2rem;
`;
const InputDiv = styled.div`
  width: 100%;
  display: flex;
  margin-left: 1rem;
  margin-right: 2rem;
  flex-direction: column;
  margin-bottom: 1rem;
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
