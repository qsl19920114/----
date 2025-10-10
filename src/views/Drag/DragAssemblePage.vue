<template>
  <div class="drag-assemble-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/Drag/assets/d1dcd1be-b113-4547-b395-a10a98a56c54.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/Drag/assets/a7793dac-b4ec-4078-9b9f-037464ba68fe.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/Drag/assets/a9b7c64e-a886-4da2-b466-9c407ef02834.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 背景图片 -->
      <img 
        src="/assets/Drag/assets/1bbc36f7-0132-4b69-8a2a-2c38a27917fc.png" 
        alt="背景" 
        class="background-image"
      />

      <!-- 左侧部件列表 - 第一列 -->
      <div class="parts-column-left">
        <div 
          v-for="(part, index) in leftColumnParts" 
          :key="`left-${index}`"
          class="part-slot"
          :class="{ 'part-placed': part.placed }"
        >
          <img 
            v-if="!part.placed"
            :src="part.image" 
            :alt="part.name"
            class="draggable-part"
            :class="{ 'dragging': part.dragging }"
            draggable="true"
            @dragstart="handleDragStart($event, part, index, 'left')"
            @dragend="handleDragEnd($event, part)"
            @touchstart="handleTouchStart($event, part, index, 'left')"
            @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event)"
          />
        </div>
      </div>

      <!-- 左侧部件列表 - 第二列 -->
      <div class="parts-column-right">
        <div 
          v-for="(part, index) in rightColumnParts" 
          :key="`right-${index}`"
          class="part-slot"
          :class="{ 'part-placed': part.placed }"
        >
          <img 
            v-if="!part.placed"
            :src="part.image" 
            :alt="part.name"
            class="draggable-part"
            :class="{ 'dragging': part.dragging }"
            draggable="true"
            @dragstart="handleDragStart($event, part, index, 'right')"
            @dragend="handleDragEnd($event, part)"
            @touchstart="handleTouchStart($event, part, index, 'right')"
            @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event)"
          />
        </div>
      </div>

      <!-- 拖放目标区域 -->
      <div 
        class="drop-zone"
        @drop="handleDrop"
        @dragover.prevent
        @dragenter.prevent
      >
        <!-- 半透明参考图 -->
        <img 
          src="/assets/Drag/assets/c015d4f2-12cf-4be6-aa01-dc8172e169f3.png" 
          alt="参考图" 
          class="reference-image"
        />

        <!-- 已放置的部件 -->
        <div 
          v-for="(placedPart, index) in placedParts" 
          :key="`placed-${index}`"
          class="placed-part"
          :style="placedPart.style"
        >
          <img 
            :src="placedPart.image" 
            :alt="placedPart.name"
            class="placed-part-image"
          />
        </div>
        
        <!-- 完成时的整体造型高亮效果 -->
        <div 
          v-if="isAllPartsPlaced" 
          class="complete-shape-overlay"
        >
          <div class="completion-glow"></div>
          <div class="completion-text">拼装完成！</div>
        </div>
      </div>

      <!-- 提示文字 -->
      <div class="hint-text-container">
        <div class="hint-text">拖动碎片到整体</div>
        <div class="hint-indicator"></div>
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
let touchedPart = null;
let touchOffset = { x: 0, y: 0 };

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

// 左侧第一列部件
const leftColumnParts = ref([
  { 
    name: '头部', 
    image: '/assets/Drag/assets/5b6f8f27-b5f0-4a4c-8a89-69d0e5fc6a44.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '左腿', 
    image: '/assets/Drag/assets/5c001640-3641-4f1a-a96c-3f6925eefd54.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '躯干', 
    image: '/assets/Drag/assets/dd05c32f-4bf7-44d1-8b36-95d73eac7ca7.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '左手', 
    image: '/assets/Drag/assets/fafb337e-68df-4cb8-beee-1bad33dd4d2a.png', 
    placed: false, 
    dragging: false
  },
]);

// 右侧第二列部件
const rightColumnParts = ref([
  { 
    name: '右臂', 
    image: '/assets/Drag/assets/603ccd2f-1c37-42ff-a5cd-a1d877b5fce4.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '右腿', 
    image: '/assets/Drag/assets/649d3f64-6996-4442-99ce-41b7ec366da5.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '盆骨', 
    image: '/assets/Drag/assets/00635eda-6e9c-440d-943d-946f7a975d5b.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '左臂', 
    image: '/assets/Drag/assets/cb85916f-36d4-4d25-8e9e-ed54bba32854.png', 
    placed: false, 
    dragging: false
  },
  { 
    name: '右手', 
    image: '/assets/Drag/assets/469fb73d-9e49-42c3-8b64-ec8460411f98.png', 
    placed: false, 
    dragging: false
  },
]);

