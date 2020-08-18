import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppContainer from './comps/AppContainer.comp'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
const theAppStore = createStore( rootReducer, applyMiddleware(thunk) )
// <React.StrictMode></React.StrictMode>
ReactDOM.render(
  <Provider store={ theAppStore }>
  <React.Fragment>
    <CssBaseline />
    <AppContainer />
  </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
