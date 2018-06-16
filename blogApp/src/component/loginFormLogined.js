import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateUsers, userLogin } from '../actions/users';
import Simplert from 'react-simplert';
import { withRouter } from 'react-router';

let username='', password='', repeat_password=''

class LoginForm extends Component{
    componentDidMount(){
        let data={purpose:'getUsername'}
        fetch('http://localhost:5566/users',{
                method: 'POST',
                headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json','Accept': 'application/json'},
                body: JSON.stringify(data)
            }).then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            }).then(data => {
                if(data !== ''){
                   this.props.userLogin(data);
                }
            }).catch(function(err) {
                console.log(err)
            });
    }

    render(){
        return(
           
            <div className="login-html">
               {/*  <svg version="1.1" className="user-icon" x="0px" y="0px"
                    viewBox="-255 347 100 100"  height="36px" width="30px">
                    <path class="user-path" d="
                    M-203.7,350.3c-6.8,0-12.4,6.2-12.4,13.8c0,4.5,2.4,8.6,5.4,11.1c0,0,2.2,1.6,1.9,3.7c-0.2,1.3-1.7,2.8-2.4,2.8c-0.7,0-6.2,0-6.2,0
                    c-6.8,0-12.3,5.6-12.3,12.3v2.9v14.6c0,0.8,0.7,1.5,1.5,1.5h10.5h1h13.1h13.1h1h10.6c0.8,0,1.5-0.7,1.5-1.5v-14.6v-2.9
                    c0-6.8-5.6-12.3-12.3-12.3c0,0-5.5,0-6.2,0c-0.8,0-2.3-1.6-2.4-2.8c-0.4-2.1,1.9-3.7,1.9-3.7c2.9-2.5,5.4-6.5,5.4-11.1
                    C-191.3,356.5-196.9,350.3-203.7,350.3L-203.7,350.3z"/>
                    </svg> */}
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