// 已放置的部件
const placedParts = ref([]);

// 拖拽开始 - 添加悬浮特效
const handleDragStart = (event, part, index, column) => {
  part.dragging = true;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('partData', JSON.stringify({ 
    part, 
    index, 
    column 
  }));
  
  // 添加拖拽中的样式类到容器
  const container = document.querySelector('.drag-assemble-container');
  container.classList.add('dragging-active');
  
  console.log('🖱️ 鼠标拖拽开始:', part.name);
};

// 拖拽结束 - 移除悬浮特效
const handleDragEnd = (event, part) => {
  part.dragging = false;
  
  // 移除拖拽样式类
  const container = document.querySelector('.drag-assemble-container');
  container.classList.remove('dragging-active');
  
  console.log('🖱️ 鼠标拖拽结束:', part.name);
};

// 触摸开始 - 添加悬浮特效
const handleTouchStart = (event, part, index, column) => {
  event.preventDefault(); // 防止页面滚动
  touchedPart = { part, index, column };
  const touch = event.touches[0];
  const rect = event.target.getBoundingClientRect();
  touchOffset.x = touch.clientX - rect.left;
  touchOffset.y = touch.clientY - rect.top;
  part.dragging = true;
  
  // 添加拖拽中的样式类
  const container = document.querySelector('.drag-assemble-container');
  container.classList.add('dragging-active');
  
  console.log('👆 触摸拖拽开始:', part.name);
};

// 触摸移动
const handleTouchMove = (event) => {
  event.preventDefault(); // 防止页面滚动
};

// 触摸结束 - 检测是否在参考图范围内，直接跳转
const handleTouchEnd = (event) => {
  if (!touchedPart) return;
  
  const touch = event.changedTouches[0];
  const referenceImage = document.querySelector('.reference-image');
  const refRect = referenceImage.getBoundingClientRect();
  
  // 移除拖拽样式类
  const container = document.querySelector('.drag-assemble-container');
  container.classList.remove('dragging-active');
  
  console.log('👆 触摸结束位置:', { 
    x: touch.clientX, 
    y: touch.clientY,
    refRect: {
      left: refRect.left,
      right: refRect.right,
      top: refRect.top,
      bottom: refRect.bottom
    }
  });
  
  // 检查是否在参考图范围内
  if (
    touch.clientX >= refRect.left &&
    touch.clientX <= refRect.right &&
    touch.clientY >= refRect.top &&
    touch.clientY <= refRect.bottom
  ) {
    console.log('✅ 触摸命中参考图区域，准备跳转');
    jumpToComplete(touchedPart);
  } else {
    console.log('❌ 触摸未命中参考图区域');
    // 如果没放在范围内，恢复拖拽状态
    touchedPart.part.dragging = false;
  }
  
  touchedPart = null;
};

// 放置处理 - 检测是否在参考图范围内，直接跳转
const handleDrop = (event) => {
  event.preventDefault();
  
  // 移除拖拽样式类
  const container = document.querySelector('.drag-assemble-container');
  container.classList.remove('dragging-active');
  
  const data = JSON.parse(event.dataTransfer.getData('partData'));
  
  // 获取参考图的位置
  const referenceImage = document.querySelector('.reference-image');
  const refRect = referenceImage.getBoundingClientRect();
  
  console.log('🖱️ 鼠标放置位置:', { 
    x: event.clientX, 
    y: event.clientY,
    refRect: {
      left: refRect.left,
      right: refRect.right,
      top: refRect.top,
      bottom: refRect.bottom
    }
  });
  
  // 检查鼠标位置是否在参考图范围内
  if (
    event.clientX >= refRect.left &&
    event.clientX <= refRect.right &&
    event.clientY >= refRect.top &&
    event.clientY <= refRect.bottom
  ) {
    console.log('✅ 鼠标命中参考图区域，准备跳转');
    jumpToComplete(data);
  } else {
    console.log('❌ 鼠标未命中参考图区域');
    // 如果没放在范围内，恢复拖拽状态
    data.part.dragging = false;
  }
};

