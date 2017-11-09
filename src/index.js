import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './configureStore';

import { AppContainer } from 'react-hot-loader';
import App from './routes/App';
import registerServiceWorker from './registerServiceWorker';

// 重置css
import './theme/index.less'
import './theme/config';

const { history, store } = configureStore();

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
  module.hot.accept('./routes/App', () => {
    render(App);
  });
}

registerServiceWorker();
