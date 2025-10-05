<template>
  <div class="crave-start-container">
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
            src="/assets/CraveProcess/assets/903abb70-acca-4440-9b42-d606818604f7.png" 
            class="icon-signal" 
            alt="信号"
          />
          <img 
            src="/assets/CraveProcess/assets/5cfc031a-dc48-4b82-929b-efee022350a0.png" 
            class="icon-wifi" 
            alt="WiFi"
          />
          <img 
            src="/assets/CraveProcess/assets/edef1f06-60a8-4866-80b7-26241c1fd11c.png" 
            class="icon-battery" 
            alt="电量"
          />
        </div>
      </div>
    </div>

    <!-- 背景图 image 2 -->
    <div class="background-image"></div>

    <!-- 已完成的图案 123 1 -->
    <img 
      v-if="selectedImage" 
      :src="selectedImage" 
      alt="已完成的图案" 
      class="completed-pattern"
    />

    <!-- 左腿 -->
    <div class="part-left-leg"></div>

    <!-- 躯干 -->
    <div class="part-torso"></div>

    <!-- 左手 -->
    <div class="part-left-hand"></div>

    <!-- 右臂 -->
    <div class="part-right-arm"></div>

    <!-- 右腿 -->
    <div class="part-right-leg"></div>

    <!-- 盆骨 -->
    <div class="part-pelvis"></div>

    <!-- 左臂 -->
    <div class="part-left-arm"></div>

    <!-- 右手 -->
    <div class="part-right-hand"></div>

    <!-- 雕刻标题 -->
    <div class="page-title">雕刻</div>

    <!-- 英文副标题 -->
    <div class="subtitle-text">Carving Shadow Puppets</div>

    <!-- 启动按钮 Component 1 -->
    <div class="start-button-component" @click="startCarving">
      <div class="button-inner-circle"></div>
      <div class="button-outer-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const selectedImage = ref(null);

// 定时器
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

// 开始雕刻 - 跳转到卡片分解页面
const startCarving = () => {
  router.push('/crave-cards');
};

onMounted(() => {
  // 获取选中的图片
  const storedImage = sessionStorage.getItem('selectedPuppetImage');
  if (storedImage) {
    selectedImage.value = storedImage;
  }
  
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 12 - 主容器 */
.crave-start-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: #E2D5C5;
  overflow: hidden;
  margin: 0 auto;
}

/* Status Bar - iPhone */
.status-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px 0px 0px;
  position: absolute;
  width: 393px;
  height: 49px;
  left: 0px;
  top: 0px;
  z-index: 100;
}

/* Frame */
.status-bar-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 134px;
  width: 393px;
  height: 22px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

/* Time */
.status-bar-left {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px 0px 16px;
  gap: 10px;
  margin: 0 auto;
  width: 134.5px;
  height: 22px;
  flex: none;
  order: 0;
  flex-grow: 1;
}

.time-display {
  width: 37px;
  height: 22px;
  flex: none;
  order: 0;
  flex-grow: 0;
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

/* Dynamic Island spacer */
.status-bar-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0 auto;
  width: 124px;
  height: 10px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

/* Levels */
.status-bar-right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 6px;
  gap: 7px;
  margin: 0 auto;
  width: 134.5px;
  height: 13px;
  flex: none;
  order: 2;
  flex-grow: 1;
}

