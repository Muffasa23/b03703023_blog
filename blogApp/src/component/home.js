import React, { Component } from 'react';
import HeadBar from './headBar';
import ArticleContent from './articleContent';
import LoginForm from './loginForm';
import ArticleList from './articleList';



export default class Home extends Component {
    render(){
        return(
            <div>
                <HeadBar/>
                <ArticleContent/>
                <div className='rightSider'>
                <LoginForm history={'/'}/>
                <ArticleList/>
                </div>
            </div>
        )
    }
    
}

