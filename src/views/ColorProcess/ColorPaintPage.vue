<template>
  <div class="color-paint-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ColorProcess/paint/assets/afd4297c-32ea-4b16-9e8f-7755ce25f353.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ColorProcess/paint/assets/0c5b5224-94d4-46de-a720-a432132d42f2.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ColorProcess/paint/assets/5348ba9a-6913-4cbc-a93b-a523038dc94a.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 标题"敷彩" -->
      <div class="page-title">敷彩</div>

      <!-- 英文副标题 -->
      <div class="subtitle-text">Coloring Shadow Puppets</div>

      <!-- 第一步容器 - 上面的白色框 -->
      <div class="step-one-container">
        <div class="step-text">
          把制好纯色化入稍大的容器内，再放进精皮熬制透明皮胶
        </div>
      </div>

      <!-- 第二步容器 - 中间的图片区域 -->
      <div class="step-two-container">
        <img 
          src="/assets/ColorProcess/paint/assets/ac950f99-4519-483e-88e3-9a6e81f1d30d.png" 
          alt="敷彩过程图" 
          class="process-image"
        />
      </div>

      <!-- 第三步容器 - 下面的说明区域 -->
      <div class="step-three-container">
        <div class="step-three-text">
          下边点燃酒精灯火，使之与胶色一起溶成粥状。
        </div>
        
        <!-- 返回按钮 - 白色圆点 -->
        <div class="back-button-wrapper">
          <div class="back-button-bg">
            <img 
              src="/assets/ColorProcess/paint/assets/7905e972-6547-4625-bc6e-01bd8d594766.png" 
              alt="按钮背景" 
              class="button-bg-image"
            />
          </div>
          <img 
            src="/assets/ColorProcess/paint/assets/fe8e17cd-2bbf-40ab-b2ac-33ff318a67bf.png" 
            alt="返回按钮" 
            class="back-button"
            @click="handleBackClick"
          />
        </div>
      </div>

      <!-- 装饰元素层 -->
      <div class="decoration-layer">
        <!-- 颜料瓶们 -->
        <img 
          src="/assets/ColorProcess/paint/assets/2465aa10-22dd-49bc-963b-de36663a007f.png" 
          alt="颜料瓶1" 
          class="paint-bottle-1"
        />
        <img 
          src="/assets/ColorProcess/paint/assets/5a21ffb0-e3ee-41f5-9f46-8a40be10a5d3.png" 
          alt="颜料瓶2" 
          class="paint-bottle-2"
        />
        <img 
          src="/assets/ColorProcess/paint/assets/2c1fd9f4-8e27-45ae-ba5c-21d5bd36388d.png" 
          alt="颜料瓶3" 
          class="paint-bottle-3"
        />
        <img 
          src="/assets/ColorProcess/paint/assets/87b1cc72-cd6b-448e-8fc3-7e8ecc7ec464.png" 
          alt="颜料笔" 
          class="paint-brush"
        />
        <img 
          src="/assets/ColorProcess/paint/assets/cd232453-0012-4cc5-8c95-37a10a9e54e0.png" 
          alt="装饰元素" 
          class="decoration-element"
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

// 点击返回按钮
const handleBackClick = () => {
  // 标记该颜料已完成，解锁下一个
  const completedPaints = JSON.parse(localStorage.getItem('completedPaints') || '[]');
  const currentPaintIndex = parseInt(localStorage.getItem('currentPaintIndex') || '0');
  
  if (!completedPaints.includes(currentPaintIndex)) {
    completedPaints.push(currentPaintIndex);
    localStorage.setItem('completedPaints', JSON.stringify(completedPaints));
  }
  
  // 跳转到第二步
  router.push('/color-step2');
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
.color-paint-container {
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
  left: 366px;
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

/* 第一步容器 - 上面的白色框 */
.step-one-container {
  position: absolute;
  top: 107.59px;
  left: 30px;
  width: 393px;
  height: 496.94px;
  background: url('/assets/ColorProcess/paint/assets/fbb8e848-96bf-4f7e-a27f-ba17b464c424.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.step-text {
  margin-top: 29.41px;
  margin-left: 30px;
  width: 264px;
  height: 176px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  line-height: normal;
  font-weight: normal;
}

/* 第二步容器 - 中间的图片区域 */
.step-two-container {
  position: absolute;
  top: 181px;
  left: 90px;
  width: 391px;
  height: 392px;
  z-index: 10;
}

.process-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 第三步容器 - 下面的说明区域 */
.step-three-container {
  position: absolute;
  top: 424px;
  left: 0;
  width: 393px;
  height: 379px;
  z-index: 15;
}

.step-three-text {
  position: absolute;
  top: 0;
  left: 26.79px;
  width: 198px;
  height: 176px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  line-height: normal;
  font-weight: normal;
}

/* 返回按钮容器 */
.back-button-wrapper {
  position: absolute;
  top: 34px;
  left: 256px;
  width: 56px;
  height: 56px;
}

.back-button-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 56px;
  z-index: 1;
}

.button-bg-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.back-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 56px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.5));
}

.back-button:active {
  transform: scale(0.95);
}

/* 装饰元素层 */
.decoration-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 803px;
  z-index: 8;
  pointer-events: none;
}

/* 颜料瓶和装饰 */
.paint-bottle-1 {
  position: absolute;
  top: 699px;
  left: 108px;
  width: 64px;
  height: 64px;
}

.paint-bottle-2 {
  position: absolute;
  top: 620px;
  left: 108px;
  width: 64px;
  height: 64px;
}

.paint-bottle-3 {
  position: absolute;
  top: 541px;
  left: 108px;
  width: 64px;
  height: 64px;
}

.paint-brush {
  position: absolute;
  top: 602.22px;
  left: 104.8px;
  width: 87.3px;
  height: 100.11px;
}

.decoration-element {
  position: absolute;
  top: 681.22px;
  left: 101px;
  width: 85px;
  height: 107.78px;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .color-paint-container {
    width: 100vw;
  }
}
</style>

