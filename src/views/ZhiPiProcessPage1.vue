<template>
  <div class="zhipi-process-container">
    <div class="zhipi-process-wrapper">
      <!-- 状态栏 -->
      <div class="status-bar">
        <div class="status-bar-content">
          <div class="status-bar-inner">
            <!-- 时间 -->
            <div class="time-display">
              <div class="time-text">{{ currentTime }}</div>
            </div>
            
            <!-- 占位空间 -->
            <div class="spacer"></div>
            
            <!-- 状态图标 -->
            <div class="status-icons">
              <div class="icon-group">
                <img src="/assets/zhipi-process/page1/assets/858f83a7-6aff-4c11-8546-cda795dd8365.png" class="icon-signal" alt="信号" />
                <img src="/assets/zhipi-process/page1/assets/49058d8d-9a9a-452b-a03e-9854e125dafb.png" class="icon-wifi" alt="WiFi" />
                <img src="/assets/zhipi-process/page1/assets/571df4b8-1901-4cf4-abf0-9cf663ddba10.png" class="icon-battery" alt="电量" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="main-content">
        <!-- 背景牛皮 -->
        <img src="/assets/zhipi-process/page1/assets/d03cef0b-9bad-48df-9093-b1b642c87013.png" class="bg-leather" alt="背景" />
        
        <!-- 可交互的脏牛皮层 - 使用canvas实现刮除效果 -->
        <canvas 
          ref="scratchCanvas"
          class="scratch-canvas"
          @mousedown="startScratch"
          @mousemove="scratch"
          @mouseup="stopScratch"
          @mouseleave="stopScratch"
          @touchstart="startScratchTouch"
          @touchmove="scratchTouch"
          @touchend="stopScratch"
        ></canvas>

        <!-- 标题 -->
        <div class="title-text">制皮</div>
        <div class="subtitle-text">Making Shadow Puppet Leather</div>
      </div>

      <!-- 底部提示 -->
      <div class="hint-container" :class="{ 'fade-out': scratchProgress > 80 }">
        <img src="/assets/zhipi-process/page1/assets/3c54e4d1-decc-4497-b6cc-f73fbbd0a866.png" class="hint-icon" alt="提示" />
        <div class="hint-text">拖拽将牛皮刮干净</div>
      </div>

      <!-- 进度提示 -->
      <div v-if="scratchProgress > 20 && scratchProgress < 100" class="progress-hint">
        已清理 {{ Math.floor(scratchProgress) }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const scratchCanvas = ref(null);
const scratchProgress = ref(0);
const isScratching = ref(false);

let ctx = null;
let imageLoaded = false;

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

// 初始化canvas
const initCanvas = () => {
  const canvas = scratchCanvas.value;
  if (!canvas) return;

  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  
  // 设置canvas尺寸
  canvas.width = 347 * dpr;
  canvas.height = 464 * dpr;
  canvas.style.width = '347px';
  canvas.style.height = '464px';

  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // 加载脏牛皮图片
  const img = new Image();
  img.src = '/assets/zhipi-process/page1/assets/3bdd2051-236f-497d-b974-189141a5716b.png';
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 347, 464);
    imageLoaded = true;
  };
};

// 计算清理进度
const calculateProgress = () => {
  if (!ctx) return;

  const canvas = scratchCanvas.value;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  let transparentPixels = 0;
  const totalPixels = pixels.length / 4;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 128) { // 透明或半透明像素
      transparentPixels++;
    }
  }

  const progress = (transparentPixels / totalPixels) * 100;
  scratchProgress.value = progress;

  // 如果清理进度达到70%，跳转到下一页
  if (progress > 70) {
    setTimeout(() => {
      router.push('/zhipi-process-page2');
    }, 500);
  }
};

// 开始刮除（鼠标）
const startScratch = (e) => {
  if (!imageLoaded) return;
  isScratching.value = true;
  scratch(e);
};

// 刮除动作（鼠标）
const scratch = (e) => {
  if (!isScratching.value || !ctx) return;

  const canvas = scratchCanvas.value;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 设置橡皮擦效果
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2); // 刮除半径30px
  ctx.fill();

  // 计算进度
  if (Math.random() < 0.1) { // 每10次操作计算一次进度，避免性能问题
    calculateProgress();
  }
};

// 停止刮除
const stopScratch = () => {
  isScratching.value = false;
  if (scratchProgress.value > 5) {
    calculateProgress(); // 停止时计算一次完整进度
  }
};

// 触摸开始
const startScratchTouch = (e) => {
  if (!imageLoaded) return;
  e.preventDefault();
  isScratching.value = true;
  scratchTouch(e);
};

// 触摸刮除
const scratchTouch = (e) => {
  if (!isScratching.value || !ctx) return;
  e.preventDefault();

  const canvas = scratchCanvas.value;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  // 设置橡皮擦效果
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 35, 0, Math.PI * 2); // 触摸刮除半径稍大一些
  ctx.fill();

  // 计算进度
  if (Math.random() < 0.1) {
    calculateProgress();
  }
};

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000);
  
  // 初始化canvas
  setTimeout(() => {
    initCanvas();
  }, 100);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* 主容器 */
.zhipi-process-container {
  width: 100%;
  max-width: 393px;
  height: 852px;
  overflow: hidden;
  background: rgba(226, 213, 197, 1);
  position: relative;
  margin: 0 auto;
}

/* 包装器 */
.zhipi-process-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-image: url('/assets/zhipi-process/page1/assets/bdb08282-6891-486f-bbde-1c21101f9102.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* 状态栏 */
.status-bar {
  width: 100%;
  height: 49px;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
}

.status-bar-content {
  width: 100%;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.status-bar-inner {
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* 时间显示 */
.time-display {
  width: 134.5px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 6px;
  padding-left: 16px;
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

/* 占位空间 */
.spacer {
  width: 124px;
  min-height: 10px;
  height: 10px;
}

/* 状态图标 */
.status-icons {
  width: 134.5px;
  height: 13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
  padding-left: 6px;
}

.icon-group {
  width: 77.67px;
  height: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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

/* 主内容区域 */
.main-content {
  width: 100%;
  height: 612px;
  margin-top: 14px;
  position: relative;
}

.bg-leather {
  width: 393px;
  height: 392px;
  position: absolute;
  top: 175px;
  left: 0;
}

.scratch-canvas {
  position: absolute;
  top: 148px;
  left: 23px;
  width: 347px;
  height: 464px;
  cursor: pointer;
  touch-action: none;
}

.title-text {
  position: absolute;
  top: 0;
  left: 313px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 48px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

.subtitle-text {
  position: absolute;
  top: 9px;
  left: 191px;
  width: 188.76px;
  height: 489.53px;
  transform: rotate(89.8375581215239deg);
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 12px;
  color: rgba(160, 45, 24, 1);
  line-height: normal;
  font-weight: normal;
}

/* 底部提示 */
.hint-container {
  width: 184px;
  height: 25px;
  margin-top: 65px;
  margin-left: 38px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: opacity 0.5s ease;
}

.hint-container.fade-out {
  opacity: 0;
}

.hint-icon {
  width: 17px;
  height: 17px;
}

.hint-text {
  margin-left: 7px;
  width: 160px;
  height: 25px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 20px;
  white-space: nowrap;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

/* 进度提示 */
.progress-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 30px;
  border-radius: 20px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 24px;
  color: rgba(100, 70, 63, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: pulse 1s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
}

/* 响应式适配 */
@media screen and (max-width: 393px) {
  .zhipi-process-container {
    width: 100vw;
    height: 100vh;
  }
}
</style>