/* Cellular Connection */
.icon-signal {
  width: 19.2px;
  height: 12.23px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

/* Wifi */
.icon-wifi {
  width: 17.14px;
  height: 12.33px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

/* Battery */
.icon-battery {
  width: 27.33px;
  height: 13px;
  flex: none;
  order: 2;
  flex-grow: 0;
}

/* image 2 - 背景图 */
.background-image {
  position: absolute;
  width: 617px;
  height: 886px;
  left: -29px;
  top: -17px;
  background: url('/assets/CraveProcess/assets/175569bb-3c46-4175-8ed8-9caefa0bee6f.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 123 1 - 已完成的图案 */
.completed-pattern {
  position: absolute;
  width: 449.93px;
  height: 636.36px;
  left: -12.94px;
  top: 51.27px;
  transform: rotate(0.01deg);
  z-index: 2;
  opacity: 0.3;
}

/* 左 - 左腿 */
.part-left-leg {
  position: absolute;
  width: 454.9px;
  height: 643.4px;
  left: -43.36px;
  top: 112.11px;
  background: url('/assets/CraveProcess/assets/左.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(-1.01deg);
  z-index: 3;
}

/* 躯干 */
.part-torso {
  position: absolute;
  width: 449.93px;
  height: 636.36px;
  left: -22.79px;
  top: 51.27px;
  background: url('/assets/CraveProcess/assets/躯干.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(-1.58deg);
  z-index: 4;
}

/* 左手 */
.part-left-hand {
  position: absolute;
  width: 449.93px;
  height: 636.36px;
  left: -116.81px;
  top: -46.26px;
  background: url('/assets/CraveProcess/assets/左手.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(22.44deg);
  z-index: 5;
}

/* 右臂 */
.part-right-arm {
  position: absolute;
  width: 450.24px;
  height: 636.81px;
  left: -191px;
  top: 14.46px;
  background: url('/assets/CraveProcess/assets/右臂.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(-42.76deg);
  z-index: 6;
}

/* 右 - 右腿 */
.part-right-leg {
  position: absolute;
  width: 449.93px;
  height: 636.36px;
  left: -214.26px;
  top: 62.76px;
  background: url('/assets/CraveProcess/assets/右.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(-19.28deg);
  z-index: 7;
}

/* 盆骨 */
.part-pelvis {
  position: absolute;
  width: 449.48px;
  height: 635.73px;
  left: -12.05px;
  top: 69.16px;
  background: url('/assets/CraveProcess/assets/盆骨.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(-0.08deg);
  z-index: 8;
}

/* 左臂 */
.part-left-arm {
  position: absolute;
  width: 449.93px;
  height: 636.36px;
  left: -191.08px;
  top: -74px;
  background: url('/assets/CraveProcess/assets/左臂.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(56.82deg);
  z-index: 9;
}

/* 右手 */
.part-right-hand {
  position: absolute;
  width: 449.93px;
  height: 636.36px;
  left: -259px;
  top: 87.06px;
  background: url('/assets/CraveProcess/assets/右手.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotate(56.9deg);
  z-index: 10;
}

/* 雕刻 */
.page-title {
  position: absolute;
  width: 50px;
  height: 137px;
  left: 313px;
  top: 63px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 63px;
  color: #64463F;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 20;
}

/* Carving Shadow Puppets */
.subtitle-text {
  position: absolute;
  width: 489px;
  height: 187.38px;
  left: 191px;
  top: 72px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #A02D18;
  transform: rotate(89.84deg);
  transform-origin: left top;
  z-index: 20;
}

/* Component 1 - 启动按钮 */
.start-button-component {
  position: absolute;
  width: 56px;
  height: 56px;
  left: 292px;
  top: 719px;
  cursor: pointer;
  z-index: 30;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.start-button-component:hover {
  transform: scale(1.1);
}

.start-button-component:active {
  transform: scale(0.95);
}

/* Ellipse 1 - 内圆 */
.button-inner-circle {
  position: absolute;
  width: 29px;
  height: 29px;
  left: calc(50% - 29px/2 - 0.5px);
  top: calc(50% - 29px/2 - 0.5px);
  background: #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Ellipse 2 - 外圆 */
.button-outer-circle {
  box-sizing: border-box;
  position: absolute;
  width: 56px;
  height: 56px;
  left: calc(50% - 56px/2);
  top: calc(50% - 56px/2);
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.start-button-component:hover .button-outer-circle {
  border-color: rgba(160, 45, 24, 0.8);
  box-shadow: 0 6px 16px rgba(160, 45, 24, 0.4);
}

/* 按钮脉动动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .crave-start-container {
    width: 100vw;
  }
}
</style>
