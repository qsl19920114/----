<template>
  <div class="color-step4-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ColorProcess/step4/assets/a404fe3a-8f9f-40e3-a724-66432c052167.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ColorProcess/step4/assets/744e78a9-920d-4d50-ba92-6186e515ec18.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ColorProcess/step4/assets/8653560e-a41c-4f9b-abc0-cb62add77310.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 背景图片 -->
      <div class="background-wrapper">
        <img 
          src="/assets/ColorProcess/step4/assets/8d6a547a-3256-4001-89f5-31be517bbf3a.png" 
          alt="背景" 
          class="background-image"
        />
      </div>

      <!-- 标题"敷彩" -->
      <div class="page-title">敷彩</div>

      <!-- 英文副标题 -->
      <div class="subtitle-text">Coloring Shadow Puppets</div>

      <!-- 白色区域 - 后面的 -->
      <div class="white-box-back"></div>

      <!-- 白色区域 - 前面的 -->
      <div class="white-box-front">
        <!-- 左下角的按钮 -->
        <img 
          src="/assets/ColorProcess/step4/assets/59a67ab4-24c0-4457-9174-65fc9ec96bdd.png" 
          alt="完成按钮" 
          class="complete-button"
          @click="handleCompleteClick"
        />
      </div>

      <!-- 大的皮影图片容器 -->
      <div class="puppet-container">
        <img 
          src="/assets/ColorProcess/step4/assets/4a5f9275-6137-49c8-992f-96ef24f43106.png" 
          alt="皮影图案" 
          class="puppet-image"
        />
      </div>

      <!-- 装饰元素层 -->
      <div class="decoration-layer">
        <img 
          src="/assets/ColorProcess/step4/assets/6735e145-11a8-4bc4-a259-abd16cf811ab.png" 
          alt="颜料瓶2" 
          class="paint-bottle-2"
        />
        <img 
          src="/assets/ColorProcess/step4/assets/855d8679-2e37-444b-9265-56ee2ab22abd.png" 
          alt="画笔" 
          class="paint-brush"
        />
        <img 
          src="/assets/ColorProcess/step4/assets/7d2b717f-f9f6-4d09-8232-980f511c28df.png" 
          alt="装饰元素1" 
          class="decoration-1"
        />
        <img 
          src="/assets/ColorProcess/step4/assets/24b50c5e-0207-4d0a-8ab6-f941c63a160e.png" 
          alt="装饰元素2" 
          class="decoration-2"
        />
      </div>

      <!-- 提示文字和箭头 -->
      <div class="hint-container">
        <div class="hint-text">拖动熨斗到皮影</div>
        <img 
          src="/assets/ColorProcess/step4/assets/ecbdd77f-c11e-491c-a486-bc3494fb283d.png" 
          alt="箭头" 
          class="hint-arrow"
        />
      </div>

      <!-- 可点击的颜料瓶1 - 独立放置，层级更高 -->
      <img 
        src="/assets/ColorProcess/step4/assets/b5783744-ac2c-423a-bfc0-afb27a185ea5.png" 
        alt="颜料瓶1" 
        class="paint-bottle-1-clickable"
        @click="handleBottleClick"
      />
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

// 点击颜料瓶1按钮
const handleBottleClick = () => {
  // 跳转到第五步
  router.push('/color-step5');
};

// 点击完成按钮
const handleCompleteClick = () => {
  // 标记敷彩流程完成
  localStorage.setItem('colorProcessCompleted', 'true');
  
  // 跳转回敷彩起始页
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
.color-step4-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
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
  height: 803px;
  margin-top: 49px;
}

/* 背景图片 */
.background-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  z-index: 1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 标题"敷彩" */
.page-title {
  position: absolute;
  top: 0;
  right: 80px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 20;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 9px;
  left: 351px;
  width: 189px;
  height: 489.53px;
  transform: rotate(89.84deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(160, 45, 24, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 20;
}

/* 白色区域 - 后面的 */
.white-box-back {
  position: absolute;
  top: 85px;
  left: 13px;
  width: 367px;
  height: 559px;
  background: rgba(255, 255, 255, 1);
  z-index: 5;
}

/* 白色区域 - 前面的 */
.white-box-front {
  position: absolute;
  top: 61px;
  left: 26px;
  width: 367px;
  height: 559px;
  background: rgba(255, 255, 255, 0.5);
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}

/* 完成按钮 */
.complete-button {
  width: 64px;
  height: 64px;
  margin-left: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.complete-button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.8));
}

.complete-button:active {
  transform: scale(0.95);
}

/* 皮影图案容器 */
.puppet-container {
  position: absolute;
  top: 129px;
  left: 0;
  width: 393px;
  height: 660px;
  z-index: 10;
}

.puppet-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 装饰元素层 */
.decoration-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 803px;
  z-index: 7;
  pointer-events: none;
}

/* 可点击的颜料瓶1 - 独立元素，层级最高 */
.paint-bottle-1-clickable {
  position: absolute;
  top: 699px;
  left: 36px;
  width: 64px;
  height: 64px;
  z-index: 20;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.paint-bottle-1-clickable:hover {
  transform: scale(1.2) translateY(-5px);
  filter: drop-shadow(0 6px 16px rgba(255, 200, 100, 0.8));
}

.paint-bottle-1-clickable:active {
  transform: scale(1.05);
}

.paint-bottle-2 {
  position: absolute;
  top: 620px;
  left: 36px;
  width: 64px;
  height: 64px;
  animation: float 3s ease-in-out 0.5s infinite;
}

.paint-brush {
  position: absolute;
  top: 602.22px;
  left: 29px;
  width: 87.3px;
  height: 100.11px;
}

.decoration-1 {
  position: absolute;
  top: 511px;
  left: 4px;
  width: 123.21px;
  height: 119.64px;
}

.decoration-2 {
  position: absolute;
  top: 681.22px;
  left: 22px;
  width: 85px;
  height: 107.78px;
}

/* 提示容器 */
.hint-container {
  position: absolute;
  top: 712px;
  left: 156px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 15;
  animation: hintPulse 2s ease-in-out infinite;
  pointer-events: none;
}

.hint-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  white-space: nowrap;
}

.hint-arrow {
  width: 17px;
  height: 17px;
}

/* 按钮脉冲动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

/* 漂浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 提示动画 */
@keyframes hintPulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0.7;
    transform: translateX(5px);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .color-step4-container {
    width: 100vw;
  }
}
</style>

