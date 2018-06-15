import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class HeadBarLogined extends Component{
   
    render(){
 
        return(
            <div className="header">
                <div className="wrap">
                    <div className="titleArea">
                        <h1 className="title">
                            Blog
                        </h1>
                    </div>

                    <nav>
                        <ul className="menu">
                            <li><Link to={'/'+this.props.users.currentUsername }>Home</Link></li>
                            <li><Link to={'/newpost/'+this.props.users.currentUsername }>NewPost</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        users: state.users
    }
}


export default withRouter(connect(mapStateToProps,null)(HeadBarLogined));