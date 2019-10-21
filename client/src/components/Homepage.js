import React, { Component } from "react";
import styled from "styled-components";
import MainRail from "./MainRail/MainRail";

class Homepage extends Component {
  render() {
    return (
      <Wrapper>
        <MainRail {...this.props} />
      </Wrapper>
    );
  }
}

export default Homepage;

// CSS
const Wrapper = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: center;
`;
