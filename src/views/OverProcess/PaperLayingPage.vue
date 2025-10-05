<template>
  <div class="paper-laying-container">
    <!-- 背景图 -->
    <div class="background-image"></div>

    <!-- 白色纸张底层 -->
    <div class="white-paper"></div>

    <!-- 人物图案 -->
    <img 
      v-if="selectedImage" 
      :src="selectedImage" 
      alt="人物图案" 
      class="puppet-image"
    />

    <!-- 半透明覆盖纸张 -->
    <div 
      class="paper-overlay" 
      :class="{ 'show': showPaper }"
      :style="{ opacity: paperOpacity }"
    >
      <img 
        src="/assets/OverProcess/page2/assets/bf924665-d983-4569-9899-5b94501d77a6.png" 
        alt="覆盖纸张"
        class="overlay-paper-image"
      />
    </div>

    <!-- 毛笔 -->
    <div class="brush-tool">
      <div class="brush-tip"></div>
      <div class="brush-handle"></div>
    </div>

    <!-- 墨水瓶 -->
    <div class="ink-bottle">
      <div class="bottle-outer"></div>
      <div class="bottle-inner"></div>
      <div class="bottle-ink"></div>
      <div class="bottle-highlight-1"></div>
      <div class="bottle-highlight-2"></div>
    </div>

    <!-- 半透明遮罩 -->
    <div class="translucent-overlay"></div>

    <!-- 笔工具 -->
    <div class="pen-tool">
      <div class="pen-body"></div>
      <div class="pen-tip"></div>
      <div class="pen-tip-point"></div>
    </div>

    <!-- 标题"过稿" -->
    <div class="page-title">过稿</div>

    <!-- 英文副标题 -->
    <div class="subtitle-text">Transferring Shadow Puppet Drafts to Leather</div>

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
            src="/assets/OverProcess/page2/assets/616d7a9a-08f5-4d05-97cb-60a11b24156b.png" 
            class="icon-signal" 
            alt="信号"
          />
          <img 
            src="/assets/OverProcess/page2/assets/59e706a4-6096-4efd-bb64-d2443ea45e4f.png" 
            class="icon-wifi" 
            alt="WiFi"
          />
          <img 
            src="/assets/OverProcess/page2/assets/2342c8cd-2007-4a12-9b0c-7ba5b65b68b8.png" 
            class="icon-battery" 
            alt="电量"
          />
        </div>
      </div>
    </div>

    <!-- 操作提示和控制面板 -->
    <div class="control-panel" :class="{ 'show': showControls }">
      <!-- 进度提示 -->
      <div class="progress-hint">
        <div class="hint-text">正在铺纸...</div>
        <div class="progress-indicator">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-percent">{{ Math.floor(progress) }}%</div>
      </div>

      <!-- 操作说明 -->
      <div class="instruction-text" v-if="progress < 100">
        正在铺纸...
      </div>

      <!-- 自动跳转提示 -->
      <div v-if="progress >= 100" class="auto-next-hint">
        <span>铺纸完成，正在进入下一步...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const selectedImage = ref(null);
const showPaper = ref(false);
const paperOpacity = ref(0);
const progress = ref(0);
const showControls = ref(false);

// 定时器
let timeTimer = null;
let progressTimer = null;
let longPressTimer = null;

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

// 铺纸动画（带动画效果）
const animatePaper = () => {
  showPaper.value = true;
  
  progressTimer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2; // 加快速度：每次增加2%
      // 纸张透明度从0到0.9
      paperOpacity.value = (progress.value / 100) * 0.9;
    } else {
      clearInterval(progressTimer);
      // 完成后延迟 1 秒跳转到 Step 3
      setTimeout(() => {
        router.push('/over-process-step3');
      }, 1000);
    }
  }, 30); // 30ms间隔，总时长约1.5秒
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
  
  // 延迟显示控制面板
  setTimeout(() => {
    showControls.value = true;
  }, 300);
  
  // 稍微延迟后开始铺纸动画
  setTimeout(() => {
    animatePaper();
  }, 500);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
  if (progressTimer) clearInterval(progressTimer);
});
</script>

<style scoped>
/* 主容器 */
.paper-laying-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: #E2D5C5;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
}

/* 背景图 */
.background-image {
  position: absolute;
  width: 617px;
  height: 886px;
  left: -179px;
  top: 0px;
  background-image: url('/assets/OverProcess/page2/assets/df1018cf-4dd0-4ae3-b348-3842db50160b.png');
  background-size: cover;
  z-index: 1;
}

/* 白色纸张底层 */
.white-paper {
  position: absolute;
  width: 511.57px;
  height: 575px;
  left: -98px;
  top: 71.34px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: rotate(-13.17deg);
  z-index: 2;
}

/* 人物图案 */
.puppet-image {
  position: absolute;
  width: 321.52px;
  height: 454.74px;
  left: -13px;
  top: 141px;
  object-fit: contain;
  transform: rotate(-15.57deg);
  z-index: 3;
}

