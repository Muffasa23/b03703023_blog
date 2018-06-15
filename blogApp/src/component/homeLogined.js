import React, { Component } from 'react';
import HeadBarLogined from './headBarLogined';
import ArticleContent from './articleContent';
import LoginFormLogined from './loginFormLogined';
import ArticleList from './articleList';



export default class HomeLogined extends Component {
    render(){
        return(
            <div>
                <HeadBarLogined/>
                <ArticleContent/>
                <div className='rightSider'>
                <LoginFormLogined/>
                <ArticleList/>
                </div>
            </div>
        )
    }
    
}

