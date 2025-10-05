<template>
  <div class="fucai-detail-container">
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
          <img src="/assets/fucai/assets/assets/6693318a-8337-40a5-823a-0806522cb0a4.png" alt="信号" class="icon-signal" />
          <img src="/assets/fucai/assets/assets/b587cbe9-d62f-4a64-be94-d6874fe6f80b.png" alt="WiFi" class="icon-wifi" />
          <img src="/assets/fucai/assets/assets/06c8b97a-25a5-4583-af64-6f6f33cf8716.png" alt="电量" class="icon-battery" />
        </div>
      </div>
    </div>

    <!-- 竖排标题"敷彩" -->
    <div class="page-title">
      <span>敷彩</span>
    </div>

    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <img src="/assets/fucai/assets/assets/cf671b2c-6009-4a13-bd73-a0687bb35e29.png" alt="返回" class="back-icon" />
    </div>

    <!-- 返回箭头装饰 -->
    <div class="back-arrow-decoration">
      <img src="/assets/fucai/assets/assets/2ac4d250-daa1-4df3-9cc6-077624d67d1d.png" alt="" class="arrow-icon" />
    </div>

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
        <p>刻好之后要上色。根据兽皮的特点，收集相应的化学颜料，成分与剂量做到心中有底。炮制的方法是首先把制好的纯色化入稍大的容器内，再放进几块用精皮熬制的透明皮胶，然后把容器放在特制的灯架上，下边点燃酒精灯火，使之与胶色一起溶成粥状，趁热敷到影人上。上了色的皮经过再次处理，让色彩深入皮内，再刷上桐油，才算完成。</p>
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
.fucai-detail-container {
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
  background-image: url('/assets/fucai/assets/assets/f62cfffa-699a-4ab6-bcd9-7b23cea4ad39.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 背景图层2 */
.bg-layer-2 {
  position: absolute;
  width: 694px;
  height: 925px;
  left: -188px;
  top: -20px;
  background-image: url('/assets/fucai/assets/assets/e216639f-6df2-43fc-b947-4517434c8148.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: 2;
}

/* 竖排标题"敷彩" */
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

/* 返回箭头装饰 */
.back-arrow-decoration {
  position: absolute;
  width: 128.21px;
  height: 72.13px;
  left: 29px;
  top: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  z-index: 101;
}

.arrow-icon {
  width: 20.09px;
  height: 29.01px;
}

/* 返回按钮 */
.back-button {
  position: absolute;
  width: 41px;
  height: 41px;
  left: 21px;
  top: 38px;
  cursor: pointer;
  z-index: 102;
  transition: opacity 0.2s ease;
}

.back-button:hover {
  opacity: 0.8;
}

.back-icon {
  width: 41px;
  height: 41px;
}

/* 内容面板 */
.content-panel {
  position: absolute;
  width: 325px;
  left: 42px;
  top: 416px;
  height: 626px;
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
  top: 409px;
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
  top: 7.8px;
}

.content-panel:hover .drag-indicator {
  background: #C03618;
}

/* 内容背景 */
.content-background {
  position: absolute;
  width: 325px;
  height: 397px;
  left: 0;
  top: 229px;
  background: #D9D9D9;
  opacity: 0.5;
  border-radius: 48px;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-panel.expanded .content-background {
  top: 0;
  height: 705px;
}

/* 内容文字 */
.content-text {
  position: absolute;
  width: 292px;
  height: 565px;
  left: calc(50% - 292px/2 - 5.5px);
  top: 290px;
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
  transition: opacity 0.3s ease 0.1s, top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 64;
}

.content-text.visible {
  opacity: 1;
  pointer-events: auto;
  top: 61px;
}

.content-text p {
  margin: 0 0 10px 0;
  text-indent: 2em;
}

.content-text p:last-child {
  margin-bottom: 0;
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
  .fucai-detail-container {
    width: 100vw;
  }
  
  .status-bar-frame {
    width: 100vw;
  }
}
</style>

