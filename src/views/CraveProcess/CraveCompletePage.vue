<template>
  <div class="crave-complete-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/CraveProcess/complete/assets/346f6fe0-c19a-41ac-bc48-643763644ae9.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/CraveProcess/complete/assets/1b9a41b6-cd8b-45a9-91bc-7edabe1cae02.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/CraveProcess/complete/assets/d02b59a1-204a-427f-a03f-85106d76a6a3.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 标题"雕刻" -->
      <div class="page-title">雕刻</div>

      <!-- 英文副标题 -->
      <div class="subtitle-text">Carving Shadow Puppets</div>

      <!-- 祥云图案容器 -->
      <div class="cloud-container" @click="handleCloudClick">
        <img 
          src="/assets/CraveProcess/complete/assets/789c06ef-4c57-4c15-86db-87d1ce68a15a.png" 
          alt="祥云" 
          class="cloud-image"
          :class="{ 
            'cloud-rise': animationStage === 'rise' || animationStage === 'showHead'
          }"
        />
        
        <!-- 提示文字 -->
        <div class="hint-text" v-show="!isAnimating">
          <img 
            src="/assets/CraveProcess/complete/assets/fd93e530-c6f0-4259-976b-180f25190c0d.png" 
            alt="点" 
            class="hint-dot"
          />
          <span class="hint-label">点击祥云</span>
        </div>
      </div>

      <!-- 头部元素（人物或图案），初始隐藏 -->
      <div 
        class="character-head"
        :class="{ 'show-head': animationStage === 'showHead' }"
      >
        <img 
          src="/assets/CraveProcess/complete/assets/915.png" 
          alt="人物头部" 
          class="head-image"
        />
      </div>

      <!-- 点击按钮，头部显示后出现 -->
      <div 
        class="next-button"
        :class="{ 'show-button': animationStage === 'showHead' }"
        @click="handleNextClick"
        v-show="animationStage === 'showHead'"
      >
        <img 
          src="/assets/CraveProcess/assets/69309ad1-4a40-4265-8db7-927cf00b6667.png" 
          alt="下一步" 
          class="button-image"
        />
      </div>

      <!-- 背景装饰图案 -->
      <img 
        src="/assets/CraveProcess/complete/assets/95d9d0e4-5e48-4a91-933b-0936652ca599.png" 
        alt="装饰" 
        class="decoration-image"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const isAnimating = ref(false);
const animationStage = ref(''); // '', 'rise', 'enlarge', 'showHead'

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

// 点击祥云处理 - 分阶段动画
const handleCloudClick = () => {
  if (isAnimating.value) return;
  
  isAnimating.value = true;
  
  // 阶段1：祥云上升到顶部 (0-800ms)
  animationStage.value = 'rise';
  
  setTimeout(() => {
    // 阶段2：显示头部 (800ms 后)
    animationStage.value = 'showHead';
    // 不再自动跳转，等待用户点击按钮
  }, 800);
};

// 点击按钮跳转到下一页
const handleNextClick = () => {
  // 跳转到敷彩首页
  router.push('/color-start');
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
.crave-complete-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(100, 70, 63, 1);
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
  color: rgba(0, 0, 0, 1);
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

/* 主内容区域 */
.main-content {
  position: relative;
  width: 393px;
  height: 803px;
  margin-top: 49px;
}

/* 标题"雕刻" */
.page-title {
  position: absolute;
  top: 63px;
  right: 30px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(226, 213, 197, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 10;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 72px;
  left: 0;
  width: 189px;
  height: 489.53px;
  transform: rotate(89.84deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 2;
}

/* 祥云容器 */
.cloud-container {
  position: absolute;
  top: -105px;
  left: -8px;
  width: 401px;
  height: 535px;
  cursor: pointer;
  z-index: 5;
}

/* 祥云图片 */
.cloud-image {
  position: absolute;
  width: 401px;
  height: 535px;
  top: 0;
  left: 0;
  object-fit: contain;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: float 3s ease-in-out infinite;
}

.cloud-image:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 8px 20px rgba(255, 255, 255, 0.3));
}

/* 祥云上升到顶部动画 */
.cloud-image.cloud-rise {
  animation: cloudRiseToTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* 祥云漂浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* 祥云上升到顶部关键帧 */
@keyframes cloudRiseToTop {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  70% {
    transform: translateY(-200px) scale(0.85);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-250px) scale(0.75);
    opacity: 0.3;
  }
}

/* 提示文字 */
.hint-text {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 6;
  animation: pulse 2s ease-in-out infinite;
}

.hint-dot {
  width: 17px;
  height: 17px;
}

.hint-label {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  white-space: nowrap;
}

/* 提示文字脉冲动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* 装饰图案 */
.decoration-image {
  position: absolute;
  top: 179px;
  left: 393px;
  width: 105.32px;
  height: 348.06px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 1;
}

/* 头部元素容器 */
.character-head {
  position: absolute;
  top: 212px;
  left: -02px;
  width: 753px;
  height: 1065px;
  opacity: 0;
  z-index: 10;
  pointer-events: none;
  transition: all 0.6s ease-out;
  transform: scale(0.5); /* 缩小到50%以适应屏幕 */
  transform-origin: left top;
}

/* 头部图片 */
.head-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
}

/* 显示头部动画 */
.character-head.show-head {
  animation: headReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* 头部显现关键帧 */
@keyframes headReveal {
  0% {
    opacity: 0;
    transform: scale(0.4) translateY(50px);
  }
  60% {
    opacity: 1;
    transform: scale(0.52) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(0.5) translateY(0);
  }
}

/* 下一步按钮容器 */
.next-button {
  position: absolute;
  top: 719px;
  left: 292px;
  width: 56px;
  height: 56px;
  opacity: 0;
  z-index: 15;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 按钮图片 */
.button-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

/* 按钮悬停效果 */
.next-button:hover .button-image {
  transform: scale(1.15);
  filter: drop-shadow(0 8px 20px rgba(255, 255, 255, 0.5));
}

/* 按钮点击效果 */
.next-button:active .button-image {
  transform: scale(0.95);
}

/* 显示按钮动画 */
.next-button.show-button {
  animation: buttonFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.3s;
}

/* 按钮淡入关键帧 */
@keyframes buttonFadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.5);
  }
  60% {
    opacity: 1;
    transform: translateY(0) scale(1.15);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .crave-complete-container {
    width: 100vw;
  }
}
</style>

