<template>
  <div class="assemble-container">
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

      <!-- 标题 -->
      <div class="page-title">组装</div>

      <!-- 进度提示 -->
      <div class="progress-hint">
        已组装: {{ placedCount }} / {{ totalCount }}
      </div>

      <!-- 组装画布区域 -->
      <div class="canvas-container">
        <!-- 参考剪影 -->
        <transition name="fade">
          <img 
            v-if="showReference && previewImage"
            :src="previewImage" 
            alt="参考图" 
            class="reference-image"
          />
        </transition>

        <!-- 已放置的组件 -->
        <div 
          v-for="comp in placedComponents"
          :key="comp.id"
          class="placed-component"
          :style="{
            left: comp.currentPosition.x + 'px',
            top: comp.currentPosition.y + 'px',
            width: comp.size.width + 'px',
            height: comp.size.height + 'px',
            transform: `rotate(${comp.rotation}deg)`,
            zIndex: comp.zIndex
          }"
          @mousedown="startDrag($event, comp)"
          @touchstart="startDrag($event, comp)"
        >
          <img :src="comp.imageUrl" :alt="comp.name" class="component-image" />
        </div>
      </div>

      <!-- 底部组件面板 -->
      <div class="components-panel">
        <div class="panel-header">
          <span class="panel-title">拖动组件到画布</span>
          <div class="panel-actions">
            <button class="tool-btn" @click="toggleReference">
              {{ showReference ? '隐藏' : '显示' }}参考
            </button>
            <button class="tool-btn" @click="autoArrange">自动排列</button>
            <button class="tool-btn" @click="resetAll">重置</button>
          </div>
        </div>

        <div class="components-grid">
          <div 
            v-for="comp in availableComponents"
            :key="comp.id"
            class="component-card"
            @mousedown="startDrag($event, comp)"
            @touchstart="startDrag($event, comp)"
          >
            <img :src="comp.imageUrl" :alt="comp.name" class="component-thumbnail" />
            <span class="component-name">{{ comp.name }}</span>
          </div>
        </div>
      </div>

      <!-- 完成按钮 -->
      <button 
        class="complete-btn"
        :class="{ 'active': isAllPlaced }"
        :disabled="!isAllPlaced"
        @click="handleComplete"
      >
        <span v-if="isAllPlaced">✨ 完成组装</span>
        <span v-else>还有 {{ totalCount - placedCount }} 个组件未放置</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const previewImage = ref('');
const components = ref([]);
const showReference = ref(true);
const draggingComponent = ref(null);
const dragOffset = ref({ x: 0, y: 0 });

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

// 可用组件（未放置的）
const availableComponents = computed(() => {
  return components.value.filter(comp => !comp.isPlaced);
});

// 已放置组件
const placedComponents = computed(() => {
  return components.value.filter(comp => comp.isPlaced);
});

// 已放置数量
const placedCount = computed(() => placedComponents.value.length);

// 总数量
const totalCount = computed(() => components.value.length);

// 是否全部放置
const isAllPlaced = computed(() => placedCount.value === totalCount.value);

// 开始拖拽
const startDrag = (event, component) => {
  event.preventDefault();
  
  const touch = event.touches ? event.touches[0] : event;
  const rect = event.currentTarget.getBoundingClientRect();
  
  draggingComponent.value = component;
  dragOffset.value = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
  
  // 如果是从底部面板拖拽，先标记为已放置
  if (!component.isPlaced) {
    const index = components.value.findIndex(c => c.id === component.id);
    if (index !== -1) {
      components.value[index].isPlaced = true;
    }
  }
  
  // 添加移动监听
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('touchend', handleDragEnd);
};

// 拖拽移动
const handleDragMove = (event) => {
  if (!draggingComponent.value) return;
  
  const touch = event.touches ? event.touches[0] : event;
  const canvasRect = document.querySelector('.canvas-container').getBoundingClientRect();
  
  const index = components.value.findIndex(c => c.id === draggingComponent.value.id);
  if (index !== -1) {
    components.value[index].currentPosition = {
      x: Math.max(0, Math.min(canvasRect.width - draggingComponent.value.size.width, 
        touch.clientX - canvasRect.left - dragOffset.value.x)),
      y: Math.max(0, Math.min(canvasRect.height - draggingComponent.value.size.height, 
        touch.clientY - canvasRect.top - dragOffset.value.y))
    };
  }
};

// 结束拖拽
const handleDragEnd = () => {
  if (draggingComponent.value) {
    // 检查是否接近正确位置（吸附功能）
    const index = components.value.findIndex(c => c.id === draggingComponent.value.id);
    if (index !== -1) {
      const comp = components.value[index];
      const distance = Math.sqrt(
        Math.pow(comp.currentPosition.x - comp.correctPosition.x, 2) +
        Math.pow(comp.currentPosition.y - comp.correctPosition.y, 2)
      );
      
      // 如果距离小于40px，吸附到正确位置
      if (distance < 40) {
        components.value[index].currentPosition = { ...comp.correctPosition };
        showSuccessFeedback();
      }
    }
  }
  
  draggingComponent.value = null;
  
  // 移除监听
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
  document.removeEventListener('touchmove', handleDragMove);
  document.removeEventListener('touchend', handleDragEnd);
};

