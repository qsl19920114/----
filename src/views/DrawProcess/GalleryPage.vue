<template>
  <div class="gallery-container">
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
          <div class="icon-signal"></div>
          <div class="icon-wifi"></div>
          <div class="battery-icon">
            <div class="battery-border"></div>
            <div class="battery-cap"></div>
            <div class="battery-capacity"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="background-pattern"></div>

    <!-- 标题 -->
    <div class="title-text">画稿</div>
    <div class="subtitle-text">Drawing Shadow Puppet Drafts</div>

    <!-- 横向滚动容器 -->
    <div class="scroll-container">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="images-group">
          <!-- 图片卡片 -->
          <div 
            v-for="(image, index) in imageList" 
            :key="index"
            class="image-card" 
            :class="{ 'selected': selectedImage === index, 'center': centerIndex === index }"
            @click="selectImage(index)"
          >
            <!-- 示例皮影图案 SVG -->
            <div v-if="image.type === 'svg'" class="shadow-puppet-svg" v-html="image.content"></div>
            <!-- 或图片 -->
            <img v-else :src="image.src" :alt="image.name" class="shadow-image" />
            
            <!-- 图案名称 -->
            <div class="image-name">{{ image.name }}</div>
          </div>
        </div>
      </div>
      
      <!-- 导航箭头 -->
      <div v-if="canScrollLeft" class="arrow-left" @click="scrollLeft">
        <svg width="24" height="31" viewBox="0 0 24 31" fill="none">
          <path d="M20 3L5 15.5L20 28" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div v-if="canScrollRight" class="arrow-right" @click="scrollRight">
        <svg width="24" height="31" viewBox="0 0 24 31" fill="none">
          <path d="M4 3L19 15.5L4 28" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- 滚动指示器 -->
    <div class="scroll-indicator">
      <div 
        v-for="(image, index) in imageList" 
        :key="index"
        class="indicator-dot"
        :class="{ 'active': centerIndex === index }"
        @click="scrollToIndex(index)"
      ></div>
    </div>

    <!-- 确认按钮 -->
    <div 
      class="confirm-button"
      :class="{ 'active': selectedImage !== null }"
      @click="confirmSelection"
    >
      <span>确认</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const selectedImage = ref(null);
const scrollWrapper = ref(null);
const centerIndex = ref(0);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

// 真实皮影图片列表（按照设计稿顺序：11.png, 22.png, 33.png）
const imageList = ref([
  {
    type: 'image',
    name: '样式一',
    src: '/assets/DrawProcess/page3/assets/11.png'
  },
  {
    type: 'image',
    name: '样式二',
    src: '/assets/DrawProcess/page3/assets/22.png'
  },
  {
    type: 'image',
    name: '样式三',
    src: '/assets/DrawProcess/page3/assets/33.png'
  }
]);

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

// 检查滚动状态
const checkScroll = () => {
  if (!scrollWrapper.value) return;
  
  const container = scrollWrapper.value;
  canScrollLeft.value = container.scrollLeft > 10;
  canScrollRight.value = container.scrollLeft < container.scrollWidth - container.clientWidth - 10;
  
  // 计算当前中心的卡片索引（卡片宽度307px + 间距61px = 368px）
  const cardWidth = 368;
  const scrollCenter = container.scrollLeft + container.clientWidth / 2;
  const newCenterIndex = Math.round(scrollCenter / cardWidth);
  centerIndex.value = Math.min(Math.max(0, newCenterIndex), imageList.value.length - 1);
};

// 选择图片
const selectImage = (index) => {
  selectedImage.value = index;
  scrollToIndex(index);
};

// 滚动到指定索引
const scrollToIndex = (index) => {
  if (!scrollWrapper.value) return;
  
  const cardWidth = 368; // 卡片宽度307px + 间距61px
  const targetScroll = index * cardWidth;
  
  scrollWrapper.value.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });
  
  centerIndex.value = index;
};

// 向左滚动
const scrollLeft = () => {
  if (centerIndex.value > 0) {
    scrollToIndex(centerIndex.value - 1);
  }
};

// 向右滚动
const scrollRight = () => {
  if (centerIndex.value < imageList.value.length - 1) {
    scrollToIndex(centerIndex.value + 1);
  }
};

// 确认选择
const confirmSelection = () => {
  if (selectedImage.value === null) {
    alert('请先选择一个画稿');
    return;
  }
  
  // 保存选中的图片到 sessionStorage
  const selectedImageSrc = imageList.value[selectedImage.value].src;
  sessionStorage.setItem('selectedPuppetImage', selectedImageSrc);
  
  // 跳转到过稿流程页面
  router.push('/over-process');
};

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000);
  
  // 监听滚动事件
  if (scrollWrapper.value) {
    scrollWrapper.value.addEventListener('scroll', checkScroll);
    checkScroll();
  }
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  
  if (scrollWrapper.value) {
    scrollWrapper.value.removeEventListener('scroll', checkScroll);
  }
});
</script>

