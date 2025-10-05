# 过稿流程完整说明

## 📝 总体概述

过稿流程是"智绘皮影"应用中的核心环节，模拟传统皮影制作中将图样转移到皮革上的全过程。整个流程分为 **4 个步骤**，每个步骤都完整还原了传统工艺的操作。

**更新日期**: 2025-10-03  
**版本**: v3.0（重新设计流程）

## 🎯 完整流程图

```
画稿选择页 (GalleryPage)
    ↓ [点击确认]
┌─────────────────────────────────────┐
│  过稿流程 (OverProcess Flow)         │
├─────────────────────────────────────┤
│  Step 1: 描边                        │
│  - 路由: /over-process               │
│  - 操作: 长按开始描绘轮廓             │
│  - 效果: 描边从中心扩散               │
│  - 完成: 自动跳转 Step 2             │
├─────────────────────────────────────┤
│  Step 2: 铺纸                        │
│  - 路由: /over-process-step2         │
│  - 操作: 自动开始铺纸                │
│  - 效果: 纸张透明度渐显               │
│  - 完成: 自动跳转 Step 3             │
├─────────────────────────────────────┤
│  Step 3: 拖动进度条                  │
│  - 路由: /over-process-step3         │
│  - 操作: 用户拖动进度条               │
│  - 效果: 毛笔随进度移动               │
│  - 完成: 到达100%自动跳转 Step 4     │
├─────────────────────────────────────┤
│  Step 4: 完成展示                    │
│  - 路由: /over-process-complete      │
│  - 操作: 查看最终效果                │
│  - 选项: 重新过稿 / 继续制作         │
└─────────────────────────────────────┘
    ↓
制作流程页 (/process)
```

## 📂 文件结构

```
src/views/OverProcess/
├── index.vue                  # Step 1: 描边页面
├── PaperLayingPage.vue        # Step 2: 铺纸页面
├── ProgressSliderPage.vue     # Step 3: 拖动进度条页面
└── CompletePage.vue           # Step 4: 完成页面

public/assets/OverProcess/
├── assets/                    # Step 1 资源
│   └── assets/
│       ├── c7157ea7...png     # 背景图
│       ├── 3deeb51e...png     # 内容背景
│       └── ... (8张图片)
├── page2/                     # Step 2 资源
│   └── assets/
│       ├── df1018cf...png     # 背景图
│       ├── bf924665...png     # 覆盖纸张（关键）
│       └── ... (9张图片)
├── step3/                     # Step 3 资源
│   └── assets/
│       ├── e53c0563...png     # 背景图
│       ├── a3fa476c...png     # 毛笔图标
│       ├── e7f07f73...png     # 纸张层
│       └── ... (9张图片)
└── README.md                  # 本说明文档
```

## 🎨 各步骤详解

### Step 1: 描边（Tracing）

**文件**: `index.vue`  
**路由**: `/over-process`  
**操作**: 长按屏幕 0.5 秒触发

#### 功能特点
- 📍 长按触发描边动画
- ⭕ 描边从中心向外扩散
- 📊 实时进度显示（0-100%）
- 🎯 完成后自动跳转 Step 2

#### 视觉效果
```css
描边扩散：circle(0% → 70%)
透明度：0.3 → 0.8
动画时长：5秒
```

#### 交互流程
```
1. 页面加载，显示人物图案
2. 显示提示"长按屏幕开始过稿"
3. 用户长按 0.5 秒
4. 立即完成并跳转到 Step 2（无动画）
```

---

### Step 2: 铺纸（Paper Laying）

**文件**: `PaperLayingPage.vue`  
**路由**: `/over-process-step2`  
**操作**: 自动开始（无需用户操作）

#### 功能特点
- 🎨 传统工具展示（毛笔、墨水瓶、笔）
- 📄 纸张逐渐覆盖图案
- 📊 实时进度显示
- 🔄 自动完成并跳转

#### 视觉效果
```css
纸张透明度：0 → 0.9
白纸旋转：-13.17°
人物旋转：-15.57°
动画时长：约1.5秒
```

#### 工具位置
- **毛笔**: 左上角，旋转 -102.03°
- **墨水瓶**: 右上角，153×151px
- **笔**: 左下角，旋转 16.13°

#### 交互流程
```
1. 从 Step 1 自动跳转进入
2. 延迟 0.5 秒后开始铺纸动画
3. 纸张透明度渐变（约 1.5 秒）
4. 完成后延迟 1 秒跳转到 Step 3
```

