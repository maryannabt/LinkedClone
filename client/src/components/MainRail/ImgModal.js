import React, { Component } from "react";
import styled from "styled-components";

class ImgModal extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.hideModal, false);
    this.appWrapper = document.getElementById("root");
    this.bodyScrollPos = document.documentElement.scrollTop || 0;
    this.appWrapper.style.position = "fixed";
    this.appWrapper.style.top = `-${this.bodyScrollPos}px`;
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideModal, false);
    this.appWrapper.style.removeProperty("position");
    this.appWrapper.style.removeProperty("top");
    document.documentElement.scrollTop = this.bodyScrollPos;
  }

  hideModal = e => {
    if (!this.ImgModal.contains(e.target)) {
      this.props.displayModal();
    }
  };

  render() {
    return (
      <ModalWrapper>
        <Modal></Modal>
        <CloseWindow onClick={() => this.props.displayModal()}>╳</CloseWindow>
        <ModalMain ref={ImgModal => (this.ImgModal = ImgModal)}>
          <ModalImg src={this.props.img} />
        </ModalMain>
      </ModalWrapper>
    );
  }
}

export default ImgModal;

// CSS
const ModalWrapper = styled.div``;

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

const ModalMain = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
`;

const ModalImg = styled.img`
  max-width: 140rem;
  max-height: 60rem;
`;

const CloseWindow = styled.div`
  position: fixed;
  top: 5.2rem;
  right: 5.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 1.8rem;
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  color: white;
  font-weight: 600;
  z-index: 4;

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
  }
`;
