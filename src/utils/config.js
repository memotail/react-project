// 开发环境，使用默认配置
let urlPath = {
  protocol: 'https',
  hostname: 'b2btst2.win'
};

// 编译后环境，通过location.href来定义
if (process.env.NODE_ENV === 'production') {
  const href = window.location.href;

  const match = href.match(/(http(s)?):\/\/((\w+)\.)([^/]+)(\/[^#?]+)/);
  urlPath = {
    protocol: match[1],
    domain: match[4],
    hostname: match[5],
    path: match[6]
  }
}

// 配置文件
const config = {};

config.getPath = (url, domain = 'api') => {
  return `${urlPath.protocol}://${domain}.${urlPath.hostname}/${url}`
}

config.createPath = (domain) => {
  return (url) => {
    return config.apiPath(url, domain);
  }
}

export default config;