// 直接跳转到完成页面的函数
const jumpToComplete = (data) => {
  const { part } = data;
  
  console.log('🚀 开始跳转流程:', part.name);
  
  // 标记为已放置（虽然我们直接跳转，但保持数据一致性）
  part.placed = true;
  
  // 显示简短的放置效果
  const randomX = Math.random() * 200 + 50;
  const randomY = Math.random() * 300 + 50;
  
  placedParts.value.push({
    name: part.name,
    image: part.image,
    style: {
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transform: 'translate(-50%, -50%)',
      opacity: 1,
      zIndex: 10
    }
  });
  
  // 立即跳转到完成页面
  console.log('📱 执行页面跳转到 /drag-complete');
  setTimeout(() => {
    router.push('/drag-complete');
  }, 200); // 极短延迟以确保用户看到放置效果
};

// 检查所有部件是否都已放置
const checkAllPartsPlaced = () => {
  const allLeftPlaced = leftColumnParts.value.every(part => part.placed);
  const allRightPlaced = rightColumnParts.value.every(part => part.placed);
  
  if (allLeftPlaced && allRightPlaced) {
    // 所有部件都已放置，更新状态并显示完整造型
    isAllPartsPlaced.value = true;
    showCompleteShape();
  }
};

// 显示完整造型
const showCompleteShape = () => {
  // 添加完整造型显示的动画效果
  const completeShape = document.querySelector('.reference-image');
  if (completeShape) {
    completeShape.style.opacity = '1';
    completeShape.style.filter = 'brightness(1.2)';
    completeShape.style.transform = 'scale(1.05)';
    completeShape.style.transition = 'all 0.5s ease-in-out';
  }
  
  // 延迟1.5秒后跳转到完成页面，让用户欣赏完整造型
  setTimeout(() => {
    router.push('/drag-complete');
  }, 1500);
};

