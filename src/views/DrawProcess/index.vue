<template>
  <div class="draw-process-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <!-- 时间 -->
        <div class="time-display">
          <div class="time-text">{{ currentTime }}</div>
        </div>
        
        <!-- 占位空间 -->
        <div class="spacer"></div>
        
        <!-- 状态图标 -->
        <div class="status-icons">
          <img src="/assets/DrawProcess/assets/25be22f7-7f53-44ee-b70f-9b4ea6073d6b.png" class="icon-signal" alt="信号" />
          <img src="/assets/DrawProcess/assets/61caf69b-2958-40e9-acd5-410ca631ef89.png" class="icon-wifi" alt="WiFi" />
          <div class="battery-icon">
            <div class="battery-border"></div>
            <div class="battery-cap"></div>
            <div class="battery-capacity"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景图片 -->
    <img src="/assets/DrawProcess/assets/e05c510d-f0ac-46c0-8f9b-6e7c99984677.png" class="bg-image" alt="背景" />

    <!-- 标题 -->
    <div class="title-text">画稿</div>
    <div class="subtitle-text">Drawing Shadow Puppet Drafts</div>

    <!-- 顶部装饰条 -->
    <div class="top-decoration"></div>

    <!-- 画布区域 -->
    <div class="canvas-area">
      <!-- 上传的图片显示 -->
      <img 
        v-if="uploadedImage" 
        :src="uploadedImage" 
        class="uploaded-image" 
        alt="上传的图片"
      />
      
      <!-- 上传按钮（圆形加号） -->
      <div v-if="!uploadedImage" class="upload-button" @click="triggerFileUpload">
        <div class="plus-icon">
          <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
            <path d="M24 5 L24 47 M5 26 L43 26" stroke="#C6A268" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- 隐藏的文件输入 -->
      <input 
        ref="fileInput"
        type="file" 
        accept="image/*" 
        @change="handleFileUpload"
        style="display: none"
      />
    </div>

    <!-- 底部装饰条 -->
    <div class="bottom-decoration"></div>

    <!-- 提示文字 -->
    <div class="hint-container">
      <div class="hint-dot"></div>
      <div class="hint-text">请点击加号上传一张图片</div>
    </div>

    <!-- 确认按钮 -->
    <div 
      class="confirm-button" 
      :class="{ 'active': uploadedImage }" 
      @click="confirmUpload"
    >
      <span>确认</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const fileInput = ref(null);
const uploadedImage = ref(null);

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

// 触发文件选择
const triggerFileUpload = () => {
  fileInput.value?.click();
};

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 确认上传
const confirmUpload = () => {
  if (!uploadedImage.value) {
    // 如果没有上传图片，提示用户
    alert('请先上传一张图片');
    return;
  }
  
  // 跳转到加载页面
  router.push('/draw-process-loading');
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
/* 主容器 - 画稿 */
.draw-process-container {
  position: relative;
  width: 100%;
  max-width: 393px;
  height: 852px;
  background: #FFFFFF;
  overflow: hidden;
  margin: 0 auto;
}

/* 状态栏 - iPhone */
.status-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px 0 0;
  position: absolute;
  width: 393px;
  height: 49px;
  left: 0;
  top: 0;
  z-index: 100;
}

.status-bar-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  gap: 134px;
  width: 393px;
  height: 22px;
}

.time-display {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 6px 0 16px;
  gap: 10px;
  margin: 0 auto;
  width: 134.5px;
  height: 22px;
  flex: none;
  order: 0;
  flex-grow: 1;
}

.time-text {
  width: 37px;
  height: 22px;
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-style: normal;
  font-weight: 590;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
}

/* Dynamic Island spacer */
.spacer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  width: 124px;
  height: 10px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

/* Levels */
.status-icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px 0 6px;
  gap: 7px;
  margin: 0 auto;
  width: 134.5px;
  height: 13px;
  flex: none;
  order: 2;
  flex-grow: 1;
}

/* Cellular Connection */
.icon-signal {
  width: 19.2px;
  height: 12.23px;
  background: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
}

