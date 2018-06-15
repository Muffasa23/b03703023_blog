import React, { Component } from 'react';
import HeadBarLogined from './headBarLogined';
import  ReactMarkdown from 'react-markdown';
import LoginFormLogined from './loginFormLogined';
import ArticleList from './articleList';



export default class NewPost extends Component {
    render(){

        return(
            <div>
                <HeadBarLogined/>
                <div className='newPost'>
                    <div><textarea rows="1" cols="50"></textarea></div>
                    <div><textarea rows="10" cols="50"></textarea></div>
                </div>
                <div className='rightSider'>
                <LoginFormLogined/>
                <ArticleList/>
                </div>
            </div>
        )
    }
    
}
