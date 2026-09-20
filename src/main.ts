import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 提前应用主题
const savedTheme = localStorage.getItem('csl-theme-mode');
const root = document.documentElement;

if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
} else if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

// 提前应用 Dock 设置
try {
  const raw = localStorage.getItem('csl-settings');
  if (raw) {
    const data = JSON.parse(raw);
    if (data.dockPosition) root.setAttribute('data-dock-position', data.dockPosition);
    if (data.dockMode) root.setAttribute('data-dock-mode', data.dockMode);
  } else {
    root.setAttribute('data-dock-position', 'bottom');
    root.setAttribute('data-dock-mode', 'always');
  }
} catch {
  root.setAttribute('data-dock-position', 'bottom');
  root.setAttribute('data-dock-mode', 'always');
}

app.mount('#app');