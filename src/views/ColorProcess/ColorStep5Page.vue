<template>
  <div class="color-step5-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ColorProcess/step5/assets/0420c04c-e22e-4a0b-8724-d517a5eda380.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ColorProcess/step5/assets/3ba800ea-3702-4add-afb4-d6ea41238155.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ColorProcess/step5/assets/7b8749b9-9532-4084-a469-a38f5ecae303.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 标题"敷彩" -->
      <div class="page-title">敷彩</div>

      <!-- 英文副标题 -->
      <div class="subtitle-text">Coloring Shadow Puppets</div>

      <!-- 说明文字 -->
      <div class="instruction-text">
        用平布包裹皮影部件，以烙铁或电熨斗烫平。
      </div>

      <!-- 中间的大框和图片容器 -->
      <div class="center-box-container">
        <img 
          src="/assets/ColorProcess/step5/assets/5d0e568d-aba0-4c5c-88e4-b1b998b20468.png" 
          alt="中心容器背景" 
          class="center-box-bg"
        />
      </div>

      <!-- 大的皮影图片 -->
      <div class="puppet-display">
        <img 
          src="/assets/ColorProcess/step5/assets/ea4eb379-3fcd-405b-a61d-1736e5174ae2.png" 
          alt="皮影图案" 
          class="puppet-large-image"
        />
      </div>

      <!-- 装饰元素层 -->
      <div class="decoration-layer">
        <!-- 颜料瓶们 -->
        <img 
          src="/assets/ColorProcess/step5/assets/fba9f87c-f04b-49a7-a12e-8565789793f9.png" 
          alt="颜料瓶1" 
          class="paint-bottle-1"
        />
        <img 
          src="/assets/ColorProcess/step5/assets/0952543a-24ab-4ae2-882e-751681c0d3e3.png" 
          alt="颜料瓶2" 
          class="paint-bottle-2"
        />
        <img 
          src="/assets/ColorProcess/step5/assets/510266f4-1425-41eb-969f-f3c56c4a89df.png" 
          alt="颜料瓶3" 
          class="paint-bottle-3"
        />
        <img 
          src="/assets/ColorProcess/step5/assets/a8ad007f-18e6-4d19-b11d-b805adc34e8e.png" 
          alt="画笔" 
          class="paint-brush"
        />
        <img 
          src="/assets/ColorProcess/step5/assets/a62fe31d-aea2-4709-a5ee-c662969874ee.png" 
          alt="装饰元素1" 
          class="decoration-1"
        />
      </div>

      <!-- 下一步按钮 -->
      <div class="next-button-wrapper">
        <img 
          src="/assets/ColorProcess/step5/assets/6b16d586-8449-49c7-b1d0-e76d3e1446d0.png" 
          alt="下一步按钮" 
          class="next-button"
          @click="handleNextClick"
        />
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
  // 跳转到完成页面
  router.push('/color-complete');
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
.color-step5-container {
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

/* 标题"敷彩" */
.page-title {
  position: absolute;
  top: 0;
  right: 50px;
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
  left: 186px;
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

/* 说明文字 */
.instruction-text {
  position: absolute;
  top: 137px;
  left: 112px;
  width: 264px;
  height: 176px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
  font-weight: normal;
  z-index: 15;
}

/* 中间的大框容器 */
.center-box-container {
  position: absolute;
  top: 175px;
  left: 91px;
  width: 391px;
  height: 392px;
  z-index: 10;
}

.center-box-bg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 皮影图案显示 */
.puppet-display {
  position: absolute;
  top: 147px;
  left: 99px;
  width: 347px;
  height: 463px;
  z-index: 12;
}

.puppet-large-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 装饰元素层 */
.decoration-layer {
  position: absolute;
  top: 0;
  left: -100px;
  width: 393px;
  height: 803px;
  z-index: 8;
  pointer-events: none;
}

/* 颜料瓶和装饰 */
.paint-bottle-1 {
  position: absolute;
  top: 699px;
  left: 108px;
  width: 64px;
  height: 64px;
  animation: float 3s ease-in-out infinite;
}

.paint-bottle-2 {
  position: absolute;
  top: 620px;
  left: 108px;
  width: 64px;
  height: 64px;
  animation: float 3s ease-in-out 0.5s infinite;
}

.paint-bottle-3 {
  position: absolute;
  top: 541px;
  left: 108px;
  width: 64px;
  height: 64px;
  animation: float 3s ease-in-out 1s infinite;
}

.paint-brush {
  position: absolute;
  top: 602.22px;
  left: 104.5px;
  width: 87.3px;
  height: 100.11px;
}

.decoration-1 {
  position: absolute;
  top: 508px;
  left: 80.5px;
  width: 123.21px;
  height: 119.64px;
}

/* 下一步按钮容器 */
.next-button-wrapper {
  position: absolute;
  top: 454px;
  left: 231.5px;
  width: 56px;
  height: 56px;
  z-index: 15;
}

.next-button {
  width: 56px;
  height: 56px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.next-button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.5));
}

.next-button:active {
  transform: scale(0.95);
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

/* 响应式 */
@media screen and (max-width: 393px) {
  .color-step5-container {
    width: 100vw;
  }
}
</style>

