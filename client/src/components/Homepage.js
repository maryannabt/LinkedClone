import React, { Component } from "react";
import styled from "styled-components";
import MainRail from "./MainRail/MainRail";
import { withRouter } from "react-router";

class Homepage extends Component {
  render() {
    return (
      <Wrapper>
        <MainRail {...this.props} />
      </Wrapper>
    );
  }
}

export default withRouter(Homepage);

// CSS
const Wrapper = styled.div`
  display: flex;
  flex-basis: 100%;

  @media only screen and (max-width: 580px) {
    justify-content: center;
  }
`;
