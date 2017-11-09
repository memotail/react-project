// 主要更改ant-design全局调用的配置
import {
  message
} from 'antd';

// 将message到顶部的距离更改，持续时间也更改
message.config({
  top: 50,
  duration: 4
});
