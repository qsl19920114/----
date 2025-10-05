<template>
  <div class="complete-page-container">
    <!-- 背景 -->
    <div class="background-layer"></div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="status-bar-left">
          <div class="time-display">
            <span class="time-text">{{ currentTime }}</span>
          </div>
        </div>
        <div class="status-bar-center"></div>
        <div class="status-bar-right">
          <img 
            src="/assets/OverProcess/step3/assets/f89e3332-7393-4d92-870d-c138b2476c09.png" 
            class="icon-signal" 
            alt="信号"
          />
          <img 
            src="/assets/OverProcess/step3/assets/8f19aff8-7af5-4a1a-bf3c-501413fc055a.png" 
            class="icon-wifi" 
            alt="WiFi"
          />
          <img 
            src="/assets/OverProcess/step3/assets/e06ead57-de0c-4f3e-b893-c0cc3625d578.png" 
            class="icon-battery" 
            alt="电量"
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 内容背景（要被抽走的纸张） -->
      <div class="content-background" :class="{ 'paper-removing': paperRemoved }">
        <!-- 原始图片 -->
        <img 
          v-if="selectedImage" 
          :src="selectedImage" 
          alt="图案" 
          class="base-image"
        />

        <!-- 英文副标题 -->
        <div class="subtitle-text">Transferring Shadow Puppet Drafts to Leather</div>
      </div>

      <!-- 完成后的纸张层（留下的纸张） -->
      <div class="paper-layer-complete">
        <img 
          v-if="selectedImage" 
          :src="selectedImage" 
          alt="完成效果" 
          class="paper-image-complete"
        />

        <!-- 毛笔图标（在终点） -->
        <div class="brush-container-complete">
          <img 
            src="/assets/OverProcess/step3/assets/a3fa476c-d678-48c3-9f39-b4b3d470abeb.png" 
            alt="毛笔"
            class="brush-image-complete"
          />

          <!-- 完整进度条 -->
          <div class="slider-container-complete">
            <div class="slider-track-complete">
              <div class="slider-fill-complete"></div>
              <div class="slider-thumb-complete"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 标题"过稿" -->
      <div class="page-title">过稿</div>
    </div>

    <!-- 完成提示和操作按钮 -->
    <div class="action-panel" :class="{ 'show': showActions }">
      <!-- 完成图标和文字 -->
      <div class="completion-badge">
        <div class="check-icon">✓</div>
        <div class="completion-text">过稿完成！</div>
        <div class="completion-desc">已成功将图样转移到皮革上</div>
      </div>

      <!-- 操作按钮 -->
      <div class="button-group">
        <div class="action-button secondary" @click="goBack">
          <span>重新过稿</span>
        </div>
        <div class="action-button primary" @click="continueNext">
          <span>继续制作</span>
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
const selectedImage = ref(null);
const showActions = ref(false);
const paperRemoved = ref(false);

// 定时器
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

// 返回重新过稿
const goBack = () => {
  router.push('/over-process');
};

// 继续下一步
const continueNext = () => {
  router.push('/crave-start');
};

