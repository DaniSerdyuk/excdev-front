import '@/assets/main.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setInterceptors } from '@/plugins/axios';
import Toast from 'vue-toastification';

import App from './App.vue';
import router from './router';

const packages = [createPinia(), router, Toast];

const app = createApp(App);

packages.forEach((pkg) => app.use(pkg));

setInterceptors();

app.mount('#app');
