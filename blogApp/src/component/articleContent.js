import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updatePosts, getTitle, getContent, getTime } from '../actions/posts';

class ArticleContent extends Component{
    componentDidMount(){
        fetch('http://localhost:5566/posts')
            .then(res => res.json().then( data => {
                this.props.updatePosts(data);
            })
        );
    }

    constructor(props) {
        super(props);
      }

      render(){
        if(this.props.posts.totalPost.length !== 0){
            return(
                <div className='articleContent'>
                    <div className='articleTitle'>{this.props.posts.currentTitle==='' ? this.props.posts.totalPost[0].title:this.props.posts.currentTitle} </div>
                    <div className='articleTime'>{this.props.posts.currentTimee==='' ? this.props.posts.totalPost[0].created_at:this.props.posts.currentTime} </div>
                    <div className='articleBody'>{this.props.posts.currentContent==='' ? this.props.posts.totalPost[0].body:this.props.posts.currentContent}</div>
                </div>
            )
        }
        else{
            return null
        }
        
    }
}

function mapStateToProps(state){
    return{
        posts: state.posts,
        users: state.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        updatePosts:(posts) => {
            dispatch(updatePosts(posts))
        },
        getTitle:(title) => {
            dispatch(getTitle(title))
        },
        getContent:(content) => {
            dispatch(getContent(content))
        },
        getTime:(time) => {
            dispatch(getTime(time))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleContent));