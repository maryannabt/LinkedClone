import React, { Component } from "react";
import styled from "styled-components";
import BgImg from "../../img/leftrail_profile_bg.png";

class ProfileTop extends Component {
  state = {
    descriptionShowMore: false
  };

  displayDescription = () => {
    this.setState(prevState => ({
      descriptionShowMore: !prevState.descriptionShowMore
    }));
  };

  render() {
    const { selectedUser, user } = this.props;
    return (
      <Wrapper>
        <Profile>
          <ProfileImg>
            <Img src={selectedUser.avatar} />
          </ProfileImg>
          <ProfileLeft>
            <UserName>
              {selectedUser.first_name} {selectedUser.last_name}
            </UserName>
            <Title>
              {selectedUser.job_title} at {selectedUser.company_name}
            </Title>
            <MQInfo>{selectedUser.last_name} · The Open University</MQInfo>
            <Location>{selectedUser.country}</Location>
            {user && selectedUser._id !== user._id && (
              <Buttons>
                <ConnectButton>Connect</ConnectButton>
                <MessageButton>Message</MessageButton>
                <MoreButton>More...</MoreButton>
              </Buttons>
            )}
            {user && selectedUser._id === user._id && (
              <Buttons>
                <AddSectionButton>
                  Add profile section <i className="fas fa-sort-down"></i>
                </AddSectionButton>
                <MoreButton>More...</MoreButton>
              </Buttons>
            )}
          </ProfileLeft>
          <ProfileRight>
            <InfoButton>
              <InfoIcon>
                <i className="fas fa-building"></i>
              </InfoIcon>
              <InfoText>{selectedUser.company_name}</InfoText>
            </InfoButton>

            <InfoButton>
              <InfoIcon>
                <i className="fas fa-university"></i>
              </InfoIcon>
              <InfoText>HaKfar HaYarok - Environmental Leadership</InfoText>
            </InfoButton>

            <InfoButton>
              <InfoIconNoBG>
                <i className="far fa-address-book"></i>
              </InfoIconNoBG>
              <InfoText>See Contact Info</InfoText>
            </InfoButton>

            <InfoButton>
              <InfoIconNoBG>
                <i className="fas fa-user-friends"></i>
              </InfoIconNoBG>
              <InfoText>0 Conections</InfoText>
            </InfoButton>
          </ProfileRight>
        </Profile>

        <Description showMore={this.state.descriptionShowMore}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nulla
            massa, tempus quis enim ac, congue dapibus nunc. Vestibulum erat
            tellus, laoreet a egestas id, vulputate et neque. Sed non fermentum
            libero, at aliquam magna. Aenean sed eleifend sapien. In sodales
            metus sit amet arcu faucibus venenatis. Phasellus molestie nunc ac
            auctor congue. Praesent congue erat sit amet tempus condimentum.
            Morbi vel est non lorem sollicitudin commodo. Nulla facilisi.
            Praesent varius facilisis libero ac blandit. Curabitur eu urna eget
            tortor hendrerit accumsan id in nulla. Etiam commodo est quis lorem
            egestas, id efficitur erat laoreet. Maecenas tempor lorem nisl, id
            auctor purus vestibulum ac. Aenean dui lacus, facilisis sit amet
            pretium sollicitudin, hendrerit vel sem. Aliquam in erat eu est
            imperdiet tristique vel sit amet elit. Fusce nec euismod tortor, nec
            dignissim arcu. Duis quis ex vel lorem feugiat venenatis. Curabitur
            vel ipsum tellus. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Curabitur ultricies
            iaculis commodo. Suspendisse tincidunt sollicitudin felis, a
            fringilla nunc interdum eu. Maecenas feugiat velit id est tincidunt
            accumsan. Morbi mollis commodo porta. Morbi sit amet congue orci.
            Duis et sapien ligula. Nulla ut justo id arcu faucibus facilisis
            vitae sed orci. Integer efficitur ornare tortor, eget laoreet quam
            viverra sed. Nam vitae ante ac sapien sodales iaculis. Sed pretium
            viverra efficitur. Morbi nulla metus, accumsan id ligula id, ornare
            lobortis odioas.
          </p>
        </Description>

        <ShowMore
          onClick={this.displayDescription}
          showMore={this.state.descriptionShowMore}
        >
          {!this.state.descriptionShowMore && "Show More"}
          {this.state.descriptionShowMore && "Show Less"}
          <i className="fas fa-angle-down"></i>
        </ShowMore>
      </Wrapper>
    );
  }
}

export default ProfileTop;

// CSS
const Wrapper = styled.div`
  background-color: white;
  margin-bottom: 2rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  transition: box-shadow 83ms;
`;

