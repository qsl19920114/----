<template>
  <div class="music-page-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-bar-frame">
        <div class="time-display">
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <div class="dynamic-island-spacer"></div>
        <div class="levels">
          <img 
            src="/assets/music/assets/a837f61b-2952-4127-b1dc-5cee1eb9a361.png" 
            alt="信号" 
            class="icon-signal" 
          />
          <img 
            src="/assets/music/assets/8686ff53-2e9b-4d03-b2af-80cc727d9fee.png" 
            alt="WiFi" 
            class="icon-wifi" 
          />
          <img 
            src="/assets/music/assets/7166988a-a961-45f8-af40-b976df30869f.png" 
            alt="电量" 
            class="icon-battery" 
          />
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 背景图 -->
      <img 
        src="/assets/music/assets/49f248ca-faac-42d2-a3ee-19b4c1260a29.png" 
        alt="背景" 
        class="background-image"
      />

      <!-- 中间音乐展示区域 -->
      <div class="music-display-container">
        <div class="music-white-box">
          <transition name="fade-scale" mode="out-in">
            <img 
              :key="currentMusicIndex"
              :src="musicList[currentMusicIndex].image" 
              :alt="musicList[currentMusicIndex].name" 
              class="music-character-image"
            />
          </transition>
        </div>
        
        <!-- 标题"配乐" -->
        <div class="page-title">配乐</div>
      </div>

      <!-- 底部播放器区域 -->
      <div class="player-container">
        <!-- 背景装饰 -->
        <img 
          src="/assets/music/assets/e197f3dc-d291-44a8-b2fd-5df5bb80352e.png" 
          alt="播放器背景" 
          class="player-background"
        />
        
        <!-- 三个可点击的音乐选择热区 -->
        <div class="music-selector-container">
          <!-- 提琴 - 左侧 -->
          <div 
            class="music-hotspot music-hotspot-left"
            :class="{ 'active': currentMusicIndex === 0 }"
            @click="selectMusic(0)"
          >
            <div class="music-glow" v-if="currentMusicIndex === 0"></div>
          </div>
          
          <!-- 脸谱 - 中间 -->
          <div 
            class="music-hotspot music-hotspot-center"
            :class="{ 'active': currentMusicIndex === 1 }"
            @click="selectMusic(1)"
          >
            <div class="music-glow" v-if="currentMusicIndex === 1"></div>
          </div>
          
          <!-- 仙鹤 - 右侧 -->
          <div 
            class="music-hotspot music-hotspot-right"
            :class="{ 'active': currentMusicIndex === 2 }"
            @click="selectMusic(2)"
          >
            <div class="music-glow" v-if="currentMusicIndex === 2"></div>
          </div>
        </div>
        
        <!-- 播放控制器 -->
        <div class="player-control" @click="handlePlayClick">
          <img 
            src="/assets/music/assets/fbce82b6-845b-4021-91f6-922d38edd364.png" 
            alt="播放按钮背景" 
            class="player-button-bg"
          />
          <img 
            :src="isPlaying ? '/assets/music/assets/8fab8937-64cc-40a0-8551-2ed1b4eee2c5.png' : '/assets/music/assets/8fab8937-64cc-40a0-8551-2ed1b4eee2c5.png'" 
            alt="播放图标" 
            class="player-icon"
            :class="{ 'playing': isPlaying }"
          />
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
const isPlaying = ref(false);
const currentMusicIndex = ref(1); // 默认选中中间的脸谱

// 三个音乐数据
const musicList = [
  {
    id: 1,
    name: '民间小调',
    image: '/assets/music/assets/438439b6-f6b6-48b7-85e3-a43a9834cb61.png', // 提琴对应的图片
    audio: '' // 待添加音频文件
  },
  {
    id: 2,
    name: '传统戏曲',
    image: '/assets/music/assets/438439b6-f6b6-48b7-85e3-a43a9834cb61.png', // 脸谱对应的图片（默认）
    audio: '' // 待添加音频文件
  },
  {
    id: 3,
    name: '古典雅乐',
    image: '/assets/music/assets/438439b6-f6b6-48b7-85e3-a43a9834cb61.png', // 仙鹤对应的图片
    audio: '' // 待添加音频文件
  }
];

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

// 选择音乐
const selectMusic = (index) => {
  if (currentMusicIndex.value === index) return;
  
  // 切换音乐
  currentMusicIndex.value = index;
  
  // 如果正在播放，切换后暂停
  if (isPlaying.value) {
    isPlaying.value = false;
  }
  
  console.log(`切换到: ${musicList[index].name}`);
};

// 切换播放状态
const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  
  if (isPlaying.value) {
    // 播放音乐逻辑
    console.log(`开始播放: ${musicList[currentMusicIndex.value].name}`);
    // TODO: 实现实际的音乐播放功能
  } else {
    // 暂停音乐逻辑
    console.log('暂停播放音乐');
  }
};