// 成功反馈
const showSuccessFeedback = () => {
  // 可以添加震动反馈（移动端）
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
};

// 切换参考图
const toggleReference = () => {
  showReference.value = !showReference.value;
};

// 自动排列
const autoArrange = () => {
  components.value.forEach(comp => {
    comp.currentPosition = { ...comp.correctPosition };
    comp.isPlaced = true;
  });
};

// 重置
const resetAll = () => {
  // 从localStorage重新加载初始数据
  const savedComponents = localStorage.getItem('puppetComponents');
  if (savedComponents) {
    components.value = JSON.parse(savedComponents);
  }
};

// 完成组装
const handleComplete = () => {
  if (!isAllPlaced.value) return;
  
  // 保存最终组装结果
  localStorage.setItem('assembledPuppet', JSON.stringify(components.value));
  localStorage.setItem('assembleCompleted', 'true');
  
  // 跳转到完成页面
  router.push('/user-complete');
};

// 从localStorage加载数据
const loadData = () => {
  const savedPreview = localStorage.getItem('puppetPreview');
  const savedComponents = localStorage.getItem('puppetComponents');
  
  if (!savedPreview || !savedComponents) {
    console.error('❌ 未找到组件数据，返回首页');
    router.push('/user-home');
    return;
  }
  
  previewImage.value = savedPreview;
  components.value = JSON.parse(savedComponents);
  
  console.log('✅ 加载了', components.value.length, '个组件');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  loadData();
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
  
  // 清理拖拽监听
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
  document.removeEventListener('touchmove', handleDragMove);
  document.removeEventListener('touchend', handleDragEnd);
});
</script>

<style scoped>
/* 主容器 */
.assemble-container {
  position: relative;
  width: 393px;
  height: 852px;
  background: rgba(243, 238, 238, 1);
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  user-select: none;
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

.dynamic-island-spacer {
  width: 124px;
  height: 10px;
}

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

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 852px;
  object-fit: cover;
  z-index: 1;
}

/* 标题 */
.page-title {
  position: absolute;
  top: 49px;
  right: 32px;
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

/* 进度提示 */
.progress-hint {
  position: absolute;
  top: 60px;
  left: 20px;
  font-size: 14px;
  color: rgba(100, 70, 63, 0.8);
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  border-radius: 12px;
  z-index: 30;
  font-weight: 600;
}

/* 画布容器 */
.canvas-container {
  position: absolute;
  top: 100px;
  left: 20px;
  width: 353px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px dashed rgba(100, 70, 63, 0.3);
  border-radius: 16px;
  z-index: 10;
  overflow: hidden;
}

/* 参考图 */
.reference-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.2;
  pointer-events: none;
  z-index: 1;
}

/* 已放置的组件 */
.placed-component {
  position: absolute;
  cursor: move;
  transition: transform 0.1s ease-out;
  touch-action: none;
}

.placed-component:active {
  cursor: grabbing;
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.component-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* 底部组件面板 */
.components-panel {
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 20;
  animation: slideUpFade 1s ease-out;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(100, 70, 63, 0.1);
}

.panel-title {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 16px;
  color: rgba(100, 70, 63, 1);
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.tool-btn {
  padding: 4px 12px;
  background: rgba(247, 238, 173, 0.5);
  border: 1px solid rgba(100, 70, 63, 0.2);
  border-radius: 12px;
  font-size: 12px;
  color: rgba(100, 70, 63, 1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: rgba(247, 238, 173, 1);
  transform: translateY(-1px);
}

.tool-btn:active {
  transform: translateY(0);
}

/* 组件网格 */
.components-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
  max-height: 200px;
  overflow-y: auto;
}

.component-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(100, 70, 63, 0.1);
  border-radius: 12px;
  cursor: grab;
  transition: all 0.3s ease;
  touch-action: none;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: rgba(100, 70, 63, 0.3);
}

.component-card:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.component-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 6px;
  pointer-events: none;
}

.component-name {
  font-size: 12px;
  color: rgba(100, 70, 63, 0.8);
  text-align: center;
}

/* 完成按钮 */
.complete-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 312px;
  height: 50px;
  background: rgba(200, 200, 200, 0.5);
  border: none;
  border-radius: 62px;
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 18px;
  color: rgba(100, 70, 63, 0.5);
  cursor: not-allowed;
  z-index: 50;
  transition: all 0.3s ease;
}

.complete-btn.active {
  background: linear-gradient(135deg, rgba(247, 238, 173, 1) 0%, rgba(255, 220, 100, 1) 100%);
  color: rgba(100, 70, 63, 1);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.complete-btn.active:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* ========== 动画定义 ========== */

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

@keyframes pulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.02);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .assemble-container {
    width: 100vw;
  }
  
  .main-content,
  .status-bar,
  .background-image {
    width: 100vw;
  }
}
</style>

