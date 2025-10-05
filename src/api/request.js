/**
 * Axios请求封装
 * 统一处理请求和响应，添加拦截器
 */

import axios from 'axios';
import { currentConfig } from '@/config/api.config';

// 创建axios实例
const service = axios.create({
  baseURL: currentConfig.BASE_URL,
  timeout: currentConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    
    // 添加token（如果有的话）
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加时间戳防止缓存（GET请求）
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    
    // 打印请求日志
    console.log('📤 API请求:', {
      url: config.url,
      method: config.method,
      data: config.data || config.params,
    });
    
    return config;
  },
  (error) => {
    // 请求错误处理
    console.error('❌ 请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 打印响应日志
    console.log('📥 API响应:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    
    const res = response.data;
    
    // 根据后端返回的code判断
    // 注意：这里的判断逻辑需要根据实际后端接口调整
    if (res.code === 200 || res.code === 0 || response.status === 200) {
      // 成功：返回data字段
      return res.data || res;
    } else {
      // 业务错误
      console.error('❌ 业务错误:', res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  (error) => {
    // 响应错误处理
    console.error('❌ 响应错误:', error);
    
    let message = '网络错误，请稍后重试';
    
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          message = data.message || '请求参数错误';
          break;
        case 401:
          message = '未授权，请登录';
          // 可以在这里跳转到登录页
          // router.push('/login');
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求的资源不存在';
          break;
        case 500:
          message = '服务器错误';
          break;
        case 502:
          message = '网关错误';
          break;
        case 503:
          message = '服务暂不可用';
          break;
        case 504:
          message = '网关超时';
          break;
        default:
          message = data.message || `服务器错误 (${status})`;
      }
    } else if (error.code === 'ECONNABORTED') {
      // 请求超时
      message = '请求超时，请稍后重试';
    } else if (error.message === 'Network Error') {
      // 网络错误
      message = '网络连接失败，请检查网络';
    }
    
    // 返回友好的错误消息
    return Promise.reject(new Error(message));
  }
);

// 导出axios实例
export default service;

