# 配乐页面 (MusicPage)

## 概述
配乐页面是在皮影表演流程结束后展示的页面，用于为皮影戏配乐和音效。

## 页面功能

### 1. 页面布局
- **状态栏**: 显示当前时间、信号、WiFi和电池状态
- **标题区域**: 竖排显示"配乐"标题
- **音乐展示区**: 白色圆角容器，展示配乐相关的皮影人物图片
- **播放控制器**: 底部播放器，可以控制音乐的播放/暂停

### 2. 交互功能
- **播放控制**: 点击底部播放按钮可以切换播放/暂停状态
- **动画效果**: 
  - 页面加载时有淡入动画
  - 白色容器从下方滑入
  - 播放按钮有缩放进入动画
  - 播放时有脉冲动画效果

### 3. 路由跳转
- 从 `/show-process`（表演页面）点击"下一步"后跳转到 `/music`
- 表演完成状态会保存在 localStorage

## 使用的图片资源

所有图片资源存放在 `public/assets/music/assets/` 目录下：

1. `49f248ca-faac-42d2-a3ee-19b4c1260a29.png` - 背景图
2. `a837f61b-2952-4127-b1dc-5cee1eb9a361.png` - 信号图标
3. `8686ff53-2e9b-4d03-b2af-80cc727d9fee.png` - WiFi图标
4. `7166988a-a961-45f8-af40-b976df30869f.png` - 电池图标
5. `438439b6-f6b6-48b7-85e3-a43a9834cb61.png` - 配乐人物图片
6. `e197f3dc-d291-44a8-b2fd-5df5bb80352e.png` - 播放器背景
7. `fbce82b6-845b-4021-91f6-922d38edd364.png` - 播放按钮背景
8. `8fab8937-64cc-40a0-8551-2ed1b4eee2c5.png` - 播放图标

## 技术实现

### 响应式设计
- 固定宽度 393px（手机屏幕尺寸）
- 在小于393px的屏幕上自适应为100vw

### 动画系统
- `fadeInUp`: 淡入上滑动画
- `fadeInDown`: 从上淡入动画
- `scaleIn`: 缩放进入动画
- `slideUpFade`: 上滑淡入动画
- `pulse`: 脉冲动画（播放时）

### 状态管理
- 使用 `ref` 管理播放状态和时间显示
- 使用 localStorage 持久化表演完成状态

## TODO: 待实现功能

- [ ] 实际的音频播放功能
- [ ] 音乐选择功能
- [ ] 音量控制
- [ ] 播放进度条
- [ ] 音乐列表
- [ ] 添加音乐文件资源
- [ ] 实现暂停图标切换

## 路由配置

在 `src/router/index.js` 中已添加路由：

```javascript
{
  path: '/music',
  name: 'MusicPage',
  component: MusicPage,
  meta: {
    title: '智绘皮影 - 配乐'
  }
}
```

## 从表演页面跳转

表演页面 (`ShowProcessPage.vue`) 的"下一步"按钮会跳转到配乐页面：

```javascript
const handleNextClick = () => {
  localStorage.setItem('showProcessCompleted', 'true');
  router.push('/music');
};
```

