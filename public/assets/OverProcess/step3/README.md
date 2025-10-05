# Step 3 - 拖动进度条对齐图案

## 📝 页面说明

这是过稿流程的第三步，用户通过拖动进度条来调整对齐图案，模拟传统工艺中调整纸张和图案位置的过程。

**版本**: v2.0（新增旋转效果）  
**设计稿**: node-id=51-30  
**更新日期**: 2025-10-03  
**路由**: `/over-process-step3`

## ✨ 核心功能

### 1. **图案旋转对齐**
这是本页面的核心交互：
- **初始状态**: 图案倾斜 -15°（模拟未对齐状态）
- **拖动过程**: 随着进度增加，图案逐渐旋转变正
- **完成状态**: 进度 100% 时，图案完全对正（0°）

### 2. **进度条拖动**
- 支持触摸和鼠标操作
- 滑块跟随手指/鼠标移动
- 实时反馈进度百分比

### 3. **毛笔跟随移动**
- 毛笔图标随进度条滑块移动
- 位置范围：43px → 247px（204px 移动距离）
- 流畅的过渡动画

### 4. **动态提示**
```javascript
progress < 10%:   "拖动进度条对齐图案"
progress 10-99%:  "继续调整对齐..."
progress 100%:    "对齐完成！"
```

## 🎯 旋转效果实现

### 计算公式
```javascript
// 图片旋转角度计算
const imageRotation = computed(() => {
  const startAngle = -15;  // 起始角度（倾斜）
  const endAngle = 0;      // 结束角度（正）
  return startAngle + (progress.value / 100) * (endAngle - startAngle);
});

// 示例计算：
// 进度 0%:   -15 + (0/100) * 15 = -15°
// 进度 50%:  -15 + (50/100) * 15 = -7.5°
// 进度 100%: -15 + (100/100) * 15 = 0°
```

### 应用到图片
```vue
<img 
  :src="selectedImage" 
  :style="{ transform: `rotate(${imageRotation}deg)` }"
  class="base-image"
/>
```

### CSS 样式
```css
.base-image {
  transition: transform 0.2s ease-out;
  transform-origin: center center;
}
```

## 📐 设计规格（基于 Figma）

### 容器尺寸
```css
width: 393px
height: 852px
background: rgba(226, 213, 197, 1)
```

### 进度条规格
```css
/* 进度条容器 */
width: 204px
height: 14px
top: 223px (相对于毛笔容器)
left: 43px

/* 进度条轨道 */
border-radius: 34px
border: 1px solid rgba(160, 45, 24, 1)
background: rgba(255, 255, 255, 0.5)

/* 进度条填充 */
background: linear-gradient(90deg, 
  rgba(160, 45, 24, 0.6), 
  rgba(193, 58, 38, 0.8)
)

/* 滑块 */
width: 24px
height: 24px
background: rgba(160, 45, 24, 1)
border: 3px solid #FFFFFF
border-radius: 50%
```

### 毛笔图标
```css
width: 87.48px
height: 229.53px
/* 位置动态计算 */
left: 43px + (progress / 100) * 204px
transition: left 0.1s ease-out
```

### 图片规格
```css
/* 原始图片 */
width: 393px
height: 524.35px
top: 69.66px
transform: rotate(imageRotation)
transition: transform 0.2s ease-out

/* 覆盖纸张图片 */
width: 393px
height: 524.35px
top: 4.7px (相对于纸张层)
opacity: 0.8
transform: rotate(imageRotation)
```

## 🎨 视觉效果对比

### 进度 0%（初始状态）
```
图案旋转: -15°（明显倾斜）
毛笔位置: 43px（最左侧）
进度条填充: 0%
提示文字: "拖动进度条对齐图案"
```

### 进度 50%（调整中）
```
图案旋转: -7.5°（半倾斜）
毛笔位置: 145px（中间）
进度条填充: 50%
提示文字: "继续调整对齐..."
```

### 进度 100%（完成）
```
图案旋转: 0°（完全对正）
毛笔位置: 247px（最右侧）
进度条填充: 100%
提示文字: "对齐完成！"
```

## 💡 交互细节

### 拖动方式
1. **触摸操作**（移动端）
   - `touchstart`: 开始拖动
   - `touchmove`: 移动更新进度
   - `touchend`: 结束拖动