<style scoped>
/* 主容器 */
.gallery-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: linear-gradient(135deg, #A02D18 0%, #C13A26 50%, #A02D18 100%);
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
  left: calc(50% - 25px/2 + 1.17px);
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
  left: calc(50% - 1.33px/2 + 13.67px);
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
  left: calc(50% - 21px/2 + 1.17px);
  top: 15.38%;
  bottom: 15.38%;
  background: #000000;
  border-radius: 2.5px;
}

/* 背景装饰图案 */
.background-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    url('/assets/DrawProcess/assets/e05c510d-f0ac-46c0-8f9b-6e7c99984677.png');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  pointer-events: none;
}

/* 标题 - 画稿 */
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

/* Frame 1 - 横向滚动容器 */
.scroll-container {
  position: absolute;
  width: 312px;
  height: 484px;
  left: 41px;
  top: 201px;
  overflow: hidden;
}

/* Frame 2 - 滚动包装器 */
.scroll-wrapper {
  position: absolute;
  width: 350px;
  height: 484px;
  left: 0px;
  top: 0px;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* 隐藏滚动条但保持滚动功能 */
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.scroll-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Group 5 - 图片组 */
.images-group {
  position: absolute;
  width: 1043px;
  height: 447px;
  left: 0px;
  top: 0px;
  display: flex;
  gap: 61px;
}

/* 图片卡片 */
.image-card {
  position: relative;
  width: 307px;
  height: 447px;
  background: #FFFFFF;
  border-radius: 46px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 3px solid transparent;
}

.image-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  border-color: rgba(160, 45, 24, 0.3);
}

.image-card.selected {
  border: 4px solid #A02D18;
  box-shadow: 0 12px 48px rgba(160, 45, 24, 0.5);
  transform: translateY(-8px) scale(1.02);
  background: #FFFFFF;
}

.image-card.center {
  z-index: 10;
}

/* 皮影图片 */
.shadow-image {
  width: 281px;
  height: auto;
  max-height: 397px;
  object-fit: contain;
  margin-top: 25px;
  transition: transform 0.3s ease;
}

.image-card:hover .shadow-image {
  transform: scale(1.03);
}

/* SVG 皮影图案容器 */
.shadow-puppet-svg {
  width: 100%;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.shadow-puppet-svg svg {
  max-width: 100%;
  max-height: 100%;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.image-card:hover .shadow-puppet-svg {
  transform: scale(1.05);
}

.image-card.selected .shadow-puppet-svg svg {
  filter: drop-shadow(0 4px 16px rgba(160, 45, 24, 0.3));
}

/* 图片名称 */
.image-name {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'KingHwa OldSong', 'KingHwa_OldSong', serif;
  font-size: 18px;
  color: #64463F;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 5;
}

.image-card.selected .image-name {
  background: rgba(160, 45, 24, 0.95);
  color: #FFFFFF;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(160, 45, 24, 0.4);
}

/* 导航箭头 */
.arrow-left,
.arrow-right {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 30;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.arrow-left {
  left: 10px;
}

.arrow-right {
  right: 10px;
}

.arrow-left:hover,
.arrow-right:hover {
  background: rgba(160, 45, 24, 0.95);
  transform: translateY(-50%) scale(1.15);
  box-shadow: 0 6px 20px rgba(160, 45, 24, 0.4);
}

.arrow-left:hover svg path,
.arrow-right:hover svg path {
  stroke: #FFFFFF;
}

.arrow-left:active,
.arrow-right:active {
  transform: translateY(-50%) scale(0.95);
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 85px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 20;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.2);
}

.indicator-dot.active {
  width: 32px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

/* 确认按钮 */
.confirm-button {
  position: absolute;
  width: 312px;
  height: 60px;
  left: calc(50% - 312px/2 + 0.5px);
  top: 711px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%);
  border-radius: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.5;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(100, 70, 63, 0.2);
}

.confirm-button.active {
  opacity: 1;
  pointer-events: auto;
  background: linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%);
  box-shadow: 0 6px 24px rgba(160, 45, 24, 0.4);
  border-color: rgba(160, 45, 24, 0.3);
}

.confirm-button.active:hover {
  background: linear-gradient(135deg, #A02D18 0%, #C13A26 100%);
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 32px rgba(160, 45, 24, 0.5);
}

.confirm-button.active:hover span {
  color: #FFFFFF;
}

.confirm-button.active:active {
  transform: translateY(0) scale(0.98);
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
  transition: color 0.3s ease;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .gallery-container {
    width: 100vw;
    height: 100vh;
    min-height: 852px;
  }
}
</style>

