import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { AppContainer } from 'react-hot-loader';
// import { BrowserRouter as Router } from "react-router-dom";

// redux config
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let store;
const history = createHistory();

// 中间件集合
const middleware = routerMiddleware(history);
const middlewares = [thunk, middleware];

// 开发环境，添加开发中间件
if(process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const { composeWithDevTools } = require('redux-devtools-extension');

  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);

  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  store = createStore(rootReducer, applyMiddleware(...middlewares));
}
// redux config .end

const render = Component => {
  if (document.getElementById('root')) {
    ReactDOM.render(
      <AppContainer>
        <Provider store={ store }>
          <ConnectedRouter history={ history }>
            <Component />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  }
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}

registerServiceWorker();
