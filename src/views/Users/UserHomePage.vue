<template>
  <div class="user-home-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/music/assets/a837f61b-2952-4127-b1dc-5cee1eb9a361.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/music/assets/8686ff53-2e9b-4d03-b2af-80cc727d9fee.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/music/assets/7166988a-a961-45f8-af40-b976df30869f.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 背景图 -->
      <img 
        src="/assets/music/assets/49f248ca-faac-42d2-a3ee-19b4c1260a29.png" 
        alt="背景" 
        class="background-image"
      />

      <!-- 标题 -->
      <div class="page-title">创作</div>

      <!-- 内容区域 -->
      <div class="content-container">
        <div class="upload-card">
          <!-- 上传区域 -->
          <div 
            class="upload-area"
            :class="{ 'has-image': uploadedImage }"
            @click="triggerFileInput"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <!-- 没有图片时显示上传提示 -->
            <div v-if="!uploadedImage" class="upload-placeholder">
              <div class="upload-icon"></div>
              <div class="upload-text-wrapper">
                <span class="red-dot"></span>
                <span class="upload-text">请点击加号上传一张图片</span>
              </div>
              <div class="upload-hint">支持 JPG、PNG、WEBP 格式</div>
              <div class="upload-size-hint">文件大小不超过 5MB</div>
            </div>

            <!-- 有图片时显示预览 -->
            <div v-else class="image-preview">
              <img :src="uploadedImage" alt="预览图" class="preview-image" />
              <div class="image-actions">
                <button class="action-btn delete-btn" @click.stop="removeImage">
                  <span class="btn-icon">🗑️</span>
                  删除
                </button>
              </div>
            </div>
          </div>

          <!-- 隐藏的文件输入 -->
          <input 
            ref="fileInput"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            @change="handleFileSelect"
            style="display: none;"
          />

          <!-- 提示词输入区域 -->
          <div class="prompt-section">
            <label class="prompt-label">描述你想要的皮影人物</label>
            <textarea 
              v-model="userPrompt"
              class="prompt-textarea"
              placeholder="例如：威武的将军、优雅的仙女、可爱的小动物..."
              maxlength="200"
              rows="3"
            ></textarea>
            <div class="char-count">{{ userPrompt.length }}/200</div>
          </div>

          <!-- 生成按钮 -->
          <button 
            class="generate-btn"
            :class="{ 'disabled': !canGenerate }"
            :disabled="!canGenerate"
            @click="handleGenerate"
          >
            <span v-if="!isGenerating">确认</span>
            <span v-else class="generating-text">
              <span class="loading-spinner"></span>
              生成中...
            </span>
          </button>
        </div>
      </div>

      <!-- 提示文字 -->
      <div class="bottom-hint">
        上传你的照片，AI将为你创作独特的皮影人物
      </div>
    </div>

    <!-- 错误提示 -->
    <transition name="fade">
      <div v-if="errorMessage" class="error-toast">
        <span class="error-icon">⚠️</span>
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { uploadAndGenerate } from '@/api/image';
import { IMAGE_CONFIG, ERROR_MESSAGES } from '@/config/api.config';

const router = useRouter();
const currentTime = ref('');
const uploadedImage = ref(null);
const uploadedFile = ref(null);
const userPrompt = ref('');
const isDragging = ref(false);
const isGenerating = ref(false);
const errorMessage = ref('');
const fileInput = ref(null);

let timeTimer = null;
let errorTimer = null;

// 获取当前时间
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 更新时间
const updateTime = () => {
  currentTime.value = getCurrentTime();
};

// 是否可以生成
const canGenerate = computed(() => {
  return uploadedImage.value && userPrompt.value.trim().length > 0 && !isGenerating.value;
});

// 触发文件选择
const triggerFileInput = () => {
  if (uploadedImage.value) return;
  fileInput.value?.click();
};

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    validateAndPreviewFile(file);
  }
};

// 处理拖拽上传
const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    validateAndPreviewFile(file);
  }
};

