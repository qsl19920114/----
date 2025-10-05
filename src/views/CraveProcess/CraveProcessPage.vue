<template>
  <div class="crave-process-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <!-- 装饰图标 -->
      <img 
        src="/assets/CraveProcess/process/assets/7df927ce-dd75-4b77-b977-5ac928522b18.png" 
        class="decoration-icon" 
        alt="装饰"
      />
      
      <div class="status-bar-frame">
        <div class="status-bar-left">
          <div class="time-display">
            <span class="time-text">{{ currentTime }}</span>
          </div>
        </div>
        <div class="status-bar-center"></div>
        <div class="status-bar-right">
          <img 
            src="/assets/CraveProcess/process/assets/a9ede0ec-a724-425a-9f76-25b3693cb6ba.png" 
            class="icon-signal" 
            alt="信号"
          />
          <img 
            src="/assets/CraveProcess/process/assets/f842d4df-4f27-4073-a17f-94cb1b7e19b1.png" 
            class="icon-wifi" 
            alt="WiFi"
          />
          <img 
            src="/assets/CraveProcess/process/assets/e77588ec-1b52-4079-be21-8f752b06112b.png" 
            class="icon-battery" 
            alt="电量"
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 内容框 -->
      <div class="content-frame">
        <!-- 人物图层 -->
        <div class="puppet-container">
          <img 
            v-if="selectedImage" 
            :src="selectedImage" 
            alt="人物图案" 
            class="puppet-image"
          />
          
          <!-- 雕刻刀 -->
          <img 
            src="/assets/CraveProcess/process/assets/62a2fa8e-34bc-4de0-8522-98174fc0774b.png" 
            alt="雕刻刀" 
            class="carving-knife"
            :class="{ 'carving': isCarving }"
            :style="{ left: knifeX + 'px', top: knifeY + 'px' }"
            @mousedown="startDragging"
            @touchstart="startDragging"
          />
          
          <!-- 雕刻痕迹画布 -->
          <canvas 
            ref="carvingCanvas" 
            class="carving-canvas"
            :width="389.34"
            :height="556.43"
          ></canvas>
          
          <!-- 英文副标题 -->
          <div class="subtitle-text">Carving Shadow Puppets</div>
        </div>

        <!-- 提示文字 -->
        <div class="hint-text">
          <img 
            src="/assets/CraveProcess/process/assets/db051067-4ace-48f0-bf88-9f4a65100ab4.png" 
            alt="图标" 
            class="hint-icon"
          />
          <span class="hint-label">向右拖动刻刀</span>
        </div>
      </div>

      <!-- 标题"雕刻" -->
      <div class="page-title">雕刻</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const selectedImage = ref(null);
const isCarving = ref(false);
const carvingCanvas = ref(null);

// 刀具位置
const knifeX = ref(41.34);
const knifeY = ref(437);

// 拖拽状态
let isDragging = false;
let dragStartTime = 0;
let carvingTime = 0;
const CARVING_DURATION = 5000; // 5秒雕刻时间

// 画布上下文
let ctx = null;

// 定时器
let timeTimer = null;
let carvingTimer = null;

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

// 开始拖拽
const startDragging = (e) => {
  e.preventDefault();
  isDragging = true;
  isCarving.value = true;
  dragStartTime = Date.now();
  
  // 初始化画布上下文
  if (!ctx && carvingCanvas.value) {
    ctx = carvingCanvas.value.getContext('2d');
    ctx.strokeStyle = 'rgba(160, 45, 24, 0.3)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  
  // 开始记录雕刻时间
  if (!carvingTimer) {
    carvingTimer = setInterval(() => {
      if (isDragging) {
        carvingTime += 100;
        if (carvingTime >= CARVING_DURATION) {
          finishCarving();
        }
      }
    }, 100);
  }
  
  // 添加移动和结束事件监听
  if (e.type === 'mousedown') {
    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('mouseup', stopDragging);
  } else {
    document.addEventListener('touchmove', handleDragging, { passive: false });
    document.addEventListener('touchend', stopDragging);
  }
};

// 处理拖拽
const handleDragging = (e) => {
  if (!isDragging) return;
  
  e.preventDefault();
  
  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
  
  // 获取容器位置
  const container = document.querySelector('.puppet-container');
  if (!container) return;
  
  const rect = container.getBoundingClientRect();
  
  // 计算相对位置
  let newX = clientX - rect.left - 30; // 减去刀具宽度的一半
  let newY = clientY - rect.top - 100; // 减去刀具高度的一半
  
  // 限制在容器范围内
  newX = Math.max(0, Math.min(newX, 389.34 - 60.84));
  newY = Math.max(0, Math.min(newY, 638.06 - 201.06));
  
  // 绘制雕刻痕迹
  if (ctx && carvingCanvas.value) {
    const prevX = knifeX.value + 30;
    const prevY = knifeY.value - 34.17 + 100;
    const currX = newX + 30;
    const currY = newY - 34.17 + 100;
    
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }
  
  knifeX.value = newX;
  knifeY.value = newY;
};

// 停止拖拽
const stopDragging = () => {
  if (!isDragging) return;
  
  isDragging = false;
  isCarving.value = false;
  
  // 移除事件监听
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('touchmove', handleDragging);
  document.removeEventListener('touchend', stopDragging);
};

// 完成雕刻
const finishCarving = () => {
  if (carvingTimer) {
    clearInterval(carvingTimer);
    carvingTimer = null;
  }
  
  stopDragging();
  
  // 跳转到雕刻加载页面（复用通用加载页面）
  router.push('/crave-loading');
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
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
  if (carvingTimer) clearInterval(carvingTimer);
  
  // 清理事件监听
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('touchmove', handleDragging);
  document.removeEventListener('touchend', stopDragging);
});
</script>

