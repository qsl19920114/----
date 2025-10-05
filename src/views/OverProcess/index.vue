<template>
  <div class="over-process-container">
    <!-- 背景图层 -->
    <div class="bg-layer-1"></div>
    
    <!-- 内容背景层 -->
    <div class="bg-layer-2">
      <!-- 主要内容图片 -->
      <img 
        v-if="selectedImage" 
        :src="selectedImage" 
        alt="过稿图案" 
        class="main-image"
        :class="{ 'traced': isTraced }"
      />
      
      <!-- 描边效果层 -->
      <div v-if="isTracing" class="tracing-overlay" :style="tracingStyle"></div>
      
      <!-- 提示文字 -->
      <div v-if="!isTracing && !isTraced" class="hint-overlay">
        <div class="hint-icon">✋</div>
        <p class="hint-text-content">长按屏幕开始过稿</p>
      </div>
      
      <!-- 英文副标题 -->
      <div class="subtitle-text">Transferring Shadow Puppet Drafts to Leather</div>
    </div>

    <!-- 顶部装饰 -->
    <img 
      src="/assets/OverProcess/assets/assets/f0b5937e-144c-4af7-8b3f-f8d365761171.png" 
      class="top-decoration" 
      alt="装饰"
    />
    
    <!-- 右侧装饰 -->
    <img 
      src="/assets/OverProcess/assets/assets/ded1c8cf-6ec1-49ac-b2f5-f1154e80e5a9.png" 
      class="right-decoration" 
      alt="装饰"
    />

    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="status-bar-left">
          <div class="time-display">
            <span class="time-text">{{ currentTime }}</span>
          </div>
        </div>
        <div class="status-bar-center"></div>
        <div class="status-bar-right">
          <img 
            src="/assets/OverProcess/assets/assets/ce1817e5-f052-449e-aa68-9dd7c73a5552.png" 
            class="icon-signal" 
            alt="信号"
          />
          <img 
            src="/assets/OverProcess/assets/assets/fc79ad3e-4809-4a11-a800-4fd17a1675fe.png" 
            class="icon-wifi" 
            alt="WiFi"
          />
          <img 
            src="/assets/OverProcess/assets/assets/44fc0095-6543-4f09-933c-b376754734e3.png" 
            class="icon-battery" 
            alt="电量"
          />
        </div>
      </div>
    </div>

    <!-- 标题"过稿" -->
    <div class="page-title">过稿</div>

    <!-- 进度指示器（浮动显示） -->
    <transition name="fade">
      <div v-if="isTracing || isTraced" class="progress-panel">
        <div class="progress-header">过稿进度</div>
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-percentage">{{ Math.floor(progress) }}%</div>
        </div>
      </div>
    </transition>

    <!-- 自动跳转提示 -->
    <transition name="fade">
      <div v-if="isTraced" class="auto-jump-hint">
        <span>正在进入下一步...</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const selectedImage = ref(null);
const isTracing = ref(false);
const isTraced = ref(false);
const progress = ref(0);
const showSuccess = ref(false);

// 描边样式
const tracingStyle = ref({
  clipPath: 'circle(0% at 50% 50%)',
  opacity: 0
});

// 定时器
let pressTimer = null;
let progressTimer = null;
let timeTimer = null;

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

// 开始描边 - 长按触发
const startTracing = () => {
  if (isTraced.value || isTracing.value) return;
  
  pressTimer = setTimeout(() => {
    isTracing.value = true;
    animateTracing();
  }, 500);
};

const stopTracing = () => {
  if (pressTimer) {
    clearTimeout(pressTimer);
  }
};

// 描边动画（快速完成）
const animateTracing = () => {
  // 直接设置为完成状态
  progress.value = 100;
  
  // 最终描边效果
  tracingStyle.value = {
    clipPath: `circle(70% at 50% 50%)`,
    opacity: 0.8
  };
  
  isTracing.value = false;
  isTraced.value = true;
  
  // 立即跳转到 Step 2
  router.push('/over-process-step2');
};

// 监听触摸/鼠标事件
const setupEventListeners = () => {
  const container = document.querySelector('.bg-layer-2');
  if (container) {
    // 触摸事件
    container.addEventListener('touchstart', startTracing);
    container.addEventListener('touchend', stopTracing);
    container.addEventListener('touchcancel', stopTracing);
    
    // 鼠标事件（桌面端）
    container.addEventListener('mousedown', startTracing);
    container.addEventListener('mouseup', stopTracing);
    container.addEventListener('mouseleave', stopTracing);
  }
};

const removeEventListeners = () => {
  const container = document.querySelector('.bg-layer-2');
  if (container) {
    container.removeEventListener('touchstart', startTracing);
    container.removeEventListener('touchend', stopTracing);
    container.removeEventListener('touchcancel', stopTracing);
    container.removeEventListener('mousedown', startTracing);
    container.removeEventListener('mouseup', stopTracing);
    container.removeEventListener('mouseleave', stopTracing);
  }
};

