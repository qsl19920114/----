import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');

// 禁用长按菜单
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 监听屏幕旋转
window.addEventListener('orientationchange', () => {
  location.reload();
});

