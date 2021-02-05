import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './z/reportWebVitals';
import {createStore, applyMiddleware, Store} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer, { ReactState } from './reducers/reducer';
import {ReactAction} from './actions/actions';
import './global.css'

const store: Store<ReactState, ReactAction> = createStore(reducer, applyMiddleware(thunk)); 


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
