<template>
  <div class="catalog-container">
    <div class="background-overlay"></div>
    <div class="content-layout">
      <div class="main-wrapper">
        <!-- 背景渐变层 -->
        <div class="gradient-overlay">
          <!-- 顶部装饰图 -->
          <div class="top-decoration">
            <img src="/assets/catalog/assets/17891596-ec53-42ef-bf32-e7f5b77cad89.png" class="decoration-image" alt="" />
          </div>
          
          <!-- 状态栏 -->
          <div class="status-bar" style="top: -4px;">
            <div class="status-bar-content">
              <div class="status-bar-inner">
                <!-- 时间 -->
                <div class="time-display">
                  <div class="time-text">
                    <span>{{ currentTime }}</span>
                  </div>
                </div>
                
                <!-- 占位空间 -->
                <div class="spacer"></div>
                
                <!-- 状态图标 -->
                <div class="status-icons">
                  <div class="icon-group">
                    <img src="/assets/catalog/assets/36c674fa-f05d-4efa-8141-07ad0efa62dc.png" class="icon-signal" alt="信号" />
                    <img src="/assets/catalog/assets/fc714c5f-5ec0-4402-8006-25ecf07167f4.png" class="icon-wifi" alt="WiFi" />
                    <img src="/assets/catalog/assets/03fcb944-541e-45cc-bc2f-14ce81bb912d.png" class="icon-battery" alt="电量" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 历史渊源按钮 -->
        <div class="nav-button history-button" @click="goToHistory">
          <div class="button-content">
            <img src="/assets/catalog/assets/dd6a1711-1afb-4bee-8eac-4efc3fcbf1c7.png" class="button-image" alt="" />
            <div class="button-text history-text">
              <span>历史渊源</span>
            </div>
          </div>
        </div>

        <!-- 制作流程按钮 -->
        <div class="nav-button process-button" @click="goToProcess">
          <div class="button-content-wrapper">
            <img src="/assets/catalog/assets/4e6b0161-e116-46c6-8152-48654d9fae9f.png" class="button-image" alt="" />
          </div>
          <div class="button-text process-text">
            <span>创作过程</span>
          </div>
        </div>

        <!-- 英文副标题 - 历史渊源 -->
        <div class="subtitle-text history-subtitle">
          <span>Historical Origin</span>
        </div>

        <!-- 英文副标题 - 制作流程 -->
        <div class="subtitle-text process-subtitle">
          <span>Creative Process</span>
        </div>
      </div>

      <!-- 底部装饰图 -->
      <img src="/assets/catalog/assets/33d272f1-4ded-445e-893b-87c0d0f08ef9.png" class="bottom-decoration" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');

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

// 跳转到历史渊源页面
const goToHistory = () => {
  router.push('/history');
};

// 跳转到制作流程页面
const goToProcess = () => {
  router.push('/process');
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
.catalog-container {
  width: 100%;
  max-width: 393px;
  height: 882px;
  overflow: hidden;
  background: linear-gradient(180deg, #A02D18 33.65%, #EFEFF1 100%);
  position: relative;
  box-sizing: border-box;
}

/* 背景叠加层 */
.background-overlay {
  width: 289px;
  opacity: 0.12;
  box-sizing: border-box;
  min-height: 287px;
  position: absolute;
  top: 156px;
  left: 50px;
  display: none;
}

/* 内容布局 */
.content-layout {
  width: 617px;
  height: 886px;
  box-sizing: border-box;
  position: absolute;
  top: -4px;
  left: -146px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  pointer-events: none;
}

/* 主包装器 */
.main-wrapper {
  width: 393px;
  height: 882px;
  margin-top: 4px;
  margin-left: 146px;
  position: relative;
  pointer-events: none;
}

/* 渐变叠加层 */
.gradient-overlay {
  width: 676px;
  height: 673px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: -205px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: none;
}

/* 顶部装饰 */
.top-decoration {
  width: 390px;
  height: 388px;
  position: absolute;
  top: -256px;
  left: calc(50% - 390px/2 + 66px);
  pointer-events: none;
}

.decoration-image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

/* 状态栏 */
.status-bar {
  width: 393px;
  height: 49px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
  position: absolute;
  top: 26px;
  left: 205px;
  z-index: 10;
}

.status-bar-content {
  width: 393px;
  box-sizing: border-box;
  display: flex;
  height: 22px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.status-bar-inner {
  width: 393px;
  height: 22px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* 时间显示 */
.time-display {
  width: 134.5px;
  box-sizing: border-box;
  display: flex;
  height: 22px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 6px;
  padding-left: 16px;
  flex: 1;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  white-space: nowrap;
  text-align: center;
  color: #000000;
  line-height: 22px;
  font-weight: 590;
}

/* 占位空间 */
.spacer {
  width: 124px;
  box-sizing: border-box;
  min-height: 10px;
  display: flex;
  height: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

/* 状态图标 */
.status-icons {
  width: 134.5px;
  box-sizing: border-box;
  display: flex;
  height: 13px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
  padding-left: 6px;
  flex: 1;
}

.icon-group {
  width: 74px;
  height: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 7px;
}

.icon-signal {
  width: 19.2px;
  height: 12.23px;
}

.icon-wifi {
  width: 17.14px;
  height: 12.33px;
}

.icon-battery {
  width: 27.33px;
  height: 13px;
}

/* 导航按钮 - 历史渊源 */
.history-button {
  position: absolute;
  top: 161px;
  left: calc(50% - 261px/2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 261px;
  height: 261px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(148, 44, 26, 0.56) 0%, rgba(255, 255, 255, 0.0952) 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.history-button:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.history-button:active {
  transform: scale(0.98);
}

.button-content {
  width: 242px;
  height: 241px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.button-image {
  width: 242px;
  height: 241px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.history-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 137px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 32px;
  color: #FFFFFF;
  line-height: 42px;
  font-weight: 400;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 2;
  pointer-events: none;
}

/* 导航按钮 - 制作流程 */
.process-button {
  position: absolute;
  top: 447px;
  left: calc(50% - 261px/2);
  width: 261px;
  height: 261px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(201, 115, 115, 0.461) 39.9%, rgba(216, 182, 177, 0.3) 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
}

.process-button:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.process-button:active {
  transform: scale(0.98);
}

.process-text {
  position: absolute;
  top: 60%;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 207px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 32px;
  color: #FFFFFF;
  line-height: 42px;
  font-weight: 400;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 2;
  pointer-events: none;
}

.button-content-wrapper {
  width: 242px;
  height: 241px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 12px;
  color: #E2D5C5;
  line-height: 16px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;
}

.history-subtitle {
  top: 223px;
  left: 243px;
  width: 489px;
  height: 187.38px;
  transform: rotate(89.84deg);
  transform-origin: left top;
}

.process-subtitle {
  position: absolute;
  top: 511px;
  left: 243px;
  width: 489px;
  height: 187.38px;
  transform: rotate(89.84deg);
  transform-origin: left top;
}

/* 底部装饰 */
.bottom-decoration {
  width: 390px;
  height: 388px;
  position: absolute;
  top: 745px;
  left: calc(50% - 390px/2 + 36px);
  pointer-events: none;
}

/* 响应式适配 */
@media screen and (max-width: 393px) {
  .catalog-container {
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
}
</style>
