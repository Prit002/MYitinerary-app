import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Cities from './Cities';
import MYtinerary from './MYtinerary';
import Account from './Account';
import Login from './Login';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer'


const store = createStore(rootReducer,
  compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
//Router
const routing = (
    <Router>
      {/* <div> */}
        {/* <ul>
        <li>
          <Link to="/App">App</Link>
        </li>
        <li>
          <Link to="/Cities">Cities</Link>
        </li>
        <li>
          <Link to="/MYtinerary">MYtinerary</Link>
        </li>
        <li>
          <Link to="/Account">Account</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul> */}
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Cities" component={Cities} />
        <Route path="/Account" component={Account} />
        <Route path="/Mytinerary/:city" component={MYtinerary} />
        <Route path="/Login" component={Login} />
        <Route path="/auth/google/redirect" component={Login} />
        {/* <Route path="/Logout" component={Logout} /> */}
        </Switch>

      {/* </div> */}
    </Router>
  )

ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
