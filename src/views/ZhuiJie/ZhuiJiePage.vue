<template>
  <div class="zhuijie-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/zhuijie/assets/7056cbc5-5c9d-42ed-88d7-324252f2e9da.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/zhuijie/assets/ba7ac92a-dd61-42d3-8207-ec07c5a91be1.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/zhuijie/assets/db7867ac-dee5-4105-8807-0dada6a5a404.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 渐变背景 -->
      <div class="gradient-background"></div>

      <!-- 标题"缀结" -->
      <div class="page-title">缀结</div>

      <!-- 左侧装饰图 -->
      <img 
        src="/assets/zhuijie/assets/f2c879a9-4728-4a45-a062-8ce7b34e4105.png" 
        alt="左侧装饰" 
        class="left-decoration"
      />

      <!-- 中间装饰图 -->
      <img 
        src="/assets/zhuijie/assets/f3e2afd7-9900-41a1-93f0-1d2f748432ac.png" 
        alt="中间装饰" 
        class="middle-decoration"
      />

      <!-- 丝线容器 -->
      <svg class="silk-threads" viewBox="0 0 393 852" xmlns="http://www.w3.org/2000/svg">
        <!-- 左侧丝线 - 连接到左手 -->
        <line class="thread thread-1" x1="120" y1="180" x2="120" y2="470" stroke="#D4C5B0" stroke-width="2" />
        
        <!-- 中间丝线 - 连接到头部 -->
        <line class="thread thread-2" x1="265" y1="150" x2="265" y2="380" stroke="#D4C5B0" stroke-width="2" />
        
        <!-- 右侧丝线 - 连接到右手 -->
        <line class="thread thread-3" x1="310" y1="200" x2="310" y2="520" stroke="#D4C5B0" stroke-width="2" />
      </svg>

      <!-- 大的背景容器 -->
      <div class="main-background-container">
        <img 
          src="/assets/zhuijie/assets/04f4ae32-0354-45b7-9cb5-3fede94b1df3.png" 
          alt="主背景" 
          class="main-background-image"
        />
        
        <!-- 右上角装饰图 -->
        <img 
          src="/assets/zhuijie/assets/878be465-b7fe-4cbe-8063-b255200ae1d6.png" 
          alt="右上角装饰" 
          class="top-right-decoration"
        />
      </div>

      <!-- 下一步按钮 -->
      <div class="next-button-wrapper" @click="handleNextClick">
        <div class="next-button-circle"></div>
        <span class="next-button-text">继续</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');

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

// 点击下一步按钮
const handleNextClick = () => {
  // 保存缀结完成状态
  localStorage.setItem('zhuijieCompleted', 'true');
  
  // 跳转到表演页面
  router.push('/show-process');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 主容器 */
.zhuijie-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: #F3EEEE;
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

/* 时间显示 */
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

/* Dynamic Island 占位符 */
.dynamic-island-spacer {
  width: 124px;
  height: 10px;
}

/* 状态图标区域 */
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

/* 渐变背景 */
.gradient-background {
  position: absolute;
  width: 393px;
  height: 852px;
  left: 0;
  top: 0;
  background: linear-gradient(0deg, rgba(160, 45, 24, 1) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 1;
  animation: fadeIn 1s ease-out;
}

/* 标题"缀结" */
.page-title {
  position: absolute;
  top: 38px;
  right: 79px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 40px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 20;
  animation: fadeInDown 1s ease-out;
}

/* 左侧装饰图 */
.left-decoration {
  position: absolute;
  width: 101.01px;
  height: 192.18px;
  left: 39.49px;
  top: 22.49px;
  z-index: 15;
  animation: fadeInLeft 1s ease-out 0.3s backwards;
}

/* 中间装饰图 */
.middle-decoration {
  position: absolute;
  width: 95.63px;
  height: 129.83px;
  left: 228.25px;
  top: 41.25px;
  z-index: 15;
  animation: fadeInRight 1s ease-out 0.5s backwards;
}

/* 主背景容器 */
.main-background-container {
  position: absolute;
  top: 183px;
  left: 0;
  width: 393px;
  height: 556px;
  z-index: 10;
}

.main-background-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: scaleUp 1.2s ease-out 0.7s backwards;
}

/* 右上角装饰图 */
.top-right-decoration {
  position: absolute;
  width: 95.22px;
  height: 129.66px;
  top: 3.4px;
  right: 18.23px;
  z-index: 12;
  animation: float 3s ease-in-out 1.5s infinite;
}

/* 丝线SVG容器 */
.silk-threads {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  z-index: 8;
  pointer-events: none;
}

/* 丝线基础样式 */
.thread {
  stroke-linecap: round;
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  transition: all 0.3s ease;
}

/* 丝线动画 - 通过stroke-dasharray实现线条延伸效果 */
/* 左侧丝线 - 连接左手 */
.thread-1 {
  stroke-dasharray: 290;
  stroke-dashoffset: 290;
  animation: threadDrop 1.2s ease-out 0.5s forwards;
}

/* 中间丝线 - 连接头部 */
.thread-2 {
  stroke-dasharray: 230;
  stroke-dashoffset: 230;
  animation: threadDrop 1s ease-out 0.55s forwards;
}

/* 右侧丝线 - 连接右手 */
.thread-3 {
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  animation: threadDrop 1.3s ease-out 0.6s forwards;
}

/* 下一步按钮容器 */
.next-button-wrapper {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px 24px;
  background: linear-gradient(135deg, #A02D18 0%, #64463F 100%);
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(160, 45, 24, 0.4);
  transition: all 0.3s ease;
  animation: slideUp 1s ease-out 1.2s backwards;
}

.next-button-wrapper:hover {
  transform: translateX(-50%) translateY(-3px);
  box-shadow: 0 6px 20px rgba(160, 45, 24, 0.6);
}

.next-button-wrapper:active {
  transform: translateX(-50%) translateY(-1px);
}

.next-button-circle {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.next-button-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 18px;
  color: white;
  font-weight: normal;
}

/* ========== 动画定义 ========== */

/* 淡入动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 从上淡入 */
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

/* 从左淡入 */
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 从右淡入 */
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 缩放弹出 */
@keyframes scaleUp {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 上滑进入 */
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 漂浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

/* 丝线下降动画 */
@keyframes threadDrop {
  0% {
    stroke-dashoffset: 400;
    opacity: 0;
  }
  5% {
    opacity: 0.9;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.9;
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .zhuijie-container {
    width: 100vw;
  }
}
</style>

