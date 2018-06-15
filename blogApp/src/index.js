import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './component/style.css';
import App from './App';
import Home from './component/home'; 
import HomeLogined from './component/homeLogined';
import NewPost from './component/newPost';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Router, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import history from './history'

const store = configureStore(); 

store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(
    <Provider store={store}>
       {App}
    </Provider>, 
    document.getElementById('root'),
);
registerServiceWorker();

 /* <Router history={history}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/:username' component={HomeLogined} />
                <Route path='/newpost' component={NewPost} />
            </Switch>
        </Router> */