<template>
  <div class="zhipi-detail-container">
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
          <img src="/assets/zhipi/assets/assets/9f98c0f6-dd71-4e93-87f8-307a5765899f.png" alt="信号" class="icon-signal" />
          <img src="/assets/zhipi/assets/assets/5a33b964-c30d-4b4a-8359-6e6e71eb1e3a.png" alt="WiFi" class="icon-wifi" />
          <img src="/assets/zhipi/assets/assets/124b24cf-bf53-473c-ab26-373d814b965c.png" alt="电量" class="icon-battery" />
        </div>
      </div>
    </div>

    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <img src="/assets/zhipi/assets/assets/bd4e4c30-2c28-4da9-b8b6-30a9ee321d4d.png" alt="返回" class="back-icon" />
    </div>

    <!-- 返回箭头装饰 -->
    <div class="back-arrow-decoration">
      <img src="/assets/zhipi/assets/assets/3f8da683-fc98-4078-8c35-7a1e16659328.png" alt="" class="arrow-icon" />
    </div>

    <!-- 竖排标题"制皮" -->
    <div class="page-title">
      <span>制皮</span>
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
        <p>制皮是制皮影的开始。选皮最好要在春天进行。先将带血的毛皮在清水中浸几天，再将毛皮绑在一木框上，用绳从四周拉平，用特制的刀刮去上面的毛和其他杂物。为了让皮看上去光滑透明，往往需要刮上好几遍。皮准备好后要根据影人头部、颈部、腰部、臂部、脚部软硬厚薄的不同需要来选好背部、腰部或两者结合部的皮料，以备雕刻。</p>
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
const COLLAPSED_HEIGHT = 80; // 收起时的高度
const EXPANDED_HEIGHT = 580; // 展开时的高度
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
    // 如果点击在内容文字区域且已展开，不处理拖拽（允许滚动）
    return;
  }
  startY = e.touches[0].clientY;
  isDragging = true;
  initialPanelOffset = panelOffset.value;
};

// 触摸移动
const handleTouchMove = (e) => {
  if (!isDragging) return;
  
  // 如果在内容区域滚动，不处理面板拖拽
  if (e.target.closest('.content-text') && isPanelExpanded.value) {
    return;
  }
  
  e.preventDefault();
  currentY = e.touches[0].clientY;
  const deltaY = currentY - startY;
  
  // 限制拖拽范围
  let newOffset = initialPanelOffset + deltaY;
  
  if (isPanelExpanded.value) {
    // 展开状态：只允许向下拖（正值）
    newOffset = Math.max(-500, Math.min(0, newOffset));
  } else {
    // 收起状态：只允许向上拖（负值）
    newOffset = Math.max(-500, Math.min(50, newOffset));
  }
  
  panelOffset.value = newOffset;
};

// 触摸结束
const handleTouchEnd = () => {
  if (!isDragging) return;
  
  isDragging = false;
  const deltaY = currentY - startY;
  
  // 根据拖拽距离决定是展开还是收起
  if (Math.abs(deltaY) > THRESHOLD) {
    if (deltaY < 0) {
      // 向上拖拽，展开
      isPanelExpanded.value = true;
    } else {
      // 向下拖拽，收起
      isPanelExpanded.value = false;
    }
  }
  
  // 重置偏移
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
.zhipi-detail-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: #E2D5C5;
  overflow: hidden;
}

/* 背景图层1 - 基础背景 */
.bg-layer-1 {
  position: absolute;
  width: 617px;
  height: 886px;
  left: -112px;
  top: 0px;
  background-image: url('/assets/zhipi/assets/assets/dcf057d3-7e47-431f-aa9b-2eb2b140543b.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 背景图层2 - 装饰叠加层 */
.bg-layer-2 {
  position: absolute;
  width: 658px;
  height: 877px;
  left: -123px;
  top: 0px;
  background-image: url('/assets/zhipi/assets/ed8b8f4e-dce5-4195-b28f-b0dc46873684.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 2;
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
  height: 144.26px;
  left: 29px;
  top: -75px;
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

/* 竖排标题 */
.page-title {
  position: absolute;
  width: 50px;
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
  .zhipi-detail-container {
    width: 100vw;
  }
  
  .status-bar-frame {
    width: 100vw;
  }
}
</style>

