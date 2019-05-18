import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueI18n from 'vue-i18n'
import enUS from './locale/enUS'
import zhCN from './locale/zhCN'
import queryString from 'query-string'

import store from "./store";
import { Button, Layout, Icon, Drawer, Radio, Menu, Breadcrumb, Steps, Form, Input, Select, Dropdown, DatePicker, LocaleProvider } from "ant-design-vue";
import Authorized from "./components/Authorized.vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Steps);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(LocaleProvider);

Vue.component("Authorized", Authorized);
Vue.use(VueI18n);

const query: any = queryString.parse(location.search);
const i18n = new VueI18n({
  locale: query.locale || 'zhCN',
  messages:{
    zhCN:{ message:zhCN },
    enUS:{ message:enUS }
  }
});

const IconFont: any = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1196762_12a2k5w4uv8a.js', // 在 iconfont.cn 上生成
});
Vue.use(IconFont);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
