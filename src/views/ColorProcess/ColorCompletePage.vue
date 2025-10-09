<template>
  <div class="color-complete-container">
    <!-- 返回按钮 -->
    <div class="back-button-wrapper">
      <img 
        src="/assets/ColorProcess/complete/assets/d4de8669-7a52-4604-8e0f-44b66cb50ad4.png" 
        alt="返回按钮" 
        class="back-button"
        @click="handleBackClick"
      />
    </div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/ColorProcess/complete/assets/c77786b5-4ebe-423b-8cb2-432453f626e3.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/ColorProcess/complete/assets/b9eb68e1-c411-4dda-a203-95c4e21f650a.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/ColorProcess/complete/assets/d9bd3f67-cc4d-4462-95f0-0bdc78e4be10.png" 
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

      <!-- 左侧装饰云朵框 -->
      <div class="left-cloud-frame">
        <img 
          src="/assets/ColorProcess/complete/assets/04d26e05-0ffa-4878-97d6-fdaf6f9754db.png" 
          alt="云朵装饰框" 
          class="cloud-frame-bg"
        />
        <!-- 左侧星星装饰 -->
        <img 
          src="/assets/ColorProcess/complete/assets/ec960cb1-a62b-4c31-be94-b89b54356e1f.png" 
          alt="星星装饰" 
          class="star-left"
        />
      </div>

      <!-- 大的背景皮影图 -->
      <div class="puppet-background">
        <img 
          src="/assets/ColorProcess/complete/assets/06193b25-37c6-457a-bd3e-a77a2fda54fa.png" 
          alt="皮影背景" 
          class="puppet-bg-image"
        />
      </div>

      <!-- 右侧大的装饰框和皮影 -->
      <div class="right-main-frame">
        <img 
          src="/assets/ColorProcess/complete/assets/691cf618-a8c2-4f3c-a39a-c1dada3fb15b.png" 
          alt="主装饰框" 
          class="main-frame-bg"
        />
        
        <!-- 内部装饰框 -->
        <div class="inner-frame-container">
          <img 
            src="/assets/ColorProcess/complete/assets/5a7605b4-346e-4d87-8617-8b4b27eee4f5.png" 
            alt="内部框" 
            class="inner-frame-bg"
          />
          
          <!-- 中间的星星装饰 -->
          <img 
            src="/assets/ColorProcess/complete/assets/89a4185e-a293-4906-a24e-4b003411ee9c.png" 
            alt="中间星星" 
            class="star-middle"
          />
          
          <!-- 人物头像容器 -->
          <div class="avatar-container">
            <!-- 人物头像 -->
            <img 
              src="/assets/ColorProcess/complete/assets/2df11049-2d93-44a9-88ce-54dd338a5479.png" 
              alt="人物头像" 
              class="character-avatar"
              @click="handleAvatarClick"
            />
            <!-- 右下角星星 -->
            <img 
              src="/assets/ColorProcess/complete/assets/396f0cdb-869f-41c9-a5e8-44d569ca5507.png" 
              alt="右下星星" 
              class="star-bottom-right"
            />
          </div>
        </div>
      </div>

      <!-- 左下角装饰图案 -->
      <div class="bottom-left-decoration">
        <img 
          src="/assets/ColorProcess/complete/assets/e67c05c8-a5af-4f6d-81b2-e857dc5b8bf1.png" 
          alt="装饰图案" 
          class="decoration-pattern"
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
  // 返回上一页
  router.back();
};

// 点击人物头像跳转到下一页
const handleAvatarClick = () => {
  // 添加点击动画效果
  const avatar = document.querySelector('.character-avatar');
  if (avatar) {
    avatar.classList.add('clicked');
    // 动画结束后移除类名
    setTimeout(() => {
      avatar.classList.remove('clicked');
    }, 600);
  }
  
  // 延迟跳转，让动画播放完成
  setTimeout(() => {
    router.push('/drag-assemble');
  }, 300);
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
.color-complete-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(226, 213, 197, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
}

/* 返回按钮 */
.back-button-wrapper {
  position: absolute;
  top: 78px;
  left: 32px;
  width: 24px;
  height: 24px;
  z-index: 110;
}

.back-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 2px 8px rgba(100, 70, 63, 0.5));
}