onMounted(() => {
  // 获取选中的图片
  const storedImage = sessionStorage.getItem('selectedPuppetImage');
  if (storedImage) {
    selectedImage.value = storedImage;
  } else {
    selectedImage.value = '/assets/DrawProcess/page3/assets/11.png';
  }
  
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  
  // 设置事件监听
  setTimeout(setupEventListeners, 100);
});

onUnmounted(() => {
  if (pressTimer) clearTimeout(pressTimer);
  if (progressTimer) clearInterval(progressTimer);
  if (timeTimer) clearInterval(timeTimer);
  removeEventListeners();
});
</script>

<style scoped>
/* 主容器 */
.over-process-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
}

/* 背景图层 1 */
.bg-layer-1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  background-image: url('/assets/OverProcess/assets/assets/c7157ea7-39af-43cd-88e5-63cdae5a2290.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 内容背景层 2 */
.bg-layer-2 {
  position: absolute;
  top: 71.34px;
  left: 0;
  width: 393px;
  height: 684.46px;
  background-image: url('/assets/OverProcess/assets/assets/3deeb51e-06e7-4115-ae69-eced17eee4f0.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

/* 主要图片 */
.main-image {
  width: 393px;
  height: 524.35px;
  position: absolute;
  top: 69.66px;
  left: 0;
  object-fit: contain;
  transition: all 0.5s ease;
  filter: grayscale(0.2);
  z-index: 3;
}

.main-image.traced {
  filter: grayscale(0);
  transform: scale(1.02);
}

/* 描边覆盖层 */
.tracing-overlay {
  position: absolute;
  top: 69.66px;
  left: 0;
  width: 393px;
  height: 524.35px;
  background: radial-gradient(circle, rgba(160, 45, 24, 0.4), transparent 60%);
  pointer-events: none;
  transition: all 0.1s linear;
  z-index: 4;
}

/* 提示覆盖层 */
.hint-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 5;
  pointer-events: none;
}

.hint-icon {
  font-size: 64px;
  animation: wave 1.5s ease-in-out infinite;
}

.hint-text-content {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 24px;
  color: rgba(100, 70, 63, 1);
  text-align: center;
  margin: 0;
  animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(-15deg); }
  75% { transform: translateY(-15px) rotate(15deg); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 0.66px;
  left: 191px;
  width: 188.76px;
  height: 489.53px;
  transform: rotate(89.8375581215239deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 3;
}

/* 顶部装饰 */
.top-decoration {
  position: absolute;
  width: 318.12px;
  height: 117.38px;
  top: 0;
  left: 32px;
  z-index: 10;
  pointer-events: none;
}

/* 右侧装饰 */
.right-decoration {
  position: absolute;
  width: 153px;
  height: 135px;
  top: 0;
  left: 210px;
  z-index: 10;
  pointer-events: none;
}

/* 状态栏 */
.status-bar {
  position: absolute;
  width: 393px;
  height: 49px;
  top: 0;
  left: 0;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
}

.status-bar-frame {
  width: 393px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.status-bar-left {
  width: 134.5px;
  height: 22px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.time-display {
  width: 134.5px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 6px 0 16px;
  box-sizing: border-box;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  white-space: nowrap;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
  font-weight: 590;
}

.status-bar-center {
  width: 124px;
  min-height: 10px;
  height: 10px;
}

.status-bar-right {
  width: 134.5px;
  height: 13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px 0 6px;
  box-sizing: border-box;
  gap: 7px;
}

.icon-signal {
  width: 19.2px;
  height: 12.23px;
  margin-top: 0.39px;
}

.icon-wifi {
  width: 17.14px;
  height: 12.33px;
  margin-top: 0.34px;
}

.icon-battery {
  width: 27.33px;
  height: 13px;
}

/* 标题"过稿" */
.page-title {
  position: absolute;
  top: 32px;
  left: 241px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(160, 45, 24, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 50;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

/* 进度面板 */
.progress-panel {
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 60;
}

.progress-header {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 18px;
  color: rgba(100, 70, 63, 1);
  text-align: center;
  margin-bottom: 12px;
  font-weight: 500;
}

.progress-bar-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(160, 45, 24, 0.15);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(160, 45, 24, 1), rgba(193, 58, 38, 1));
  border-radius: 5px;
  transition: width 0.1s linear;
  box-shadow: 0 0 12px rgba(160, 45, 24, 0.6);
}

.progress-percentage {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 16px;
  color: rgba(160, 45, 24, 1);
  text-align: center;
  font-weight: 600;
}

/* 自动跳转提示 */
.auto-jump-hint {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 70;
}

.auto-jump-hint span {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 18px;
  color: rgba(100, 70, 63, 1);
  font-weight: 400;
}

/* 动画 */
@keyframes successBounce {
  0% { 
    transform: scale(0); 
    opacity: 0;
  }
  50% { 
    transform: scale(1.2); 
  }
  100% { 
    transform: scale(1); 
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(50px);
}

.success-enter-active,
.success-leave-active {
  transition: opacity 0.5s;
}

.success-enter-from,
.success-leave-to {
  opacity: 0;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .over-process-container {
    width: 100vw;
  }
  
  .status-bar-frame {
    width: 100vw;
  }
}
</style>
