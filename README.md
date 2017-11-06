# 添加redux异步请求配置
添加异步请求，完成从redux到react的数据传递

1. 安装 `babel-plugin-transform-decorators-legacy`, 让babel支持`ES6 Decorator` 默认安装的`babel-preset-react-app`不含该模块
    ```
    // 安装包
    yarn add babel-plugin-transform-decorators-legacy --dev

    // 在./package.json 更改添加该插件，配置如下：
    "babel": {
      "presets": [
        "react-app"
      ],
      "plugins": [
        "babel-plugin-transform-decorators-legacy"
      ]
    }
    ```
2. 安装 中间件 `redux-pack`，在`./src/configureStore`中注入， 用于异步actions,
    ```
    yarn add redux-pack

    // ./src/configureStore.js
    import { middleware as reduxPackMiddleware } from 'redux-pack';
    const middlewares = [thunk, historyMiddleware, reduxPackMiddleware];
    ```
3. 添加配置文件，用于全局配置，以及环境选择 `./src/utils/config.js`

4. 添加fetch封装，用于请求封装 `./src/utils/api.js`
> 对fetch进行封装，配置对应get/post等默认参数以及参数转化，方便使用

5. 使用redux，完成movie模块请求交互
    1. movie文件夹，添加`constants.js` `actions.js`、`reducers.js`文件
    2. 在`constants.js`中添加常量配置，以供`actions.js` 以及 `reducers.js`使用
    3. `actions.js`添加action，在action中发起请求，`redux-pack`来传递到reducers
      ```javascript
      // actions.js
      export function loadMovieTheaters() {
        return {
          type: types.loadMovieTheaters,
          promise: api.get('/proxy/douban/v2/movie/in_theaters')
        };
      }
      ```
    4. `reducers.js`响应请求，通过`redux-pack`提供的handle来处理请求的几个状态（请求前、请求成功、请求失败）
      ```javascript
      import { handle } from 'redux-pack';

      function reducer(state={
        isLoading: false,
        isLoaded: false,
        data: {}
      }, action) {
        switch(action.type) {
          // 加载正在上映的电影列表
          case types.loadMovieTheaters:
            return handle(state, action, {
              start: (prevState) => {
                return {
                  ...prevState,
                  isLoading: true
                };
              },
              success: (prevState) => {
                return {
                  ...prevState,
                  isLoading: false,
                  isLoaded: true,
                  data: action.payload
                };
              },
              failure: (prevState) => {
                return {
                  ...prevState,
                  isLoading: false,
                  isLoaded: true,
                  error: action.payload
                };
              }
            });
          default:
            return state;
        }
      }
      ```
    5. `Movie/Index/index.js` 模块通过`react-redux`的`connect`，把`redux`的`action`以及`state`注入到react
      ```javascript
      // 解释器，步骤1是为了这里准备的
      @connect(
        state => state.movie,
        dispatch => bindActionCreators(actions, dispatch)
      )
      class Movie extends React.Component {
        // ...
      }
      ```