// 检查是否所有部件都已放置
const isAllPartsPlaced = ref(false);

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  
  // 环境检测和调试信息
  console.log('🔧 页面加载完成，环境检测:');
  console.log('- 是否支持触摸:', 'ontouchstart' in window);
  console.log('- 用户代理:', navigator.userAgent);
  console.log('- 屏幕尺寸:', window.screen.width + 'x' + window.screen.height);
  
  // 检查元素层级
  setTimeout(() => {
    const dropZone = document.querySelector('.drop-zone');
    const referenceImage = document.querySelector('.reference-image');
    if (dropZone && referenceImage) {
      const dropRect = dropZone.getBoundingClientRect();
      const refRect = referenceImage.getBoundingClientRect();
      console.log('📐 元素位置信息:');
      console.log('- 拖放区域:', dropRect);
      console.log('- 参考图区域:', refRect);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 主容器 */
.drag-assemble-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: #F3EEEE;
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
  height: 852px;
}

/* 背景图片 */
.background-image {
  position: absolute;
  width: 500px;
  height: 980px;

  top: -12px;
  z-index: 1;
}

/* 左侧第一列部件 */
.parts-column-left {
  position: absolute;
  width: 71px;
  height: 314px;
  left: 32px;
  top: 71px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 右侧第二列部件 */
.parts-column-right {
  position: absolute;
  width: 71px;
  height: 395px;
  left: 32px;
  top: 392px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 部件插槽 */
.part-slot {
  width: 71px;
  height: 71px;
  background: #D9D9D9;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 拖拽激活时插槽效果 */
.dragging-active .part-slot:not(.part-placed) {
  background: linear-gradient(135deg, #E5E5E5 0%, #D9D9D9 100%);
  box-shadow: 0 4px 12px rgba(160, 45, 24, 0.2),
              inset 0 0 15px rgba(255, 200, 100, 0.3);
  animation: slotPulse 1s ease-in-out infinite;
}

.part-slot.part-placed {
  background: rgba(217, 217, 217, 0.3);
  border: 2px dashed #999;
  animation: fadeOut 0.5s ease-out;
}

/* 插槽脉冲动画 */
@keyframes slotPulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(160, 45, 24, 0.2),
                inset 0 0 15px rgba(255, 200, 100, 0.3);
  }
  50% {
    box-shadow: 0 6px 16px rgba(160, 45, 24, 0.4),
                inset 0 0 25px rgba(255, 200, 100, 0.5);
  }
}

/* 淡出动画 */
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

/* 可拖拽部件 */
.draggable-part {
  width: 90%;
  height: 90%;
  object-fit: contain;
  cursor: grab;
  transition: all 0.3s ease;
  animation: partFloat 3s ease-in-out infinite;
}

.draggable-part:active {
  cursor: grabbing;
}

/* 拖拽时的悬浮特效 */
.draggable-part.dragging {
  opacity: 0.7;
  transform: scale(1.3) rotate(5deg);
  filter: drop-shadow(0 8px 20px rgba(160, 45, 24, 0.6)) 
          drop-shadow(0 0 30px rgba(255, 200, 100, 0.8));
  animation: floatDragging 0.5s ease-in-out infinite alternate;
  z-index: 1000;
}

.draggable-part:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 4px 8px rgba(160, 45, 24, 0.3));
}

/* 拖拽中的悬浮动画 */
@keyframes floatDragging {
  0% {
    transform: scale(1.3) rotate(5deg) translateY(0);
  }
  100% {
    transform: scale(1.35) rotate(-3deg) translateY(-5px);
  }
}

/* 拖放目标区域 */
.drop-zone {
  position: absolute;
  width: 114px;
  height: 774px;
  left: 13px;
  top: 42px;
  background: transparent;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

/* 拖拽激活时目标区域效果 */
.dragging-active .drop-zone {
  background: radial-gradient(
    circle at center,
    rgba(160, 45, 24, 0.05) 0%,
    rgba(255, 200, 100, 0.1) 50%,
    transparent 100%
  );
  animation: zoneExpand 1.5s ease-in-out infinite;
}

/* 增强拖放区域的视觉提示 */


/* 跳入动画 */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 区域扩展动画 */
@keyframes zoneExpand {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* 参考图 */
.reference-image {
  position: absolute;
  width: 270.5px;
  height: 400.5px;
  left: 120px;
  opacity: 0.49;
  pointer-events: auto !important;
  z-index: 3;
  transition: all 0.4s ease;
}

/* 拖拽激活时参考图高亮 */
.dragging-active .reference-image {
  opacity: 0.9;
  filter: drop-shadow(0 0 25px rgba(160, 45, 24, 0.8))
          drop-shadow(0 0 50px rgba(255, 200, 100, 0.6));
  animation: pulseGlow 0.8s ease-in-out infinite;
 
}

/* 发光脉冲动画 */
@keyframes pulseGlow {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(160, 45, 24, 0.6))
            drop-shadow(0 0 40px rgba(255, 200, 100, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(160, 45, 24, 0.8))
            drop-shadow(0 0 60px rgba(255, 200, 100, 0.6));
  }
}

/* 已放置的部件 */
.placed-part {
  position: absolute;
  width: 150px;
  height: 150px;
  z-index: 4;
  animation: placePart 0.5s ease-out;
}

.placed-part-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

/* 提示文字容器 */
.hint-text-container {
  position: absolute;
  width: 140px;
  height: 26px;
  left: calc(50% - 140px/2 + 93.5px);
  top: 726px;
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: hintPulse 2s ease-in-out infinite;
}

.hint-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #64463F;
  white-space: nowrap;
}

.hint-indicator {
  width: 17px;
  height: 17px;
  background: #A02D18;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

/* 完成时的整体造型高亮效果 */
.complete-shape-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  pointer-events: none;
  animation: completeAppear 0.8s ease-out;
}

.completion-glow {
  position: absolute;
  width: 270.5px;
  height: 400.5px;
  left: 120px;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 215, 0, 0.3) 0%,
    rgba(255, 165, 0, 0.2) 30%,
    rgba(160, 45, 24, 0.1) 60%,
    transparent 100%
  );
  border-radius: 20px;
  animation: completionPulse 2s ease-in-out infinite;
}

.completion-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 28px;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 165, 0, 0.6),
    2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: textGlow 1.5s ease-in-out infinite alternate;
}

/* 完成出现动画 */
@keyframes completeAppear {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 完成脉冲动画 */
@keyframes completionPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

/* 文字发光动画 */
@keyframes textGlow {
  0% {
    text-shadow: 
      0 0 10px rgba(255, 215, 0, 0.8),
      0 0 20px rgba(255, 165, 0, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  100% {
    text-shadow: 
      0 0 20px rgba(255, 215, 0, 1),
      0 0 30px rgba(255, 165, 0, 0.8),
      0 0 40px rgba(255, 140, 0, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.3);
  }
}

.complete-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(160, 45, 24, 0.6);
}

.complete-button:active {
  transform: translateY(0);
}

/* ========== 动画定义 ========== */

/* 部件漂浮动画 */
@keyframes partFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* 放置动画 */
@keyframes placePart {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* 提示脉冲动画 */
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

/* 指示器脉冲 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

/* 拖拽激活时的全局效果 */
.dragging-active {
  cursor: grabbing !important;
}

.dragging-active * {
  cursor: grabbing !important;
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .draggable-part {
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  
  .draggable-part:active {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 确保参考图区域可以正确接收事件 */
.drop-zone {
  pointer-events: auto !important;
}

/* 淡入动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .drag-assemble-container {
    width: 100vw;
  }
}
</style>