// 验证并预览文件
const validateAndPreviewFile = (file) => {
  // 验证文件类型
  if (!IMAGE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    showError(ERROR_MESSAGES.FILE_TYPE_ERROR);
    return;
  }

  // 验证文件大小
  if (file.size > IMAGE_CONFIG.MAX_SIZE) {
    showError(ERROR_MESSAGES.FILE_SIZE_ERROR);
    return;
  }

  // 预览图片
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    uploadedFile.value = file;
    console.log('✅ 图片预览成功');
  };
  reader.readAsDataURL(file);
};

// 删除图片
const removeImage = () => {
  uploadedImage.value = null;
  uploadedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// 显示错误信息
const showError = (message) => {
  errorMessage.value = message;
  if (errorTimer) clearTimeout(errorTimer);
  errorTimer = setTimeout(() => {
    errorMessage.value = '';
  }, 3000);
};

// 处理生成
const handleGenerate = async () => {
  if (!canGenerate.value) return;

  try {
    isGenerating.value = true;
    console.log('🎨 开始生成皮影人物...');

    // 保存提示词到 localStorage
    localStorage.setItem('userPrompt', userPrompt.value);

    // 调用上传并生成API
    const result = await uploadAndGenerate(
      uploadedFile.value,
      3, // 生成3个样式
      (progress) => {
        console.log('上传进度:', progress + '%');
      }
    );

    console.log('✅ 生成任务创建成功:', result);

    // 保存任务ID到 localStorage
    localStorage.setItem('generateTaskId', result.taskId);

    // 跳转到生成结果页
    router.push('/user-generate');

  } catch (error) {
    console.error('❌ 生成失败:', error);
    showError(error.message || ERROR_MESSAGES.GENERATE_ERROR);
  } finally {
    isGenerating.value = false;
  }
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
  if (errorTimer) clearTimeout(errorTimer);
});
</script>

<style scoped>
/* 主容器 */
.user-home-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: linear-gradient(180deg, #E8DED0 0%, #F0E8DC 100%);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
}

