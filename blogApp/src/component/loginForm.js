import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateUsers, userLogin } from '../actions/users';
import Simplert from 'react-simplert';
//mport history from '../history'
import { withRouter } from 'react-router'

let username='', password='', repeat_password=''
//console.log(username);

class LoginForm extends Component{
    constructor(props){
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getRepeatPassword = this.getRepeatPassword.bind(this);
    }
    
    componentDidMount(){
        fetch('http://localhost:5566/users')
            .then(res => res.json().then( data => {
                //console.log("data", JSON.stringify(data));
                this.props.updateUsers(JSON.stringify(data));
            })
        );
    }

    handleLogin(e){
        if(username !== '' && password !== ''){
            let data = {
                purpose:'login',
                username: username,
                password: password,
            }

            fetch('http://localhost:5566/users',{
                method: 'POST',
                headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json','Accept': 'application/json'},
                body: JSON.stringify(data)
            }).then(res => res.json()
            .then(data => {
                //console.log('login info: ',JSON.stringify(data))    
                if(data === 'login success'){
                   this.props.userLogin(username);
                   this.props.history.push(username);
                }

                else{
                    this.props.users.isGuest=true;
                }

            })
        )
        }
    }

    handleRegister(e){
        if(username !== '' && password !== '' && password === repeat_password){

            let time = new Date().toLocaleString

            //console.log(time)
            let data = {
                purpose:'addUser',
                username: username,
                role: 'author',
                password: password,
                created_at: time,
                updated_at: time,
            }
            

            fetch('http://localhost:5566/users',{
                method: 'POST',
                headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json','Accept': 'application/json'},
                body: JSON.stringify(data)
            }).then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            })
            .catch(function(err) {
                console.log(err)
            });

        }

    }

    getUsername(e){
        username=e.target.value;
    }
    getPassword(e){
        password=e.target.value;
    }
    getRepeatPassword(e){
        repeat_password=e.target.value;
    }

    render(){
        return(
            /* <div class="login-wrap"> */
            
                <div className="login-html">
                
                {this.props.users.registerSuccess ?  
                 <Simplert 
                    showSimplert={ true }
                    type={'success'}
                    title={ 'Register Success' }
                    message={ 'Please sign in with your username and password' }
                /> : null}

                {this.props.users.isGuest ?  
                 <Simplert 
                    showSimplert={ true }
                    type={'success'}
                    title={ 'Register Success' }
                    message={ 'Please sign in with your username and password' }
                /> : null}

                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input" onChange={this.getUsername}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password" onChange={this.getPassword}/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In" onClick={(e) => this.handleLogin(e)}/>
                            </div>
                            <div className="hr"></div>
                        </div>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input" onChange={this.getUsername}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password" onChange={this.getPassword}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Repeat Password</label>
                                <input id="pass" type="password" className="input" data-type="password" onChange={this.getRepeatPassword}/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up" onClick={(e) => this.handleRegister(e)}/>
                            </div>
                            <div className="hr"></div>
                        </div>
                    </div>
                </div>
            /*  </div>  */
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


