<template>
  <div class="history-container">
    <!-- 背景图层 -->
    <div class="background-layer">
      <!-- 竖排标题 -->
      <div class="page-title-vertical">
        <span>历史渊源</span>
      </div>

      <!-- 返回按钮 -->
      <div class="back-button" @click="goBack"></div>

      <!-- 返回箭头装饰 -->
      <div class="back-arrow-decoration">
        <img src="/assets/history/assets/4abf8cdf-6ef0-47d4-ad78-3514e8d887dc.png" class="arrow-icon" alt="" />
      </div>

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
                <img src="/assets/history/assets/493f7f5f-2fb1-44b1-aa54-c5de17784eae.png" class="icon-signal" alt="信号" />
                <img src="/assets/history/assets/83efd681-03c6-4cbe-8d8a-682debb335ee.png" class="icon-wifi" alt="WiFi" />
                <img src="/assets/history/assets/09b70a94-f797-4a59-9034-e7352fa73d81.png" class="icon-battery" alt="电量" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 正文内容 -->
    <div class="content-text">
      <div class="text-line">皮影戏起源于西汉，</div>
      <div class="text-line">距今已有两千多年历史。</div>
      <div class="text-line">史载汉武帝因思念李夫人，</div>
      <div class="text-line">方士设帐弄影以慰哀思，</div>
      <div class="text-line">成为皮影雏形。</div>
      <div class="text-line"></div>
      <div class="text-line">唐宋时期，皮影戏渐趋成熟，</div>
      <div class="text-line">成为市井流行演艺。</div>
      <div class="text-line">元代起，皮影随商队西传，</div>
      <div class="text-line">对早期电影发明产生启蒙作用。</div>
      <div class="text-line"></div>
      <div class="text-line">这门融合剪纸、戏曲与光影的艺术，</div>
      <div class="text-line">被誉为"最早的电影"，</div>
      <div class="text-line">至今仍在幕布后演绎着</div>
      <div class="text-line">千年不绝的东方传奇。</div>
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

// 返回上一页
const goBack = () => {
  router.back();
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
.history-container {
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 813px;
  overflow: hidden;
  box-sizing: border-box;
  background: #E2D5C5;
}

/* 背景图层 */
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 375px;
  height: 813px;
  background-image: url('/assets/history/assets/74dd3dfa-1119-4b07-8c90-a92ee4e89245.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* 竖排标题 */
.page-title-vertical {
  position: absolute;
  top: 22px;
  left: 299px;
  width: 48px;
  height: 230px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 46px;
  line-height: normal;
  color: #64463F;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 4px;
}

/* 返回按钮 */
.back-button {
  position: absolute;
  width: 39px;
  height: 39px;
  left: 20px;
  top: 78px;
  background-image: url('/assets/history/assets/a52970a3-cce8-48f2-a31f-4b64c497f093.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: scale(1.1);
  filter: brightness(1.1);
}

.back-button:active {
  transform: scale(0.95);
}

/* 返回箭头装饰 */
.back-arrow-decoration {
  width: 122px;
  height: 69px;
  box-sizing: border-box;
  position: absolute;
  top: 40px;
  left: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  pointer-events: none;
}

.arrow-icon {
  width: 19px;
  height: 28px;
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
  font-style: normal;
  font-weight: 590;
  font-size: 16px;
  line-height: 21px;
  white-space: nowrap;
  text-align: center;
  color: #000000;
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

/* 正文内容 */
.content-text {
  position: absolute;
  top: 384px;
  left: 47px;
  width: 344px;
  height: 487px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: normal;
  color: #64463F;
}

.text-line {
  padding-bottom: 5px;
}

.text-line:last-child {
  padding-bottom: 0;
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .history-container {
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
}
</style>