const Profile = styled.div`
width: 100%;
height: 42.5rem;
background-image: url("${BgImg}");
background-size: 79.2rem 19.8rem;
background-repeat: no-repeat;
display: flex;
align-items: flex-end;
justify-content: space-between;
padding-bottom: 2rem;
position: relative;

@media only screen and (max-width: 580px) {
height: 49.5rem;
}
`;

const ProfileImg = styled.div`
  position: absolute;
  top: 12rem;
  left: 4rem;
  width: 14rem;
  height: 14rem;
  border: 0.1rem solid black;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 580px) {
    left: calc(50% - 7rem);
  }
`;

const Img = styled.img`
  width: 13.8rem;
  height: 13.8rem;
  border-radius: 50%;
`;

const ProfileLeft = styled.div`
  width: 48.8rem;
  margin-left: 2.5rem;
  height: 15.2rem;
  background-color: white;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 580px) {
    width: 100%;
    align-items: center;
    height: 22.2rem;
  }
`;

const UserName = styled.div`
  font-size: 2.2rem;
  color: rgba(0, 0, 0, 0.9);
  padding: 0.5rem 0;

  @media only screen and (max-width: 580px) {
    font-size: 3.4rem;
  }
`;

const Title = styled.div`
  padding: 0.5rem 0;
  font-size: 1.8rem;
  color: rgba(0, 0, 0, 0.9);

  @media only screen and (max-width: 580px) {
    font-size: 2.4rem;
  }
`;

const MQInfo = styled.div`
  display: none;
  font-size: 1.8rem;

  @media only screen and (max-width: 580px) {
    display: flex;
  }
`;

const Location = styled.div`
  padding: 0.5rem 0;

  @media only screen and (max-width: 580px) {
    font-size: 1.8rem;
  }
`;

const Buttons = styled.div`
  padding: 0.5rem 0;
`;

const ConnectButton = styled.button`
  border: none;
  width: 11rem;
  height: 4rem;
  font-weight: 600;
  background-color: #0073b1;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;

  &:hover {
    background-color: #006097;
  }

  @media only screen and (max-width: 580px) {
    width: 14.5rem;
    height: 6rem;
  }
`;

const MessageButton = styled.button`
  border: none;
  width: 14.2rem;
  height: 4rem;
  margin-left: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px #0073b1, inset 0 0 0 2px transparent,
    inset 0 0 0 1px transparent;
  color: #0073b1;
  background-color: transparent;
  cursor: pointer;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;

  &:hover {
    background-color: rgba(152, 216, 244, 0.25);
    box-shadow: inset 0 0 0 1px #0073b1, inset 0 0 0 2px #006097,
      inset 0 0 0 1px transparent;
  }

  @media only screen and (max-width: 580px) {
    width: 14.5rem;
    height: 6rem;
  }
`;

const MoreButton = styled.button`
  border: none;
  width: 7.5rem;
  height: 4rem;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: 600;
  box-shadow: inset 0 0 0 0.1rem rgba(0, 0, 0, 0.6);
  background-color: transparent;
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.6rem;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
    box-shadow: inset 0 0 0 0.1rem rgba(0, 0, 0, 0.6),
      inset 0 0 0 0.2rem rgba(0, 0, 0, 0.75), inset 0 0 0 0.1rem transparent;
  }

  @media only screen and (max-width: 580px) {
    width: 14.5rem;
    height: 6rem;
  }
`;

const ProfileRight = styled.div`
  height: 20.2rem;
  width: 23.2rem;
  margin-right: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media only screen and (max-width: 580px) {
    display: none;
  }
`;

const AddSectionButton = styled(ConnectButton)`
  width: 19.5rem;
  height: 4rem;

  & i {
    margin-left: 0.5rem;
    vertical-align: top;
  }

  @media only screen and (max-width: 580px) {
    width: 18.5rem;
    height: 6rem;
  }
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  width: 23.2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
`;

const InfoIcon = styled.div`
  background-color: #b3b6b9;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  font-size: 1.4rem;
`;

const InfoIconNoBG = styled(InfoIcon)`
  background-color: transparent;
  font-size: 2rem;
`;

const InfoText = styled.div`
  width: 20rem;
  margin-left: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
`;

const Description = styled.div`
  margin: 0 2rem;
  color: rgba(0, 0, 0, 0.9);
  border-top: 0.1rem solid rgba(0, 0, 0, 0.15);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.15);
  padding: 1rem 0;
  width: 74.2rem;
  max-height: ${props => (props.showMore ? "max-content" : "15.5rem")};
  overflow: hidden;

  @media only screen and (max-width: 580px) {
    display: none;
  }
`;

const ShowMore = styled.div`
  width: 100%;
  height: 4.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #0073b1;
  font-size: 1.6rem;
  font-weight: 600;

  & i {
    font-size: 2rem;
    margin-left: 1rem;
    transform: ${props => (props.showMore ? "rotate(180deg)" : "none")};
  }

  @media only screen and (max-width: 580px) {
    display: none;
  }
`;
