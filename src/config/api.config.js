/**
 * API配置文件
 * 用于配置API地址、超时时间等
 */

// API配置
export const API_CONFIG = {
  // 是否使用Mock数据（开发时可设为true，无需启动后端）
  USE_MOCK: true,
  
  // 开发环境配置
  DEV: {
    BASE_URL: 'http://localhost:3000/api',
    TIMEOUT: 30000, // 30秒
  },
  
  // 生产环境配置
  PROD: {
    BASE_URL: 'https://api.your-domain.com/api',
    TIMEOUT: 30000,
  },
};

// 当前环境配置
export const currentConfig = import.meta.env.PROD 
  ? API_CONFIG.PROD 
  : API_CONFIG.DEV;

// API端点定义
export const API_ENDPOINTS = {
  // 图片相关接口
  UPLOAD_IMAGE: '/image/upload',          // 上传图片
  GENERATE_STYLES: '/image/generate',     // 生成样式
  GET_IMAGE_STATUS: '/image/status',      // 查询状态
  
  // 用户相关接口（可选，未来扩展）
  USER_LOGIN: '/user/login',              // 用户登录
  USER_REGISTER: '/user/register',        // 用户注册
  USER_SAVE_WORK: '/user/save-work',      // 保存作品
  USER_GET_WORKS: '/user/works',          // 获取作品列表
};

// 图片配置
export const IMAGE_CONFIG = {
  // 允许的文件类型
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ],
  
  // 文件类型描述（用于提示）
  ALLOWED_TYPES_TEXT: 'JPG、PNG、WEBP',
  
  // 最大文件大小（5MB）
  MAX_SIZE: 5 * 1024 * 1024,
  
  // 最大文件大小描述
  MAX_SIZE_TEXT: '5MB',
  
  // 生成的样式数量
  STYLE_COUNT: 3,
  
  // 图片质量（用于压缩）
  QUALITY: 0.8,
  
  // 最大宽度（用于压缩）
  MAX_WIDTH: 1920,
  
  // 最大高度（用于压缩）
  MAX_HEIGHT: 1920,
};

// 轮询配置
export const POLLING_CONFIG = {
  // 最大轮询次数
  MAX_ATTEMPTS: 60,
  
  // 轮询间隔（毫秒）
  INTERVAL: 2000, // 2秒
  
  // 超时时间（毫秒）
  TIMEOUT: 120000, // 2分钟
};

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络错误，请检查网络连接',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  UPLOAD_ERROR: '图片上传失败，请重试',
  GENERATE_ERROR: 'AI生成失败，请重试',
  FILE_TYPE_ERROR: `不支持的文件格式，请上传 ${IMAGE_CONFIG.ALLOWED_TYPES_TEXT} 格式的图片`,
  FILE_SIZE_ERROR: `文件大小不能超过 ${IMAGE_CONFIG.MAX_SIZE_TEXT}`,
  NO_IMAGE_ERROR: '请先上传一张图片',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNKNOWN_ERROR: '未知错误，请稍后重试',
};

// 导出默认配置
export default {
  API_CONFIG,
  currentConfig,
  API_ENDPOINTS,
  IMAGE_CONFIG,
  POLLING_CONFIG,
  ERROR_MESSAGES,
};

