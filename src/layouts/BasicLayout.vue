<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        collapsible
        v-model="collapsed"
        :trigger="null"
        width="256px"
      >
        <div class="logo">软小荐</div>
        <SiderMenu :theme="navTheme" :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";
import SettingDrawer from "../components/SettingDrawer/SettingDrawer.vue";

@Component({
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
})
export default class BasicLayout extends Vue {
  private collapsed: Boolean = false;

  get navTheme() {
    return this.$route.query.navTheme || "dark";
  }

  get navLayout() {
    return this.$route.query.navLayout || "left";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #fff;
}
</style>