// 播放按钮点击事件 - 跳转到show-process界面
const handlePlayClick = () => {
  // 保存配乐完成状态
  localStorage.setItem('musicCompleted', 'true');
  
  // 跳转到show-process页面
  router.push('/show-process');
};

// 完成体验，跳转到用户创作页面
const handleComplete = () => {
  // 保存配乐完成状态
  localStorage.setItem('musicCompleted', 'true');
  
  // 跳转到用户创作页面
  router.push('/user-home');
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
.music-page-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(243, 238, 238, 1);
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
  gap: 124px;
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
  height: 852px;
}

/* 背景图 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  object-fit: cover;
  z-index: 1;
}

/* 音乐展示容器 */
.music-display-container {
  position: absolute;
  top: 63px;
  left: 49px;
  width: 314px;
  height: 486px;
  z-index: 10;
}

/* 白色背景容器 */
.music-white-box {
  position: absolute;
  top: 79px;
  left: 0;
  width: 296px;
  height: 407px;
  background: rgba(255, 255, 255, 1);
  border-radius: 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

/* 音乐人物图片 */
.music-character-image {
  width: 260px;
  height: 368px;
  margin-bottom: 19px;
  object-fit: contain;
  animation: scaleIn 1.2s ease-out 0.3s backwards;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 标题"配乐" */
.page-title {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 137px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 48px;
  color: rgba(100, 70, 63, 1);
  line-height: normal;
  font-weight: normal;
  writing-mode: vertical-rl;
  text-orientation: upright;
  z-index: 30;
  animation: fadeInDown 1s ease-out;
}

/* 播放器容器 */
.player-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 393px;
  height: 250px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 播放器背景 */
.player-background {
  position: absolute;
  top: -40px;
  left: 0;
  width: 393px;
  height: 210px;
  object-fit: contain;
  animation: slideUpFade 1s ease-out 0.5s backwards;
  pointer-events: none;
}

/* 音乐选择器容器 */
.music-selector-container {
  position: absolute;
  top: 0px;
  left: 0;
  width: 393px;
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 25;
}

/* 音乐热区基础样式 */
.music-hotspot {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.music-hotspot:hover {
  transform: scale(1.15) translateY(-5px);
}

.music-hotspot:active {
  transform: scale(0.95);
}

/* 选中状态 */
.music-hotspot.active {
  animation: musicBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 发光效果 */
.music-glow {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 220, 100, 0.6) 0%, rgba(255, 200, 50, 0.3) 50%, transparent 70%);
  animation: glowPulse 2s ease-in-out infinite;
  pointer-events: none;
}

/* 左侧热区 - 提琴 */
.music-hotspot-left {
  margin-left: -10px;
}

/* 中间热区 - 脸谱 */
.music-hotspot-center {
  margin-top: 10px;
}

/* 右侧热区 - 仙鹤 */
.music-hotspot-right {
  margin-right: -10px;
}

/* 播放控制器 */
.player-control {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 94px;
  height: 94px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: scaleIn 1s ease-out 0.8s backwards;
}

.player-control:hover {
  transform: translateX(-50%) scale(1.1);
  filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.2));
}

.player-control:active {
  transform: translateX(-50%) scale(0.95);
}

/* 播放按钮背景 */
.player-button-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 94px;
  height: 94px;
  object-fit: contain;
}

/* 播放图标 */
.player-icon {
  position: absolute;
  top: 26px;
  left: 17px;
  width: 61px;
  height: 41px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.player-icon.playing {
  animation: pulse 1.5s ease-in-out infinite;
}

/* 完成按钮 */
.complete-button {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 312px;
  height: 60px;
  background: linear-gradient(135deg, rgba(247, 238, 173, 1) 0%, rgba(255, 220, 100, 1) 100%);
  border-radius: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 50;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: slideUp 1s ease-out 1s backwards;
}

.complete-button:hover {
  transform: translateX(-50%) translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, rgba(255, 248, 193, 1) 0%, rgba(255, 230, 120, 1) 100%);
}

.complete-button:active {
  transform: translateX(-50%) translateY(-1px);
}

.complete-text {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 22px;
  color: rgba(100, 70, 63, 1);
  font-weight: normal;
  line-height: normal;
}

/* ========== 动画定义 ========== */

/* 图片切换动画 */
.fade-scale-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-leave-active {
  transition: all 0.4s ease-out;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.7) rotate(-10deg);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.2) rotate(10deg);
}

/* 音乐选中弹跳动画 */
@keyframes musicBounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.3) translateY(-10px);
  }
  50% {
    transform: scale(1.1) translateY(-5px);
  }
  70% {
    transform: scale(1.25) translateY(-8px);
  }
  100% {
    transform: scale(1.15) translateY(-5px);
  }
}

/* 发光脉冲动画 */
@keyframes glowPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

/* 淡入上滑 */
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

/* 缩放进入 */
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
  }
  60% {
    transform: translateX(-50%) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
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

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .music-page-container {
    width: 100vw;
  }
  
  .main-content,
  .status-bar,
  .background-image,
  .player-background {
    width: 100vw;
  }
}
</style>

