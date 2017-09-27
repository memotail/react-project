import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));

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
