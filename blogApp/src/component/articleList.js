import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { updatePosts, getTitle, getContent, getTime } from '../actions/posts';

class ArticleList extends Component{
    constructor(props) {
        super(props);
        this.handleChangePost = this.handleChangePost.bind(this);
      }


    componentDidMount(){
        fetch('http://localhost:5566/posts')
            .then(res => res.json().then( data => {
                this.props.updatePosts(data);
            })
        );
    }

    

      handleChangePost(e){
          this.props.getTitle(e.currentTarget.textContent)

          let data={
              purpose: 'showPost',
              title: e.currentTarget.textContent
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
            }).then(data => {
                this.props.getContent(data[0].body);
                this.props.getTime(data[0].created_at);
            }).catch(function(err) {
                console.log(err)
            });

      }

      render(){
        
        if(this.props.posts.totalPost.length !== 0){
            return(
                <div className='articleContainer'>
                    <li className='widget-article'>
                        <h3 className='articleListTitle'>List of Articles</h3>
                        <ul className='articleList'>
                            {this.props.posts.totalPost.map(function(post){
                                return (
                                    <li className='articleCell'>
                                        <div className='articleCellTitle' onClick={this.handleChangePost}>{post.title}</div>
                                    </li>
                            )
                            },this)}
                        </ul>
                    </li>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleList));
