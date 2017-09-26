import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { AppContainer } from 'react-hot-loader';

// ReactDOM.render(<App />, document.getElementById('root'));

const render = Component => {
  if (document.getElementById('root')) {
    ReactDOM.render(
      <AppContainer>
        <Component />
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
