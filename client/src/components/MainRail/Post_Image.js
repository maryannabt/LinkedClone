import React, { Component } from "react";
import styled from "styled-components";
import ImgModal from "./ImgModal";

class Image extends Component {
  state = {
    showModal: false
  };

  displayModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    return (
      <Main>
        <ImgBox onClick={this.displayModal}>
          <Img img={this.props.img}> </Img>
        </ImgBox>
        {this.state.showModal && (
          <ImgModal displayModal={this.displayModal} img={this.props.img} />
        )}
      </Main>
    );
  }
}

export default Image;

// CSS
const Main = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

const ImgBox = styled.div`
  padding: 0.1rem;
`;

const Img = styled.div`
width: 100%;
height: 34rem;
background-image: url("${props => props.img}");
background-position: center;
background-size: cover;
cursor: pointer;
`;
