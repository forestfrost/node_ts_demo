import axios from "axios";
// axios 实例
const request = axios.create({
  timeout: 15 * 1000,
});
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const response = error.response;
    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }
    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message });
  }
);

export default request;
