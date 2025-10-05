<template>
  <div class="process-container">
    <div class="process-wrapper">
      <!-- 开始按钮 -->
      <div class="start-button" @click="startProcess">
        <div class="start-button-text">
          <span>开始</span>
        </div>
      </div>

      <!-- 顶部装饰和状态栏 -->
      <div class="top-section">
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
                  <img src="/assets/process/assets/1350c3af-ee1f-45e5-88ce-e48ddc667d8d.png" class="icon-signal" alt="信号" />
                  <img src="/assets/process/assets/53325b2c-83d7-466a-b377-5d84143450cf.png" class="icon-wifi" alt="WiFi" />
                  <img src="/assets/process/assets/56b9a4d9-a0cf-42e1-ba80-a6b7e9ef32de.png" class="icon-battery" alt="电量" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 制皮 -->
      <div class="step-card step-1" @click="goToZhiPiDetail">
        <div class="step-label">
          <span>制皮</span>
        </div>
      </div>

      <!-- 竖排标题"创作过程" -->
      <div class="page-title-vertical">
        <span>创作过程</span>
      </div>

      <!-- 敷彩 -->
      <div class="step-card step-2" @click="goToFuCaiDetail">
        <div class="step-label">
          <span>敷彩</span>
        </div>
      </div>

      <!-- 熨烫 -->
      <div class="step-card step-3" @click="goToYunTangDetail">
        <div class="step-label">
          <span>熨烫</span>
        </div>
      </div>

      <!-- 缀结 -->
      <div class="step-card step-4" @click="goToZhuiJieDetail">
        <div class="step-label">
          <span>缀结</span>
        </div>
      </div>

      <!-- 过稿 -->
      <div class="step-card step-5" @click="goToGuoGaoDetail">
        <div class="step-label">
          <span>过稿</span>
        </div>
      </div>

      <!-- 雕刻 -->
      <div class="step-card step-6" @click="goToDiaoKeDetail">
        <div class="step-label">
          <span>雕刻</span>
        </div>
      </div>

      <!-- 底部装饰 -->
      <img src="/assets/process/assets/49c23a8f-95ed-4847-843f-cab29166cf58.png" class="bottom-decoration" alt="" />
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

// 开始制作流程
const startProcess = () => {
  // 跳转到制皮交互页面
  router.push('/zhipi-process-page1');
};

// 返回上一页
const goBack = () => {
  router.back();
};

// 跳转到制皮详情页
const goToZhiPiDetail = () => {
  router.push('/zhipi-detail');
};

// 跳转到过稿详情页
const goToGuoGaoDetail = () => {
  router.push('/guogao-detail');
};

// 跳转到雕刻详情页
const goToDiaoKeDetail = () => {
  router.push('/diaoke-detail');
};

// 跳转到敷彩详情页
const goToFuCaiDetail = () => {
  router.push('/fucai-detail');
};

// 跳转到熨烫详情页
const goToYunTangDetail = () => {
  router.push('/yuntang-detail');
};

// 跳转到缀结详情页
const goToZhuiJieDetail = () => {
  router.push('/zhuijie-detail');
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
.process-container {
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 1500px;
  overflow: hidden;
  box-sizing: border-box;
  background: rgba(232, 228, 216, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 主包装器 */
.process-wrapper {
  width: 375px;
  height: 1500px;
  position: relative;
}

/* 开始按钮 */
.start-button {
  width: 298px;
  height: 57px;
  border-radius: 59px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 1262px;
  left: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.start-button:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.3);
}

.start-button:active {
  transform: scale(0.98);
}

.start-button-text {
  width: 242px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 31px;
  white-space: nowrap;
  text-align: center;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  flex-shrink: 0;
}

/* 顶部区域 */
.top-section {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  height: 136px;
  background-image: url('/assets/process/assets/da63d600-85cf-4d75-b12d-f32b3881e2e5.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* 状态栏 */
.status-bar {
  width: 375px;
  height: 47px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
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

/* 步骤卡片基础样式 */
.step-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.step-label {
  margin-top: 64px;
  width: 48px;
  height: 131px;
  opacity: 0.8;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 34px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  flex-shrink: 0;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 2px;
}

/* 制皮 */
.step-1 {
  top: 198px;
  left: 29px;
  width: 346px;
  height: 618px;
  background-image: url('/assets/process/assets/0d1b0f77-ec3c-492a-912d-407caa68d299.png');
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1;
}

.step-1:hover {
  transform: scale(1.02);
}

.step-1:active {
  transform: scale(0.98);
}

.step-1 .step-label {
  margin-right: 32px;
}

/* 敷彩 */
.step-2 {
  top: 700px;
  left: 31px;
  width: 344px;
  height: 618px;
  background-image: url('/assets/process/assets/0e407c05-f793-4e3a-93f4-90f9bcad53e4.png');
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 4;
}

.step-2:hover {
  transform: scale(1.02);
}

.step-2:active {
  transform: scale(0.98);
}

.step-2 .step-label {
  margin-right: 31px;
}

/* 熨烫 */
.step-3 {
  top: 869px;
  left: 31px;
  width: 344px;
  height: 618px;
  background-image: url('/assets/process/assets/3bf472f5-d460-471e-8778-7bab7b64c106.png');
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 5;
}

.step-3:hover {
  transform: scale(1.02);
}

.step-3:active {
  transform: scale(0.98);
}

.step-3 .step-label {
  margin-right: 31px;
}

/* 缀结 */
.step-4 {
  top: 1043px;
  left: 31px;
  width: 344px;
  height: 457px;
  background-image: url('/assets/process/assets/24042d2a-effc-44a9-9e58-18dfd111dd2d.png');
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 6;
}

.step-4:hover {
  transform: scale(1.02);
}

.step-4:active {
  transform: scale(0.98);
}

.step-4 .step-label {
  margin-right: 31px;
}

/* 过稿 */
.step-5 {
  top: 367px;
  left: 28px;
  width: 347px;
  height: 618px;
  background-image: url('/assets/process/assets/2c61f2f3-543b-42ed-8317-4ee089ee95c5.png');
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 2;
}

.step-5:hover {
  transform: scale(1.02);
}

.step-5:active {
  transform: scale(0.98);
}

.step-5 .step-label {
  margin-right: 33px;
}

/* 雕刻 */
.step-6 {
  top: 532px;
  left: 31px;
  width: 344px;
  height: 618px;
  background-image: url('/assets/process/assets/c12b897b-24bf-4427-b8bb-8fd77e65fcc8.png');
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 3;
}

.step-6:hover {
  transform: scale(1.02);
}

.step-6:active {
  transform: scale(0.98);
}

.step-6 .step-label {
  margin-right: 31px;
}

/* 竖排标题"创作过程" */
.page-title-vertical {
  position: absolute;
  top: 70px;
  left: 34px;
  width: 48px;
  height: 198px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 46px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 4px;
}

/* 底部装饰 */
.bottom-decoration {
  width: 372px;
  height: 129px;
  position: absolute;
  top: 1371px;
  left: 2px;
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .process-container {
    width: 100vw;
  }
}
</style>