---

### Step 3: 拖动进度条（Progress Slider）

**文件**: `ProgressSliderPage.vue`  
**路由**: `/over-process-step3`  
**操作**: 用户拖动进度条

#### 功能特点
- 🖱️ 可拖动的进度条
- 🖌️ 毛笔跟随进度移动
- 🔄 **图案旋转效果**：从倾斜 -15° 逐渐变正到 0°
- 📍 小圆点指示器
- 💬 动态提示文字
- ✨ 到达 100% 自动完成

#### 视觉效果
```css
进度条长度：204px
毛笔移动范围：43px → 247px
进度条颜色：rgba(160,45,24,0.6) → rgba(193,58,38,0.8)
图案旋转角度：-15° → 0°（随进度变正）
过渡时间：0.2s ease-out
```

#### 交互方式
- **触摸**: 触摸进度条任意位置
- **拖动**: 拖动滑块改变进度
- **鼠标**: 支持桌面端鼠标操作

#### 交互流程
```
1. 从 Step 2 自动跳转进入
2. 显示提示"拖动进度条"
3. 用户拖动进度条
4. 毛笔位置实时更新
5. 进度达到 99% 以上
6. 延迟 0.5 秒自动跳转 Step 4
```

---

### Step 4: 完成展示（Complete）

**文件**: `CompletePage.vue`  
**路由**: `/over-process-complete`  
**操作**: 查看效果，选择下一步

#### 功能特点
- ✅ 完成徽章动画
- 🎨 进度条满格显示
- 🖌️ 毛笔在终点位置
- 🔘 两个操作按钮

#### 视觉效果
```css
进度条：100% 满格
毛笔位置：终点（247px）
完成图标：弹跳动画
纸张透明度：0.9（最终效果）
```

#### 操作选项
- **重新过稿**: 返回 Step 1（`/over-process`）
- **继续制作**: 进入制作流程（`/process`）

#### 交互流程
```
1. 从 Step 3 自动跳转进入
2. 显示完成效果（进度条满格）
3. 延迟 0.8 秒显示操作面板
4. 显示完成徽章（弹跳动画）
5. 用户选择操作
   - 重新过稿 → 返回 Step 1
   - 继续制作 → 跳转到制作流程
```

## 🔄 自动化流程设计

### 跳转时序

| 步骤 | 触发方式 | 延迟时间 | 目标路由 |
|-----|---------|---------|---------|
| Step 1 → Step 2 | 长按触发 | 即时 | /over-process-step2 |
| Step 2 → Step 3 | 动画完成 | 1.0s | /over-process-step3 |
| Step 3 → Step 4 | 达到100% | 0.5s | /over-process-complete |

### 用户操作点

| 步骤 | 是否需要操作 | 操作类型 | 说明 |
|-----|------------|---------|------|
| Step 1 | ✅ 是 | 长按 0.5s | 触发描边 |
| Step 2 | ❌ 否 | 自动铺纸 | 观看铺纸动画（1.5秒） |
| Step 3 | ✅ 是 | 拖动进度条 | 推进流程 |
| Step 4 | ✅ 是 | 点击按钮 | 选择下一步 |

## 🎯 设计理念

### 1. 流畅性
- 步骤间自动衔接
- 减少用户点击
- 自然的过渡动画

### 2. 真实感
- 还原传统工艺
- 工具细节展示
- 渐进式效果呈现

### 3. 交互性
- 关键步骤需要用户参与
- 即时反馈
- 明确的操作提示

### 4. 美观性
- 统一的视觉风格
- 流畅的动画效果
- 清晰的信息层级

## 📊 技术实现要点

### 数据传递
```javascript
// 使用 sessionStorage 传递图片
sessionStorage.setItem('selectedPuppetImage', imageSrc)
const storedImage = sessionStorage.getItem('selectedPuppetImage')
```

### 自动跳转
```javascript
// Step 1 → Step 2（即时跳转）
router.push('/over-process-step2')

// Step 2 → Step 3（动画完成后延迟1秒跳转）
progressTimer = setInterval(() => {
  if (progress < 100) {
    progress += 2;  // 每次增加2%
    paperOpacity = (progress / 100) * 0.9;
  } else {
    clearInterval(progressTimer);
    setTimeout(() => {
      router.push('/over-process-step3');
    }, 1000);  // 延迟1秒
  }
}, 30);  // 30ms间隔，总时长约1.5秒

// Step 3 → Step 4
if (progress >= 99) {
  setTimeout(() => {
    router.push('/over-process-complete')
  }, 500)
}
```

