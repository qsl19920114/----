<template>
  <div class="complete-container">
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
      <div class="page-title">完成</div>

      <!-- 完成卡片 -->
      <div class="complete-card">
        <div class="success-icon">🎉</div>
        <div class="success-title">恭喜完成！</div>
        <div class="success-subtitle">你的皮影人物已经组装完成</div>

        <!-- 展示最终作品 -->
        <div class="final-work">
          <canvas ref="canvasRef" class="work-canvas"></canvas>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="action-btn secondary-btn" @click="handleRestart">
            <span class="btn-icon">🔄</span>
            再创作一个
          </button>
          <button class="action-btn primary-btn" @click="handleSave">
            <span class="btn-icon">💾</span>
            保存作品
          </button>
        </div>

        <button class="video-btn" @click="generateVideo">
          <span class="btn-icon">🎬</span>
          生成表演视频
        </button>

        <button class="home-btn" @click="goHome">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');
const canvasRef = ref(null);
const components = ref([]);
const previewImage = ref('');

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

// 加载数据
const loadData = () => {
  const savedComponents = localStorage.getItem('assembledPuppet');
  const savedPreview = localStorage.getItem('puppetPreview');
  
  if (!savedComponents || !savedPreview) {
    console.error('❌ 未找到组装数据');
    router.push('/user-home');
    return;
  }
  
  components.value = JSON.parse(savedComponents);
  previewImage.value = savedPreview;
  
  nextTick(() => {
    renderFinalWork();
  });
};

// 渲染最终作品到Canvas
const renderFinalWork = async () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 550;
  
  // 清空画布
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 按zIndex排序组件
  const sortedComponents = [...components.value].sort((a, b) => a.zIndex - b.zIndex);
  
  // 绘制每个组件
  for (const comp of sortedComponents) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = comp.imageUrl;
      });
      
      ctx.save();
      ctx.translate(
        comp.currentPosition.x + comp.size.width / 2,
        comp.currentPosition.y + comp.size.height / 2
      );
      ctx.rotate((comp.rotation * Math.PI) / 180);
      ctx.drawImage(
        img,
        -comp.size.width / 2,
        -comp.size.height / 2,
        comp.size.width,
        comp.size.height
      );
      ctx.restore();
    } catch (error) {
      console.error('❌ 加载组件图片失败:', comp.name, error);
    }
  }
  
  console.log('✅ 最终作品渲染完成');
};

// 重新开始
const handleRestart = () => {
  // 清除之前的数据
  localStorage.removeItem('assembledPuppet');
  localStorage.removeItem('puppetComponents');
  localStorage.removeItem('puppetPreview');
  localStorage.removeItem('generateTaskId');
  
  // 返回用户首页
  router.push('/user-home');
};

// 保存作品
const handleSave = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  try {
    // 将Canvas转为图片并下载
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `皮影作品_${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
      
      console.log('✅ 作品已保存');
      
      // 可以添加保存成功提示
      alert('作品已保存到本地！');
    }, 'image/png');
  } catch (error) {
    console.error('❌ 保存失败:', error);
    alert('保存失败，请重试');
  }
};

// 生成表演视频
const generateVideo = () => {
  // 保存Canvas图片作为视频生成的输入
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      localStorage.setItem('puppetImageForVideo', url);
      
      // 跳转到视频生成页面
      router.push('/user-video');
    }, 'image/png');
  }
};

// 返回首页
const goHome = () => {
  router.push('/');
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 60000);
  loadData();
});

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer);
});
</script>

<style scoped>
/* 主容器 */
.complete-container {
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

/* 完成卡片 */
.complete-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 10;
  animation: fadeInScale 1s ease-out;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 16px;
  animation: bounce 1s ease-in-out;
}

.success-title {
  font-family: 'KingHwa_OldSong', 'KingHwa OldSong', serif;
  font-size: 28px;
  color: rgba(100, 70, 63, 1);
  margin-bottom: 8px;
}

.success-subtitle {
  font-size: 14px;
  color: rgba(100, 70, 63, 0.7);
  margin-bottom: 24px;
}

/* 最终作品展示 */
.final-work {
  margin-bottom: 24px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.work-canvas {
  width: 100%;
  height: auto;
  display: block;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.action-btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 62px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.action-btn:active {
  transform: translateY(0);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.95);
  color: rgba(100, 70, 63, 1);
  border: 2px solid rgba(100, 70, 63, 0.3);
}

.primary-btn {
  background: linear-gradient(135deg, rgba(247, 238, 173, 1) 0%, rgba(255, 220, 100, 1) 100%);
  color: rgba(100, 70, 63, 1);
}

.btn-icon {
  font-size: 18px;
}

/* 生成视频按钮 */
.video-btn {
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, rgba(160, 45, 24, 0.9) 0%, rgba(200, 80, 60, 0.9) 100%);
  border: none;
  border-radius: 62px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(160, 45, 24, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.video-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(160, 45, 24, 0.4);
  background: linear-gradient(135deg, rgba(180, 55, 34, 1) 0%, rgba(220, 90, 70, 1) 100%);
}

.video-btn:active {
  transform: translateY(0);
}

/* 返回首页按钮 */
.home-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(100, 70, 63, 0.2);
  border-radius: 62px;
  font-size: 14px;
  color: rgba(100, 70, 63, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
}

.home-btn:hover {
  background: rgba(100, 70, 63, 0.05);
  border-color: rgba(100, 70, 63, 0.4);
  color: rgba(100, 70, 63, 1);
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

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

/* 响应式 */
@media screen and (max-width: 393px) {
  .complete-container {
    width: 100vw;
  }
  
  .main-content,
  .status-bar,
  .background-image {
    width: 100vw;
  }
}
</style>

