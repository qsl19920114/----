<template>
  <div class="user-generate-container">
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
      <div class="page-title">结果</div>

      <!-- 生成中状态 -->
      <div v-if="isGenerating" class="generating-container">
        <div class="generating-card">
          <div class="loading-animation">
            <div class="loading-circle"></div>
            <div class="loading-circle delay-1"></div>
            <div class="loading-circle delay-2"></div>
          </div>
          <div class="generating-title">AI 正在创作中...</div>
          <div class="generating-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="progress-text">{{ progress }}%</div>
          </div>
          <div class="progress-message">{{ progressMessage }}</div>
          <div class="generating-hint">请耐心等待，通常需要 30-60 秒</div>
        </div>
      </div>

      <!-- 生成完成状态 - 显示预览 -->
      <div v-else-if="components.length > 0" class="result-container">
        <!-- 中间展示区域 -->
        <div class="display-container">
          <div class="display-card">
            <img 
              :src="previewImage" 
              alt="生成的皮影人物" 
              class="display-image"
            />
          </div>
          <div class="success-message">
            <div class="success-icon">✨</div>
            <div class="success-text">生成成功！即将进入组装阶段</div>
            <div class="component-count">共 {{ components.length }} 个组件等待组装</div>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="errorMessage" class="error-container">
        <div class="error-card">
          <div class="error-icon">😔</div>
          <div class="error-title">生成失败</div>
          <div class="error-message">{{ errorMessage }}</div>
          <button class="retry-btn" @click="handleRetry">
            <span class="btn-icon">🔄</span>
            重新尝试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getImageStatus } from '@/api/image';
import { POLLING_CONFIG } from '@/config/api.config';

const router = useRouter();
const currentTime = ref('');
const isGenerating = ref(true);
const progress = ref(0);
const progressMessage = ref('正在初始化...');
const previewImage = ref('');
const components = ref([]);
const errorMessage = ref('');

let timeTimer = null;
let pollingTimer = null;
let progressTimer = null;
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

// 模拟进度条
const simulateProgress = () => {
  let currentProgress = 0;
  progressTimer = setInterval(() => {
    if (currentProgress < 90) {
      currentProgress += Math.random() * 10;
      progress.value = Math.min(Math.floor(currentProgress), 90);
    }
  }, 500);
};

// 轮询检查生成状态
const pollGenerationStatus = async () => {
  const taskId = localStorage.getItem('generateTaskId');
  
  if (!taskId) {
    errorMessage.value = '任务ID丢失，请重新生成';
    isGenerating.value = false;
    return;
  }

  try {
    pollingAttempts++;
    console.log(`🔄 轮询第 ${pollingAttempts} 次...`);

    const result = await getImageStatus(taskId);
    console.log('📊 生成状态:', result);

    if (result.status === 'completed' && result.components) {
      // 生成完成
      progress.value = 100;
      setTimeout(() => {
        // 保存组件数据
        previewImage.value = result.previewImage;
        components.value = result.components;
        
        // 保存到localStorage供组装页面使用
        localStorage.setItem('puppetPreview', result.previewImage);
        localStorage.setItem('puppetComponents', JSON.stringify(result.components));
        
        isGenerating.value = false;
        clearInterval(pollingTimer);
        clearInterval(progressTimer);
        console.log('✅ 生成完成！共', components.value.length, '个组件');
        
        // 自动跳转到组装页面
        setTimeout(() => {
          router.push('/user-assemble');
        }, 1000);
      }, 500);
    } else if (result.status === 'failed') {
      // 生成失败
      errorMessage.value = result.error || '生成失败，请重试';
      isGenerating.value = false;
      clearInterval(pollingTimer);
      clearInterval(progressTimer);
      console.error('❌ 生成失败:', result.error);
    } else if (result.status === 'processing') {
      // 继续轮询
      if (result.progress) {
        progress.value = Math.min(result.progress, 90);
      }
      
      // 更新进度消息
      if (result.message) {
        progressMessage.value = result.message;
      }
      
      if (pollingAttempts >= POLLING_CONFIG.MAX_ATTEMPTS) {
        errorMessage.value = '生成超时，请重试';
        isGenerating.value = false;
        clearInterval(pollingTimer);
        clearInterval(progressTimer);
      }
    }
  } catch (error) {
    console.error('❌ 轮询错误:', error);
    pollingAttempts = 0; // 重置尝试次数，继续轮询
  }
};

