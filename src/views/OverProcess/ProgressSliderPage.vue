<template>
  <div class="progress-slider-container">
    <!-- 背景 -->
    <div class="background-layer"></div>

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
            src="/assets/OverProcess/step3/assets/f89e3332-7393-4d92-870d-c138b2476c09.png" 
            class="icon-signal" 
            alt="信号"
          />
          <img 
            src="/assets/OverProcess/step3/assets/8f19aff8-7af5-4a1a-bf3c-501413fc055a.png" 
            class="icon-wifi" 
            alt="WiFi"
          />
          <img 
            src="/assets/OverProcess/step3/assets/e06ead57-de0c-4f3e-b893-c0cc3625d578.png" 
            class="icon-battery" 
            alt="电量"
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 内容背景 -->
      <div class="content-background">
        <!-- 原始图片（带旋转效果） -->
        <img 
          v-if="selectedImage" 
          :src="selectedImage" 
          alt="图案" 
          class="base-image"
          :style="{ transform: `rotate(${imageRotation}deg)` }"
        />

        <!-- 覆盖纸张层 -->
        <div class="paper-layer">
          <img 
            v-if="selectedImage" 
            :src="selectedImage" 
            alt="纸张覆盖" 
            class="paper-image"
            :style="{ transform: `rotate(${imageRotation}deg)` }"
          />

          <!-- 毛笔图标 -->
          <div class="brush-container">
            <img 
              src="/assets/OverProcess/step3/assets/a3fa476c-d678-48c3-9f39-b4b3d470abeb.png" 
              alt="毛笔"
              class="brush-image"
              :style="{ left: brushPosition + 'px' }"
            />

            <!-- 进度条容器 -->
            <div class="slider-container">
              <div 
                class="slider-track"
                ref="sliderTrack"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
                @mousedown="handleMouseDown"
              >
                <div class="slider-fill" :style="{ width: progress + '%' }"></div>
                <div 
                  class="slider-thumb" 
                  :style="{ left: progress + '%' }"
                  @mousedown.stop="handleThumbMouseDown"
                  @touchstart.stop="handleThumbTouchStart"
                ></div>
              </div>
            </div>
          </div>

          <!-- 小圆点指示器 -->
          <div class="dot-indicator">
            <img 
              src="/assets/OverProcess/step3/assets/5d572c1f-e3f5-40b3-b1a0-00de536a9f2b.png" 
              alt="指示器"
              class="indicator-dot"
            />
          </div>
        </div>

        <!-- 英文副标题 -->
        <div class="subtitle-text">Transferring Shadow Puppet Drafts to Leather</div>

        <!-- 提示文字 -->
        <div class="instruction-text">
          <span v-if="progress < 10">拖动进度条对齐图案</span>
          <span v-else-if="progress < 100">继续调整对齐...</span>
          <span v-else>对齐完成！</span>
        </div>
      </div>

      <!-- 标题"过稿" -->
      <div class="page-title">过稿</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const selectedImage = ref(null);
const progress = ref(0);
const isDragging = ref(false);
const sliderTrack = ref(null);

// 定时器
let timeTimer = null;

// 毛笔位置（随进度移动）
const brushPosition = computed(() => {
  // 进度条起始位置 43px，宽度 204px
  return 43 + (progress.value / 100) * 204;
});

// 图片旋转角度（随进度从倾斜变正）
const imageRotation = computed(() => {
  // 从 -15° 逐渐变为 0°
  const startAngle = -15;
  const endAngle = 0;
  return startAngle + (progress.value / 100) * (endAngle - startAngle);
});

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

// 计算进度
const calculateProgress = (clientX, clientY) => {
  if (!sliderTrack.value) return;
  
  const rect = sliderTrack.value.getBoundingClientRect();
  const x = clientX - rect.left;
  const width = rect.width;
  
  let newProgress = (x / width) * 100;
  newProgress = Math.max(0, Math.min(100, newProgress));
  
  progress.value = newProgress;
  
  // 达到100%后自动跳转
  if (newProgress >= 99) {
    setTimeout(() => {
      router.push('/over-process-complete');
    }, 500);
  }
};

// 触摸开始
const handleTouchStart = (e) => {
  isDragging.value = true;
  const touch = e.touches[0];
  calculateProgress(touch.clientX, touch.clientY);
};

