<template>
  <div class="color-start-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ColorProcess/assets/7cab5460-0ac2-4f30-b94a-05a4f60222e6.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ColorProcess/assets/b6c88073-7ed2-4be3-b468-de009210eeb9.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ColorProcess/assets/1e3d1337-5402-424b-9f76-b195994ccd81.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 背景容器 -->
      <div class="background-container">
        <img 
          src="/assets/ColorProcess/assets/83cc71fc-8518-4ecd-985c-0d8b5640d966.png" 
          alt="背景" 
          class="background-image"
        />
      </div>

      <!-- 标题"敷彩" -->
      <div class="page-title">敷彩</div>

      <!-- 英文副标题 -->
      <div class="subtitle-text">Coloring Shadow Puppets</div>

      <!-- 中间白色区域容器 -->
      <div class="white-box-back"></div>
      <div class="white-box-front">
        <!-- 可点击的圆形按钮 -->
        <img 
          src="/assets/ColorProcess/assets/15969324-c316-4287-a059-0891c5f40f7b.png" 
          alt="开始按钮" 
          class="start-button"
          @click="handleStartClick"
        />
      </div>

      <!-- 装饰元素层 -->
      <div class="decoration-layer">
        <!-- 可点击的颜料瓶们 -->
        <img 
          v-for="(bottle, index) in paintBottles"
          :key="index"
          :src="bottle.src" 
          :alt="`颜料瓶${index + 1}`" 
          :class="['paint-bottle', `paint-bottle-${index + 1}`, { 
            'locked': bottle.locked
          }]"
          @click="handleBottleClick(index)"
        />
        
        <!-- 装饰元素 -->
        <img 
          src="/assets/ColorProcess/assets/abeed70d-4901-45fa-a3c9-bb9bb2701f73.png" 
          alt="颜料笔" 
          class="paint-brush"
        />
        <img 
          src="/assets/ColorProcess/assets/70ee0414-603c-4917-90ed-5d5f65e66308.png" 
          alt="装饰元素1" 
          class="decoration-1"
        />
        <img 
          src="/assets/ColorProcess/assets/e6e540d6-9e31-48c4-a84b-ca6ba8fac612.png" 
          alt="装饰元素2" 
          class="decoration-2"
        />
      </div>

      <!-- 皮影和提示文字层 -->
      <div class="shadow-puppet-layer">
        <img 
          src="/assets/ColorProcess/assets/92afde34-cfc1-41d1-a581-7ccce52937a0.png" 
          alt="皮影" 
          class="shadow-puppet"
        />
        
        <!-- 提示文字和箭头 -->
        <div class="hint-container">
          <div class="hint-text">拖动颜料到皮影</div>
          <img 
            src="/assets/ColorProcess/assets/b79179a9-d2bb-431d-94e9-3c10b74a5cc7.png" 
            alt="箭头" 
            class="hint-arrow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');

// 颜料瓶数据
const paintBottles = ref([
  {
    src: '/assets/ColorProcess/assets/18f22b8d-a6ad-4843-9382-6b15eaeb9bba.png',
    locked: false
  },
  {
    src: '/assets/ColorProcess/assets/7f536207-23cb-4444-b16a-c7ae91933a01.png',
    locked: true
  }
]);

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

// 从localStorage加载已完成的颜料
const loadCompletedPaints = () => {
  const completed = JSON.parse(localStorage.getItem('completedPaints') || '[]');
  completed.forEach(index => {
    if (index < paintBottles.value.length - 1) {
      // 解锁下一个颜料瓶
      paintBottles.value[index + 1].locked = false;
    }
  });
};

// 点击颜料瓶 - 直接跳转
const handleBottleClick = (index) => {
  if (paintBottles.value[index].locked) {
    return;
  }
  
  // 保存当前颜料索引到localStorage
  localStorage.setItem('currentPaintIndex', index.toString());
  
  // 跳转到颜料详情页（第一步）
  router.push('/color-paint');
};

// 点击开始按钮
const handleStartClick = () => {
  // TODO: 跳转到敷彩详情页或下一个流程
  router.push('/color-paint');
  console.log('开始敷彩');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  loadCompletedPaints();
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 主容器 */
.color-start-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
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
  color: rgba(0, 0, 0, 1);
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
  height: 803px;
  margin-top: 49px;
}

/* 背景容器 */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  z-index: 1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 标题"敷彩" */
.page-title {
  position: absolute;
  top: 0;
  right: 50px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 20;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 9px;
  left: 361px;
  width: 189px;
  height: 489.53px;
  transform: rotate(89.84deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(160, 45, 24, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 20;
}

/* 白色区域 - 后面的 */
.white-box-back {
  position: absolute;
  top: 85px;
  left: 13px;
  width: 367px;
  height: 559px;
  background: rgba(255, 255, 255, 1);
  z-index: 5;
}

/* 白色区域 - 前面的 */
.white-box-front {
  position: absolute;
  top: 61px;
  left: 26px;
  width: 367px;
  height: 559px;
  background: rgba(255, 255, 255, 0.5);
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}

/* 开始按钮 */
.start-button {
  width: 64px;
  height: 64px;
  margin-left: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.start-button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.5));
}

.start-button:active {
  transform: scale(0.95);
}

/* 按钮脉冲动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

/* 装饰元素层 */
.decoration-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 803px;
  z-index: 7;
  pointer-events: none;
}

/* 颜料瓶基础样式 */
.paint-bottle {
  position: absolute;
  width: 64px;
  height: 64px;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  z-index: 100;
}

.paint-bottle:hover:not(.locked) {
  transform: scale(1.15);
  filter: drop-shadow(0 6px 16px rgba(255, 255, 255, 0.6));
}

.paint-bottle:active:not(.locked) {
  transform: scale(1.05);
}

/* 锁定状态 */
.paint-bottle.locked {
  opacity: 0.4;
  filter: grayscale(90%);
  cursor: not-allowed;
}

.paint-bottle.locked::after {
  content: '🔒';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  z-index: 10;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 颜料瓶位置 */
.paint-bottle-1 {
  top: 699px;
  left: 36px;
}

.paint-bottle-2 {
  top: 620px;
  left: 36px;
}

.paint-brush {
  position: absolute;
  top: 602.22px;
  left: 29px;
  width: 87.3px;
  height: 100.11px;
}

.decoration-1 {
  position: absolute;
  top: 511px;
  left: 4px;
  width: 123.21px;
  height: 119.64px;
}

.decoration-2 {
  position: absolute;
  top: 681.22px;
  left: 22px;
  width: 85px;
  height: 107.78px;
}

/* 皮影和提示文字层 */
.shadow-puppet-layer {
  position: absolute;
  top: 138px;
  left: 0;
  width: 393px;
  height: 651px;
  z-index: 10;
  pointer-events: none;
}

.shadow-puppet {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 651px;
  object-fit: contain;
}

/* 提示容器 */
.hint-container {
  position: absolute;
  top: 426px;
  left: 156px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: hintPulse 2s ease-in-out infinite;
}

.hint-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 20px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  white-space: nowrap;
}

.hint-arrow {
  width: 17px;
  height: 17px;
}

/* 提示动画 */
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

/* 响应式 */
@media screen and (max-width: 393px) {
  .color-start-container {
    width: 100vw;
  }
}
</style>

