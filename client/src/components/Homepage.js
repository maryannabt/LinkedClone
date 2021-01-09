import React, { Component } from "react";
import styled from "styled-components";
import MainRail from "./MainRail/MainRail";
import LeftRail from "./LeftRail/LeftRail";
import RightRail from './RightRail/RightRail';

class Homepage extends Component {
  render() {
    return (
      <Wrapper>
        <LeftRail />
        <MainRail {...this.props} />
        <RightRail />
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
