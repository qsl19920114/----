<template>
  <div class="guogao-detail-container">
    <!-- 背景图层1 -->
    <div class="bg-layer-1"></div>
    
    <!-- 背景图层2 -->
    <div class="bg-layer-2"></div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <div class="cellular-connection"></div>
          <div class="wifi"></div>
          <div class="battery">
            <div class="battery-border"></div>
            <div class="battery-cap"></div>
            <div class="battery-capacity"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 竖排标题"过稿" -->
    <div class="page-title">
      <span>过稿</span>
    </div>

    <!-- 返回按钮容器 -->
    <div class="back-button-container">
      <div class="back-arrow-decoration">
        <div class="arrow-left"></div>
        <div class="arrow-right"></div>
      </div>
    </div>

    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack"></div>

    <!-- 可滚动的内容区域 -->
    <div 
      class="content-panel" 
      :class="{ 'expanded': isPanelExpanded }"
      :style="{ transform: `translateY(${panelOffset}px)` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
    >
      <!-- 拖拽指示器 -->
      <div class="drag-indicator"></div>
      
      <!-- 内容背景 -->
      <div class="content-background"></div>
      
      <!-- 内容文字 -->
      <div class="content-text" :class="{ 'visible': isPanelExpanded }">
        <p>图稿誊到皮上叫过稿，也叫落样。把要雕刻的各种图谱纹样，包括脸谱、服饰、道具等图案，放在加工好的透明皮子下面，然后用小钢针把图样照描在皮子上。将刮好的牛皮分解成块，用湿布潮软后，再用特制的推板，稍加油汁逐次推摩，使牛皮更加平展光滑，并能解除皮质的收缩性，然后才能描图样。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const isPanelExpanded = ref(false);
const panelOffset = ref(0);

// 触摸/鼠标相关变量
let startY = 0;
let currentY = 0;
let isDragging = false;
let initialPanelOffset = 0;

// 面板配置
const THRESHOLD = 100; // 触发展开/收起的阈值

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

// 返回上一页
const goBack = () => {
  router.back();
};

// 触摸开始
const handleTouchStart = (e) => {
  if (e.target.closest('.content-text') && isPanelExpanded.value) {
    return;
  }
  startY = e.touches[0].clientY;
  isDragging = true;
  initialPanelOffset = panelOffset.value;
};

// 触摸移动
const handleTouchMove = (e) => {
  if (!isDragging) return;
  
  if (e.target.closest('.content-text') && isPanelExpanded.value) {
    return;
  }
  
  e.preventDefault();
  currentY = e.touches[0].clientY;
  const deltaY = currentY - startY;
  
  let newOffset = initialPanelOffset + deltaY;
  
  if (isPanelExpanded.value) {
    newOffset = Math.max(-500, Math.min(0, newOffset));
  } else {
    newOffset = Math.max(-500, Math.min(50, newOffset));
  }
  
  panelOffset.value = newOffset;
};

// 触摸结束
const handleTouchEnd = () => {
  if (!isDragging) return;
  
  isDragging = false;
  const deltaY = currentY - startY;
  
  if (Math.abs(deltaY) > THRESHOLD) {
    if (deltaY < 0) {
      isPanelExpanded.value = true;
    } else {
      isPanelExpanded.value = false;
    }
  }
  
  panelOffset.value = 0;
  startY = 0;
  currentY = 0;
};

// 鼠标开始（桌面端支持）
const handleMouseDown = (e) => {
  if (e.target.closest('.content-text') && isPanelExpanded.value) {
    return;
  }
  startY = e.clientY;
  isDragging = true;
  initialPanelOffset = panelOffset.value;
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    currentY = e.clientY;
    const deltaY = currentY - startY;
    
    let newOffset = initialPanelOffset + deltaY;
    
    if (isPanelExpanded.value) {
      newOffset = Math.max(-500, Math.min(0, newOffset));
    } else {
      newOffset = Math.max(-500, Math.min(50, newOffset));
    }
    
    panelOffset.value = newOffset;
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    isDragging = false;
    const deltaY = currentY - startY;
    
    if (Math.abs(deltaY) > THRESHOLD) {
      if (deltaY < 0) {
        isPanelExpanded.value = true;
      } else {
        isPanelExpanded.value = false;
      }
    }
    
    panelOffset.value = 0;
    startY = 0;
    currentY = 0;
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* 主容器 */
.guogao-detail-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: #E2D5C5;
  overflow: hidden;
}

