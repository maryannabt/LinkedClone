import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import fetch from "isomorphic-fetch";
import LikesItem from "./LikesItem";

class LikesModal extends Component {
  state = {
    likesArr: []
  };

  async componentDidMount() {
    document.addEventListener("mousedown", this.hideModal, false);

    this.appWrapper = document.getElementById("root");
    this.bodyScrollPos =
      document.body.scrollTop || document.documentElement.scrollTop || 0;
    this.appWrapper.style.position = "fixed";
    this.appWrapper.style.top = `-${this.bodyScrollPos}px`;
    this.appWrapper.style.width = "100%";

    try {
      let res = await fetch(`/api/user/likes/${this.props.postID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      res = await res.json();
      this.setState({ likesArr: res });
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideModal, false);

    this.appWrapper.style.removeProperty("position");
    this.appWrapper.style.removeProperty("top");
    document.documentElement.scrollTop = document.body.scrollTop = this.bodyScrollPos;
  }

  hideModal = e => {
    if (!this.LikeModal.contains(e.target)) {
      this.props.displayModal();
    }
  };

  render() {
    const { likesArr } = this.state;

    const content = (
    <Wrapper>
      <Modal></Modal>
      <Main ref={LikeModal => (this.LikeModal = LikeModal)}>
        <LikesHeader>
          <CountDiv>{likesArr.length} Likes</CountDiv>
          <CloseWindow onClick={() => this.props.displayModal()}>
            ╳
          </CloseWindow>
        </LikesHeader>
        {likesArr &&
          likesArr.map(like => (
            <LikesItem userInfo={like.userInfo} key={like.userID} />
          ))}
      </Main>
    </Wrapper>
    );

    return ReactDOM.createPortal(content, document.getElementById('likes-modal'));
  }
}

export default LikesModal;

// CSS
const Wrapper = styled.div``;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 3;
`;

const Main = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  background-color: white;
  opacity: 1;
  z-index: 4;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
`;

const LikesHeader = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.15);
`;

const CloseWindow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 1.8rem;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
  }
`;

const CountDiv = styled.div`
  font-size: 2rem;
  margin-left: 2rem;
`;
