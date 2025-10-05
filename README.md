# 智绘皮影 H5 移动端首页

## 项目介绍

这是一个基于 Figma 设计稿生成的 H5 移动端首页项目，主题为"智绘皮影"——让传统在指尖新生。

## 功能特点

- ✨ 完全还原 Figma 设计稿
- 📱 移动端优先，响应式设计
- 🎨 传统皮影艺术与现代技术结合
- 🚀 纯原生 HTML/CSS/JavaScript，无框架依赖
- ⚡ 轻量级，加载速度快

## 项目结构

```
智绘皮影/
├── index.html          # HTML 入口文件
├── style.css           # 样式文件（已转换为普通 CSS）
├── main.js             # JavaScript 主文件
├── index.tsx           # React 版本组件（可选）
├── assets/             # 资源文件目录
│   ├── 47426c18-9314-4eb5-b256-2c9295ee7481.png
│   ├── 29115b2b-97a4-4c7f-b905-a52f200dd6ca.png
│   ├── 0525f8a2-8c6d-4a13-bbad-c8618bf6e15f.png
│   ├── 02919301-bb2d-434c-a9ea-19183d0dddcc.png
│   ├── b1a2a707-31bd-413c-b6ca-35bd68c5a89b.png
│   └── bc20a740-f96c-4666-8631-299f329d309a.png
├── package.json        # 项目配置文件
├── vite.config.js      # Vite 配置文件
└── README.md           # 项目说明文档
```

## 快速开始

### 方法一：直接打开（推荐）

直接双击 `index.html` 文件在浏览器中打开即可预览。

### 方法二：使用本地服务器

#### 使用 Python

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

然后在浏览器访问: `http://localhost:8080`

#### 使用 Node.js (http-server)

```bash
# 全局安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8080
```

#### 使用 Vite（开发模式）

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 技术栈

- **HTML5**: 语义化标签
- **CSS3**: Flexbox 布局、响应式设计
- **JavaScript**: 原生 ES6+
- **Vite**: 现代化构建工具（可选）

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

### 1. 静态托管平台
- Vercel
- Netlify
- GitHub Pages
- 腾讯云 COS
- 阿里云 OSS

### 2. 服务器部署
将整个项目文件夹上传到服务器的 Web 目录即可。

### 3. 微信小程序
可将代码转换为小程序格式进行部署。

## 注意事项

1. 确保 `assets` 文件夹中的所有图片资源都已正确放置
2. 如果图片无法显示，请检查文件路径是否正确
3. 建议在移动设备或浏览器的移动模式下预览效果
4. 页面宽度设计为 786px，会根据设备自动缩放

## 自定义修改

### 修改文字内容
在 `main.js` 中搜索对应的文字进行修改。

### 修改样式
在 `style.css` 中调整对应的 CSS 类。

### 添加交互
在 `main.js` 中添加事件监听器和交互逻辑。

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系开发团队。

---

**智绘皮影 - 让传统在指尖新生** 🎭

