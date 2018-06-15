import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

let title,time,body;

export default class ArticleContent extends Component{
    componentDidMount(){
        fetch('http://localhost:5566/posts')
            .then(res => res.json().then( data => {
                console.log("data", JSON.stringify(data).replace(/\\n/g, "\\n"));
                this.setState({posts: data});
            })
        );
    }

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    
        // Set the state directly. Use props if necessary.
        this.state = {
          posts: []
        }
      }

      

      render(){
        console.log(this.state.posts);
        if (this.state.posts.length !== 0){
            title = this.state.posts[0].title
            body = this.state.posts[0].body
            time = this.state.posts[0].updated_at
        }
        else{
            title = null
            body = null
            time = null
        }
        


        return(
            <div className='articleContent'>
                <div className='articleTitle'>{title} </div>
                <div className='articleTime'>{time} </div>
                <div className='articleBody'>{body} </div>
            </div>
        )
    }
}