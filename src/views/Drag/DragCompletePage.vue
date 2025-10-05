<template>
  <div class="drag-complete-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/Drag/complete/assets/64f90d80-c946-443d-8268-2abf08c5a089.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/Drag/complete/assets/f5f3aeb4-baa6-40ec-99b7-dd286cceb437.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/Drag/complete/assets/0ef6d811-5dc7-4163-9e9a-b0614d57ed30.png" 
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
        src="/assets/Drag/complete/assets/59c7c350-d533-467e-86a4-4feb1d85e17e.png" 
        alt="背景" 
        class="background-image"
      />

      <!-- 左侧空的部件插槽 - 第一列 -->
      <div class="parts-column-left">
        <div v-for="n in 4" :key="`left-${n}`" class="empty-slot"></div>
      </div>

      <!-- 左侧空的部件插槽 - 第二列 -->
      <div class="parts-column-right">
        <div v-for="n in 5" :key="`right-${n}`" class="empty-slot"></div>
      </div>

      <!-- 中央完成的皮影图案容器 -->
      <div class="complete-puppet-container">
        <!-- 边框装饰 -->
        <img 
          src="/assets/Drag/complete/assets/5d0e63a2-1a28-454e-bbfc-2ceee69ffddb.png" 
          alt="装饰边框" 
          class="border-decoration"
        />
        
        <!-- 完整的皮影人物图 -->
        <div class="puppet-image-wrapper">
          <img 
            src="/assets/Drag/complete/assets/2cbfb409-c079-47f4-8244-f1e17d19bf13.png" 
            alt="完整皮影" 
            class="complete-puppet-image"
          />
        </div>
        
        <!-- 下一步按钮 -->
        <img 
          src="/assets/Drag/complete/assets/d60369f1-ce7d-4cd8-bdf0-62077a64805b.png" 
          alt="下一步按钮" 
          class="next-button"
          @click="handleNextClick"
        />
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

// 点击下一步按钮
const handleNextClick = () => {
  // 保存拖拽组装完成状态
  localStorage.setItem('dragAssembleCompleted', 'true');
  
  // 跳转到缀结页面
  router.push('/zhuijie');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 主容器 */
.drag-complete-container {
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
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  object-fit: cover;
}

/* 左侧第一列空插槽 */
.parts-column-left {
  position: absolute;
  width: 71px;
  height: 314px;
  left: 28px;
  top: 68px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 左侧第二列空插槽 */
.parts-column-right {
  position: absolute;
  width: 71px;
  height: 395px;
  left: 28px;
  top: 389px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 空插槽样式 */
.empty-slot {
  width: 71px;
  height: 71px;
  background: #D9D9D9;
  border-radius: 13px;
  opacity: 1;
  animation: fadeIn 0.5s ease-out;
}

/* 中央完整皮影容器 */
.complete-puppet-container {
  position: absolute;
  width: 351px;
  height: 834px;
  left: 42px;
  top: 7px;
  z-index: 10;
}

/* 边框装饰 */
.border-decoration {
  position: absolute;
  width: 337px;
  height: 834px;
  left: 14px;
  top: 0;
  z-index: 11;
  animation: fadeIn 1s ease-out;
}

/* 完整皮影图像容器 */
.puppet-image-wrapper {
  position: absolute;
  width: 309px;
  height: 437px;
  left: 0;
  top: 163px;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 完整的皮影图像 - 带浮现动画 */
.complete-puppet-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: puppetAppear 1.5s ease-out 0.3s backwards;
}

/* 下一步按钮 */
.next-button {
  position: absolute;
  width: 56px;
  height: 56px;
  left: 239px;
  top: 652px;
  z-index: 15;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out 1.5s infinite;
}

.next-button:hover {
  transform: scale(1.15);
  filter: drop-shadow(0 6px 16px rgba(160, 45, 24, 0.6));
}

.next-button:active {
  transform: scale(0.95);
}

/* ========== 动画定义 ========== */

/* 淡入动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 皮影浮现动画 */
@keyframes puppetAppear {
  0% {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(10px);
  }
  50% {
    opacity: 0.5;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

/* 按钮脉冲动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.9;
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .drag-complete-container {
    width: 100vw;
  }
}
</style>

