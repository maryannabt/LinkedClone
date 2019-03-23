/* Rendered in App component with path "/mynetwork". */

import React, { Component } from "react";
import styled from "styled-components";
import beast_pic from "../../img/beast-404.ce38fcf80386.png";
import left_eye from "../../img/beast-404_LE.f1435cace4b4.png";
import right_eye from "../../img/beast-404_RE.2e53f96c5abb.png";

class MyNetwork extends Component {
  render() {
    return (
      <Main>
        <Box>
          <Beast>
            <Img src={beast_pic} />
            <Left src={left_eye} />
            <Right src={right_eye} />
          </Beast>
          <Msg>
            <Header>PAGE NOT FOUND</Header>
            <Text>The green monster has been nibbling the cables again...</Text>
          </Msg>
        </Box>
      </Main>
    );
  }
}

export default MyNetwork;

// CSS
const Main = styled.div`
  margin-top: 5.3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const Box = styled.div`
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Beast = styled.div`
  position: relative;
`;

const Img = styled.img``;

const Left = styled.img`
  position: absolute;
  left: 105px;
  top: 45px;
  animation-name: crazylefteye;
  animation-delay: 1s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-play-state: running;

  @keyframes crazylefteye {
    0% {
      left: 105px;
      top: 45px;
    }
    10% {
      left: 98px;
      top: 36px;
    }
    20% {
      left: 98px;
      top: 36px;
    }
    40% {
      left: 128px;
      top: 42px;
    }
    50% {
      left: 125px;
      top: 52px;
    }
    60% {
      left: 101px;
      top: 50px;
    }
    70% {
      left: 105px;
      top: 45px;
    }
    100% {
      left: 105px;
      top: 45px;
    }
  }
`;

const Right = styled.img`
  position: absolute;
  left: 211px;
  top: 48px;
  animation-name: crazyrighteye;
  animation-delay: 1s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-play-state: running;

  @keyframes crazyrighteye {
    0% {
      left: 211px;
      top: 48px;
    }
    10% {
      left: 192px;
      top: 42px;
    }
    20% {
      left: 192px;
      top: 42px;
    }
    40% {
      left: 219px;
      top: 44px;
    }
    50% {
      left: 220px;
      top: 60px;
    }
    60% {
      left: 195px;
      top: 53px;
    }
    70% {
      left: 211px;
      top: 48px;
    }
    100% {
      left: 211px;
      top: 48px;
    }
  }
`;

const Msg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 3rem;
`;

const Header = styled.span`
  font-size: 5rem;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const Text = styled.span`
  margin-top: 2rem;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
`;