// 重试
const handleRetry = () => {
  router.push('/user-home');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  
  // 开始模拟进度
  simulateProgress();
  
  // 开始轮询生成状态
  pollGenerationStatus();
  pollingTimer = setInterval(pollGenerationStatus, POLLING_CONFIG.INTERVAL);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
  if (pollingTimer) clearInterval(pollingTimer);
  if (progressTimer) clearInterval(progressTimer);
});
</script>

<style scoped>
/* 主容器 */
.user-generate-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(243, 238, 238, 1);
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
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 30;
  animation: fadeInDown 1s ease-out;
}

/* 生成中容器 */
.generating-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.generating-card {
  width: 340px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
  background: rgba(100, 70, 63, 0.8);
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
  font-size: 24px;
  color: rgba(100, 70, 63, 1);
  margin-bottom: 20px;
}

.generating-progress {
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(100, 70, 63, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(247, 238, 173, 1) 0%, rgba(255, 220, 100, 1) 100%);
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

/* 展示区域 */
.display-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.display-card {
  width: 300px;
  height: 380px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
  margin-bottom: 24px;
}

.display-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
}

/* 成功消息 */
.success-message {
  text-align: center;
  animation: fadeInUp 1s ease-out 0.3s backwards;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: bounce 1s ease-in-out infinite;
}

.success-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(100, 70, 63, 1);
  margin-bottom: 8px;
}

.component-count {
  font-size: 14px;
  color: rgba(100, 70, 63, 0.7);
}

/* 选择区域 */
.selection-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.selection-title {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: rgba(100, 70, 63, 1);
  text-align: center;
  margin-bottom: 16px;
}

.image-cards {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
}

.image-card {
  width: 90px;
  height: 110px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.image-card:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.image-card.active {
  border: 3px solid rgba(255, 220, 100, 1);
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 8px 24px rgba(255, 220, 100, 0.4);
  animation: cardPulse 0.6s ease-out;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.check-mark {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, rgba(255, 220, 100, 1) 0%, rgba(255, 200, 50, 1) 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 8px rgba(255, 200, 50, 0.5);
  animation: checkBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.action-btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 62px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.action-btn:active {
  transform: translateY(0);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.95);
  color: rgba(100, 70, 63, 1);
  border: 2px solid rgba(100, 70, 63, 0.3);
}

.primary-btn {
  background: linear-gradient(135deg, rgba(247, 238, 173, 1) 0%, rgba(255, 220, 100, 1) 100%);
  color: rgba(100, 70, 63, 1);
}

.btn-icon {
  font-size: 18px;
}

/* 错误容器 */
.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.error-card {
  width: 340px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeInScale 1s ease-out;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.error-title {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 24px;
  color: rgba(100, 70, 63, 1);
  margin-bottom: 12px;
}

.error-message {
  font-size: 14px;
  color: rgba(100, 70, 63, 0.7);
  margin-bottom: 24px;
  line-height: 1.6;
}

.retry-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, rgba(247, 238, 173, 1) 0%, rgba(255, 220, 100, 1) 100%);
  border: none;
  border-radius: 62px;
  font-size: 16px;
  color: rgba(100, 70, 63, 1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
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

@keyframes cardPulse {
  0% {
    transform: translateY(-4px) scale(1);
  }
  50% {
    transform: translateY(-4px) scale(1.12);
  }
  100% {
    transform: translateY(-4px) scale(1.08);
  }
}

@keyframes checkBounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-scale-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-leave-active {
  transition: all 0.4s ease-out;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.7) rotate(-10deg);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.2) rotate(10deg);
}

.check-fade-enter-active {
  transition: all 0.3s ease-out;
}

.check-fade-leave-active {
  transition: all 0.2s ease-in;
}

.check-fade-enter-from, .check-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .user-generate-container {
    width: 100vw;
  }
  
  .main-content,
  .status-bar,
  .background-image {
    width: 100vw;
  }
}
</style>

