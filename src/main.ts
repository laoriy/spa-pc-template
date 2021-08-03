import ElementPlus from 'element-plus'; // 生产环境使用cdn所以全局引入
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store, { key } from './store';
import { i18n, initDirectives, Emitter } from './plugins';
import interceptor from './permission';

import '@/service/utils/mockServe'; // TODO: dev数据mock, 生产环境应注释
import '@/assets/css/element-theme/index.scss'; // 样式加载，scss文件是element自定义主题样式
import '@/assets/css/index.less';

const app = createApp(App);

app.config.globalProperties.emitter = new Emitter(); // 事件处理中心

interceptor(router); // 注册拦截器
initDirectives(app); // // 注册directives
app.use(ElementPlus, {
    i18n: i18n.global.t,
});
app.use(i18n);
app.use(store, key)
    .use(router)
    .mount('#app');