.back-button:active {
  transform: scale(0.95);
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
  height: 789px;
  margin-top: 60px;
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
  animation: fadeInDown 1s ease-out;
}

/* 英文副标题 */
.subtitle-text {
  position: absolute;
  top: 9px;
  left: 361px;
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
  animation: fadeInDown 1s ease-out 0.2s backwards;
}

/* 左侧装饰云朵框 */
.left-cloud-frame {
  position: absolute;
  top: 42px;
  left: 35px;
  width: 132px;
  height: 174px;
  z-index: 15;
  animation: fadeInLeft 1s ease-out 0.4s backwards;
}

.cloud-frame-bg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.star-left {
  position: absolute;
  bottom: 14px;
  left: 54px;
  width: 12px;
  height: 12px;
  animation: twinkle 2s ease-in-out 1.5s infinite;
}

/* 大的背景皮影图 */
.puppet-background {
  position: absolute;
  top: 167px;
  left: 0;
  width: 393px;
  height: 392px;
  z-index: 5;
  animation: fadeIn 1.5s ease-out 0.6s backwards;
}

.puppet-bg-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 右侧大的装饰框 */
.right-main-frame {
  position: absolute;
  top: 129px;
  left: 0;
  width: 393px;
  height: 660px;
  z-index: 10;
}

.main-frame-bg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: fadeIn 1s ease-out 0.8s backwards;
}

/* 内部装饰框容器 */
.inner-frame-container {
  position: absolute;
  bottom: 73px;
  right: 33px;
  width: 178px;
  height: 265px;
  animation: scaleUp 1.2s ease-out 1s backwards;
}

.inner-frame-bg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 中间的星星装饰 */
.star-middle {
  position: absolute;
  top: 86px;
  left: 85px;
  width: 12px;
  height: 12px;
  animation: twinkle 2s ease-in-out 2s infinite;
}

/* 人物头像容器 */
.avatar-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 61px;
}

/* 人物头像 - 慢慢浮现 */
.character-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 56px;
  object-fit: contain;
  animation: avatarAppear 1.5s ease-out 1.2s backwards;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 人物头像悬停效果 */
.character-avatar:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2);
  filter: brightness(1.1) saturate(1.2);
}

/* 人物头像点击波纹效果 */
.character-avatar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease-out;
  pointer-events: none;
  z-index: -1;
}

.character-avatar:active::before {
  width: 120px;
  height: 120px;
  opacity: 0;
}

/* 点击时的脉冲动画 */
@keyframes clickPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0.3), 0 0 0 20px rgba(255, 215, 0, 0.1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.character-avatar.clicked {
  animation: clickPulse 0.6s ease-out;
}

/* 右下角星星 */
.star-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  animation: twinkle 2s ease-in-out 2.5s infinite;
}

/* 左下角装饰图案 */
.bottom-left-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90px;
  height: 110px;
  z-index: 3;
  animation: fadeInUp 1s ease-out 1.5s backwards;
}

.decoration-pattern {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ========== 动画定义 ========== */

/* 人物头像浮现动画 */
@keyframes avatarAppear {
  0% {
    opacity: 0;
    transform: scale(0.5);
    filter: blur(10px);
  }
  50% {
    opacity: 0.5;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

/* 星星闪烁动画 */
@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
  }
  25% {
    opacity: 0.4;
    transform: scale(0.8);
    filter: brightness(1.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    filter: brightness(2);
  }
  75% {
    opacity: 0.6;
    transform: scale(0.9);
    filter: brightness(1.3);
  }
}

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

/* 从左淡入 */
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 从下淡入 */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放弹出 */
@keyframes scaleUp {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .color-complete-container {
    width: 100vw;
  }
}
</style>

