import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter as Router } from "react-router-dom";

export const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