// 触摸移动
const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const touch = e.touches[0];
  calculateProgress(touch.clientX, touch.clientY);
};

// 触摸结束
const handleTouchEnd = () => {
  isDragging.value = false;
};

// 鼠标按下（滑块）
const handleThumbMouseDown = (e) => {
  isDragging.value = true;
  e.preventDefault();
  
  const handleMouseMove = (moveEvent) => {
    if (!isDragging.value) return;
    calculateProgress(moveEvent.clientX, moveEvent.clientY);
  };
  
  const handleMouseUp = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

// 鼠标按下（轨道）
const handleMouseDown = (e) => {
  calculateProgress(e.clientX, e.clientY);
  handleThumbMouseDown(e);
};

// 触摸开始（滑块）
const handleThumbTouchStart = (e) => {
  isDragging.value = true;
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
});
</script>

<style scoped>
/* 主容器 */
.progress-slider-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 背景层 */
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  background-image: url('/assets/OverProcess/step3/assets/e53c0563-134e-4428-83a9-726604065aa3.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 状态栏 */
.status-bar {
  position: relative;
  width: 393px;
  height: 49px;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
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
  height: 692.8px;
  margin-top: 14px;
  z-index: 2;
}

/* 内容背景 */
.content-background {
  position: absolute;
  top: 8.34px;
  left: 0;
  width: 393px;
  height: 684.46px;
  background-image: url('/assets/OverProcess/step3/assets/416cbbe7-a340-4ba8-952f-2c6663e979ad.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* 原始图片 */
.base-image {
  position: absolute;
  width: 393px;
  height: 524.35px;
  top: 69.66px;
  left: 0;
  object-fit: contain;
  z-index: 3;
  transition: transform 0.2s ease-out;
  transform-origin: center center;
}

/* 覆盖纸张层 */
.paper-layer {
  position: absolute;
  top: 64.96px;
  left: 0;
  width: 393px;
  height: 592.4px;
  background-image: url('/assets/OverProcess/step3/assets/e7f07f73-f5e1-463d-8666-94f3d045a3a3.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.paper-image {
  position: absolute;
  width: 393px;
  height: 524.35px;
  top: 4.7px;
  left: 0;
  object-fit: contain;
  opacity: 0.8;
  transition: transform 0.2s ease-out;
  transform-origin: center center;
}

/* 毛笔容器 */
.brush-container {
  position: relative;
  width: 247px;
  height: 237px;
  margin-top: 314.7px;
  margin-left: 52px;
}

/* 毛笔图片 */
.brush-image {
  position: absolute;
  width: 87.48px;
  height: 229.53px;
  top: 0;
  left: 0;
  transition: left 0.1s ease-out;
  z-index: 10;
}

/* 进度条容器 */
.slider-container {
  position: absolute;
  width: 204px;
  top: 223px;
  left: 43px;
  z-index: 5;
}

/* 进度条轨道 */
.slider-track {
  position: relative;
  width: 204px;
  height: 14px;
  border-radius: 34px;
  border: 1px solid rgba(160, 45, 24, 1);
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  box-sizing: border-box;
}

/* 进度条填充 */
.slider-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(160, 45, 24, 0.6), rgba(193, 58, 38, 0.8));
  border-radius: 34px;
  transition: width 0.1s ease-out;
}

/* 滑块 */
.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: rgba(160, 45, 24, 1);
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: left 0.1s ease-out;
  z-index: 10;
}

.slider-thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.1);
}

/* 小圆点指示器 */
.dot-indicator {
  position: absolute;
  width: 17px;
  height: 17px;
  top: 334px;
  left: 71px;
}

.indicator-dot {
  width: 17px;
  height: 17px;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 0.66px;
  left: 191px;
  width: 188.76px;
  height: 489.53px;
  transform: rotate(89.8375581215239deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(160, 45, 24, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 50;
}

/* 提示文字 */
.instruction-text {
  position: absolute;
  top: 631.66px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  white-space: nowrap;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  text-align: center;
  z-index: 50;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* 标题"过稿" */
.page-title {
  position: absolute;
  top: 0;
  left: 313px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 50;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .progress-slider-container {
    width: 100vw;
  }
}
</style>

