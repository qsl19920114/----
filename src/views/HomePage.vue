<template>
  <div class="main-container" @click="goToPreface">
    <div class="background-wrapper">
      <div class="content-wrapper">
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
                  <img src="/assets/02919301-bb2d-434c-a9ea-19183d0dddcc.png" class="icon-signal" alt="信号" />
                  <img src="/assets/b1a2a707-31bd-413c-b6ca-35bd68c5a89b.png" class="icon-wifi" alt="WiFi" />
                  <img src="/assets/bc20a740-f96c-4666-8631-299f329d309a.png" class="icon-battery" alt="电量" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 主图片 -->
        <img src="/assets/0525f8a2-8c6d-4a13-bbad-c8618bf6e15f.png" class="main-image" alt="皮影艺术" />
        
        <!-- 标题文字 -->
        <div class="title-text">
          <span>智绘皮影，让传统在指尖新生</span>
        </div>
      </div>
    </div>
    
    <!-- 英文副标题 -->
    <div class="subtitle-text">
      <span>Zhi Hui Pi Ying: Tradition Reimagined at Your Fingertips.</span>
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

// 跳转到序页
const goToPreface = () => {
  router.push('/preface');
};

let timer = null;

onMounted(() => {
  updateTime();
  // 每分钟更新一次时间
  timer = setInterval(updateTime, 60000);
  
  // 防止双击缩放
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* 主容器 */
.main-container {
  width: 100%;
  max-width: 375px;
  height: 813px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  position: relative;
  cursor: pointer;
}

/* 背景层 */
.background-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('/assets/47426c18-9314-4eb5-b256-2c9295ee7481.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* 内容层 */
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-image: url('/assets/29115b2b-97a4-4c7f-b905-a52f200dd6ca.png');
  background-size: 190% 200%;
  background-repeat: no-repeat;
}

/* 状态栏 */
.status-bar {
  width: 100%;
  height: 47px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
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

/* 主图片 */
.main-image {
  width: 203px;
  height: 302px;
}

/* 标题文字 */
.title-text {
  margin-top: 58px;
  margin-left: 56px;
  width: 25px;
  height: 260px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 15px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  flex-shrink: 0;
}

/* 英文标题 */
.subtitle-text {
  position: absolute;
  top: 336px;
  left: -107px;
  width: 143px;
  height: 297px;
  transform: rotate(89.8375581215239deg);
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 11px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .main-container {
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
}
</style>