<style scoped>
/* 主容器 */
.crave-process-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(100, 70, 63, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 状态栏 */
.status-bar {
  position: relative;
  width: 393px;
  height: 49px;
  z-index: 100;
}

/* 装饰图标 */
.decoration-icon {
  position: absolute;
  width: 95px;
  height: 32.89px;
  top: 0;
  left: 298px;
  z-index: 1;
}

.status-bar-frame {
  position: absolute;
  width: 393px;
  height: 49px;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
  z-index: 2;
}

.status-bar-frame {
  width: 393px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.status-bar-left {
  width: 134.5px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px 0px 16px;
  box-sizing: border-box;
}

.time-display {
  width: 37px;
  height: 22px;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  white-space: nowrap;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
  font-weight: 590;
}

.status-bar-center {
  width: 124px;
  min-height: 10px;
  height: 10px;
}

.status-bar-right {
  width: 134.5px;
  height: 13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 6px;
  gap: 7px;
  box-sizing: border-box;
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
}

.icon-battery {
  width: 27.33px;
  height: 13px;
}

/* 主内容区域 */
.main-content {
  position: relative;
  width: 393px;
  height: 708.7px;
  margin-top: 14px;
  z-index: 2;
}

/* 内容框 */
.content-frame {
  position: absolute;
  top: 2.3px;
  left: 0;
  width: 393px;
  height: 706.4px;
  background-image: url('/assets/CraveProcess/process/assets/9b6f113a-a56f-40d7-a6d4-234113efad4e.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 人物容器 */
.puppet-container {
  position: relative;
  width: 389.34px;
  height: 638.06px;
  margin-top: 6.7px;
  margin-left: 3.66px;
}

/* 人物图片 */
.puppet-image {
  position: absolute;
  width: 389.34px;
  height: 556.43px;
  top: 34.17px;
  left: 0;
  object-fit: contain;
  z-index: 1;
}

/* 雕刻画布 */
.carving-canvas {
  position: absolute;
  width: 389.34px;
  height: 556.43px;
  top: 34.17px;
  left: 0;
  z-index: 5;
  pointer-events: none;
}

/* 雕刻刀 */
.carving-knife {
  position: absolute;
  width: 60.84px;
  height: 201.06px;
  top: 437px;
  left: 41.34px;
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  animation: float 2s ease-in-out infinite;
}

.carving-knife:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 6px 16px rgba(255, 255, 255, 0.4));
}

.carving-knife.carving {
  animation: carving 0.3s ease-in-out 6;
}

/* 刀子漂浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 雕刻动画 */
@keyframes carving {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-5px) rotate(-5deg);
  }
  75% {
    transform: translateX(5px) rotate(5deg);
  }
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 0;
  left: 371.34px;
  width: 189px;
  height: 489.53px;
  transform: rotate(89.84deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 2;
}

/* 提示文字 */
.hint-text {
  width: 180px;
  height: 26px;
  margin-top: 14.94px;
  margin-left: 54px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.hint-icon {
  width: 17px;
  height: 17px;
  margin-top: 4px;
}

.hint-label {
  margin-left: 7px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  white-space: nowrap;
  flex-shrink: 0;
}

/* 标题"雕刻" */
.page-title {
  position: absolute;
  top: 0;
  left: 313px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 10;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .crave-process-container {
    width: 100vw;
  }
}
</style>