2. **鼠标操作**（桌面端）
   - `mousedown`: 开始拖动
   - `mousemove`: 移动更新进度（监听 document）
   - `mouseup`: 结束拖动

3. **点击跳转**
   - 点击进度条任意位置，滑块跳转到该位置
   - 图案立即旋转到对应角度

### 进度计算
```javascript
const calculateProgress = (clientX) => {
  const rect = sliderTrack.getBoundingClientRect();
  const x = clientX - rect.left;
  const width = rect.width;
  let newProgress = (x / width) * 100;
  
  // 限制在 0-100 范围内
  newProgress = Math.max(0, Math.min(100, newProgress));
  
  progress.value = newProgress;
};
```

### 自动完成
```javascript
// 达到 99% 以上自动跳转
if (newProgress >= 99) {
  setTimeout(() => {
    router.push('/over-process-complete');
  }, 500);
}
```

## 🎭 用户体验设计

### 1. 视觉反馈
- ✅ 图案旋转：直观展示对齐过程
- ✅ 毛笔移动：工具位置跟随
- ✅ 进度填充：清晰的进度展示
- ✅ 文字提示：明确的操作指引

### 2. 流畅性
- ✅ 旋转过渡：0.2s ease-out
- ✅ 毛笔移动：0.1s ease-out
- ✅ 进度更新：实时响应
- ✅ 无卡顿感

### 3. 操作便利性
- ✅ 支持拖动滑块
- ✅ 支持点击轨道
- ✅ 支持触摸和鼠标
- ✅ 手感流畅自然

## 📊 性能优化

### 1. 计算优化
```javascript
// 使用 computed 缓存计算结果
const imageRotation = computed(() => {...});
const brushPosition = computed(() => {...});
```

### 2. 动画优化
```css
/* 使用 transform 而非 left/top */
transform: rotate(...)  /* GPU 加速 */
transition: transform 0.2s ease-out;
```

### 3. 事件优化
```javascript
// 拖动时阻止默认行为
handleTouchMove(e) {
  e.preventDefault();  // 防止页面滚动
  ...
}
```

## 🔧 技术实现

### 文件位置
```
src/views/OverProcess/ProgressSliderPage.vue
```

### 关键代码
```vue
<script setup>
import { ref, computed } from 'vue';

// 进度
const progress = ref(0);

// 图片旋转角度
const imageRotation = computed(() => {
  return -15 + (progress.value / 100) * 15;
});

// 毛笔位置
const brushPosition = computed(() => {
  return 43 + (progress.value / 100) * 204;
});
</script>

<template>
  <img 
    :style="{ transform: `rotate(${imageRotation}deg)` }"
    class="base-image"
  />
  
  <img 
    :style="{ left: brushPosition + 'px' }"
    class="brush-image"
  />
</template>

<style scoped>
.base-image {
  transition: transform 0.2s ease-out;
  transform-origin: center center;
}

.brush-image {
  transition: left 0.1s ease-out;
}
</style>
```

## 🎯 设计理念

### 1. 传统工艺还原
- 模拟手工调整纸张和图案的过程
- 倾斜状态代表未对齐
- 拖动进度条代表手动调整
- 对正状态代表完成对齐

### 2. 交互自然性
- 旋转角度和进度同步变化
- 视觉反馈即时
- 操作手感流畅
- 完成状态清晰

### 3. 用户参与感
- 需要用户主动操作
- 能看到自己的操作效果
- 有成就感（从倾斜到对正）

## 📈 效果对比

### v1.0（无旋转效果）
- 图案始终保持正
- 只有毛笔移动
- 交互相对单一

### v2.0（当前版本）
- ✅ 图案从倾斜到对正
- ✅ 毛笔跟随移动
- ✅ 动态文字提示
- ✅ 交互更丰富生动

## 🔮 后续优化建议

- [ ] 添加震动反馈（达到 100% 时）
- [ ] 添加音效（拖动声、完成声）
- [ ] 支持多指拖动
- [ ] 添加对齐辅助线
- [ ] 记录用户调整次数

---

**更新日期**: 2025-10-03  
**版本**: v2.0  
**特性**: 图案旋转对齐效果  
**路由**: `/over-process-step3`

