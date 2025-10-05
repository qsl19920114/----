# 过稿铺纸页面 - Step 2

## 📝 页面说明

这是"智绘皮影"应用中过稿流程的**第二步（铺纸步骤）**，展示将纸张覆盖在人物图案上的传统工艺场景。

**版本**: v2.0（重新设计）  
**设计稿**: node-id=47-2  
**更新日期**: 2025-10-03  
**路由**: `/over-process-step2`  
**步骤**: 过稿流程 Step 2 / 3

## ✨ 功能特性

### 1. **铺纸动画**
- 📄 逐渐覆盖纸张到人物图案上
- 🎯 长按屏幕开始铺纸过程
- 📊 实时显示铺纸进度（0-100%）
- ✨ 纸张透明度从 0 → 0.9 渐变

### 2. **传统工具展示**
- 🖌️ **毛笔**：旋转角度 -102.03°
- 🏺 **墨水瓶**：圆形瓶身，带高光效果
- ✏️ **笔**：普通绘图笔
- 📐 **工具布局**：按照传统工艺摆放

### 3. **交互体验**
- 长按触发铺纸动画
- 进度条实时反馈
- 完成后显示"完成铺纸"按钮
- 流畅的过渡效果

### 4. **视觉设计**
- 白色纸张旋转 -13.17°
- 人物图案旋转 -15.57°
- 半透明覆盖纸张渐显
- 真实的工艺场景还原

## 🎨 设计规格（基于 Figma）

### 容器尺寸
- **宽度**: 393px
- **高度**: 852px
- **背景色**: #E2D5C5

### 核心元素

#### 1. **背景图** (z-index: 1)
```css
position: absolute
width: 617px, height: 886px
left: -179px, top: 0px
image: df1018cf-4dd0-4ae3-b348-3842db50160b.png
```

#### 2. **白色纸张底层** (z-index: 2)
```css
position: absolute
width: 511.57px, height: 575px
left: -98px, top: 71.34px
background: #FFFFFF
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
transform: rotate(-13.17deg)
```

#### 3. **人物图案** (z-index: 3)
```css
position: absolute
width: 321.52px, height: 454.74px
left: -13px, top: 141px
transform: rotate(-15.57deg)
显示用户选择的皮影图案
```

#### 4. **覆盖纸张** (z-index: 4)
```css
position: absolute
width: 393px, height: 592.40px
left: 0, top: 138px
image: bf924665-d983-4569-9899-5b94501d77a6.png
opacity: 0 → 0.9 (动画过程)
```

#### 5. **毛笔工具** (z-index: 10)
```css
position: absolute
width: 83.1px, height: 307.55px
left: 32px, top: -28px
transform: rotate(-102.03deg)

笔尖：
- width: 18.86px, height: 35.5px
- gradient: #291D11 → #FFFFFF

笔杆：
- width: 11.38px, height: 279.94px
- background: #C6A268
- transform: rotate(-115.33deg)
```

#### 6. **墨水瓶** (z-index: 10)
```css
position: absolute
width: 153px, height: 151px
left: 210px, top: -16px

外层：#888080, border-radius: 41px
内层：#433434, border-radius: 20px
墨水：#302929, 圆形
高光1：9.95×8.59px, #D9D9D9
高光2：23.13×4.31px, #D9D9D9
```

#### 7. **半透明遮罩** (z-index: 5)
```css
position: absolute
left: -38.42%, right: -43.26%
top: 16.55%, bottom: 15.73%
background: rgba(220, 197, 168, 0.7)
box-shadow: 0px 5px 7.7px rgba(0, 0, 0, 0.25)
```

#### 8. **笔工具** (z-index: 11)
```css
position: absolute
width: 23.98px, height: 232px
left: -95px, top: 432px
transform: rotate(16.13deg)

笔身：#C6A268
笔尖：#64463F
```

## 📐 图层结构

```
z-index: 1   - 背景图
z-index: 2   - 白色纸张底层（旋转）
z-index: 3   - 人物图案（旋转）
z-index: 4   - 覆盖纸张（渐显）
z-index: 5   - 半透明遮罩
z-index: 10  - 毛笔、墨水瓶
z-index: 11  - 笔工具
z-index: 50  - 标题和副标题
z-index: 60  - 控制面板
z-index: 100 - 状态栏
```

