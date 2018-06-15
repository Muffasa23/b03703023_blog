import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateUsers, userLogin } from '../actions/users';
import Simplert from 'react-simplert';
import { withRouter } from 'react-router';

let username='', password='', repeat_password=''

class LoginForm extends Component{
    

    render(){
        return(
            /* <div class="login-wrap"> */
            
                <div className="login-html">
                    <p className='banner'>Welcome</p>
                    <p className='banner'>{this.props.users.currentUsername}</p>
                    
                </div>
        )
    }
}




function mapStateToProps(state){
    return{
        users: state.users
    }
}


function mapDispatchToProps(dispatch){
    return{
        updateUsers:(newUser) => {
            dispatch(updateUsers(newUser))
        },
        userLogin:(user) => {
            dispatch(userLogin(user))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));


