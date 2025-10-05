/**
 * 图片状态管理 Store
 * 使用 Pinia 管理图片上传、生成、选择等状态
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { uploadAndGenerate, getImageStatus } from '@/api/image';
import { POLLING_CONFIG } from '@/config/api.config';

export const useImageStore = defineStore('image', () => {
  // ===== 状态定义 =====
  
  // 原始上传的图片（base64格式，用于预览）
  const originalImage = ref(null);
  
  // 原始图片文件对象（用于上传）
  const originalFile = ref(null);
  
  // 上传任务ID（用于轮询查询）
  const taskId = ref(null);
  
  // 生成的样式图片列表
  const generatedStyles = ref([]);
  
  // 用户选中的样式
  const selectedStyle = ref(null);
  
  // 处理状态
  const processingStatus = ref({
    uploading: false,     // 是否正在上传
    generating: false,    // 是否正在生成
    completed: false,     // 是否已完成
    error: null,          // 错误信息
    progress: 0,          // 当前进度 (0-100)
    message: '',          // 当前状态消息
  });
  
  // ===== 计算属性 =====
  
  /**
   * 是否正在处理（上传或生成中）
   */
  const isProcessing = computed(() => 
    processingStatus.value.uploading || processingStatus.value.generating
  );
  
  /**
   * 是否已完成
   */
  const isCompleted = computed(() => 
    processingStatus.value.completed
  );
  
  /**
   * 是否有错误
   */
  const hasError = computed(() => 
    processingStatus.value.error !== null
  );
  
  /**
   * 选中的样式图片URL
   */
  const selectedImageUrl = computed(() => 
    selectedStyle.value ? selectedStyle.value.url : null
  );
  
  /**
   * 是否有生成的样式
   */
  const hasGeneratedStyles = computed(() => 
    generatedStyles.value.length > 0
  );
  
  // ===== 方法定义 =====
  
  /**
   * 设置原始图片
   * @param {string} imageData - base64图片数据
   * @param {File} file - 文件对象
   */
  const setOriginalImage = (imageData, file) => {
    originalImage.value = imageData;
    originalFile.value = file;
    console.log('✅ 原始图片已设置');
  };
  
  /**
   * 更新处理状态
   * @param {Object} updates - 要更新的状态
   */
  const updateProcessingStatus = (updates) => {
    processingStatus.value = {
      ...processingStatus.value,
      ...updates,
    };
  };
  
  /**
   * 上传并生成样式
   * @param {number} styleCount - 生成样式数量（默认3）
   * @returns {Promise} 返回生成的样式列表
   */
  const uploadAndGenerateStyles = async (styleCount = 3) => {
    // 检查是否有图片
    if (!originalFile.value) {
      const error = new Error('没有可上传的图片');
      updateProcessingStatus({ error: error.message });
      throw error;
    }
    
    try {
      console.log('🚀 开始上传并生成样式...');
      
      // 重置状态
      updateProcessingStatus({
        uploading: true,
        generating: false,
        completed: false,
        error: null,
        progress: 10,
        message: '正在上传图片...',
      });
      
      // 1. 上传图片并开始生成
      const result = await uploadAndGenerate(
        originalFile.value, 
        styleCount,
        // 上传进度回调
        (uploadProgress) => {
          updateProcessingStatus({
            progress: Math.min(10 + uploadProgress * 0.2, 30),
            message: `正在上传图片... ${uploadProgress}%`,
          });
        }
      );
      
      // 保存任务ID
      taskId.value = result.taskId;
      
      console.log('✅ 上传完成，开始生成样式...', result);
      
      // 更新状态为生成中
      updateProcessingStatus({
        uploading: false,
        generating: true,
        progress: 30,
        message: 'AI正在分析图片...',
      });
      
      // 2. 轮询查询生成状态
      const styles = await pollGenerationStatus();
      
      console.log('✅ 样式生成完成！', styles);
      
      return styles;
    } catch (error) {
      console.error('❌ 上传生成失败:', error);
      updateProcessingStatus({
        error: error.message,
        uploading: false,
        generating: false,
        message: error.message,
      });
      throw error;
    }
  };
  
  /**
   * 轮询查询生成状态
   * @returns {Promise} 返回生成的图片列表
   */
  const pollGenerationStatus = async () => {
    const maxAttempts = POLLING_CONFIG.MAX_ATTEMPTS;
    const interval = POLLING_CONFIG.INTERVAL;
    let attempts = 0;
    
    return new Promise((resolve, reject) => {
      // 设置超时
      const timeoutTimer = setTimeout(() => {
        clearInterval(pollingTimer);
        const error = new Error('生成超时，请重试');
        updateProcessingStatus({
          error: error.message,
          generating: false,
          message: error.message,
        });
        reject(error);
      }, POLLING_CONFIG.TIMEOUT);
      
      // 开始轮询
      const pollingTimer = setInterval(async () => {
        attempts++;
        console.log(`🔄 轮询查询状态... (第${attempts}次)`);
        
        try {
          // 查询状态
          const status = await getImageStatus(taskId.value);
          
          console.log('📊 当前状态:', status);
          
          // 更新进度和消息
          const progress = Math.min(30 + (status.progress || 0) * 0.7, 99);
          updateProcessingStatus({
            progress,
            message: status.message || '正在生成样式...',
          });
          
          // 检查是否完成
          if (status.status === 'completed') {
            // 生成完成
            clearInterval(pollingTimer);
            clearTimeout(timeoutTimer);
            
            // 保存生成的样式
            generatedStyles.value = status.images || [];
            
            // 更新状态为完成
            updateProcessingStatus({
              generating: false,
              completed: true,
              progress: 100,
              message: '生成完成！',
            });
            
            resolve(status.images);
          }
          
          // 检查是否失败
          if (status.status === 'failed') {
            // 生成失败
            clearInterval(pollingTimer);
            clearTimeout(timeoutTimer);
            
            const error = new Error(status.error || '生成失败');
            updateProcessingStatus({
              error: error.message,
              generating: false,
              message: error.message,
            });
            
            reject(error);
          }
          
          // 检查是否超过最大尝试次数
          if (attempts >= maxAttempts) {
            clearInterval(pollingTimer);
            clearTimeout(timeoutTimer);
            
            const error = new Error('查询次数超限，请重试');
            updateProcessingStatus({
              error: error.message,
              generating: false,
              message: error.message,
            });
            
            reject(error);
          }
        } catch (error) {
          // 查询出错
          clearInterval(pollingTimer);
          clearTimeout(timeoutTimer);
          
          console.error('❌ 查询状态出错:', error);
          updateProcessingStatus({
            error: error.message,
            generating: false,
            message: error.message,
          });
          
          reject(error);
        }
      }, interval);
    });
  };
  
  /**
   * 选择样式
   * @param {Object} style - 样式对象
   */
  const selectStyle = (style) => {
    selectedStyle.value = style;
    console.log('✅ 样式已选择:', style);
  };
  
  /**
   * 重置所有状态
   */
  const reset = () => {
    originalImage.value = null;
    originalFile.value = null;
    taskId.value = null;
    generatedStyles.value = [];
    selectedStyle.value = null;
    processingStatus.value = {
      uploading: false,
      generating: false,
      completed: false,
      error: null,
      progress: 0,
      message: '',
    };
    console.log('🔄 Store状态已重置');
  };
  
  // ===== 持久化方法 =====
  
  /**
   * 保存到localStorage
   */
  const saveToLocal = () => {
    try {
      const data = {
        generatedStyles: generatedStyles.value,
        selectedStyle: selectedStyle.value,
        timestamp: Date.now(),
      };
      localStorage.setItem('imageStore', JSON.stringify(data));
      console.log('💾 数据已保存到本地');
    } catch (error) {
      console.error('❌ 保存到本地失败:', error);
    }
  };
  
  /**
   * 从localStorage恢复
   */
  const loadFromLocal = () => {
    try {
      const data = localStorage.getItem('imageStore');
      if (data) {
        const parsed = JSON.parse(data);
        
        // 检查数据是否过期（24小时）
        const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
        if (isExpired) {
          console.log('⚠️ 本地数据已过期，清除数据');
          localStorage.removeItem('imageStore');
          return;
        }
        
        generatedStyles.value = parsed.generatedStyles || [];
        selectedStyle.value = parsed.selectedStyle || null;
        console.log('✅ 从本地恢复数据成功');
      }
    } catch (error) {
      console.error('❌ 从本地恢复失败:', error);
      localStorage.removeItem('imageStore');
    }
  };
  
  /**
   * 清除本地存储
   */
  const clearLocal = () => {
    localStorage.removeItem('imageStore');
    console.log('🗑️ 本地数据已清除');
  };
  
  // ===== 返回 Store API =====
  
  return {
    // 状态
    originalImage,
    originalFile,
    taskId,
    generatedStyles,
    selectedStyle,
    processingStatus,
    
    // 计算属性
    isProcessing,
    isCompleted,
    hasError,
    selectedImageUrl,
    hasGeneratedStyles,
    
    // 方法
    setOriginalImage,
    updateProcessingStatus,
    uploadAndGenerateStyles,
    selectStyle,
    reset,
    
    // 持久化
    saveToLocal,
    loadFromLocal,
    clearLocal,
  };
});

// 导出Store
export default useImageStore;

