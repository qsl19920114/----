<template>
  <div class="color-step2-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ColorProcess/step2/assets/1f9ce6f3-04f4-4c55-b57c-a2468122a5ba.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ColorProcess/step2/assets/90415f06-9ed2-4a06-a1de-8bf5aa1fdf50.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ColorProcess/step2/assets/99c3d63e-05c7-4659-974e-dd954eb0c97c.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 背景 -->
      <div class="background-image">
        <img 
          src="/assets/ColorProcess/step2/assets/652c043d-c1cc-475d-94a8-3e0ca8ba20b6.png" 
          alt="背景"
          class="bg-img"
        />
      </div>

      <!-- 标题"敷彩" -->
      <div class="page-title">敷彩</div>

      <!-- 英文副标题 -->
      <div class="subtitle-text">Coloring Shadow Puppets</div>

      <!-- 白色区域容器 -->
      <div class="white-box-back"></div>
      <div class="white-box-front">
        <!-- 可点击的圆形按钮 -->
        <img 
          src="/assets/ColorProcess/step2/assets/ed3d5cc6-9ec7-48dc-a251-a381e643ec2e.png" 
          alt="下一步按钮" 
          class="next-button"
          @click="handleNextClick"
        />
      </div>

      <!-- 装饰元素层 -->
      <div class="decoration-layer">
        <!-- 颜料瓶们 -->
        <img 
          src="/assets/ColorProcess/step2/assets/f9993d25-bc02-4da4-b944-8bfea1fe5309.png" 
          alt="颜料瓶1" 
          class="paint-bottle-1"
        />
        <img 
          src="/assets/ColorProcess/step2/assets/52521e3b-7ffc-4ee9-801d-c01100fbd6c3.png" 
          alt="颜料瓶2" 
          class="paint-bottle-2"
        />
        <img 
          src="/assets/ColorProcess/step2/assets/b1a81e98-9173-4357-8226-0c382fcd0334.png" 
          alt="颜料笔" 
          class="paint-brush"
        />
        <img 
          src="/assets/ColorProcess/step2/assets/4ef169c0-34a6-4f5e-a399-65f81abda882.png" 
          alt="装饰元素1" 
          class="decoration-1"
        />
        <img 
          src="/assets/ColorProcess/step2/assets/eaac9844-697d-44d4-a5ea-f90c6405733b.png" 
          alt="装饰元素2" 
          class="decoration-2"
        />
      </div>

      <!-- 皮影和提示文字层 -->
      <div class="shadow-puppet-layer">
        <img 
          src="/assets/ColorProcess/step2/assets/ceec2bdb-4ffc-4971-8c85-4c32a026473f.png" 
          alt="皮影" 
          class="shadow-puppet"
        />
        
        <!-- 提示文字和箭头 -->
        <div class="hint-container">
          <div class="hint-text">拖动画笔到皮影</div>
          <img 
            src="/assets/ColorProcess/step2/assets/743de363-97e5-4e31-b24d-78d7999c7e0c.png" 
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
  // 跳转到第三步
  router.push('/color-step3');
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
.color-step2-container {
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

/* 背景图片 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  z-index: 1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 标题"敷彩" */
.page-title {
  position: absolute;
  top: 0;
  right: 80px;
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
  left: 351px;
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

/* 下一步按钮 */
.next-button {
  width: 64px;
  height: 64px;
  margin-left: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.next-button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.5));
}

.next-button:active {
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

/* 颜料瓶和装饰 */
.paint-bottle-1 {
  position: absolute;
  top: 699px;
  left: 36px;
  width: 64px;
  height: 64px;
}

.paint-bottle-2 {
  position: absolute;
  top: 620px;
  left: 36px;
  width: 64px;
  height: 64px;
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
  top: 505px;
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
  .color-step2-container {
    width: 100vw;
  }
}
</style>

