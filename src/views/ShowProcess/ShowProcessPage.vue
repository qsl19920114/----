<template>
  <div class="show-process-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ShowProcess/assets/6b5da598-a63f-4f19-8233-80afa4569964.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ShowProcess/assets/b8e267eb-73b2-4949-824a-c7a9fffb0566.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ShowProcess/assets/bfe87682-902c-48f4-b3d9-482abab7ec7d.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 标题"表演" -->
      <div class="page-title">表演</div>

      <!-- 主场景容器 -->
      <div class="scene-container">
        <!-- 背景图 -->
        <img 
          src="/assets/ShowProcess/assets/68514d0e-1826-4f3e-8412-a9ee662cf52d.png" 
          alt="背景" 
          class="background-image"
        />
        
        <!-- 皮影人物视频 -->
        <video 
          class="puppet-character"
          autoplay
          loop
          muted
          playsinline
        >
          <source src="/assets/ShowProcess/assets/20250917-125212.mp4" type="video/mp4">
        </video>
      </div>

      <!-- 底部装饰 -->
      <img 
        src="/assets/ShowProcess/assets/f27ce757-a721-492b-9f54-5caf14939b3c.png" 
        alt="装饰" 
        class="bottom-decoration"
      />

      <!-- 下一步按钮 -->
      <div class="next-button" @click="handleNextClick">
        <span class="next-button-text">下一步</span>
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
  // 保存表演完成状态
  localStorage.setItem('showProcessCompleted', 'true');
  
  // 跳转到下一个页面（待定）
  router.push('/process');
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
.show-process-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(160, 45, 24, 1);
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

/* 标题"表演" */
.page-title {
  position: absolute;
  top: 49px;
  right: 32px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 30;
  animation: fadeInDown 1s ease-out;
}

/* 场景容器 */
.scene-container {
  position: absolute;
  top: 63px;
  left: 0;
  width: 393px;
  height: 708px;
  z-index: 10;
}

/* 背景图 */
.background-image {
  position: absolute;
  width: 393px;
  height: 658px;
  top: 34px;
  left: 0;
  object-fit: cover;
  animation: fadeIn 1.2s ease-out;
}

/* 皮影人物 */
.puppet-character {
  position: absolute;
  width: 212px;
  height: 285px;
  top: 220px;
  left: 50%;
  transform: translateX(-50%);
  object-fit: contain;
  z-index: 20;
  animation: puppetEntrance 1.5s ease-out 0.3s backwards;
}

/* 底部装饰 */
.bottom-decoration {
  position: absolute;
  bottom: 164px;
  left: 0;
  width: 393px;
  height: 348px;
  object-fit: contain;
  z-index: 25;
  animation: slideUpFade 1.2s ease-out 0.5s backwards;
}

/* 下一步按钮 */
.next-button {
  position: absolute;
  bottom: 84px;
  left: 50%;
  transform: translateX(-50%);
  width: 312px;
  height: 60px;
  background: rgba(247, 238, 173, 1);
  border-radius: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 50;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: slideUp 1s ease-out 0.8s backwards;
}

.next-button:hover {
  transform: translateX(-50%) translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 248, 193, 1);
}

.next-button:active {
  transform: translateX(-50%) translateY(-1px);
}

.next-button-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 32px;
  color: rgba(100, 70, 63, 1);
  font-weight: normal;
  line-height: normal;
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

/* 从上淡入 */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 皮影人物入场动画 */
@keyframes puppetEntrance {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.8) translateY(30px);
  }
  60% {
    transform: translateX(-50%) scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}

/* 上滑淡入 */
@keyframes slideUpFade {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 按钮上滑进入 */
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .show-process-container {
    width: 100vw;
  }
}
</style>

