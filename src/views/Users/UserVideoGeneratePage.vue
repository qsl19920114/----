<template>
  <div class="video-generate-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ShowProcess/assets/6b5da598-a63f-4f19-8233-80afa4569964.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ShowProcess/assets/b8e267eb-73b2-4949-824a-c7a9fffb0566.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ShowProcess/assets/bfe87682-902c-48f4-b3d9-482abab7ec7d.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 戏台背景 -->
      <div class="stage-background">
        <img 
          src="/assets/ShowProcess/assets/68514d0e-1826-4f3e-8412-a9ee662cf52d.png" 
          alt="戏台" 
          class="stage-image"
        />
      </div>

      <!-- 标题 -->
      <div class="page-title">表演</div>

      <!-- 未生成状态：输入表单 -->
      <div v-if="!isGenerating && !videoUrl" class="input-container">
        <div class="input-card">
          <!-- 预览图片 -->
          <div class="preview-section">
            <div class="preview-label">你的皮影人物</div>
            <div class="preview-box">
              <img 
                v-if="puppetImage"
                :src="puppetImage" 
                alt="皮影人物" 
                class="puppet-preview"
              />
            </div>
          </div>

          <!-- 动作提示词 -->
          <div class="prompt-section">
            <label class="prompt-label">描述表演动作</label>
            <textarea 
              v-model="actionPrompt"
              class="prompt-textarea"
              placeholder="例如：舞动双臂、缓缓行走、跳跃旋转、摆出武术姿势..."
              maxlength="150"
              rows="3"
            ></textarea>
            <div class="char-count">{{ actionPrompt.length }}/150</div>
          </div>

          <!-- 生成按钮 -->
          <button 
            class="generate-btn"
            :class="{ 'disabled': !canGenerate }"
            :disabled="!canGenerate"
            @click="handleGenerateVideo"
          >
            <span class="btn-icon">🎬</span>
            AI 生成表演视频
          </button>
        </div>
      </div>

      <!-- 生成中状态 -->
      <div v-if="isGenerating" class="generating-container">
        <div class="generating-card">
          <div class="loading-animation">
            <div class="loading-circle"></div>
            <div class="loading-circle delay-1"></div>
            <div class="loading-circle delay-2"></div>
          </div>
          <div class="generating-title">AI 正在创作表演...</div>
          <div class="generating-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="progress-text">{{ progress }}%</div>
          </div>
          <div class="progress-message">{{ progressMessage }}</div>
          <div class="generating-hint">视频生成通常需要 60-120 秒</div>
        </div>
      </div>

      <!-- 生成完成状态 -->
      <div v-if="!isGenerating && videoUrl" class="result-container">
        <div class="result-card">
          <div class="success-icon">🎉</div>
          <div class="success-title">表演视频生成完成！</div>

          <!-- 视频播放器 -->
          <div class="video-player-wrapper">
            <video 
              ref="videoRef"
              class="video-player"
              controls
              loop
              playsinline
            >
              <source :src="videoUrl" type="video/mp4">
              您的浏览器不支持视频播放
            </video>
          </div>

          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="action-btn secondary-btn" @click="handleRegenerate">
              <span class="btn-icon">🔄</span>
              重新生成
            </button>
            <button class="action-btn primary-btn" @click="handleDownload">
              <span class="btn-icon">📥</span>
              下载视频
            </button>
          </div>

          <button class="back-btn" @click="goBack">
            返回作品
          </button>
        </div>
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

const router = useRouter();
const currentTime = ref('');
const puppetImage = ref('');
const actionPrompt = ref('');
const isGenerating = ref(false);
const progress = ref(0);
const progressMessage = ref('正在初始化...');
const videoUrl = ref('');
const errorMessage = ref('');
const videoRef = ref(null);

let timeTimer = null;
let errorTimer = null;
let progressTimer = null;
let pollingTimer = null;
let pollingAttempts = 0;

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
  return puppetImage.value && actionPrompt.value.trim().length > 0 && !isGenerating.value;
});

// 显示错误信息
const showError = (message) => {
  errorMessage.value = message;
  if (errorTimer) clearTimeout(errorTimer);
  errorTimer = setTimeout(() => {
    errorMessage.value = '';
  }, 3000);
};

