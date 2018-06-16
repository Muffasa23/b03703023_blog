import React, { Component } from 'react';
import Home from './component/home'; 
import HomeLogined from './component/homeLogined';
import NewPost from './component/newPost';
import './App.css';
import { Router, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import history from './history'

const App=(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
        <Route exact path='/:username' component={HomeLogined} />
        <Route exact path='/newpost/:username' component={NewPost} />
    </Switch>
  </BrowserRouter>
);

export default App;







/* class App extends Component {
  render() {
    return (
      <div>
        <HeadBar/>
        <ArticleContent/>
        <div className='rightSider'>
          <LoginForm/>
          <ArticleList/>
        </div>
      </div>
    );
  }
} */