/* Wifi */
.icon-wifi {
  width: 17.14px;
  height: 12.33px;
  background: #000000;
  flex: none;
  order: 1;
  flex-grow: 0;
}

/* Battery */
.battery-icon {
  width: 27.33px;
  height: 13px;
  position: relative;
  flex: none;
  order: 2;
  flex-grow: 0;
}

/* Border */
.battery-border {
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  left: calc(50% - 25px/2 + 0.67px);
  top: 0%;
  bottom: 0%;
  mix-blend-mode: normal;
  opacity: 0.35;
  border: 1px solid #000000;
  border-radius: 4.3px;
}

/* Cap */
.battery-cap {
  position: absolute;
  width: 1.33px;
  left: calc(50% - 1.33px/2 + 14.83px);
  top: 36.78%;
  bottom: 31.87%;
  background: #000000;
  mix-blend-mode: normal;
  opacity: 0.4;
}

/* Capacity */
.battery-capacity {
  position: absolute;
  width: 21px;
  left: calc(50% - 21px/2 + 0.67px);
  top: 15.38%;
  bottom: 15.38%;
  background: #000000;
  border-radius: 2.5px;
}

/* 背景图片 - image 2 */
.bg-image {
  position: absolute;
  width: 617px;
  height: 886px;
  left: calc(50% - 617px/2);
  top: -34px;
  object-fit: cover;
}

/* 画稿标题 */
.title-text {
  position: absolute;
  width: 50px;
  height: 137px;
  left: 313px;
  top: 63px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 63px;
  color: #64463F;
  z-index: 10;
}

/* Drawing Shadow Puppet Drafts */
.subtitle-text {
  position: absolute;
  width: 489px;
  height: 187.38px;
  left: 191px;
  top: 72px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #A02D18;
  transform: rotate(89.84deg);
  z-index: 10;
}

/* Rectangle 4 - 顶部装饰条 */
.top-decoration {
  position: absolute;
  width: 321px;
  height: 23px;
  left: 36px;
  top: 197px;
  background: #D9D9D9;
  border-radius: 8px;
  transform: matrix(1, 0, 0, -1, 0, 0);
}

/* 画布区域 - image 1 */
.canvas-area {
  position: absolute;
  width: 303px;
  height: 436px;
  left: 46px;
  top: 198px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 上传的图片 */
.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: fadeIn 0.5s ease-in-out;
}

/* Ellipse 18 - 上传按钮圆形 */
.upload-button {
  width: 89px;
  height: 89px;
  background: #D9D9D9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.upload-button:hover {
  background: #C6A268;
  transform: scale(1.1);
}

.upload-button:active {
  transform: scale(0.95);
}

/* Vector 4 - 加号图标 */
.plus-icon {
  width: 48px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Rectangle 5 - 底部装饰条 */
.bottom-decoration {
  position: absolute;
  width: 339px;
  height: 29px;
  left: 27px;
  top: 620px;
  background: #D9D9D9;
  border-radius: 8px;
}

/* 提示文字容器 */
.hint-container {
  position: absolute;
  left: 52px;
  top: 667px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Ellipse 34 - 红点 */
.hint-dot {
  width: 17px;
  height: 17px;
  background: #A02D18;
  border-radius: 50%;
}

/* 请点击加号上传一张图片 */
.hint-text {
  width: 254px;
  height: 26px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #64463F;
}

/* Rectangle 7 + 确认 - 确认按钮 */
.confirm-button {
  position: absolute;
  width: 312px;
  height: 60px;
  left: calc(50% - 312px/2 + 0.5px);
  top: 711px;
  background: #FFFFFF;
  border-radius: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0.5;
  pointer-events: none;
}

.confirm-button.active {
  opacity: 1;
  pointer-events: auto;
  box-shadow: 0 4px 16px rgba(160, 45, 24, 0.3);
}

.confirm-button:hover {
  background: #F5F5F5;
  transform: scale(1.02);
}

.confirm-button:active {
  transform: scale(0.98);
}

.confirm-button span {
  width: 254px;
  height: 42px;
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
  color: #64463F;
}

/* 动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .draw-process-container {
    width: 100vw;
    height: 100vh;
    min-height: 852px;
  }
}
</style>

