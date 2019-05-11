import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";
import { Button, Layout, Icon, Drawer, Radio, Menu, Breadcrumb, Steps, Form, Input, Select } from "ant-design-vue";
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

Vue.component("Authorized", Authorized);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
