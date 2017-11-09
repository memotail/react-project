// 将更改的配置文件转化为js，用于webpack配置
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

module.exports = () => {
  const themePath = path.join(__dirname, './default.less');
  const theme = lessToJs(fs.readFileSync(themePath, 'utf8'));
  return theme;
};