## 🎯 页面流程

```
画稿选择页 (GalleryPage)
    ↓ [点击确认]
过稿第一步 (OverProcess)
    ↓ [长按描边 → 进度完成]
    ↓ [点击"完成过稿"]
过稿第二步 (PaperLayingPage) ← 当前页面
    ↓ [长按铺纸 → 纸张覆盖]
    ↓ [点击"完成铺纸"]
制作流程页 (/process)
```

## 🔧 技术实现

### 核心功能

#### 1. 铺纸动画
```javascript
// 纸张透明度渐变
paperOpacity: ref(0)
progress: ref(0)

animatePaper() {
  setInterval(() => {
    if (progress < 100) {
      progress += 1
      // 从0到0.9的透明度
      paperOpacity = (progress / 100) * 0.9
    }
  }, 50) // 5秒完成
}
```

#### 2. 长按触发
```javascript
startLayingPaper() {
  setTimeout(() => {
    showPaper = true
    animatePaper()
  }, 500) // 长按0.5秒触发
}
```

#### 3. 进度显示
```vue
<div class="progress-fill" :style="{ width: progress + '%' }"></div>
<div class="progress-percent">{{ Math.floor(progress) }}%</div>
```

## 💡 交互细节

### 1. 铺纸触发
- **触发方式**：长按屏幕 0.5 秒
- **支持设备**：移动端触摸 + 桌面端鼠标
- **视觉反馈**：进度条 + 百分比
- **完成条件**：进度达到 100%

### 2. 纸张效果
- **初始状态**：透明度 0（不可见）
- **动画过程**：透明度 0 → 0.9（渐显）
- **最终效果**：半透明覆盖在人物上
- **动画时长**：5 秒

### 3. 工具展示
- **静态展示**：毛笔、墨水瓶、笔
- **布局位置**：符合传统工艺习惯
- **视觉效果**：真实的工具质感

### 4. 操作提示
- **未开始**：显示"轻轻按住屏幕，将纸张铺在图案上"
- **进行中**：显示进度条和百分比
- **已完成**：显示"完成铺纸"按钮

## 🎬 动画效果

### 铺纸动画序列
```
0.0s  - 页面加载，显示工具和人物
0.5s  - 控制面板淡入显示
用户长按 - 触发铺纸
0.0s-5.0s - 纸张透明度从0渐变到0.9
5.0s  - 完成，显示"完成铺纸"按钮
```

### CSS 关键动画
```css
/* 纸张渐显 */
.paper-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.paper-overlay.show {
  opacity: 0.9; /* 通过 JS 动态控制 */
}

/* 控制面板淡入 */
.control-panel {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.control-panel.show {
  opacity: 1;
}

/* 操作提示呼吸 */
@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
```

## 📊 配色方案

| 元素 | 颜色 | 用途 |
|-----|------|------|
| 背景 | #E2D5C5 | 米黄色主背景 |
| 白纸 | #FFFFFF | 底层纸张 |
| 标题 | #A02D18 | 品牌红色 |
| 文字 | #64463F | 深褐色 |
| 毛笔杆 | #C6A268 | 浅褐色 |
| 毛笔尖 | #291D11→#FFFFFF | 渐变 |
| 墨水瓶外 | #888080 | 灰色 |
| 墨水瓶内 | #433434 | 深灰 |
| 墨水 | #302929 | 深褐 |
| 笔身 | #C6A268 | 浅褐色 |
| 笔尖 | #64463F | 深褐色 |
| 遮罩 | rgba(220,197,168,0.7) | 半透明 |

## 🛠️ 文件结构

