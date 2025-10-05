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
            
            <!-- 状态栏 -->
            <div class="status-bar">
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
        </div>

        <!-- 制作流程按钮 -->
        <div class="nav-button process-button" @click="goToProcess">
          <div class="button-text process-text">
            <span>创作过程</span>
          </div>
          <div class="button-content-wrapper">
            <img src="/assets/catalog/assets/4e6b0161-e116-46c6-8152-48654d9fae9f.png" class="button-image" alt="" />
          </div>
        </div>

        <!-- 英文副标题 - 历史渊源 -->
        <div class="subtitle-text history-subtitle">
          <span>Historical Origin</span>
        </div>
      </div>

      <!-- 底部装饰图 -->
      <img src="/assets/catalog/assets/33d272f1-4ded-445e-893b-87c0d0f08ef9.png" class="bottom-decoration" alt="" />

      <!-- 英文副标题 - 制作流程 -->
      <div class="subtitle-text process-subtitle">
        <span>Creative Process</span>
      </div>
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
  max-width: 375px;
  height: 841px;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(160, 45, 24, 1) 33.65%, rgba(239, 239, 241, 1) 100%);
  position: relative;
  box-sizing: border-box;
}

/* 背景叠加层 */
.background-overlay {
  width: 276px;
  opacity: 0.12;
  box-sizing: border-box;
  min-height: 274px;
  position: absolute;
  top: 149px;
  left: 48px;
}

/* 内容布局 */
.content-layout {
  width: 589px;
  height: 845px;
  box-sizing: border-box;
  position: absolute;
  top: 4px;
  left: -139px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 主包装器 */
.main-wrapper {
  width: 375px;
  height: 680px;
  margin-top: 4px;
  margin-left: 139px;
  position: relative;
}

/* 渐变叠加层 */
.gradient-overlay {
  width: 375px;
  height: 642px;
  box-sizing: border-box;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 100%);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 顶部装饰 */
.top-decoration {
  width: 375px;
  height: 126px;
  position: relative;
}

.decoration-image {
  width: 372px;
  height: 126px;
  position: absolute;
  top: 0;
  left: 2px;
}

/* 状态栏 */
.status-bar {
  width: 375px;
  height: 47px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

.status-bar-content {
  width: 375px;
  box-sizing: border-box;
  display: flex;
  height: 21px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.status-bar-inner {
  width: 375px;
  height: 21px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* 时间显示 */
.time-display {
  width: 128px;
  box-sizing: border-box;
  display: flex;
  height: 21px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 6px;
  padding-left: 15px;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  line-height: 21px;
  font-weight: 590;
}

/* 占位空间 */
.spacer {
  width: 119px;
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
  width: 128px;
  box-sizing: border-box;
  display: flex;
  height: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
  padding-left: 6px;
}

.icon-group {
  width: 74px;
  height: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.icon-signal {
  width: 18px;
  height: 12px;
  margin-top: 0.4px;
}

.icon-wifi {
  width: 16px;
  height: 12px;
  margin-top: 0.3px;
  margin-left: 7px;
}

.icon-battery {
  width: 26px;
  height: 12px;
  margin-left: 7px;
}

/* 导航按钮 - 历史渊源 */
.history-button {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 249px;
  height: 249px;
  background-image: url('/assets/catalog/assets/b418707e-df02-485f-b3af-6903c6d80b7d.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-button:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.history-button:active {
  transform: scale(0.98);
}

.button-content {
  width: 231px;
  height: 230px;
  box-sizing: border-box;
  margin-bottom: 7px;
  margin-right: 9px;
  position: relative;
}

.button-image {
  width: 231px;
  height: 230px;
  position: absolute;
  top: 0;
  left: 0;
}

.history-text {
  position: absolute;
  top: 43px;
  left: 96px;
  width: 48px;
  height: 131px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 31px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 4px;
}

/* 导航按钮 - 制作流程 */
.process-button {
  position: absolute;
  top: 426px;
  left: 63px;
  width: 249px;
  height: 249px;
  background-image: url('/assets/catalog/assets/7aad390d-1b87-40fb-9e86-64467c3d3956.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.3s ease;
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
  top: 51px;
  left: 111px;
  width: 48px;
  height: 198px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 31px;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 4px;
}

.button-content-wrapper {
  width: 231px;
  height: 230px;
  box-sizing: border-box;
  position: absolute;
  top: 14px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 11px;
  color: rgba(226, 213, 197, 1);
  line-height: normal;
  font-weight: normal;
}

.history-subtitle {
  top: 213px;
  left: 41px;
  width: 180px;
  height: 467px;
  transform: rotate(89.8375581215239deg);
}

.process-subtitle {
  position: absolute;
  top: 487px;
  left: 41px;
  width: 180px;
  height: 467px;
  transform: rotate(89.8375581215239deg);
}

/* 底部装饰 */
.bottom-decoration {
  width: 372px;
  height: 131px;
  margin-top: 31px;
  margin-left: 141px;
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .catalog-container {
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
}
</style>
