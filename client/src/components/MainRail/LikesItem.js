import React, { Component } from "react";
import styled from "styled-components";

class LikesItem extends Component {
  render() {
    const {
      first_name,
      last_name,
      job_title,
      company_name,
      avatar
    } = this.props.userInfo;
    return (
      <SingleLikeDiv>
        <ImgDiv>
          <Img src={avatar} />
        </ImgDiv>
        <UserNameAndTitle>
          <UserName>
            {first_name} {last_name}
          </UserName>
          <Title>
            {job_title} at {company_name}
          </Title>
        </UserNameAndTitle>
      </SingleLikeDiv>
    );
  }
}

export default LikesItem;

// CSS
const SingleLikeDiv = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ImgDiv = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;

const Img = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
`;

const UserNameAndTitle = styled.div`
  width: 100%;
  height: 6rem;
  margin-left: 1rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
`;

const Title = styled.div``;
