import config from './config';

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    params.forEach((val, key) => {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (isArray(val)) {
        key = key + '[]';
      }

      if (!isArray(val)) {
        val = [val];
      }

      val.forEach((v) => {
        if (isDate(v)) {
          v = v.toISOString();
        } else if (isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

// 默认配置
const defaultOptions = {
  mode: 'cors',
  credentials: 'include'
};

// http 判断
function checkStatus(response) {
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

// 转化为json输出
function parseJSON(response) {
  return response.json();
}

// 业务判断
function checkCode(response) {
  // 当存在success，并且等于false，则
  if (response.success === false) {
    var error = new Error(response.message || '操作失败')
    error.response = response
    throw error;
  }

  return response;
}

function _fetch(url, options) {
  // 若是 / 开头，并不是/proxy 开头，则补全定义的地址
  // 其他情况，则直接使用
  const furl = (url.indexOf('/') === 0 && url.indexOf('/proxy/') !== 0) ? config.getPath(url, 'api') : url;

  return fetch(furl, {
    ...defaultOptions,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
}

function get(url, data) {
  const furl = data ? buildURL(url, data) : url;
  return _fetch(furl);
}

function post(url, data) {
  return _fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(data)
  })
}

export default {
  get,
  post,
  fetch: _fetch
};
