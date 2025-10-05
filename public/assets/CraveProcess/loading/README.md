# 雕刻加载页面设计说明

## Figma 设计稿

- **设计文件**: `figma-design.png`
- **Figma 链接**: [查看设计稿](https://www.figma.com/design/nJWD4KkEeR5uhe01r3CiZL/Untitled?node-id=423-137)

## 设计规格

### 尺寸
- 容器: 393px × 852px
- 背景色: #E2D5C5

### 主要元素

#### 1. 状态栏
- 高度: 49px
- 内容: 时间、Dynamic Island、信号/WiFi/电量图标

#### 2. 中央加载圆形
- 尺寸: 280px × 280px
- 位置: 垂直居中偏上
- 效果: 径向渐变 (#A02D18 → 透明)
- 动画: 脉冲缩放效果
- 滤镜: 高斯模糊 40px

#### 3. 加载文字
- 文本: "加载中"
- 字体: KingHwa_OldSong
- 字号: 20px
- 颜色: #64463F
- 位置: top: 520px, 水平居中

#### 4. 加载指示点
- 尺寸: 17px × 17px
- 颜色: #A02D18
- 形状: 圆形
- 动画: 闪烁效果

#### 5. 装饰图案
- **顶部**: SVG 图案，半透明装饰
- **底部**: SVG 图案，半透明装饰
- 不透明度: 0.3
- 滤镜: blur(1px)

## 动画效果

### 1. 脉冲动画 (pulse)
- 持续时间: 3秒
- 效果: scale(1) → scale(1.1) → scale(1)
- 缓动: ease-in-out
- 循环: 无限

### 2. 内圈脉冲动画 (pulseInner)
- 持续时间: 3秒
- 延迟: 0.3秒
- 效果: scale(0.9) → scale(1.2) → scale(0.9)
- 缓动: ease-in-out
- 循环: 无限

### 3. 闪烁动画 (blink)
- 持续时间: 1.5秒
- 效果: opacity(1) → opacity(0.3) → opacity(1)
- 缓动: ease-in-out
- 循环: 无限

### 4. 文字淡入淡出 (textFade)
- 持续时间: 1.5秒
- 效果: opacity(1) → opacity(0.5) → opacity(1)
- 缓动: ease-in-out
- 循环: 无限

## 实现优化

### 改进点

1. **更真实的模糊效果**
   - 使用双层径向渐变
   - 多级透明度过渡
   - 高斯模糊滤镜

2. **装饰图案**
   - 使用 SVG 矢量图形
   - 更清晰的图案定义
   - 易于调整和缩放

3. **性能优化**
   - 使用 CSS transform 实现动画
   - GPU 加速
   - 减少重绘

4. **响应式设计**
   - 支持不同屏幕尺寸
   - 使用 calc() 和百分比定位

## 页面流程

1. 用户完成雕刻操作 (持续 5 秒拖动)
2. 跳转到加载页面
3. 显示加载动画 (3 秒)
4. 自动跳转到雕刻详情页面

## 文件结构

```
public/assets/CraveProcess/loading/
├── figma-design.png          # Figma 设计稿截图
└── README.md                 # 本说明文档
```

## 相关文件

- **页面组件**: `src/views/CraveProcess/CraveLoadingPage.vue`
- **路由配置**: `src/router/index.js`
- **前置页面**: `src/views/CraveProcess/CraveProcessPage.vue`
- **后续页面**: `src/views/DiaoKeDetailPage.vue`

