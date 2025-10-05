<template>
  <div class="loading-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <!-- 时间 -->
        <div class="time-display">
          <div class="time-text">{{ currentTime }}</div>
        </div>
        
        <!-- 占位空间 -->
        <div class="spacer"></div>
        
        <!-- 状态图标 -->
        <div class="status-icons">
          <img src="/assets/DrawProcess/page2/assets/55977f17-6ea8-4d33-8549-ebc8426144e0.png" class="icon-signal" alt="信号" />
          <img src="/assets/DrawProcess/page2/assets/09094616-9097-469d-bd84-ee8467f41cf8.png" class="icon-wifi" alt="WiFi" />
          <img src="/assets/DrawProcess/page2/assets/83e4eeca-7539-40cc-96ba-ffb7440670d1.png" class="icon-battery" alt="电量" />
        </div>
      </div>
    </div>

    <!-- 顶部装饰 -->
    <img src="/assets/DrawProcess/page2/assets/971bfee0-c8b1-47f4-a694-dcdefd45e013.png" class="top-decoration" alt="顶部装饰" />

    <!-- 加载动画区域 -->
    <div class="loading-animation-wrapper">
      <!-- 旋转的加载图标 -->
      <div class="loading-spinner" :style="{ transform: `rotate(${rotation}deg)` }">
        <img src="/assets/DrawProcess/page2/assets/190c9a45-0957-4a37-864a-f9402369be3b.png" class="spinner-image" alt="加载中" />
      </div>
    </div>

    <!-- 加载文字提示 -->
    <div class="loading-hint" :class="{ 'show': showHint }">
      <img src="/assets/DrawProcess/page2/assets/8c6580d6-e3f6-43ee-915f-e09d4fcd53ab.png" class="hint-dot" alt="提示" />
      <div class="hint-text">{{ loadingText }}</div>
    </div>

    <!-- 底部装饰 -->
    <img src="/assets/DrawProcess/page2/assets/816ebdfa-021d-4c60-a3dc-b7b3b912ddcc.png" class="bottom-decoration" alt="底部装饰" />

    <!-- 进度条 -->
    <div class="progress-bar-container" :class="{ 'show': showProgress }">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">{{ Math.floor(progress) }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const rotation = ref(0);
const showHint = ref(false);
const showProgress = ref(false);
const progress = ref(0);
const loadingText = ref('加载中');

const loadingTexts = [
  '正在处理图片...',
  '加载中',
  '正在生成图案...',
  '即将完成...'
];
let textIndex = 0;

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

// 旋转动画
const rotateSpinner = () => {
  rotation.value = (rotation.value + 2) % 360;
};

// 更新进度
const updateProgress = () => {
  if (progress.value < 100) {
    // 模拟进度增长，前期快，后期慢
    const increment = progress.value < 50 ? 2 : progress.value < 80 ? 1 : 0.5;
    progress.value += increment;
    
    if (progress.value > 100) {
      progress.value = 100;
    }
  } else {
    // 加载完成，跳转到目标页面
    setTimeout(() => {
      // 从路由 meta 中获取下一个路由，如果没有则默认跳转到画稿选择页面
      const nextRoute = router.currentRoute.value.meta.nextRoute;
      router.push(nextRoute);
    }, 500);
  }
};

// 切换加载文字
const changeLoadingText = () => {
  textIndex = (textIndex + 1) % loadingTexts.length;
  loadingText.value = loadingTexts[textIndex];
};

let timer = null;
let spinnerInterval = null;
let progressInterval = null;
let textInterval = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000);
  
  // 延迟显示提示
  setTimeout(() => {
    showHint.value = true;
  }, 300);
  
  // 延迟显示进度条
  setTimeout(() => {
    showProgress.value = true;
  }, 600);
  
  // 启动旋转动画
  spinnerInterval = setInterval(rotateSpinner, 16); // 60fps
  
  // 启动进度更新
  progressInterval = setInterval(updateProgress, 100);
  
  // 定期更换文字
  textInterval = setInterval(changeLoadingText, 2000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  if (spinnerInterval) clearInterval(spinnerInterval);
  if (progressInterval) clearInterval(progressInterval);
  if (textInterval) clearInterval(textInterval);
});
</script>

<style scoped>
/* 主容器 */
.loading-container {
  position: relative;
  width: 100%;
  max-width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
  overflow: hidden;
  margin: 0 auto;
}

/* 状态栏 */
.status-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px 0 0;
  position: absolute;
  width: 393px;
  height: 49px;
  left: 0;
  top: 0;
  z-index: 100;
}

.status-bar-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  gap: 134px;
  width: 393px;
  height: 22px;
}

.time-display {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 6px 0 16px;
  width: 134.5px;
  height: 22px;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  font-weight: 590;
  line-height: 22px;
  text-align: center;
  color: rgba(0, 0, 0, 1);
}

.spacer {
  width: 124px;
  height: 10px;
}

.status-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px 0 6px;
  gap: 7px;
  width: 134.5px;
  height: 13px;
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
  margin-left: 7px;
}

.icon-battery {
  width: 27.33px;
  height: 13px;
  margin-left: 7px;
}

/* 顶部装饰 */
.top-decoration {
  position: absolute;
  width: 267.8px;
  height: 131.77px;
  top: 0;
  left: 69px;
  animation: fadeIn 0.5s ease-in-out;
}

/* 加载动画包装器 */
.loading-animation-wrapper {
  position: absolute;
  width: 249px;
  height: 249px;
  top: 243px;
  left: calc(50% - 124.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 旋转的加载图标 */
.loading-spinner {
  width: 249px;
  height: 249px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.016s linear;
}

.spinner-image {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
}

/* 加载提示 */
.loading-hint {
  position: absolute;
  top: 512px;
  left: calc(50% - 146.5px);
  display: flex;
  align-items: center;
  gap: 22px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.loading-hint.show {
  opacity: 1;
  transform: translateY(0);
}

.hint-dot {
  width: 17px;
  height: 17px;
  animation: pulse 1.5s ease-in-out infinite;
}

.hint-text {
  width: 254px;
  height: 25px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 20px;
  white-space: nowrap;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

/* 底部装饰 */
.bottom-decoration {
  position: absolute;
  width: 267.8px;
  height: 172px;
  bottom: 80px;
  left: calc(50% - 133.9px);
  animation: fadeIn 0.8s ease-in-out 0.3s backwards;
}

/* 进度条容器 */
.progress-bar-container {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: all 0.5s ease-out;
}

.progress-bar-container.show {
  opacity: 1;
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #A02D18, #C6A268);
  border-radius: 3px;
  transition: width 0.3s ease-out;
  box-shadow: 0 0 8px rgba(160, 45, 24, 0.5);
}

.progress-text {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 14px;
  color: rgba(100, 70, 63, 1);
  font-weight: 500;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .loading-container {
    width: 100vw;
    height: 100vh;
    min-height: 852px;
  }
}
</style>

