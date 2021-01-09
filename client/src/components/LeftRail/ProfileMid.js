import React, { Component } from 'react';
import styled from 'styled-components';

class ProfileMid extends Component {

    render() {
        return (

            <Mid>
                <ProfileViews>
                    <div>
                        Who's viewed your profile
                    </div>
                    <IntDiv>
                       150
                    </IntDiv>
                </ProfileViews>
                <PostsViews>
                    <div>
                        Views of your post
                    </div>
                    <IntDiv>
                       1,155
                    </IntDiv>
                </PostsViews>
            </Mid>
        )
    }
}

export default ProfileMid;

// CSS
const Mid = styled.div`
border-bottom: 1px solid #d9d9d9;
height: 7.3rem;
width: 21.6rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center; 
`

const ProfileViews = styled.p`
height: 2rem;
width: 19rem;
display: flex;
justify-content: space-between;
align-items: center;
text-decoration: none;
font-size: 1.2rem;
color: rgba(0,0,0,.6);
font-weight: 600;

& div:hover {
    color: #0073b1;
    text-decoration: underline;
}
`

const PostsViews = styled(ProfileViews)`
margin-top: 0.4rem;
`

const IntDiv = styled.div`
color: #0173b1;
`