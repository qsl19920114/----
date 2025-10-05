# 智绘皮影 H5 移动端 - Vue3 版本

## 项目介绍

这是一个基于 Figma 设计稿生成的 Vue3 + Vue Router 的 H5 移动端项目，主题为"智绘皮影"——让传统在指尖新生。

## 技术栈

- ⚡️ **Vue 3** - 渐进式 JavaScript 框架
- 🚦 **Vue Router 4** - 官方路由管理器
- 📦 **Vite** - 下一代前端构建工具
- 🎨 **原生 CSS** - 无 CSS 预处理器，纯净轻量

## 功能特点

- ✨ 完全还原 Figma 设计稿
- 📱 移动端优先，响应式设计
- 🎭 传统皮影艺术与现代技术结合
- 🔀 平滑的页面路由过渡动画
- ⚡ 基于 Vite 的极速开发体验
- 🎯 Vue 3 Composition API

## 项目结构

```
智绘皮影/
├── src/
│   ├── App.vue              # 根组件
│   ├── main.js              # Vue 应用入口
│   ├── router/
│   │   └── index.js         # 路由配置
│   └── views/
│       ├── HomePage.vue     # 首页组件
│       └── PrefacePage.vue  # 序页组件
├── assets/                  # 静态资源
│   └── *.png                # 图片资源
├── public/                  # 公共资源（可选）
├── index-vue.html           # Vue 版本入口 HTML
├── vite.config-vue.js       # Vite 配置（Vue 版本）
├── package.json             # 项目配置（已更新为 Vue3）
└── README-VUE3.md           # Vue3 版本说明文档
```

## 页面说明

### 1. 首页 (HomePage.vue)
- 路径: `/`
- 功能: 展示皮影艺术主题首页
- 交互: 点击任意位置跳转到序页
- 特性: 实时时钟显示

### 2. 序页 (PrefacePage.vue)
- 路径: `/preface`
- 功能: 展示序言页面
- 交互: 点击"点击开启"按钮开始体验
- 特性: 精美的背景装饰和动态按钮效果

## 快速开始

### 安装依赖

```bash
cd D:\智绘皮影
npm install
```

### 开发模式

使用 Vite 开发服务器：

```bash
npm run dev
```

然后在浏览器访问显示的本地地址（通常是 `http://localhost:8080`）

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 依赖说明

### 核心依赖
- `vue@^3.4.0` - Vue 3 核心库
- `vue-router@^4.2.0` - Vue 官方路由管理器

### 开发依赖
- `vite@^5.0.0` - 现代化构建工具
- `@vitejs/plugin-vue@^5.0.0` - Vue 3 的 Vite 插件

## 使用注意事项

### 1. 配置文件
运行 Vue3 版本时，需要使用 `vite.config-vue.js` 作为配置文件：

```bash
# 修改 vite.config.js 为 vite.config-vue.js 的内容
# 或者直接指定配置文件
vite --config vite.config-vue.js
```

### 2. HTML 入口
Vue3 版本使用 `index-vue.html` 作为入口，在 `vite.config-vue.js` 中可以配置：

```javascript
// vite.config-vue.js
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      input: './index-vue.html'
    }
  }
})
```

### 3. 资源路径
所有静态资源（图片）都存放在 `assets/` 目录中，在组件中使用 `/assets/` 路径引用。

## 路由配置

```javascript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/preface',
    name: 'Preface',
    component: PrefacePage
  }
];
```

## 路由跳转示例

### 在组件中跳转

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 跳转到序页
const goToPreface = () => {
  router.push('/preface');
};
</script>
```

### 使用 router-link

```vue
<template>
  <router-link to="/preface">前往序页</router-link>
</template>
```

## 响应式适配

项目针对不同屏幕尺寸进行了优化：

- **786px 及以上**: 完整显示
- **480px - 786px**: 自动缩放至 60%
- **375px - 480px**: 自动缩放至 48%

## 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Safari (iOS)
- ✅ Firefox
- ✅ Edge
- ✅ 微信浏览器
- ✅ 支付宝浏览器

## 部署建议

### 1. Vercel 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

### 2. Netlify 部署

在 Netlify 中配置：
- Build command: `npm run build`
- Publish directory: `dist`

### 3. 服务器部署

```bash
# 构建
npm run build

# 将 dist 目录上传到服务器
```

注意：Vue Router 使用 HTML5 History 模式，需要服务器配置支持 SPA。

### Nginx 配置示例

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 开发指南

### 添加新页面

1. 在 `src/views/` 中创建新组件
2. 在 `src/router/index.js` 中添加路由配置
3. 在需要的地方添加导航链接

### 修改样式

所有样式都使用 Vue 单文件组件的 `<style scoped>` 标签，样式局部作用域，不会污染全局。

### 添加新功能

使用 Vue 3 Composition API：

```vue
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// 响应式数据
const count = ref(0);

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 生命周期钩子
onMounted(() => {
  console.log('组件已挂载');
});
</script>
```

## 常见问题

### Q: 图片无法显示？
A: 确保图片路径正确，使用 `/assets/` 开头的绝对路径。

### Q: 路由跳转后页面空白？
A: 检查组件导入路径是否正确，确保组件已正确导出。

### Q: 开发服务器启动失败？
A: 检查端口 8080 是否被占用，可以在 `vite.config-vue.js` 中修改端口。

### Q: 如何添加过渡动画？
A: 在 `App.vue` 中已配置了基础的 fade 过渡，可以自定义其他动画效果。

## 下一步计划

- [ ] 添加更多页面
- [ ] 集成状态管理（Pinia）
- [ ] 添加用户交互功能
- [ ] 接入后端 API
- [ ] 添加单元测试
- [ ] PWA 支持

## 性能优化建议

1. **图片优化**: 使用 WebP 格式，压缩图片大小
2. **懒加载**: 使用路由懒加载减少首屏加载时间
3. **代码分割**: Vite 自动进行代码分割
4. **CDN 加速**: 将静态资源部署到 CDN

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系开发团队。

---

**智绘皮影 - 让传统在指尖新生** 🎭

*Powered by Vue 3 + Vite*

