# 退出登录，重置reducer到初始化状态
1. 清理`./src/routes/App/reducers.js`的 退出登录 行为
2. 将`store.remove('user');`移到 `./src/routes/App/actions.js`中处理
    ```javascript
    // 退出登录
    export function logout() {
      return {
        type: types.logout,
        promise: mock().then((response) => {
          // 删掉用户信息存储
          store.remove('user');

          return response;
        })
      }
    }
    ```
3. 更改`./src/reducers.js`，添加退出登录判定，以及重置state
    ```javascript
    // 更改前
    function makeRootReducer(asyncReducers) {
      return combineReducers({
        app,
        router: routerReducer,
        ...asyncReducers
      });
    }

    // 更改后
    import * as appTypes from './routes/App/constants';

    // 若退出登录，则重置所有state
    function resetReducer(rootReducer) {
      return (state, action) => {
        if (action.type === appTypes.logout) {
          // state为空对象，导致所有reducer的state为null，会导致使用默认state
          state = {};
        }

        return rootReducer(state, action);
      }
    };

    // 根reducer
    function rootReducer(asyncReducers = {}) {
      return combineReducers({
        app,
        router: routerReducer,
        ...asyncReducers
      });
    }

    // 构建reducer树
    function makeRootReducer(asyncReducers) {
      return resetReducer(rootReducer(asyncReducers));
    }
    ```
##### 重置reducer说明

1. 每个action的调用，都会遍历全部reducer
2. state是全部reducer公用的一个庞大的树，所以第一个reducer把公用的树重置为空后，后面的所有reducer遍历中，state的传递，就是`undefined`。
3. 所以，在根reducer最开始运行`logout`的判断，若是退出登录，则设置`state={}`，再进行剩下所有reducer的判断。
4. 当reducer进行判定时候，因为state是`undefined`，所以一开始在参数中定义的默认值就生效，如: `(state={ data={} }, action)`，然后`action.type`判定不匹配，所以直接返回state，也就是默认值。
5. 另外值得注意的是，默认值必须在参数上定义，若在函数外定义，默认值被污染，重置不了
    ```javascript
    // ES6
    function reducer(state={
        data: {}
    }, action) {
        switch(action.type) {
            // ...略
            default:
                return state;
        }
    }

    // 最终转换为
    function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: {} };
        var action = arguments[1];

        switch(action.type) {
            // ...略
            default:
                return state;
        }
    }

    // 错误定义方式
    // 这样会导致每次state变更都更改了initState，所以重置也不是默认值。
    const initState = { data: {} };
    function reducer(state=initState, action) {
        switch(action.type) {
            // ...略
            default:
                return state;
        }
    }
    ```