### 进度同步
```javascript
// Step 1: 描边效果（直接设置为完成状态）
tracingStyle = {
  clipPath: 'circle(70% at 50% 50%)',
  opacity: 0.8
}

// Step 2: 铺纸进度（动画渐变）
paperOpacity = (progress / 100) * 0.9  // 0 → 0.9，约1.5秒

// Step 3: 拖动进度（实时计算）
brushPosition = 43 + (progress / 100) * 204  // 43px → 247px

// 图案旋转角度（实时计算）
imageRotation = -15 + (progress / 100) * 15  // -15° → 0°
```

## 🎨 配色方案

| 元素 | 颜色值 | 说明 |
|-----|-------|------|
| 主背景 | #E2D5C5 | 米黄色 |
| 品牌红 | #A02D18 | 标题、进度条 |
| 深褐色 | #64463F | 文字 |
| 渐变红 | #A02D18 → #C13A26 | 按钮、进度填充 |
| 白色 | #FFFFFF | 卡片、纸张 |

## 🚀 使用方式

### 完整体验流程
```bash
1. /draw-process              # 上传图片
2. /draw-process-loading      # 加载中
3. /draw-process-gallery      # 选择画稿
4. /over-process              # Step 1: 描边（长按）
5. /over-process-step2        # Step 2: 铺纸（自动）
6. /over-process-step3        # Step 3: 拖动进度条
7. /over-process-complete     # Step 4: 完成展示
8. /process                   # 制作流程
```

### 时间估算
- Step 1: ~0.5秒（长按触发后立即跳转）
- Step 2: ~3秒（铺纸动画1.5秒 + 延迟1秒 + 启动0.5秒）
- Step 3: ~5-10秒（用户拖动速度）
- Step 4: 用户决定
- **总计**: 约 8.5-13.5秒（不含 Step 4）

## 🔧 路由配置

```javascript
{
  path: '/over-process',
  name: 'OverProcess',
  component: OverProcess,
  meta: { title: '智绘皮影 - 过稿步骤1' }
},
{
  path: '/over-process-step2',
  name: 'OverProcessStep2',
  component: OverProcessPaperLaying,
  meta: { title: '智绘皮影 - 过稿步骤2' }
},
{
  path: '/over-process-step3',
  name: 'OverProcessStep3',
  component: OverProcessSlider,
  meta: { title: '智绘皮影 - 过稿步骤3' }
},
{
  path: '/over-process-complete',
  name: 'OverProcessComplete',
  component: OverProcessComplete,
  meta: { title: '智绘皮影 - 过稿完成' }
}
```

## 💡 最佳实践

### 1. 性能优化
- 图片预加载
- CSS 硬件加速
- 及时清理定时器
- 避免内存泄漏

### 2. 用户体验
- 清晰的操作提示
- 流畅的动画过渡
- 即时的进度反馈
- 明确的完成状态

### 3. 错误处理
- 图片加载失败处理
- 路由跳转异常处理
- 会话数据验证

## 🐛 常见问题

### Q: 为什么 Step 2 自动开始？
A: 为了流程的流畅性，Step 2 的铺纸过程无需用户操作，让用户专注于观看传统工艺的展示。

### Q: 进度条为什么要用户拖动？
A: Step 3 需要用户参与，增加交互性和参与感，模拟实际操作中的手动控制。

### Q: 如何调整各步骤的时长？
A: 修改各步骤中 `setInterval` 的间隔时间：
```javascript
// 当前是 50ms 间隔，5秒完成（100次 × 50ms）
setInterval(() => { progress += 1 }, 50)

// 改为 3秒完成
setInterval(() => { progress += 1 }, 30)
```

### Q: 可以跳过某个步骤吗？
A: 不建议跳过。每个步骤都有其文化意义，完整体验才能感受传统工艺的魅力。

## 🔮 后续优化

- [ ] 添加音效（描边声、铺纸声）
- [ ] 支持暂停/继续功能
- [ ] 添加工艺知识卡片
- [ ] 支持保存过稿过程视频
- [ ] 添加社交分享功能

---

**更新日期**: 2025-10-03  
**版本**: v3.0  
**设计师**: Figma Design Team  
**开发者**: AI Assistant  
**项目**: 智绘皮影 - 传统文化数字化体验