// 模拟进度条
const simulateProgress = () => {
  let currentProgress = 0;
  progressTimer = setInterval(() => {
    if (currentProgress < 85) {
      currentProgress += Math.random() * 8;
      progress.value = Math.min(Math.floor(currentProgress), 85);
      updateProgressMessage(progress.value);
    }
  }, 800);
};

// 更新进度消息
const updateProgressMessage = (prog) => {
  if (prog < 20) {
    progressMessage.value = '正在分析动作描述...';
  } else if (prog < 40) {
    progressMessage.value = 'AI正在理解表演动作...';
  } else if (prog < 60) {
    progressMessage.value = '正在生成动画帧...';
  } else if (prog < 80) {
    progressMessage.value = '正在渲染视频...';
  } else {
    progressMessage.value = '正在处理最后细节...';
  }
};

// 生成视频
const handleGenerateVideo = async () => {
  if (!canGenerate.value) return;

  try {
    isGenerating.value = true;
    progress.value = 0;
    
    console.log('🎬 开始生成视频...');
    console.log('动作提示词:', actionPrompt.value);

    // 保存提示词
    localStorage.setItem('videoPrompt', actionPrompt.value);

    // 开始模拟进度
    simulateProgress();

    // 模拟API调用 - 使用setTimeout模拟
    setTimeout(() => {
      // 模拟完成
      progress.value = 100;
      progressMessage.value = '生成完成！';
      
      setTimeout(() => {
        // 使用mock视频（这里可以替换为实际生成的视频）
        videoUrl.value = '/assets/ShowProcess/assets/20250917-125212.mp4';
        isGenerating.value = false;
        clearInterval(progressTimer);
        
        console.log('✅ 视频生成完成');
        
        // 自动播放
        setTimeout(() => {
          if (videoRef.value) {
            videoRef.value.play().catch(err => {
              console.log('自动播放失败:', err);
            });
          }
        }, 500);
      }, 500);
    }, 8000); // 8秒后完成（实际应该更长）

  } catch (error) {
    console.error('❌ 生成失败:', error);
    showError(error.message || '视频生成失败，请重试');
    isGenerating.value = false;
    clearInterval(progressTimer);
  }
};

// 重新生成
const handleRegenerate = () => {
  videoUrl.value = '';
  actionPrompt.value = '';
  progress.value = 0;
};

// 下载视频
const handleDownload = () => {
  if (!videoUrl.value) return;
  
  try {
    const link = document.createElement('a');
    link.href = videoUrl.value;
    link.download = `皮影表演_${Date.now()}.mp4`;
    link.click();
    
    console.log('✅ 视频下载开始');
  } catch (error) {
    console.error('❌ 下载失败:', error);
    showError('下载失败，请重试');
  }
};

// 返回作品页
const goBack = () => {
  router.push('/user-complete');
};

// 加载数据
const loadData = () => {
  const savedImage = localStorage.getItem('puppetImageForVideo');
  
  if (!savedImage) {
    console.error('❌ 未找到皮影人物图片');
    showError('未找到皮影人物，请先完成组装');
    setTimeout(() => {
      router.push('/user-complete');
    }, 2000);
    return;
  }
  
  puppetImage.value = savedImage;
  console.log('✅ 已加载皮影人物图片');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  loadData();
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
  if (errorTimer) clearTimeout(errorTimer);
  if (progressTimer) clearInterval(progressTimer);
  if (pollingTimer) clearInterval(pollingTimer);
});
</script>

<style scoped>
/* 主容器 */
.video-generate-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(160, 45, 24, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
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
  gap: 134px;
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
  color: #000000;
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

/* 戏台背景 */
.stage-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  z-index: 1;
}

.stage-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 标题 */
.page-title {
  position: absolute;
  top: 49px;
  right: 32px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 30;
  animation: fadeInDown 1s ease-out;
}

/* 输入容器 */
.input-container {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 280px;
}

.input-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  animation: fadeInScale 1s ease-out;
}

/* 预览区域 */
.preview-section {
  margin-bottom: 14px;
}