.user-home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(200, 160, 120, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(180, 140, 100, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* 状态栏 */
.status-bar {
  position: absolute;
  width: 393px;
  height: 49px;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px 0px 0px;
}

.status-bar-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 124px;
  width: 393px;
  height: 22px;
}

.time-display {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px 0px 16px;
  gap: 10px;
  width: 134.5px;
  height: 22px;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-style: normal;
  font-weight: 590;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  color: rgba(0, 0, 0, 1);
}

.dynamic-island-spacer {
  width: 124px;
  height: 10px;
}

.levels {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 6px;
  gap: 7px;
  width: 134.5px;
  height: 13px;
}

.icon-signal {
  width: 19.2px;
  height: 12.23px;
}

.icon-wifi {
  width: 17.14px;
  height: 12.33px;
  margin-left: 7px;
}

.icon-battery {
  width: 27.33px;
  height: 13px;
  margin-left: 7px;
}

/* 主内容区域 */
.main-content {
  position: relative;
  width: 393px;
  height: 852px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  object-fit: cover;
  z-index: 1;
  opacity: 0.08;
  mix-blend-mode: multiply;
}

/* 标题 */
.page-title {
  position: absolute;
  top: 55px;
  right: 28px;
  width: 56px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 52px;
  color: rgba(120, 80, 60, 1);
  line-height: normal;
  font-weight: 500;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 30;
  letter-spacing: 4px;
  animation: fadeInDown 1s ease-out;
  text-shadow: 0 2px 8px rgba(100, 70, 63, 0.1);
}

/* 内容容器 */
.content-container {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 650px;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

/* 上传卡片 */
.upload-card {
  width: 100%;
  background: rgba(255, 252, 245, 0.95);
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: 0 8px 24px rgba(100, 70, 63, 0.12),
              0 2px 8px rgba(100, 70, 63, 0.08);
  animation: fadeInUp 1s ease-out;
  border: 1px solid rgba(180, 140, 100, 0.15);
}

/* 上传区域 */
.upload-area {
  width: 100%;
  height: 320px;
  border: 2px solid rgba(180, 140, 100, 0.25);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 8px rgba(100, 70, 63, 0.05);
}

.upload-area:hover {
  border-color: rgba(180, 140, 100, 0.4);
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-1px);
  box-shadow: inset 0 2px 8px rgba(100, 70, 63, 0.05),
              0 4px 12px rgba(100, 70, 63, 0.08);
}

.upload-area.has-image {
  border-style: solid;
  cursor: default;
  background: rgba(255, 255, 255, 0.95);
}

.upload-area.has-image:hover {
  transform: none;
}

/* 上传占位符 */
.upload-placeholder {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  width: 80px;
  height: 80px;
  background: rgba(200, 160, 120, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-bottom: 24px;
  color: rgba(180, 140, 100, 0.6);
  box-shadow: 0 4px 16px rgba(100, 70, 63, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.upload-icon::before {
  content: '+';
  font-size: 56px;
  font-weight: 300;
  line-height: 1;
  color: rgba(180, 140, 100, 0.7);
}

.upload-area:hover .upload-icon {
  background: rgba(200, 160, 120, 0.25);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(100, 70, 63, 0.15);
}

.upload-text-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.red-dot {
  width: 8px;
  height: 8px;
  background: #D84848;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(216, 72, 72, 0.3);
}

.upload-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: rgba(120, 80, 60, 0.9);
  font-weight: 500;
}

.upload-hint {
  font-size: 13px;
  color: rgba(120, 80, 60, 0.6);
  margin-bottom: 6px;
}

.upload-size-hint {
  font-size: 12px;
  color: rgba(120, 80, 60, 0.45);
}

/* 图片预览 */
.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
}

.image-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 20px;
  font-size: 14px;
  color: rgba(100, 70, 63, 1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-btn:active {
  transform: scale(0.98);
}

.btn-icon {
  font-size: 16px;
}

.delete-btn:hover {
  background: rgba(255, 100, 100, 0.95);
  color: white;
}

/* 提示词区域 */
.prompt-section {
  margin-top: 24px;
}

.prompt-label {
  display: block;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 15px;
  color: rgba(120, 80, 60, 0.95);
  margin-bottom: 10px;
  font-weight: 500;
}

.prompt-textarea {
  width: 100%;
  padding: 14px;
  border: 1.5px solid rgba(180, 140, 100, 0.25);
  border-radius: 10px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(100, 70, 63, 1);
  resize: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  box-shadow: inset 0 2px 6px rgba(100, 70, 63, 0.04);
}

.prompt-textarea:focus {
  outline: none;
  border-color: rgba(180, 140, 100, 0.45);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: inset 0 2px 6px rgba(100, 70, 63, 0.04),
              0 0 0 3px rgba(200, 160, 120, 0.1);
}

.prompt-textarea::placeholder {
  color: rgba(120, 80, 60, 0.4);
}

.char-count {
  text-align: right;
  font-size: 11px;
  color: rgba(120, 80, 60, 0.5);
  margin-top: 6px;
}

/* 生成按钮 */
.generate-btn {
  width: 100%;
  padding: 14px 16px;
  margin-top: 24px;
  background: rgba(200, 160, 120, 0.2);
  border: 1.5px solid rgba(180, 140, 100, 0.35);
  border-radius: 50px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 17px;
  color: rgba(120, 80, 60, 0.95);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(100, 70, 63, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}

.generate-btn:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(100, 70, 63, 0.12);
  background: rgba(200, 160, 120, 0.3);
  border-color: rgba(180, 140, 100, 0.5);
}

.generate-btn:active:not(.disabled) {
  transform: translateY(0);
}

.generate-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(200, 180, 160, 0.15);
  border-color: rgba(180, 140, 100, 0.2);
}

.generating-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(180, 140, 100, 0.3);
  border-top-color: rgba(120, 80, 60, 1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 底部提示 */
.bottom-hint {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  color: rgba(120, 80, 60, 0.65);
  padding: 0 40px;
  z-index: 15;
  animation: fadeIn 1.5s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: 0.5px;
}

/* 错误提示 */
.error-toast {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 100, 100, 0.95);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  max-width: 320px;
}

.error-icon {
  font-size: 20px;
}

/* ========== 动画定义 ========== */

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .user-home-container {
    width: 100vw;
  }
  
  .main-content,
  .status-bar,
  .background-image {
    width: 100vw;
  }
}
</style>

