# 使用redux实现状态管理
初始化redux配置，使用redux做状态管理

1. 安装`redux`、`react-redux`、`react-router-redux`
```
yarn add redux react-redux react-router-redux@next
```

2. 添加根reducers，`./src/reducers.js`

3. 安装中间件，方便开发
    - `redux-thunk` 让action支持函数调用方式
    - `redux-logger` 浏览器输出每次reducer变更的情况
    - `redux-devtools-extension` 若安装了`Redux DevTools`chrome插件，则能通过该插件控制和查看状态

4. redux配置
    1. 新建`./src/configuerStore.js`用于配置中间件来创建store
      ```javascript
      // ./src/configuerStore.js

      import { createStore, applyMiddleware } from 'redux';
      import { routerMiddleware } from 'react-router-redux';

      import { composeWithDevTools } from 'redux-devtools-extension';
      import createHistory from 'history/createHashHistory';
      import thunk from 'redux-thunk';
      import rootReducer from './reducers';

      const history = createHistory();

      // 中间件集合
      const middleware = routerMiddleware(history);
      const middlewares = [thunk, middleware];

      // 开发环境，添加开发中间件
      if(process.env.NODE_ENV === 'development') {
        const { createLogger } = require('redux-logger');

        const logger = createLogger({ collapsed: true });
        middlewares.push(logger);
      }

      export default function configureStore(initialState) {
        const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

        return {
          history,
          store
        };
      }


      // ./src/index.js

      import { Provider } from 'react-redux';
      import { ConnectedRouter } from 'react-router-redux';
      import configureStore from './configureStore';

      // 初始化redux配置，生成store
      const { history, store } = configureStore();

      // 将`react-router-dom`的 `Router` 改为 `react-router-redux` 的 `ConnectedRouter`，并使用`Provider`包裹;
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
      ```
