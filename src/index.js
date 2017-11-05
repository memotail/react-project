import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import registerServiceWorker from './registerServiceWorker';

import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = Component => {
  if (document.getElementById('root')) {
    ReactDOM.render(
      <AppContainer>
        <Router>
          <Component />
        </Router>
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
