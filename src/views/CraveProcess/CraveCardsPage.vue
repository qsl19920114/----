<template>
  <div class="crave-cards-container">
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

    <!-- 背景图 image 1 -->
    <div class="background-image"></div>

    <!-- 左腿卡片 - 左上 -->
    <div class="card-left-leg" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-left-leg"></div>
      <img src="/assets/CraveProcess/assets/左.png" class="card-image card-image-left-leg" alt="左腿" />
    </div>

    <!-- 头部卡片 - 右上 -->
    <div class="card-head" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-head"></div>
      <img 
        src="/assets/CraveProcess/assets/头.png"
        class="card-image card-image-head" 
        alt="头部" 
      />
    </div>

    <!-- 左手卡片 - 左中 -->
    <div class="card-left-hand" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-left-hand"></div>
      <img src="/assets/CraveProcess/assets/左手.png" class="card-image card-image-left-hand" alt="左手" />
    </div>

    <!-- 躯干卡片 - 右中上 -->
    <div class="card-torso" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-torso"></div>
      <img src="/assets/CraveProcess/assets/躯干.png" class="card-image card-image-torso" alt="躯干" />
    </div>

    <!-- 右腿卡片 - 右中下 -->
    <div class="card-right-leg" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-right-leg"></div>
      <img src="/assets/CraveProcess/assets/右.png" class="card-image card-image-right-leg" alt="右腿" />
    </div>

    <!-- 左大腿卡片 - 左下大 -->
    <div class="card-pelvis" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-pelvis"></div>
      <img src="/assets/CraveProcess/assets/盆骨.png" class="card-image card-image-pelvis" alt="盆骨" />
    </div>

    <!-- 右大腿卡片 - 右下大 -->
    <div class="card-right-hand" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-right-hand"></div>
      <img src="/assets/CraveProcess/assets/右手.png" class="card-image card-image-right-hand" alt="右手" />
    </div>

    <!-- 手臂卡片组 - 左下两个小卡片 -->
    <div class="card-arms" :class="{ 'animate-in': animationStarted }">
      <div class="card-bg card-bg-left-arm-small"></div>
      <div class="card-bg card-bg-right-arm-small"></div>
      <img src="/assets/CraveProcess/assets/左臂.png" class="card-image card-image-left-arm" alt="左臂" />
      <img src="/assets/CraveProcess/assets/右臂.png" class="card-image card-image-right-arm" alt="右臂" />
    </div>

    <!-- 启动按钮 -->
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
const animationStarted = ref(false);

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

// 开始雕刻
const startCarving = () => {
  router.push('/crave-process');
};

onMounted(() => {
  // 获取选中的图片
  const storedImage = sessionStorage.getItem('selectedPuppetImage');
  if (storedImage) {
    selectedImage.value = storedImage;
  }
  
  updateTime();
  timeTimer = setInterval(updateTime, 60000);

  // 延迟启动动画
  setTimeout(() => {
    animationStarted.value = true;
  }, 100);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 13 - 主容器 */
.crave-cards-container {
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

.icon-signal {
  width: 19.2px;
  height: 12.23px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.icon-wifi {
  width: 17.14px;
  height: 12.33px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.icon-battery {
  width: 27.33px;
  height: 13px;
  flex: none;
  order: 2;
  flex-grow: 0;
}

/* image 1 - 背景图 */
.background-image {
  position: absolute;
  width: 617px;
  height: 886px;
  left: calc(50% - 617px/2);
  top: -9px;
  background: url('/assets/CraveProcess/assets/175569bb-3c46-4175-8ed8-9caefa0bee6f.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 卡片通用样式 */
.card-bg {
  position: absolute;
  background: #64463F;
  border-radius: 30px;
  box-shadow: 0 8px 24px rgba(100, 70, 63, 0.3);
}

.card-image {
  position: absolute;
  object-fit: contain;
}

/* 第1行第1列 - 左腿卡片 */
.card-left-leg {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 15px;
  top: 100px;
  z-index: 10;
  opacity: 0;
  transform: translate(-50px, -30px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-left-leg.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.1s;
}

.card-bg-left-leg {
  width: 120px;
  height: 120px;
  left: 30px;
  top: 35px;
}

.card-image-left-leg {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(-1deg);
}

/* 第1行第2列 - 头部卡片 */
.card-head {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 198px;
  top: 100px;
  z-index: 11;
  opacity: 0;
  transform: translate(50px, -30px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-head.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.2s;
}

.card-bg-head {
  width: 140px;
  height: 80px;
  left: 20px;
  top: 15px;
}

.card-image-head {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(0deg);
}

/* 第2行第1列 - 左手卡片 */
.card-left-hand {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 15px;
  top: 270px;
  z-index: 13;
  opacity: 0;
  transform: translate(-50px, 0) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-left-hand.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.3s;
}

.card-bg-left-hand {
  width: 120px;
  height: 100px;
  left: 30px;
  top: 50px;
}

.card-image-left-hand {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(5deg);
}

/* 第2行第2列 - 躯干卡片 */
.card-torso {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 198px;
  top: 270px;
  z-index: 12;
  opacity: 0;
  transform: translate(50px, 0) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-torso.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.4s;
}

.card-bg-torso {
  width: 130px;
  height: 95px;
  left: 25px;
  top: 55px;
}

.card-image-torso {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(-1.5deg);
}

/* 第3行第1列 - 盆骨卡片 */
.card-pelvis {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 15px;
  top: 440px;
  z-index: 16;
  opacity: 0;
  transform: translate(-50px, 20px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-pelvis.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.5s;
}

.card-bg-pelvis {
  width: 130px;
  height: 60px;
  left: 25px;
  top: 90px;
}

.card-image-pelvis {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(2deg);
}

/* 第3行第2列 - 右腿卡片 */
.card-right-leg {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 198px;
  top: 440px;
  z-index: 15;
  opacity: 0;
  transform: translate(50px, 20px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-right-leg.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.6s;
}

.card-bg-right-leg {
  width: 130px;
  height: 110px;
  left: 25px;
  top: 40px;
}

.card-image-right-leg {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(-3deg);
}

/* 第4行第1列 - 左臂卡片 */
.card-arms {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 15px;
  top: 610px;
  z-index: 17;
  opacity: 0;
  transform: translate(-50px, 30px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-arms.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.7s;
}

.card-bg-left-arm-small {
  width: 110px;
  height: 120px;
  left: 35px;
  top: 30px;
}

.card-bg-right-arm-small {
  display: none;
}

.card-image-left-arm {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(5deg);
}

.card-image-right-arm {
  display: none;
}

/* 第4行第2列 - 右手卡片 */
.card-right-hand {
  position: absolute;
  width: 180px;
  height: 160px;
  left: 198px;
  top: 610px;
  z-index: 14;
  opacity: 0;
  transform: translate(50px, 30px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-right-hand.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  transition-delay: 0.8s;
}

.card-bg-right-hand {
  width: 90px;
  height: 100px;
  left: 45px;
  top: 15px;
}

.card-image-right-hand {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  transform: rotate(-5deg);
}

/* Component 1 - 启动按钮 */
.start-button-component {
  position: absolute;
  width: 56px;
  height: 56px;
  left: 292px;
  top: 785px;
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
  .crave-cards-container {
    width: 100vw;
  }
}
</style>