onMounted(() => {
  // 获取选中的图片
  const storedImage = sessionStorage.getItem('selectedPuppetImage');
  if (storedImage) {
    selectedImage.value = storedImage;
  } else {
    selectedImage.value = '/assets/DrawProcess/page3/assets/11.png';
  }
  
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  
  // 动画时序控制
  // 1. 延迟1秒后开始抽走纸张
  setTimeout(() => {
    paperRemoved.value = true;
  }, 1000);
  
  // 2. 纸张抽走动画完成后（1秒 + 1.2秒动画），显示操作面板
  setTimeout(() => {
    showActions.value = true;
  }, 2400);
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 主容器 */
.complete-page-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 背景层 */
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  background-image: url('/assets/OverProcess/step3/assets/e53c0563-134e-4428-83a9-726604065aa3.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 状态栏 */
.status-bar {
  position: relative;
  width: 393px;
  height: 49px;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 21px;
}

.status-bar-frame {
  width: 393px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.status-bar-left {
  width: 134.5px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px 0px 16px;
  box-sizing: border-box;
}

.time-display {
  width: 37px;
  height: 22px;
}

.time-text {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  white-space: nowrap;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
  font-weight: 590;
}

.status-bar-center {
  width: 124px;
  min-height: 10px;
  height: 10px;
}

.status-bar-right {
  width: 134.5px;
  height: 13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 6px;
  gap: 7px;
  box-sizing: border-box;
}

.icon-signal {
  width: 19.2px;
  height: 12.23px;
  margin-top: 0.39px;
}

.icon-wifi {
  width: 17.14px;
  height: 12.33px;
  margin-top: 0.34px;
}

.icon-battery {
  width: 27.33px;
  height: 13px;
}

/* 主内容区域 */
.main-content {
  position: relative;
  width: 393px;
  height: 692.8px;
  margin-top: 14px;
  z-index: 2;
}

/* 内容背景（要被抽走的白色纸张） */
.content-background {
  position: absolute;
  top: 8.34px;
  left: 0;
  width: 393px;
  height: 684.46px;
  background-image: url('/assets/OverProcess/step3/assets/416cbbe7-a340-4ba8-952f-2c6663e979ad.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 5;
  transition: all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* 白色纸张抽走动画 */
.content-background.paper-removing {
  transform: translate(350px, -200px) rotate(15deg);
  opacity: 0;
  filter: blur(2px);
}

/* 原始图片（在白色纸张上） */
.base-image {
  position: absolute;
  width: 393px;
  height: 524.35px;
  top: 61.32px;
  left: 0;
  object-fit: contain;
  z-index: 1;
}

/* 完成后的纸张层（留下的皮革层） */
.paper-layer-complete {
  position: absolute;
  top: 64.96px;
  left: 0;
  width: 393px;
  height: 592.4px;
  background-image: url('/assets/OverProcess/step3/assets/e7f07f73-f5e1-463d-8666-94f3d045a3a3.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.paper-image-complete {
  position: absolute;
  width: 393px;
  height: 524.35px;
  top: 4.7px;
  left: 0;
  object-fit: contain;
  opacity: 0.9;
  filter: drop-shadow(0 4px 12px rgba(160, 45, 24, 0.3));
}

/* 毛笔容器（完成状态） */
.brush-container-complete {
  position: relative;
  width: 247px;
  height: 237px;
  margin-top: 314.7px;
  margin-left: 52px;
}

/* 毛笔图片（在终点） */
.brush-image-complete {
  position: absolute;
  width: 87.48px;
  height: 229.53px;
  top: 0;
  left: 204px;
  z-index: 10;
}

/* 进度条容器（完成） */
.slider-container-complete {
  position: absolute;
  width: 204px;
  top: 223px;
  left: 43px;
  z-index: 5;
}

/* 进度条轨道（完成） */
.slider-track-complete {
  position: relative;
  width: 204px;
  height: 14px;
  border-radius: 34px;
  border: 1px solid rgba(160, 45, 24, 1);
  background: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
}

/* 进度条填充（100%） */
.slider-fill-complete {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(160, 45, 24, 0.8), rgba(193, 58, 38, 1));
  border-radius: 34px;
  box-shadow: 0 0 12px rgba(160, 45, 24, 0.6);
}

/* 滑块（在终点） */
.slider-thumb-complete {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: rgba(160, 45, 24, 1);
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(160, 45, 24, 0.5);
  z-index: 10;
}

/* 英文副标题（在白色纸张上） */
.subtitle-text {
  position: absolute;
  top: 0.66px;
  left: 191px;
  width: 188.76px;
  height: 489.53px;
  transform: rotate(89.8375581215239deg);
  transform-origin: left top;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 12px;
  color: rgba(160, 45, 24, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 1;
}

/* 标题"过稿" */
.page-title {
  position: absolute;
  top: 0;
  left: 313px;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  z-index: 10;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

/* 操作面板 */
.action-panel {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(40px);
  width: 350px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.action-panel.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 完成徽章 */
.completion-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 勾选图标 */
.check-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(160, 45, 24, 1), rgba(193, 58, 38, 1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #FFFFFF;
  animation: checkBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* 完成文字 */
.completion-text {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 26px;
  color: rgba(160, 45, 24, 1);
  font-weight: 500;
}

/* 完成描述 */
.completion-desc {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 16px;
  color: rgba(100, 70, 63, 0.8);
  text-align: center;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 16px;
  width: 100%;
}

/* 操作按钮 */
.action-button {
  flex: 1;
  height: 56px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(160, 45, 24, 0.3);
}

.action-button.secondary span {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 20px;
  color: rgba(160, 45, 24, 1);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(160, 45, 24, 0.6);
  transform: translateY(-2px);
}

.action-button.primary {
  background: linear-gradient(135deg, rgba(160, 45, 24, 1), rgba(193, 58, 38, 1));
}

.action-button.primary span {
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 20px;
  color: #FFFFFF;
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(160, 45, 24, 0.4);
}

.action-button:active {
  transform: translateY(0);
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .complete-page-container {
    width: 100vw;
  }
}
</style>

