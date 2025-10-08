<template>
  <div class="preface-container">
    <div class="content-wrapper">
      <div class="main-content">
        <!-- 背景装饰图 -->
        <img src="/assets/b29ba3c3-f311-4184-b6b7-cd0901301fc0.png" class="bg-image-1" alt=""  style="width: 283.5px; height: 527.4px;" />
        <img src="/assets/5af59429-d714-4359-8fce-0abd94ef81b4.png" class="bg-image-2" alt="" style="width: 283.5px; height: 527.4px;" />
        <img src="/assets/21295c72-0b34-4806-8cbb-7422114eef2a.png" class="bg-image-3" alt="" style="transform: scale(0.9) translateX(10px) translateY(-40px); transform-origin: top left;" />
        
        <!-- 标题文字（竖排） -->
        <div class="title-text" style="top: 49px;">
          <span>借 AI 之笔，唤醒千年光影艺术</span>
        </div>
        
        <!-- 英文副标题 -->
        <div class="subtitle-text">
          <span>Zhi Hui Pi Ying: Tradition Reimagined at Your Fingertips.</span>
        </div>
        
        <!-- 状态栏 -->
        <div class="status-bar">
          <div class="status-bar-content">
            <div class="status-bar-inner">
              <!-- 时间 -->
              <div class="time-display">
                <div class="time-text-bar">
                  <span>{{ currentTime }}</span>
                </div>
              </div>
              
              <!-- 占位空间 -->
              <div class="spacer"></div>
              
              <!-- 状态图标 -->
              <div class="status-icons">
                <div class="icon-group">
                  <img src="/assets/ec20d78f-b299-4923-aef4-330d4351ffde.png" class="icon-signal" alt="信号" />
                  <img src="/assets/ae7e5bfa-8384-42de-b35d-3693440308c5.png" class="icon-wifi" alt="WiFi" />
                  <img src="/assets/3b301d1f-1908-4eb5-92c4-6a6075ad4e68.png" class="icon-battery" alt="电量" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      
      <!-- 点击开启按钮 -->
      <div class="button-wrapper" @click="startExperience" style="margin-top: 5px;">
        <img src="/assets/aa5cd602-2c4d-438e-be4c-d0b4e8037055.png" class="button-bg" alt="" />
        <div class="button-text" style="top: -20px; left: 105px;">
          <span>点击开启</span>
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

// 开启体验
const startExperience = () => {
  router.push('/catalog');
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
.preface-container {
  width: 100%;
  max-width: 375px;
  height: 813px;
  overflow: hidden;
  background: rgba(226, 213, 197, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 内容包装器 */
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-image: url('/assets/e3dce942-65f8-42f5-96a7-89e59a9ef9c9.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* 主内容区域 */
.main-content {
  width: 100%;
  height: 653px;
  position: relative;
}

/* 背景装饰图 */
.bg-image-1 {
  width: 312px;
  height: 586px;
  position: absolute;
  top: 55px;
  left: 32px;
}

.bg-image-2 {
  width: 315px;
  height: 586px;
  position: absolute;
  top: 55px;
  left: 30px;
}

.bg-image-3 {
  width: 375px;
  height: 510px;
  position: absolute;
  top: 143px;
  left: 0;
}

/* 标题文字（竖排） */
.title-text {
  position: absolute;
  top: 29px;
  left: 335px;
  width: 25px;
  height: 260px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 15px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 29px;
  left: 172px;
  width: 163px;
  height: 467px;
  transform: rotate(89.8375581215239deg);
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 11px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

/* 状态栏 */
.status-bar {
  width: 100%;
  height: 47px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

.status-bar-content {
  width: 100%;
  height: 21px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.status-bar-inner {
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* 时间显示 */
.time-display {
  width: 128px;
  height: 21px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 6px;
  padding-left: 15px;
}

.time-text-bar {
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
  min-height: 10px;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

/* 状态图标 */
.status-icons {
  width: 128px;
  height: 12px;
  display: flex;
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

/* Logo 图片 */
.logo-image {
  width: 207px;
  height: 23px;
  margin-top: 9px;
  margin-left: 84px;
}

/* 按钮包装器 */
.button-wrapper {
  width: 282px;
  height: 115px;
  margin-top: 7px;
  margin-left: 46px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button-wrapper:hover {
  transform: scale(1.05);
}

.button-wrapper:active {
  transform: scale(0.95);
}

.button-bg {
  width: 282px;
  height: 106px;
  position: absolute;
  top: 10px;
  left: 0;
}

.button-text {
  position: absolute;
  top: 0;
  left: 106px;
  width: 136px;
  height: 28px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 19px;
  white-space: nowrap;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .preface-container {
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
}
</style>

