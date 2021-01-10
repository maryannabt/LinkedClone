import React, { Component } from 'react';
import styled from 'styled-components';
import Messaging from './Messaging';
import { connect } from 'react-redux';
import { fetchMsgs } from './BottomReducer/Bottom.actions'

class BottomBar extends Component {

    render() {
        const { auth, user } = this.props.loginData
        const { users } = this.props.bottomData

        if (auth) {
            if (user.registrationWizard === 'done') {
                return (
                    <Wrapper>
                        <Messaging user={user} msgUsers={users} fetchMsgs={this.props.fetchMsgs}/>
                    </Wrapper>
                )
            } 
            else {
                return <div></div>
            }
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

function mapStateToProps(state) {

    const { loginData, bottomData } = state;
  
    return {
      loginData,
      bottomData
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
        fetchMsgs: (userID, str) => dispatch(fetchMsgs(userID, str))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)

// CSS
const Wrapper = styled.div`
position: fixed;
bottom: 0;
display: flex;
flex-direction: row-reverse;
width: 100%;
z-index: 2;
`