```
src/views/OverProcess/
├── index.vue           # 过稿第一步（描边）
└── PaperLayingPage.vue # 过稿第二步（铺纸）← 当前文件

public/assets/OverProcess/
├── assets/             # 第一步资源
│   └── assets/
└── page2/              # 第二步资源
    ├── assets/
    │   ├── df1018cf...png  # 背景图
    │   ├── 27318e3d...png  # 内容背景
    │   ├── bf924665...png  # 覆盖纸张 ← 关键图片
    │   ├── e0db890e...png  # 顶部装饰
    │   ├── 6faf3164...png  # 右侧装饰
    │   ├── 616d7a9a...png  # 信号图标
    │   ├── 59e706a4...png  # WiFi 图标
    │   └── 2342c8cd...png  # 电量图标
    └── README.md       # 本说明文档
```

## 🚀 使用方式

### 访问路径
```
完整流程：
/draw-process              # 上传图片
→ /draw-process-loading    # 加载中
→ /draw-process-gallery    # 选择画稿
→ /over-process            # 过稿第一步（描边）
→ /over-process-step2      # 过稿第二步（铺纸）← 当前页面
→ /process                 # 制作流程
```

### 用户操作
1. 从过稿第一步完成后进入
2. 观察传统工具和场景
3. 长按屏幕开始铺纸
4. 观察纸张逐渐覆盖图案
5. 等待进度达到 100%
6. 点击"完成铺纸"继续

## 🎭 与第一步的对比

| 特性 | 第一步（描边） | 第二步（铺纸） |
|-----|--------------|--------------|
| **主要动作** | 描绘轮廓 | 铺纸覆盖 |
| **视觉效果** | 描边扩散 | 纸张渐显 |
| **工具展示** | 无 | 毛笔、墨水瓶、笔 |
| **图案角度** | 正常 | 旋转 -15.57° |
| **纸张元素** | 无 | 白纸底层 + 覆盖纸张 |
| **进度反馈** | 圆形扩散 | 透明度变化 |
| **完成操作** | 完成过稿 | 完成铺纸 |

## 🔍 设计亮点

### 1. **真实工艺还原**
✅ 传统皮影制作工具完整呈现  
✅ 铺纸角度符合实际操作  
✅ 纸张覆盖效果逼真  
✅ 半透明效果展现工艺细节  

### 2. **交互设计**
✅ 长按触发符合直觉  
✅ 实时进度反馈清晰  
✅ 操作提示明确  
✅ 完成状态清晰  

### 3. **视觉层次**
✅ 多层元素叠加  
✅ 旋转角度增加动感  
✅ 半透明效果增加真实感  
✅ 工具点缀画面丰富  

## 📝 关键实现细节

### 1. 旋转元素定位
```css
/* 白色纸张 */
transform: rotate(-13.17deg);

/* 人物图案 */
transform: rotate(-15.57deg);

/* 毛笔 */
transform: rotate(-102.03deg);

/* 笔 */
transform: rotate(16.13deg);
```

### 2. 纸张透明度控制
```javascript
// 动态计算透明度
paperOpacity = (progress / 100) * 0.9
// 最大透明度 0.9，保持半透明效果
```

### 3. 工具细节
```css
/* 毛笔笔尖渐变 */
background: linear-gradient(180deg, #291D11 37.02%, #FFFFFF 100%);

/* 墨水瓶圆角 */
border-radius: 41px; /* 外层 */
border-radius: 20px; /* 内层 */

/* 高光效果 */
background: #D9D9D9;
transform: matrix(0.85, -0.53, 0.54, 0.84, 0, 0);
```

## 🐛 注意事项

1. **图片路径**：确保 bf924665...png 路径正确
2. **旋转定位**：多个旋转元素需要精确定位
3. **透明度**：最大透明度 0.9，不要完全不透明
4. **交互响应**：长按事件在移动端和桌面端都要支持
5. **进度同步**：透明度和进度条要同步更新

## 🔮 后续优化

- [ ] 添加铺纸音效
- [ ] 支持调整铺纸速度
- [ ] 添加工具动画
- [ ] 支持重新铺纸
- [ ] 添加更多工具展示

---

**更新日期**：2025-10-03  
**版本**：v2.0（重新设计）  
**组件**：PaperLayingPage.vue  
**路由**：`/over-process-step2`  
**步骤**：过稿流程 Step 2 / 3
