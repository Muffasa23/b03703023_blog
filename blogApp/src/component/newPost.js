import React, { Component } from 'react';
import HeadBarLogined from './headBarLogined';
import ReactMarkdown from 'react-markdown';
import LoginFormLogined from './loginFormLogined';
import ArticleList from './articleList';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { updatePosts, submit, redirectFalse } from '../actions/posts';

let newPostTitle='', newPostContent='';


class NewPost extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:5566/posts')
            .then(res => res.json().then( data => {
                //console.log("data", JSON.stringify(data));
                this.props.updatePosts(data);
            })
        );
    }

    getTitle(e){
        newPostTitle=e.target.value;
    }

    getContent(e){
        newPostContent=e.target.value;
    }

    handleSubmit(e){
        //console.log(newPostTitle)
        //console.log(newPostContent)
        if(newPostTitle !=='' && newPostContent !== ''){
            let time = new Date().toLocaleString
            let data = {
                purpose:'addPost',
                title: newPostTitle,
                body: newPostContent,
                image: 'none',
                published: 1,
                created_at: time,
                updated_at: time,
            }

            fetch('http://localhost:5566/posts',{
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

            this.props.submit();
        }
    }

    render(){
        if (this.props.posts.redirect) {
            this.props.redirectFalse()
            return <Redirect to={'/'+this.props.users.currentUsername} />;
          }

        return(
            <div>
                <HeadBarLogined/>
                <div className='newPost'>
                    <div><textarea rows="1" cols="50" placeholder='Please enter title...' onInput={(e)=>this.getTitle(e)}></textarea></div>
                    <div><textarea rows="10" cols="50" onInput={(e)=>this.getContent(e)}></textarea></div>
                    <div><button className='submitButton' onClick={(e) => this.handleSubmit(e)}>Submit</button></div>
                </div>
                <div className='rightSider'>
                <LoginFormLogined/>
                <ArticleList/>
                </div>
            </div>
        )
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
        submit:() => {
            dispatch(submit())
        },
        redirectFalse:() => {
            dispatch(redirectFalse())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));
