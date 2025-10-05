<template>
  <div class="zhipi-complete-container">
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
          <img src="/assets/zhipi-process/page2/assets/a069b88a-7d5b-4c56-a916-65e4a3f74f17.png" class="icon-signal" alt="信号" />
          <img src="/assets/zhipi-process/page2/assets/70a6236c-67fe-499c-a567-0cfb11f1fbcf.png" class="icon-wifi" alt="WiFi" />
          <div class="battery-icon">
            <div class="battery-border"></div>
            <div class="battery-cap"></div>
            <div class="battery-capacity"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景图片 -->
    <img src="/assets/zhipi-process/page1/assets/bdb08282-6891-486f-bbde-1c21101f9102.png" class="bg-image" alt="背景" />

    <!-- 径向渐变效果 -->
    <div class="radial-gradient" :class="{ 'show': showGradient }"></div>

    <!-- 干净的牛皮 - 带旋转动画 -->
    <img 
      src="/assets/zhipi-process/page2/assets/0c17d4c6-e4de-4b18-b6ee-873796686092.png" 
      class="clean-leather" 
      :class="{ 'show': showLeather }"
      alt="干净的牛皮" 
    />

    <!-- 标题 -->
    <div class="title-text">制皮</div>
    <div class="subtitle-text">Making Shadow Puppet Leather</div>

    <!-- 完成提示 -->
    <div class="complete-hint" :class="{ 'show': showHint }">
      <div class="check-icon"></div>
      <div class="complete-text">已处理干净</div>
    </div>

    <!-- 下一步按钮 -->
    <div class="next-button-wrapper" :class="{ 'show': showButton }" @click="goToNextStep">
      <div class="next-button">
        <div class="button-inner"></div>
        <div class="button-border"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const showGradient = ref(false);
const showLeather = ref(false);
const showHint = ref(false);
const showButton = ref(false);

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

// 跳转到下一步
const goToNextStep = () => {
  // 跳转到绘制图案页面
  router.push('/draw-process');
};

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000);
  
  // 依次显示动画元素
  setTimeout(() => {
    showGradient.value = true;
  }, 200);
  
  setTimeout(() => {
    showLeather.value = true;
  }, 400);
  
  setTimeout(() => {
    showHint.value = true;
  }, 800);
  
  setTimeout(() => {
    showButton.value = true;
  }, 1200);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* 主容器 - 基于设计稿的393px x 852px */
.zhipi-complete-container {
  position: relative;
  width: 100%;
  max-width: 393px;
  height: 852px;
  background: #E2D5C5;
  overflow: hidden;
  margin: 0 auto;
}

/* 状态栏 - iPhone 样式 */
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
  gap: 10px;
  width: 393px;
  height: 22px;
}

/* 时间显示 */
.time-display {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 6px 0 16px;
  margin: 0 auto;
  width: 134.5px;
  height: 22px;
  flex: none;
  order: 0;
  flex-grow: 1;
}

.time-text {
  width: 37px;
  height: 22px;
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-style: normal;
  font-weight: 590;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  color: #000000;
}

/* 占位空间 - Dynamic Island */
.spacer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  width: 124px;
  height: 10px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

/* 状态图标 */
.status-icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px 0 6px;
  gap: 7px;
  margin: 0 auto;
  width: 134.5px;
  height: 13px;
  flex: none;
  order: 2;
  flex-grow: 1;
}

.icon-signal {
  width: 19.2px;
  height: 12.23px;
}

.icon-wifi {
  width: 17.14px;
  height: 12.33px;
}

/* 电池图标 */
.battery-icon {
  position: relative;
  width: 27.33px;
  height: 13px;
}

.battery-border {
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  height: 100%;
  left: calc(50% - 25px/2 + 0.67px);
  top: 0;
  mix-blend-mode: normal;
  opacity: 0.35;
  border: 1px solid #000000;
  border-radius: 4.3px;
}

.battery-cap {
  position: absolute;
  width: 1.33px;
  height: 4px;
  left: calc(50% - 1.33px/2 + 14.83px);
  top: calc(50% - 4px/2);
  background: #000000;
  mix-blend-mode: normal;
  opacity: 0.4;
}

.battery-capacity {
  position: absolute;
  width: 21px;
  height: 9px;
  left: calc(50% - 21px/2 + 0.67px);
  top: calc(50% - 9px/2);
  background: #000000;
  border-radius: 2.5px;
}

/* 背景图片 */
.bg-image {
  position: absolute;
  width: 617px;
  height: 886px;
  left: calc(50% - 617px/2);
  top: 0;
  object-fit: cover;
}

/* 径向渐变效果 */
.radial-gradient {
  position: absolute;
  width: 393px;
  height: 392px;
  left: -4px;
  top: 230px;
  background: radial-gradient(50% 50% at 50% 50%, #A02D18 0%, #ECE8DC 100%);
  opacity: 0;
  transition: opacity 0.8s ease-out;
}

.radial-gradient.show {
  opacity: 0.58;
}

/* 干净的牛皮 - 带旋转效果 */
.clean-leather {
  position: absolute;
  width: 341.13px;
  height: 455.19px;
  left: -4px;
  top: 178px;
  transform: rotate(0deg);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.clean-leather.show {
  transform: rotate(-7.47deg);
  opacity: 1;
}

/* 标题文字 */
.title-text {
  position: absolute;
  width: 50px;
  height: 137px;
  left: 313px;
  top: 63px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 63px;
  color: #64463F;
  z-index: 10;
}

/* 副标题 - 英文旋转 */
.subtitle-text {
  position: absolute;
  width: 489px;
  height: 187.38px;
  left: 191px;
  top: 72px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #A02D18;
  transform: rotate(89.84deg);
  z-index: 10;
}

/* 完成提示 */
.complete-hint {
  position: absolute;
  left: 37px;
  top: 735px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s ease-out;
}

.complete-hint.show {
  opacity: 1;
  transform: translateX(0);
}

/* 勾选图标 */
.check-icon {
  width: 17px;
  height: 17px;
  background: #A02D18;
  border-radius: 50%;
  position: relative;
  animation: checkPulse 0.5s ease-out;
}

.check-icon::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* 完成文字 */
.complete-text {
  width: 100px;
  height: 26px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #64463F;
  white-space: nowrap;
}

/* 下一步按钮 */
.next-button-wrapper {
  position: absolute;
  width: 56px;
  height: 56px;
  left: 300px;
  top: 698px;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.next-button-wrapper.show {
  opacity: 1;
  transform: scale(1);
  animation: float 3s ease-in-out infinite;
}

.next-button-wrapper:hover {
  transform: scale(1.1);
}

.next-button-wrapper:active {
  transform: scale(0.95);
}

.next-button {
  position: relative;
  width: 56px;
  height: 56px;
}

.button-inner {
  position: absolute;
  width: 29px;
  height: 29px;
  left: calc(50% - 29px/2 - 0.5px);
  top: calc(50% - 29px/2 - 0.5px);
  background: #FFFFFF;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.button-border {
  box-sizing: border-box;
  position: absolute;
  width: 56px;
  height: 56px;
  left: calc(50% - 56px/2);
  top: calc(50% - 56px/2);
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.next-button-wrapper:hover .button-inner {
  background: #A02D18;
}

.next-button-wrapper:hover .button-border {
  border-color: #A02D18;
}

/* 动画效果 */
@keyframes checkPulse {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1) translateY(-8px);
  }
}

/* 响应式适配 */
@media screen and (max-width: 393px) {
  .zhipi-complete-container {
    width: 100vw;
    height: 100vh;
    min-height: 852px;
  }
}
</style>