/* 覆盖纸张（半透明） */
.paper-overlay {
  position: absolute;
  width: 393px;
  height: 592.40px;
  left: 0;
  top: 138px;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.paper-overlay.show {
  opacity: 0.9;
}

.overlay-paper-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 毛笔 */
.brush-tool {
  position: absolute;
  width: 83.1px;
  height: 307.55px;
  left: 32px;
  top: -28px;
  transform: rotate(-102.03deg);
  z-index: 10;
}

.brush-tip {
  position: absolute;
  width: 18.86px;
  height: 35.5px;
  left: 45.39px;
  top: 91.54px;
  background: linear-gradient(180deg, #291D11 37.02%, #FFFFFF 100%);
  transform: rotate(-102.03deg);
}

.brush-handle {
  position: absolute;
  width: 11.38px;
  height: 279.94px;
  left: 77.21px;
  top: -27.45px;
  background: #C6A268;
  transform: rotate(-115.33deg);
}

/* 墨水瓶 */
.ink-bottle {
  position: absolute;
  width: 153px;
  height: 151px;
  left: 210px;
  top: -16px;
  z-index: 10;
}

.bottle-outer {
  position: absolute;
  width: 153px;
  height: 151px;
  left: 0;
  top: 0;
  background: #888080;
  border-radius: 41px;
}

.bottle-inner {
  position: absolute;
  width: 145.54px;
  height: 143.63px;
  left: 3.73px;
  top: 3.68px;
  background: #433434;
  border-radius: 20px;
}

.bottle-ink {
  position: absolute;
  width: 80.85px;
  height: 82.25px;
  left: 36.07px;
  top: 34.37px;
  background: #302929;
  border-radius: 50%;
}

.bottle-highlight-1 {
  position: absolute;
  width: 9.95px;
  height: 8.59px;
  left: 87.07px;
  top: 128.9px;
  background: #D9D9D9;
  border-radius: 50%;
}

.bottle-highlight-2 {
  position: absolute;
  width: 23.13px;
  height: 4.31px;
  left: 98.27px;
  top: 115.22px;
  background: #D9D9D9;
  border-radius: 2px;
  transform: matrix(0.85, -0.53, 0.54, 0.84, 0, 0);
}

/* 半透明遮罩 */
.translucent-overlay {
  position: absolute;
  left: -38.42%;
  right: -43.26%;
  top: 16.55%;
  bottom: 15.73%;
  background: rgba(220, 197, 168, 0.7);
  box-shadow: 0px 5px 7.7px rgba(0, 0, 0, 0.25);
  z-index: 5;
  pointer-events: none;
}

/* 笔工具 */
.pen-tool {
  position: absolute;
  width: 23.98px;
  height: 232px;
  left: -95px;
  top: 432px;
  transform: rotate(16.13deg);
  z-index: 11;
}

.pen-body {
  position: absolute;
  width: 23.98px;
  height: 209px;
  left: 0;
  top: 22.09px;
  background: #C6A268;
  transform: rotate(16.13deg);
}

.pen-tip {
  position: absolute;
  width: 5.99px;
  height: 18px;
  left: 66.69px;
  top: 7.3px;
  background: #64463F;
  transform: rotate(16.13deg);
}

.pen-tip-point {
  position: absolute;
  width: 5.99px;
  height: 5px;
  left: 71.69px;
  top: 2.5px;
  background: #64463F;
  transform: rotate(16.13deg);
}

/* 标题"过稿" */
.page-title {
  position: absolute;
  width: 50px;
  height: 137px;
  left: 307px;
  top: 52px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 63px;
  color: #A02D18;
  z-index: 50;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

/* 英文副标题 */
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
  color: #64463F;
  transform: rotate(89.84deg);
  transform-origin: left top;
  z-index: 50;
}

/* 状态栏 */
.status-bar {
  position: absolute;
  width: 393px;
  height: 49px;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px 0px 0px;
  box-sizing: border-box;
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

.status-bar-left {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px 0px 16px;
  gap: 10px;
  width: 134.5px;
  height: 22px;
}

.time-display {
  width: 37px;
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

.status-bar-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 124px;
  height: 10px;
}

.status-bar-right {
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
}

.icon-battery {
  width: 27.33px;
  height: 13px;
}

/* 控制面板 */
.control-panel {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.control-panel.show {
  opacity: 1;
}

/* 进度提示 */
.progress-hint {
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hint-text {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 20px;
  color: #64463F;
  text-align: center;
}

.progress-indicator {
  width: 100%;
  height: 10px;
  background: rgba(160, 45, 24, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #A02D18, #C13A26);
  border-radius: 5px;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(160, 45, 24, 0.5);
}

.progress-percent {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 16px;
  color: #A02D18;
  text-align: center;
  font-weight: 600;
}

/* 操作说明 */
.instruction-text {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 18px;
  color: #64463F;
  text-align: center;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

/* 自动跳转提示 */
.auto-next-hint {
  width: 100%;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.auto-next-hint span {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 18px;
  color: rgba(100, 70, 63, 1);
  font-weight: 400;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .paper-laying-container {
    width: 100vw;
  }
}
</style>