.preview-label {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 14px;
  color: rgba(100, 70, 63, 0.9);
  margin-bottom: 10px;
  text-align: center;
  font-weight: 500;
}

.preview-box {
  width: 100%;
  height: 180px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(160, 45, 24, 0.05);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.puppet-preview {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

/* 提示词区域 */
.prompt-section {
  margin-bottom: 14px;
}

.prompt-label {
  display: block;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 14px;
  color: rgba(100, 70, 63, 0.9);
  margin-bottom: 8px;
  font-weight: 500;
}

.prompt-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(160, 45, 24, 0.05);
  border-radius: 10px;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(100, 70, 63, 1);
  resize: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
}

.prompt-textarea:focus {
  outline: none;
  border-color: rgba(160, 45, 24, 0.2);
  background: rgba(255, 255, 255, 0.8);
}

.prompt-textarea::placeholder {
  color: rgba(100, 70, 63, 0.35);
  font-size: 12px;
}

.char-count {
  text-align: right;
  font-size: 11px;
  color: rgba(100, 70, 63, 0.4);
  margin-top: 4px;
}

/* 生成按钮 */
.generate-btn {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(160, 45, 24, 0.9) 0%, rgba(200, 80, 60, 0.9) 100%);
  border: none;
  border-radius: 50px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px rgba(160, 45, 24, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.generate-btn:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(160, 45, 24, 0.35);
  background: linear-gradient(135deg, rgba(160, 45, 24, 1) 0%, rgba(200, 80, 60, 1) 100%);
}

.generate-btn:active:not(.disabled) {
  transform: translateY(0);
}

.generate-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(150, 150, 150, 0.8);
}

.btn-icon {
  font-size: 18px;
}

/* 生成中容器 */
.generating-container {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.generating-card {
  width: 300px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  animation: fadeInScale 1s ease-out;
}

.loading-animation {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.loading-circle {
  width: 16px;
  height: 16px;
  background: rgba(160, 45, 24, 0.8);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.loading-circle.delay-1 {
  animation-delay: 0.2s;
}

.loading-circle.delay-2 {
  animation-delay: 0.4s;
}

.generating-title {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(100, 70, 63, 0.95);
  margin-bottom: 18px;
  font-weight: 500;
}

.generating-progress {
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(160, 45, 24, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(160, 45, 24, 1) 0%, rgba(200, 80, 60, 1) 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 14px;
  color: rgba(100, 70, 63, 0.7);
  font-weight: 600;
}

.progress-message {
  font-size: 15px;
  color: rgba(100, 70, 63, 0.8);
  margin-bottom: 8px;
  min-height: 20px;
  font-weight: 500;
}

.generating-hint {
  font-size: 14px;
  color: rgba(100, 70, 63, 0.5);
}

/* 结果容器 */
.result-container {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.result-card {
  width: 320px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 20px;
  padding: 28px 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeInScale 1s ease-out;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: bounce 1s ease-in-out;
}

.success-title {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(100, 70, 63, 0.95);
  margin-bottom: 16px;
  font-weight: 500;
}

/* 视频播放器 */
.video-player-wrapper {
  margin-bottom: 18px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  max-height: 220px;
}

.video-player {
  width: 100%;
  height: auto;
  display: block;
  background: #000;
  max-height: 220px;
  object-fit: contain;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.action-btn {
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.action-btn:active {
  transform: translateY(0);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.9);
  color: rgba(100, 70, 63, 1);
  border: 1.5px solid rgba(160, 45, 24, 0.2);
}

.primary-btn {
  background: linear-gradient(135deg, rgba(160, 45, 24, 0.95) 0%, rgba(200, 80, 60, 0.95) 100%);
  color: white;
}

.back-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid rgba(100, 70, 63, 0.15);
  border-radius: 50px;
  font-size: 13px;
  color: rgba(100, 70, 63, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(100, 70, 63, 0.04);
  border-color: rgba(100, 70, 63, 0.3);
  color: rgba(100, 70, 63, 0.9);
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

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
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
  .video-generate-container {
    width: 100vw;
  }
  
  .main-content,
  .status-bar,
  .stage-background {
    width: 100vw;
  }
}
</style>

