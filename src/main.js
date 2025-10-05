import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');

// 禁用长按菜单
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 监听屏幕旋转
window.addEventListener('orientationchange', () => {
  location.reload();
});

