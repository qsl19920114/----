/**
 * 图片相关API接口
 */

import request from './request';
import { API_ENDPOINTS, API_CONFIG } from '@/config/api.config';

// Mock数据（当USE_MOCK为true时使用）
import { 
  mockUploadImage, 
  mockGenerateStyles, 
  mockGetImageStatus 
} from './mock';

/**
 * 上传图片
 * @param {File} file - 图片文件
 * @param {Function} onProgress - 上传进度回调
 * @returns {Promise} 返回 { imageId, originalUrl, uploadTime }
 */
export function uploadImage(file, onProgress) {
  // 如果使用Mock数据
  if (API_CONFIG.USE_MOCK) {
    return mockUploadImage(file);
  }
  
  // 真实API调用
  const formData = new FormData();
  formData.append('file', file);
  formData.append('timestamp', Date.now());
  
  return request({
    url: API_ENDPOINTS.UPLOAD_IMAGE,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // 上传进度回调
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
        console.log('📤 上传进度:', percentCompleted + '%');
      }
    },
  });
}

/**
 * 生成皮影样式图片
 * @param {Object} params - 参数
 * @param {string} params.imageId - 上传后的图片ID
 * @param {number} params.styleCount - 生成样式数量（默认3）
 * @returns {Promise} 返回 { taskId, estimatedTime }
 */
export function generateStyles(params) {
  // 如果使用Mock数据
  if (API_CONFIG.USE_MOCK) {
    return mockGenerateStyles(params);
  }
  
  // 真实API调用
  return request({
    url: API_ENDPOINTS.GENERATE_STYLES,
    method: 'post',
    data: params,
  });
}

/**
 * 查询图片生成状态
 * @param {string} taskId - 生成任务ID
 * @returns {Promise} 返回 { status, progress, images?, error? }
 */
export function getImageStatus(taskId) {
  // 如果使用Mock数据
  if (API_CONFIG.USE_MOCK) {
    return mockGetImageStatus(taskId);
  }
  
  // 真实API调用
  return request({
    url: `${API_ENDPOINTS.GET_IMAGE_STATUS}/${taskId}`,
    method: 'get',
  });
}

/**
 * 上传并生成样式（组合接口，简化调用）
 * @param {File} file - 图片文件
 * @param {number} styleCount - 生成样式数量（默认3）
 * @param {Function} onUploadProgress - 上传进度回调
 * @returns {Promise} 返回任务ID
 */
export async function uploadAndGenerate(file, styleCount = 3, onUploadProgress) {
  try {
    console.log('🚀 开始上传并生成...');
    
    // 1. 上传图片
    const uploadResult = await uploadImage(file, onUploadProgress);
    console.log('✅ 图片上传成功:', uploadResult);
    
    // 2. 生成样式
    const generateResult = await generateStyles({
      imageId: uploadResult.imageId,
      styleCount,
    });
    console.log('✅ 开始生成样式:', generateResult);
    
    return generateResult;
  } catch (error) {
    console.error('❌ 上传生成失败:', error);
    throw error;
  }
}

// 导出所有接口
export default {
  uploadImage,
  generateStyles,
  getImageStatus,
  uploadAndGenerate,
};