/* 背景图层1 */
.bg-layer-1 {
  position: absolute;
  width: 617px;
  height: 886px;
  left: -112px;
  top: 0px;
  background-image: url('/assets/guogao/assets/51dcc582-6090-4a9f-9215-0896e21b9a7a.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 背景图层2 */
.bg-layer-2 {
  position: absolute;
  width: 687px;
  height: 915px;
  left: -208px;
  top: -2px;
  background-image: url('/assets/guogao/assets/ed8b8f4e-dce5-4195-b28f-b0dc46873684.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: 2;
}

/* 竖排标题"过稿" */
.page-title {
  position: absolute;
  width: 50px;
  height: 241px;
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
  z-index: 50;
}

/* 状态栏 */
.status-bar {
  position: absolute;
  width: 393px;
  height: 49px;
  left: 0px;
  top: 0px;
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

.cellular-connection {
  width: 19.2px;
  height: 12.23px;
  background: #000000;
}

.wifi {
  width: 17.14px;
  height: 12.33px;
  background: #000000;
}

.battery {
  position: relative;
  width: 27.33px;
  height: 13px;
}

.battery-border {
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  height: 13px;
  left: 0;
  top: 0;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 4.3px;
}

.battery-cap {
  position: absolute;
  width: 1.33px;
  height: 4px;
  right: 0;
  top: 4.5px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0 2px 2px 0;
}

.battery-capacity {
  position: absolute;
  width: 21px;
  height: 9px;
  left: 2px;
  top: 2px;
  background: #000000;
  border-radius: 2.5px;
}

/* 返回按钮容器 */
.back-button-container {
  position: absolute;
  width: 128.21px;
  height: 185.13px;
  left: 29px;
  top: -113px;
  z-index: 101;
}

/* 返回箭头装饰 */
.back-arrow-decoration {
  position: absolute;
  width: 20.09px;
  height: 29.01px;
  left: 0px;
  top: 156.12px;
}

.arrow-left {
  position: absolute;
  width: 22.25px;
  height: 4.54px;
  left: 0px;
  top: 0px;
  background: #D9D9D9;
  border-radius: 30px;
  transform: rotate(-39.35deg);
}

.arrow-right {
  position: absolute;
  width: 22.25px;
  height: 4.54px;
  left: 0px;
  top: 11.34px;
  background: #D9D9D9;
  border-radius: 30px;
  transform: rotate(39.51deg);
}

/* 返回按钮 */
.back-button {
  position: absolute;
  width: 41px;
  height: 41px;
  left: 21px;
  top: 38px;
  background: rgba(100, 70, 63, 0.4);
  border-radius: 50%;
  cursor: pointer;
  z-index: 102;
  transition: background 0.2s ease;
}

.back-button:hover {
  background: rgba(100, 70, 63, 0.6);
}

/* 内容面板 */
.content-panel {
  position: absolute;
  width: 325px;
  left: 34px;
  top: 473px;
  height: 373px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 60;
  cursor: grab;
  will-change: transform, top;
  overflow: visible;
}

.content-panel:active {
  cursor: grabbing;
}

.content-panel.expanded {
  top: 135px;
  height: 705px;
}

/* 拖拽指示器 */
.drag-indicator {
  position: absolute;
  width: 99px;
  height: 7.8px;
  left: calc(50% - 99px/2);
  top: 7.8px;
  background: #A02D18;
  border-radius: 13px;
  z-index: 65;
  animation: bounce 2s ease-in-out infinite;
  transition: background 0.2s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.content-panel.expanded .drag-indicator {
  animation: none;
}

.content-panel:hover .drag-indicator {
  background: #C03618;
}

/* 内容背景 */
.content-background {
  position: absolute;
  width: 325px;
  height: 601px;
  left: 0;
  top: 0;
  background: #D9D9D9;
  opacity: 0.5;
  border-radius: 48px;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-panel.expanded .content-background {
  height: 705px;
}

/* 内容文字 */
.content-text {
  position: absolute;
  width: 298px;
  height: 663.38px;
  left: calc(50% - 298px/2 + 1.5px);
  top: 41.62px;
  padding: 0 15px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #64463F;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease 0.1s;
  z-index: 64;
}

.content-text.visible {
  opacity: 1;
  pointer-events: auto;
}

.content-text p {
  margin: 0;
  text-indent: 2em;
}

/* 滚动条样式 */
.content-text::-webkit-scrollbar {
  width: 4px;
}

.content-text::-webkit-scrollbar-track {
  background: rgba(100, 70, 63, 0.1);
  border-radius: 2px;
}

.content-text::-webkit-scrollbar-thumb {
  background: rgba(100, 70, 63, 0.3);
  border-radius: 2px;
}

.content-text::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 70, 63, 0.5);
}

/* 响应式适配 */
@media screen and (max-width: 393px) {
  .guogao-detail-container {
    width: 100vw;
  }
  
  .status-bar-frame {
    width: 100vw;
  }
}
</style>

